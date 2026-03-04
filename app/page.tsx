"use client"

import * as React from "react"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  History,
  Moon,
  MoveHorizontal,
  Plus,
  QrCode,
  RefreshCcw,
  Send,
  Settings,
  Sun,
  User,
  Wallet,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { InformMessage } from "@/components/ui/inform-message"
import { ToastBar } from "@/components/ui/toast-bar"
import { FeedbackState } from "@/components/ui/feedback-state"
import { Dialog } from "@/components/ui/dialog"
import { BottomSheet } from "@/components/ui/bottom-sheet"

/*
 * VSP Home Screen
 * Pattern: Revolut home (dark-capable, balance-first, quick actions)
 * Rules: 100% VSP tokens · 100% VSP components · 7 design principles
 */

export default function HomePage() {
  const [isDark, setIsDark] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("home")
  const [sendOpen, setSendOpen] = React.useState(false)
  const [addOpen, setAddOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [balanceHidden, setBalanceHidden] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ─────────────────────────────────────────────── */}
        <Header
          variant="large-title"
          largeTitle="Home"
          description="Good morning, Huy 👋"
          trailing={
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsDark(v => !v)}
                className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full text-foreground"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                type="button"
                className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full text-foreground"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>
            </div>
          }
          showSearch
          searchProps={{ placeholder: "Search transactions, contacts…" }}
          tabs={[
            { label: "Home", value: "home" },
            { label: "Payments", value: "payments" },
            { label: "Invest", value: "invest" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* ── Scrollable content ──────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[21px]">

          {/* ── Balance hero ─────────────────────────────────────── */}
          <div className="flex flex-col items-center pt-[28px] pb-[8px] px-[22px]">
            {/* Account label */}
            <p className="text-xs font-medium text-foreground-secondary tracking-widest uppercase mb-[8px]">
              Personal · VND
            </p>
            {/* Balance */}
            <button
              type="button"
              onClick={() => setBalanceHidden(v => !v)}
              className="flex items-center gap-[8px] focus-visible:outline-none"
              aria-label={balanceHidden ? "Show balance" : "Hide balance"}
            >
              <span className="text-[40px] font-bold leading-none text-foreground tabular-nums">
                {balanceHidden ? "••••••••" : "12,480,000"}
              </span>
            </button>
            <p className="text-sm text-foreground-secondary mt-[6px]">
              ≈ $500.00 USD
            </p>
            {/* Accounts pill */}
            <button
              type="button"
              className="mt-[12px] bg-secondary rounded-full px-[16px] py-[8px] text-sm font-semibold text-foreground focus-visible:outline-none"
            >
              Accounts
            </button>
          </div>

          {/* ── Quick actions ─────────────────────────────────────── */}
          <div className="flex justify-between px-[22px] pt-[16px] pb-[8px]">
            {[
              { icon: <Plus size={22} />, label: "Add" },
              { icon: <Send size={22} />, label: "Send" },
              { icon: <MoveHorizontal size={22} />, label: "Move" },
              { icon: <History size={22} />, label: "History" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => label === "Send" ? setSendOpen(true) : label === "Add" ? setAddOpen(true) : undefined}
                className="flex flex-col items-center gap-[6px] focus-visible:outline-none"
              >
                <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center text-foreground">
                  {icon}
                </div>
                <span className="text-xs font-medium text-foreground-secondary">{label}</span>
              </button>
            ))}
          </div>

          {/* ── Promo banner ──────────────────────────────────────── */}
          <div className="pt-[24px] px-[22px]">
            <InformMessage
              hierarchy="primary"
              icon={<Gift size={20} />}
              body={<>Invite friends and earn <span className="text-success font-semibold">50,000 VND</span> for each referral.</>}
              actionLabel="Invite now"
            />
          </div>

          {/* ── Recent transactions ───────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionTitle title="Transactions" />
            <div className="px-[22px]">
              <ItemList>
                <ItemListItem
                  label="Apple Pay"
                  sublabel="Today · 11:17 PM"
                  metadata="+$20.00"
                  subMetadata="Completed"
                  showChevron
                  divider
                  onPress={() => {}}
                  prefix={
                    <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                      <CreditCard size={20} className="text-foreground" />
                    </div>
                  }
                />
                <ItemListItem
                  label="Transfer to John"
                  sublabel="Yesterday · 3:42 PM"
                  metadata="-$15.00"
                  subMetadata="Completed"
                  showChevron
                  divider
                  onPress={() => {}}
                  prefix={
                    <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                      <User size={20} className="text-foreground" />
                    </div>
                  }
                />
                <ItemListItem
                  label="Top-up · VISA ····2675"
                  sublabel="Feb 20 · 11:17 PM"
                  metadata="+$39.88"
                  subMetadata="Completed"
                  showChevron
                  onPress={() => {}}
                  prefix={
                    <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                      <ArrowDownLeft size={20} className="text-success" />
                    </div>
                  }
                />
              </ItemList>
            </div>
          </div>

          {/* ── Cards ─────────────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionTitle title="My Cards" />
            <div className="px-[22px] space-y-3">
              <ItemListItem
                label="VISA ····2675"
                sublabel="Expires 12/27 · Physical"
                metadata="Active"
                showChevron
                divider
                onPress={() => {}}
                prefix={
                  <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                    <CreditCard size={20} className="text-foreground" />
                  </div>
                }
              />
              <ItemListItem
                label="Virtual Card"
                sublabel="Online payments only"
                metadata="Active"
                showChevron
                onPress={() => {}}
                prefix={
                  <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                    <QrCode size={20} className="text-foreground" />
                  </div>
                }
              />
            </div>
          </div>

          {/* ── Notification ──────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionTitle title="Notifications" action={undefined} />
            <div className="px-[22px] space-y-3">
              <ToastBar
                type="success"
                icon={<ArrowDownLeft size={20} />}
                title="Money received"
                body="$20.00 has been added to your account via Apple Pay."
              />
              <ToastBar
                type="default"
                title="Security reminder"
                body="Enable biometric login to protect your account."
                actionLabel="Enable"
              />
            </div>
          </div>

          {/* ── Quick settings ────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionTitle title="Settings" action={undefined} />
            <div className="px-[22px]">
              <ItemList>
                <ItemListItem
                  label="Profile"
                  sublabel="Huy Kieu · Verified"
                  showChevron
                  divider
                  onPress={() => {}}
                  prefix={
                    <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                      <User size={20} className="text-foreground" />
                    </div>
                  }
                />
                <ItemListItem
                  label="Wallet"
                  sublabel="Manage accounts & cards"
                  showChevron
                  divider
                  onPress={() => {}}
                  prefix={
                    <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                      <Wallet size={20} className="text-foreground" />
                    </div>
                  }
                />
                <ItemListItem
                  label="Preferences"
                  sublabel="Language, theme, security"
                  showChevron
                  onPress={() => {}}
                  prefix={
                    <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                      <Settings size={20} className="text-foreground" />
                    </div>
                  }
                />
              </ItemList>
            </div>
          </div>

          {/* spacer */}
          <div className="h-8" />
        </div>

        {/* ── Home indicator ──────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

        {/* ── Send money sheet ────────────────────────────────────── */}
        <BottomSheet open={sendOpen} onClose={() => setSendOpen(false)}>
          <div className="space-y-4">
            <p className="text-md font-semibold text-foreground">Send money</p>
            <p className="text-sm text-foreground-secondary">
              Choose how you'd like to send.
            </p>
            <ItemList>
              <ItemListItem
                label="To a contact"
                sublabel="Send to someone in your contacts"
                showChevron divider onPress={() => {}}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><User size={20} className="text-foreground" /></div>}
              />
              <ItemListItem
                label="Scan QR code"
                sublabel="Scan and pay instantly"
                showChevron divider onPress={() => {}}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><QrCode size={20} className="text-foreground" /></div>}
              />
              <ItemListItem
                label="Bank transfer"
                sublabel="Transfer to a bank account"
                showChevron onPress={() => {}}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><ArrowUpRight size={20} className="text-foreground" /></div>}
              />
            </ItemList>
          </div>
        </BottomSheet>

        {/* ── Add money sheet ─────────────────────────────────────── */}
        <BottomSheet open={addOpen} onClose={() => setAddOpen(false)}>
          <div className="space-y-4">
            <p className="text-md font-semibold text-foreground">Add money</p>
            <p className="text-sm text-foreground-secondary">
              Choose a funding method.
            </p>
            <ItemList>
              <ItemListItem
                label="Bank transfer"
                sublabel="Transfer from your bank account"
                showChevron divider onPress={() => {}}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><ArrowDownLeft size={20} className="text-foreground" /></div>}
              />
              <ItemListItem
                label="Debit / Credit card"
                sublabel="Instant top-up via card"
                showChevron divider onPress={() => {}}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><CreditCard size={20} className="text-foreground" /></div>}
              />
              <ItemListItem
                label="Auto reload"
                sublabel="Set a minimum balance rule"
                showChevron onPress={() => {}}
                prefix={<div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center"><RefreshCcw size={20} className="text-foreground" /></div>}
              />
            </ItemList>
          </div>
        </BottomSheet>

        {/* ── Confirm dialog ──────────────────────────────────────── */}
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          type="default"
          title="Confirm Transfer"
          description="Are you sure you want to send $15.00 to John? This action cannot be undone."
          primaryLabel="Send now"
          secondaryLabel="Cancel"
          footerProps={{ secondaryProps: { onClick: () => setConfirmOpen(false) } }}
        />

      </div>
    </div>
  )
}

/* ── SectionTitle ─────────────────────────────────────────────────────── */
function SectionTitle({
  title,
  action = "See all",
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="flex items-center gap-[8px] px-[16px] pb-[12px]">
      <p className="flex-1 text-md font-semibold leading-6 text-foreground">{title}</p>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-md font-semibold leading-6 text-success focus-visible:outline-none"
        >
          {action}
        </button>
      )}
    </div>
  )
}
