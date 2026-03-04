# First Principles — RWA Investment Platform
> Polaris · Ngày viết: 2026-02-28

---

## Bắt đầu từ câu hỏi cốt lõi

> "Tại sao người dùng **KHÔNG** đầu tư vào một thứ họ chưa bao giờ nghe đến, trên một platform mới, với tiền thật?"

Đây là vấn đề thực sự. Không phải UI. Không phải flow.
Đây là **trust gap + knowledge gap + behavior gap** cùng lúc.

---

## Layer 1 — Director View (Business Logic)

Platform này có 3 mục tiêu song song, thường **mâu thuẫn** nhau:

| Mục tiêu | Biểu hiện UX | Risk |
|---|---|---|
| Huy động vốn nhanh | Urgency, FOMO, conversion | Mis-sold users → trust collapse |
| Protect investor | Education, risk disclosure, slow down | Conversion chậm → business không survive |
| Regulatory safe | Compliance, KYC, documentation | Friction → drop-off |

**Tension chính:** Nhanh vs. An toàn.

**First principle answer:** Ưu tiên **informed confidence**, không phải FOMO.
Người dùng hiểu cái họ mua → hold lâu dài, re-invest, refer bạn bè.
Người dùng không hiểu → churn, complain, refund request.

---

## Layer 2+3 — User State Map

Mỗi screen phải xác định được: *user biết gì* + *user đang cảm thấy gì* — hai thứ này quyết định design của screen đó.

| Phase | Awareness | Câu user đang nghĩ | Cảm xúc thật | Design phải làm gì |
|---|---|---|---|---|
| DISC | Level 2–3 | "BĐS vốn nhỏ? Nghe hay đó..." | Tò mò → Hứng khởi → "Quá tốt để là thật?" | Hook bằng concrete number, không pitch sản phẩm |
| ONBO | Level 3–4 | "OK nhưng mình có đủ điều kiện không?" | Tính toán → Uncertainty → "Mình có hiểu cái này không?" | KYC = Unlock, không phải Form |
| PREO | Level 4 | "Cái này hoạt động thế nào?" | Muốn hiểu → Lo ngại rủi ro | Education inline, calculator, abstract → concrete |
| TOKO | Level 4–5 | "Mua bao nhiêu? Lỡ sai thì sao?" | FOMO → **Hesitant** → Do dự → Commit | ⚠️ Điểm cần design kỹ nhất |
| OSET | Level 5 | "Tiền đã chuyển rồi, giờ sao?" | Anxious waiting → Relief hoặc Disappointment | Transparent waiting state, progress rõ |
| MNTR | Level 5 | "Token của mình đang thế nào?" | Pride (ngắn) → Anxiety → Boredom | Portfolio dashboard, reassurance, re-invest hook |

**Hầu hết users vào app ở Level 2–3** — Home screen không phải "danh sách campaign để mua", mà là cầu nối từ curiosity đến conviction.

### 3 cảm xúc nguy hiểm nhất — phải neutralize ở mọi phase

| Anxiety | User nghĩ | Design response |
|---|---|---|
| Legitimacy | "Đây có phải lừa đảo không?" | VinGroup anchor, legal docs visible, regulatory badge |
| Liquidity | "Tôi có lấy lại tiền được không?" | Secondary market info, lock period rõ từ đầu |
| Comprehension | "Tôi không hiểu tôi đang ký cái gì" | Inline tooltips, plain language, zero jargon |

**Nếu design không address 3 cái này → không có conversion.**

---

## Layer 4 — Trust Architecture

Trust không phải là 1 thứ — là **5 layer xây dần**:

| Layer | Tên | Cơ chế |
|---|---|---|
| 1 | Brand anchor | VinGroup logo = "uy tín quen thuộc" |
| 2 | Transparency | Hiển thị đầy đủ thông tin asset, không giấu số xấu |
| 3 | Process clarity | Mỗi bước có timeline, không có black box |
| 4 | Risk honesty | Nói rõ rủi ro — KHÔNG giấu — giấu = mất trust sau |
| 5 | Social proof | "X người đã whitelist", progress bar campaign |

### Counter-intuitive insight về KYC

> KYC là friction NHƯNG build trust.
> Nó signals: "Platform này nghiêm túc, không phải scam."
> Design KYC như **"Unlock Investor Account"** — không phải "Form cần fill."

### Trust Equation

```
Trust = (Competence × Benevolence) / Perceived Risk
```

- **Competence** = "Platform biết mình đang làm gì"
- **Benevolence** = "Platform quan tâm đến lợi ích của tôi"
- **Risk** = Downside user nhìn thấy

Tăng trust = tăng Competence + Benevolence + **GIẢM perceived risk**
(không phải giấu risk thật — đó là fraud)

---

## Layer 5 — Flow Philosophy

5 nguyên tắc dẫn dắt toàn bộ journey:

### 1. Progressive Commitment

Không bao giờ hỏi tiền trước khi trust được build.

```
Explore → Learn → Calculate → Whitelist → Commit → Pay
```

Mỗi bước yêu cầu commitment lớn hơn bước trước.

### 2. Education as Part of the Product

Không phải "help docs" — là **inline trong mỗi screen**.
Mỗi term phức tạp cần `?` tooltip ngay tại chỗ.
User không invest thứ họ không hiểu.

### 3. Make Abstract → Concrete

| Jargon | Plain language |
|---|---|
| Token | "1 phần nhỏ của căn hộ này" |
| Blockchain | "Hợp đồng không thể sửa xóa" |
| NAV | "Giá trị hiện tại của phần bạn nắm" |
| Settlement | "Ngày bạn nhận token vào ví" |
| SPV | "Công ty được lập riêng để nắm BĐS này" |

### 4. Design for Waiting

Đây là investment, không phải mua hàng online.
Campaign chạy nhiều tuần. Settlement mất ngày.

Mỗi "waiting state" cần màn hình riêng — reassurance, progress, timeline rõ ràng.
**Không được để user cảm giác "tiền biến đi, không biết chuyện gì đang xảy ra."**

### 5. Respect Cognitive Load

User đang học một paradigm mới. Không dump hết info một lúc.
**Mỗi screen chỉ có 1 job. 1 quyết định.**

---

## Master Journey Flow

```
App entry
    ↓
Discovery (curiosity hook)
    ↓
KYC (Unlock Investor Account)
    ↓
Discovery + Exploration
    (build conviction)
    ↓
Calculator + Simulation
    (reduce risk anxiety)
    ↓
Whitelist / Commit
    (progressive buy-in)
    ↓
Payment / Auth
    ↓
Transparent Waiting State
    ↓
Token Receipt + Portfolio
    (reinforce good decision)
```

---

## One Sentence Design Direction

> **"Build informed confidence, not FOMO-driven conversion"**
> — because an investor who understands what they bought will hold, re-invest, and refer.
> An investor who didn't will churn, complain, and ask for refunds.

---

## Next Steps — Phase Deep Dives

Từ framework này, đi vào từng phase:

| Phase | Priority | Lý do |
|---|---|---|
| **ONBO** | 🔴 First | Gate — conviction được build ở đây |
| DISC | 🟡 Second | Entry point — hook user |
| TOKO | 🟡 Second | Highest anxiety — cần design kỹ |
| OSET | 🟢 Third | Waiting state design |
| MNTR | 🟢 Third | Retention + re-investment loop |

> Suggested: bắt đầu từ **ONBO** — đây là gate quan trọng nhất.
