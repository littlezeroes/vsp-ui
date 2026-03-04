# First Principles — RWA Investment Platform
**Polaris · Feb 2026**

---

## Câu hỏi cốt lõi

> "Làm sao để user **tự tin** đặt tiền thật vào thứ họ chưa từng nghe, trên platform chưa có track record?"

Đây không phải vấn đề UI hay flow. Đây là **3 gap cùng lúc**:

| Gap | Định nghĩa |
|---|---|
| **Trust gap** | Platform mới, không có track record — chưa đủ legitimacy để nhận tiền thật |
| **Knowledge gap** | Khái niệm mới hoàn toàn — user không đủ hiểu để ra quyết định có cơ sở |
| **Behavior gap** | Không có reference behavior — đầu tư tài sản vô hình qua app là hành vi chưa từng làm |

**Tại sao 3 gap này tồn tại?**

- **Trust gap:** Platform mới + tiền thật + data nhạy cảm (CCCD) — user phải tin trước khi thấy giá trị.
- **Knowledge gap:** Token hóa BĐS là paradigm mới. Jargon tài chính + blockchain — không có reference để so sánh.
- **Behavior gap:** Mua sắm online ≠ đầu tư. Commit tiền thật vào tài sản vô hình = rào cản tâm lý lớn nhất.

---

## Design Direction

> **"Build informed confidence, not FOMO-driven conversion"**

User hiểu cái họ mua → **giữ lâu, đầu tư thêm, giới thiệu người khác.**
User không hiểu → rút tiền, phàn nàn, trust collapse.

---

## User Journey Map

**Persona:** Trần Mai Linh, 29, PM, HCMC — lần đầu đầu tư BĐS token hóa.

---

### Phase 1 — App Discovery `P2 · Entry hook`

**Các bước:** Mở app → Onboarding ≤ 3 màn (skip được) → Browse tự do → Đọc tài sản

**Mục tiêu:** Onboarding = value pitch, không phải tutorial. Xong là browse ngay — không chặn đăng ký.

**Tâm lý user:**
- 💭 *"Ủa đầu tư BĐS từ 1 triệu được à?"* → Tò mò, Hứng khởi
- 🚨 *"Quá tốt để là thật — lừa đảo không?"* → Nghi ngờ, Lo lắng

**Cần làm:**
1. **Onboarding 3 màn, skip được** `[Knowledge] [Trust]` — Màn 1: value hook số thật · Màn 2: how it works 1 câu · Màn 3: brand + licensed + số investor thật
2. **Browse tự do — không cần đăng ký** `[Behavior]` — Xem dự án, giá, lợi nhuận kỳ vọng trước. Intent cao → mới hỏi commitment.
3. **Trust anchor bằng số thật** `[Trust]` — Chỉ show social proof khi có số thực — số ảo phản tác dụng.

**Nên tránh:**
1. Onboarding > 3 màn / không skip được — User skip hết → 3 gap vẫn nguyên
2. Bắt đăng ký ngay sau onboarding — User cảm giác bị dẫn vào bẫy → drop
3. Giải thích blockchain / kỹ thuật — User cần lợi ích, không cần cơ chế — mất người ngay màn 1

**Success Metrics (Maze):** Task completion xem 1 dự án không đăng ký · Comprehension "Platform này bán gì?" · Misclick rate CTA đầu trang

---

### Phase 2 — Đăng ký & KYC `P1 · Gate chính` ⭐

**Các bước:** Browse → Calculator → [Click "Đầu tư"] → KYC L2 gate → CCCD + liveness → Unlock tài khoản

**Mục tiêu:** KYC gate xuất hiện tại điểm intent — user đã thấy giá trị trước khi bị chặn. Frame = "Mở khóa", không phải "Xác minh".

**Tâm lý user:**
- 💭 *"Để tôi tính xem đầu tư bao nhiêu hợp lý"* → Tính toán, Cân nhắc
- 🚨 *"Sao phải chụp CCCD? Thông tin đi đâu?"* → Hoang mang, Mất tin tưởng

**Cần làm:**
1. **Gate sau khi user đã có intent** `[Behavior]` — Click "Đầu tư" → KYC xuất hiện — motivation cao nhất, không drop
2. **Progress rõ ràng + "85% duyệt tự động"** `[Trust]` — 1/3 → 2/3 → 3/3 · Không phải blocker, là cửa unlock
3. **Inline tooltip cho jargon** `[Knowledge]` — "Escrow ⓘ" = "Ngân hàng giữ tiền, không vào tay chủ đầu tư"

**Nên tránh:**
1. Gate KYC ngay khi mở module — Chưa thấy giá trị → không có lý do làm KYC 5 phút → drop
2. Màn chờ không có timeline — 30 giây AI mà không có progress → user nghĩ app lỗi → back
3. SPV, Escrow hiển thị không giải thích — Comprehension anxiety → không dám ký

> ⚖️ Khuyến nghị UX — quyết định cuối thuộc Legal/Compliance.

**Success Metrics (Maze):** Task completion KYC flow · Time on task từng bước · Comprehension "Escrow là gì?" · Misclick rate trong form

---

### Phase 3 — Tham gia Token Offering `P2 · Điểm căng thẳng cao nhất`

**Các bước:** Đăng ký → Chọn số tiền → Xác nhận thanh toán

**Mục tiêu:** Quyết định có cơ sở — không phải FOMO. Rủi ro và điều kiện lock phải rõ trước khi confirm.

**Tâm lý user:**
- 💭 *"5 triệu → 650k/năm, 1,200 người đã vào rồi"* → Tự tin, Quyết tâm
- 🚨 *"Bao nhiêu là đủ? Đổi ý có lấy tiền lại không?"* → FOMO, Do dự

**Cần làm:**
1. **Simulator trước khi commit** `[Knowledge]` — Nhập số tiền → hiện ngay "500 token · 650k/năm · lock 90 ngày"
2. **Rủi ro + điều kiện lock trước confirm** `[Trust]` — Nói rõ trước mặt — không giấu trong T&C
3. **Social proof realtime** `[Trust]` — "1,247 nhà đầu tư · 80% · Còn 2 ngày" — số thật, có progress bar

**Nên tránh:**
1. Chỉ có nút "Đầu tư ngay" — Không context → user đoán số → regret sau commit
2. Countdown timer — FOMO → quyết định thiếu cơ sở → churn khi tỉnh táo
3. Giấu rủi ro trong T&C — Ký mà không hiểu → phàn nàn → trust collapse

**Success Metrics (Maze):** Task completion commit 5 triệu · Confidence score 1–5 sau khi chọn số tiền · Time on task bước confirm · Misclick rate có đọc risk không

---

### Phase 4 — Chờ phân bổ Token `P3 · Waiting state`

**Các bước:** Màn hình chờ → Theo dõi tiến độ → Nhận kết quả

**Mục tiêu:** Không có black box. Push notification chủ động — không để user tự vào check.

**Tâm lý user:**
- 💭 *"Bước 3/5 · xong lúc 14:00 · tiền đang trong escrow"* → Yên tâm, Chờ đợi
- 🚨 *"Tiền ở đâu? Không có thông tin gì cả?"* → Lo lắng, Mất tin tưởng

**Cần làm:**
1. **Từng bước chờ có màn riêng** `[Trust]` — "Bước 3/5 · Xác nhận thanh toán · Dự kiến 14:00" — không black box
2. **Push notification từng bước** `[Behavior]` — Chủ động thông báo — không để user tự mò vào check
3. **Kết quả bằng tiếng người** `[Knowledge]` — "357 token · 35.7M đ · Hoàn 14.3M đ vào ví" — không phải raw data

**Nên tránh:**
1. Spinner "Đang xử lý..." — Không timeline → user nghĩ mất tiền → gọi support
2. Không push notification — User tự check liên tục → anxiety loop → mất tin platform
3. Kết quả raw data — "0.00142 token allocated" → hoang mang, không hiểu lời hay lỗ

**Success Metrics (Maze):** Task completion tìm trạng thái đơn · Comprehension "Tiền đang ở đâu?" · Misclick rate có tìm support không

---

### Phase 5 — Theo dõi danh mục `P3 · Retention`

**Các bước:** Nhận token → Xem danh mục → Báo cáo tháng

**Mục tiêu:** Củng cố quyết định đã đầu tư. Tạo vòng lặp re-invest tự nhiên — không ép buộc.

**Tâm lý user:**
- 💭 *"Tăng 3.2% — tốt hơn gửi ngân hàng. Campaign mới không?"* → Tự hào, Muốn đầu tư thêm
- 🚨 *"Giá xuống — bán không? Không có gì mới, chán rồi"* → Lo thị trường, Nhàm chán

**Cần làm:**
1. **Dashboard có context đầy đủ** `[Knowledge]` — Giá trị VND · % thay đổi · so sánh lãi suất ngân hàng — user tự đánh giá được
2. **Giải thích khi giá biến động** `[Trust]` — Ngắn gọn + nhắc timeline dài hạn — ngăn user bán hoảng
3. **Báo cáo tháng + gợi ý campaign** `[Behavior]` — Lợi nhuận + tiến độ dự án + campaign mới — vòng lặp re-invest tự nhiên

**Nên tránh:**
1. Chỉ hiện số token — User không biết trị giá → không cảm nhận được lợi ích
2. Không giải thích khi giá xuống — Hoảng loạn → gọi support → đòi rút — churn có thể tránh được
3. Không có action sau khi đầu tư — Không lý do mở app → không quay lại → re-invest rate = 0

**Success Metrics (Maze):** Task completion hiệu suất tháng này · Comprehension "Đang lời hay lỗ?" · Time on task đọc dashboard

---

## Trust Equation

```
Trust = (Competence × Benevolence) / Perceived Risk
```

Tăng trust = tăng cả hai × giảm perceived risk.
**Giấu risk không giảm được risk — chỉ làm trust collapse nặng hơn.**

---

## 5 Flow Principles

| # | Principle | Ý nghĩa |
|---|---|---|
| 1 | **Progressive Commitment** | Hỏi tiền sau khi trust đã có |
| 2 | **Education = Product** | Inline, không phải help docs |
| 3 | **Abstract → Concrete** | Jargon ra, plain language vào |
| 4 | **Design for Waiting** | Mỗi waiting state cần reassurance riêng |
| 5 | **1 screen = 1 job** | Không ôm nhiều quyết định vào 1 màn |

---

## Jargon → Plain Language

| Jargon | Plain language |
|---|---|
| Token | 1 phần nhỏ của căn hộ này |
| Blockchain | Hợp đồng không thể sửa xóa |
| NAV | Giá trị hiện tại của phần bạn nắm |
| Settlement | Ngày bạn nhận token vào ví |
| SPV | Công ty lập riêng để nắm BĐS này |
| Escrow | Ngân hàng giữ tiền, không vào tay chủ đầu tư |

---

*Polaris · First Principles · RWA Investment Platform · Feb 2026*
