"use client"

import * as React from "react"
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Gift,
  Info,
  Mail,
  Moon,
  Search,
  Send,
  Settings,
  Shield,
  Sun,
  Trash2,
  User,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { TextField } from "@/components/ui/text-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/ui/header"
import { FeedbackState } from "@/components/ui/feedback-state"
import { ToastBar } from "@/components/ui/toast-bar"
import { InformMessage } from "@/components/ui/inform-message"
import { Dialog } from "@/components/ui/dialog"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { ItemList, ItemListItem } from "@/components/ui/item-list"

/* ── Section IDs ─────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "button",        label: "Button" },
  { id: "button-group",  label: "ButtonGroup" },
  { id: "textfield",     label: "TextField" },
  { id: "checkbox",      label: "Checkbox" },
  { id: "header",        label: "Header" },
  { id: "toast",         label: "ToastBar" },
  { id: "inform",        label: "InformMessage" },
  { id: "feedback",      label: "FeedbackState" },
  { id: "itemlist",      label: "ItemList" },
  { id: "dialog",        label: "Dialog" },
  { id: "bottomsheet",   label: "BottomSheet" },
]

export default function ShowcasePage() {
  const [isDark, setIsDark] = React.useState(false)

  /* TextField */
  const [tf1, setTf1] = React.useState("")
  const [tf2, setTf2] = React.useState("huy@vsp.io")
  const [tf3, setTf3] = React.useState("bad input")
  const [tf4, setTf4] = React.useState("")

  /* Checkbox */
  const [cb1, setCb1] = React.useState(false)
  const [cb2, setCb2] = React.useState(true)
  const [cb3, setCb3] = React.useState(false)

  /* Overlays */
  const [dialogType, setDialogType] = React.useState<"default" | "icon" | "image" | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  /* Header tabs */
  const [activeTab, setActiveTab] = React.useState("all")

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ─────────────────────────────────────────────── */}
        <Header
          variant="large-title"
          largeTitle="Components"
          description="VSP Design System · 11 components"
          trailing={
            <button
              type="button"
              onClick={() => setIsDark(v => !v)}
              className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full text-foreground"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          }
        />

        {/* ── Scrollable body ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[32px]">

          {/* ── Quick nav ───────────────────────────────────────────── */}
          <div className="pt-[32px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[16px] py-[16px] flex flex-wrap gap-2">
              {SECTIONS.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3 py-1 rounded-full bg-background text-sm font-medium text-foreground-secondary active:bg-border transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              BUTTON
          ══════════════════════════════════════════════════════════ */}
          <section id="button" className="pt-[32px]">
            <SectionTitle>Button</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>primary · 48</Chip>
              <Button variant="primary" size="48">Confirm payment</Button>

              <Chip>secondary · 48</Chip>
              <Button variant="secondary" size="48">Cancel</Button>

              <Chip>primary · 32</Chip>
              <Button variant="primary" size="32">Save</Button>

              <Chip>secondary · 32</Chip>
              <Button variant="secondary" size="32">Discard</Button>

              <Chip>danger / primary</Chip>
              <Button variant="primary" intent="danger" size="48">Delete account</Button>

              <Chip>danger / secondary</Chip>
              <Button variant="secondary" intent="danger" size="48">Remove card</Button>

              <Chip>loading</Chip>
              <Button variant="primary" size="48" isLoading>Processing…</Button>

              <Chip>disabled</Chip>
              <Button variant="primary" size="48" disabled>Unavailable</Button>

              <Chip>with icon</Chip>
              <div className="flex gap-3">
                <Button variant="primary" size="48" className="flex-1"><Send size={18} />Send</Button>
                <Button variant="secondary" size="48" className="flex-1"><CreditCard size={18} />Pay</Button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              BUTTON GROUP
          ══════════════════════════════════════════════════════════ */}
          <section id="button-group" className="pt-[32px]">
            <SectionTitle>ButtonGroup</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>horizontal</Chip>
              <ButtonGroup layout="horizontal" primaryLabel="Confirm" secondaryLabel="Cancel" />

              <Chip>vertical</Chip>
              <ButtonGroup layout="vertical" primaryLabel="Continue" secondaryLabel="Go back" />

              <Chip>horizontal · size 32</Chip>
              <ButtonGroup layout="horizontal" size="32" primaryLabel="Save" secondaryLabel="Discard" />
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              TEXT FIELD
          ══════════════════════════════════════════════════════════ */}
          <section id="textfield" className="pt-[32px]">
            <SectionTitle>TextField</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>outfocus (empty)</Chip>
              <TextField
                label="Email address"
                placeholder="you@example.com"
                value={tf1}
                onChange={e => setTf1(e.target.value)}
              />

              <Chip>filled</Chip>
              <TextField
                label="Email address"
                value={tf2}
                onChange={e => setTf2(e.target.value)}
              />

              <Chip>with leading icon</Chip>
              <TextField
                label="Search"
                placeholder="Search transactions…"
                leadingIcon={<Search size={20} />}
                value={tf4}
                onChange={e => setTf4(e.target.value)}
              />

              <Chip>error state</Chip>
              <TextField
                label="Email address"
                value={tf3}
                onChange={e => setTf3(e.target.value)}
                error="Please enter a valid email address."
              />

              <Chip>with help text</Chip>
              <TextField
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                helpText="Must contain uppercase, number and symbol."
                value=""
                onChange={() => {}}
              />

              <Chip>disabled</Chip>
              <TextField
                label="Account number"
                value="VSP-4892-001"
                disabled
                onChange={() => {}}
              />
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              CHECKBOX
          ══════════════════════════════════════════════════════════ */}
          <section id="checkbox" className="pt-[32px]">
            <SectionTitle>Checkbox</SectionTitle>

            <div className="px-[22px] bg-secondary rounded-[28px] mx-[22px] overflow-hidden">
              <CheckRow label="Unchecked">
                <Checkbox checked={cb1} onChange={setCb1} />
              </CheckRow>
              <CheckRow label="Checked" divider>
                <Checkbox checked={cb2} onChange={setCb2} />
              </CheckRow>
              <CheckRow label="Indeterminate" divider>
                <Checkbox checked={cb3} onChange={setCb3} indeterminate />
              </CheckRow>
              <CheckRow label="Disabled · checked" divider>
                <Checkbox checked disabled onChange={() => {}} />
              </CheckRow>
              <CheckRow label="Disabled · unchecked" divider>
                <Checkbox checked={false} disabled onChange={() => {}} />
              </CheckRow>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              HEADER
          ══════════════════════════════════════════════════════════ */}
          <section id="header" className="pt-[32px]">
            <SectionTitle>Header</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">

              <Chip>default</Chip>
              <Frame>
                <Header variant="default" title="Payment details" showStatusBar={false} />
              </Frame>

              <Chip>default · back + trailing</Chip>
              <Frame>
                <Header
                  variant="default"
                  title="Transfer"
                  showStatusBar={false}
                  leading={
                    <button type="button" className="flex items-center justify-center pl-[8px] pr-[10px] py-[10px] min-h-[44px] rounded-full text-foreground">
                      <ChevronLeft size={18} />
                    </button>
                  }
                  trailing={<Bell size={20} className="text-foreground" />}
                />
              </Frame>

              <Chip>large-title</Chip>
              <Frame>
                <Header
                  variant="large-title"
                  largeTitle="Dashboard"
                  description="Good morning, Huy"
                  showStatusBar={false}
                />
              </Frame>

              <Chip>large-title · search</Chip>
              <Frame>
                <Header
                  variant="large-title"
                  largeTitle="Explore"
                  showStatusBar={false}
                  showSearch
                  searchProps={{ placeholder: "Search…" }}
                />
              </Frame>

              <Chip>large-title · search + tabs</Chip>
              <Frame>
                <Header
                  variant="large-title"
                  largeTitle="History"
                  showStatusBar={false}
                  showSearch
                  searchProps={{ placeholder: "Search transactions…" }}
                  tabs={[
                    { label: "All", value: "all" },
                    { label: "Sent", value: "sent" },
                    { label: "Received", value: "received" },
                  ]}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </Frame>

            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              TOAST BAR
          ══════════════════════════════════════════════════════════ */}
          <section id="toast" className="pt-[32px]">
            <SectionTitle>ToastBar</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>default</Chip>
              <ToastBar
                type="default"
                title="Security reminder"
                body="Enable biometric login to keep your account safe."
                actionLabel="Enable"
              />

              <Chip>default · icon + dismiss</Chip>
              <ToastBar
                type="default"
                icon={<Bell size={20} />}
                title="New notification"
                body="You have a pending transfer request."
                onClose={() => {}}
              />

              <Chip>success</Chip>
              <ToastBar
                type="success"
                icon={<CheckCircle2 size={20} />}
                title="Payment sent"
                body="500,000 VND was successfully sent to Minh."
              />

              <Chip>error</Chip>
              <ToastBar
                type="error"
                icon={<AlertCircle size={20} />}
                title="Transfer failed"
                body="Insufficient balance. Please top up your account."
                onClose={() => {}}
              />

              <Chip>no title · body only</Chip>
              <ToastBar
                type="default"
                body="Your session will expire in 5 minutes."
                actionLabel="Extend"
              />
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              INFORM MESSAGE
          ══════════════════════════════════════════════════════════ */}
          <section id="inform" className="pt-[32px]">
            <SectionTitle>InformMessage</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>secondary · icon</Chip>
              <InformMessage
                hierarchy="secondary"
                icon={<Info size={20} />}
                body="Your account will be reviewed within 24 hours."
              />

              <Chip>secondary · action</Chip>
              <InformMessage
                hierarchy="secondary"
                body="Keep your profile up to date for better security."
                actionLabel="Update now"
              />

              <Chip>secondary · icon + action</Chip>
              <InformMessage
                hierarchy="secondary"
                icon={<Shield size={20} />}
                body="Two-factor authentication adds an extra layer of security."
                actionLabel="Enable 2FA"
              />

              <Chip>primary (blue) · icon + action</Chip>
              <InformMessage
                hierarchy="primary"
                icon={<Gift size={20} />}
                body={<>Invite friends and earn <span className="text-success font-semibold">50,000 VND</span> per referral.</>}
                actionLabel="Invite now"
              />

              <Chip>primary · action only</Chip>
              <InformMessage
                hierarchy="primary"
                icon={<Mail size={20} />}
                body="Verify your email to unlock all features."
                actionLabel="Verify email"
              />
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              FEEDBACK STATE
          ══════════════════════════════════════════════════════════ */}
          <section id="feedback" className="pt-[32px]">
            <SectionTitle>FeedbackState</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>success · CTA</Chip>
              <Frame>
                <FeedbackState
                  icon={<CheckCircle2 size={64} className="text-success" />}
                  title="Transfer complete"
                  description="500,000 VND has been sent to Minh. It may take up to 2 minutes."
                  actionLabel="Done"
                />
              </Frame>

              <Chip>empty state</Chip>
              <Frame>
                <FeedbackState
                  icon={<Wallet size={64} className="text-foreground-secondary" />}
                  title="No transactions yet"
                  description="Your history will appear here once you make your first transfer."
                  actionLabel="Add money"
                />
              </Frame>

              <Chip>error · retry</Chip>
              <Frame>
                <FeedbackState
                  icon={<AlertCircle size={64} className="text-danger" />}
                  title="Something went wrong"
                  description="We couldn't process your request. Please try again."
                  actionLabel="Retry"
                />
              </Frame>

              <Chip>no action</Chip>
              <Frame>
                <FeedbackState
                  icon={<Shield size={64} className="text-foreground-secondary" />}
                  title="No insurance yet"
                  description="Purchase insurance to get comprehensive protection."
                />
              </Frame>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              ITEM LIST
          ══════════════════════════════════════════════════════════ */}
          <section id="itemlist" className="pt-[32px]">
            <SectionTitle>ItemList</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>label + sublabel + chevron</Chip>
              <div className="bg-secondary rounded-[28px] px-[16px] overflow-hidden">
                <ItemList>
                  <ItemListItem label="Profile" sublabel="Huy Kieu · Verified" showChevron onPress={() => {}}
                    prefix={<div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center"><User size={20} className="text-foreground" /></div>}
                  />
                  <ItemListItem label="Wallet" sublabel="Manage accounts & cards" showChevron onPress={() => {}}
                    prefix={<div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center"><Wallet size={20} className="text-foreground" /></div>}
                  />
                  <ItemListItem label="Settings" sublabel="Language, theme, security" showChevron onPress={() => {}}
                    prefix={<div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center"><Settings size={20} className="text-foreground" /></div>}
                  />
                  <ItemListItem label="Delete account" sublabel="Permanently remove your data" showChevron onPress={() => {}}
                    prefix={<div className="w-[44px] h-[44px] rounded-full bg-rose-50 flex items-center justify-center"><Trash2 size={20} className="text-danger" /></div>}
                  />
                </ItemList>
              </div>

              <Chip>metadata + subMetadata</Chip>
              <div className="bg-secondary rounded-[28px] px-[16px] overflow-hidden">
                <ItemList>
                  <ItemListItem label="Apple Pay" sublabel="Today · 11:17 PM" metadata="+500,000 VND" subMetadata="Completed" showChevron onPress={() => {}}
                    prefix={<div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center"><CreditCard size={20} className="text-foreground" /></div>}
                  />
                  <ItemListItem label="Transfer to Minh" sublabel="Yesterday · 3:42 PM" metadata="-200,000 VND" subMetadata="Pending" showChevron onPress={() => {}}
                    prefix={<div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center"><User size={20} className="text-foreground" /></div>}
                  />
                </ItemList>
              </div>

              <Chip>no prefix · no chevron</Chip>
              <div className="bg-secondary rounded-[28px] px-[16px] overflow-hidden">
                <ItemList>
                  <ItemListItem label="Version" metadata="1.0.0" />
                  <ItemListItem label="Build" metadata="2026.02.28" />
                </ItemList>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              DIALOG
          ══════════════════════════════════════════════════════════ */}
          <section id="dialog" className="pt-[32px]">
            <SectionTitle>Dialog</SectionTitle>

            <div className="px-[22px] flex flex-col gap-3">
              <Chip>default</Chip>
              <Button variant="secondary" size="48" onClick={() => setDialogType("default")}>
                Open Default Dialog
              </Button>

              <Chip>with icon</Chip>
              <Button variant="secondary" size="48" onClick={() => setDialogType("icon")}>
                Open Icon Dialog
              </Button>

              <Chip>with image</Chip>
              <Button variant="secondary" size="48" onClick={() => setDialogType("image")}>
                Open Image Dialog
              </Button>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              BOTTOM SHEET
          ══════════════════════════════════════════════════════════ */}
          <section id="bottomsheet" className="pt-[32px]">
            <SectionTitle>BottomSheet</SectionTitle>

            <div className="px-[22px]">
              <Button variant="secondary" size="48" className="w-full" onClick={() => setSheetOpen(true)}>
                Open Bottom Sheet
              </Button>
            </div>
          </section>

        </div>

        {/* ── Home indicator ───────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

        {/* ── Dialog portals ───────────────────────────────────────── */}
        <Dialog
          open={dialogType === "default"}
          onClose={() => setDialogType(null)}
          type="default"
          title="Confirm transfer"
          description="You are about to send 500,000 VND to Nguyen Van Minh. This action cannot be undone."
          primaryLabel="Send now"
          secondaryLabel="Cancel"
          footerProps={{ secondaryProps: { onClick: () => setDialogType(null) } }}
        />

        <Dialog
          open={dialogType === "icon"}
          onClose={() => setDialogType(null)}
          type="icon"
          icon={<Trash2 size={36} className="text-danger" />}
          title="Delete account"
          description="All your data will be permanently removed. This action cannot be undone."
          primaryLabel="Delete"
          secondaryLabel="Cancel"
          footerProps={{
            primaryProps: { intent: "danger", onClick: () => setDialogType(null) },
            secondaryProps: { onClick: () => setDialogType(null) },
          }}
        />

        <Dialog
          open={dialogType === "image"}
          onClose={() => setDialogType(null)}
          type="image"
          image={
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <Gift size={40} className="text-success" />
            </div>
          }
          title="You earned a reward!"
          description="Complete 3 more transfers to unlock your next bonus."
          primaryLabel="Claim reward"
          secondaryLabel="Later"
          footerProps={{ secondaryProps: { onClick: () => setDialogType(null) } }}
        />

        {/* ── BottomSheet portal ───────────────────────────────────── */}
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
          <p className="text-md font-semibold text-foreground pb-[12px]">Share or export</p>
          <div className="bg-background rounded-[28px] overflow-hidden mb-3">
            <ItemList>
              <ItemListItem label="Share link" sublabel="Send via message or email" showChevron onPress={() => setSheetOpen(false)}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><Send size={20} className="text-foreground" /></div>}
              />
              <ItemListItem label="Download PDF" sublabel="Save to Files" showChevron onPress={() => setSheetOpen(false)}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><CreditCard size={20} className="text-foreground" /></div>}
              />
              <ItemListItem label="Copy link" sublabel="Paste anywhere" showChevron onPress={() => setSheetOpen(false)}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><Mail size={20} className="text-foreground" /></div>}
              />
            </ItemList>
          </div>
          <Button variant="secondary" size="48" className="w-full" onClick={() => setSheetOpen(false)}>
            Cancel
          </Button>
        </BottomSheet>

      </div>
    </div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[22px] pb-[12px]">
      <p className="text-md font-semibold leading-6 text-foreground">{children}</p>
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-foreground-secondary uppercase tracking-wider pt-1">
      {children}
    </p>
  )
}

/** Thin border preview frame for components like Header, FeedbackState */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-[14px] overflow-hidden">
      {children}
    </div>
  )
}

function CheckRow({
  label,
  children,
  divider,
}: {
  label: string
  children: React.ReactNode
  divider?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-3 ${divider ? "border-t border-border" : ""}`}>
      <span className="text-md text-foreground">{label}</span>
      {children}
    </div>
  )
}
