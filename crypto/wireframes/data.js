/* POLARIS RWA Platform -- Vietnamese Placeholder Data Module
 * Browser-loaded via <script src="data.js"></script>
 * All data uses realistic Vietnamese names, cities, and VND currency.
 * No import/export -- global const declarations for browser scripts.
 */

// ═══════════════════════════════════════════════════════════════════════
// INVESTORS (8 entries)
// ═══════════════════════════════════════════════════════════════════════

const INVESTORS = [
  {
    id: 'INV-001',
    name: 'Tran Mai Linh',
    email: 'linh.tran@gmail.com',
    phone: '0901 234 567',
    city: 'TP. Ho Chi Minh',
    kycStatus: 'VERIFIED',
    walletAddress: '0x7a3B...9f2E',
    registeredDate: '2025-01-15',
    totalInvested: 520000000,
  },
  {
    id: 'INV-002',
    name: 'Nguyen Van Huy',
    email: 'huy.nguyen@yahoo.com',
    phone: '0912 345 678',
    city: 'Ha Noi',
    kycStatus: 'VERIFIED',
    walletAddress: '0x3cD1...a8B4',
    registeredDate: '2025-02-03',
    totalInvested: 1250000000,
  },
  {
    id: 'INV-003',
    name: 'Le Thi Thanh Hang',
    email: 'hang.le@outlook.com',
    phone: '0923 456 789',
    city: 'Da Nang',
    kycStatus: 'PENDING',
    walletAddress: '0x9eF2...c1D7',
    registeredDate: '2025-03-10',
    totalInvested: 0,
  },
  {
    id: 'INV-004',
    name: 'Pham Duc Anh',
    email: 'anh.pham@gmail.com',
    phone: '0934 567 890',
    city: 'TP. Ho Chi Minh',
    kycStatus: 'IN_REVIEW',
    walletAddress: '0x5bA3...d4E9',
    registeredDate: '2025-03-22',
    totalInvested: 0,
  },
  {
    id: 'INV-005',
    name: 'Vo Minh Tuan',
    email: 'tuan.vo@gmail.com',
    phone: '0945 678 901',
    city: 'Hai Phong',
    kycStatus: 'VERIFIED',
    walletAddress: '0x1dC4...e5F0',
    registeredDate: '2025-01-28',
    totalInvested: 780000000,
  },
  {
    id: 'INV-006',
    name: 'Hoang Thi Kim Ngan',
    email: 'ngan.hoang@gmail.com',
    phone: '0956 789 012',
    city: 'Can Tho',
    kycStatus: 'REJECTED',
    walletAddress: '0x8fE5...a6B1',
    registeredDate: '2025-04-05',
    totalInvested: 0,
  },
  {
    id: 'INV-007',
    name: 'Do Quang Minh',
    email: 'minh.do@proton.me',
    phone: '0967 890 123',
    city: 'Ha Noi',
    kycStatus: 'VERIFIED',
    walletAddress: '0x2aD6...b7C2',
    registeredDate: '2025-02-14',
    totalInvested: 2100000000,
  },
  {
    id: 'INV-008',
    name: 'Bui Ngoc Lan',
    email: 'lan.bui@gmail.com',
    phone: '0978 901 234',
    city: 'TP. Ho Chi Minh',
    kycStatus: 'VERIFIED',
    walletAddress: '0x4bF7...c8D3',
    registeredDate: '2025-03-01',
    totalInvested: 350000000,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PROJECTS (5 entries -- VinGroup-style)
// ═══════════════════════════════════════════════════════════════════════

const PROJECTS = [
  {
    id: 'PRJ-001',
    name: 'Vinhomes Grand Park Tower S12',
    location: 'Quan 9, TP. Ho Chi Minh',
    developer: 'Vinhomes JSC',
    tokenSymbol: 'VGP-S12',
    tokenPrice: 5000000,
    totalTokens: 10000,
    soldTokens: 7850,
    expectedYield: 8.5,
    status: 'ACTIVE',
    minInvestment: 50000000,
    image: '',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    description: 'Premium apartment project in Thu Duc City with prime location and full amenities',
  },
  {
    id: 'PRJ-002',
    name: 'Ecopark Hai Duong Villa B6',
    location: 'Van Giang, Hung Yen',
    developer: 'Ecopark Group',
    tokenSymbol: 'ECO-B6',
    tokenPrice: 10000000,
    totalTokens: 5000,
    soldTokens: 2100,
    expectedYield: 9.2,
    status: 'ACTIVE',
    minInvestment: 100000000,
    image: '',
    startDate: '2025-02-15',
    endDate: '2026-02-15',
    description: 'Eco villa in the northern area with green and peaceful living environment',
  },
  {
    id: 'PRJ-003',
    name: 'Sun Grand City Thuy Khue',
    location: 'Tay Ho, Ha Noi',
    developer: 'Sun Group',
    tokenSymbol: 'SGC-TK',
    tokenPrice: 8000000,
    totalTokens: 8000,
    soldTokens: 8000,
    expectedYield: 7.8,
    status: 'FUNDED',
    minInvestment: 80000000,
    image: '',
    startDate: '2024-09-01',
    endDate: '2025-09-01',
    description: 'Luxury apartment with West Lake view, central Hanoi location',
  },
  {
    id: 'PRJ-004',
    name: 'Masteri Centre Point T3',
    location: 'Quan 9, TP. Ho Chi Minh',
    developer: 'Masterise Homes',
    tokenSymbol: 'MCP-T3',
    tokenPrice: 6000000,
    totalTokens: 12000,
    soldTokens: 0,
    expectedYield: 8.0,
    status: 'UPCOMING',
    minInvestment: 60000000,
    image: '',
    startDate: '2025-06-01',
    endDate: '2026-06-01',
    description: 'New apartment project next to Vinhomes Grand Park, attractive pricing for young investors',
  },
  {
    id: 'PRJ-005',
    name: 'Vinhomes Ocean Park S2.05',
    location: 'Gia Lam, Ha Noi',
    developer: 'Vinhomes JSC',
    tokenSymbol: 'VOP-S2',
    tokenPrice: 4500000,
    totalTokens: 15000,
    soldTokens: 3200,
    expectedYield: 8.8,
    status: 'ACTIVE',
    minInvestment: 45000000,
    image: '',
    startDate: '2025-03-01',
    endDate: '2026-03-01',
    description: 'Mid-range apartment in Vietnam\'s largest lakeside urban area',
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PROPERTIES (8 entries)
// ═══════════════════════════════════════════════════════════════════════

const PROPERTIES = [
  {
    id: 'PROP-001',
    projectId: 'PRJ-001',
    address: 'S12.05, Floor 12, Vinhomes Grand Park',
    type: 'Apartment',
    area: 68.5,
    bedrooms: 2,
    bathrooms: 2,
    floor: 12,
    nav: 3500000000,
    tokenized: true,
    assignedInvestor: 'INV-001',
  },
  {
    id: 'PROP-002',
    projectId: 'PRJ-001',
    address: 'S12.18, Floor 18, Vinhomes Grand Park',
    type: 'Apartment',
    area: 85.0,
    bedrooms: 3,
    bathrooms: 2,
    floor: 18,
    nav: 4200000000,
    tokenized: true,
    assignedInvestor: 'INV-002',
  },
  {
    id: 'PROP-003',
    projectId: 'PRJ-002',
    address: 'B6-15, Ecopark Hai Duong',
    type: 'Villa',
    area: 250.0,
    bedrooms: 4,
    bathrooms: 3,
    floor: 1,
    nav: 12000000000,
    tokenized: true,
    assignedInvestor: null,
  },
  {
    id: 'PROP-004',
    projectId: 'PRJ-002',
    address: 'B6-22, Ecopark Hai Duong',
    type: 'Villa',
    area: 320.0,
    bedrooms: 5,
    bathrooms: 4,
    floor: 1,
    nav: 15500000000,
    tokenized: false,
    assignedInvestor: null,
  },
  {
    id: 'PROP-005',
    projectId: 'PRJ-003',
    address: 'SGC-08, Floor 8, Sun Grand City Thuy Khue',
    type: 'Apartment',
    area: 120.0,
    bedrooms: 3,
    bathrooms: 2,
    floor: 8,
    nav: 8500000000,
    tokenized: true,
    assignedInvestor: 'INV-007',
  },
  {
    id: 'PROP-006',
    projectId: 'PRJ-003',
    address: 'SGC-PH1, Floor 30, Sun Grand City Thuy Khue',
    type: 'Penthouse',
    area: 280.0,
    bedrooms: 4,
    bathrooms: 3,
    floor: 30,
    nav: 25000000000,
    tokenized: true,
    assignedInvestor: 'INV-002',
  },
  {
    id: 'PROP-007',
    projectId: 'PRJ-005',
    address: 'S2.05-12A, Floor 12, Vinhomes Ocean Park',
    type: 'Apartment',
    area: 55.0,
    bedrooms: 2,
    bathrooms: 1,
    floor: 12,
    nav: 2800000000,
    tokenized: true,
    assignedInvestor: 'INV-005',
  },
  {
    id: 'PROP-008',
    projectId: 'PRJ-001',
    address: 'S12-SH3, Ground Floor, Vinhomes Grand Park',
    type: 'Shophouse',
    area: 95.0,
    bedrooms: 0,
    bathrooms: 1,
    floor: 0,
    nav: 6500000000,
    tokenized: false,
    assignedInvestor: null,
  },
  {
    id: 'PROP-009',
    projectId: 'PRJ-001',
    address: 'S12.07, Floor 7, Vinhomes Grand Park',
    type: 'Apartment',
    area: 55.0,
    bedrooms: 2,
    bathrooms: 1,
    floor: 7,
    nav: 2900000000,
    tokenized: true,
    assignedInvestor: 'INV-005',
  },
  {
    id: 'PROP-010',
    projectId: 'PRJ-001',
    address: 'S12.22, Floor 22, Vinhomes Grand Park',
    type: 'Apartment',
    area: 72.0,
    bedrooms: 2,
    bathrooms: 2,
    floor: 22,
    nav: 3800000000,
    tokenized: true,
    assignedInvestor: null,
  },
  {
    id: 'PROP-011',
    projectId: 'PRJ-001',
    address: 'S12.30, Floor 30, Vinhomes Grand Park',
    type: 'Penthouse',
    area: 180.0,
    bedrooms: 3,
    bathrooms: 3,
    floor: 30,
    nav: 12000000000,
    tokenized: false,
    assignedInvestor: null,
  },
  {
    id: 'PROP-012',
    projectId: 'PRJ-001',
    address: 'S12-SH7, Ground Floor, Vinhomes Grand Park',
    type: 'Shophouse',
    area: 110.0,
    bedrooms: 0,
    bathrooms: 1,
    floor: 0,
    nav: 7200000000,
    tokenized: true,
    assignedInvestor: 'INV-008',
  },
  {
    id: 'PROP-013',
    projectId: 'PRJ-001',
    address: 'S12.15, Floor 15, Vinhomes Grand Park',
    type: 'Apartment',
    area: 90.0,
    bedrooms: 3,
    bathrooms: 2,
    floor: 15,
    nav: 4500000000,
    tokenized: true,
    assignedInvestor: 'INV-002',
  },
  {
    id: 'PROP-014',
    projectId: 'PRJ-001',
    address: 'S12.03, Floor 3, Vinhomes Grand Park',
    type: 'Apartment',
    area: 48.0,
    bedrooms: 1,
    bathrooms: 1,
    floor: 3,
    nav: 2200000000,
    tokenized: false,
    assignedInvestor: null,
  },
  {
    id: 'PROP-015',
    projectId: 'PRJ-002',
    address: 'B6-08, Ecopark Hai Duong',
    type: 'Villa',
    area: 200.0,
    bedrooms: 3,
    bathrooms: 3,
    floor: 1,
    nav: 9500000000,
    tokenized: true,
    assignedInvestor: 'INV-007',
  },
  {
    id: 'PROP-016',
    projectId: 'PRJ-002',
    address: 'B6-31, Ecopark Hai Duong',
    type: 'Villa',
    area: 280.0,
    bedrooms: 4,
    bathrooms: 4,
    floor: 1,
    nav: 13500000000,
    tokenized: true,
    assignedInvestor: null,
  },
  {
    id: 'PROP-017',
    projectId: 'PRJ-002',
    address: 'B6-05, Ecopark Hai Duong',
    type: 'Villa',
    area: 180.0,
    bedrooms: 3,
    bathrooms: 2,
    floor: 1,
    nav: 8200000000,
    tokenized: false,
    assignedInvestor: null,
  },
  {
    id: 'PROP-018',
    projectId: 'PRJ-002',
    address: 'B6-42, Ecopark Hai Duong',
    type: 'Villa',
    area: 350.0,
    bedrooms: 5,
    bathrooms: 5,
    floor: 2,
    nav: 18000000000,
    tokenized: true,
    assignedInvestor: 'INV-001',
  },
  {
    id: 'PROP-019',
    projectId: 'PRJ-001',
    address: 'S12.25, Floor 25, Vinhomes Grand Park',
    type: 'Apartment',
    area: 105.0,
    bedrooms: 3,
    bathrooms: 2,
    floor: 25,
    nav: 5200000000,
    tokenized: true,
    assignedInvestor: null,
  },
  {
    id: 'PROP-020',
    projectId: 'PRJ-002',
    address: 'B6-18, Ecopark Hai Duong',
    type: 'Villa',
    area: 220.0,
    bedrooms: 4,
    bathrooms: 3,
    floor: 1,
    nav: 10800000000,
    tokenized: false,
    assignedInvestor: null,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// CAMPAIGNS (4 entries)
// ═══════════════════════════════════════════════════════════════════════

const CAMPAIGNS = [
  {
    id: 'CMP-001',
    projectId: 'PRJ-001',
    name: 'VGP Tower S12 -- Batch 3',
    status: 'OPEN',
    startDate: '2025-03-01',
    endDate: '2025-04-30',
    targetAmount: 25000000000,
    raisedAmount: 18750000000,
    whitelistCount: 245,
    commitmentCount: 180,
    minInvestment: 10000000,
    maxInvestment: 500000000,
  },
  {
    id: 'CMP-002',
    projectId: 'PRJ-002',
    name: 'Ecopark B6 Villa -- Batch 1',
    status: 'OPEN',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    targetAmount: 50000000000,
    raisedAmount: 21000000000,
    whitelistCount: 120,
    commitmentCount: 68,
    minInvestment: 100000000,
    maxInvestment: 2000000000,
  },
  {
    id: 'CMP-003',
    projectId: 'PRJ-003',
    name: 'Sun Grand City Thuy Khue -- Closed',
    status: 'CLOSED',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    targetAmount: 64000000000,
    raisedAmount: 64000000000,
    whitelistCount: 510,
    commitmentCount: 510,
    minInvestment: 80000000,
    maxInvestment: 1000000000,
  },
  {
    id: 'CMP-004',
    projectId: 'PRJ-004',
    name: 'Masteri Centre Point T3 -- Coming Soon',
    status: 'UPCOMING',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    targetAmount: 72000000000,
    raisedAmount: 0,
    whitelistCount: 0,
    commitmentCount: 0,
    minInvestment: 60000000,
    maxInvestment: 1500000000,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// KYC CASES (8 entries)
// ═══════════════════════════════════════════════════════════════════════

const KYC_CASES = [
  {
    id: 'KYC-001',
    investorId: 'INV-003',
    investorName: 'Le Thi Thanh Hang',
    submittedDate: '2025-03-10',
    status: 'PENDING',
    assignedTo: null,
    documentType: 'CCCD',
    riskScore: 'LOW',
    notes: 'Newly submitted, not yet assigned',
  },
  {
    id: 'KYC-002',
    investorId: 'INV-004',
    investorName: 'Pham Duc Anh',
    submittedDate: '2025-03-22',
    status: 'IN_REVIEW',
    assignedTo: 'BO Tran Minh',
    documentType: 'CCCD',
    riskScore: 'MEDIUM',
    notes: 'Need to re-verify permanent address',
  },
  {
    id: 'KYC-003',
    investorId: 'INV-006',
    investorName: 'Hoang Thi Kim Ngan',
    submittedDate: '2025-04-05',
    status: 'REJECTED',
    assignedTo: 'BO Le Thanh',
    documentType: 'Passport',
    riskScore: 'HIGH',
    notes: 'Blurry ID photo, resubmission required',
  },
  {
    id: 'KYC-004',
    investorId: 'INV-001',
    investorName: 'Tran Mai Linh',
    submittedDate: '2025-01-15',
    status: 'APPROVED',
    assignedTo: 'BO Tran Minh',
    documentType: 'CCCD',
    riskScore: 'LOW',
    notes: 'Successfully verified via eKYC',
  },
  {
    id: 'KYC-005',
    investorId: 'INV-002',
    investorName: 'Nguyen Van Huy',
    submittedDate: '2025-02-03',
    status: 'APPROVED',
    assignedTo: 'BO Nguyen Hanh',
    documentType: 'CCCD',
    riskScore: 'LOW',
    notes: 'Complete file, no issues',
  },
  {
    id: 'KYC-006',
    investorId: 'INV-005',
    investorName: 'Vo Minh Tuan',
    submittedDate: '2025-01-28',
    status: 'APPROVED',
    assignedTo: 'BO Tran Minh',
    documentType: 'CCCD',
    riskScore: 'LOW',
    notes: 'Auto-verified via VPay eKYC',
  },
  {
    id: 'KYC-007',
    investorId: 'INV-007',
    investorName: 'Do Quang Minh',
    submittedDate: '2025-02-14',
    status: 'APPROVED',
    assignedTo: 'BO Le Thanh',
    documentType: 'CCCD',
    riskScore: 'LOW',
    notes: 'Tier 3 investor, enhanced KYC approved',
  },
  {
    id: 'KYC-008',
    investorId: 'INV-008',
    investorName: 'Bui Ngoc Lan',
    submittedDate: '2025-03-01',
    status: 'ESCALATED',
    assignedTo: 'BO Tran Minh',
    documentType: 'CCCD',
    riskScore: 'HIGH',
    notes: 'Need to verify funding source per AML regulations',
  },
];

// ═══════════════════════════════════════════════════════════════════════
// SUPPORT TICKETS (6 entries)
// ═══════════════════════════════════════════════════════════════════════

const SUPPORT_TICKETS = [
  {
    id: 'TKT-001',
    investorName: 'Tran Mai Linh',
    category: 'Transaction',
    subject: 'Token purchase transaction stuck for 24 hours',
    status: 'OPEN',
    priority: 'HIGH',
    createdDate: '2025-04-01',
    assignedTo: null,
  },
  {
    id: 'TKT-002',
    investorName: 'Nguyen Van Huy',
    category: 'KYC',
    subject: 'Update personal info after ID card change',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdDate: '2025-03-28',
    assignedTo: 'BO Tran Minh',
  },
  {
    id: 'TKT-003',
    investorName: 'Le Thi Thanh Hang',
    category: 'Technical',
    subject: 'Cannot log in to app on iPhone',
    status: 'RESOLVED',
    priority: 'LOW',
    createdDate: '2025-03-15',
    assignedTo: 'BO Le Thanh',
  },
  {
    id: 'TKT-004',
    investorName: 'Pham Duc Anh',
    category: 'Account',
    subject: 'Request to change registered email',
    status: 'OPEN',
    priority: 'LOW',
    createdDate: '2025-04-02',
    assignedTo: null,
  },
  {
    id: 'TKT-005',
    investorName: 'Hoang Thi Kim Ngan',
    category: 'KYC',
    subject: 'Why was KYC rejected? Need resubmission guide',
    status: 'ESCALATED',
    priority: 'CRITICAL',
    createdDate: '2025-04-06',
    assignedTo: 'BO Tran Minh',
  },
  {
    id: 'TKT-006',
    investorName: 'Vo Minh Tuan',
    category: 'Transaction',
    subject: 'Inquiry about withdrawal transaction fees',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdDate: '2025-03-30',
    assignedTo: 'BO Nguyen Hanh',
  },
];

// ═══════════════════════════════════════════════════════════════════════
// PORTFOLIO HOLDINGS (5 entries)
// ═══════════════════════════════════════════════════════════════════════

const PORTFOLIO_HOLDINGS = [
  {
    investorId: 'INV-001',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    quantity: 104,
    purchasePrice: 4800000,
    currentPrice: 5000000,
    totalValue: 520000000,
    unrealizedPL: 20800000,
    yield: 4.0,
  },
  {
    investorId: 'INV-002',
    projectName: 'Ecopark Hai Duong Villa B6',
    tokenSymbol: 'ECO-B6',
    quantity: 50,
    purchasePrice: 9500000,
    currentPrice: 10000000,
    totalValue: 500000000,
    unrealizedPL: 25000000,
    yield: 5.3,
  },
  {
    investorId: 'INV-002',
    projectName: 'Sun Grand City Thuy Khue',
    tokenSymbol: 'SGC-TK',
    quantity: 75,
    purchasePrice: 7500000,
    currentPrice: 8000000,
    totalValue: 600000000,
    unrealizedPL: 37500000,
    yield: 6.7,
  },
  {
    investorId: 'INV-005',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    quantity: 156,
    purchasePrice: 4900000,
    currentPrice: 5000000,
    totalValue: 780000000,
    unrealizedPL: 15600000,
    yield: 2.0,
  },
  {
    investorId: 'INV-007',
    projectName: 'Sun Grand City Thuy Khue',
    tokenSymbol: 'SGC-TK',
    quantity: 250,
    purchasePrice: 7800000,
    currentPrice: 8000000,
    totalValue: 2000000000,
    unrealizedPL: 50000000,
    yield: 2.6,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// TRANSACTIONS (10 entries)
// ═══════════════════════════════════════════════════════════════════════

const TRANSACTIONS = [
  {
    id: 'TX-001',
    type: 'BUY',
    investorName: 'Tran Mai Linh',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    amount: 50,
    value: 250000000,
    date: '2025-03-15',
    status: 'COMPLETED',
    txHash: '0xab12...cd34',
  },
  {
    id: 'TX-002',
    type: 'BUY',
    investorName: 'Nguyen Van Huy',
    projectName: 'Ecopark Hai Duong Villa B6',
    tokenSymbol: 'ECO-B6',
    amount: 50,
    value: 500000000,
    date: '2025-04-01',
    status: 'COMPLETED',
    txHash: '0xef56...gh78',
  },
  {
    id: 'TX-003',
    type: 'BUY',
    investorName: 'Tran Mai Linh',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    amount: 54,
    value: 270000000,
    date: '2025-03-20',
    status: 'COMPLETED',
    txHash: '0xij90...kl12',
  },
  {
    id: 'TX-004',
    type: 'BUY',
    investorName: 'Vo Minh Tuan',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    amount: 156,
    value: 780000000,
    date: '2025-02-10',
    status: 'COMPLETED',
    txHash: '0xmn34...op56',
  },
  {
    id: 'TX-005',
    type: 'BUY',
    investorName: 'Do Quang Minh',
    projectName: 'Sun Grand City Thuy Khue',
    tokenSymbol: 'SGC-TK',
    amount: 250,
    value: 2000000000,
    date: '2024-10-15',
    status: 'COMPLETED',
    txHash: '0xqr78...st90',
  },
  {
    id: 'TX-006',
    type: 'BUY',
    investorName: 'Nguyen Van Huy',
    projectName: 'Sun Grand City Thuy Khue',
    tokenSymbol: 'SGC-TK',
    amount: 75,
    value: 600000000,
    date: '2024-11-20',
    status: 'COMPLETED',
    txHash: '0xuv12...wx34',
  },
  {
    id: 'TX-007',
    type: 'BUY',
    investorName: 'Bui Ngoc Lan',
    projectName: 'Vinhomes Ocean Park S2.05',
    tokenSymbol: 'VOP-S2',
    amount: 70,
    value: 315000000,
    date: '2025-03-05',
    status: 'PENDING',
    txHash: '0xyz56...ab78',
  },
  {
    id: 'TX-008',
    type: 'TRANSFER',
    investorName: 'Tran Mai Linh',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    amount: 10,
    value: 50000000,
    date: '2025-03-25',
    status: 'COMPLETED',
    txHash: '0xcd90...ef12',
  },
  {
    id: 'TX-009',
    type: 'BUY',
    investorName: 'Le Thi Thanh Hang',
    projectName: 'Ecopark Hai Duong Villa B6',
    tokenSymbol: 'ECO-B6',
    amount: 20,
    value: 200000000,
    date: '2025-04-03',
    status: 'FAILED',
    txHash: '0xgh34...ij56',
  },
  {
    id: 'TX-010',
    type: 'REDEEM',
    investorName: 'Do Quang Minh',
    projectName: 'Sun Grand City Thuy Khue',
    tokenSymbol: 'SGC-TK',
    amount: 25,
    value: 200000000,
    date: '2025-04-07',
    status: 'PENDING',
    txHash: '0xkl78...mn90',
  },
];


// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Format a number as Vietnamese Dong currency.
 * @param {number} amount - Amount in VND
 * @returns {string} e.g., "5.000.000 VND"
 */
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
}

/**
 * Format large VND amounts with shorthand.
 * @param {number} amount - Amount in VND
 * @returns {string} e.g., "3,5 ty" or "51 trieu"
 */
function formatVNDShort(amount) {
  if (amount >= 1000000000) {
    const ty = amount / 1000000000;
    return (ty % 1 === 0 ? ty.toString() : ty.toFixed(1).replace('.', ',')) + ' ty';
  }
  if (amount >= 1000000) {
    const trieu = amount / 1000000;
    return (trieu % 1 === 0 ? trieu.toString() : trieu.toFixed(1).replace('.', ',')) + ' trieu';
  }
  return formatVND(amount);
}

/**
 * Format a date string as Vietnamese DD/MM/YYYY.
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @returns {string} e.g., "15/03/2025"
 */
function formatDateVN(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Format a percentage value with Vietnamese locale.
 * @param {number} value - Percentage value
 * @returns {string} e.g., "8,5%"
 */
function formatPercent(value) {
  return value.toFixed(1).replace('.', ',') + '%';
}

/**
 * Map a status string to a badge color name.
 * @param {string} status - Status value
 * @returns {string} 'success' | 'warning' | 'danger' | 'info' | 'neutral'
 */
function getStatusColor(status) {
  const map = {
    VERIFIED:    'success',
    APPROVED:    'success',
    COMPLETED:   'success',
    ACTIVE:      'success',
    RESOLVED:    'success',
    OPEN:        'info',
    PENDING:     'warning',
    IN_REVIEW:   'warning',
    IN_PROGRESS: 'warning',
    UPCOMING:    'warning',
    PAUSED:      'warning',
    REJECTED:    'danger',
    FAILED:      'danger',
    CLOSED:      'neutral',
    ESCALATED:   'danger',
    CRITICAL:    'danger',
    FUNDED:      'success',
  };
  return map[status] || 'neutral';
}

/**
 * Map an English status value to a Vietnamese label.
 * @param {string} status - Status value
 * @returns {string} Vietnamese label
 */
function getStatusLabel(status) {
  const map = {
    VERIFIED:    'Da xac minh',
    APPROVED:    'Da duyet',
    COMPLETED:   'Hoan thanh',
    ACTIVE:      'Dang hoat dong',
    RESOLVED:    'Da giai quyet',
    OPEN:        'Dang mo',
    PENDING:     'Cho xu ly',
    IN_REVIEW:   'Dang xem xet',
    IN_PROGRESS: 'Dang xu ly',
    UPCOMING:    'Sap ra mat',
    PAUSED:      'Tam dung',
    REJECTED:    'Tu choi',
    FAILED:      'That bai',
    CLOSED:      'Da dong',
    ESCALATED:   'Da nang cap',
    CRITICAL:    'Khan cap',
    FUNDED:      'Da goi von',
    LOW:         'Thap',
    MEDIUM:      'Trung binh',
    HIGH:        'Cao',
  };
  return map[status] || status;
}

// NEW -- English status labels (investor screens)
function getStatusLabelEN(status) {
  const map = {
    VERIFIED: 'Verified', APPROVED: 'Approved', COMPLETED: 'Completed',
    ACTIVE: 'Active', RESOLVED: 'Resolved', OPEN: 'Open',
    PENDING: 'Pending', IN_REVIEW: 'In Review', IN_PROGRESS: 'In Progress',
    UPCOMING: 'Coming Soon', PAUSED: 'Paused', REJECTED: 'Rejected',
    FAILED: 'Failed', CLOSED: 'Closed', ESCALATED: 'Escalated',
    CRITICAL: 'Critical', FUNDED: 'Funded',
    LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High',
    DECLARED: 'Declared', INVESTIGATING: 'Investigating',
    CLEARED: 'Cleared', ACKNOWLEDGED: 'Acknowledged',
    QUEUED: 'Queued', ACCEPTED: 'Accepted', EXECUTED: 'Executed',
    PASSED: 'Passed', EXPIRED: 'Expired', PROCESSING: 'Processing',
    AML_FLAGGED: 'AML Flagged', NOT_STARTED: 'Not Started',
  };
  return map[status] || status;
}

// NEW -- English VND short format: 3.5B VND, 51M VND
function formatVNDShortEN(amount) {
  if (amount >= 1000000000) {
    const b = amount / 1000000000;
    return (b % 1 === 0 ? b.toString() : b.toFixed(1)) + 'B VND';
  }
  if (amount >= 1000000) {
    const m = amount / 1000000;
    return (m % 1 === 0 ? m.toString() : m.toFixed(1)) + 'M VND';
  }
  return formatVND(amount);
}

// NEW -- English date format DD/MM/YYYY
function formatDateEN(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// -- LIQD DISTRIBUTIONS (3 entries -- investor liquidation screens)
const LIQD_DISTRIBUTIONS = [
  { id: 'LIQD-001', projectName: 'Sun Grand City Thuy Khue', declarationDate: '2025-09-01',
    estimatedProceeds: 64000000000, vspFee: 3200000000, netProceeds: 60800000000, status: 'DECLARED',
    timeline: 'Expected to complete within 90 days', holdersCount: 510, tokensPerHolder: 15, pricePerToken: 8000000 },
  { id: 'LIQD-002', projectName: 'Vinhomes Grand Park Tower S12', declarationDate: '2025-12-15',
    estimatedProceeds: 50000000000, vspFee: 2500000000, netProceeds: 47500000000, status: 'IN_PROGRESS',
    timeline: 'Asset appraisal in progress, 45 days remaining', holdersCount: 350, tokensPerHolder: 22, pricePerToken: 5000000 },
  { id: 'LIQD-003', projectName: 'Ecopark Hai Duong Villa B6', declarationDate: '2025-06-01',
    estimatedProceeds: 25000000000, vspFee: 1250000000, netProceeds: 23750000000, status: 'COMPLETED',
    timeline: 'Distribution completed on 01/09/2025', holdersCount: 120, tokensPerHolder: 42, pricePerToken: 10000000 },
];

// -- PROT ALERTS (5 entries -- investor protection screens)
const PROT_ALERTS = [
  { id: 'PROT-001', type: 'MARKET', severity: 'WARNING', title: 'VGP-S12 token price volatility',
    description: 'VGP-S12 token price dropped 8.5% in the last 24 hours, exceeding the 5% alert threshold.',
    timestamp: '2025-04-08T14:30:00Z', status: 'ACTIVE', projectName: 'Vinhomes Grand Park Tower S12' },
  { id: 'PROT-002', type: 'EMERGENCY', severity: 'CRITICAL', title: 'ECO-B6 trading suspended',
    description: 'System suspended ECO-B6 token trading for anomaly investigation. Expected to resume in 2 hours.',
    timestamp: '2025-04-08T10:15:00Z', status: 'ACTIVE', projectName: 'Ecopark Hai Duong Villa B6' },
  { id: 'PROT-003', type: 'COMPLIANCE', severity: 'INFO', title: 'New KYC regulation update',
    description: 'From 01/05/2025, all investors must update to chip-enabled ID cards per new SBV regulations.',
    timestamp: '2025-04-07T09:00:00Z', status: 'ACKNOWLEDGED', projectName: null },
  { id: 'PROT-004', type: 'SYSTEM', severity: 'WARNING', title: 'VPay system maintenance',
    description: 'VPay will perform maintenance from 00:00-04:00 on 10/04. Deposit/withdrawal temporarily suspended.',
    timestamp: '2025-04-07T16:00:00Z', status: 'RESOLVED', projectName: null },
  { id: 'PROT-005', type: 'MARKET', severity: 'CRITICAL', title: 'Low liquidity alert for SGC-TK',
    description: 'SGC-TK trading volume dropped 70% compared to the 30-day average.',
    timestamp: '2025-04-08T11:45:00Z', status: 'ACTIVE', projectName: 'Sun Grand City Thuy Khue' },
];

// -- GOVERNANCE VOTES (3 entries -- investor voting screen)
const GOVERNANCE_VOTES = [
  { id: 'VOTE-001', title: 'Approve SGC-TK liquidation plan',
    description: 'Vote to approve the liquidation plan for Sun Grand City Thuy Khue property.',
    startDate: '2025-04-01', endDate: '2025-04-15', threshold: 66,
    currentYes: 340, currentNo: 85, totalVotes: 425, status: 'ACTIVE',
    projectName: 'Sun Grand City Thuy Khue', tokenSymbol: 'SGC-TK' },
  { id: 'VOTE-002', title: 'Extend VGP-S12 investment period',
    description: 'Proposal to extend the Vinhomes Grand Park Tower S12 investment period by 12 months.',
    startDate: '2025-03-15', endDate: '2025-03-30', threshold: 66,
    currentYes: 520, currentNo: 180, totalVotes: 700, status: 'PASSED',
    projectName: 'Vinhomes Grand Park Tower S12', tokenSymbol: 'VGP-S12' },
  { id: 'VOTE-003', title: 'Change ECO-B6 asset manager',
    description: 'Vote to change the asset management company from Savills to CBRE.',
    startDate: '2025-04-10', endDate: '2025-04-25', threshold: 66,
    currentYes: 15, currentNo: 5, totalVotes: 20, status: 'ACTIVE',
    projectName: 'Ecopark Hai Duong Villa B6', tokenSymbol: 'ECO-B6' },
];

// -- NOTIFICATIONS (8 entries -- investor monitoring screens, latest first)
const NOTIFICATIONS = [
  { id: 'NOTIF-001', type: 'PRICE_ALERT', title: 'VGP-S12 up 3.2%',
    description: 'VGP-S12 token price rose from 4,840,000 VND to 5,000,000 VND today.',
    timestamp: '2025-04-08T15:30:00Z', read: false, icon: 'chart' },
  { id: 'NOTIF-002', type: 'TRANSACTION', title: 'Token purchase successful',
    description: 'You have successfully purchased 50 VGP-S12 tokens for 250,000,000 VND.',
    timestamp: '2025-04-08T14:00:00Z', read: false, icon: 'token' },
  { id: 'NOTIF-003', type: 'PROJECT_UPDATE', title: 'ECO-B6 project update',
    description: 'Ecopark Hai Duong Villa B6 has completed phase 2, construction progress at 85%.',
    timestamp: '2025-04-08T10:00:00Z', read: false, icon: 'building' },
  { id: 'NOTIF-004', type: 'SYSTEM', title: 'System maintenance',
    description: 'System maintenance scheduled from 00:00-04:00 on 10/04/2025.',
    timestamp: '2025-04-07T18:00:00Z', read: true, icon: 'alert' },
  { id: 'NOTIF-005', type: 'LIQD', title: 'SGC-TK liquidation notice',
    description: 'Sun Grand City Thuy Khue project has started the liquidation process.',
    timestamp: '2025-04-07T09:00:00Z', read: true, icon: 'token' },
  { id: 'NOTIF-006', type: 'PRICE_ALERT', title: 'ECO-B6 down 2.1%',
    description: 'ECO-B6 token price slightly decreased from 10,200,000 VND to 9,990,000 VND.',
    timestamp: '2025-04-06T16:30:00Z', read: true, icon: 'chart' },
  { id: 'NOTIF-007', type: 'PROJECT_UPDATE', title: 'Q1/2025 VGP-S12 report',
    description: 'Q1/2025 financial report for Vinhomes Grand Park Tower S12 has been published.',
    timestamp: '2025-04-05T08:00:00Z', read: true, icon: 'building' },
  { id: 'NOTIF-008', type: 'TRANSACTION', title: 'Token transfer completed',
    description: 'You have successfully transferred 10 VGP-S12 tokens to wallet 0x3cD1...a8B4.',
    timestamp: '2025-04-04T11:00:00Z', read: true, icon: 'token' },
];

// -- AML CASES (4 entries -- BO AML investigation screen)
const AML_CASES = [
  { id: 'AML-001', investorId: 'INV-008', investorName: 'Bui Ngoc Lan',
    flagReason: 'Unclear funding source, multiple small consecutive transactions', riskLevel: 'HIGH',
    flaggedDate: '2025-03-28', status: 'INVESTIGATING', assignedTo: 'BO Tran Minh',
    notes: 'Need to verify bank account funding source. Requested 6-month bank statement.' },
  { id: 'AML-002', investorId: 'INV-006', investorName: 'Hoang Thi Kim Ngan',
    flagReason: 'KYC rejected multiple times, signs of document forgery', riskLevel: 'HIGH',
    flaggedDate: '2025-04-06', status: 'ESCALATED', assignedTo: 'BO Le Thanh',
    notes: 'Escalated to compliance department. Account temporarily locked pending investigation.' },
  { id: 'AML-003', investorId: 'INV-005', investorName: 'Vo Minh Tuan',
    flagReason: 'Unusually large transaction, exceeded 500M VND in 1 day', riskLevel: 'MEDIUM',
    flaggedDate: '2025-02-15', status: 'CLEARED', assignedTo: 'BO Tran Minh',
    notes: 'Verified funding source from property sale. Documentation valid, alert cleared.' },
  { id: 'AML-004', investorId: 'INV-007', investorName: 'Do Quang Minh',
    flagReason: 'Multiple token transfers to different wallets', riskLevel: 'LOW',
    flaggedDate: '2025-04-02', status: 'INVESTIGATING', assignedTo: 'BO Nguyen Hanh',
    notes: 'Monitoring transaction patterns. No clear anomaly detected yet.' },
];

// -- TRAINING MODULES (5 entries -- BO training screen)
const TRAINING_MODULES = [
  { id: 'TRN-001', title: 'Advanced KYC verification process', category: 'KYC',
    duration: '45 min', completionRate: 100, status: 'COMPLETED', dueDate: '2025-03-01', quizScore: 92 },
  { id: 'TRN-002', title: 'Money laundering transaction detection', category: 'AML',
    duration: '60 min', completionRate: 75, status: 'IN_PROGRESS', dueDate: '2025-04-15', quizScore: null },
  { id: 'TRN-003', title: 'Digital securities legal regulations', category: 'COMPLIANCE',
    duration: '90 min', completionRate: 0, status: 'NOT_STARTED', dueDate: '2025-05-01', quizScore: null },
  { id: 'TRN-004', title: 'POLARIS admin system usage', category: 'PLATFORM',
    duration: '30 min', completionRate: 100, status: 'COMPLETED', dueDate: '2025-02-15', quizScore: 88 },
  { id: 'TRN-005', title: 'Customer support skills', category: 'SUPPORT',
    duration: '45 min', completionRate: 40, status: 'IN_PROGRESS', dueDate: '2025-04-30', quizScore: null },
];

// -- XFER TRANSFERS (5 entries -- transfer screens for all roles)
const XFER_TRANSFERS = [
  { id: 'XFER-001', type: 'CEX', fromInvestor: 'Tran Mai Linh', toAddress: '0x3cD1...a8B4',
    tokenSymbol: 'VGP-S12', amount: 10, status: 'COMPLETED',
    createdAt: '2025-03-25T10:00:00Z', completedAt: '2025-03-25T10:05:00Z',
    txHash: '0xcd90...ef12', projectName: 'Vinhomes Grand Park Tower S12', amlStatus: 'CLEARED' },
  { id: 'XFER-002', type: 'P2P', fromInvestor: 'Do Quang Minh', toAddress: 'Nguyen Van Huy',
    tokenSymbol: 'SGC-TK', amount: 25, status: 'PROCESSING',
    createdAt: '2025-04-07T14:30:00Z', completedAt: null,
    txHash: null, projectName: 'Sun Grand City Thuy Khue', amlStatus: 'CLEARED' },
  { id: 'XFER-003', type: 'CEX', fromInvestor: 'Vo Minh Tuan', toAddress: '0x8fE5...a6B1',
    tokenSymbol: 'VGP-S12', amount: 50, status: 'PENDING',
    createdAt: '2025-04-08T09:15:00Z', completedAt: null,
    txHash: null, projectName: 'Vinhomes Grand Park Tower S12', amlStatus: 'PENDING' },
  { id: 'XFER-004', type: 'P2P', fromInvestor: 'Bui Ngoc Lan', toAddress: 'Tran Mai Linh',
    tokenSymbol: 'VOP-S2', amount: 20, status: 'AML_FLAGGED',
    createdAt: '2025-04-06T16:00:00Z', completedAt: null,
    txHash: null, projectName: 'Vinhomes Ocean Park S2.05', amlStatus: 'FLAGGED' },
  { id: 'XFER-005', type: 'MARKET', fromInvestor: 'Nguyen Van Huy', toAddress: '0x1dC4...e5F0',
    tokenSymbol: 'ECO-B6', amount: 15, status: 'COMPLETED',
    createdAt: '2025-04-05T11:00:00Z', completedAt: '2025-04-05T11:08:00Z',
    txHash: '0xab45...cd67', projectName: 'Ecopark Hai Duong Villa B6', amlStatus: 'CLEARED' },
];

// -- XFER P2P OFFERS (3 entries -- investor P2P transfer screens)
const XFER_P2P_OFFERS = [
  { id: 'P2P-001', senderName: 'Do Quang Minh', receiverName: 'Nguyen Van Huy',
    tokenSymbol: 'SGC-TK', amount: 25, pricePerToken: 8200000, totalValue: 205000000,
    status: 'PENDING', createdAt: '2025-04-07T14:30:00Z', expiresAt: '2025-04-14T14:30:00Z',
    projectName: 'Sun Grand City Thuy Khue' },
  { id: 'P2P-002', senderName: 'Tran Mai Linh', receiverName: 'Vo Minh Tuan',
    tokenSymbol: 'VGP-S12', amount: 30, pricePerToken: 5100000, totalValue: 153000000,
    status: 'COMPLETED', createdAt: '2025-03-20T10:00:00Z', expiresAt: '2025-03-27T10:00:00Z',
    projectName: 'Vinhomes Grand Park Tower S12' },
  { id: 'P2P-003', senderName: 'Vo Minh Tuan', receiverName: 'Bui Ngoc Lan',
    tokenSymbol: 'VGP-S12', amount: 40, pricePerToken: 4950000, totalValue: 198000000,
    status: 'EXPIRED', createdAt: '2025-03-01T08:00:00Z', expiresAt: '2025-03-08T08:00:00Z',
    projectName: 'Vinhomes Grand Park Tower S12' },
];

// -- REDM REQUESTS (4 entries -- redemption lifecycle screens)
const REDM_REQUESTS = [
  { id: 'REDM-001', investorName: 'Do Quang Minh', poolName: 'Pool SGC-TK Q2',
    tokenAmount: 25, status: 'QUEUED', requestDate: '2025-04-07T09:00:00Z',
    batchId: null, assignedProperty: null, penaltyApplied: false, penaltyAmount: 0, lockupExpired: true },
  { id: 'REDM-002', investorName: 'Nguyen Van Huy', poolName: 'Pool ECO-B6 Q1',
    tokenAmount: 20, status: 'EXECUTED', requestDate: '2025-03-15T10:00:00Z',
    batchId: 'BATCH-005',
    assignedProperty: { name: 'B6-15, Ecopark Hai Duong', type: 'Villa', location: 'Van Giang, Hung Yen' },
    penaltyApplied: false, penaltyAmount: 0, lockupExpired: true },
  { id: 'REDM-003', investorName: 'Tran Mai Linh', poolName: 'Pool VGP-S12 Q1',
    tokenAmount: 50, status: 'ACCEPTED', requestDate: '2025-02-20T14:00:00Z',
    batchId: 'BATCH-003',
    assignedProperty: { name: 'S12.05, Floor 12, Vinhomes Grand Park', type: 'Apartment', location: 'Quan 9, TP. Ho Chi Minh' },
    penaltyApplied: true, penaltyAmount: 12500000, lockupExpired: false },
  { id: 'REDM-004', investorName: 'Vo Minh Tuan', poolName: 'Pool VOP-S2 Q4/2024',
    tokenAmount: 80, status: 'COMPLETED', requestDate: '2024-12-01T08:00:00Z',
    batchId: 'BATCH-001',
    assignedProperty: { name: 'S2.05-12A, Floor 12, Vinhomes Ocean Park', type: 'Apartment', location: 'Gia Lam, Ha Noi' },
    penaltyApplied: false, penaltyAmount: 0, lockupExpired: true },
];

// -- REDM PROPERTIES (4 entries -- redemption property pool selection)
const REDM_PROPERTIES = [
  { id: 'RPOOL-001', poolName: 'Pool VGP-S12 Q2', propertyType: 'CAN_HO',
    location: 'Quan 9, TP. Ho Chi Minh', availableCount: 3, totalCount: 8,
    minTokens: 50, estimatedValue: 3500000000, status: 'READY_FOR_HANDOVER' },
  { id: 'RPOOL-002', poolName: 'Pool ECO-B6 Q2', propertyType: 'BIET_THU',
    location: 'Van Giang, Hung Yen', availableCount: 1, totalCount: 4,
    minTokens: 100, estimatedValue: 12000000000, status: 'PARTIALLY_ALLOCATED' },
  { id: 'RPOOL-003', poolName: 'Pool VOP-S2 Q2', propertyType: 'CAN_HO',
    location: 'Gia Lam, Ha Noi', availableCount: 5, totalCount: 10,
    minTokens: 40, estimatedValue: 2800000000, status: 'READY_FOR_HANDOVER' },
  { id: 'RPOOL-004', poolName: 'Pool SGC-TK Q2', propertyType: 'NHA_PHO',
    location: 'Tay Ho, Ha Noi', availableCount: 2, totalCount: 3,
    minTokens: 75, estimatedValue: 8500000000, status: 'READY_FOR_HANDOVER' },
];

// ═══════════════════════════════════════════════════════════════════════
// ALLOCATIONS (3 entries -- OSET settlement screens)
// ═══════════════════════════════════════════════════════════════════════

const ALLOCATIONS = [
  {
    id: 'ALLOC-001',
    campaignName: 'VGP Tower S12 -- Batch 3',
    projectName: 'Vinhomes Grand Park Tower S12',
    tokenSymbol: 'VGP-S12',
    status: 'ALLOCATED',
    commitmentAmount: 50000000,
    commitmentTokenCount: 10,
    allocationRatio: 71.4,
    tokensAllocated: 7,
    amountCharged: 35000000,
    refundAmount: 15000000,
    refundStatus: 'CREDITED',
    tokenPrice: 5000000,
    subscriptionRate: 140,
    isOversubscribed: true,
    lockUpDays: 90,
    lockUpEndDate: '2025-10-01',
    cancellationReason: null,
    thresholdRequired: null,
    thresholdAchieved: null,
    allocatedAt: '2025-07-03',
  },
  {
    id: 'ALLOC-002',
    campaignName: 'Ecopark B6 Villa -- Batch 1',
    projectName: 'Ecopark Hai Duong Villa B6',
    tokenSymbol: 'ECO-B6',
    status: 'ALLOCATED',
    commitmentAmount: 100000000,
    commitmentTokenCount: 10,
    allocationRatio: 100,
    tokensAllocated: 10,
    amountCharged: 100000000,
    refundAmount: 0,
    refundStatus: null,
    tokenPrice: 10000000,
    subscriptionRate: 80,
    isOversubscribed: false,
    lockUpDays: 0,
    lockUpEndDate: null,
    cancellationReason: null,
    thresholdRequired: null,
    thresholdAchieved: null,
    allocatedAt: '2025-07-05',
  },
  {
    id: 'ALLOC-003',
    campaignName: 'Masteri Centre Point T3 -- Coming Soon',
    projectName: 'Masteri Centre Point T3',
    tokenSymbol: 'MCP-T3',
    status: 'CANCELLED',
    commitmentAmount: 60000000,
    commitmentTokenCount: 10,
    allocationRatio: 0,
    tokensAllocated: 0,
    amountCharged: 0,
    refundAmount: 60000000,
    refundStatus: 'CREDITED',
    tokenPrice: 6000000,
    subscriptionRate: 35,
    isOversubscribed: false,
    lockUpDays: 0,
    lockUpEndDate: null,
    cancellationReason: 'Offering failed to meet minimum subscription threshold',
    thresholdRequired: 50,
    thresholdAchieved: 35,
    allocatedAt: null,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// OSET PORTFOLIO (investor settlement portfolio summary)
// ═══════════════════════════════════════════════════════════════════════

const OSET_PORTFOLIO = {
  totalValue: 555000000,
  totalReturn: 5000000,
  returnPercentage: 0.9,
  tokenCount: 17,
  projectCount: 2,
  availableBalance: 215000000,
  refundAmount: 15000000,
  refundNote: 'Includes 15M VND oversubscription refund',
  lastUpdated: '2025-07-03',
  tokens: [
    {
      projectName: 'Vinhomes Grand Park Tower S12',
      tokenSymbol: 'VGP-S12',
      balance: 7,
      currentPrice: 5100000,
      currentValue: 35700000,
      purchasePrice: 5000000,
      returnPercentage: 2.0,
      lockupStatus: 'LOCKED',
      lockupEndDate: '2025-10-01',
      lockupDaysRemaining: 90,
      isNew: true,
    },
    {
      projectName: 'Ecopark Hai Duong Villa B6',
      tokenSymbol: 'ECO-B6',
      balance: 10,
      currentPrice: 10200000,
      currentValue: 102000000,
      purchasePrice: 10000000,
      returnPercentage: 2.0,
      lockupStatus: 'UNLOCKED',
      lockupEndDate: null,
      lockupDaysRemaining: 0,
      isNew: true,
    },
  ],
};

// Convenience pointer for active allocation (oversubscription success)
const ACTIVE_ALLOCATION = ALLOCATIONS[0];
