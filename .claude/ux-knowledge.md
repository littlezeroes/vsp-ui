# VSP UX Knowledge Base
> V-Smart Pay v1.0 · Cập nhật: 2026-02-28
> Full detail: `/Users/huykieu/Documents/vsp-ai-review/VSP_UX_Documentation.md`

---

## App Identity
- **Tên:** V-Smart Pay — ví điện tử tích hợp hệ sinh thái Vinhomes/VinGroup
- **Platform:** iOS + Android
- **Figma (screens):** `qTHCp43QxoB26wrCowyjSt`
- **Figma (design system):** `m8U2GMl2eptDD5gv9iwXDs` (VSP_Core-Components)
- **Màu chủ đạo:** Đen + Đỏ (#E31837) CTA, nền trắng
- **Version hiện tại:** v1.0 Production-ready

---

## Navigation Structure

**Bottom Tab Bar (5 items):**
```
🏠 Home  |  ↔ Chuyển tiền  |  🕐 Giao dịch  |  👤 Tài khoản  |  📱 QR (đỏ, center)
```

**Modal/Sheet:** slide up from bottom
**Back:** ChevronLeft trong NavBar
**Max depth:** 4 cấp

---

## Core User Flows

### Onboarding / Auth
```
App Launch → Splashscreen (1-2s) → Check auth
  [New user]      → Nhập SĐT → OTP → Đặt PIN → (Biometric?) → Home
  [Existing user] → Nhập SĐT → PIN → Home
  [Biometric]     → Nhập SĐT → Face/Touch ID → Home
  [Forgot PIN]    → OTP → PIN mới → Home
  [New device]    → Chờ xác nhận thiết bị cũ → (OTP fallback)
```

### Home
```
Header (Greeting + Bell) → Wallet Card (balance toggle) → Quick Actions
→ eKYC banner (nếu chưa xác thực) → Bottom Nav
```

### Transaction Core
```
Nạp tiền:  Home→Nạp/Rút → Chọn TK → Số tiền → Confirm → Auth → Result
Rút tiền:  Home→Nạp/Rút → Chọn TK → Số tiền → Confirm → Auth → Result
Chuyển P2P: BottomNav→ Nhập SĐT → Số tiền → Confirm → Auth → Result
Chuyển NH:  BottomNav→ STK+NH → Lookup tên → Số tiền → Confirm → Auth → Result
Thanh toán: QR scan → Confirm → Auth → Result
Nhận tiền:  QR show → (set amount) → Share
```

### VAS
```
Nạp ĐT:   Hub → Nhập SĐT → Auto-detect carrier → Chọn mệnh giá → Auth → Result
Hóa đơn:  Hub → Chọn dịch vụ → Mã KH → Fetch bill → Confirm → Auth → Result
```

### Account / Security
```
Tài khoản → Profile | Liên kết NH | Trung tâm bảo mật | Language | Notification | Support | Logout
Bảo mật: PIN | Biometric (đăng nhập) | Biometric (giao dịch) | OTP (SMS/Email/Smart)
```

---

## Auth Hierarchy

| Loại giao dịch | Auth yêu cầu |
|---|---|
| Mọi giao dịch thông thường | PIN |
| Giá trị lớn (threshold TBD) | PIN + Face verification |
| Fido device | Fido biometric |
| Fido + tăng cường | Fido + Face scan |
| Đăng nhập app | PIN hoặc Biometric (nếu bật) |
| Biometric thất bại 3 lần | Fallback → PIN |

---

## Page Inventory (v1.0)

| Page | Group | Node ID | Status |
|------|-------|---------|--------|
| Splashscreen | Onboarding | `40017314:6643` | ready |
| Đăng nhập / Đăng ký | Onboarding | `40004320:20494` | ready |
| eKYC (Chụp CCCD) | Onboarding/Auth | `40002303:54242` | ready |
| Yêu cầu đăng nhập thiết bị mới | Auth | `40004300:4375` | ready |
| Trang chủ (Home) | Core | `40009356:6863` | ready |
| Ẩn / Hiện số dư | Core | `40009357:28386` | ready |
| Payment Hub (từ V-App) | Core | `40009143:10433` | ready |
| V-App → VSP (flow) | Integration | `40009357:37714` | ready |
| V-App → VSP (suggest) | Integration | `40019749:7704` | draft |
| Nạp tiền / Rút tiền | Transaction | `40002297:32958` | ready |
| Chuyển tiền | Transaction | `40006088:57373` | ready |
| Xác thực giao dịch | Transaction | `40004769:73935` | ready |
| Thanh toán & Nhận tiền (QR) | Transaction | `40004628:18577` | ready |
| Quản lý tài khoản liên kết | Banking | `40002297:23425` | ready |
| Liên kết ngân hàng | Banking | `40002105:6991` | ready |
| Quản lý lịch sử giao dịch | History | `40003664:4167` | ready |
| Notification | Account | `40004956:27045` | ready |
| Account / Profile | Account | `40005018:6065` | ready |
| Help Center | Account | `40019205:18725` | ready |
| Nạp tiền điện thoại | VAS | `40002305:67696` | ready |
| Thanh toán hóa đơn | VAS | `40002431:144546` | ready |
| Thanh toán hóa đơn 1/2026 | VAS | `40019518:27104` | updated |
| Kết quả giao dịch (shared) | Shared | `40013468:41558` | ready |
| Xác thực GD bằng biometric | Security | `40004333:4827` | ready |
| Đăng nhập bằng biometric | Security | `40004373:19185` | ready |
| Glabal screen | Reference | `40021905:72896` | ref |
| CORE VÍ | Reference | `40002297:20853` | ref |
| Authen & Security | Reference | `40002303:53436` | ref |
| VAS | Reference | `40008698:23879` | ref |
| Dùng chung trên app | Reference | `40013147:601532` | ref |
| Update Logo | Utility | `40018587:16880` | util |
| Loading | Utility | `40013147:596328` | util |
| Logo bank | Utility | `40014646:20121` | util |
| Dialog dùng chung | Utility | `40013147:605604` | util |

---

## Shared UX Patterns

### Transaction Result (template dùng chung)
Node: `40013468:41558`
- Status: ✅ Thành công | ⏳ Đang xử lý | ❌ Thất bại
- Fields: type, time, parties, amount, fee, ref code
- CTAs: "Về trang chủ" + "Quay lại V-App"
- Dùng cho: nạp, rút, chuyển, QR, nạp ĐT, hóa đơn

### Error Screen Pattern
1. Illustration/Icon · 2. Title ngắn · 3. Body + hướng dẫn · 4. CTA Primary (Thử lại) · 5. CTA Secondary (Về Home)

### Loading Pattern
- List content → Skeleton loading
- Action đang xử lý → Spinner overlay
- Multi-step (eKYC) → Progress bar

### QR Pattern
- Scan to pay: fullscreen camera + scan frame + flash + gallery
- Show QR: static QR + optional amount input → dynamic QR
- Standard: VietQR · Expire: dynamic QR có TTL

### eKYC Pattern (3 steps)
CCCD mặt trước → CCCD mặt sau → Liveness check
- Retry tối đa 3 lần/step
- Thất bại → Liên hệ CSKH

---

## Key Components per Feature

| Feature | Key Components |
|---------|---------------|
| Home | WalletCard, QuickActionButton, BannerCarousel, BottomNav |
| Auth | OTPInput, PINPad, BiometricOverlay, FidoPrompt |
| Transaction | AmountInput, QuickAmountChips, ConfirmCard, AuthSheet |
| Transfer | ContactList, AccountLookup, TransferConfirmCard |
| QR | QRScanner, QRDisplay, ShareSheet |
| Banking | BankAccountCard, BankSelector, CardInput, UnlinkConfirmSheet |
| History | TransactionListItem, FilterSheet, DateRangePicker |
| Notification | NotificationItem, TabBar (Quan trọng/Giao dịch/Ưu đãi) |
| Account | ProfileHeader, SettingRow, ToggleRow, SecurityCenter |
| VAS | DenominationChips, CarrierAutoDetect, BillCard, ServiceCategoryGrid |

---

## Bank Integration

| Ngân hàng | Nạp tiền | Rút tiền | Liên kết STK | Liên kết thẻ |
|-----------|----------|----------|-------------|-------------|
| Techcombank | ✅ | ✅ | ✅ | ✅ |
| Napas network | ✅ | ❌ | ❌ | ✅ |

---

## Version Log

| Version | Date | Ghi chú |
|---------|------|---------|
| v1.0 | 2026-02-28 | Baseline — Production-ready (34 pages documented) |

> **Khi có version mới:** thêm row vào Version Log, cập nhật Page Inventory (thêm/sửa/xóa rows), cập nhật flows nếu có thay đổi UX.
