// @ts-nocheck
"use client"
import { useState, useEffect } from "react";

var services = [
  { id:"dien",     label:"Điện",     icon:"⚡" },
  { id:"nuoc",     label:"Nước",     icon:"💧" },
  { id:"internet", label:"Internet", icon:"📶" },
  { id:"taichinh", label:"Tài chính",icon:"💰" },
  { id:"topup",    label:"Nạp tiền", icon:"📲" },
  { id:"buycard",  label:"Mua thẻ",  icon:"🎴" },
  { id:"data",     label:"Mua data", icon:"📡" },
];

var providerMap = {
  nuoc: [
    { id:"n1", name:"Công Ty Cổ phần Cấp Thoát nước – Công Trình Đô Thị Hậu Giang" },
    { id:"n2", name:"Công ty Cổ phần Cấp nước Yên Dũng" },
    { id:"n3", name:"Công ty Cổ phần Hạ tầng Cấp nước Sài Gòn – Cấp nước Củ Chi" },
    { id:"n4", name:"Hợp tác xã An Hòa (HTX AN HÒA)" },
    { id:"n5", name:"(HN) Nước sạch Hà Đông", sub:"Hà Đông" },
    { id:"n6", name:"(HN) Nước Sơn Tây" },
    { id:"n7", name:"(HN) Nước sạch Viwaco" },
    { id:"n8", name:"(HN) Nước sạch VTS – Hà Nội" },
    { id:"n9", name:"(HN) Cấp Nước Mê Linh" },
  ],
  internet: [
    { id:"i1", name:"Internet FPT Telecom" },
    { id:"i2", name:"Internet ADSL VNPT Hải Phòng" },
    { id:"i3", name:"Internet ADSL VNPT HCM" },
    { id:"i4", name:"Internet ADSL Viettel" },
    { id:"i5", name:"Internet ADSL SPT" },
    { id:"i6", name:"Internet Newlife-Nam Saigon" },
  ],
  taichinh: [
    { id:"f1", name:"FE Credit",       inputMode:"both" },
    { id:"f2", name:"HomeCredit",      inputMode:"contract" },
    { id:"f3", name:"MCredit",         inputMode:"contract" },
    { id:"f4", name:"HD Saison",       inputMode:"both" },
    { id:"f5", name:"Shinhan Finance", inputMode:"contract" },
    { id:"f6", name:"Mirae Asset",     inputMode:"contract" },
  ],
};

var serviceConfig = {
  dien:     { billType:"hoa don dien",     provider:"Dien Luc Viet Nam", fixed:true,  inputMode:"contract" },
  nuoc:     { billType:"hoa don nuoc",     provider:null, fixed:false, inputMode:"contract" },
  internet: { billType:"hoa don Internet", provider:null, fixed:false, inputMode:"contract" },
  taichinh: { billType:"tai chinh",        provider:null, fixed:false, inputMode:"contract" },
};

var billTypeLabel = {
  "hoa don dien":     "hóa đơn điện",
  "hoa don nuoc":     "hóa đơn nước",
  "hoa don Internet": "hóa đơn Internet",
  "tai chinh":        "tài chính",
};

var savedPhones = [
  { id:"p1", name:"Nguyễn Văn A", phone:"0901234567", color:"#e91e63", initials:"NA" },
  { id:"p2", name:"Trần Thị B",   phone:"0912345678", color:"#9c27b0", initials:"TB" },
  { id:"p3", name:null, phone:"0934567890", color:"#607d8b", initials:"09" },
  { id:"p4", name:null, phone:"0978123456", color:"#607d8b", initials:"09" },
  { id:"p5", name:null, phone:"0856789012", color:"#607d8b", initials:"08" },
];

var carriers = [
  { id:"viettel",      label:"viettel",      color:"#e8001d" },
  { id:"mobifone",     label:"mobifone",     color:"#0070c0", badge:"Bảo trì" },
  { id:"vinaphone",    label:"vinaphone",    color:"#0000cc" },
  { id:"vietnamobile", label:"vietnamobile", color:"#00a859" },
  { id:"wintel",       label:"WiNtel",       color:"#ff6600" },
];

var contacts = [
  { id:"c1", name:"Nguyễn Văn A", phone:"0901234567" },
  { id:"c2", name:"Trần Thị B",   phone:"0912345678" },
  { id:"c3", name:"Lê Văn C",     phone:"0934567890" },
  { id:"c4", name:"Phạm Thị D",   phone:"0978123456" },
];

var dataPackages = [
  { group:"Gói theo giờ",    items:[{ id:"dp1", gb:"3GB", sub:"6 giờ", price:10000 }] },
  { group:"Gói data 1 ngày", items:[{ id:"dp2", gb:"1,2GB", price:8000, hot:true }, { id:"dp3", gb:"2,5GB", price:12000 }, { id:"dp4", gb:"7GB", price:15000 }] },
  { group:"Gói data 3 ngày", items:[{ id:"dp5", gb:"4GB", price:20000 }, { id:"dp6", gb:"25GB", price:36000 }] },
  { group:"Gói data 7 ngày", items:[{ id:"dp7", gb:"65GB", price:85000 }] },
];

var txHistory = [
  { id:"t1", icon:"⚡", title:"Thanh toán điện", sub:"EVN Hồ Chí Minh", amount:-501500, date:"10/11/2025", time:"11:15" },
  { id:"t2", icon:"📲", title:"Nạp tiền điện thoại", sub:"Viettel · 0338451218", amount:-100000, date:"08/11/2025", time:"09:32" },
  { id:"t3", icon:"💧", title:"Thanh toán nước", sub:"Cấp nước Sài Gòn - Củ Chi", amount:-245000, date:"05/11/2025", time:"14:20" },
  { id:"t4", icon:"📶", title:"Thanh toán Internet", sub:"FPT Telecom", amount:-299000, date:"01/11/2025", time:"08:05" },
  { id:"t5", icon:"🎴", title:"Mua thẻ điện thoại", sub:"Viettel · 2 thẻ", amount:-200000, date:"28/10/2025", time:"16:44" },
  { id:"t6", icon:"⚡", title:"Thanh toán điện", sub:"EVN Hồ Chí Minh", amount:-476000, date:"10/10/2025", time:"10:10" },
  { id:"t7", icon:"💰", title:"Trả góp FE Credit", sub:"Mã HĐ: FEC-20249821", amount:-1500000, date:"05/10/2025", time:"13:55" },
];

var billItems = [
  { id:"b1", category:"Điện",     name:"EVN Hồ Chí Minh",           code:"PE05000199088", icon:"⚡" },
  { id:"b2", category:"Nước",     name:"Cấp nước Sài Gòn – Củ Chi", code:"NW08120034561", icon:"💧" },
  { id:"b3", category:"Internet", name:"FPT Telecom",                code:"FPT-HCM-20941", icon:"📶" },
];

var quickBills = [
  { id:"qb1", logo:"⚡", code:"PE05000199088", provider:"EVN Hồ Chí Minh",           name:"VO THI TUYET SUONG" },
  { id:"qb2", logo:"💧", code:"NW08120034561", provider:"Cấp nước Sài Gòn – Củ Chi", name:"VO HUU LE" },
  { id:"qb3", logo:"📶", code:"FPT-HCM-20941", provider:"FPT Telecom",               name:"NGUYEN VAN A" },
];

function fmt(n) { return n.toLocaleString("vi-VN") + "đ"; }

function inferCarrier(phone) {
  var p = (phone || "").replace(/\D/g, "");
  var pre = p.slice(0, 3);
  var viettel   = ["032","033","034","035","036","037","038","039","086","096","097","098"];
  var mobifone  = ["070","076","077","078","079","089","090","093"];
  var vinaphone = ["081","082","083","084","085","088","091","094"];
  var vnmobile  = ["052","056","058","092"];
  var wintel    = ["055","099"];
  if (viettel.indexOf(pre)   >= 0) return "viettel";
  if (mobifone.indexOf(pre)  >= 0) return "mobifone";
  if (vinaphone.indexOf(pre) >= 0) return "vinaphone";
  if (vnmobile.indexOf(pre)  >= 0) return "vietnamobile";
  if (wintel.indexOf(pre)    >= 0) return "wintel";
  return "viettel";
}

function Avatar(props) {
  var size = props.size || 40;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:props.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:size*0.35, flexShrink:0 }}>
      {props.initials}
    </div>
  );
}

function ToggleOn() {
  return (
    <div style={{ width:44, height:26, borderRadius:13, background:"#2196F3", position:"relative", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:21, width:20, height:20, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );
}
function ToggleOff() {
  return (
    <div style={{ width:44, height:26, borderRadius:13, background:"#ccc", position:"relative", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:3, width:20, height:20, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ height:44, background:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", flexShrink:0, position:"relative" }}>
      <span style={{ fontSize:12, fontWeight:600, color:"#111" }}>9:41</span>
      <div style={{ width:120, height:28, background:"#000", borderRadius:20, position:"absolute", left:"50%", transform:"translateX(-50%)", top:8 }} />
      <div style={{ display:"flex", gap:5 }}><span style={{ fontSize:11 }}>📶</span><span style={{ fontSize:11 }}>🔋</span></div>
    </div>
  );
}

function BillCard(props) {
  var bill = props.bill; var onPay = props.onPay;
  var [checking, setChecking] = useState(false);
  var [amount, setAmount] = useState(null);
  function handleCheck() {
    setChecking(true);
    setTimeout(function() { setChecking(false); setAmount(Math.floor(Math.random()*900000)+100000); }, 1200);
  }
  return (
    <div style={{ width:260, background:"#fff", borderRadius:16, padding:"14px", boxShadow:"0 2px 10px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0", flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
        <div style={{ width:40, height:40, borderRadius:"50%", border:"2px solid #e8e8e8", background:"#f8f8f8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{bill.logo}</div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:"#111", marginBottom:1 }}>{bill.code}</div>
          <div style={{ fontSize:11, color:"#888" }}>{bill.provider}</div>
          <div style={{ fontSize:11, color:"#888" }}>{bill.name}</div>
        </div>
      </div>
      <div style={{ height:1, background:"#f4f4f4", marginBottom:10 }} />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {amount !== null ? (
          <div>
            <div style={{ fontSize:10, color:"#aaa", marginBottom:1 }}>Số tiền</div>
            <div style={{ fontSize:14, fontWeight:700, color:"#111" }}>VND {amount.toLocaleString("vi-VN")}</div>
          </div>
        ) : (
          <div style={{ fontSize:11, color:"#bbb" }}>{checking ? "Đang kiểm tra..." : ""}</div>
        )}
        {amount === null ? (
          <div onClick={!checking ? handleCheck : undefined} style={{ background:checking?"#e8e8e8":"#111", borderRadius:16, padding:"6px 12px", cursor:checking?"default":"pointer", flexShrink:0 }}>
            <span style={{ fontSize:11, fontWeight:600, color:checking?"#999":"#fff" }}>{checking?"...":"Kiểm tra"}</span>
          </div>
        ) : (
          <div onClick={function() { if(onPay) onPay(bill, amount); }} style={{ background:"#2196F3", borderRadius:16, padding:"6px 12px", cursor:"pointer", flexShrink:0 }}>
            <span style={{ fontSize:11, fontWeight:600, color:"#fff" }}>Thanh toán</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SavedBillBanner(props) {
  var isTopup = props.type === "topup";
  return (
    <div style={{ background:"#222", padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:16 }}>✅</span>
        <span style={{ fontSize:13, fontWeight:500, color:"#fff" }}>{isTopup ? "Số điện thoại đã được lưu" : "Hoá đơn đã được lưu"}</span>
      </div>
      <div onClick={props.onQuanLy} style={{ background:"#2196F3", borderRadius:8, padding:"6px 10px", cursor:"pointer", flexShrink:0 }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#fff", whiteSpace:"nowrap" }}>{isTopup ? "Quản lý số điện thoại" : "Quản lý hoá đơn"}</span>
      </div>
    </div>
  );
}

function PaymentSheet(props) {
  var isTopup = props.type === "topup";
  var [visible, setVisible] = useState(false);
  var [wallet, setWallet] = useState("vsmart");
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleConfirm() { setVisible(false); setTimeout(props.onConfirm, 300); }
  var infoRows = isTopup ? [
    { label:"Số điện thoại", value:props.contractCode },
    { label:"Nhà mạng",      value:"Viettel" },
    { label:"Mệnh giá",      value:"100.000 đ" },
    { label:"Phí dịch vụ",   value:"Miễn phí" },
  ] : [
    { label:"Nhà cung cấp",  value:"Điện lực Việt Nam" },
    { label:"Mã hợp đồng",   value:props.contractCode || "PE0123456789" },
    { label:"Kỳ thanh toán", value:"Tháng 11/2025" },
    { label:"Phí dịch vụ",   value:"Miễn phí" },
  ];
  return (
    <div style={{ position:"absolute", inset:0, zIndex:30, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"24px 24px 0 0", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)", paddingBottom:32 }}>
        <div style={{ padding:"16px 20px 4px" }}><span onClick={handleClose} style={{ fontSize:20, color:"#555", cursor:"pointer" }}>✕</span></div>
        <div style={{ padding:"0 20px 20px" }}>
          <div style={{ fontSize:15, fontWeight:500, color:"#333", marginBottom:6 }}>{isTopup ? "Nạp tiền điện thoại" : "Thanh toán hóa đơn điện"}</div>
          <div style={{ fontSize:32, fontWeight:800, color:"#111" }}>{isTopup ? "100.000 đ" : "501.500 đ"}</div>
        </div>
        <div style={{ padding:"0 20px", marginBottom:20 }}>
          {infoRows.map(function(row, i) {
            return (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:14, marginBottom:14, borderBottom:i<infoRows.length-1?"1px solid #f4f4f4":"none" }}>
                <span style={{ fontSize:13, color:"#999" }}>{row.label}</span>
                <span style={{ fontSize:13, fontWeight:500, color:"#111" }}>{row.value}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"0 20px 24px" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#111", marginBottom:12 }}>Nguồn thanh toán</div>
          <div style={{ display:"flex", gap:10 }}>
            <div onClick={function() { setWallet("vsmart"); }} style={{ flex:1, border:wallet==="vsmart"?"2px solid #2196F3":"1.5px solid #e0e0e0", borderRadius:14, padding:"12px 14px", cursor:"pointer", background:wallet==="vsmart"?"#EAF4FF":"#fff", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"#e8f4ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontSize:16 }}>💳</span></div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"#111" }}>Ví V-Smart Pay</div>
                <div style={{ fontSize:11, color:"#2196F3", fontWeight:600, marginTop:1 }}>1.637.500 đ</div>
              </div>
            </div>
            <div style={{ flex:1, border:"1.5px solid #e0e0e0", borderRadius:14, padding:"12px 14px", background:"#fafafa", display:"flex", alignItems:"center", gap:10, opacity:0.55 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontSize:16 }}>🏦</span></div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"#111" }}>Nguồn tiền khác</div>
                <div style={{ fontSize:10, color:"#aaa", marginTop:1 }}>Sắp ra mắt</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding:"0 20px" }}>
          <div onClick={handleConfirm} style={{ background:"#111", borderRadius:30, padding:"16px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer" }}>Xác thực giao dịch</div>
        </div>
      </div>
    </div>
  );
}

function InsufficientBalanceDialog(props) {
  return (
    <div style={{ position:"absolute", inset:0, zIndex:40, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.45)", padding:"0 28px" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"28px 24px 24px", width:"100%", textAlign:"center" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:"#FFF3CD", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><span style={{ fontSize:26 }}>⚠️</span></div>
        <div style={{ fontSize:18, fontWeight:700, color:"#111", marginBottom:10 }}>Số dư không khả dụng</div>
        <div style={{ fontSize:13, color:"#666", lineHeight:1.6, marginBottom:24 }}>Số dư thanh toán không khả dụng. Vui lòng chọn nguồn thanh toán khác hoặc nạp thêm vào ví V-Smart Pay.</div>
        <div onClick={props.onTopup} style={{ background:"#111", borderRadius:30, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", marginBottom:12 }}>Nạp thêm</div>
        <div onClick={props.onBack} style={{ border:"1.5px solid #ddd", borderRadius:30, padding:"14px", textAlign:"center", color:"#111", fontWeight:600, fontSize:15, cursor:"pointer" }}>Quay lại</div>
      </div>
    </div>
  );
}

function FixedDayModal(props) {
  var [sel, setSel] = useState(props.current || 14);
  var days = []; for (var i=1;i<=31;i++) days.push(i);
  var rows = []; for (var j=0;j<days.length;j+=6) rows.push(days.slice(j,j+6));
  return (
    <div style={{ position:"absolute", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 20px" }}>
      <div onClick={props.onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:20, width:"100%", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px 12px" }}>
          <span style={{ fontSize:16, fontWeight:700, color:"#111" }}>Ngày cố định trong tháng</span>
          <span onClick={props.onClose} style={{ fontSize:20, color:"#999", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ margin:"0 16px 14px", background:"#f0f6ff", borderRadius:10, padding:"10px 12px", display:"flex", gap:8 }}>
          <span style={{ fontSize:14, color:"#2196F3", flexShrink:0 }}>ℹ️</span>
          <span style={{ fontSize:12, color:"#555", lineHeight:1.55 }}>Nếu ngày được đặt là 29, 30 hoặc 31, V-Smart Pay sẽ tự động nạp tiền vào ngày cuối cùng của mỗi tháng.</span>
        </div>
        <div style={{ padding:"0 16px 16px" }}>
          {rows.map(function(row, ri) {
            return (
              <div key={ri} style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", marginBottom:4 }}>
                {row.map(function(d) {
                  var isSel = d===sel;
                  return (
                    <div key={d} onClick={function() { setSel(d); }} style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"6px 2px", cursor:"pointer" }}>
                      <div style={{ width:38, height:38, borderRadius:"50%", background:isSel?"#2196F3":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <span style={{ fontSize:14, fontWeight:isSel?700:400, color:isSel?"#fff":"#111" }}>{String(d).padStart(2,"0")}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ padding:"0 16px 20px" }}>
          <div onClick={function() { props.onSelect(sel); }} style={{ background:"#2196F3", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Xác nhận</div>
        </div>
      </div>
    </div>
  );
}

function AutoTopupSheet(props) {
  var [visible, setVisible] = useState(false);
  var [amount, setAmount] = useState(10000);
  var [schedule, setSchedule] = useState("promo");
  var [showAmountSheet, setShowAmountSheet] = useState(false);
  var [fixedDay, setFixedDay] = useState(null);
  var [showDayModal, setShowDayModal] = useState(false);
  var amountOptions = [10000,20000,50000,100000,200000,300000,500000];
  var cur = carriers.find(function(c) { return c.id==="viettel"; });
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleConfirm() { setVisible(false); setTimeout(props.onConfirm, 280); }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:30, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)", paddingBottom:28, maxHeight:"90vh", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px 14px", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#111" }}>Đăng kí nạp tự động</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#999", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 0" }}>
          <div style={{ border:"1.5px solid #e0e0e0", borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ background:cur.color, borderRadius:6, padding:"3px 8px" }}><span style={{ color:"#fff", fontSize:10, fontWeight:700 }}>{cur.label}</span></div>
              <div>
                <div style={{ fontSize:10, color:"#aaa" }}>Số của tôi</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#111" }}>{props.phone.phone}</div>
              </div>
            </div>
            <div style={{ width:30, height:30, borderRadius:8, background:"#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center" }}>👤</div>
          </div>
          <div onClick={function() { setShowAmountSheet(true); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 0 14px", borderBottom:"1px solid #f0f0f0", marginBottom:16, cursor:"pointer" }}>
            <span style={{ fontSize:13, fontWeight:600, color:"#111" }}>Chọn mệnh giá</span>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:13, fontWeight:600, color:"#111" }}>{fmt(amount)}</span>
              <span style={{ fontSize:14, color:"#aaa" }}>›</span>
            </div>
          </div>
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#111", marginBottom:12 }}>Chọn chu kì nạp</div>
            <div onClick={function() { setSchedule("promo"); }} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, cursor:"pointer" }}>
              <div style={{ width:18, height:18, borderRadius:"50%", border:schedule==="promo"?"5px solid #2196F3":"2px solid #ccc", background:"#fff", flexShrink:0 }} />
              <span style={{ fontSize:13, color:"#111" }}>Tất cả các ngày khuyến mại của nhà mạng</span>
            </div>
            <div onClick={function() { setSchedule("fixed"); setShowDayModal(true); }} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
              <div style={{ width:18, height:18, borderRadius:"50%", border:schedule==="fixed"?"5px solid #2196F3":"2px solid #ccc", background:"#fff", flexShrink:0 }} />
              <div>
                <span style={{ fontSize:13, color:"#111" }}>Nạp vào ngày cố định trong tháng</span>
                {schedule==="fixed" && fixedDay && <div style={{ fontSize:11, color:"#2196F3", marginTop:2, cursor:"pointer" }}>Ngày {String(fixedDay).padStart(2,"0")} hàng tháng ✏️</div>}
              </div>
            </div>
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#111" }}>Nguồn tiền thanh toán</span>
            </div>
            <div style={{ border:"2px solid #111", borderRadius:10, padding:"11px 16px", display:"inline-block" }}>
              <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>Số dư ví</span>
            </div>
          </div>
          <div style={{ fontSize:11, color:"#999", lineHeight:1.65, marginBottom:20 }}>
            Bằng việc chọn Xác nhận, bạn đồng ý với <span style={{ color:"#2196F3" }}>Các điều khoản</span> và <span style={{ color:"#2196F3" }}>Chính sách bảo mật</span> của V-Smart Pay
          </div>
        </div>
        <div style={{ padding:"0 20px", flexShrink:0 }}>
          <div onClick={handleConfirm} style={{ background:"#2196F3", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Xác nhận</div>
        </div>
      </div>
      {showAmountSheet && (
        <div style={{ position:"absolute", inset:0, zIndex:40, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          <div onClick={function() { setShowAmountSheet(false); }} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)" }} />
          <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", paddingBottom:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px 12px", borderBottom:"1px solid #f0f0f0" }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#111" }}>Chọn mệnh giá</span>
              <span onClick={function() { setShowAmountSheet(false); }} style={{ fontSize:20, color:"#999", cursor:"pointer" }}>✕</span>
            </div>
            {amountOptions.map(function(a) {
              return (
                <div key={a} onClick={function() { setAmount(a); setShowAmountSheet(false); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 20px", borderBottom:"1px solid #f4f4f4", cursor:"pointer", background:a===amount?"#f8f8f8":"#fff" }}>
                  <span style={{ fontSize:14, color:"#111", fontWeight:a===amount?600:400 }}>{fmt(a)}</span>
                  {a===amount && <span style={{ fontSize:16, color:"#27ae60" }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showDayModal && <FixedDayModal current={fixedDay} onClose={function() { setShowDayModal(false); }} onSelect={function(d) { setFixedDay(d); setShowDayModal(false); }} />}
    </div>
  );
}

function NotifySheet(props) {
  var [visible, setVisible] = useState(false);
  var [remDay, setRemDay] = useState(16);
  var [showDayPicker, setShowDayPicker] = useState(false);
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleConfirm() { setVisible(false); setTimeout(props.onConfirm, 280); }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:30, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)", paddingBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px 14px", borderBottom:"1px solid #f0f0f0" }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#111" }}>Nhận thông báo nhắc nợ</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#999", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ padding:"16px 20px 0" }}>
          <div style={{ background:"#f0f6ff", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"#f5a623", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontSize:20 }}>⚡</span></div>
            <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>EVN Hồ Chí Minh</span>
          </div>
          <div style={{ marginBottom:14 }}>
            {[{label:"Mã khách hàng",value:"PE05000199088"},{label:"Tên khách hàng",value:"VÕ THỊ TUYẾT SƯƠNG"},{label:"Địa chỉ",value:"280 TÔN THẤT THUYẾT,\nPhường Vĩnh Hội"}].map(function(row, i) {
              return (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", paddingBottom:12, marginBottom:12, borderBottom:"1px solid #f2f2f2", gap:16 }}>
                  <span style={{ fontSize:13, color:"#999", flexShrink:0 }}>{row.label}</span>
                  <span style={{ fontSize:13, fontWeight:500, color:"#111", textAlign:"right", whiteSpace:"pre-line" }}>{row.value}</span>
                </div>
              );
            })}
          </div>
          <div onClick={function() { setShowDayPicker(true); }} style={{ border:"1.5px solid #e0e0e0", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, cursor:"pointer" }}>
            <div>
              <div style={{ fontSize:11, color:"#aaa", marginBottom:3 }}>Ngày nhắc</div>
              <div style={{ fontSize:18, fontWeight:700, color:"#111" }}>{remDay}</div>
            </div>
            <span style={{ fontSize:18, color:"#ccc" }}>›</span>
          </div>
          <div style={{ fontSize:11, color:"#999", lineHeight:1.65, marginBottom:18 }}>
            Bằng việc chọn Xác nhận, bạn đồng ý với <span style={{ color:"#2196F3" }}>Các điều khoản</span> và <span style={{ color:"#2196F3" }}>Chính sách bảo mật</span> của V-Smart Pay
          </div>
          <div onClick={handleConfirm} style={{ background:"#2196F3", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Xác nhận</div>
        </div>
      </div>
      {showDayPicker && <DatePickerSheet current={remDay} onSelect={function(d) { if(d) setRemDay(d); setShowDayPicker(false); }} onClose={function() { setShowDayPicker(false); }} />}
    </div>
  );
}

function DatePickerSheet(props) {
  var [visible, setVisible] = useState(false);
  var [sel, setSel] = useState(props.current || 16);
  var popular = [3,4,5,16];
  var weeks = []; var cells = [null,null,null,null,null];
  for (var d=1;d<=31;d++) { cells.push(d); if(cells.length===7){weeks.push(cells);cells=[];} }
  if(cells.length){while(cells.length<7)cells.push(null);weeks.push(cells);}
  var DOW = ["CN","T2","T3","T4","T5","T6","T7"];
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleApply() { setVisible(false); setTimeout(function() { props.onSelect(sel); }, 280); }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:50, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)", padding:"0 0 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px 12px" }}>
          <span style={{ fontSize:16, fontWeight:700, color:"#111" }}>Chọn Ngày Nhắc Nhở</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#999", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", padding:"0 12px", marginBottom:4 }}>
          {DOW.map(function(dow) { return <div key={dow} style={{ textAlign:"center", fontSize:11, fontWeight:600, color:"#bbb", padding:"4px 0" }}>{dow}</div>; })}
        </div>
        <div style={{ padding:"0 12px 8px" }}>
          {weeks.map(function(week, wi) {
            return (
              <div key={wi} style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:2 }}>
                {week.map(function(wd, di) {
                  if(!wd) return <div key={di} />;
                  var isSel = wd===sel;
                  var isPop = popular.indexOf(wd)>=0 && !isSel;
                  return (
                    <div key={di} onClick={function() { setSel(wd); }} style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer", padding:"4px 2px" }}>
                      <div style={{ width:36, height:36, borderRadius:"50%", background:isSel?"#2196F3":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <span style={{ fontSize:14, fontWeight:isSel?700:400, color:isSel?"#fff":"#111" }}>{wd}</span>
                      </div>
                      {(isSel||isPop)&&<span style={{ fontSize:8, color:isSel?"#2196F3":"#888", marginTop:1 }}>Phổ biến</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ padding:"0 20px" }}>
          <div onClick={handleApply} style={{ background:"#2196F3", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Chọn ngày này</div>
        </div>
      </div>
    </div>
  );
}

function LimitSheet(props) {
  var [visible, setVisible] = useState(false);
  var [sel, setSel] = useState(props.current);
  var [custom, setCustom] = useState(1000000);
  var [showDialog, setShowDialog] = useState(false);
  var options = ["5.000.000đ","10.000.000đ","20.000.000đ","30.000.000đ","40.000.000đ","50.000.000đ","75.000.000đ","100.000.000đ"];
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleApply() {
    var val = sel==="custom" ? (custom.toLocaleString("vi-VN")+"đ") : sel;
    setVisible(false); setTimeout(function() { props.onSelect(val); }, 280);
  }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:30, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)", paddingBottom:24, maxHeight:"80vh", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px 12px", borderBottom:"1px solid #f4f4f4", flexShrink:0 }}>
          <span style={{ fontSize:15, fontWeight:700, color:"#111" }}>Hạn mức thanh toán</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#888", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ overflowY:"auto", flex:1 }}>
          {options.map(function(opt) {
            return (
              <div key={opt} onClick={function() { setSel(opt); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid #f4f4f4", cursor:"pointer", background:sel===opt?"#f8f8f8":"#fff" }}>
                <span style={{ fontSize:14, color:"#333", fontWeight:sel===opt?600:400 }}>{opt}</span>
                {sel===opt && <span style={{ fontSize:16, color:"#27ae60" }}>✓</span>}
              </div>
            );
          })}
          <div onClick={function() { setSel("custom"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:"1px solid #f4f4f4", background:sel==="custom"?"#f8f8f8":"#fff", cursor:"pointer" }}>
            <span style={{ fontSize:14, fontWeight:600, color:"#2196F3" }}>{custom.toLocaleString("vi-VN")} đ</span>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div onClick={function(e) { e.stopPropagation(); setSel("custom"); setCustom(function(v) { return Math.max(500000,v-500000); }); }} style={{ width:30, height:30, borderRadius:"50%", border:"1.5px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, color:"#555" }}>−</div>
              <div onClick={function(e) { e.stopPropagation(); setSel("custom"); setCustom(function(v) { return v+500000; }); }} style={{ width:30, height:30, borderRadius:"50%", background:"#2196F3", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, color:"#fff" }}>+</div>
            </div>
          </div>
        </div>
        <div style={{ padding:"12px 20px 0", display:"flex", gap:10, flexShrink:0 }}>
          <div onClick={function() { setShowDialog(true); }} style={{ padding:"12px 16px", borderRadius:10, background:"#f0f0f0", fontSize:13, fontWeight:600, color:"#555", cursor:"pointer" }}>Xoá hạn mức</div>
          <div onClick={handleApply} style={{ flex:1, padding:"12px 16px", borderRadius:10, background:"#2196F3", fontSize:13, fontWeight:700, color:"#fff", textAlign:"center", cursor:"pointer" }}>Áp dụng</div>
        </div>
      </div>
      {showDialog && (
        <div style={{ position:"absolute", inset:0, zIndex:40, display:"flex", alignItems:"flex-end", background:"rgba(0,0,0,0.5)" }}>
          <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 32px", width:"100%" }}>
            <div style={{ fontSize:20, fontWeight:700, color:"#111", marginBottom:14 }}>Xoá hạn mức Autobill?</div>
            <div style={{ fontSize:14, color:"#555", lineHeight:1.6, marginBottom:28 }}>Autobill sẽ tự động thanh toán cho bạn mọi hóa đơn, dù số tiền lớn hay nhỏ.</div>
            <div onClick={function() { setShowDialog(false); handleClose(); props.onSelect(null); }} style={{ background:"#111", borderRadius:30, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", marginBottom:10 }}>Xác nhận</div>
            <div onClick={function() { setShowDialog(false); }} style={{ border:"1.5px solid #ddd", borderRadius:30, padding:"15px", textAlign:"center", color:"#111", fontWeight:600, fontSize:15, cursor:"pointer" }}>Không, quay lại</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProviderSheet(props) {
  var [visible, setVisible] = useState(false);
  var providers = providerMap[props.serviceId] || [];
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleSelect(p) { setVisible(false); setTimeout(function() { props.onSelect(p); }, 280); }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:10, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", maxHeight:"75%", display:"flex", flexDirection:"column", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)" }}>
        <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 4px" }}><div style={{ width:40, height:4, background:"#ddd", borderRadius:4 }} /></div>
        <div style={{ padding:"8px 20px 12px" }}>
          <div style={{ fontSize:16, fontWeight:700, color:"#111", lineHeight:1.5 }}>
            Thanh toán <span style={{ color:"#2196F3" }}>{billTypeLabel[props.billType]||props.billType}</span><br/>
            cho <span style={{ color:"#999", fontWeight:400 }}>nhà cung cấp nào?</span> 🔍
          </div>
        </div>
        <div style={{ overflowY:"auto", paddingBottom:16 }}>
          {providers.map(function(p, i) {
            return (
              <div key={p.id} onClick={function() { handleSelect(p); }} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", borderBottom:i<providers.length-1?"1px solid #f4f4f4":"none", cursor:"pointer" }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🏢</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:500, color:"#111" }}>{p.name}</div>
                  {p.sub && <div style={{ fontSize:11, color:"#888" }}>{p.sub}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CarrierSheet(props) {
  var [visible, setVisible] = useState(false);
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleSelect(c) { setVisible(false); setTimeout(function() { props.onSelect(c); }, 280); }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:20, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", padding:"16px 20px 24px", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:16, fontWeight:700, color:"#111" }}>Đổi nhà mạng</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#888", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ background:"#fff8e1", borderRadius:10, padding:"10px 12px", display:"flex", gap:8, marginBottom:16 }}>
          <span style={{ fontSize:14 }}>ℹ️</span>
          <span style={{ fontSize:12, color:"#666", lineHeight:1.5 }}>Vui lòng chỉ chọn lại nhà mạng khi bạn đã đăng ký giữ số chuyển mạng.</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {carriers.map(function(c) {
            var isSel = c.id===props.current;
            return (
              <div key={c.id} onClick={function() { handleSelect(c); }} style={{ border:isSel?"2px solid #2196F3":"1.5px solid #e0e0e0", borderRadius:12, padding:"14px 8px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative", background:isSel?"#EAF4FF":"#fff", minHeight:52 }}>
                {c.badge && <div style={{ position:"absolute", top:-8, left:8, background:"#e74c3c", borderRadius:20, padding:"2px 8px" }}><span style={{ color:"#fff", fontSize:9, fontWeight:700 }}>{c.badge}</span></div>}
                <span style={{ fontSize:12, fontWeight:700, color:c.color }}>{c.label}</span>
                {isSel && <div style={{ position:"absolute", bottom:3, right:3, width:14, height:14, background:"#2196F3", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:8 }}>✓</span></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ContactSheet(props) {
  var [visible, setVisible] = useState(false);
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleSelect(c) { setVisible(false); setTimeout(function() { props.onSelect(c); }, 280); }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:20, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", padding:"16px 0 24px", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)", maxHeight:"60%" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 20px 12px" }}>
          <span style={{ fontSize:16, fontWeight:700, color:"#111" }}>Danh bạ</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#888", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ overflowY:"auto" }}>
          {contacts.map(function(c, i) {
            return (
              <div key={c.id} onClick={function() { handleSelect(c); }} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", borderBottom:i<contacts.length-1?"1px solid #f4f4f4":"none", cursor:"pointer" }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"#2196F3", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:14 }}>{c.name.charAt(0)}</div>
                <div><div style={{ fontSize:14, fontWeight:600, color:"#111" }}>{c.name}</div><div style={{ fontSize:12, color:"#888" }}>{c.phone}</div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterSheet(props) {
  var [visible, setVisible] = useState(false);
  var [sort, setSort] = useState(props.filter.sort);
  var [cycle, setCycle] = useState(props.filter.cycle);
  var [gb, setGb] = useState(props.filter.gb);
  useEffect(function() { setTimeout(function() { setVisible(true); }, 20); }, []);
  function handleClose() { setVisible(false); setTimeout(props.onClose, 300); }
  function handleApply() { setVisible(false); setTimeout(function() { props.onApply({sort:sort,cycle:cycle,gb:gb}); }, 280); }
  var cycles = ["30 ngày","7 ngày","3 ngày","1 ngày","6 giờ"];
  var gbs = ["36GB","66GB","90GB"];
  function Chip(cp) { return <div onClick={cp.onClick} style={{ padding:"7px 14px", borderRadius:20, border:cp.active?"2px solid #2196F3":"1.5px solid #ddd", background:cp.active?"#EAF4FF":"#fff", fontSize:13, fontWeight:500, color:cp.active?"#2196F3":"#555", cursor:"pointer" }}>{cp.label}</div>; }
  function Radio(rp) { return <div onClick={rp.onClick} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}><div style={{ width:18, height:18, borderRadius:"50%", border:rp.active?"5px solid #2196F3":"2px solid #ccc", background:"#fff", flexShrink:0 }} /><span style={{ fontSize:13, color:"#333" }}>{rp.label}</span></div>; }
  return (
    <div style={{ position:"absolute", inset:0, zIndex:20, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={handleClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", opacity:visible?1:0, transition:"opacity 0.3s" }} />
      <div style={{ position:"relative", background:"#fff", borderRadius:"20px 20px 0 0", padding:"16px 20px 24px", transform:visible?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(0.32,0.72,0,1)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontSize:16, fontWeight:700, color:"#111" }}>Bộ lọc</span>
          <span onClick={handleClose} style={{ fontSize:20, color:"#888", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#888", marginBottom:10 }}>Sắp xếp theo</div>
          <div style={{ display:"flex", gap:20 }}>
            <Radio label="Giá tăng dần" active={sort==="asc"} onClick={function() { setSort(sort==="asc"?null:"asc"); }} />
            <Radio label="Giá giảm dần" active={sort==="desc"} onClick={function() { setSort(sort==="desc"?null:"desc"); }} />
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#888", marginBottom:10 }}>Chu kỳ</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>{cycles.map(function(c) { return <Chip key={c} label={c} active={cycle===c} onClick={function() { setCycle(cycle===c?null:c); }} />; })}</div>
        </div>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#888", marginBottom:10 }}>Dung lượng</div>
          <div style={{ display:"flex", gap:8 }}>{gbs.map(function(g) { return <Chip key={g} label={g} active={gb===g} onClick={function() { setGb(gb===g?null:g); }} />; })}</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <div onClick={function() { setSort(null); setCycle(null); setGb(null); }} style={{ flex:1, padding:"14px", borderRadius:12, border:"1.5px solid #ddd", textAlign:"center", fontSize:14, fontWeight:600, color:"#555", cursor:"pointer" }}>Xoá lọc</div>
          <div onClick={handleApply} style={{ flex:2, padding:"14px", borderRadius:12, background:"#2196F3", textAlign:"center", fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer" }}>Áp dụng</div>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen(props) {
  var groups = {};
  var monthOrder = [];
  txHistory.forEach(function(tx) {
    var month = "Tháng " + tx.date.slice(3);
    if (!groups[month]) { groups[month] = []; monthOrder.push(month); }
    groups[month].push(tx);
  });
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#f5f5f5" }}>
      <div style={{ background:"#fff", padding:"12px 20px 14px", display:"flex", alignItems:"center", gap:14, borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <span style={{ fontSize:17, fontWeight:700, color:"#111" }}>Lịch sử giao dịch</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        {monthOrder.map(function(month) {
          var txs = groups[month];
          return (
            <div key={month} style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#888", marginBottom:10 }}>{month}</div>
              <div style={{ background:"#fff", borderRadius:16, overflow:"hidden" }}>
                {txs.map(function(tx, i) {
                  return (
                    <div key={tx.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom:i<txs.length-1?"1px solid #f4f4f4":"none" }}>
                      <div style={{ width:42, height:42, borderRadius:"50%", background:"#f2f2f2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{tx.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"#111", marginBottom:2 }}>{tx.title}</div>
                        <div style={{ fontSize:11, color:"#999", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{tx.sub}</div>
                        <div style={{ fontSize:11, color:"#bbb", marginTop:2 }}>{tx.time} · {tx.date}</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:"#111" }}>{tx.amount.toLocaleString("vi-VN")}đ</div>
                        <div style={{ fontSize:10, color:"#27ae60", marginTop:3 }}>✓ Thành công</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SdtTab(props) {
  var onTopupPhone = props.onTopupPhone;
  var [autoTopupMap, setAutoTopupMap] = useState({});
  var [showTopupFor, setShowTopupFor] = useState(null);
  var [editingId, setEditingId] = useState(null);
  var [namesMap, setNamesMap] = useState({});
  return (
    <div>
      {savedPhones.map(function(p) {
        var autoOn = !!autoTopupMap[p.id];
        var isEditing = editingId === p.id;
        var displayName = namesMap[p.id] !== undefined ? namesMap[p.id] : p.name;
        return (
          <div key={p.id} style={{ marginBottom:20 }}>
            <div style={{ border:"1px solid #eee", borderRadius:14, overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f4f4f4" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
                  <Avatar initials={p.initials} color={p.color} />
                  <div style={{ flex:1, minWidth:0 }}>
                    {isEditing ? (
                      <input autoFocus value={namesMap[p.id] !== undefined ? namesMap[p.id] : (p.name||"")}
                        onChange={function(e) { var v=e.target.value; setNamesMap(function(m) { var n=Object.assign({},m); n[p.id]=v; return n; }); }}
                        onBlur={function() { setEditingId(null); }}
                        onKeyDown={function(e) { if(e.key==="Enter") setEditingId(null); }}
                        placeholder="Nhập tên gợi nhớ..."
                        style={{ fontSize:14, fontWeight:600, color:"#111", border:"none", borderBottom:"1.5px solid #2196F3", outline:"none", width:"100%", background:"transparent", padding:"2px 0" }}
                      />
                    ) : (
                      <div style={{ display:"flex", alignItems:"center", gap:6, minWidth:0 }}>
                        <div style={{ minWidth:0 }}>
                          {displayName && <div style={{ fontSize:14, fontWeight:600, color:"#111", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{displayName}</div>}
                          <div style={{ fontSize:12, color:"#888", marginTop:displayName?2:0 }}>{p.phone}</div>
                        </div>
                        <span onClick={function() { setEditingId(p.id); }} style={{ fontSize:14, cursor:"pointer", flexShrink:0 }}>✏️</span>
                      </div>
                    )}
                  </div>
                </div>
                <div onClick={function() { if(onTopupPhone) onTopupPhone({ phone:p.phone, carrierId:inferCarrier(p.phone) }); }}
                  style={{ background:"#2196F3", borderRadius:20, padding:"6px 12px", cursor:"pointer", flexShrink:0, marginLeft:10 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#fff", whiteSpace:"nowrap" }}>Nạp tiền</span>
                </div>
              </div>
              <div onClick={function() { if(!autoOn) setShowTopupFor(p.id); else setAutoTopupMap(function(m) { var n=Object.assign({},m); n[p.id]=false; return n; }); }}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", cursor:"pointer" }}>
                <span style={{ fontSize:13, color:"#333" }}>Đăng ký nạp tự động</span>
                {autoOn ? <ToggleOn /> : <ToggleOff />}
              </div>
            </div>
          </div>
        );
      })}
      {showTopupFor && (
        <AutoTopupSheet phone={savedPhones.find(function(p) { return p.id===showTopupFor; })} onClose={function() { setShowTopupFor(null); }} onConfirm={function() { setAutoTopupMap(function(m) { var n=Object.assign({},m); n[showTopupFor]=true; return n; }); setShowTopupFor(null); }} />
      )}
    </div>
  );
}

function HomeQuanLySection(props) {
  var onNavigate = props.onNavigate;
  var autoPay = props.autoPay;
  var onTopupPhone = props.onTopupPhone;
  var [tab, setTab] = useState(props.initTab || "hoadon");
  var [notifyMap, setNotifyMap] = useState({});
  var [showNotifyFor, setShowNotifyFor] = useState(null);
  var sectionRef = useState(null);

  useEffect(function() {
    if (props.initTab) {
      setTab(props.initTab);
      if (props.onTabShown) props.onTabShown();
      // scroll into view
      setTimeout(function() {
        var el = document.getElementById("home-quanly-section");
        if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
      }, 100);
    }
  }, [props.initTab]);
  return (
    <div id="home-quanly-section" style={{ position:"relative" }}>
      <div style={{ padding:"18px 20px 0" }}>
        <div style={{ fontWeight:700, fontSize:14.5, color:"#111", marginBottom:12 }}>Hoá đơn đã lưu</div>
        <div style={{ display:"flex", background:"#f0f0f0", borderRadius:12, padding:3, gap:2, marginBottom:16 }}>
          {["hoadon","sdt"].map(function(t) {
            return (
              <div key={t} onClick={function() { setTab(t); }} style={{ flex:1, textAlign:"center", padding:"9px 0", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", background:tab===t?"#fff":"transparent", color:tab===t?"#111":"#888", boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.12)":"none" }}>
                {t==="hoadon"?"Hoá đơn":"Số điện thoại"}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"0 20px 80px" }}>
        {tab==="hoadon" && billItems.map(function(item) {
          var notifyOn = !!notifyMap[item.id];
          return (
            <div key={item.id} style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:600, color:"#888", marginBottom:8 }}>{item.category}</div>
              <div style={{ border:"1px solid #eee", borderRadius:14, overflow:"hidden" }}>
                <div onClick={function() { onNavigate("billdetail"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f4f4f4", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", border:"2px solid #e0e0e0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#111" }}>{item.name}</div>
                      <div style={{ fontSize:12, color:"#888", marginTop:1 }}>{item.code}</div>
                    </div>
                  </div>
                  <span style={{ fontSize:18, color:"#ccc" }}>›</span>
                </div>
                <div onClick={function() { onNavigate("autopay"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid #f4f4f4", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:13, color:"#333" }}>Thanh toán tự động hàng tháng</span>
                    <span style={{ fontSize:12, color:"#aaa" }}>ⓘ</span>
                  </div>
                  {autoPay ? <ToggleOn /> : <ToggleOff />}
                </div>
                <div onClick={function() { if(!notifyOn) setShowNotifyFor(item.id); else setNotifyMap(function(m) { var n=Object.assign({},m); n[item.id]=false; return n; }); }}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", cursor:"pointer" }}>
                  <span style={{ fontSize:13, color:"#333" }}>Nhận thông báo nhắc nợ</span>
                  {notifyOn ? <ToggleOn /> : <ToggleOff />}
                </div>
              </div>
            </div>
          );
        })}
        {tab==="sdt" && <SdtTab onTopupPhone={onTopupPhone} />}
      </div>
      {showNotifyFor && (
        <NotifySheet onClose={function() { setShowNotifyFor(null); }} onConfirm={function() { setNotifyMap(function(m) { var n=Object.assign({},m); n[showNotifyFor]=true; return n; }); setShowNotifyFor(null); }} />
      )}
    </div>
  );
}

function HomeScreen(props) {
  var onTap = props.onTap; var tapped = props.tapped; var onFastPay = props.onFastPay;
  var onNavigate = props.onNavigate; var autoPay = props.autoPay;
  var onHistory = props.onHistory; var onTopupPhone = props.onTopupPhone;
  return (
    <div style={{ flex:1, overflowY:"auto", fontFamily:"'Segoe UI',sans-serif", paddingBottom:24 }}>
      <div style={{ padding:"8px 20px 0" }}><span style={{ fontSize:24, color:"#333" }}>‹</span></div>
      <div style={{ padding:"6px 20px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"#111", lineHeight:1.35, margin:0 }}>Thanh toán mọi thứ dễ dàng<br/>với V-Smart Pay</h1>
        <div onClick={onHistory} style={{ width:40, height:40, borderRadius:12, background:"#f2f2f2", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, alignSelf:"flex-start" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
      </div>
      <div style={{ marginTop:16, overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
        <div style={{ display:"flex", gap:12, paddingLeft:20, paddingRight:20, width:"max-content" }}>
          {quickBills.map(function(bill) { return <BillCard key={bill.id} bill={bill} onPay={function(b,amt) { if(onFastPay) onFastPay(b,amt); }} />; })}
        </div>
      </div>
      <div style={{ padding:"18px 20px 0" }}>
        <div style={{ fontWeight:700, fontSize:14.5, color:"#111", marginBottom:14 }}>Thanh toán hoá đơn mới</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px 8px" }}>
          {services.map(function(s) {
            return (
              <div key={s.id} onClick={function() { onTap(s.id); }} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer", transform:tapped===s.id?"scale(0.88)":"scale(1)", transition:"transform 0.15s" }}>
                <div style={{ width:54, height:54, borderRadius:"50%", background:tapped===s.id?"#e6f9ee":"#f2f2f2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, border:tapped===s.id?"2px solid #2ecc71":"2px solid transparent" }}>{s.icon}</div>
                <span style={{ fontSize:10.5, color:"#333", textAlign:"center", lineHeight:1.3, fontWeight:500 }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <HomeQuanLySection onNavigate={onNavigate} autoPay={autoPay} onTopupPhone={onTopupPhone} initTab={props.initTab} onTabShown={props.onTabShown} />
    </div>
  );
}

function QuanLyScreen(props) {
  var [tab, setTab] = useState(props.initTab || "hoadon");
  var [notifyMap, setNotifyMap] = useState({});
  var [showNotifyFor, setShowNotifyFor] = useState(null);
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff", position:"relative" }}>
      <div style={{ display:"flex", alignItems:"center", gap:16, padding:"8px 20px 12px", flexShrink:0 }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <span style={{ fontSize:22, fontWeight:700, color:"#111" }}>Quản lý</span>
      </div>
      <div style={{ padding:"0 20px 16px", flexShrink:0 }}>
        <div style={{ display:"flex", background:"#f0f0f0", borderRadius:12, padding:3, gap:2 }}>
          {["hoadon","sdt"].map(function(t) {
            return (
              <div key={t} onClick={function() { setTab(t); }} style={{ flex:1, textAlign:"center", padding:"9px 0", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", background:tab===t?"#fff":"transparent", color:tab===t?"#111":"#888", boxShadow:tab===t?"0 1px 4px rgba(0,0,0,0.12)":"none" }}>
                {t==="hoadon"?"Hoá đơn":"Số điện thoại"}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", padding:"0 20px 80px" }}>
        {tab==="hoadon" && billItems.map(function(item) {
          var notifyOn = !!notifyMap[item.id];
          return (
            <div key={item.id} style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:600, color:"#888", marginBottom:8 }}>{item.category}</div>
              <div style={{ border:"1px solid #eee", borderRadius:14, overflow:"hidden" }}>
                <div onClick={function() { props.onNavigate("billdetail"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f4f4f4", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", border:"2px solid #e0e0e0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#111" }}>{item.name}</div>
                      <div style={{ fontSize:12, color:"#888", marginTop:1 }}>{item.code}</div>
                    </div>
                  </div>
                  <span style={{ fontSize:18, color:"#ccc" }}>›</span>
                </div>
                <div onClick={function() { props.onNavigate("autopay"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid #f4f4f4", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:13, color:"#333" }}>Thanh toán tự động hàng tháng</span>
                    <span style={{ fontSize:12, color:"#aaa" }}>ⓘ</span>
                  </div>
                  {props.autoPay ? <ToggleOn /> : <ToggleOff />}
                </div>
                <div onClick={function() { if(!notifyOn) setShowNotifyFor(item.id); else setNotifyMap(function(m) { var n=Object.assign({},m); n[item.id]=false; return n; }); }}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", cursor:"pointer" }}>
                  <span style={{ fontSize:13, color:"#333" }}>Nhận thông báo nhắc nợ</span>
                  {notifyOn ? <ToggleOn /> : <ToggleOff />}
                </div>
              </div>
            </div>
          );
        })}
        {tab==="sdt" && <SdtTab onTopupPhone={props.onTopup} />}
      </div>
      {showNotifyFor && (
        <NotifySheet onClose={function() { setShowNotifyFor(null); }} onConfirm={function() { setNotifyMap(function(m) { var n=Object.assign({},m); n[showNotifyFor]=true; return n; }); setShowNotifyFor(null); }} />
      )}
    </div>
  );
}

function BillDetailScreen(props) {
  var [notify, setNotify] = useState(false);
  var [showNotify, setShowNotify] = useState(false);
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff" }}>
      <div style={{ padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <span style={{ fontSize:20, color:"#888", cursor:"pointer" }}>🗑</span>
      </div>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", padding:"8px 20px 0" }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", border:"2px solid #e0e0e0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:12 }}>⚡</div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:17, fontWeight:700, color:"#111" }}>EVN Hồ Chí Minh</span>
            <div onClick={function() { props.onNavigate("nickname"); }} style={{ width:34, height:34, borderRadius:10, border:"1.5px solid #e0e0e0", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>✏️</div>
          </div>
        </div>
        <div style={{ height:1, background:"#f0f0f0", marginBottom:16 }} />
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:14, color:"#111", marginBottom:4 }}>PE05000199088</div>
          <div style={{ fontSize:14, fontWeight:600, color:"#111", marginBottom:4 }}>VO THI TUYET SUONG</div>
          <div style={{ fontSize:13, color:"#888", lineHeight:1.5 }}>280 TON THAT THUYET, Phuong Vinh Hoi, Thanh pho Ho Chi Minh</div>
        </div>
        <div style={{ height:1, background:"#f0f0f0", marginBottom:16 }} />
        <div style={{ border:"1px solid #eee", borderRadius:14, overflow:"hidden" }}>
          <div onClick={function() { props.onNavigate("autopay"); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f4f4f4", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:13, color:"#333" }}>Thanh toán tự động hàng tháng</span>
              <span style={{ fontSize:12, color:"#aaa" }}>ⓘ</span>
            </div>
            {props.autoPay ? <ToggleOn /> : <ToggleOff />}
          </div>
          <div style={{ padding:"10px 16px", background:"#fafafa", borderBottom:"1px solid #f4f4f4" }}>
            <span style={{ fontSize:12, color:"#aaa", lineHeight:1.5 }}>Bật để hoá đơn được thanh toán tự động hàng tháng, không lo trễ hạn nhé?</span>
          </div>
          <div onClick={function() { if(!notify) setShowNotify(true); }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", cursor:"pointer" }}>
            <span style={{ fontSize:13, color:"#333" }}>Nhận thông báo nhắc nợ</span>
            {notify ? <ToggleOn /> : <ToggleOff />}
          </div>
        </div>
      </div>
      <div style={{ padding:"12px 20px 20px", background:"#fff", flexShrink:0 }}>
        <div style={{ background:"#111", borderRadius:30, padding:"16px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer" }}>Thanh toán</div>
      </div>
      {showNotify && <NotifySheet onClose={function() { setShowNotify(false); }} onConfirm={function() { setNotify(true); setShowNotify(false); }} />}
    </div>
  );
}

function AutoPayScreen(props) {
  var [schedule, setSchedule] = useState("invoice");
  var [limit, setLimit] = useState("10.000.000đ");
  var [showLimit, setShowLimit] = useState(false);
  var [selectedDay, setSelectedDay] = useState(null);
  var [showDay, setShowDay] = useState(false);
  var [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff" }}>
        <div style={{ padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
          <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
          <span style={{ fontSize:15, fontWeight:700, color:"#111" }}>Đăng ký thanh toán tự động</span>
          <span onClick={props.onBack} style={{ fontSize:20, color:"#888", cursor:"pointer" }}>✕</span>
        </div>
        <div style={{ flex:1, padding:"20px" }}>
          <div style={{ background:"#EAF4FF", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", border:"2px solid #ccc", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>⚡</div>
            <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>EVN Hồ Chí Minh</span>
          </div>
          <div style={{ border:"1px solid #eee", borderRadius:14, overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f4f4f4" }}>
              <span style={{ fontSize:13, color:"#333" }}>Thanh toán tự động hàng tháng</span><ToggleOn />
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px" }}>
              <span style={{ fontSize:13, color:"#333" }}>Nhận thông báo nhắc nợ</span><ToggleOn />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff", position:"relative" }}>
      <div style={{ padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <span style={{ fontSize:15, fontWeight:700, color:"#111" }}>Đăng ký thanh toán tự động</span>
        <span onClick={props.onBack} style={{ fontSize:20, color:"#888", cursor:"pointer" }}>✕</span>
      </div>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", padding:"16px 20px 24px" }}>
        <div style={{ background:"#EAF4FF", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", border:"2px solid #ccc", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>⚡</div>
          <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>EVN Hồ Chí Minh</span>
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#111", marginBottom:12 }}>Thông tin đăng ký</div>
          {[{label:"Mã khách hàng",value:"PE05000199088"},{label:"Tên khách hàng",value:"VÕ THỊ TUYẾT SƯƠNG"},{label:"Địa chỉ",value:"280 TÔN THẤT THUYẾT,\nPhường Vĩnh Hội, TP HCM"},{label:"Số tiền thanh toán",value:"Bằng giá trị hóa đơn"}].map(function(row, i) {
            return (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", paddingBottom:12, marginBottom:12, borderBottom:"1px solid #f4f4f4", gap:16 }}>
                <span style={{ fontSize:13, color:"#888", flexShrink:0 }}>{row.label}</span>
                <span style={{ fontSize:13, fontWeight:500, color:"#111", textAlign:"right", whiteSpace:"pre-line" }}>{row.value}</span>
              </div>
            );
          })}
          <div style={{ fontSize:12, color:"#888", marginBottom:6 }}>Hạn mức thanh toán</div>
          <div onClick={function() { setShowLimit(true); }} style={{ border:"1.5px solid #e0e0e0", borderRadius:10, padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8, cursor:"pointer" }}>
            <span style={{ fontSize:14, fontWeight:500, color:"#111" }}>{limit}</span>
            <span style={{ fontSize:18, color:"#2196F3" }}>⌄</span>
          </div>
        </div>
        <div style={{ border:"1.5px solid #e0e0e0", borderRadius:12, padding:"14px 16px", marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#111", marginBottom:12 }}>Đặt lịch thanh toán</div>
          <div style={{ display:"flex", gap:24, marginBottom:12 }}>
            {[["invoice","Ngày có hóa đơn"],["fixed","Ngày cố định"]].map(function(pair) {
              return (
                <div key={pair[0]} onClick={function() { setSchedule(pair[0]); }} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", border:schedule===pair[0]?"5px solid #e74c3c":"2px solid #ccc", background:"#fff", flexShrink:0 }} />
                  <span style={{ fontSize:13, color:"#111" }}>{pair[1]}</span>
                </div>
              );
            })}
          </div>
          {schedule==="fixed" && (
            <div>
              <div onClick={function() { setShowDay(true); }} style={{ border:"1.5px solid #e0e0e0", borderRadius:10, padding:"11px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", marginBottom:6 }}>
                <span style={{ fontSize:13, color:selectedDay?"#111":"#bbb" }}>{selectedDay?("Ngày "+selectedDay+" hàng tháng"):"Chọn ngày thanh toán"}</span>
                <span style={{ fontSize:16 }}>📅</span>
              </div>
            </div>
          )}
          {schedule==="invoice" && <div style={{ fontSize:12, color:"#888", lineHeight:1.5 }}>Hệ thống sẽ tự động thanh toán vào ngày có phát sinh hóa đơn mới</div>}
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ border:"2px solid #111", borderRadius:10, padding:"12px 16px", display:"inline-block" }}>
            <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>Số dư ví</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"12px 20px 20px", background:"#fff", flexShrink:0 }}>
        <div onClick={function() { setConfirmed(true); if(props.onConfirmed) props.onConfirmed(); }} style={{ background:"#2196F3", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Xác nhận đăng ký</div>
      </div>
      {showLimit && <LimitSheet current={limit} onSelect={function(v) { setLimit(v||"10.000.000đ"); setShowLimit(false); }} onClose={function() { setShowLimit(false); }} />}
      {showDay && <DatePickerSheet current={selectedDay} onSelect={function(d) { setSelectedDay(d); setShowDay(false); }} onClose={function() { setShowDay(false); }} />}
    </div>
  );
}

function NicknameScreen(props) {
  var [name, setName] = useState("EVN");
  var [showKb, setShowKb] = useState(true);
  var suggestions = ["Điện nhà mình","Nhà mình"];
  var rows = [["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["⇧","z","x","c","v","b","n","m","⌫"]];
  function handleKey(k) {
    if(k==="⌫") setName(function(n) { return n.slice(0,-1); });
    else if(k==="⇧") return;
    else if(k==="Xong") setShowKb(false);
    else setName(function(n) { return n+k; });
  }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff" }}>
      <div style={{ flex:1, padding:"8px 24px 0" }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <div style={{ marginTop:20, lineHeight:1.6 }}>
          <div style={{ fontSize:22, fontWeight:700, color:"#111" }}>Lưu hoá đơn này với tên gợi nhớ</div>
          <div onClick={function() { setShowKb(true); }} style={{ fontSize:22, fontWeight:700, color:"#2196F3", cursor:"text", marginTop:4 }}>
            {name||""}{showKb && <span style={{ animation:"blink 1s infinite" }}>|</span>}
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:24, flexWrap:"wrap" }}>
          {suggestions.map(function(s) { return <div key={s} onClick={function() { setName(s); }} style={{ padding:"8px 16px", borderRadius:20, border:"1.5px solid #ddd", fontSize:13, color:"#333", cursor:"pointer" }}>{s}</div>; })}
        </div>
      </div>
      {showKb && (
        <div style={{ background:"#D1D5DB", paddingTop:8, paddingBottom:4, flexShrink:0 }}>
          {rows.map(function(row, ri) {
            return (
              <div key={ri} style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:6 }}>
                {row.map(function(k) { return <button key={k} onClick={function() { handleKey(k); }} style={{ width:k==="⇧"||k==="⌫"?42:30, height:42, borderRadius:5, border:"none", background:k==="⇧"||k==="⌫"?"#ADB5BD":"#fff", color:"#111", fontSize:16, cursor:"pointer" }}>{k==="⇧"?"↑":k}</button>; })}
              </div>
            );
          })}
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:6 }}>
            <button style={{ width:42, height:42, borderRadius:5, border:"none", background:"#ADB5BD", fontSize:12, cursor:"pointer" }}>123</button>
            <button style={{ flex:1, maxWidth:160, height:42, borderRadius:5, border:"none", background:"#fff", fontSize:14, cursor:"pointer" }}>dấu cách</button>
            <button onClick={function() { handleKey("Xong"); }} style={{ width:72, height:42, borderRadius:5, border:"none", background:"#2196F3", color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer" }}>Xong</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ContractScreen(props) {
  var [code, setCode] = useState(props.prefillCode || "");
  var [tab, setTab] = useState("contract");
  var [showKb, setShowKb] = useState(!props.prefillCode);
  var rows = [["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["⇧","Z","X","C","V","B","N","M","⌫"]];
  function handleKey(k) {
    if(k==="⌫") setCode(function(c) { return c.slice(0,-1); });
    else if(k==="⇧") return;
    else if(k==="Xong") setShowKb(false);
    else setCode(function(c) { return c+k; });
  }
  var displayLabel = billTypeLabel[props.billType]||props.billType;
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff" }}>
      <div style={{ flex:1, padding:"8px 24px 0", overflowY:"auto" }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <div style={{ marginTop:16, lineHeight:1.7 }}>
          <span style={{ fontSize:22, fontWeight:700, color:"#111" }}>Thanh toán </span>
          <span style={{ fontSize:22, fontWeight:700, color:"#2196F3" }}>{displayLabel}</span><br/>
          <span style={{ fontSize:22, fontWeight:700, color:"#111" }}>cho </span>
          {props.provider ? <span onClick={props.onChangeProvider} style={{ fontSize:22, fontWeight:700, color:"#2196F3", cursor:"pointer" }}>{props.provider}</span> : <span onClick={props.onChangeProvider} style={{ fontSize:22, fontWeight:400, color:"#ccc", cursor:"pointer" }}>nhà cung cấp nào?</span>}<br/>
          <span style={{ fontSize:22, fontWeight:700, color:"#111" }}>{tab==="cccd"?"số ":"mã "}</span>
          <span onClick={function() { setShowKb(true); }} style={{ fontSize:22, fontWeight:code?700:400, color:code?"#111":"#ccc", cursor:"text" }}>{code||(tab==="cccd"?"số CCCD":"mã hợp đồng")}</span>
        </div>
        {props.inputMode==="both"&&props.provider&&(
          <div style={{ marginTop:20, display:"flex", gap:8 }}>
            {[["contract","Mã hợp đồng"],["cccd","Số CCCD"]].map(function(pair) {
              return (
                <div key={pair[0]} onClick={function() { setTab(pair[0]); setCode(""); setShowKb(true); }} style={{ flex:1, padding:"10px 12px", borderRadius:10, border:tab===pair[0]?"1.5px solid #2196F3":"1.5px solid #ddd", fontSize:12, fontWeight:600, color:tab===pair[0]?"#2196F3":"#888", textAlign:"center", cursor:"pointer", background:tab===pair[0]?"#EAF4FF":"#fff" }}>{pair[1]}</div>
              );
            })}
          </div>
        )}
      </div>
      {!showKb && (
        <div style={{ padding:"12px 24px 8px", background:"#fff" }}>
          <div onClick={function() { if(code) props.onContinue(code); }} style={{ background:code?"#2196F3":"#c8c8c8", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:16, cursor:code?"pointer":"not-allowed" }}>Tiếp tục</div>
        </div>
      )}
      {showKb && (
        <div style={{ background:"#D1D5DB", paddingTop:8, paddingBottom:4, flexShrink:0 }}>
          {rows.map(function(row, ri) {
            return (
              <div key={ri} style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:6 }}>
                {row.map(function(k) { return <button key={k} onClick={function() { handleKey(k); }} style={{ width:k==="⇧"||k==="⌫"?42:32, height:42, borderRadius:5, border:"none", background:k==="⇧"||k==="⌫"?"#ADB5BD":"#fff", color:"#111", fontSize:17, cursor:"pointer" }}>{k==="⇧"?"↑":k}</button>; })}
              </div>
            );
          })}
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:6 }}>
            <button style={{ width:42, height:42, borderRadius:5, border:"none", background:"#ADB5BD", fontSize:12, cursor:"pointer" }}>123</button>
            <button style={{ flex:1, maxWidth:170, height:42, borderRadius:5, border:"none", background:"#fff", fontSize:14, cursor:"pointer" }}>dấu cách</button>
            <button onClick={function() { handleKey("Xong"); }} style={{ width:80, height:42, borderRadius:5, border:"none", background:"#ADB5BD", fontSize:15, cursor:"pointer" }}>Xong</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TopupScreen(props) {
  var prefillPhone   = props.prefillPhone;
  var prefillCarrier = props.prefillCarrier;
  var [selAmt, setSelAmt] = useState(10000);
  var [phone, setPhone] = useState(prefillPhone || "0338451218");
  var [carrierId, setCarrierId] = useState(prefillCarrier || "viettel");
  var [sheet, setSheet] = useState(null);
  var [editPhone, setEditPhone] = useState(false);
  var [tempPhone, setTempPhone] = useState(prefillPhone || "0338451218");
  var [showPay, setShowPay] = useState(false);
  var amounts = [10000,20000,30000,50000,100000,200000,300000,500000];
  var cur = carriers.find(function(c) { return c.id===carrierId; }) || carriers[0];
  var numRows = [["1","2","3"],["4","5","6"],["7","8","9"],["*","0","⌫"]];
  function handleNum(k) {
    if(k==="⌫") setTempPhone(function(p) { return p.slice(0,-1); });
    else setTempPhone(function(p) { return p.length<11?p+k:p; });
  }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff", position:"relative" }}>
      <div style={{ flex:1, padding:"8px 20px 0", overflowY:"auto" }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <div style={{ marginTop:12, marginBottom:20 }}><span style={{ fontSize:22, fontWeight:700, color:"#111" }}>Nạp </span><span style={{ fontSize:22, fontWeight:700, color:"#2196F3" }}>tiền điện thoại</span></div>
        <div style={{ border:"1px solid #e0e0e0", borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div onClick={function() { setSheet("carrier"); }} style={{ background:cur.color, borderRadius:6, padding:"4px 8px", cursor:"pointer" }}><span style={{ color:"#fff", fontSize:10, fontWeight:700 }}>{cur.label}</span></div>
            <div onClick={function() { setTempPhone(phone); setEditPhone(true); }} style={{ cursor:"pointer" }}>
              <div style={{ fontSize:11, color:"#aaa" }}>Số của tôi</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#111" }}>{phone}</div>
            </div>
          </div>
          <div onClick={function() { setSheet("contact"); }} style={{ width:32, height:32, borderRadius:8, background:"#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>👤</div>
        </div>
        <div style={{ fontSize:16, fontWeight:700, color:"#111", marginBottom:12 }}>số tiền</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {amounts.map(function(a) {
            var isSel = a===selAmt;
            return (
              <div key={a} onClick={function() { setSelAmt(a); }} style={{ border:isSel?"1.5px solid #2196F3":"1.5px solid #e0e0e0", borderRadius:10, padding:"12px 8px", textAlign:"center", cursor:"pointer", position:"relative", background:isSel?"#EAF4FF":"#fff" }}>
                {isSel&&<div style={{ position:"absolute", top:-1, right:-1, width:18, height:18, background:"#2196F3", borderRadius:"0 8px 0 8px", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:10 }}>✓</span></div>}
                <span style={{ fontSize:13, fontWeight:600, color:isSel?"#2196F3":"#111" }}>{fmt(a)}</span>
              </div>
            );
          })}
        </div>
      </div>
      {!editPhone && (
        <div style={{ padding:"12px 20px 16px", background:"#fff" }}>
          <div onClick={function() { setShowPay(true); }} style={{ background:"#2196F3", borderRadius:14, padding:"15px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Nạp ngay · {fmt(selAmt)}</div>
        </div>
      )}
      {editPhone && (
        <div style={{ background:"#fff", borderTop:"1px solid #f0f0f0", paddingBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px 6px" }}>
            <span style={{ fontSize:18, fontWeight:700, color:"#111", letterSpacing:2 }}>{tempPhone||"Nhập số..."}</span>
            <span onClick={function() { setPhone(tempPhone); setEditPhone(false); }} style={{ fontSize:14, fontWeight:700, color:"#2196F3", cursor:"pointer" }}>Xong</span>
          </div>
          <div style={{ padding:"0 20px" }}>
            {numRows.map(function(row, ri) {
              return (
                <div key={ri} style={{ display:"flex", gap:10, marginBottom:8 }}>{row.map(function(k) { return <div key={k} onClick={function() { handleNum(k); }} style={{ flex:1, height:44, borderRadius:10, background:"#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, cursor:"pointer" }}>{k}</div>; })}</div>
              );
            })}
          </div>
        </div>
      )}
      {sheet==="carrier" && <CarrierSheet current={carrierId} onSelect={function(c) { setCarrierId(c.id); setSheet(null); }} onClose={function() { setSheet(null); }} />}
      {sheet==="contact" && <ContactSheet onSelect={function(c) { setPhone(c.phone); setSheet(null); }} onClose={function() { setSheet(null); }} />}
      {showPay && <PaymentSheet type="topup" contractCode={phone} onClose={function() { setShowPay(false); }} onConfirm={function() { setShowPay(false); if(props.onSuccess) props.onSuccess(); }} />}
    </div>
  );
}

function BuyDataScreen(props) {
  var [selected, setSelected] = useState("dp2");
  var [qty, setQty] = useState(1);
  var [filter, setFilter] = useState({sort:null,cycle:null,gb:null});
  var [showFilter, setShowFilter] = useState(false);
  var [carrierTab, setCarrierTab] = useState("viettel");
  var [phone, setPhone] = useState("0338451218");
  var [tempPhone, setTempPhone] = useState("0338451218");
  var [editPhone, setEditPhone] = useState(false);
  var [sheet, setSheet] = useState(null);
  var [showPay, setShowPay] = useState(false);
  var tabCarriers = ["mobifone","viettel","vinaphone"];
  var selPkg = null;
  dataPackages.forEach(function(g) { g.items.forEach(function(it) { if(it.id===selected) selPkg=it; }); });
  var total = selPkg?selPkg.price*qty:0;
  var curCarrier = carriers.find(function(c) { return c.id===carrierTab; }) || carriers[0];
  var numRows = [["1","2","3"],["4","5","6"],["7","8","9"],["*","0","⌫"]];
  function handleNum(k) {
    if(k==="⌫") setTempPhone(function(p) { return p.slice(0,-1); });
    else setTempPhone(function(p) { return p.length<11?p+k:p; });
  }
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff", minHeight:0 }}>
      <div style={{ flex:1, minHeight:0, overflowY:"scroll" }}>
        <div style={{ padding:"8px 20px 4px" }}><span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span></div>
        <div style={{ padding:"2px 20px 12px" }}><span style={{ fontSize:22, fontWeight:700, color:"#111" }}>Mua </span><span style={{ fontSize:22, fontWeight:700, color:"#2196F3" }}>thẻ data</span></div>

        {/* Phone input row */}
        <div style={{ margin:"0 20px 14px", border:"1px solid #e0e0e0", borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div onClick={function() { setSheet("carrier"); }} style={{ background:curCarrier.color, borderRadius:6, padding:"4px 8px", cursor:"pointer" }}>
              <span style={{ color:"#fff", fontSize:10, fontWeight:700 }}>{curCarrier.label}</span>
            </div>
            <div onClick={function() { setTempPhone(phone); setEditPhone(true); }} style={{ cursor:"pointer" }}>
              <div style={{ fontSize:11, color:"#aaa" }}>Số điện thoại</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#111" }}>{phone}</div>
            </div>
          </div>
          <div onClick={function() { setSheet("contact"); }} style={{ width:32, height:32, borderRadius:8, background:"#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>👤</div>
        </div>
        <div style={{ display:"flex", padding:"0 20px", borderBottom:"1px solid #f0f0f0" }}>
          {tabCarriers.map(function(c) {
            return (
              <div key={c} onClick={function() { setCarrierTab(c); }} style={{ position:"relative", padding:"8px 14px", fontSize:13, fontWeight:600, color:c===carrierTab?"#2196F3":"#888", borderBottom:c===carrierTab?"2px solid #2196F3":"2px solid transparent", cursor:"pointer", marginBottom:-1 }}>
                {c==="mobifone"&&<span style={{ position:"absolute", top:2, right:0, background:"#e74c3c", borderRadius:10, padding:"1px 4px", fontSize:7, color:"#fff" }}>BT</span>}
                {c.charAt(0).toUpperCase()+c.slice(1)}
              </div>
            );
          })}
        </div>
        <div style={{ padding:"0 20px 12px" }}>
          {dataPackages.map(function(group, gi) {
            return (
              <div key={group.group} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#888" }}>{group.group}</div>
                  {gi===0&&<div onClick={function() { setShowFilter(true); }} style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>🔽</div>}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                  {group.items.map(function(it) {
                    var isSel = it.id===selected;
                    return (
                      <div key={it.id} onClick={function() { setSelected(it.id); }} style={{ border:isSel?"1.5px solid #2196F3":"1.5px solid #e8e8e8", borderRadius:12, padding:"12px 14px", cursor:"pointer", background:isSel?"#EAF4FF":"#fff", position:"relative" }}>
                        {it.hot&&<div style={{ position:"absolute", top:-1, right:-1, background:"linear-gradient(135deg,#ff6b9d,#c44aff)", borderRadius:"0 10px 0 10px", padding:"2px 8px" }}><span style={{ color:"#fff", fontSize:9, fontWeight:700 }}>HOT</span></div>}
                        <div style={{ fontSize:14, fontWeight:700, color:isSel?"#2196F3":"#111" }}>{it.gb}</div>
                        {it.sub&&<div style={{ fontSize:10, color:"#888", marginTop:1 }}>{it.sub}</div>}
                        <div style={{ fontSize:13, fontWeight:600, color:isSel?"#2196F3":"#444", marginTop:3 }}>{fmt(it.price)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"10px 20px 14px", background:"#fff", borderTop:"1px solid #f0f0f0", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#111" }}>Số lượng</span>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div onClick={function() { setQty(function(q) { return Math.max(1,q-1); }); }} style={{ width:28, height:28, borderRadius:"50%", border:"1.5px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, color:"#555" }}>−</div>
            <span style={{ fontSize:15, fontWeight:700, minWidth:16, textAlign:"center" }}>{qty}</span>
            <div onClick={function() { setQty(function(q) { return q+1; }); }} style={{ width:28, height:28, borderRadius:"50%", background:"#2196F3", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:"#fff" }}>+</div>
          </div>
        </div>
        <div onClick={function() { setShowPay(true); }} style={{ background:"#2196F3", borderRadius:14, padding:"14px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Mua ngay · {fmt(total)}</div>
      </div>
      {editPhone && (
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid #f0f0f0", paddingBottom:8, zIndex:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px 6px" }}>
            <span style={{ fontSize:18, fontWeight:700, color:"#111", letterSpacing:2 }}>{tempPhone||"Nhập số..."}</span>
            <span onClick={function() { setPhone(tempPhone); setEditPhone(false); }} style={{ fontSize:14, fontWeight:700, color:"#2196F3", cursor:"pointer" }}>Xong</span>
          </div>
          <div style={{ padding:"0 20px" }}>
            {numRows.map(function(row, ri) {
              return (
                <div key={ri} style={{ display:"flex", gap:10, marginBottom:8 }}>
                  {row.map(function(k) { return <div key={k} onClick={function() { handleNum(k); }} style={{ flex:1, height:44, borderRadius:10, background:"#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, cursor:"pointer" }}>{k}</div>; })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {sheet==="carrier" && <CarrierSheet current={carrierTab} onSelect={function(c) { setCarrierTab(c.id); setSheet(null); }} onClose={function() { setSheet(null); }} />}
      {sheet==="contact" && <ContactSheet onSelect={function(c) { setPhone(c.phone); setSheet(null); }} onClose={function() { setSheet(null); }} />}
      {showPay && <PaymentSheet type="topup" contractCode={phone} onClose={function() { setShowPay(false); }} onConfirm={function() { setShowPay(false); if(props.onBack) props.onBack(); }} />}
      {showFilter&&<FilterSheet filter={filter} onApply={function(f) { setFilter(f); setShowFilter(false); }} onClose={function() { setShowFilter(false); }} />}
    </div>
  );
}

function BuyCardScreen(props) {
  var [selected, setSelected] = useState(10000);
  var [qty, setQty] = useState(1);
  var [carrierTab, setCarrierTab] = useState("viettel");
  var [showInsufficient, setShowInsufficient] = useState(false);
  var amounts = [10000,20000,30000,50000,100000,200000,300000,500000];
  var tabCarriers = [{id:"viettel",label:"viettel",color:"#e8001d"},{id:"mobifone",label:"mobifone",color:"#0070c0"},{id:"vinaphone",label:"vinaphone",color:"#0000cc"},{id:"vietnamobile",label:"vietnamobile",color:"#00a859"},{id:"wintel",label:"WiNtel",color:"#ff6600"}];
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#fff", minHeight:0 }}>
      <div style={{ flex:1, minHeight:0, overflowY:"scroll" }}>
        <div style={{ padding:"8px 20px 4px" }}><span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span></div>
        <div style={{ padding:"2px 20px 14px" }}><span style={{ fontSize:22, fontWeight:700, color:"#111" }}>Mua </span><span style={{ fontSize:22, fontWeight:700, color:"#2196F3" }}>thẻ điện thoại</span></div>
        <div style={{ display:"flex", overflowX:"auto", padding:"0 20px", gap:10, marginBottom:16, scrollbarWidth:"none" }}>
          {tabCarriers.map(function(c) {
            return (
              <div key={c.id} onClick={function() { setCarrierTab(c.id); }} style={{ flexShrink:0, minWidth:72, padding:"10px 14px", borderRadius:14, border:c.id===carrierTab?"2px solid #2196F3":"1.5px solid #e8e8e8", background:"#fff", cursor:"pointer", textAlign:"center" }}><span style={{ fontSize:12, fontWeight:700, color:c.color }}>{c.label}</span></div>
            );
          })}
        </div>
        <div style={{ padding:"0 20px 12px" }}><span style={{ fontSize:18, fontWeight:700, color:"#111" }}>số tiền</span></div>
        <div style={{ padding:"0 20px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {amounts.map(function(a) {
            var isSel = a===selected;
            return (
              <div key={a} onClick={function() { setSelected(a); }} style={{ border:isSel?"1.5px solid #2196F3":"1.5px solid #e0e0e0", borderRadius:10, padding:"14px 8px", textAlign:"center", cursor:"pointer", position:"relative", background:isSel?"#EAF4FF":"#fff" }}>
                {isSel&&<div style={{ position:"absolute", top:-1, right:-1, width:18, height:18, background:"linear-gradient(135deg,#ff6b9d,#c44aff)", borderRadius:"0 8px 0 8px", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:10 }}>✓</span></div>}
                <span style={{ fontSize:13, fontWeight:600, color:isSel?"#2196F3":"#111" }}>{fmt(a)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"10px 20px 14px", background:"#fff", borderTop:"1px solid #f0f0f0", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#111" }}>Số lượng</span>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div onClick={function() { setQty(function(q) { return Math.max(1,q-1); }); }} style={{ width:28, height:28, borderRadius:"50%", border:"1.5px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, color:"#555" }}>−</div>
            <span style={{ fontSize:15, fontWeight:700, minWidth:16, textAlign:"center" }}>{qty}</span>
            <div onClick={function() { setQty(function(q) { return q+1; }); }} style={{ width:28, height:28, borderRadius:"50%", background:"#2196F3", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:"#fff" }}>+</div>
          </div>
        </div>
        <div onClick={function() { setShowInsufficient(true); }} style={{ background:"#2196F3", borderRadius:14, padding:"14px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>Mua ngay · {fmt(selected*qty)}</div>
      </div>
      {showInsufficient && <InsufficientBalanceDialog onTopup={function() { setShowInsufficient(false); }} onBack={function() { setShowInsufficient(false); }} />}
    </div>
  );
}

function BillInfoScreen(props) {
  var [showPay, setShowPay] = useState(false);
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#f5f5f5", position:"relative" }}>
      <div style={{ background:"#fff", padding:"12px 20px", display:"flex", alignItems:"center", gap:16, borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <span style={{ fontSize:16, fontWeight:700, color:"#111", flex:1, textAlign:"center", marginRight:22 }}>Thông tin hóa đơn</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        <div style={{ background:"#fff", borderRadius:16, padding:"16px", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:44, height:44, borderRadius:10, background:"#e8f4ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>⚡</div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:"#111" }}>Điện lực Việt Nam</div>
              <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{props.contractCode}</div>
            </div>
          </div>
        </div>
        <div style={{ background:"#fff", borderRadius:16, padding:"4px 16px" }}>
          {[{label:"Tên khách hàng",value:"NGUYEN VAN A"},{label:"Kỳ thanh toán",value:"Tháng 11/2025"},{label:"Số tiền",value:"5.002.000 đ"},{label:"Trạng thái",value:"Chưa thanh toán",status:true}].map(function(row, i) {
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", borderBottom:i<3?"1px solid #f4f4f4":"none" }}>
                <span style={{ fontSize:13, color:"#888" }}>{row.label}</span>
                {row.status ? <span style={{ fontSize:13, fontWeight:600, color:"#f0a500", background:"#fff8e6", borderRadius:20, padding:"3px 12px" }}>{row.value}</span> : <span style={{ fontSize:13, fontWeight:700, color:"#111" }}>{row.value}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"12px 20px 20px", background:"#fff", flexShrink:0 }}>
        <div onClick={function() { setShowPay(true); }} style={{ background:"#111", borderRadius:30, padding:"16px", textAlign:"center", color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer" }}>Thanh toán</div>
      </div>
      {showPay && <PaymentSheet contractCode={props.contractCode} onClose={function() { setShowPay(false); }} onConfirm={function() { setShowPay(false); props.onConfirm(); }} />}
    </div>
  );
}

function TxDetailScreen(props) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#f5f5f5" }}>
      <div style={{ background:"#fff", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
        <span onClick={props.onBack} style={{ fontSize:22, color:"#111", cursor:"pointer" }}>←</span>
        <span style={{ fontSize:15, fontWeight:700, color:"#111" }}>Chi tiết giao dịch</span>
        <div onClick={props.onHome} style={{ width:32, height:32, borderRadius:8, background:"#f4f4f4", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>🏠</div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
        <div style={{ background:"#fff", borderRadius:16, padding:"20px 16px", marginBottom:14, textAlign:"center" }}>
          <div style={{ fontSize:26, fontWeight:800, color:"#111", marginBottom:6 }}>-1.000.000 đ</div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#e8f8ee", borderRadius:20, padding:"4px 12px" }}>
            <span style={{ color:"#27ae60" }}>✓</span>
            <span style={{ fontSize:12, fontWeight:600, color:"#27ae60" }}>Thành công</span>
          </div>
        </div>
        <div style={{ background:"#fff", borderRadius:16, padding:"4px 16px" }}>
          {[{label:"Thời gian",value:"11:15 · 10/11/2025"},{label:"Mã giao dịch",value:"VP129210380414"},{label:"Số tiền",value:"501.500 đ"},{label:"Phí dịch vụ",value:"Miễn phí"}].map(function(row, i) {
            return (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"13px 0", borderBottom:i<3?"1px solid #f4f4f4":"none" }}>
                <span style={{ fontSize:12, color:"#999" }}>{row.label}</span>
                <span style={{ fontSize:12, fontWeight:500, color:"#111" }}>{row.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <SavedBillBanner onQuanLy={props.onQuanLy} type={props.type} />
      <div style={{ padding:"12px 20px 20px", background:"#fff", display:"flex", gap:10, flexShrink:0 }}>
        {props.type==="topup" ? (
          <>
            <div onClick={props.onTopup} style={{ flex:1, borderRadius:30, padding:"15px", textAlign:"center", border:"1.5px solid #ddd", fontWeight:600, fontSize:14, color:"#111", cursor:"pointer" }}>Nạp thêm</div>
            <div onClick={props.onHome} style={{ flex:2, borderRadius:30, padding:"15px", textAlign:"center", background:"#111", fontWeight:700, fontSize:14, color:"#fff", cursor:"pointer" }}>Về trang chủ</div>
          </>
        ) : (
          <>
            <div style={{ flex:1, borderRadius:30, padding:"15px", textAlign:"center", border:"1.5px solid #ddd", fontWeight:600, fontSize:14, color:"#111", cursor:"pointer" }}>Chia sẻ</div>
            <div onClick={props.onRepay} style={{ flex:2, borderRadius:30, padding:"15px", textAlign:"center", background:"#111", fontWeight:700, fontSize:14, color:"#fff", cursor:"pointer" }}>Thanh toán lại</div>
          </>
        )}
      </div>
    </div>
  );
}

function TxResultScreen(props) {
  var [showDetail, setShowDetail] = useState(false);
  if(showDetail) return <TxDetailScreen onBack={function() { setShowDetail(false); }} onHome={props.onHome} onQuanLy={props.onQuanLy} type={props.type} onTopup={props.onTopup} onRepay={props.onRepay} />;
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", fontFamily:"'Segoe UI',sans-serif", background:"#1a1a2e" }}>
      <div style={{ padding:"12px 20px 20px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15 }}>v-smart pay</span>
      </div>
      <div style={{ flex:1, minHeight:0, background:"#f5f5f5", borderRadius:"24px 24px 0 0", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 0" }}>
          <div style={{ background:"#fff", borderRadius:16, padding:"20px 16px", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:"#27ae60", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:14 }}>✓</span></div>
              <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>Giao dịch thành công</span>
            </div>
            <div style={{ fontSize:28, fontWeight:800, color:"#111" }}>1.000.000 đ</div>
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:"4px 16px", marginBottom:14 }}>
            {[{label:"Dịch vụ",value:"Thanh toán điện",link:false},{label:"Mã giao dịch",value:"TXN12345231321",link:true},{label:"Thời gian",value:"16:51 - 15/11/2025",link:false}].map(function(row, i) {
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0", borderBottom:i<2?"1px solid #f4f4f4":"none" }}>
                  <span style={{ fontSize:12, color:"#999" }}>{row.label}</span>
                  {row.link ? <div onClick={function() { setShowDetail(true); }} style={{ display:"flex", alignItems:"center", gap:4, cursor:"pointer" }}><span style={{ fontSize:12, fontWeight:600, color:"#2196F3", textDecoration:"underline" }}>{row.value}</span><span style={{ fontSize:12, color:"#2196F3" }}>›</span></div> : <span style={{ fontSize:12, fontWeight:500, color:"#111" }}>{row.value}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <SavedBillBanner onQuanLy={props.onQuanLy} type={props.type} />
        <div style={{ padding:"12px 20px 20px", background:"#fff", borderTop:"1px solid #f0f0f0", display:"flex", gap:10, flexShrink:0 }}>
          {props.type==="topup" ? (
            <>
              <div onClick={props.onTopup} style={{ flex:1, borderRadius:30, padding:"14px", textAlign:"center", border:"1.5px solid #ddd", fontWeight:600, fontSize:14, color:"#111", cursor:"pointer" }}>Nạp thêm</div>
              <div onClick={props.onHome} style={{ flex:2, borderRadius:30, padding:"14px", textAlign:"center", background:"#111", fontWeight:700, fontSize:14, color:"#fff", cursor:"pointer" }}>Về trang chủ</div>
            </>
          ) : (
            <>
              <div style={{ flex:1, borderRadius:30, padding:"14px", textAlign:"center", border:"1.5px solid #ddd", fontWeight:600, fontSize:14, color:"#111", cursor:"pointer" }}>Chia sẻ</div>
              <div onClick={props.onHome} style={{ flex:2, borderRadius:30, padding:"14px", textAlign:"center", background:"#111", fontWeight:700, fontSize:14, color:"#fff", cursor:"pointer" }}>Về trang chủ</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var [screen, setScreen] = useState("home");
  var [tapped, setTapped] = useState(null);
  var [activeService, setActiveService] = useState(null);
  var [selectedProvider, setSelectedProvider] = useState(null);
  var [inputMode, setInputMode] = useState("contract");
  var [showSheet, setShowSheet] = useState(false);
  var [contractCode, setContractCode] = useState("");
  var [autoPay, setAutoPay] = useState(false);
  var [fastPayBill, setFastPayBill] = useState(null);
  var [txType, setTxType] = useState("bill");
  var [quanLyInitTab, setQuanLyInitTab] = useState("hoadon");
  var [topupPrefill, setTopupPrefill] = useState(null);
  var [homeTab, setHomeTab] = useState(null);

  function handleServiceTap(id) {
    setTapped(id);
    setTimeout(function() {
      setTapped(null);
      if(id==="topup")   { setTopupPrefill(null); setScreen("topup");   return; }
      if(id==="data")    { setScreen("buydata");  return; }
      if(id==="buycard") { setScreen("buycard");  return; }
      var cfg = serviceConfig[id];
      if(!cfg) return;
      var svc = { id:id, billType:cfg.billType, provider:cfg.provider, fixed:cfg.fixed, inputMode:cfg.inputMode };
      setActiveService(svc);
      setSelectedProvider(cfg.fixed?cfg.provider:null);
      setInputMode(cfg.inputMode||"contract");
      setContractCode("");
      setShowSheet(!cfg.fixed);
      setScreen("contract");
    }, 200);
  }

  function handleProviderSelect(p) { setSelectedProvider(p.name); setInputMode(p.inputMode||"contract"); setShowSheet(false); }
  function handleBack() { setScreen("home"); setShowSheet(false); setSelectedProvider(null); }

  function handleTopupPhone(info) {
    setTopupPrefill(info);
    setScreen("topup");
  }

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#e0e0e0", padding:24 }}>
      <div style={{ width:375, height:780, background:"#fff", borderRadius:48, boxShadow:"0 32px 80px rgba(0,0,0,0.35), inset 0 0 0 2px #ccc", overflow:"hidden", display:"flex", flexDirection:"column", position:"relative" }}>
        <StatusBar />
        {screen==="home" && (
          <HomeScreen
            onTap={handleServiceTap}
            tapped={tapped}
            onFastPay={function(bill,amt) { setFastPayBill({bill:bill,amt:amt}); }}
            onNavigate={setScreen}
            autoPay={autoPay}
            onHistory={function() { setScreen("history"); }}
            onTopupPhone={handleTopupPhone}
            initTab={homeTab}
            onTabShown={function() { setHomeTab(null); }}
          />
        )}
        {screen==="history"    && <HistoryScreen onBack={function() { setScreen("home"); }} />}
        {screen==="quanly"     && <QuanLyScreen onBack={function() { setScreen("home"); }} onNavigate={setScreen} autoPay={autoPay} initTab={quanLyInitTab} onTopup={handleTopupPhone} />}
        {screen==="billdetail" && <BillDetailScreen onBack={function() { setScreen("quanly"); }} onNavigate={setScreen} autoPay={autoPay} />}
        {screen==="autopay"    && <AutoPayScreen onBack={function() { setScreen("billdetail"); }} onConfirmed={function() { setAutoPay(true); }} />}
        {screen==="nickname"   && <NicknameScreen onBack={function() { setScreen("billdetail"); }} />}
        {screen==="topup" && (
          <TopupScreen
            onBack={function() { setTopupPrefill(null); setScreen("home"); }}
            onSuccess={function() { setTopupPrefill(null); setTxType("topup"); setScreen("txresult"); }}
            prefillPhone={topupPrefill ? topupPrefill.phone : null}
            prefillCarrier={topupPrefill ? topupPrefill.carrierId : null}
          />
        )}
        {screen==="buydata"  && <BuyDataScreen onBack={function() { setScreen("home"); }} />}
        {screen==="buycard"  && <BuyCardScreen onBack={function() { setScreen("home"); }} />}
        {screen==="contract" && activeService && (
          <ContractScreen onBack={handleBack} billType={activeService.billType} provider={selectedProvider} inputMode={inputMode} onChangeProvider={function() { setShowSheet(true); }} onContinue={function(code) { setContractCode(code); setScreen("billinfo"); }} prefillCode={contractCode} />
        )}
        {screen==="billinfo" && <BillInfoScreen onBack={function() { setScreen("contract"); }} contractCode={contractCode} onConfirm={function() { setTxType("bill"); setScreen("txresult"); }} />}

        {screen==="txresult" && <TxResultScreen onHome={function() { setScreen("home"); }} type={txType} onTopup={function() { setTopupPrefill(null); setScreen("topup"); }} onRepay={function() { setShowSheet(false); setScreen("contract"); }} onQuanLy={function() { setHomeTab(txType==="topup"?"sdt":"hoadon"); setScreen("home"); }} />}
        {(showSheet&&activeService) && (
          <ProviderSheet serviceId={activeService.id} billType={activeService.billType} onSelect={handleProviderSelect} onClose={function() { setShowSheet(false); if(!selectedProvider) setScreen("home"); }} />
        )}
        {fastPayBill && (
          <PaymentSheet contractCode={fastPayBill.bill.code} onClose={function() { setFastPayBill(null); }} onConfirm={function() { setFastPayBill(null); setTxType("bill"); setScreen("txresult"); }} />
        )}
        <div style={{ height:34, display:"flex", alignItems:"center", justifyContent:"center", background:"#fff", flexShrink:0 }}>
          <div style={{ width:120, height:5, background:"#ddd", borderRadius:10 }} />
        </div>
      </div>
      <style>{"@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}"}</style>
    </div>
  );
}
