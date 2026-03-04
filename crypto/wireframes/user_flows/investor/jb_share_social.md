---
title: "JTBD Flow — Share and Promote My Investments"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

## Overview

- Codename: `JB_SHARE`
- Job statement: "As an investor, I want to share and promote my investments so that peers can see my success and join the platform"
- Role: `RL_INV`
- Phases: DISC
- Epics: `EP_SOCV` (Social Validation)
- Wireframe screens: No dedicated screens yet (uses portfolio from `investor/oset/portfolio.html`)
- Entry point: Portfolio screen (`JB_SETTLE`)
- Exit point: Peer onboarding (`JB_READY` for the new user)

### Epic Summary

<details>
<summary>EP_SOCV features overview</summary>


#### Feature Table

| Epic | Feature | Description |
|------|---------|-------------|
| `EP_SOCV` | Shareable Portfolio | - Investor generates a unique share link from the portfolio screen<br/>- Link contains a cryptographically random token (`>=` 128-bit entropy)<br/>- URL format: `https://vpay.vn/rwa/portfolio/s/{token}`<br/>- Share links have TTL (default 7 days)<br/>- Max 10 active share links per investor |
| `EP_SOCV` | Anonymized View | - Shared view displays: token count, total invested, gain/loss `%`, duration<br/>- Shared view does NOT display: name, wallet address, phone, email, transaction history<br/>- Financial disclaimer must be visible on shared view |
| `EP_SOCV` | Referral Deep Link | - Peer opens shared link in browser or app<br/>- If app installed: universal link opens VPay App directly<br/>- If app not installed: redirect to App Store / Google Play<br/>- Deferred deep link opens shared portfolio on first launch<br/>- Install CTA hands off to `UF_ONBO.EP_SSIN` |

</details>

---

## Happy Path Flow

### Social Sharing Journey

<details>
<summary>End-to-end social sharing flowchart</summary>


#### Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
flowchart LR
    subgraph Share["Share Generation"]
        A["RL_INV: Views Portfolio<br/><code>investor/oset/portfolio.html</code>"]
        B["RL_INV: Taps 'Share Portfolio'"]
        C["Platform: Generates Share Link"]
        D["RL_INV: Shares via Share Sheet"]
        A --> B --> C --> D
    end

    subgraph Peer["Peer Experience"]
        E["Peer: Receives Link"]
        F["Peer: Opens Link"]
        G["Platform: Renders Anonymized Portfolio<br/>+ Financial Disclaimer"]
        E --> F --> G
    end

    subgraph Convert["Conversion"]
        H{"Peer: Interested?"}
        I["Peer: Taps Install CTA"]
        J["Referral Deep Link → App Store"]
        K["Handoff → UF_ONBO.EP_SSIN"]
        L["Peer: Exits"]
        H -->|Yes| I --> J --> K
        H -->|No| L
    end

    D --> E
    G --> H
```

#### Screen Mapping Table

- No dedicated wireframe screens exist yet for `JB_SHARE`
- The following screens are referenced from other JTBDs or are pending wireframe design

| Step | Screen Label | Wireframe Path | Status |
|------|-------------|----------------|--------|
| Portfolio entry point | Portfolio | `investor/oset/portfolio.html` | Exists (from `JB_SETTLE`) |
| Share button / share sheet | Share Portfolio | Pending wireframe design | Not yet created |
| Anonymized portfolio view | Shared Portfolio View | Pending wireframe design | Not yet created |
| App store redirect | Install CTA | Pending wireframe design | Not yet created |
| Peer onboarding handoff | VPay Entry | `investor/onbo/vpay-entry.html` | Exists (from `JB_READY`) |

</details>

---

## Decision Points

### Key Branching Logic

<details>
<summary>Decision points in the social sharing flow</summary>


#### Decision Table

| Decision Point | Condition | True Path | False Path |
|---------------|-----------|-----------|------------|
| Authenticated? | Investor has active VPay session | Proceed to share link generation | Redirect to VPay Sign-In |
| eKYC completed? | `kycLevel` `>=` 2 | Allow share generation | Show message: complete eKYC first |
| Rate limit OK? | Share generation not rate-limited | Generate unique share token | Display: "Please wait before generating another link" |
| Max active links (`>` 10)? | Investor has `>` 10 active share links | Revoke oldest link, then generate new | Generate new link normally |
| App installed on peer device? | Universal link resolves to installed app | Open VPay App directly via universal link | Redirect to App Store / Google Play |
| Peer interested? | Peer taps "Start Investing" CTA | Handoff to `UF_ONBO.EP_SSIN` | Peer closes view |
| Share link expired? | Current time `>` link creation time + TTL | Show "Portfolio no longer available" | Render anonymized portfolio view |

</details>

---

## Error Paths

### Error Recovery Flows

<details>
<summary>Error handling for social sharing</summary>


#### Error Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
flowchart TD
    subgraph AuthErrors["Authentication Errors"]
        E1["Not Authenticated"]
        E1R["Redirect to VPay Sign-In"]
        E1 -->|"Sign in required"| E1R
    end

    subgraph RateErrors["Rate Limit Errors"]
        E2["Rate Limit Exceeded"]
        E2R["Display: 'Please wait<br/>before generating another link'"]
        E2 -->|"Cooldown period"| E2R
    end

    subgraph PortfolioErrors["Portfolio Errors"]
        E3["Zero Balance Portfolio"]
        E3R["Empty State Message:<br/>'No investments to share yet'"]
        E3 -->|"Nothing to share"| E3R
    end

    subgraph LinkErrors["Share Link Errors"]
        E4["Expired Share Link"]
        E4R["Display: 'Portfolio no longer available'<br/>+ Install CTA"]
        E4 -->|"TTL exceeded"| E4R
    end

    subgraph DeepLinkErrors["Deep Link Errors"]
        E5["Deferred Deep Link Failure"]
        E5R["Show App Home Instead"]
        E5 -->|"Fallback to home"| E5R
    end
```

#### Recovery Table

| Error | Trigger | Recovery Action |
|-------|---------|-----------------|
| Not authenticated | Investor session expired or not logged in | Redirect to VPay Sign-In; return to portfolio after auth |
| Rate limit exceeded | Too many share link generation requests in short period | Display cooldown message; auto-retry after cooldown expires |
| Zero balance portfolio | Investor has no token holdings to share | Show empty state with message "No investments to share yet"; suggest browsing projects |
| Expired share link | Peer opens link after TTL (default 7 days) has passed | Show "Portfolio no longer available" message with Install CTA as fallback |
| Deferred deep link failure | Deep link parameters lost during app install process | Show app home screen instead of shared portfolio; peer can still onboard normally |
| Share link generation failure | API error on `POST /api/v1/portfolio/share` | Show error toast with manual retry button; use idempotency key for retry |
| Max active links reached | Investor already has 10 active share links | Prompt to revoke oldest link or deny generation with message |

</details>

---

## Cross-Role Interactions

### System Sequence

<details>
<summary>RL_INV, VPay, RWA API, and Peer interactions</summary>


#### Sequence Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
sequenceDiagram
    participant INV as RL_INV<br/>Investor
    participant APP as VPay App
    participant BE as VPay BE
    participant RWA as RWA API

    note over INV, RWA: Share Link Generation

    INV->>APP: Navigate to Portfolio screen
    INV->>APP: Tap "Share Portfolio" button
    APP->>BE: Verify authentication + eKYC status
    BE-->>APP: Auth confirmed (kycLevel >= 2)
    APP->>BE: POST /api/v1/portfolio/share
    BE->>BE: Check rate limit
    BE->>RWA: Generate unique share token (>= 128-bit entropy)
    RWA->>RWA: Create ShareLink record with TTL (7 days)
    RWA-->>BE: Return share URL
    BE-->>APP: Share URL: https://vpay.vn/rwa/portfolio/s/{token}
    APP->>INV: Display share sheet (copy, messaging, social)
    INV->>APP: Share link via chosen channel

    participant PEER as Peer
    participant BROWSER as Browser

    note over PEER, RWA: Shared Portfolio View

    PEER->>BROWSER: Tap shared link
    BROWSER->>RWA: GET /rwa/portfolio/s/{token}
    RWA->>RWA: Validate token + check TTL
    RWA-->>BROWSER: Anonymized portfolio data
    BROWSER->>PEER: Render: token count, total invested, gain/loss %, duration
    BROWSER->>PEER: Display financial disclaimer
    BROWSER->>PEER: Display "Start Investing" CTA

    note over PEER, RWA: Referral Conversion

    PEER->>BROWSER: Tap "Start Investing" CTA
    alt App Installed
        BROWSER->>APP: Universal link opens VPay App
        APP->>PEER: Show shared portfolio in-app
    else App Not Installed
        BROWSER->>PEER: Redirect to App Store / Google Play
        PEER->>APP: Install VPay App
        APP->>RWA: Resolve deferred deep link
        RWA-->>APP: Shared portfolio context
        APP->>PEER: Open shared portfolio on first launch
    end
    PEER->>APP: Tap "Start Investing" in-app
    APP->>PEER: Handoff → UF_ONBO.EP_SSIN
```

</details>

---

## References

### Source Documents

<details>
<summary>PRD and wireframe references</summary>


#### PRD Links

- [EP_SOCV — Social Validation (DISC)](../../../nghia_po_proposal/prd/rp2511_e46_sseq_disc_ep_socv.md)

#### Wireframe Links

- ../../investor/oset/portfolio.html — entry point for sharing
- Note: Dedicated share screens pending wireframe design

</details>
