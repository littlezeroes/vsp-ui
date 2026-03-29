# Prompt: Vẽ Full UI VAS trong Figma

## Context
Vẽ toàn bộ 12 screens cho feature VAS (Value-Added Services) của V-Smart Pay trong Figma file `U5hqWK5FSpMeQa9wU8wxjs`, sử dụng 100% Design System.

## Target file
`https://www.figma.com/design/U5hqWK5FSpMeQa9wU8wxjs/Untitled`

## Design System Sources
- **Color variables:** file `OaKPN3a4NaloZ3I6hrFZUZ` — 173 primitive + 80 semantic (Light/Dark)
- **Typography styles:** file `M9TrdyhUYiBzE8yq2ZkBAT` — 23 text styles (Inter)
- **Core Components:** file `m8U2GMl2eptDD5gv9iwXDs`
- **Handoff reference:** file `B0eFgLhPKLHSC8gdn3p1uo` (Insurance)
- **Snowflake reference:** file `5RKOMXRwHrvVPKeEDdBnGS` (Insurance)

## Wireframe source
Code tại `app/vas/` — chạy `localhost:3000/vas/*` để xem wireframes.

## 12 Screens to design

### Flow 1: Home
| # | Route | Screen name | Header | Content |
|---|-------|-------------|--------|---------|
| 1 | `/vas` | VAS Home | Large Title "Thanh toán" + back + settings | Search bar pill, urgent bill banner (warning), 4×2 category grid (icon circles), saved billers list (avatar+name+code+amount), home indicator |

### Flow 2: Bill Payment
| # | Route | Screen name | Header | Content |
|---|-------|-------------|--------|---------|
| 2 | `/vas/bill` | Hoá đơn | Large Title "Hoá đơn" | SectionTitle "Loại dịch vụ", DataRow card: Điện/Nước/Internet/Truyền hình |
| 3 | `/vas/bill/provider` | Nhà cung cấp | Default "[Type]" | Search bar, grouped provider list by region (HCMC/HN/Miền Trung) in cards |
| 4 | `/vas/bill/input` | Bill Lookup | Default "[Provider]" | Provider card (avatar+name), TextField (mã KH), Divider, bill found section: DataRow card (kỳ TT, số tiền, hạn), FixedBottom "Thanh toán" |

### Flow 3: Topup + Confirm
| # | Route | Screen name | Header | Content |
|---|-------|-------------|--------|---------|
| 5 | `/vas/topup` | Nạp tiền | Default "Nạp tiền điện thoại" | TextField (SĐT), Divider, denomination 3×2 grid (selected=black fill), FixedBottom "Tiếp tục" |
| 6 | `/vas/confirm` | Kết quả TT | (no header) | Success icon (✓, bgSuccessSubtle), Title "Thanh toán thành công!", timestamp, info DataRow card (dịch vụ, NCC, mã KH, số tiền=success), FixedBottom "Về trang chủ" |

### Flow 4: Card + Data
| # | Route | Screen name | Header | Content |
|---|-------|-------------|--------|---------|
| 7 | `/vas/card` | Mua thẻ cào | Default "Mua thẻ cào" | Carrier 3-col grid (selected=green border+shadow), Divider, denomination DataRow list, FixedBottom "Mua thẻ" |
| 8 | `/vas/data` | Mua gói data | Default "Mua gói data" | TextField (SĐT+carrier), Divider, 2-col package grid (name, data, price; selected=black fill), FixedBottom "Mua gói" |

### Flow 5: Finance
| # | Route | Screen name | Header | Content |
|---|-------|-------------|--------|---------|
| 9 | `/vas/finance` | Tài chính | Large Title "Tài chính" | SectionTitle "Nhà cung cấp", DataRow card (12 finance providers) |
| 10 | `/vas/finance/input` | Finance Input | Default "[Provider]" | Provider card (avatar+name), TextField (số hợp đồng), Divider, loan DataRow card (kỳ TT, số tiền, hạn), FixedBottom "Thanh toán" |

### Flow 6: Saved Management
| # | Route | Screen name | Header | Content |
|---|-------|-------------|--------|---------|
| 11 | `/vas/saved` | Quản lý | Large Title "Quản lý" | Pill tab switcher (Hoá đơn/SĐT), grouped sections (Điện/Nước/Internet) with SectionTitle + DataRow cards |
| 12 | `/vas/saved/detail` | Chi tiết | Default "Chi tiết" | Provider card (avatar+name+ID, shadow), Divider, info DataRow card, Divider, auto-pay toggle, 2-button FixedBottom (primary "Thanh toán ngay" + danger "Xoá") |

## Component Registry (use these, not raw frames)

### Library components (import by key)
| Component | Key | Usage |
|---|---|---|
| VSP_Header (SET) | `82bdd0605a6725f57024015096e95b37e3b1bc2c` | Default / Large Title variant. Hide SearchBar + Description after instantiation |
| VSP_Button/Brand (SET) | `6869c6f4bec418ff7a8d7b7cf9db7b290bad7ce8` | primary/secondary × 48/32 × enabled/disabled/danger. Text override via findAll→fontAsync→characters |
| [VSP]buttonGroup (SET) | `26a9299396e53bacc7fb49b8afc34d7d61e7d432` | Horizontal/Vertical layout |

### Local components (create once, reuse)
| Component | Properties | Structure |
|---|---|---|
| **VSP_DataRow** | Label (TEXT), Value (TEXT), Show Divider (BOOLEAN), style (VARIANT: default/success/danger) | HORIZONTAL auto-layout, Body/S label left + Title/XS value right, 1px divider at bottom |
| **VSP_SectionTitle** | Title (TEXT) | px-22, pt-24, pb-12, Title/S semibold |
| **VSP_Divider** | — | h-4, FILL width, bg: --background/surface/secondary |
| **VSP_FixedBottom** | — | CTA frame (px-22, pt-12, pb-16) + Button instance + Home Indicator (139×5, rounded-100) |

### Key variable keys
```
Foreground/Primary    → 22ba114e70b2f94bd0c4a0e90dada6543968b56f
Foreground/Secondary  → a04bf8f6a7169ea0065b26c58a27986a43842730
Foreground/Success    → b13965167e0694fa78fcf47a850408452751a20c
Foreground/Danger     → b3542ada1474032f3d8ad9a1e1b91f682e9402c2
Foreground/Inverse    → 682857c1cd1f51daef58825a96e7cf80fe62981e
Background/Primary    → 3a3e30a75616d739b0dd46b9813321dca290aec0
Background/Sub-primary→ e6249ba28a6559f5cdd1d2638a61604bfb630659
Background/Secondary  → 9ad0b4c0b6dac8fa6fa6fe524ea0019224ff8e67
Background/Tertiary   → 55973668b75ba2da313f7698f2e4f64286bc97a2
Background/Success-sub→ 29c3296aa780d5fe259f9447409dd13a51f64746
```

### Key text style keys
```
Title/L  (24 SemiBold)  → 89a438280861d2be408b5fb75b8bbca043da3147
Title/M  (20 SemiBold)  → f3815b1d8ca92d43d20f3c39fb2afb0006b66871
Title/S  (16 SemiBold)  → 3947f435e87815a57871829430f0bf946cd7dd0c
Title/XS (14 SemiBold)  → 252684213ea0a27a36eba189670017be3c8046de
Body/S   (14 Regular)   → 0f3ac516b201cacc39b0a3240e3593d9bff6b139
Body/XS  (12 Regular)   → 6b661166429d7d6927c71336497a704d1cec38a7
Caption/M (12 SemiBold) → a0c78bbfb8efdfd8ff2901f749232a0c9a489e08
Heading/M (32 SemiBold) → 3fb02b73287a0e27d653751cf2f8c4cd52d879a8
```

## Critical Rules

### Composition pattern (from Handoff)
```
[Screen] (390×844, clip, vertical auto-layout, bg: --bg/primary or --bg/sub-primary)
├── VSP_Header instance (FILL width)
│   → hide SearchBar, Description, progressStep after creation
├── Section v2 pattern:
│   ├── VSP_SectionTitle instance (FILL)
│   └── Frame "Slot" (px-22, vertical, gap-0) ← NOT Section v2 slot!
│       └── VSP_DataRow instances (FILL, text set via setProperties)
├── VSP_Divider instance (FILL, h-4)
├── (repeat sections...)
└── VSP_FixedBottom instance (ABSOLUTE, bottom, STRETCH)
    ├── CTA frame → VSP_Button/Brand instance
    └── Home Indicator (139×5, rounded-100)
```

### Card pattern (for grouped data rows)
```
Frame "Slot" (px-10, vertical)
└── Frame "Card" (vertical, bg: --bg/primary, rounded-16, shadow 0 8 24 rgba(0,0,0,0.08), px-12 py-4)
    ├── VSP_DataRow instance (FILL, divider=true)
    ├── VSP_DataRow instance (FILL, divider=true)
    └── VSP_DataRow instance (FILL, divider=false) ← last row no divider
```

### DataRow text override (CRITICAL)
```javascript
// DataRow has TEXT component properties — use setProperties with full key:
var drKeys = {}; // build from componentPropertyDefinitions
for (var k in dataRowSet.componentPropertyDefinitions) {
  drKeys[k.replace(/#[^#]+$/, "")] = k;
}
// Then:
instance.setProperties({
  [drKeys["Label"]]: "Nhà cung cấp",
  [drKeys["Value"]]: "EVN HCMC",
  [drKeys["Show Divider"]]: false  // last row
});
```

### DO NOT
- Put VSP_DataRow inside Section v2 SLOT (text overrides reset)
- Use VSP_fixedBottom/Default library component (Mona Sans font missing)
- Use hardcoded hex colors — always `setBoundVariableForPaint`
- Use raw fontSize/fontName — always `textStyleId = style.id`
- Leave SearchBar visible in headers

### Shadow syntax
```javascript
{ type: "DROP_SHADOW", color: {r:0,g:0,b:0,a:0.08}, offset: {x:0,y:8}, radius: 24, spread: 0, visible: true, blendMode: "NORMAL" }
```

## QA Check
After building, run DS compliance checker (`.claude/agents/figma-ds-checker.md`):
- 0 hardcoded colors
- 0 missing text styles
- 0 hardcoded text colors
- All visual elements are component instances (not raw frames)
- Skip scanning inside library instances (remote)

## User Flow (FigJam)
```
HOME → Bill Categories → Provider List → Bill Input → Confirm → Result
HOME → Topup → Confirm → Result
HOME → Card → Confirm → Result
HOME → Data → Confirm → Result
HOME → Finance → Finance Input → Confirm → Result
HOME → Saved Manager → Saved Detail → Pay/Delete
```
