function e(e){return e&&e.__esModule?e.default:e}function n(e,n,t,o){Object.defineProperty(e,n,{get:t,set:o,enumerable:!0,configurable:!0})}var t=globalThis.parcelRequired477,o=t.register;o("2mcHd",function(n,o){var r=t("3u0dr"),i=t("frIzR"),s=t("42omo"),a=t("04e9M");t("1c598");var c=t("1Aku8");let l=e=>"localhost"===window.location.hostname?c.ProductEnvironment.DEVELOPMENT:"STAGING"===e?c.ProductEnvironment.STAGING:"PRODUCTION"===e?c.ProductEnvironment.PRODUCTION:c.ProductEnvironment.DEVELOPMENT,d=(0,r.isReactCompilerActiveV2)()?n=>{let o,r,c,d=(0,i.c)(10),{children:u,moduleType:p,noAccessRenderFallback:E,localId:y}=n,g=void 0===E?m:E,{environment:I,userId:f}=(0,t("bQm3c").useSessionData)();if(!f&&!(0,t("9wGTI").fg)("unskip_useextensionlist_unlicensed_support")){let e;return d[0]!==g?(e=g([],!1),d[0]=g,d[1]=e):e=d[1],e}d[2]===Symbol.for("react.memo_cache_sentinel")?(o=(0,a.getAnalyticsWebClient)(),d[2]=o):o=d[2],d[3]!==I?(r=l(I),d[3]=I,d[4]=r):r=d[4];let x=y??"";return d[5]!==u||d[6]!==p||d[7]!==r||d[8]!==x?(c=e(s).createElement(t("62fWd").ForgeUIExtensionPointProvider,{analyticsWebClient:o,environment:r,product:"confluence",page:p,localId:x},u),d[5]=u,d[6]=p,d[7]=r,d[8]=x,d[9]=c):c=d[9],c}:({children:n,moduleType:o,noAccessRenderFallback:r=()=>null,localId:i})=>{let{environment:c,userId:d}=(0,t("bQm3c").useSessionData)();return d||(0,t("9wGTI").fg)("unskip_useextensionlist_unlicensed_support")?e(s).createElement(t("62fWd").ForgeUIExtensionPointProvider,{analyticsWebClient:(0,a.getAnalyticsWebClient)(),environment:l(c),product:"confluence",page:o,localId:i??""},n):r([],!1)},u=(0,r.isReactCompilerActiveV2)()?e=>{let n,o,r=(0,i.c)(9),{moduleType:s,render:a,queryOptions:c,returnBlockedExtensions:l}=e,d=void 0!==l&&l;r[0]!==s||r[1]!==c||r[2]!==d?(n={moduleType:s,queryOptions:c,returnBlockedExtensions:d},r[0]=s,r[1]=c,r[2]=d,r[3]=n):n=r[3];let{extensions:u,loading:p,error:m}=(0,t("3b6WO").useExtensionList)(n);return r[4]!==m||r[5]!==u||r[6]!==p||r[7]!==a?(o=a(E(u),p,m),r[4]=m,r[5]=u,r[6]=p,r[7]=a,r[8]=o):o=r[8],o}:({moduleType:e,render:n,queryOptions:o,returnBlockedExtensions:r=!1})=>{let{extensions:i,loading:s,error:a}=(0,t("3b6WO").useExtensionList)({moduleType:e,queryOptions:o,returnBlockedExtensions:r});return n(E(i),s,a)},p=(0,r.isReactCompilerActiveV2)()?n=>{let t,o,r=(0,i.c)(7);return r[0]!==n?(t=e(s).createElement(u,n),r[0]=n,r[1]=t):t=r[1],r[2]!==n.localId||r[3]!==n.moduleType||r[4]!==n.render||r[5]!==t?(o=e(s).createElement(d,{moduleType:n.moduleType,noAccessRenderFallback:n.render,localId:n.localId},t),r[2]=n.localId,r[3]=n.moduleType,r[4]=n.render,r[5]=t,r[6]=o):o=r[6],o}:n=>e(s).createElement(d,{moduleType:n.moduleType,noAccessRenderFallback:n.render,localId:n.localId},e(s).createElement(u,n)),E=e=>e.slice().sort((e,n)=>{let t=e.properties.title,o=n.properties.title;return t&&!o?-1:o&&!t?1:t&&o?t.localeCompare(o):0});function m(){return null}n.exports.ForgeUIExtensionProviderWrapper=d,n.exports.ForgeUIExtensions=u,n.exports.sortExtensionsAlphabeticalTitle=E,n.exports.ForgeUIExtensionsWrapper=p}),o("62fWd",function(n,o){var r=t("42omo");let i=null;"u">typeof window&&(i=t("eLUTa").postRobotOn),n.exports.ForgeUIExtensionPointProvider=({analyticsWebClient:n,environment:o,product:s,page:a,children:c,localId:l,isCustomConfig:d})=>((0,r.useEffect)(()=>{if("confluence"===s&&l&&i&&!d&&(0,t("dh538").fg)("platform_add_bridge_message_forwarding_from_faus"))try{let e=(0,t("6fRDv").getProductDomain)(),o=i(`analyticsFromEmbeddedFAUS_${l}`,{domain:e},async({data:e})=>{(0,t("3Spjc").sendEvent)(n)(e)});return()=>o.cancel()}catch{console.log("Failed to set up analytics listener")}},[n,l,d,s]),e(r).createElement(t("jIiuI").EnvironmentContext.Provider,{value:o},e(r).createElement(t("5U2YR").MetricsContextProvider,{value:{product:s,page:a}},e(r).createElement(t("3Spjc").default,{client:n,commonAttributes:{moduleType:a}},c))))}),o("jIiuI",function(e,n){var o=t("42omo");t("1c598");var r=t("1Aku8");let i=(0,o.createContext)(r.ProductEnvironment.PRODUCTION);e.exports.EnvironmentContext=i}),o("1c598",function(e,o){n(e.exports,"ProductEnvironment",()=>t("1Aku8").ProductEnvironment),n(e.exports,"ForgeCDNEnvironment",()=>t("1Aku8").ForgeCDNEnvironment),n(e.exports,"ExtensionEnvironment",()=>t("2JC3k").ExtensionEnvironment),n(e.exports,"MarkupRecursiveList",()=>t("9dbGT").MarkupRecursiveList),n(e.exports,"MarkupList",()=>t("9dbGT").MarkupList),n(e.exports,"ConfluenceExtension",()=>t("2JC3k").ConfluenceExtension),n(e.exports,"JiraExtension",()=>t("2JC3k").JiraExtension),t("i3Ypo"),t("2JC3k"),t("1Aku8"),t("9dbGT"),t("jUCNB"),t("gUjm2"),t("kg3OT"),t("fsQJy")}),o("i3Ypo",function(e,o){n(e.exports,"MarkupRecursiveList",()=>t("9dbGT").MarkupRecursiveList),n(e.exports,"MarkupList",()=>t("9dbGT").MarkupList),n(e.exports,"ProductEnvironment",()=>t("1Aku8").ProductEnvironment),n(e.exports,"ForgeCDNEnvironment",()=>t("1Aku8").ForgeCDNEnvironment),n(e.exports,"ConfluenceExtension",()=>t("2JC3k").ConfluenceExtension),n(e.exports,"ExtensionEnvironment",()=>t("2JC3k").ExtensionEnvironment),n(e.exports,"JiraExtension",()=>t("2JC3k").JiraExtension),t("9dbGT"),t("1Aku8"),t("6sM2K"),t("2JC3k")}),o("9dbGT",function(e,n){let t=["Em","Link","Strike","String","Strong","User"],o=[...t,"Badge","Code","DateLozenge","StatusLozenge","Tag","UserGroup"];e.exports.MarkupRecursiveList=t,e.exports.MarkupList=o}),o("1Aku8",function(e,n){var t,o,r=((t={}).DEVELOPMENT="DEVELOPMENT",t.STAGING="STAGING",t.PRODUCTION="PRODUCTION",t),i=((o={}).DEVELOPMENT="dev",o.STAGING="stg",o.PRODUCTION="prod",o);e.exports.ProductEnvironment=r,e.exports.ForgeCDNEnvironment=i}),o("6sM2K",function(e,n){}),o("2JC3k",function(e,n){var t,o=((t={}).DEVELOPMENT="DEVELOPMENT",t.STAGING="STAGING",t.PRODUCTION="PRODUCTION",t);e.exports.ExtensionEnvironment=o,e.exports.ConfluenceExtension={BYLINE:"confluence:contentBylineItem",CONTEXT_MENU:"confluence:contextMenu",CONTENT_ACTION:"confluence:contentAction",GLOBAL_PAGE:"confluence:globalPage",GLOBAL_SETTINGS:"confluence:globalSettings",HOMEPAGE_FEED:"confluence:homepageFeed",SPACE_PAGE:"confluence:spacePage",SPACE_SETTINGS:"confluence:spaceSettings",CUSTOM_CONTENT:"confluence:customContent",MACRO:"xen:macro",TEST_MODULE:"test:module"},e.exports.JiraExtension={BACKLOG_ACTION:"jira:backlogAction",BOARD_ACTION:"jira:boardAction",PERSONAL_SETTINGS_PAGE:"jira:personalSettingsPage",ISSUE_PANEL:"jira:issuePanel",ISSUE_ACTION:"jira:issueAction",ISSUE_GLANCE:"jira:issueGlance",ISSUE_CONTEXT:"jira:issueContext",ISSUE_ACTIVITY:"jira:issueActivity",UI_MODIFICATIONS:"jira:uiModifications",CUSTOM_FIELD:"jira:customField",CUSTOM_FIELD_TYPE:"jira:customFieldType",ADMIN_PAGE:"jira:adminPage",GLOBAL_PAGE:"jira:globalPage",PROJECT_PAGE:"jira:projectPage",PROJECT_SETTINGS_PAGE:"jira:projectSettingsPage",DASHBOARD_BACKGROUND_SCRIPT:"jira:dashboardBackgroundScript",ISSUE_VIEW_BACKGROUND_SCRIPT:"jira:issueViewBackgroundScript",DASHBOARD_GADGET:"jira:dashboardGadget",WORKFLOW_VALIDATOR:"jira:workflowValidator",WORKFLOW_CONDITION:"jira:workflowCondition",WORKFLOW_POST_FUNCTION:"jira:workflowPostFunction",SERVICE_DESK_QUEUE_PAGE:"jiraServiceManagement:queuePage",SERVICE_DESK_ORGANIZATION_PANEL:"jiraServiceManagement:organizationPanel"}}),o("jUCNB",function(e,n){t("fsQJy"),t("kg3OT"),t("gUjm2")}),o("fsQJy",function(e,n){}),o("kg3OT",function(e,n){}),o("gUjm2",function(e,n){var t,o;(t={}).AdminPage="compass:adminPage",t.ComponentPage="compass:componentPage",t.TeamPage="compass:teamPage",t.ComponentImporter="compass:componentImporter",(o={}).AppConfigurationPage="appConfigurationPage",o.OnboardingFlow="onboardingFlow"}),o("5U2YR",function(n,o){var r=t("42omo");let i=(0,r.createContext)({environment:void 0,product:"",page:""});n.exports.MetricsContext=i,n.exports.MetricsContextProvider=({value:n,children:o})=>{let s=(0,r.useContext)(t("jIiuI").EnvironmentContext),{product:a,page:c,environment:l}=n,d=(0,t("hQK66").useMemoOne)(()=>({environment:l??s,product:a,page:c}),[c,l,s,a]);return e(r).createElement(i.Provider,{value:d},o)},n.exports.useMetricsContext=()=>(0,r.useContext)(i)}),o("3Spjc",function(n,o){var r=t("42omo"),i=t("7TH2w");let s="forge-ui",a=e=>n=>{switch(n.eventType){case i.UI_EVENT_TYPE:Promise.resolve(e).then(e=>e.sendUIEvent(n));break;case i.OPERATIONAL_EVENT_TYPE:Promise.resolve(e).then(e=>e.sendOperationalEvent(n));break;case i.TRACK_EVENT_TYPE:Promise.resolve(e).then(e=>e.sendTrackEvent(n));break;case i.SCREEN_EVENT_TYPE:Promise.resolve(e).then(e=>e.sendScreenEvent(n))}};n.exports.FORGE_UI_ANALYTICS_CHANNEL=s,n.exports.sendEvent=a,n.exports.default=({children:n,client:o,commonAttributes:i={}})=>e(r).createElement(t("kDuN4").default,{onEvent:e=>{let{eventType:n,data:t}=e.payload,{action:r,actionSubject:s,actionSubjectId:c,attributes:l,tags:d,source:u}=t,p=(e.context.find(e=>e&&e.forgeUIAnalyticsContext)??{}).forgeUIAnalyticsContext??{},E=u??p.source??"unknown",m={action:r,actionSubject:s,actionSubjectId:c,...p,source:E,attributes:{...i,...e.context.reduce((e,n)=>{let t=n&&n.forgeUIAttributes&&"object"==typeof n.forgeUIAttributes?n.forgeUIAttributes:{};return{...e,...t}},{}),...l},tags:d};a(o)({eventType:n,...m})},channel:s},n)}),o("3b6WO",function(e,n){var o=t("3u0dr"),r=t("frIzR"),i=t("42omo");let s=(0,o.isReactCompilerActiveV2)()?e=>{let n,o,s,a,c=(0,r.c)(17),{moduleType:l,queryOptions:d,returnBlockedExtensions:u,spaceContextOnly:p}=e,E=void 0!==u&&u,{locale:m}=(0,t("8C5kA").default)(),{cloudId:y}=(0,t("bQm3c").useSessionData)(),[g]=(0,t("ep3mz").usePageSpaceKey)(),[I]=(0,t("ep3mz").usePageContentId)(),{error:f}=(0,t("kqIWy").useSpaceDetail)(g);c[0]!==y||c[1]!==I||c[2]!==m||c[3]!==l||c[4]!==d||c[5]!==E||c[6]!==p||c[7]!==g?(n=(0,t("6qkXi").getUsePrefilteredExtensionListOptions)({cloudId:y,locale:m,moduleType:l,queryOptions:d,includeHidden:E,spaceKey:g,contentId:I,spaceContextOnly:p}),c[0]=y,c[1]=I,c[2]=m,c[3]=l,c[4]=d,c[5]=E,c[6]=p,c[7]=g,c[8]=n):n=c[8];let x=n,{extensions:T,loading:A,error:v}=(0,t("7zIsq").usePrefilteredExtensionList)(x);return c[9]!==v||c[10]!==f?(o=()=>{v&&(0,t("1uFM6").isUnauthorizedError)(v)&&(0,t("7Sm4c").markErrorAsHandled)(v),(0,t("bFDX4").isTooManyRequestsError)(v)&&(0,t("7Sm4c").markErrorAsHandled)(v),f&&(0,t("7Sm4c").markErrorAsHandled)(f)},s=[v,f],c[9]=v,c[10]=f,c[11]=o,c[12]=s):(o=c[11],s=c[12]),(0,i.useEffect)(o,s),c[13]!==T||c[14]!==v||c[15]!==A?(a={extensions:T,loading:A,error:v},c[13]=T,c[14]=v,c[15]=A,c[16]=a):a=c[16],a}:({moduleType:e,queryOptions:n,returnBlockedExtensions:o=!1,spaceContextOnly:r})=>{let{locale:s}=(0,t("8C5kA").default)(),{cloudId:a}=(0,t("bQm3c").useSessionData)(),[c]=(0,t("ep3mz").usePageSpaceKey)(),[l]=(0,t("ep3mz").usePageContentId)(),{error:d}=(0,t("kqIWy").useSpaceDetail)(c),u=(0,i.useMemo)(()=>(0,t("6qkXi").getUsePrefilteredExtensionListOptions)({cloudId:a,locale:s,moduleType:e,queryOptions:n,includeHidden:o,spaceKey:c,contentId:l,spaceContextOnly:r}),[a,s,e,n,o,c,l,r]),{extensions:p,loading:E,error:m}=(0,t("7zIsq").usePrefilteredExtensionList)(u);return(0,i.useEffect)(()=>{m&&(0,t("1uFM6").isUnauthorizedError)(m)&&(0,t("7Sm4c").markErrorAsHandled)(m),(0,t("bFDX4").isTooManyRequestsError)(m)&&(0,t("7Sm4c").markErrorAsHandled)(m),d&&(0,t("7Sm4c").markErrorAsHandled)(d)},[m,d]),{extensions:p,loading:E,error:m}};e.exports.useExtensionList=s}),o("7zIsq",function(e,n){var o=t("42omo"),r=t("7TH2w");let i=(e,n,o,r,i,s,a,c=[e])=>({variables:{cloudId:e,context:n,includeHidden:s??!1,types:r,locale:i},...a,client:o,errorPolicy:"all",context:{headers:{"atl-attribution":(0,t("1Igmn").createAtlAttributionHeader)(c.sort().join())},allowOnExternalPage:!0}}),s=({loading:e,data:n})=>{let o=n?.confluence_forgeExtensionsByType||[];return!e&&o.length>0?(0,t("8VYSW").transformPreFilteredExtensions)(o):null};e.exports.createUsePrefilteredExtensionListQueryOptions=i,e.exports.usePrefilteredExtensionList=({cloudId:e,context:n,includeHidden:a,locale:c,types:l,client:d,queryOptions:u})=>{let p=i(e,n,d,l,c,a,u),{error:E,loading:m,data:y}=(0,t("xQxzY").useQuery)(t("39Ajm").FetchPreFilteredForgeAppsQuery,p),g=s({loading:m,data:y}),{page:I}=(0,t("5U2YR").useMetricsContext)(),{createAnalyticsEvent:f}=(0,t("inPa6").useAnalyticsEvents)();return(0,o.useEffect)(()=>{g&&f({eventType:r.OPERATIONAL_EVENT_TYPE,data:{action:"succeeded",actionSubject:"forge.ui.webClient",source:I,tags:["forge"],attributes:{target:"usePrefilteredExtensionList"}}}).fire(t("3Spjc").FORGE_UI_ANALYTICS_CHANNEL)},[g,I,f]),(0,o.useEffect)(()=>{if(!g&&E&&E.graphQLErrors.length>0){let e=E.graphQLErrors.find(e=>(0,t("grQpA").isGQLUnderlyingServiceError)(e)||(0,t("grQpA").isGQLGatewayError)(e));f({eventType:r.OPERATIONAL_EVENT_TYPE,data:{action:"failed",actionSubject:"forge.ui.webClient",source:I,tags:["forge"],attributes:{target:"usePrefilteredExtensionList",errorName:e?(0,t("grQpA").isGQLUnderlyingServiceError)(e)?"componentApi":"componentGraphQL":"uncaught"}}}).fire(t("3Spjc").FORGE_UI_ANALYTICS_CHANNEL)}},[g,E,I,f]),{error:E,extensions:g||[],loading:m}},e.exports.getPrefilteredExtensionsGQLResult=s}),o("grQpA",function(e,n){var t,o=((t={}).Container="CONTAINER",t.DataClassificationTag="DATA_CLASSIFICATION_TAG",t.ExtensionType="EXTENSION_TYPE",t.PrincipalType="PRINCIPAL_TYPE",t.AppIdEnvironmentId="APP_ID_ENVIRONMENT_ID",t);e.exports.GQLExtensionContextsFilterType=o,e.exports.isGQLGatewayError=e=>e.extensions&&e.extensions.errorSource&&"GRAPHQL_GATEWAY"===e.extensions.errorSource,e.exports.isGQLUnderlyingServiceError=e=>e.extensions&&e.extensions.errorSource&&"UNDERLYING_SERVICE"===e.extensions.errorSource}),o("39Ajm",function(e,n){let o=e=>`[
    ${e.map(e=>`"${e}"`).join(", ")}
  ]`,r=(0,t("eSUdr").default)`query FetchPreFilteredForgeAppsQuery($cloudId:ID!$context:ConfluenceExtensionRenderingContextInput$includeHidden:Boolean$locale:String$types:[String]){confluence_forgeExtensionsByType(cloudId:$cloudId context:$context includeHidden:$includeHidden locale:$locale types:$types){id appId appVersion appOwner environmentId environmentType environmentKey consentUrl migrationKey userAccess{enabled hasAccess}key properties{key value}egress{addresses category type inScopeEUD}scopes license{active capabilitySet billingPeriod ccpEntitlementId ccpEntitlementSlug isEvaluation subscriptionEndDate trialEndDate type}type installationId hiddenBy}}`;e.exports.getExtensionListQueryOld=(e,n,r)=>{let i=n?.map(e=>`"${e}"`)||["$type"],s=(0,t("dh538").fg)("platform-forge-ui-useraccess-in-extension-query")?`userAccess {
    enabled
    hasAccess
  }`:"",a=`
  query forge_ui_extensionList($contextIds: [ID!]!${n?"":", $type: String!"}, $locale: String) {
    extensionContexts(contextIds: $contextIds) {
      id
      ${i.map(n=>`
        extensionsByType(type: ${n}, locale: $locale ) {
          id
          appId
          key
          ${e?`appOwner {
            name
          }`:""}
          environmentId
          environmentType
          environmentKey
          properties
          license {
            active
            type
            supportEntitlementNumber
            trialEndDate
            subscriptionEndDate
            isEvaluation
            billingPeriod
            ccpEntitlementId
            ccpEntitlementSlug
						capabilitySet
            modes
          }
          ${s}
          type
          appVersion
          installationId
          migrationKey
					installationConfig {
						key
						value
					}
          egress {
            type
            addresses
						category
						inScopeEUD
          }
					scopes
					consentUrl
					currentUserConsent {
						user {
							aaid
						}
						appEnvironmentVersion {
							id
						}
						consentedAt
					}
					requiresUserConsent
          ${r&&r.length>0?`
                dataClassificationPolicyDecision(input: {
                  dataClassificationTags: ${o(r)}
                }) {
                  status
                }
              `:""}
        }`).join("")}
    }
  }`;return(0,t("eSUdr").default)`${a}`},e.exports.getExtensionListQuery=(e,n)=>{let r=(0,t("dh538").fg)("platform-forge-ui-useraccess-in-extension-query")?`userAccess {
    enabled
    hasAccess
  }`:"",i=`
  query forge_ui_extensionList($contextIds: [ID!]!, $filter: [ExtensionContextsFilter!]!, $locale: String ) {
    extensionContexts(contextIds: $contextIds) {
      id
      extensions(filter: $filter, locale: $locale) @optIn(to: "Access-Narrowing") {
        id
        appId
        key
        ${e?`appOwner {
          name
        }`:""}
        environmentId
        environmentType
        environmentKey
        properties
        license {
          active
          type
          supportEntitlementNumber
          trialEndDate
          subscriptionEndDate
          isEvaluation
          billingPeriod
          ccpEntitlementId
          ccpEntitlementSlug
					capabilitySet
          modes
        }
        ${r}
        type
        appVersion
        installationId
        migrationKey
				installationConfig {
					key
					value
				}
        egress {
          type
          addresses
					category
					inScopeEUD
        }
				scopes
				consentUrl
				currentUserConsent {
					user {
						aaid
					}
					appEnvironmentVersion {
						id
					}
					consentedAt
				}
				requiresUserConsent
        ${n&&n.length>0?`
              dataClassificationPolicyDecision(input: {
                dataClassificationTags: ${o(n)}
              }) {
                status
              }
            `:""}
      },
    }
  }`;return(0,t("eSUdr").default)`${i}`},e.exports.FetchPreFilteredForgeAppsQuery=r}),o("1Igmn",function(e,n){e.exports.createAtlAttributionHeader=e=>JSON.stringify({atlWorkspaceAri:e,service:"forge-ui"})}),o("8VYSW",function(e,n){t("1c598");var o=t("2JC3k");let r=new Map;e.exports.transformPreFilteredExtensions=e=>{let n=(e||[]).map(e=>e.id).join(",");if(r.has(n))return r.get(n);let t=(e||[]).flatMap(e=>e&&e.environmentKey?[{id:e.id,appId:e.appId,key:e.key,environmentId:e.environmentId,environmentType:e.environmentType===o.ExtensionEnvironment.DEVELOPMENT||e.environmentType===o.ExtensionEnvironment.STAGING||e.environmentType===o.ExtensionEnvironment.PRODUCTION?e.environmentType:o.ExtensionEnvironment.DEVELOPMENT,environmentKey:e.environmentKey,properties:e.properties.reduce((e,n)=>{if(!n.value||!n.key)return e;try{let t=JSON.parse(n.value);e[n.key]=t}catch(t){e[n.key]=n.value}return e},{}),license:e.license?{...e.license,capabilitySet:"CAPABILITY_ADVANCED"===e.license.capabilitySet?"capabilityAdvanced":"capabilityStandard"}:null,userAccess:e.userAccess?{hasAccess:e.userAccess.hasAccess??!1,enabled:e.userAccess.enabled??!1}:null,type:e.type,installationId:e.installationId,appVersion:e.appVersion??void 0,consentUrl:e.consentUrl??void 0,migrationKey:e.migrationKey??void 0,egress:e.egress?.flatMap(e=>e.type&&e.addresses?[{type:e.type,addresses:e.addresses?.flatMap(e=>e??[]),category:e.category??void 0,inScopeEUD:e.inScopeEUD??void 0}]:[])??void 0,scopes:e.scopes??void 0,installationConfig:e.installationConfig?.flatMap(e=>e?.key&&null!==e.value?[{key:e.key,value:e.value}]:[])??void 0,dataClassificationPolicyDecision:{status:"APP_ACCESS_RULES"===e.hiddenBy?"BLOCKED":"ALLOWED"}}]:[]);return r.set(n,t),t}}),o("kqIWy",function(e,n){var o=t("frIzR");e.exports.useSpaceDetail=e=>{let n,r,i,s=(0,o.c)(8);s[0]!==e?(n={variables:{spaceKey:e}},s[0]=e,s[1]=n):n=s[1];let a=n,{loading:c,data:l,error:d}=(0,t("jtuBN").useQueryNoFurtherUpdateInterop)(t("4ZxLt").default,a);return s[2]!==l?(r=l?{spaceId:l.space?.id,type:l.space?.type,name:l.space?.name,dataClassificationTags:l.space?.dataClassificationTags,alias:l.space?.alias,homepage:l.space?.homepage,iconPath:l.space?.icon?.path}:void 0,s[2]=l,s[3]=r):r=s[3],s[4]!==d||s[5]!==c||s[6]!==r?(i={loading:c,data:r,error:d},s[4]=d,s[5]=c,s[6]=r,s[7]=i):i=s[7],i}}),o("4ZxLt",function(e,n){var t,o,r,i;let s={fragment:{argumentDefinitions:t=[{defaultValue:null,kind:"LocalArgument",name:"spaceKey"}],kind:"Fragment",name:"useSpaceDetailQuery",selections:i=[{args:[{kind:"Variable",name:"key",variableName:"spaceKey"}],concreteType:"Space",kind:"LinkedField",name:"space",plural:!1,selections:[o={kind:"ScalarField",name:"id"},{kind:"ScalarField",name:"name"},{kind:"ScalarField",name:"alias"},{kind:"ScalarField",name:"key"},r={kind:"ScalarField",name:"type"},{kind:"ScalarField",name:"dataClassificationTags"},{concreteType:"Content",kind:"LinkedField",name:"homepage",plural:!1,selections:[o,{kind:"ScalarField",name:"title"},r]},{concreteType:"Icon",kind:"LinkedField",name:"icon",plural:!1,selections:[{kind:"ScalarField",name:"path"}]}]}],type:"Query"},kind:"Request",operation:{argumentDefinitions:t,kind:"Operation",name:"useSpaceDetailQuery",selections:i},params:{cacheID:"5ea23e55ef5088b9c4837d3773b81cb1",id:"e1e2926e708d3fd40690e6907effdf9227a54de6cc9fa82c15ff0acd3a82250d",metadata:{},name:"useSpaceDetailQuery",operationKind:"query",text:"query useSpaceDetailQuery($spaceKey:String){space(key:$spaceKey){id,name,alias,key,type,dataClassificationTags,homepage{id,title,type},icon{path}}}"}};s.hash="a1e29398bca6058e29a8240f26bd213b",e.exports.default=s}),o("bFDX4",function(e,n){e.exports.isTooManyRequestsError=e=>(0,t("aMcHK").isStatusCodeError)(e,"429")}),o("6qkXi",function(e,n){e.exports.getUsePrefilteredExtensionListOptions=({cloudId:e,locale:n,moduleType:o,queryOptions:r,includeHidden:i,spaceKey:s,contentId:a,spaceContextOnly:c=!1})=>({client:(0,t("gKr8t").getAGGClient)(),cloudId:e,types:[o],queryOptions:{...r},locale:n,context:c?{spaceKey:s}:{spaceKey:s,contentId:a},includeHidden:i})});
//# sourceMappingURL=main.2489be37.js.map
