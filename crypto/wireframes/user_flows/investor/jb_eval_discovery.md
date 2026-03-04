---
title: "JTBD — Find and Evaluate Investments"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

## Overview

<details>
<summary>Job-to-be-Done: Find and Evaluate Investments</summary>


- **Codename:** `JB_EVAL`
- **Job statement:** "As an investor, I want to find and evaluate investments so that I can make informed decisions"
- **Role:** `RL_INV`
- **Phases:** PREO
- **Epics:** `EP_HOME`, `EP_PROJ`, `EP_PROP`, `EP_EDUC`
- **Wireframe screens:** 6 screens in `investor/preo/`
- **Entry point:** Home screen after onboarding (`JB_READY`)
- **Exit point:** Token Offering (handoff to `JB_INVEST`)

#### Epic Summary

| Epic | Features | Description |
|------|----------|-------------|
| `EP_HOME` — Home Screen Display | FT_HERO (Hero Banner)<br/>FT_TOCO (Token Offering Cards)<br/>FT_FEAT (Featured Projects + Education + Market Highlights) | Primary entry point after login. Displays hero banner, active/upcoming TO cards, featured projects, education link, and market highlights. Hands off to `EP_PROJ`, `UF_TOKO`, or `EP_EDUC`. |
| `EP_PROJ` — Project Exploration | FT_PJLS (Project List)<br/>FT_PJCM (Project Comparison)<br/>FT_PJDT (Project Details)<br/>FT_IMGL (Image Gallery) | Browse, filter, compare, and research real estate projects. Grid/list view, side-by-side comparison (up to 3), tabbed details (Overview, Properties, Documents, Market Data), and 10+ photo gallery with 360 tour. |
| `EP_PROP` — Property Exploration | FT_PPLS (Property List)<br/>FT_PPDT (Property Details)<br/>FT_WTLS (Watchlist) | Browse and filter individual properties within a project via dedicated Property List screen (`property-list.html`) with search, type filters, sort, and pagination. View 5-image gallery with counter, floor plan, specifications, location map. FT_PJCM (comparison), FT_IMGL (full gallery), FT_WTLS (watchlist) deferred for Alpha. |
| `EP_EDUC` — Educational Content | FT_EDCT (Education Center)<br/>FT_CALC (Investment Calculator) | Education Hub with categorized articles (Getting Started, Advanced Topics, FAQs) and Investment Calculator for ROI estimation with bank savings comparison. Hands off to `UF_TOKO` via "Invest Now" CTA. |

</details>

---

## Happy Path Flow

### Discovery & Evaluation Journey

<details>
<summary>End-to-end browsing flow from Home to Token Offering handoff</summary>


#### Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
flowchart LR
    subgraph EP_HOME["EP_HOME — Home Screen"]
        A["Home<br/><code>investor/preo/home.html</code>"]
    end

    subgraph EP_PROJ["EP_PROJ — Project Exploration"]
        B["Project List<br/><code>investor/preo/project-list.html</code>"]
        C["Project Details<br/><code>investor/preo/project-details.html</code>"]
    end

    subgraph EP_PROP["EP_PROP — Property Exploration"]
        D1["Property List<br/><code>investor/preo/property-list.html</code>"]
        D2["Property Details<br/><code>investor/preo/property-details.html</code>"]
    end

    subgraph EP_EDUC["EP_EDUC — Education"]
        E["Calculator<br/><code>investor/preo/calculator.html</code>"]
    end

    A -->|Tap Project Card| B
    A -->|Tap Education Link| E
    B -->|Tap Project Card| C
    C -->|View All Properties| D1
    D1 -->|Tap Property Card| D2
    C -->|Tap Property Preview| D2
    D2 -->|View Calculator| E
    A -->|Tap Hero Banner / TO Card| F["Campaign List<br/>Handoff to JB_INVEST"]
    C -->|Tap Join Offering| F
    E -->|Tap Invest CTA| F
```

---

#### Screen Mapping Table

| Screen | Wireframe | Epic | Key Features | Entry From | Exit To |
|--------|-----------|------|--------------|------------|---------|
| Home | `investor/preo/home.html` | `EP_HOME` | Hero banner (FT_HERO)<br/>TO cards (FT_TOCO)<br/>Featured projects (FT_FEAT)<br/>Explore mode (`?mode=explore`): KYC banner, restricted Buy Tokens | `JB_READY` (onboarding complete) or KYC skip (`?mode=explore`) | `EP_PROJ`, `EP_EDUC`, `UF_TOKO` |
| Project List | `investor/preo/project-list.html` | `EP_PROJ` | Grid/list view (FT_PJLS)<br/>Filter by location, type, status<br/>Sort by valuation, price, date | Home (project card tap) | Project Details |
| Project Details | `investor/preo/project-details.html` | `EP_PROJ` | Project overview (FT_PJDT)<br/>3-property preview with count badge<br/>"View All N Properties" link<br/>Join Offering CTA | Project List (card tap) | Property List, Property Details, `UF_TOKO`, `EP_EDUC` |
| Property List | `investor/preo/property-list.html` | `EP_PROP` | Dedicated property browsing (FT_PPLS)<br/>Search by address<br/>Filter chips: All, Apartment, Villa, Shophouse, Penthouse<br/>Sort: NAV, Area, Floor<br/>"Load More" pagination (10 at a time) | Project Details ("View All" link) | Property Details |
| Property Details | `investor/preo/property-details.html` | `EP_PROP` | 5-image gallery with counter badge and dot indicators (FT_PPDT)<br/>Specs, location map<br/>NAV card with token equivalent | Property List (card tap) or Project Details (preview tap) | `EP_EDUC` (calculator) |
| Calculator | `investor/preo/calculator.html` | `EP_EDUC` | Investment amount input (FT_CALC)<br/>Token count, ROI, yield `%`<br/>Invest Now CTA<br/>Back via `history.back()` | Home (education link), Property Details, Project Details | `UF_TOKO` (Invest CTA) |

</details>

---

## Decision Points

### Key Branching Logic

<details>
<summary>User decision points across all four epics</summary>


#### Decision Table

| Screen | Decision Point | Options | Target |
|--------|---------------|---------|--------|
| Home (`EP_HOME`) | User action on home screen | Tap Hero Banner | Campaign Details (`UF_TOKO`) |
| | | Tap TO Card | Campaign Details (`UF_TOKO`) |
| | | Tap Project Card | Project Details (`EP_PROJ`) |
| | | Tap Education Link | Education Hub (`EP_EDUC`) |
| | | No action / browse | Stay on Home Screen |
| Project List (`EP_PROJ`) | User action on project list | Tap Project Card | Project Details (FT_PJDT) |
| | | Select for Comparison | Project Comparison (FT_PJCM) |
| | | Apply Filters | Filtered List (FT_PJLS) |
| Project Details (`EP_PROJ`) | Detail action | View All Properties | Property List (`EP_PROP` — FT_PPLS) |
| | | Tap Property Preview | Property Details (FT_PPDT) |
| | | Tap Join Offering | Token Offering (`UF_TOKO`) |
| | | Investment Calculator | Calculator (FT_CALC) |
| Property List (`EP_PROP`) | Browsing action | Search by Address | Filtered Property List |
| | | Filter by Type | Type-filtered Property List |
| | | Sort by NAV/Area/Floor | Sorted Property List |
| | | Tap Property Card | Property Details (FT_PPDT) |
| | | Load More | Show next 10 properties |
| Property Details (`EP_PROP`) | Detail action | Scroll Image Gallery | 5-image carousel with counter |
| | | View Calculator | Financial Calculator |
| | | View Map | Location Map with Amenities |
| Education (`EP_EDUC`) | User action | Browse Articles | Article View (FT_EDCT) |
| | | Use Calculator | Investment Calculator (FT_CALC) |
| | | Browse FAQs | FAQ Section (FT_EDCT) |
| Calculator (`EP_EDUC`) | Result action | Tap Invest CTA | Token Offering (`UF_TOKO`) — amount pre-filled, handoff to `JB_INVEST` |
| | | Modify Inputs | Recalculate |
| | | Back | Return to Education Hub |

</details>

---

## Error Paths

### Error Recovery Flows

<details>
<summary>Error scenarios and recovery strategies</summary>


#### Error Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
flowchart TD
    subgraph HOME["EP_HOME Errors"]
        H1["API failure on home load"] -->|Recovery| H2["Retry + show cached data"]
        H3["Hero banner image fails"] -->|Recovery| H4["Placeholder with campaign title"]
        H5["No active campaigns"] -->|Recovery| H6["Empty state: No active offerings"]
    end

    subgraph PROJ["EP_PROJ Errors"]
        P1["Project list empty"] -->|Recovery| P2["No projects state + education link"]
        P3["Project details load failure"] -->|Recovery| P4["Error message + retry button"]
        P5["Image gallery load failure"] -->|Recovery| P6["Placeholder + retry icon per image"]
        P7["Filter returns no results"] -->|Recovery| P8["No matches + Clear all filters"]
    end

    subgraph PROP["EP_PROP Errors"]
        R1["Property not found"] -->|Recovery| R2["Error message + back to list"]
        R3["Photo loading error"] -->|Recovery| R4["Placeholder + retry icon"]
        R5["Watchlist full — 50 items"] -->|Recovery| R6["Toast: Limit reached"]
        R7["Watchlist network error"] -->|Recovery| R8["Retry 3x + revert icon state"]
    end

    subgraph EDUC["EP_EDUC Errors"]
        E1["Content not available"] -->|Recovery| E2["Coming soon message"]
        E3["Video fails to load"] -->|Recovery| E4["Video unavailable + retry"]
        E5["Calculator project data unavailable"] -->|Recovery| E6["Calculator temporarily unavailable"]
        E7["Amount below/above limits"] -->|Recovery| E8["Validation error + disable calculate"]
    end
```

---

#### Recovery Table

| Screen | Error Scenario | User Experience | Recovery Action |
|--------|---------------|-----------------|-----------------|
| Home | API aggregation failure | Cached home screen displayed with "Last updated" timestamp | Auto-retry on reconnect; pull-to-refresh available |
| Home | Partial data failure (TokOff Service down) | Projects section loads normally; TO cards show "Unable to load offerings. Tap to retry." | Each section loads independently; tap-to-retry per section |
| Home | Offline mode | Cached data shown; "Offline" indicator; CTA buttons disabled | Auto-refresh on reconnection |
| Project List | No projects exist | "No projects available yet" + education link | Admin publishes project via `EP_PROJ` admin flow |
| Project List | Filter returns empty | "No matches found" + "Try adjusting your filters" + "Clear all filters" button | Tap clear to reset filters |
| Project Details | Project not found (404) | "Project not found" + "Back to Projects" button | Navigate back to project list |
| Project Details | Documents not uploaded | Per-document placeholder: "Document will be available soon" | Admin uploads via `EP_INIT` |
| Image Gallery | Image fails to load | Placeholder with retry icon; can swipe past to next image | Tap retry to reload; swipe to skip |
| Property Details | Property not found (404) | "Property not found" + "Back to Properties" button | Navigate back to property list |
| Property Details | Watchlist full (50 items) | Toast: "Watchlist limit reached (50 items). Remove a property before adding new ones." | Heart icon stays outlined; remove items first |
| Property Details | Watchlist network error | Heart icon reverts to previous state; toast: "Unable to save. Check your connection." | Retry with exponential backoff (3 attempts) |
| Education Hub | No published content | "Educational content coming soon" + home link; calculator still accessible | Admin publishes content via CMS |
| Education Hub | Article not found (404) | "Article not found" + link back to Education Hub | Navigate back to hub |
| Calculator | Project data unavailable | "Calculator temporarily unavailable. Please try again later." + disabled inputs | Retry button; education articles remain accessible |
| Calculator | Amount below minimum | Validation: "Minimum investment is `10,000,000` VND"; calculate button disabled | User adjusts amount to valid range |
| Calculator | Amount above maximum | Validation: "Maximum investment is `100,000,000` VND"; calculate button disabled | User adjusts amount to valid range |

</details>

---

## Cross-Role Interactions

### System Sequence

<details>
<summary>System interactions for home data aggregation and project/property data loading</summary>


#### Sequence Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
sequenceDiagram
    participant INV as RL_INV<br/>Investor
    participant APP as VPay App
    participant BE as VPay Backend
    participant API as RWA Platform API
    participant PS as Project Service
    participant TOS as TokOff Service
    participant PRS as Property Service
    participant CMS as Content Service

    Note over INV,CMS: EP_HOME — Home Screen Data Aggregation
    INV->>APP: Open app / Tap Home tab
    APP->>BE: Request home data
    BE->>API: GET /home
    API->>PS: getFeaturedProjects()
    API->>TOS: getActiveCampaigns()
    API->>CMS: getHeroBanner()
    PS-->>API: Project list
    TOS-->>API: Campaign list
    CMS-->>API: Banner data
    API-->>BE: Combined response (banner + campaigns + projects)
    BE-->>APP: Home screen data
    APP-->>INV: Render home screen

    Note over INV,CMS: EP_PROJ — Project Details Loading
    INV->>APP: Tap project card
    APP->>BE: Request project details
    BE->>API: GET /projects/{id}
    API->>PS: getProjectDetails(id)
    API->>PRS: getProjectProperties(id)
    PS-->>API: Project + metadata
    PRS-->>API: Property summary
    API-->>BE: Combined project response
    BE-->>APP: Project details data
    APP-->>INV: Render project details (4 tabs)

    Note over INV,CMS: EP_PROP — Property Details Loading
    INV->>APP: Tap property card
    APP->>BE: Request property details
    BE->>API: GET /properties/{propertyId}
    API->>PRS: getPropertyDetails(propertyId)
    PRS-->>API: Property + gallery + floor plan
    API-->>BE: Property details response
    BE-->>APP: Property details data
    APP-->>INV: Render property details

    Note over INV,CMS: EP_EDUC — Education Content Loading
    INV->>APP: Tap Education link
    APP->>BE: Request education content
    BE->>API: GET /education/categories
    API->>CMS: getCategories() + getUserProgress()
    CMS-->>API: Categories + progress
    API-->>BE: Education hub data
    BE-->>APP: Education content
    APP-->>INV: Render Education Hub
```

</details>

---

## References

### Source Documents

<details>
<summary>PRD and wireframe links</summary>


#### PRD Links

- [EP_HOME PRD](../../../nghia_po_proposal/prd/rp2511_e48_sseq_preo_ep_home.md) — Home Screen Display for Investor (UF_PREO.EP_HOME)
  - Features: FT_HERO, FT_TOCO, FT_FEAT
  - 3 API endpoints: `GET /home`, `GET /campaigns/active`, `GET /projects/featured`
- [EP_PROJ PRD](../../../nghia_po_proposal/prd/rp2511_e48_sseq_preo_ep_proj.md) — Project Exploration for Investor (UF_PREO.EP_PROJ)
  - Features: FT_PJLS, FT_PJCM, FT_PJDT, FT_IMGL
  - 4 API endpoints: `GET /projects`, `GET /projects/{id}`, `GET /projects/compare`, `GET /projects/{id}/gallery`
- [EP_PROP PRD](../../../nghia_po_proposal/prd/rp2511_e48_sseq_preo_ep_prop.md) — Property Exploration for Investor (UF_PREO.EP_PROP)
  - Features: FT_PPLS, FT_PPDT, FT_WTLS
  - 4 API endpoints: `GET /projects/{projectId}/properties`, `GET /properties/{propertyId}`, `POST /watchlist/add`, `DELETE /watchlist/{propertyId}`
- [EP_EDUC PRD](../../../nghia_po_proposal/prd/rp2511_e48_sseq_preo_ep_educ.md) — Educational Content for Investor (UF_PREO.EP_EDUC)
  - Features: FT_EDCT, FT_CALC
  - 2 API endpoints: `GET /education/categories`, `GET /education/articles/{articleId}`

---

#### Wireframe Links

- ../../investor/preo/home.html — `investor/preo/home.html`
- ../../investor/preo/project-list.html — `investor/preo/project-list.html`
- ../../investor/preo/project-details.html — `investor/preo/project-details.html`
- ../../investor/preo/property-list.html — `investor/preo/property-list.html`
- ../../investor/preo/property-details.html — `investor/preo/property-details.html`
- ../../investor/preo/calculator.html — `investor/preo/calculator.html`

</details>
