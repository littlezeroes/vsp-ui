/**
 * Copyright (c) 2020-2025, JGraph Holdings Ltd
 * Copyright (c) 2020-2025, draw.io AG
 */
var GHAC = {};

GHAC.host = window.location.host;
GHAC.clientId = (window.location.hostname == 'test.draw.io') ? 'Iv1.1218f5567fbc258a' : 'Iv1.d9c78b3c0f66e510';
GHAC.redirectUri = window.location.protocol + '//' + GHAC.host + '/github2';

// When 3rd party coookies are disabled, localStorage is not accessable
try
{
	GHAC.isLocalStorage = typeof window.localStorage !== 'undefined';
}
catch(e){}

GHAC.authLSKeyName = 'ghauth'; // Should be the same name as in draw.io
GHAC.GHBaseUrl = 'https://api.github.com';

GHAC.reqQueue = [];
GHAC.authOnProgress = false;
GHAC.refreshTokenQueue = [];
GHAC.refreshTokenInProgress = false;

if (typeof CAC === 'undefined') 
{
	throw 'CAC object not found, please include file new_common/cac.js';
}
else
{
	CAC.applyCAC(GHAC);
}

(function()
{

var _token = null;

GHAC.setToken = function(token)
{
	_token = token;
};

GHAC.getAuthWinUrl = function(state)
{
	return 'https://github.com/login/oauth/authorize?client_id=' +
			GHAC.clientId +  
			'&state=' + encodeURIComponent('cId=' + GHAC.clientId + // To identify which app/domain is used
				'&domain=' + window.location.hostname + '&token=' + state)
};

GHAC.authGithub = function(success, errorFn, direct, authDlgCont)
{
	function error(err)
	{
		notifyWaiters('error', err);
	}
	
	function notifyWaiters(fnKey, arg)
	{
		for (var i = 0; i < GHAC.reqQueue.length; i++)
		{
			GHAC.reqQueue[i][fnKey](arg);
		}
		
		GHAC.reqQueue = [];
		GHAC.authOnProgress = false;
	}

	GHAC.reqQueue.push({success: success, error: errorFn});
	
	if (GHAC.authOnProgress)
	{
		return;
	}
	
	GHAC.authOnProgress = true;
	
	if (window.onGitHubCallback == null)
	{
		var authStep2 = function(state)
		{
			var acceptAuthResponse = true;
			var url = GHAC.getAuthWinUrl(state);
			var popup = window.open(url, 'ghauth');
			
			if (popup != null)
			{
				window.onGitHubCallback = function(authInfo)
				{
					try
					{
						if (acceptAuthResponse)
						{
							window.onGitHubCallback = null;
							acceptAuthResponse = false;
							
							try
							{
								if (authInfo == null)
								{
									error({message: mxResources.get('accessDenied'), retry: auth});
								}
								else
								{
									_token = authInfo.access_token;
									GHAC.setPersistentAuth('remembered');									
									notifyWaiters('success');
								}
							}
							catch (e)
							{
								error(e);
							}
							finally
							{
								popup.close();
							}
						}
						else
						{
							popup.close();
						}
					}
					finally
					{
						authDialog.parentNode.removeChild(authDialog);
					}
				};
			
				popup.focus();
			}
			else
			{
				alert(mxResources.get('serviceUnavailableOrBlocked'));
			}
		};
		
		var auth = async function()
		{
			try
			{
				var state = await GHAC.getState(GHAC.redirectUri);
				authStep2(state);
			}
			catch (e)
			{
				error(e);
			}
		};

		if (direct)
		{
			auth();
		}
		else
		{
			if (window.spinner != null)
			{
				spinner.stop();
			}
			
			var authDialog = document.createElement('div');
			var btn = document.createElement('button');
			btn.innerHTML = mxResources.get('authDrawAccess', ['Github']);
			btn.className = 'aui-button aui-button-primary';
			authDialog.appendChild(btn);
			
			function adjustAuthBtn()
			{
				var w = authDlgCont? authDlgCont.offsetWidth : window.innerWidth, 
					h = authDlgCont? authDlgCont.offsetHeight : window.innerHeight;
				authDialog.style.cssText = 'position: absolute; top: 0px; left: 0px; width: '+ w +'px; height: '+ h +'px; background: var(--ds-surface-overlay, #fff);opacity: 0.85;z-index: 9999;';
				btn.style.cssText = 'position: absolute; width: ' + (authDlgCont? '250; font-size: 12px' : '320px') + '; height: 50px; top: '+ (h/2 - 25) +'px; left: '+ (w/2 - (authDlgCont? 125 : 160)) +'px;opacity: 1;';
			}
	
			btn.addEventListener('click', function(evt) 
			{
				auth();
				// Remove the event handler since the user already used the button
				window.removeEventListener("resize", adjustAuthBtn);
			});
			
			window.addEventListener('resize', adjustAuthBtn);
			adjustAuthBtn();
			(authDlgCont || document.body).appendChild(authDialog);			
		}
	}
	else
	{
		error({message: mxResources.get('busy')});
	}
};

// JSON request with auth
GHAC.doAuthRequest = function(url, method, params, success, error, authDlgCont)
{
	GHAC.doAuthRequestPlain(GHAC.GHBaseUrl + url, method, params, function(req)
	{
		success(JSON.parse(req.responseText));
	}, error, null, null, authDlgCont);
};

// Generic request with auth
GHAC.doAuthRequestPlain = function(url, method, params, success, error, contentType, retryCount, authDlgCont)
{
	if (GHAC.refreshTokenInProgress)
	{
		GHAC.refreshTokenQueue.push({args: arguments, error: error});
		return;
	}
	
	function notifyError(err)
	{
		error(err);
		notifyWaiters(true, err);
	};
	
	function notifyWaiters(isError, arg)
	{
		GHAC.refreshTokenInProgress = false;
		
		for (var i = 0; i < GHAC.refreshTokenQueue.length; i++)
		{
			if (isError)
			{
				GHAC.refreshTokenQueue[i].error(arg);
			}
			else
			{
				GHAC.doAuthRequestPlain.apply(this, GHAC.refreshTokenQueue[i].args);
			}
		}
		
		GHAC.refreshTokenQueue = [];
	};
	
	retryCount = retryCount || 0;
	
	if (retryCount > 4)
	{
		// Since we tried multiple times, the token itself maybe corrupted
		GHAC.setPersistentAuth(null);
		error();
		return;
	}
	
	async function doRefreshToken(state)
	{
		var res = await fetch(GHAC.redirectUri + '?state=' + encodeURIComponent('cId=' + GHAC.clientId + '&domain=' + GHAC.host + '&token=' + state)); // To identify which app/domain is used
		
		if (res.ok)
		{
			var newAuthInfo = await res.json();
			_token = newAuthInfo.access_token;
			
			GHAC.setPersistentAuth('remembered');

			// Retry request with refreshed token
			GHAC.doAuthRequestPlain(url, method, params, success, error, contentType, ++retryCount);
			notifyWaiters();
		}
		else // (Unauthorized) [e.g, invalid refresh token] (sometimes, the server returns errors other than 401 (e.g. 500))
		{
			GHAC.authGithub(function()
			{
				// Retry request after authentication
				GHAC.doAuthRequestPlain(url, method, params, success, error, contentType, ++retryCount);
				notifyWaiters();
			}, notifyError, false, authDlgCont);
		}
	};
	
	function startRefreshToken()
	{
		GHAC.refreshTokenInProgress = true;

		navigator.locks.request('token-fetch-lock', async () => 
		{
			try
			{
				var state = await GHAC.getState(GHAC.redirectUri);
				await doRefreshToken(state);
			}
			catch (e)
			{
				notifyError(e);
			}
		});
	};
				
	if (_token == null)
	{
		var authInfo = GHAC.getPersistentAuth();
		
		if (authInfo == null)
		{
			GHAC.authGithub(function()
			{
				// Retry request after authentication
				GHAC.doAuthRequestPlain(url, method, params, success, error, contentType, ++retryCount);
			}, error, false, authDlgCont);
		}
		else
		{
			startRefreshToken();
		}
		
		return;
	}
	
	var req = new XMLHttpRequest();
	req.open(method, url);
	req.setRequestHeader('Authorization', 'token ' + _token);
	req.setRequestHeader('Content-Type', contentType || 'application/json;charset=UTF-8');
	
	req.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			if (this.status >= 200 && this.status <= 299)
			{
				success(req);
			}
			else if (this.status == 401) // (Unauthorized) [e.g, invalid token]
			{
				// Try refresh token before asking for new authentication
				var authInfo = GHAC.getPersistentAuth();
				
				if (authInfo != null)
				{
					startRefreshToken();
				}
				else
				{
					GHAC.authGithub(function()
					{
						// Retry request after authentication
						GHAC.doAuthRequestPlain(url, method, params, success, error, contentType, ++retryCount);
					}, error, false, authDlgCont);
				}
			}
			else
			{
				error(this);
			}
		}
	};
		
	req.send(params != null? JSON.stringify(params) : null);
};

GHAC.showError = function(e)
{
	alert(GHAC.htmlEntities(mxResources.get('confError', [e? e.message : ''])));
};

// This function depends on having GraphViewer loaded
GHAC.extractGraphModelFromPng = function(pngData)
{
	return Editor.extractGraphModelFromPng(pngData);
};

GHAC.getFile = function(org, repo, ref, path, success, error)
{
	// Adds random parameter to bypass cache
	var rnd = '&t=' + new Date().getTime();
		
	GHAC.doAuthRequest('/repos/' + org + '/' + repo +
		'/contents/' + path + '?ref=' + ref + rnd, 'GET', null, function(data)
	{
		var content = data.content;
		
		if (data.encoding === 'base64')
		{
			if (/\.png$/i.test(data.name))
			{
				var xml = GHAC.extractGraphModelFromPng(content);
				
				if (xml != null && xml.length > 0)
				{
					content = xml;
				}
			}
			else
			{
				content = Base64.decode(content);
			}
		}

		success(data.name, content);
	}, error);
};

GHAC.setPersistentAuth = function(authInfo)
{
	if (GHAC.isLocalStorage)
	{
		if (authInfo != null)
		{
			localStorage.setItem('.' + GHAC.authLSKeyName, JSON.stringify(authInfo));
		} 
		else
		{
			var req = new XMLHttpRequest();
			req.open('GET', GHAC.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + GHAC.clientId + '&domain=' + GHAC.host));
			req.send();
			_token = null;
			localStorage.removeItem('.' + GHAC.authLSKeyName);
		}
	}
};

GHAC.getPersistentAuth = function()
{
	var authInfo = null;
	
	if (GHAC.isLocalStorage)
	{
		try
		{
			authInfo = JSON.parse(localStorage.getItem('.' + GHAC.authLSKeyName));
		}
		catch (e) {} // ignore
	}
	
	return authInfo;
};

})();
