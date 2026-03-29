"use client"

import * as React from "react"

/* ═══════════════════════════════════════════════════════════════════════════
 * VSP App — Phân tích Information Architecture 2026
 * 1 cấu trúc · 3 phases · Reasoning-driven · KHHĐ-based
 * ═══════════════════════════════════════════════════════════════════════════ */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-[18px] font-bold text-foreground pt-[48px] pb-[4px] border-b border-border mb-[16px]">{children}</h2>
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[15px] font-bold text-foreground mt-[28px] mb-[8px]">{children}</h3>
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-foreground-secondary leading-[1.8] mb-[14px]">{children}</p>
}
function Q({ children }: { children: React.ReactNode }) {
  return <blockquote className="border-l-[3px] border-border pl-[16px] py-[8px] my-[14px] text-[14px] text-foreground-secondary italic">{children}</blockquote>
}
function Mono({ children }: { children: React.ReactNode }) {
  return <pre className="bg-secondary rounded-[12px] p-[16px] my-[14px] text-[12px] font-mono text-foreground leading-[1.8] whitespace-pre-wrap overflow-x-auto">{children}</pre>
}
function IA({ indent = 0, children, tag }: { indent?: number; children: React.ReactNode; tag?: string }) {
  return <div style={{ marginLeft: indent * 24 }} className="my-[3px]"><span className={`inline-block px-[10px] py-[3px] rounded-[6px] text-[12px] font-semibold ${indent === 0 ? "bg-foreground text-background" : indent === 1 ? "bg-foreground/80 text-background" : indent === 2 ? "bg-secondary text-foreground" : "bg-background border border-border text-foreground-secondary font-normal"}`}>{children}</span>{tag && <span className="ml-[6px] text-[10px] text-foreground-secondary">{tag}</span>}</div>
}

function LofiFrame({ label, src }: { label: string; src: string }) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ fontFamily: "-apple-system, sans-serif" }}>
      <p className="text-[12px] font-bold text-foreground mb-[6px]">{label}</p>
      <div className="w-[195px] h-[422px] rounded-[24px] border-[2px] border-border bg-background overflow-hidden">
        <iframe src={src} className="w-[390px] h-[844px] border-none" style={{ transform: "scale(0.5)", transformOrigin: "top left" }} />
      </div>
    </div>
  )
}

export default function IAAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[720px] mx-auto px-[22px] py-[48px] text-foreground" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

        <h1 className="text-[24px] font-bold mb-[4px]" style={{ fontFamily: "-apple-system, sans-serif" }}>Phân tích Information Architecture — V-Smart Pay 2026</h1>
        <p className="text-[13px] text-foreground-secondary mb-[40px]" style={{ fontFamily: "-apple-system, sans-serif" }}>Vi — Design Lead · 21/03/2026 · KHHĐ Fintech 2026 · Production v1.0.6</p>

        <nav className="bg-secondary rounded-[12px] p-[16px] mb-[8px]" style={{ fontFamily: "-apple-system, sans-serif" }}>
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wider mb-[8px]">Mục lục</p>
          {[
            "1. Triết lý thiết kế",
            "2. User & Mental Model",
            "3. Phân tích 5 tabs hiện tại",
            "4. ~50 features mới — group theo mental model",
            "5. Cấu trúc đề xuất — 3 phases",
            "6. Phase 1: 30/4 — Thanh toán",
            "7. Phase 2: Q3 — Tài chính",
            "8. Phase 3: Q4 — Ưu đãi",
            "9. Home — Widget architecture",
            "10. Metrics framework",
            "11. Chiến lược triển khai",
          ].map((s, i) => (
            <a key={i} href={`#s${i + 1}`} className="block text-[13px] text-foreground py-[2px] hover:underline">{s}</a>
          ))}
        </nav>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s1">1. Triết lý thiết kế</H2>

<H3>Financial OS</H3>

<P>VSP không phải ví điện tử (quá nhỏ), không phải super app (quá hype), không phải ngân hàng số (quá regulated). VSP là <strong>hệ điều hành tài chính</strong> — nơi mọi hoạt động tiền bạc trong đời sống VN chạy qua: trả tiền điện, chuyển cho bạn, mua BH xe, đầu tư BĐS, nhận cashback VinPearl.</P>

<P>OS = nền tảng, không phải app đơn lẻ. OS = modular — thêm module mà không redesign core. OS = user controls — user chọn hiện gì, dùng gì, bỏ qua gì.</P>

<H3>5 nguyên tắc</H3>

<ol className="list-decimal list-outside ml-[24px] text-[14px] text-foreground-secondary leading-[1.8] mb-[14px] space-y-[8px]">
  <li><strong className="text-foreground">Modular, không monolith.</strong> Mỗi tab = 1 module độc lập. Thêm/bỏ module không ảnh hưởng core. Module mới xuất hiện khi đủ weight (products ready + user need proven). Không tạo tab trống.</li>
  <li><strong className="text-foreground">User là admin.</strong> Home = desktop, user chọn widgets. Không phải billboard quảng cáo. Mỗi tính năng xuất hiện qua hành vi — show sinh lời widget khi balance &gt; 5M liên tục 3 ngày. Vingroup ecosystem data = chìa khoá mở.</li>
  <li><strong className="text-foreground">Mỗi module, 1 job.</strong> Thanh toán = trả tiền. Tài chính = grow. Ưu đãi = save. Nếu 1 module làm 2 việc → tách. Home show STATUS, tab enable ACTION — không duplicate.</li>
  <li><strong className="text-foreground">Backward compatible.</strong> Đổi nav không bao giờ tăng tap count cho action cũ. Chuyển tiền từ tab → Home quick action = vẫn 1 tap. Lịch sử GD từ tab → Home wallet area = vẫn 1 tap.</li>
  <li><strong className="text-foreground">Tiền của user, quyền của user.</strong> Settings/bảo mật luôn findable trong ≤2 taps. Balance luôn visible. Lịch sử GD luôn accessible. App tài chính mà giấu controls = mất trust.</li>
</ol>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s2">2. User & Mental Model</H2>

<H3>Hai personas</H3>

<P><strong>HST persona</strong> — cư dân Vinhomes, chủ xe VinFast, KH VinPearl. Dùng VSP vì ecosystem. Jobs: thanh toán dịch vụ tập đoàn, mua BH xe, đầu tư BĐS Vinhomes. AUM potential cao — đã trust Vingroup với tài sản lớn (nhà, xe).</P>

<P><strong>General persona</strong> — user phổ thông VN, đang dùng MoMo/ZaloPay. Jobs: chuyển tiền, thanh toán HĐ, nạp ĐT. Kỳ vọng: nhanh, quen, không phải học lại.</P>

<H3>Mental model: 3 modes</H3>

<P>User nghĩ về tiền theo 3 mode. Không ai trộn lẫn:</P>

<ol className="list-decimal list-outside ml-[24px] text-[14px] text-foreground-secondary leading-[1.8] mb-[14px] space-y-[4px]">
  <li><strong className="text-foreground">"Tiền di chuyển"</strong> — nạp, rút, chuyển, nhận. Tiền đi vào/ra ví. Quick actions, 1-2 tap xong. <em>→ Home quick actions</em></li>
  <li><strong className="text-foreground">"Tiền trả cho ai đó"</strong> — hóa đơn, dịch vụ, vé, HST. Cần chọn NCC, nhập mã, xem bill. Flow dài hơn. <em>→ Tab Thanh toán</em></li>
  <li><strong className="text-foreground">"Tiền sinh ra tiền / bảo vệ tài sản"</strong> — sinh lời, đầu tư, BH, tín dụng. Mindset khác hoàn toàn: không phải "trả" mà là "giữ/tăng". <em>→ Tab Tài chính</em></li>
</ol>

<Q>User than phiền chuyển tiền khó tìm → vì nó là action (mode 1) nhưng bị gán vào tab riêng. Giải pháp: đưa lên Home quick actions cạnh Nạp/Rút — cùng mode, cùng chỗ.</Q>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s3">3. Phân tích 5 tabs hiện tại</H2>

<Mono>{`v1.0.6: Trang chủ — Chuyển tiền — QR — Giao dịch — Tài khoản`}</Mono>

<P><strong>Trang chủ</strong> — gateway. Wallet card, quick actions, GD gần đây. Giữ. Cần evolve thành widget-based.</P>

<P><strong>Chuyển tiền</strong> — 1 action chiếm 1 tab. Nạp/Rút/Nhận = icons trên Home, tại sao Chuyển tiền được tab riêng? Inconsistent. User cũng kêu khó tìm vì mental model sai — chuyển tiền là action gần ví (mode 1), không phải destination (mode 2). <strong>→ Giải phóng slot. Chuyển tiền lên Home quick actions.</strong></P>

<P><strong>QR</strong> — center tab, quét mã + mã nhận tiền. Standard. Giữ.</P>

<P><strong>Giao dịch</strong> — lịch sử GD. User VN check thường xuyên. Giữ ở 30/4. Nhưng về lâu dài, lịch sử GD thuộc context ví — có thể merge vào Home wallet area khi cần slot cho tab mới. <strong>→ Giữ tạm, merge Q3.</strong></P>

<P><strong>Tài khoản</strong> — profile, liên kết NH, bảo mật. User mở 1 tháng/lần. Không xứng 1 tab khi có product lines cần slot hơn. Cash App giải quyết bằng avatar góc phải. <strong>→ Giữ tạm, move Q4.</strong></P>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s4">4. ~50 features mới — group theo mental model</H2>

<H3>Group A: "Tiền trả cho ai đó" — Thanh toán</H3>
<P>User trả tiền cho NCC/dịch vụ. Cần chọn loại dịch vụ, nhập mã KH, xem hóa đơn. Flow dài hơn quick actions.</P>

<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]" style={{ fontFamily: "-apple-system, sans-serif" }}>
  <div className="grid grid-cols-2 gap-x-[16px] gap-y-[4px] text-[12px] text-foreground-secondary">
    <span>Hóa đơn: điện, nước, net, data</span><span>Nạp ĐT, mua thẻ</span>
    <span>Học phí</span><span>Vé xem phim, vé xe/tàu</span>
    <span>Thanh toán tài chính (khoản vay)</span><span>Saved billers + Auto-pay</span>
    <span>HST: XanhSM, VHR, VinPearl, VinFast</span><span>HST: Vinschool, VinUni, Vincom, VinClub...</span>
  </div>
  <p className="text-[11px] text-foreground-secondary mt-[8px]">~20 loại dịch vụ · T2 → T11/2026 · Đủ content cho 1 tab ngay 30/4</p>
</div>

<H3>Group B: "Tiền sinh ra tiền" — Tài chính</H3>
<P>Sản phẩm tài chính. Mindset khác: không phải "trả" mà là "giữ/tăng/bảo vệ".</P>

<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]" style={{ fontFamily: "-apple-system, sans-serif" }}>
  <div className="space-y-[4px] text-[12px] text-foreground-secondary">
    <p>Sinh lời tự động — 4 flows <span className="text-foreground-secondary">(30/6)</span></p>
    <p>Chứng chỉ quỹ — 5 flows <span className="text-foreground-secondary">(30/9)</span></p>
    <p>BĐS mã hoá — 8 flows <span className="text-foreground-secondary">(30/4 basic → 4/12 full)</span></p>
    <p>Bảo hiểm — xe máy, ô tô, du lịch, sức khỏe <span className="text-foreground-secondary">(20/4 → 30/6)</span></p>
    <p>BNPL + Vay trả góp VinFast <span className="text-foreground-secondary">(31/5 → 30/9)</span></p>
  </div>
  <p className="text-[11px] text-foreground-secondary mt-[8px]">6 product lines · ~25 flows · 30/4 mới có BH + BĐS → chưa đủ thành tab. Q3 mới đủ.</p>
</div>

<H3>Group C: "Tiết kiệm khi chi tiêu" — Ưu đãi</H3>
<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]" style={{ fontFamily: "-apple-system, sans-serif" }}>
  <div className="space-y-[4px] text-[12px] text-foreground-secondary">
    <p>Voucher & ưu đãi <span className="text-foreground-secondary">(30/4)</span></p>
    <p>V-Point — tích + dùng điểm <span className="text-foreground-secondary">(30/9)</span></p>
    <p>HST deals: VinPearl, XanhSM, Vinhomes cashback</p>
    <p>Giới thiệu KH mới (referral rewards) <span className="text-foreground-secondary">(31/3)</span></p>
  </div>
  <p className="text-[11px] text-foreground-secondary mt-[8px]">30/4 chỉ có voucher basic. V-Point = 30/9. Chưa đủ thành tab → Q4.</p>
</div>

<Q><strong>Quyết định then chốt:</strong> Mỗi group trở thành 1 tab KHI ĐỦ WEIGHT — đủ content, đủ features, đủ product readiness. Không tạo tab trống chờ fill. Thanh toán đủ ngay 30/4. Tài chính đủ ở Q3. Ưu đãi đủ ở Q4.</Q>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s5">5. Cấu trúc đề xuất — 3 phases</H2>

<Mono>{`Phase 1 (30/4):   Trang chủ — Thanh toán — QR — Giao dịch — Tài khoản
                  CT → TT. Chuyển tiền lên Home quick actions.
                  SL + BH = cards trên Home (chưa đủ thành tab).

Phase 2 (Q3):     Trang chủ — Thanh toán — QR — Tài chính — Tài khoản
                  GD → TC. GD merge vào Home wallet area.
                  SL + BĐS + BH + CCQ + BNPL = đủ weight cho tab.

Phase 3 (Q4):     Trang chủ — Thanh toán — QR — Tài chính — Ưu đãi
                  TK → ƯĐ. TK lên avatar góc phải (Cash App).
                  V-Point + Voucher + HST deals = đủ cho tab.`}</Mono>

<P><strong>Mỗi phase đổi đúng 1 tab.</strong> User adapt dần. App chưa mass launch nên acceptable. Mỗi tab mới có đủ content ngày ship — không bao giờ trống.</P>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s6">6. Phase 1: 30/4 — Tab Thanh toán</H2>

<H3>Tại sao cần tab Thanh toán ở 30/4?</H3>

<P>KHHĐ ship ~20 loại dịch vụ thanh toán trước 30/4: VAS (điện/nước/net), HST PnL (XanhSM, VHR, VinPearl, VinFast), saved billers, voucher. Hiện tại tất cả chôn trong 1 banner trên Home + 1 sub-page basic. Không đủ chỗ cho ~20 dịch vụ.</P>

<P>Đồng thời, tab Chuyển tiền đang lãng phí slot. User kêu chuyển tiền khó tìm — giải pháp: đưa Chuyển tiền lên Home quick actions (cạnh Nạp/Rút = cùng mode), giải phóng slot cho Thanh toán.</P>

<H3>Home — Phase 1</H3>
<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]">
  <IA indent={0}>🏠 Trang chủ</IA>
  <IA indent={1}>Wallet Card (balance, ẩn/hiện)</IA>
  <IA indent={1} tag="thêm Chuyển tiền">Quick Actions: Nạp · Rút · Chuyển · Nhận</IA>
  <IA indent={1} tag="chưa đủ thành tab, nằm Home">Sinh lời Card (teaser → sub-page)</IA>
  <IA indent={1} tag="20/4, chưa đủ thành tab">BH xe máy/ô tô Card (teaser → sub-page)</IA>
  <IA indent={1}>GD gần đây (3 items + "Xem tất cả" → tab GD)</IA>
</div>

<H3>Tab Thanh toán — Phase 1</H3>
<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]">
  <IA indent={0}>💳 Thanh toán</IA>
  <IA indent={1}>Hóa đơn tiện ích</IA>
  <IA indent={2} tag="30/4">Điện · Nước · Internet · Nạp ĐT · Mua thẻ</IA>
  <IA indent={2} tag="22/5">Data · Thanh toán tài chính (khoản vay)</IA>
  <IA indent={2} tag="30/6">Học phí · Vé xem phim</IA>
  <IA indent={1} tag="phased T3→T8">Hệ sinh thái Vingroup</IA>
  <IA indent={2} tag="31/3">XanhSM</IA>
  <IA indent={2} tag="30/4">VHR · VinPearl · VinFast</IA>
  <IA indent={2} tag="30/6">Vinschool · VinUni · Vincom</IA>
  <IA indent={2} tag="31/8">VinClub · V-Green · VinMec</IA>
  <IA indent={1} tag="20/4">Saved billers (hóa đơn đã thanh toán)</IA>
  <IA indent={1} tag="30/6">Auto-pay & nhắc lịch</IA>
</div>

<P><strong>Tại sao không gộp Chuyển tiền P2P vào tab Thanh toán?</strong> Vì mental model khác. Chuyển tiền cho bạn = "tiền di chuyển" (mode 1). Trả hóa đơn điện = "trả cho dịch vụ" (mode 2). User mở tab Thanh toán với intent "trả bill" — thấy "Chuyển tiền ví VSP / Ngân hàng" sẽ confuse. Giữ tách.</P>

<H3>Lofi — Phase 1 (30/4)</H3>
<div className="flex gap-[16px] overflow-x-auto my-[14px]">
  <LofiFrame label="Home" src="/architecture/lofi-p1" />
  <LofiFrame label="Tab Thanh toán" src="/architecture/lofi-p1-tt" />
</div>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s7">7. Phase 2: Q3 — Tab Tài chính</H2>

<H3>Tại sao Q3, không phải 30/4?</H3>

<P>30/4 chỉ có BH xe (2 loại) + BĐS basic + Sinh lời basic — 2-3 sản phẩm. Chưa đủ thành "Trung tâm Tài chính". Nằm trên Home cards = hợp lý hơn.</P>

<P>Q3 mới có đủ weight: Sinh lời full (30/6), BH 4 loại (30/6), BĐS trao đổi/quy đổi (17/7), CCQ (30/9), BNPL (30/9). 6 product lines, ~25 flows. Xứng đáng tab riêng.</P>

<H3>Tab Tài chính = Financial Hub</H3>
<P>Không chỉ list cards — là trung tâm tài chính với portfolio overview.</P>

<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]">
  <IA indent={0}>💰 Tài chính</IA>
  <IA indent={1}>Tổng tài sản (overview: ví + sinh lời + đầu tư)</IA>
  <IA indent={1} tag="30/6">Sinh lời tự động</IA>
  <IA indent={2}>Kích hoạt · Nạp/Rút · Dashboard · Lịch sử · Huỷ</IA>
  <IA indent={1} tag="30/4 basic → 4/12 full">Đầu tư BĐS mã hoá</IA>
  <IA indent={2}>Dự án · Chi tiết · Đặt mua · Settlement</IA>
  <IA indent={2} tag="17/7">Trao đổi · Quy đổi BĐS thật</IA>
  <IA indent={2} tag="4/12">CEX · Thanh khoản</IA>
  <IA indent={1} tag="20/4 → 30/6">Bảo hiểm</IA>
  <IA indent={2}>Xe máy TNDS · Ô tô TNDS · Du lịch · Sức khỏe</IA>
  <IA indent={2}>Mua · Quản lý hợp đồng</IA>
  <IA indent={1} tag="30/9">Chứng chỉ quỹ (CCQ)</IA>
  <IA indent={2}>Mở TK · Mua · Bán · Portfolio · Hồ sơ</IA>
  <IA indent={1} tag="30/9">Ví trả sau (BNPL)</IA>
  <IA indent={2}>Đăng ký · Thanh toán · Quản lý dư nợ</IA>
  <IA indent={1} tag="31/5">Vay trả góp xe VinFast</IA>
</div>

<H3>Giao dịch merge vào đâu?</H3>
<P>Lịch sử GD nằm trong wallet area trên Home. Tap Wallet Card hoặc "Xem tất cả" → full history với filter. Logic: lịch sử là context của ví, không phải 1 destination độc lập. User tap wallet → thấy tiền mình đi đâu.</P>

<H3>Business metric: AUM</H3>
<P>Tab Tài chính phục vụ AUM (Assets Under Management). Tab riêng = user thấy financial products mỗi lần mở → deposit nhiều hơn. Revolut Wealth tab → AUM tăng mạnh. ZaloPay chôn grid → AUM thấp. Đây là revenue driver lâu dài — payments acquires users, finance monetizes them.</P>

<H3>Lofi — Phase 2 (Q3)</H3>
<div className="flex gap-[16px] overflow-x-auto my-[14px]">
  <LofiFrame label="Tab Tài chính" src="/architecture/lofi-p2-tc" />
</div>
<P><em>Home Phase 2: Wallet Card tap → lịch sử GD (thay tab GD). Widget zone: status cards (SL, BH) → tap → tab Tài chính. Promo zone: 1 card max, dismissible.</em></P>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s8">8. Phase 3: Q4 — Tab Ưu đãi</H2>

<H3>Tại sao Q4?</H3>

<P>V-Point ship 30/9. Voucher basic có từ 30/4 nhưng chưa đủ thành tab. Q4 có: V-Point (tích + dùng), Voucher, HST deals (VinPearl, XanhSM, Vinhomes cashback), referral rewards, partner commissions. Đủ content.</P>

<H3>Tài khoản đi đâu?</H3>
<P>Lên avatar góc phải trên Home (Cash App pattern). Tap avatar → Profile, Liên kết NH, Bảo mật, Cài đặt, Hỗ trợ. User mở settings 1 tháng/lần — không xứng chiếm 1 tab khi có Ưu đãi cần slot hơn.</P>

<P><strong>Risk:</strong> User VN chưa quen avatar pattern. Feature flag per segment trước. Fix forward nếu có issue.</P>

<div className="bg-secondary rounded-[12px] p-[16px] my-[14px]">
  <IA indent={0}>🎁 Ưu đãi</IA>
  <IA indent={1} tag="30/9">V-Point (tích điểm, xem lịch sử, đổi quà)</IA>
  <IA indent={1} tag="30/4">Voucher & khuyến mãi</IA>
  <IA indent={1}>HST deals (VinPearl, XanhSM, Vinhomes...)</IA>
  <IA indent={1} tag="31/3">Giới thiệu KH mới (referral rewards)</IA>
  <IA indent={1}>Cashback history</IA>
</div>

<P><strong>Business metric: MAU retention + partner revenue.</strong> Ưu đãi = lý do user mở app hàng ngày dù không cần thanh toán. MoMo/ZaloPay đều có tab Ưu đãi — proven MAU driver. Revenue từ partner commission (3-8% per deal) + V-Point float (15-20% breakage rate).</P>

<H3>Lofi — Phase 3 (Q4)</H3>
<div className="flex gap-[16px] overflow-x-auto my-[14px]">
  <LofiFrame label="Tab Ưu đãi" src="/architecture/lofi-p3-ud" />
</div>
<P><em>Home Phase 3: Tài khoản → avatar góc phải. Widget zone mature: SL + BH status cards. Promo 1 card max, contextual, dismissible.</em></P>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s9">9. Home — Widget Architecture</H2>

<H3>Nguyên tắc 70/30</H3>
<P>70% above-the-fold = utility (balance, quick actions, GD gần đây). 30% max = product promo (contextual, dismissible).</P>

<P>MoMo = cautionary tale: Home 70% promo → banner blindness → engagement drop 40% trong 2023-2024. VSP không lặp lại.</P>

<H3>Widget zone</H3>
<Mono>{`Home Layout:
┌─────────────────────────────┐
│ Balance + Hide/Show         │  ← fixed, never displaced
│ Quick Actions (4 icons)     │  ← user có thể reorder
├─────────────────────────────┤
│ UTILITY ZONE (70%)          │
│ • GD gần đây (3 items)     │  ← always present
│ • Upcoming bills (nếu có)  │  ← contextual
│ • SL/BH status (nếu active)│  ← contextual
├─────────────────────────────┤
│ SMART PROMO (30%)           │
│ • 1 card max, dismissible   │  ← contextual, behavioral trigger
│ • "Khám phá thêm" link     │  ← escape hatch → tab tương ứng
└─────────────────────────────┘`}</Mono>

<H3>Rules</H3>
<ol className="list-decimal list-outside ml-[24px] text-[14px] text-foreground-secondary leading-[1.8] mb-[14px] space-y-[4px]">
  <li>Max 1 promo card visible without scroll. Không bao giờ stack promos.</li>
  <li>Mọi promo card có nút dismiss. Dismiss = gone 30 ngày.</li>
  <li>Promos phải contextual: không push BH cho user vừa mua BH. Dùng behavioral triggers.</li>
  <li>User dismiss 3 promos liên tiếp → pause promos 2 tuần. Respect the signal.</li>
  <li>Widget CTR dưới 2% → algorithm đang fail, cần điều chỉnh.</li>
</ol>

<H3>Home widget show STATUS, tab enable ACTION</H3>
<Mono>{`Home Widget (teaser):              Tab Tài chính (full):
┌────────────────────┐             ┌──────────────────────────┐
│ 💰 Sinh Lời        │             │ Tổng tài sản: 125.3M    │
│ 12.5M · +45K hôm nay│    tap →   │ Tiết kiệm   12.5M +45K │
│ [Xem chi tiết →]   │             │ Quỹ đầu tư  50.0M +120K│
└────────────────────┘             │ Bảo hiểm    2 hợp đồng  │
                                   │ [+ Khám phá sản phẩm]   │
                                   └──────────────────────────┘`}</Mono>

<P>Widget = glance. Tab = action (nạp, rút, mua, bán). Không bao giờ cho user thực hiện giao dịch từ Home widget — luôn route đến tab.</P>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s10">10. Metrics framework</H2>

<H3>North Star: MATU (Monthly Active Transacting Users)</H3>
<P>Không phải MAU (vanity — MoMo 31M MAU nhưng nhiều user mở app cho game/promo). Không phải TPV (whale-skewed). MATU = unique users hoàn thành ≥1 giao dịch có value/tháng. Đo product-market fit thật.</P>

<div className="overflow-x-auto">
  <table className="w-full text-[12px] border-collapse my-[12px]" style={{ fontFamily: "-apple-system, sans-serif" }}>
    <thead><tr className="border-b-2 border-foreground">
      <th className="text-left p-[8px] text-[10px] uppercase font-bold">Tab</th>
      <th className="text-left p-[8px] text-[10px] uppercase font-bold">Revenue driver</th>
      <th className="text-left p-[8px] text-[10px] uppercase font-bold">Metric</th>
      <th className="text-left p-[8px] text-[10px] uppercase font-bold">Target</th>
    </tr></thead>
    <tbody className="text-foreground-secondary">
      <tr className="border-b border-border"><td className="p-[8px] font-semibold text-foreground">Home</td><td className="p-[8px]">Cross-sell (distribution channel)</td><td className="p-[8px]">Widget Tap-Through Rate</td><td className="p-[8px]">&gt;15% sessions</td></tr>
      <tr className="border-b border-border"><td className="p-[8px] font-semibold text-foreground">Thanh toán</td><td className="p-[8px]">Transaction fees + VAS margins</td><td className="p-[8px]">Transactions/User/Month</td><td className="p-[8px]">4+ GD/user/tháng</td></tr>
      <tr className="border-b border-border"><td className="p-[8px] font-semibold text-foreground">Tài chính</td><td className="p-[8px]">AUM fees + BH premium + BNPL interest</td><td className="p-[8px]">AUM growth rate (MoM)</td><td className="p-[8px]">20% MoM 6 tháng đầu</td></tr>
      <tr className="border-b border-border"><td className="p-[8px] font-semibold text-foreground">Ưu đãi</td><td className="p-[8px]">Partner commission + V-Point float</td><td className="p-[8px]">Revenue/Active User</td><td className="p-[8px]">50K/user/tháng</td></tr>
    </tbody>
  </table>
</div>

<H3>Revenue trajectory</H3>
<Mono>{`2026 H1:  95% Payments (transaction fees = immediate revenue)
2026 H2:  70% Payments / 25% Finance / 5% Deals
2027 H1:  50% Payments / 35% Finance / 15% Deals
2027 H2:  40% Payments / 40% Finance / 20% Deals

→ Finance overtakes Payments cuối 2027 (Revolut trajectory)
   Payments acquires users, Finance monetizes them.`}</Mono>

{/* ══════════════════════════════════════════════════════════════ */}
<H2 id="s11">11. Chiến lược triển khai — Soft Launch & Graduate</H2>

<P>App chưa mass launch = toàn early adopters, forgiving. Không cần infrastructure rollback nặng nề. Chiến lược: <strong>tấn công thông minh, không phòng thủ.</strong></P>

<H3>Nguyên tắc: Roll forward, không rollback</H3>

<P>Đổi tab → nếu có issue → fix forward (thêm tooltip, adjust layout). Không revert. Revert gây confuse hơn giữ nguyên — user vừa học cái mới lại bị quay về cái cũ.</P>

<H3>3 chiến thuật</H3>

<ol className="list-decimal list-outside ml-[24px] text-[14px] text-foreground-secondary leading-[1.8] mb-[14px] space-y-[8px]">
  <li>
    <strong className="text-foreground">Feature flag per segment.</strong> Nav mới ship cho Vingroup employees trước (2-4 tuần) → Vinhomes residents → general users. Test trên segment gần nhất, loyal nhất — họ cho feedback chất lượng hơn random A/B. Khi segment 1 stable → mở segment 2.
  </li>
  <li>
    <strong className="text-foreground">Behavioral graduation cho Phase 2 (GD → Tài chính).</strong> Không ship cùng lúc cho tất cả. User đã dùng Sinh lời / BH / BĐS → thấy tab Tài chính (đã có lý do mở). User chưa dùng sản phẩm tài chính → vẫn thấy tab Giao dịch. Khi 80% users đã graduate → xoá tab GD cho tất cả. Nav change = formalization hành vi đã có, không phải ép đổi.
  </li>
  <li>
    <strong className="text-foreground">"Cái mới" badge, không onboarding flow.</strong> Tab mới = dot indicator + first-tap tooltip 1 dòng. Không coach marks, không guided tour, không video. User VN skip hết (MoMo/ZaloPay: onboarding completion &lt;15%). Nếu user tap vị trí tab cũ &gt;3 lần/session → surface tooltip: "Tìm [feature] tại đây ↗".
  </li>
</ol>

<H3>1 metric duy nhất</H3>

<P><strong>Core Task Completion Rate</strong> — % users hoàn thành chuyển tiền + thanh toán. Drop &gt;10% trong 7 ngày → investigate, fix forward. Mọi metric khác (session depth, time in app) = noise ở giai đoạn pre-launch.</P>

<P>Không cần bảng kill metrics 5 dòng. 1 metric, 1 threshold, 1 action. Simple.</P>

        <div className="text-[11px] text-foreground-secondary mt-[48px] pt-[12px] border-t border-border text-center" style={{ fontFamily: "-apple-system, sans-serif" }}>
          V-Smart Pay — Phân tích IA 2026<br />
          Vi — Design Lead · 21/03/2026<br />
          Sources: KHHĐ Fintech 2026 · Production v1.0.6 · Revolut / Monzo / ZaloPay / Cash App
        </div>

      </div>
    </div>
  )
}
