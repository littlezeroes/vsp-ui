/* POLARIS RWA Platform -- Shared Component Library
 * Browser-loaded via <script src="components.js"></script>
 * All functions return HTML strings.
 * Investor components use VPay design system (pure CSS classes from styles.css).
 * Admin/BO components use Tailwind utility classes.
 * All user-facing text in Vietnamese.
 */

// ═══════════════════════════════════════════════════════════════════════
// ICONS (inline SVG, 24x24 viewBox, stroke-based)
// ═══════════════════════════════════════════════════════════════════════

const ICONS = {
  back: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
  bell: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  chart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  arrows: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  building: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6"/><line x1="12" y1="6" x2="12" y2="6"/><line x1="16" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/></svg>',
  token: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M8 10h8"/><path d="M8 14h8"/></svg>',
  wallet: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  eye: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  alert: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  queue: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  support: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  logout: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
  arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  filter: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  location: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

// Small icon variants (18px for headers, 14px for inline)
const ICONS_SM = {
  back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
  bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  eye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  arrowUp: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  location: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  arrowRight: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  building: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>',
};


// ═══════════════════════════════════════════════════════════════════════
// INVESTOR COMPONENTS (VPay Mini-App, 375px phone frame)
// Uses pure CSS classes from styles.css -- no Tailwind dependency
// ═══════════════════════════════════════════════════════════════════════

/**
 * Mini-app header for investor screens.
 * Main variant: back (to VPay) + POLARIS brand + notification bell
 * Sub variant:  back (to previous screen) + page title
 *
 * @param {string} title - Page title (used for sub-header variant)
 * @param {Object} options
 * @param {string} options.type - 'main' (brand header) or 'sub' (page title header)
 * @param {string} options.backHref - Custom back link (default: history.back())
 * @param {boolean} options.showNotification - Show notification bell (default: true)
 */
function renderInvestorHeader(title, options = {}) {
  const { type = 'sub', backHref = '', showNotification = true } = options;

  const backLink = backHref
    ? `<a href="${backHref}" class="btn-circle proto-link">${ICONS_SM.back}</a>`
    : `<a href="#" onclick="history.back();return false" class="btn-circle">${ICONS_SM.back}</a>`;

  const bellHtml = showNotification
    ? `<div class="btn-circle">${ICONS_SM.bell}<span class="badge-dot"></span></div>`
    : '';

  if (type === 'main') {
    return `
      <div class="app-header">
        ${backLink}
        <div class="app-brand">
          <div class="app-logo">${ICONS_SM.building}</div>
          <span class="app-name">POLARIS</span>
        </div>
        ${bellHtml || '<div style="width:36px"></div>'}
      </div>
    `;
  }

  // Sub-page header: back + title
  return `
    <div class="sub-header">
      ${backLink}
      <span class="sub-header-title">${title}</span>
    </div>
  `;
}

/**
 * Wallet balance card (dark green gradient).
 * @param {string} balanceHtml - Formatted balance (e.g., "1.250.000.000 <span>d</span>")
 * @param {string} profitText - Profit text (e.g., "+8.5% loi nhuan")
 */
function renderWalletCard(balanceHtml, profitText) {
  return `
    <div class="wallet fade-in">
      <div class="wallet-glow wallet-glow-1"></div>
      <div class="wallet-glow wallet-glow-2"></div>
      <div class="wallet-row">
        <span class="wallet-label">Investment Portfolio</span>
        <div class="wallet-hide">${ICONS_SM.eye} Hide balance</div>
      </div>
      <div class="wallet-amount">${balanceHtml}</div>
      <div class="wallet-profit">${ICONS_SM.arrowUp} ${profitText}</div>
    </div>
  `;
}

/**
 * Project card with image header, stats, and progress bar.
 * @param {Object} project - Project data object from data.js
 * @param {number} index - Index for gradient cycling
 * @param {string} href - Link target
 */
function renderProjectCard(project, index, href) {
  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
  ];
  const pct = project.totalTokens > 0 ? Math.round((project.soldTokens / project.totalTokens) * 100) : 0;
  const statusMap = { ACTIVE: 'Open', FUNDED: 'Funded', UPCOMING: 'Coming Soon', CLOSED: 'Closed' };
  const statusTxt = statusMap[project.status] || project.status;

  return `
    <a href="${href || '#'}" class="proj-card proto-link">
      <div class="proj-img" style="background:${gradients[index % gradients.length]}">
        <div class="proj-loc">${ICONS_SM.location} ${project.location}</div>
        <div class="proj-badge">${statusTxt}</div>
      </div>
      <div class="proj-body">
        <div class="proj-name">${project.name}</div>
        <div class="proj-stats">
          <div>
            <div class="proj-stat-label">Token Price</div>
            <div class="proj-stat-value">${typeof formatVNDShortEN === 'function' ? formatVNDShortEN(project.tokenPrice) : project.tokenPrice}</div>
          </div>
          <div style="text-align:right">
            <div class="proj-stat-label">Yield</div>
            <div class="proj-stat-value green">${project.expectedYield}%/yr</div>
          </div>
        </div>
        <div class="proj-progress">
          <div class="proj-progress-head">
            <span class="proj-progress-label">Progress</span>
            <span class="proj-progress-pct">${pct}%</span>
          </div>
          <div class="prog-track">
            <div class="prog-fill" style="width:${pct}%"></div>
          </div>
        </div>
      </div>
    </a>
  `;
}

/**
 * Section header with title and optional "see all" link.
 * @param {string} title - Section title
 * @param {string} linkText - Link text (optional)
 * @param {string} linkHref - Link href (optional)
 */
function renderSectionHead(title, linkText, linkHref) {
  const link = linkText ? `<a href="${linkHref || '#'}" class="section-link proto-link">${linkText}</a>` : '';
  return `
    <div class="section-head">
      <span class="section-title">${title}</span>
      ${link}
    </div>
  `;
}

/**
 * Info row (label-value pair, used in detail screens).
 * @param {string} label - Left label
 * @param {string} value - Right value
 * @param {string} valueClass - Optional class for value (e.g., 'green', 'danger')
 */
function renderInfoRow(label, value, valueClass) {
  const cls = valueClass ? ` ${valueClass}` : '';
  return `
    <div class="info-row">
      <span class="info-label">${label}</span>
      <span class="info-value${cls}">${value}</span>
    </div>
  `;
}

/**
 * List item with icon, text content, and optional right side.
 * @param {Object} opts
 * @param {string} opts.iconBg - Background CSS for icon (e.g., 'linear-gradient(135deg, #E8F8F5, #D1F2EB)')
 * @param {string} opts.iconColor - Icon color (e.g., '#00B894')
 * @param {string} opts.iconSvg - SVG string for icon
 * @param {string} opts.title - Item title
 * @param {string} opts.subtitle - Item subtitle
 * @param {string} opts.rightHtml - Right side HTML (optional)
 * @param {string} opts.href - Link href (optional)
 */
function renderListItem(opts) {
  const tag = opts.href ? 'a' : 'div';
  const hrefAttr = opts.href ? ` href="${opts.href}"` : '';
  const linkClass = opts.href ? ' proto-link' : '';
  return `
    <${tag}${hrefAttr} class="list-item${linkClass}">
      <div class="list-icon" style="background:${opts.iconBg || 'var(--green-light)'}; color:${opts.iconColor || 'var(--green)'}">
        ${opts.iconSvg || ''}
      </div>
      <div class="list-content">
        <strong>${opts.title}</strong>
        ${opts.subtitle ? `<p>${opts.subtitle}</p>` : ''}
      </div>
      ${opts.rightHtml || `<span class="list-arrow">${ICONS_SM.arrowRight}</span>`}
    </${tag}>
  `;
}


// ═══════════════════════════════════════════════════════════════════════
// ADMIN COMPONENTS (Desktop sidebar layout, high-fidelity)
// Uses dk-* CSS classes from styles.css -- no Tailwind dependency
// ═══════════════════════════════════════════════════════════════════════

/**
 * Admin sidebar navigation (260px, dark gradient, high-fidelity).
 * @param {string} activePage - Active menu item key
 */
function renderAdminSidebar(activePage = 'dashboard') {
  const menuItems = [
    { id: 'dashboard',        label: 'Dashboard',            icon: ICONS.dashboard, href: 'login.html' },
    { id: 'user-management',  label: 'Quan ly nguoi dung',   icon: ICONS.users,     href: 'user-management.html' },
    { id: 'projects',         label: 'Du an',                icon: ICONS.building,  href: 'project-setup.html' },
    { id: 'token-offering',   label: 'Token Offering',       icon: ICONS.token,     href: 'campaign-create.html' },
    { id: 'settlement',       label: 'Thanh toan',           icon: ICONS.wallet,    href: 'settlement-calc.html' },
    { id: 'monitoring',       label: 'Giam sat',             icon: ICONS.eye,       href: 'monitoring.html' },
    { id: 'liquidation',      label: 'Thanh ly',             icon: ICONS.token,     href: 'liquidation.html' },
    { id: 'market-health',    label: 'Suc khoe thi truong',  icon: ICONS.chart,     href: 'market-health.html' },
    { id: 'compliance',       label: 'Tuan thu',             icon: ICONS.shield,    href: 'compliance.html' },
    { id: 'xfer-management',  label: 'Quan ly chuyen nhuong', icon: ICONS.arrows,   href: 'xfer-management.html' },
    { id: 'redm-management',  label: 'Quan ly mua lai',      icon: ICONS.wallet,    href: 'redm-management.html' },
    { id: 'emergency',        label: 'Khoa khan cap',        icon: ICONS.alert,     href: 'emergency.html' },
  ];

  const menuHtml = menuItems.map(item => {
    const isActive = item.id === activePage;
    const cls = isActive ? 'dk-sidebar-item active' : 'dk-sidebar-item';
    return `
      <a href="${item.href}" class="${cls} proto-link">
        <span class="dk-sidebar-item-icon">${item.icon}</span>
        <span>${item.label}</span>
      </a>
    `;
  }).join('');

  return `
    <aside class="dk-sidebar">
      <div class="dk-sidebar-brand">
        <div class="dk-sidebar-logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>
        </div>
        <div>
          <div class="dk-sidebar-title">POLARIS</div>
          <div class="dk-sidebar-subtitle">Admin Dashboard</div>
        </div>
      </div>
      <nav class="dk-sidebar-nav">
        ${menuHtml}
      </nav>
      <div class="dk-sidebar-footer">
        <a href="../index.html" class="dk-sidebar-item proto-link">
          <span class="dk-sidebar-item-icon">${ICONS.logout}</span>
          <span>Dang xuat</span>
        </a>
      </div>
    </aside>
  `;
}

/**
 * Admin top header bar (high-fidelity with gradient accent line).
 * @param {string} title - Page title
 * @param {string} userName - Display name
 */
function renderAdminHeader(title, userName = 'Admin Nguyen') {
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  return `
    <header class="dk-header">
      <div class="dk-header-left">
        <div>
          <h1 class="dk-page-title">${title}</h1>
          <span class="dk-page-context">${dateStr}</span>
        </div>
      </div>
      <div class="dk-header-right">
        <div class="dk-header-search">
          ${ICONS.search}
          <span>Tim kiem...</span>
        </div>
        <div class="dk-header-notif">
          ${ICONS.bell}
          <span class="dk-header-notif-dot"></span>
        </div>
        <div class="dk-header-user">
          <div class="dk-header-avatar">${userName.charAt(0)}</div>
          <div>
            <div class="dk-header-user-name">${userName}</div>
            <div class="dk-header-user-role">Quan tri vien</div>
          </div>
        </div>
      </div>
    </header>
  `;
}


// ═══════════════════════════════════════════════════════════════════════
// BO COMPONENTS (Desktop sidebar layout, high-fidelity)
// ═══════════════════════════════════════════════════════════════════════

/**
 * BO sidebar navigation (260px, dark gradient, high-fidelity).
 * @param {string} activePage - Active menu item key
 */
function renderBOSidebar(activePage = 'dashboard') {
  const menuItems = [
    { id: 'dashboard',   label: 'Dashboard',     icon: ICONS.dashboard, href: 'login.html' },
    { id: 'queue',       label: 'Hang doi',       icon: ICONS.queue,     href: 'ticket-queue.html' },
    { id: 'kyc-review',  label: 'Duyet KYC',      icon: ICONS.shield,    href: 'kyc-review.html' },
    { id: 'support',     label: 'Ho tro',          icon: ICONS.support,   href: 'ticket-detail.html' },
    { id: 'aml',           label: 'Dieu tra AML',          icon: ICONS.search,    href: 'aml-investigation.html' },
    { id: 'compliance',    label: 'Tuan thu',              icon: ICONS.shield,    href: 'compliance.html' },
    { id: 'training',      label: 'Dao tao',               icon: ICONS.users,     href: 'training.html' },
    { id: 'xfer-review',   label: 'Duyet chuyen nhuong',   icon: ICONS.arrows,    href: 'xfer-review.html' },
    { id: 'redm-review',   label: 'Duyet mua lai',         icon: ICONS.wallet,    href: 'redm-review.html' },
  ];

  const menuHtml = menuItems.map(item => {
    const isActive = item.id === activePage;
    const cls = isActive ? 'dk-sidebar-item active' : 'dk-sidebar-item';
    return `
      <a href="${item.href}" class="${cls} proto-link">
        <span class="dk-sidebar-item-icon">${item.icon}</span>
        <span>${item.label}</span>
      </a>
    `;
  }).join('');

  return `
    <aside class="dk-sidebar">
      <div class="dk-sidebar-brand">
        <div class="dk-sidebar-logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>
        </div>
        <div>
          <div class="dk-sidebar-title">POLARIS</div>
          <div class="dk-sidebar-subtitle">Back Office</div>
        </div>
      </div>
      <nav class="dk-sidebar-nav">
        ${menuHtml}
      </nav>
      <div class="dk-sidebar-footer">
        <a href="../index.html" class="dk-sidebar-item proto-link">
          <span class="dk-sidebar-item-icon">${ICONS.logout}</span>
          <span>Dang xuat</span>
        </a>
      </div>
    </aside>
  `;
}

/**
 * BO top header bar (high-fidelity).
 * @param {string} title - Page title
 * @param {string} userName - Display name
 */
function renderBOHeader(title, userName = 'BO Tran Minh') {
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  return `
    <header class="dk-header">
      <div class="dk-header-left">
        <div>
          <h1 class="dk-page-title">${title}</h1>
          <span class="dk-page-context">${dateStr}</span>
        </div>
      </div>
      <div class="dk-header-right">
        <div class="dk-header-search">
          ${ICONS.search}
          <span>Tim kiem...</span>
        </div>
        <div class="dk-header-notif">
          ${ICONS.bell}
          <span class="dk-header-notif-dot"></span>
        </div>
        <div class="dk-header-user">
          <div class="dk-header-avatar">${userName.charAt(0)}</div>
          <div>
            <div class="dk-header-user-name">${userName}</div>
            <div class="dk-header-user-role">Back Office</div>
          </div>
        </div>
      </div>
    </header>
  `;
}


// ═══════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS (used across all roles, high-fidelity)
// ═══════════════════════════════════════════════════════════════════════

/**
 * High-fidelity data table with gradient header and hover transitions.
 * @param {Array} columns - [{ key, label, align }]
 * @param {Array} rows - Array of row objects
 * @param {Object} options - { compact: false }
 */
function renderDataTable(columns, rows, options = {}) {
  const headerHtml = columns.map(col => {
    const align = col.align === 'right' ? ' text-right' : col.align === 'center' ? ' text-center' : '';
    return `<th class="${align}">${col.label}</th>`;
  }).join('');

  const rowsHtml = rows.map(row => {
    const cells = columns.map(col => {
      const align = col.align === 'right' ? ' text-right' : col.align === 'center' ? ' text-center' : '';
      const value = row[col.key] !== undefined ? row[col.key] : '';
      return `<td class="${align}">${value}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <div class="dk-table-wrap">
      <table class="dk-table">
        <thead>
          <tr>${headerHtml}</tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * High-fidelity modal with backdrop blur and gradient confirm button.
 * @param {string} id - Unique modal ID
 * @param {string} title - Modal title
 * @param {string} contentHtml - Inner HTML content
 * @param {Object} options - { size: 'md', showFooter: true, confirmText, cancelText, confirmClass }
 */
function renderModal(id, title, contentHtml, options = {}) {
  const { size = 'md', showFooter = true, confirmText = 'Xac nhan', cancelText = 'Huy', confirmClass = 'dk-btn dk-btn-primary' } = options;
  const sizeClass = size === 'lg' ? 'dk-modal-lg' : size === 'xl' ? 'dk-modal-xl' : size === 'sm' ? 'dk-modal-sm' : 'dk-modal-md';

  const footerHtml = showFooter ? `
    <div class="dk-modal-footer">
      <button onclick="closeModal('${id}')" class="dk-btn dk-btn-secondary dk-btn-sm">${cancelText}</button>
      <button class="${confirmClass} dk-btn-sm">${confirmText}</button>
    </div>
  ` : '';

  return `
    <div id="${id}" class="hidden" style="position:fixed;inset:0;z-index:50">
      <div class="dk-modal-overlay" onclick="closeModal('${id}')">
        <div class="${sizeClass} dk-modal" onclick="event.stopPropagation()">
          <div class="dk-modal-header">
            <h3>${title}</h3>
            <button onclick="closeModal('${id}')" class="dk-modal-close">${ICONS.x}</button>
          </div>
          <div class="dk-modal-body">
            ${contentHtml}
          </div>
          ${footerHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * High-fidelity status badge using dk-badge CSS.
 * @param {string} status - success | warning | danger | info | neutral
 * @param {string} text - Badge text
 */
function renderBadge(status, text) {
  const classMap = {
    success: 'dk-badge dk-badge-success',
    warning: 'dk-badge dk-badge-warning',
    danger:  'dk-badge dk-badge-danger',
    info:    'dk-badge dk-badge-info',
    neutral: 'dk-badge dk-badge-neutral',
  };
  const cls = classMap[status] || classMap.neutral;
  return `<span class="${cls}">${text}</span>`;
}

/**
 * High-fidelity stat card with gradient icon and animations.
 * @param {string} label - Stat label
 * @param {string} value - Stat value
 * @param {string} change - Change percentage (e.g., "+12%")
 * @param {string} icon - Icon key from ICONS
 */
function renderStatCard(label, value, change = '', icon = 'chart') {
  const isPositive = change.startsWith('+');
  const changeCls = isPositive ? 'dk-stat-change positive' : 'dk-stat-change negative';
  const changeIcon = isPositive ? ICONS.arrowUp : ICONS.arrowDown;
  const iconSvg = ICONS[icon] || ICONS.chart;

  const changeHtml = change ? `
    <div class="${changeCls}">
      ${changeIcon}
      <span>${change}</span>
    </div>
  ` : '';

  return `
    <div class="dk-stat dk-fade-in">
      <div>
        <div class="dk-stat-label">${label}</div>
        <div class="dk-stat-value">${value}</div>
        ${changeHtml}
      </div>
      <div class="dk-stat-icon">
        ${iconSvg}
      </div>
    </div>
  `;
}

/**
 * Reusable desktop card wrapper with optional header.
 * @param {string} title - Card title (optional, empty string = no header)
 * @param {string} contentHtml - Card body content
 * @param {Object} options - { rightHtml, static: false, noPad: false }
 */
function renderDesktopCard(title, contentHtml, options = {}) {
  const { rightHtml = '', noPad = false } = options;
  const cardClass = options.static ? 'dk-card-static' : 'dk-card';

  const headerHtml = title ? `
    <div class="dk-card-header">
      <h3>${title}</h3>
      ${rightHtml}
    </div>
  ` : '';

  const bodyClass = noPad ? '' : 'dk-card-pad';

  return `
    <div class="${cardClass}">
      ${headerHtml}
      <div class="${bodyClass}">
        ${contentHtml}
      </div>
    </div>
  `;
}

/**
 * Gradient progress bar.
 * @param {number} pct - Percentage (0-100)
 * @param {string} label - Left label text
 * @param {Object} options - { rightText, showLabel: true }
 */
function renderProgressBar(pct, label, options = {}) {
  const { rightText, showLabel = true } = options;
  const right = rightText || pct + '%';
  const labelHtml = showLabel ? `
    <div class="dk-progress-label">
      <span>${label}</span>
      <span>${right}</span>
    </div>
  ` : '';
  return `
    ${labelHtml}
    <div class="dk-progress-track">
      <div class="dk-progress-fill" style="width:${pct}%"></div>
    </div>
  `;
}

/**
 * Rich alert card with left stripe.
 * @param {string} type - success | warning | danger | info
 * @param {string} title - Alert title
 * @param {string} desc - Alert description
 * @param {string} actionsHtml - Optional action buttons HTML
 */
function renderAlertCard(type, title, desc, actionsHtml = '') {
  const iconMap = { success: ICONS.check, warning: ICONS.alert, danger: ICONS.alert, info: ICONS.eye };
  const iconSvg = iconMap[type] || iconMap.info;
  return `
    <div class="dk-alert dk-alert-${type}">
      <div class="dk-alert-icon">${iconSvg}</div>
      <div class="dk-alert-content">
        <div class="dk-alert-title">${title}</div>
        <div class="dk-alert-desc">${desc}</div>
        ${actionsHtml}
      </div>
    </div>
  `;
}

/**
 * Form field wrapper with label and optional hint.
 * @param {string} label - Field label
 * @param {string} inputHtml - Input element HTML
 * @param {string} hint - Hint text (optional)
 */
function renderFormGroup(label, inputHtml, hint = '') {
  const hintHtml = hint ? `<div class="dk-form-hint">${hint}</div>` : '';
  return `
    <div class="dk-form-group">
      <label class="dk-form-label">${label}</label>
      ${inputHtml}
      ${hintHtml}
    </div>
  `;
}

/**
 * Timeline component for step-by-step histories.
 * @param {Array} steps - [{ title, desc, color: 'green'|'blue'|'yellow'|'red'|'gray' }]
 */
function renderTimeline(steps) {
  return `
    <div class="dk-timeline">
      ${steps.map((step, i) => `
        <div class="dk-timeline-item">
          <div class="dk-timeline-dot ${step.color || 'gray'}"></div>
          ${i < steps.length - 1 ? '<div class="dk-timeline-line"></div>' : ''}
          <div class="dk-timeline-content">
            <div class="dk-timeline-title">${step.title}</div>
            <div class="dk-timeline-desc">${step.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Chat message bubble for ticket conversations.
 * @param {string} message - Message text
 * @param {string} sender - Sender name
 * @param {string} time - Timestamp string
 * @param {boolean} isSelf - True if BO agent (right-aligned)
 */
function renderChatBubble(message, sender, time, isSelf = false) {
  const selfCls = isSelf ? ' self' : '';
  const avatarCls = isSelf ? 'dk-chat-avatar self' : 'dk-chat-avatar other';
  return `
    <div class="dk-chat-msg${selfCls}">
      <div class="${avatarCls}">${sender.charAt(0)}</div>
      <div>
        <div class="dk-chat-bubble">${message}</div>
        <div class="dk-chat-meta">${sender} -- ${time}</div>
      </div>
    </div>
  `;
}

/**
 * Empty state placeholder.
 * @param {string} message - Description message
 * @param {string} actionText - Button text (optional)
 * @param {string} actionHref - Button href (optional)
 */
function renderEmptyState(message, actionText = '', actionHref = '#') {
  const actionHtml = actionText ? `
    <a href="${actionHref}" class="btn-pill proto-link" style="margin-top:16px">${actionText}</a>
  ` : '';

  return `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 24px; text-align:center">
      <div style="width:64px; height:64px; background:#F3F4F6; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#9CA3AF; margin-bottom:16px">
        ${ICONS.search}
      </div>
      <p style="font-size:14px; color:var(--text-2)">${message}</p>
      ${actionHtml}
    </div>
  `;
}


// ═══════════════════════════════════════════════════════════════════════
// PAGE SHELL (Layout wrapper for all screens)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Wraps content in the correct layout for the given role.
 * Investor: VPay phone frame (375x812).
 * Admin/BO: desktop sidebar layout.
 *
 * @param {string} role - 'investor' | 'admin' | 'bo'
 * @param {string} activePage - Active navigation item
 * @param {string} title - Page title
 * @param {string} contentHtml - Page body HTML
 * @param {Object} options - { headerType: 'main'|'sub', backHref: '' }
 */
function renderPageShell(role, activePage, title, contentHtml, options = {}) {
  if (role === 'investor') {
    const { headerType = 'sub', backHref = '' } = options;
    document.body.className = 'phone-screen';
    const header = renderInvestorHeader(title, { type: headerType, backHref });
    return `
      <div class="phone">
        ${header}
        ${contentHtml}
        <div class="bottom-space"></div>
      </div>
    `;
  }

  if (role === 'admin') {
    return `
      <div class="desktop-layout">
        ${renderAdminSidebar(activePage)}
        <div class="main-content">
          ${renderAdminHeader(title)}
          <main style="padding:32px" class="dk-fade-in">
            ${contentHtml}
          </main>
        </div>
      </div>
    `;
  }

  if (role === 'bo') {
    return `
      <div class="desktop-layout">
        ${renderBOSidebar(activePage)}
        <div class="main-content">
          ${renderBOHeader(title)}
          <main style="padding:32px" class="dk-fade-in">
            ${contentHtml}
          </main>
        </div>
      </div>
    `;
  }

  // Fallback
  return `<main class="p-6">${contentHtml}</main>`;
}


// ═══════════════════════════════════════════════════════════════════════
// GLOBAL UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Open a modal by ID.
 * @param {string} id - Modal element ID
 */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

/**
 * Close a modal by ID.
 * @param {string} id - Modal element ID
 */
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

/**
 * Toggle a dropdown by ID.
 * @param {string} id - Dropdown element ID
 */
function toggleDropdown(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

// Make modal/dropdown functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleDropdown = toggleDropdown;
