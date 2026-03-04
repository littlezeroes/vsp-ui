# POLARIS RWA Wireframes -- Reference Guide

Quick-reference for creating and maintaining wireframe screens for the POLARIS RWA platform.

---

## Architecture Overview

- **Vanilla JS** -- no frameworks, no build tools, no bundler
- **String-based HTML generation** -- component functions return HTML strings
- **Browser `<script>` loading** -- `data.js` (mock data) and `components.js` (UI components) loaded via script tags
- **`styles.css`** -- shared design system for all roles (investor mobile + admin/BO desktop)
- **Investor screens** use pure CSS classes from `styles.css` (no Tailwind dependency)
- **Admin/BO screens** use `dk-*` CSS classes from `styles.css` (no Tailwind dependency)

---

## Directory Structure

```
wireframes/
  styles.css              # Shared design system (CSS variables + all classes)
  components.js           # Shared component library (returns HTML strings)
  data.js                 # Mock data (Vietnamese placeholder data)
  index.html              # Landing / role selection page
  investor/               # Investor screens (mobile 375x812 phone frame)
    onbo/                 #   UF_ONBO -- Onboarding (sign-up, eKYC, wallet)
    preo/                 #   UF_PREO -- Pre-Offering (home, project list/details)
    toko/                 #   UF_TOKO -- Token Offering (whitelist, commitment, confirmation)
    oset/                 #   UF_OSET -- Ownership Settlement (allocation, payment, receipt)
    mntr/                 #   UF_MNTR -- Monitoring (notifications, reports)
    prot/                 #   UF_PROT -- Protection (alerts, voting)
    liqd/                 #   UF_LIQD -- Liquidation (announcement, distribution, tax)
    supp/                 #   UF_SUPP -- Support (submit ticket)
    xfer/                 #   UF_XFER -- Transfer (hub, CEX, P2P, pool, status)
    redm/                 #   UF_REDM -- Redemption (eligibility, pool, request, assignment)
  admin/                  # Admin screens (desktop sidebar layout, 17 screens)
  bo/                     # Back Office screens (desktop sidebar layout, 11 screens)
```

---

## How to Create a New Wireframe

### Investor Screen (Phone Frame 375x812)

Two approaches exist in the codebase:

**Approach A -- Static HTML (used by most investor screens)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POLARIS - Page Title</title>
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../data.js"></script>
  <script src="../../components.js"></script>
</head>
<body class="phone-screen">

<div class="phone">
  <!-- Use renderInvestorHeader() or inline the header HTML -->
  <!-- Page content here -->
  <div class="bottom-space"></div>
</div>

</body>
</html>
```

**Approach B -- JS-rendered via `renderPageShell`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POLARIS - Page Title</title>
  <link rel="stylesheet" href="../../styles.css">
  <script src="../../data.js"></script>
  <script src="../../components.js"></script>
</head>
<body>
<div id="app"></div>
<script>
  const contentHtml = `
    <!-- Page content here -->
  `;
  document.getElementById('app').innerHTML =
    renderPageShell('investor', 'home', 'Page Title', contentHtml, { headerType: 'sub' });
</script>
</body>
</html>
```

- `headerType: 'main'` -- brand header (back to VPay + POLARIS logo + bell)
- `headerType: 'sub'` -- sub-page header (back arrow + page title)

---

### Admin Screen (Desktop Sidebar)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POLARIS Admin -- Page Title</title>
  <link rel="stylesheet" href="../styles.css">
  <script src="../data.js"></script>
  <script src="../components.js"></script>
</head>
<body>
<script>
  const contentHtml = `
    <!-- Page content here -->
  `;
  document.write(renderPageShell('admin', 'active-menu-id', 'Page Title', contentHtml));
</script>
</body>
</html>
```

**Valid `activePage` IDs for admin sidebar:**
`dashboard`, `user-management`, `projects`, `token-offering`, `settlement`, `monitoring`, `liquidation`, `market-health`, `compliance`, `xfer-management`, `redm-management`, `emergency`

---

### BO Screen (Desktop Sidebar)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title -- POLARIS Back Office</title>
  <link rel="stylesheet" href="../styles.css">
  <script src="../data.js"></script>
  <script src="../components.js"></script>
</head>
<body>
<div id="app"></div>
<script>
  const contentHtml = `
    <!-- Page content here -->
  `;
  document.getElementById('app').innerHTML =
    renderPageShell('bo', 'active-menu-id', 'Page Title', contentHtml);
</script>
</body>
</html>
```

**Valid `activePage` IDs for BO sidebar:**
`dashboard`, `queue`, `kyc-review`, `support`, `aml`, `compliance`, `training`, `xfer-review`, `redm-review`

---

## Component API Reference

All functions live in `components.js` and return HTML strings.

### Investor Components

| Function | Signature | Description |
|----------|-----------|-------------|
| `renderInvestorHeader` | `(title, { type, backHref, showNotification })` | Mini-app header. `type`: `'main'` (brand) or `'sub'` (page title). |
| `renderWalletCard` | `(balanceHtml, profitText)` | Dark green gradient wallet card. `balanceHtml` example: `'1.250.000.000 <span>d</span>'` |
| `renderProjectCard` | `(project, index, href)` | Project card with gradient image, stats, progress bar. `project` from `PROJECTS`. |
| `renderSectionHead` | `(title, linkText, linkHref)` | Section header with optional "see all" link. |
| `renderInfoRow` | `(label, value, valueClass)` | Label-value pair row. `valueClass`: `'green'`, `'danger'`, etc. |
| `renderListItem` | `({ iconBg, iconColor, iconSvg, title, subtitle, rightHtml, href })` | List item with icon, text, optional right side. |

### Admin Components

| Function | Signature | Description |
|----------|-----------|-------------|
| `renderAdminSidebar` | `(activePage)` | 260px dark sidebar with 12 menu items. |
| `renderAdminHeader` | `(title, userName)` | Top header bar with search, notification, user avatar. Default user: `'Admin Nguyen'`. |

### BO Components

| Function | Signature | Description |
|----------|-----------|-------------|
| `renderBOSidebar` | `(activePage)` | 260px dark sidebar with 9 menu items. |
| `renderBOHeader` | `(title, userName)` | Top header bar. Default user: `'BO Tran Minh'`. |

### Shared Components

| Function | Signature | Description |
|----------|-----------|-------------|
| `renderDataTable` | `(columns, rows, { compact })` | Table with gradient header. `columns`: `[{ key, label, align }]`. `rows`: array of objects. |
| `renderModal` | `(id, title, contentHtml, { size, showFooter, confirmText, cancelText, confirmClass })` | Modal with backdrop blur. `size`: `'sm'`, `'md'`, `'lg'`, `'xl'`. |
| `renderBadge` | `(status, text)` | Status badge. `status`: `'success'`, `'warning'`, `'danger'`, `'info'`, `'neutral'`. |
| `renderStatCard` | `(label, value, change, icon)` | Stat card with gradient icon. `change` example: `'+12%'`. `icon`: key from `ICONS`. |
| `renderDesktopCard` | `(title, contentHtml, { rightHtml, static, noPad })` | Card wrapper. `static: true` disables hover effect. |
| `renderProgressBar` | `(pct, label, { rightText, showLabel })` | Gradient progress bar. `pct`: 0-100. |
| `renderAlertCard` | `(type, title, desc, actionsHtml)` | Alert with left color stripe. `type`: `'success'`, `'warning'`, `'danger'`, `'info'`. |
| `renderFormGroup` | `(label, inputHtml, hint)` | Form field wrapper with label and optional hint text. |
| `renderTimeline` | `(steps)` | Timeline. `steps`: `[{ title, desc, color }]`. `color`: `'green'`, `'blue'`, `'yellow'`, `'red'`, `'gray'`. |
| `renderChatBubble` | `(message, sender, time, isSelf)` | Chat message bubble. `isSelf: true` for BO agent (right-aligned). |
| `renderEmptyState` | `(message, actionText, actionHref)` | Empty state placeholder with optional action button. |

### Layout

| Function | Signature | Description |
|----------|-----------|-------------|
| `renderPageShell` | `(role, activePage, title, contentHtml, { headerType, backHref })` | Full page layout. `role`: `'investor'`, `'admin'`, `'bo'`. |

### Utilities (DOM)

| Function | Description |
|----------|-------------|
| `openModal(id)` | Show modal by element ID |
| `closeModal(id)` | Hide modal by element ID |
| `toggleDropdown(id)` | Toggle dropdown visibility by element ID |

---

## Icon Reference

### `ICONS` (24x24, stroke-based)

```
back, bell, home, chart, arrows, user, users, building, token, wallet,
shield, eye, alert, dashboard, queue, support, check, x, logout, lock,
arrowUp, arrowDown, arrowRight, search, filter, calendar, location
```

**Usage:** `${ICONS.bell}` in template literals or as inline SVG.

### `ICONS_SM` (smaller variants: 18px, 14px, 15px)

```
back, bell, eye, arrowUp, location, arrowRight, building
```

**Usage:** `${ICONS_SM.back}` -- used primarily in investor headers and compact UI.

---

## Data API Reference

All constants and functions live in `data.js` as global declarations.

### Datasets

| Constant | Count | ID Prefix | Description |
|----------|-------|-----------|-------------|
| `INVESTORS` | 8 | `INV-` | Investor profiles (name, email, KYC status, wallet) |
| `PROJECTS` | 5 | `PRJ-` | RWA property projects (tokens, yield, status) |
| `PROPERTIES` | 8 | `PROP-` | Individual properties linked to projects |
| `CAMPAIGNS` | 4 | `CMP-` | Token offering campaigns |
| `KYC_CASES` | 8 | `KYC-` | KYC verification cases |
| `SUPPORT_TICKETS` | 6 | `TKT-` | Support tickets |
| `PORTFOLIO_HOLDINGS` | 5 | -- | Investor portfolio positions |
| `TRANSACTIONS` | 10 | `TX-` | Buy/transfer/redeem transactions |
| `LIQD_DISTRIBUTIONS` | 3 | `LIQD-` | Liquidation distributions |
| `PROT_ALERTS` | 5 | `PROT-` | Protection alerts (market, emergency, compliance) |
| `GOVERNANCE_VOTES` | 3 | `VOTE-` | Governance voting proposals |
| `NOTIFICATIONS` | 8 | `NOTIF-` | Investor notifications |
| `AML_CASES` | 4 | `AML-` | AML investigation cases |
| `TRAINING_MODULES` | 5 | `TRN-` | BO training modules |
| `XFER_TRANSFERS` | 5 | `XFER-` | Token transfers (CEX, P2P, market) |
| `XFER_P2P_OFFERS` | 3 | `P2P-` | P2P transfer offers |
| `REDM_REQUESTS` | 4 | `REDM-` | Redemption requests |
| `REDM_PROPERTIES` | 4 | `RPOOL-` | Redemption property pools |

### Utility Functions

| Function | Signature | Returns | Example |
|----------|-----------|---------|---------|
| `formatVND` | `(amount)` | `string` | `formatVND(5000000)` -> `'5.000.000 VND'` |
| `formatVNDShort` | `(amount)` | `string` | `formatVNDShort(3500000000)` -> `'3,5 ty'` |
| `formatVNDShortEN` | `(amount)` | `string` | `formatVNDShortEN(3500000000)` -> `'3.5B VND'` |
| `formatDateVN` | `(dateStr)` | `string` | `formatDateVN('2025-03-15')` -> `'15/03/2025'` |
| `formatDateEN` | `(dateStr)` | `string` | `formatDateEN('2025-03-15')` -> `'15/03/2025'` (en-GB) |
| `formatPercent` | `(value)` | `string` | `formatPercent(8.5)` -> `'8,5%'` |
| `getStatusColor` | `(status)` | `string` | `getStatusColor('VERIFIED')` -> `'success'` |
| `getStatusLabel` | `(status)` | `string` | `getStatusLabel('VERIFIED')` -> `'Da xac minh'` |
| `getStatusLabelEN` | `(status)` | `string` | `getStatusLabelEN('VERIFIED')` -> `'Verified'` |

---

## Design Tokens

CSS custom properties defined in `:root` of `styles.css`.

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--green` | `#00B894` | Primary brand color |
| `--green-dark` | `#00997A` | Hover states |
| `--green-light` | `#E8F8F5` | Light backgrounds |
| `--gold` | `#F0B429` | Accent |
| `--bg` | `#F5F6F8` | Page background (investor) |
| `--white` | `#FFFFFF` | Card backgrounds |
| `--text` | `#1A1A2E` | Primary text |
| `--text-2` | `#8E8E93` | Secondary text |
| `--text-3` | `#AEAEB2` | Tertiary/placeholder text |
| `--success` | `#16A34A` | Success states |
| `--warning` | `#D97706` | Warning states |
| `--danger` | `#DC2626` | Danger/error states |
| `--info` | `#2563EB` | Info states |
| `--admin-bg` | `#F0FDF4` | Desktop page background |
| `--admin-sidebar` | `#064E3B` | Sidebar background |
| `--admin-accent` | `#00B894` | Sidebar accent |

### Spacing & Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--pad` | `20px` | Standard side padding (investor) |
| `--r16` | `16px` | Large border-radius (cards) |
| `--r12` | `12px` | Medium border-radius (buttons, inputs) |
| `--r8` | `8px` | Small border-radius |

### Shadows

| Variable | Value |
|----------|-------|
| `--shadow` | `0 2px 12px rgba(0,0,0,0.06)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.1)` |

### Typography

- **Font stack:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Investor:** 12px-32px range (12px labels, 15px body, 17px titles, 32px wallet amount)
- **Desktop:** 11px-28px range (11px roles, 13px labels, 14px body, 20px page title, 28px stat values)

---

## CSS Class Reference

### Investor Mobile Classes

| Class | Description |
|-------|-------------|
| `phone-screen` | Body class -- dark background, centers phone frame |
| `phone` | 375x812 frame with Dynamic Island pseudo-element |
| `app-header` | Main header (brand variant) |
| `sub-header` | Sub-page header (back + title) |
| `btn-circle` | 36px circular button (back, notification) |
| `wallet` | Green gradient wallet card |
| `section` | Content section with side padding |
| `section-head` | Section title row with optional link |
| `card` / `card-body` / `card-pad` | Generic card |
| `proj-card` | Project card with image + stats |
| `list-item` | List row with icon + text + arrow |
| `info-row` | Label-value pair |
| `tabs` / `tab` | Tab navigation |
| `badge` / `badge-success` / `badge-warning` / `badge-danger` / `badge-info` / `badge-neutral` | Status badges |
| `btn-primary` / `btn-secondary` / `btn-pill` / `btn-outline` | Button styles |
| `input` / `input-label` / `input-hint` | Form inputs |
| `actions-row` / `action-item` / `action-icon` | Quick actions row |
| `stats-row` / `stat-box` | 3-column stats |
| `fade-in` | Fade-in animation |
| `bottom-space` | 48px spacer at bottom |

### Desktop Classes (`dk-*`)

| Class | Description |
|-------|-------------|
| `desktop-layout` | Flex container for sidebar + main |
| `dk-sidebar` | 260px fixed sidebar (dark gradient) |
| `dk-sidebar-item` / `.active` | Sidebar nav item |
| `dk-header` | Top header bar (68px) with gradient accent line |
| `dk-card` / `dk-card-static` | Card with/without hover effect |
| `dk-card-header` / `dk-card-pad` | Card header and body padding |
| `dk-stat` | Stat card |
| `dk-table-wrap` / `dk-table` | Data table |
| `dk-badge` / `dk-badge-success` / etc. | Desktop badges |
| `dk-btn` / `dk-btn-primary` / `dk-btn-secondary` / `dk-btn-danger` / `dk-btn-warning` / `dk-btn-ghost` / `dk-btn-sm` | Buttons |
| `dk-input` / `dk-select` / `dk-textarea` | Form inputs |
| `dk-form-group` / `dk-form-label` / `dk-form-hint` | Form field wrappers |
| `dk-progress-track` / `dk-progress-fill` | Progress bar |
| `dk-alert` / `dk-alert-success` / etc. | Alert cards |
| `dk-timeline` / `dk-timeline-item` | Timeline component |
| `dk-chat-msg` / `dk-chat-bubble` | Chat messages |
| `dk-modal-overlay` / `dk-modal` / `dk-modal-sm` / `dk-modal-md` / `dk-modal-lg` / `dk-modal-xl` | Modal system |
| `dk-tabs` / `dk-tab` | Desktop tab navigation |
| `dk-filter-bar` / `dk-search-input` | Filter and search bar |
| `dk-pagination` | Pagination controls |
| `dk-grid` / `dk-grid-2` / `dk-grid-3` / `dk-grid-4` / `dk-grid-5` | Grid layouts |
| `dk-grid-2-1` / `dk-grid-1-2` / `dk-grid-3-2` | Asymmetric grids |
| `dk-flex` / `dk-flex-between` | Flex utilities |
| `dk-step` / `dk-step-complete` / `dk-step-active` / `dk-step-pending` | Step tracker |
| `dk-divider` | Horizontal divider |
| `dk-fade-in` / `dk-slide-in` | Animations |
| `dk-breadcrumb` | Breadcrumb navigation |

### Shared Utilities

| Class | Description |
|-------|-------------|
| `hidden` | `display: none !important` |
| `proto-link` | Transition effect for prototype links |
| `proto-link-disabled` | Disabled link state |
| `badge-pulse` | Animated pulsing dot before badge text |

---

## Status System

### Status Enums and Color Mapping

| Status | Color | Vietnamese Label | English Label |
|--------|-------|------------------|---------------|
| `VERIFIED` | `success` | Da xac minh | Verified |
| `APPROVED` | `success` | Da duyet | Approved |
| `COMPLETED` | `success` | Hoan thanh | Completed |
| `ACTIVE` | `success` | Dang hoat dong | Active |
| `FUNDED` | `success` | Da goi von | Funded |
| `RESOLVED` | `success` | Da giai quyet | Resolved |
| `OPEN` | `info` | Dang mo | Open |
| `PENDING` | `warning` | Cho xu ly | Pending |
| `IN_REVIEW` | `warning` | Dang xem xet | In Review |
| `IN_PROGRESS` | `warning` | Dang xu ly | In Progress |
| `UPCOMING` | `warning` | Sap ra mat | Coming Soon |
| `PAUSED` | `warning` | Tam dung | Paused |
| `REJECTED` | `danger` | Tu choi | Rejected |
| `FAILED` | `danger` | That bai | Failed |
| `ESCALATED` | `danger` | Da nang cap | Escalated |
| `CRITICAL` | `danger` | Khan cap | Critical |
| `CLOSED` | `neutral` | Da dong | Closed |

**Additional English-only statuses** (in `getStatusLabelEN`):
`DECLARED`, `INVESTIGATING`, `CLEARED`, `ACKNOWLEDGED`, `QUEUED`, `ACCEPTED`, `EXECUTED`, `PASSED`, `EXPIRED`, `PROCESSING`, `AML_FLAGGED`, `NOT_STARTED`

**Risk levels** (used in KYC/AML): `LOW` (success), `MEDIUM` (warning), `HIGH` (danger)

### Usage Pattern

```js
// Render a status badge
renderBadge(getStatusColor(item.status), getStatusLabelEN(item.status))

// Vietnamese
renderBadge(getStatusColor(item.status), getStatusLabel(item.status))
```

---

## Naming Conventions

### File Naming

- **Kebab-case** for all HTML files: `kyc-review.html`, `transfer-hub.html`
- **Investor** screens organized by flow code: `investor/{flow}/screen.html`
- **Admin/BO** screens flat in their role directory: `admin/screen.html`, `bo/screen.html`

### Entity ID Prefixes

| Prefix | Entity |
|--------|--------|
| `INV-` | Investor |
| `PRJ-` | Project |
| `PROP-` | Property |
| `CMP-` | Campaign |
| `KYC-` | KYC Case |
| `TKT-` | Support Ticket |
| `TX-` | Transaction |
| `LIQD-` | Liquidation Distribution |
| `PROT-` | Protection Alert |
| `VOTE-` | Governance Vote |
| `NOTIF-` | Notification |
| `AML-` | AML Case |
| `TRN-` | Training Module |
| `XFER-` | Transfer |
| `P2P-` | P2P Offer |
| `REDM-` | Redemption Request |
| `RPOOL-` | Redemption Property Pool |

### Flow Codes (Investor)

`ONBO`, `PREO`, `TOKO`, `OSET`, `MNTR`, `PROT`, `LIQD`, `SUPP`, `XFER`, `REDM`
