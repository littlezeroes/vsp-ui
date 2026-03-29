/**
 * Copyright (c) 2020-2025, JGraph Holdings Ltd
 * Copyright (c) 2020-2025, draw.io AG
 */
/**
 * Global GraphViewer, EditorUi and Editor overrides and customizations.
 * 
 * TODO:
 * - Use matchMedia listeners for geDarkMode CSS class and invert CSS filter (eg. viewer.js:1148)
 * - Replace invert filter with light-dark colors in CSS (eg. viewer.js:1079)
 * - Check if var colors are only used for render but not exported in SVG
 * - Test/add dark mode for apps and UI components in Confluence/Jira
 */
(function()
{
    function isDarkMode(allowNull)
    {
        var confTheme = document.documentElement.getAttribute('data-color-mode');
        return confTheme? 
            (confTheme == 'dark') || (confTheme == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) : 
            (allowNull? null : false);
    };

    /**
     * No EditorUi at this point possible (see viewer.js:129).
     */
    if (typeof EditorUi != 'undefined')
    {/**   * Overridden to enable automatic dark mode in editor and lightbox.
         */
        EditorUi.prototype.isAutoDarkMode = function(c)
        {
            return true;
        };
    }

    /**
     * No Editor at this point when used as a standalone editor.
     */
    if (typeof Editor != 'undefined')
    {/**   * Overridden to flag dark mode state to editor.
         */
        Editor.isDarkMode = function()
        {
            return isDarkMode();
        };
    }
        
    /**
     * No GraphViewer at this point when used as a standalone editor.
     */
    if (typeof GraphViewer != 'undefined')
    {/**   * Uses var from AUI theme with fallback for dark colors in viewer CSS.
         */
        GraphViewer.darkBackgroundColor = 'var(--ds-surface, #1d2125)';/**   * Specifies shape background color for light and dark mode.   */
        GraphViewer.shapeBackgroundColor = 'light-dark(#ffffff, ' + GraphViewer.darkBackgroundColor + ')';/**   * Overridden to flag dark mode state to viewer.   */
        GraphViewer.prototype.isDarkMode = function()
        {
            return isDarkMode();
        }
    }

    try
    {
        window.AP.theming.initializeTheming();

        window.mxConfThemeObserver = function(callback, onceOnly)
        {
            let lastIsDark = -1;

            // In some cases, the theme is not set (e.g, Aura), so we have this safeguard
            var timer = setTimeout(function()
            {
                if (lastIsDark === -1)
                {
                    callCallback(isDarkMode());
                }
            }, 200);

            function callCallback(value)
            {
                clearTimeout(timer);

                if (lastIsDark !== value)
                {
                    lastIsDark = value;
                    callback(value);    
                }
            }

            var isDark = isDarkMode(true);

            if (isDark != null)
            {
                callCallback(isDark);
                if (onceOnly) return;
            }

            const observer = new MutationObserver(function(mutationList, observer)
            {
                for (const mutation of mutationList) 
                {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-color-mode')
                    {
                        callCallback(isDarkMode());

                        if (onceOnly)
                        {
                            observer.disconnect();
                            return;
                        }
                    }
                }
            });

            observer.observe(document.documentElement, { attributes: true });

            // Wait 1 sec for the property to be set, then if the theme is auto, listen for changes
            setTimeout(function()
            {
                if (document.documentElement.getAttribute('data-color-mode') == 'auto')
                {
                    window.matchMedia('(prefers-color-scheme: dark)')
                        .addEventListener('change', function()
                    {
                        callCallback(isDarkMode());
                    });
                }
            }, 1000);
        }

        mxConfThemeObserver(function(dark)
        {
            if (dark) 
            {
                document.body.classList.add('aui-theme-dark');
            }
            else
            {
                document.body.classList.remove('aui-theme-dark');
            }
        });
    } 
    catch (e)
    {
        window.mxConfThemeObserver = function(callback)
        {
            callback(false);
        };
    }
})();
