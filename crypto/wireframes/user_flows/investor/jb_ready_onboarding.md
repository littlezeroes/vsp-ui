---
title: "JB_READY: Get Verified and Ready to Invest"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

## Overview

- **Codename:** `JB_READY`
- **Job Statement:** "As an investor, I want to get verified and ready to invest so that I can participate in token offerings"
- **Role:** `RL_INV`
- **Phases:** ONBO
- **Epics:** `EP_EKYC` (eKYC Verification), `EP_WLST` (Wallet Setup)
- **Wireframe Screens:** 3 screens in `investor/onbo/`
  - `investor/onbo/vpay-entry.html`
  - `investor/onbo/kyc-gate.html`
  - `investor/onbo/wallet-setup.html`

### Epic Summary

<details>
<summary>Epic and feature breakdown for JB_READY</summary>


| Epic / Feature | Description |
|-------|-------------|
| **`EP_EKYC`** — eKYC Verification | KYC Level 2 verification required for all investment actions.<br/>- `FT_VPAY`: VPay entry point — seamless transition from VPay app into POLARIS<br/>- `FT_GATE`: KYC gate screen displayed when `kycLevel` `<` 2, redirects to VPay eKYC<br/>- `FT_DOCS` `[EXTSYS]`: 3-step document upload (National ID front, back, selfie with liveness) — handled by VPay eKYC system<br/>- `FT_APRC` `[EXTSYS]`: AI processing (~30s) with ~85% auto-approval, ~15% flagged for BO review — handled by VPay |
| **`EP_WLST`** — Wallet Setup | Blockchain identity setup after KYC approval.<br/>- `FT_PRMT`: Wallet type selection (POC: auto-create, Alpha+: user chooses)<br/>- `FT_AUTO` / `EP_WLST_1`: Platform wallet creation via BitGo/Fireblocks + RegisterIdentityWorkflow<br/>- `FT_SELF` / `EP_WLST_2`: Self-custody wallet linking with AML screening (Alpha+ only)<br/>- `FT_IDRG`: Shared 4-step Temporal workflow (deploy OnChainID, register identity, issue KYC claim, update DB)<br/>- `FT_NTFY`: Event bus notifications (`wallet.ready`, `wallet.linked`, `wallet.aml_flagged`) |

</details>

---

## Happy Path Flow

### Onboarding Journey

<details>
<summary>End-to-end happy path from sign-up to home screen</summary>


#### Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
flowchart LR
    subgraph EP_EKYC["EP_EKYC — VPay Entry & KYC Gate"]
        A["VPay Entry<br/><code>investor/onbo/vpay-entry.html</code>"] --> B["KYC Gate<br/><code>investor/onbo/kyc-gate.html</code>"]
    end

    subgraph EP_WLST["EP_WLST — Wallet Setup"]
        C["Wallet Setup<br/><code>investor/onbo/wallet-setup.html</code>"]
    end

    B -->|"kycLevel >= 2"| C
    B -->|"kycLevel < 2"| VPAY["VPay eKYC<br/>[EXTSYS]"]
    VPAY -->|"approved"| C
    C --> D["Home Screen<br/>Handoff to JB_EVAL"]
```

- **VPay Entry** — first-time POLARIS entry from VPay app, shows VPay account info, seamless transition
- **KYC Gate** — checks KYC Level 2 status; if not met, directs user to VPay eKYC (`[EXTSYS]`, outside POLARIS scope)
- **Wallet Setup** — platform wallet auto-created via Fireblocks, followed by 4-step RegisterIdentityWorkflow (Create Wallet, Deploy OnChainID, Register Identity, Issue KYC Claim)
- **Home Screen** — investor fully onboarded, handed off to `JB_EVAL` (browse and evaluate projects)

---

#### Screen Mapping Table

| Node ID | Screen Label | Wireframe Path | PRD Source | Epic |
|---------|-------------|----------------|------------|------|
| A | VPay Entry | `investor/onbo/vpay-entry.html` | `FT_VPAY` | `EP_EKYC` |
| B | KYC Gate | `investor/onbo/kyc-gate.html` | `FT_GATE` | `EP_EKYC` |
| C | Wallet Setup | `investor/onbo/wallet-setup.html` | `FT_PRMT` + `FT_AUTO` + `FT_IDRG` | `EP_WLST` |
| D | Home Screen | `investor/preo/home.html` | `UF_PREO.EP_HOME` | — |

</details>

---

## Decision Points

### Key Branching Logic

<details>
<summary>Decision points and branching conditions across EP_EKYC and EP_WLST</summary>


#### Decision Table

| Decision Point | Condition | Outcome | Screen / Action |
|---------------|-----------|---------|-----------------|
| KYC Level Check | `kycLevel` `<` 2 | Show KYC gate | KYC Gate Screen (`FT_GATE`) |
| KYC Level Check | `kycLevel` `>=` 2 | Proceed to home | Home Screen (`UF_PREO`) |
| AI eKYC Result | Approved (~85%) | Update status, trigger wallet setup | Webhook updates `kycLevel`=2, triggers `EP_WLST_1` |
| AI eKYC Result | Flagged (~15%) | Queue for BO review | "Under Review" screen, BO notification created (`EP_OCID`) |
| AI eKYC Result | Rejected | Show reason, allow retry | Rejection screen with reason + retry option |
| Platform Phase | POC | Auto-create platform wallet | Skip prompt, `POST /wallet/create` with type `platform` |
| Platform Phase | Alpha / FullR | Show wallet prompt | User chooses between platform wallet and self-custody |
| AML Screening Result | Clean (score `<` 30) | Proceed to identity registration | RegisterIdentityWorkflow queued |
| AML Screening Result | Review (score 30-70) | Queue for BO review | BO notification (`AML_REVIEW`), user sees "Under review" |
| AML Screening Result | High Risk (score `>=` 70) | Block address | `wallet.aml_flagged` event, offer alternatives |
| Wallet Type Choice | Platform Wallet | Create custodial wallet | `POST /wallet/create`, RegisterIdentityWorkflow |
| Wallet Type Choice | Self-Custody | Enter address + AML screening | `POST /wallet/link`, Chainalysis screening |

</details>

---

## Error Paths

### Error Recovery Flows

<details>
<summary>Error scenarios and recovery mechanisms</summary>


#### Error Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
flowchart TD
    subgraph EKYC_ERRORS["EP_EKYC Error Paths"]
        E1["Image Quality Fail"] -->|Retake| E1R["Reopen Camera<br/>Unlimited retries"]
        E2["Liveness Check Fail"] --> E2C{"Fail count"}
        E2C -->|"count < 3"| E2R["Retry: Follow Instructions"]
        E2C -->|"count >= 3"| E2X["Cooldown Period<br/>Try again later"]
        E3["eKYC Rejected"] --> E3R["Show Reason<br/>Allow retry after cooldown"]
        E4["Webhook Validation Fail"] --> E4R["Return 401<br/>Log security event"]
    end

    subgraph WLST_ERRORS["EP_WLST Error Paths"]
        W1["Wallet Creation Timeout"] --> W1C{"Duration"}
        W1C -->|"> 10 min"| W1R["BO Notification<br/>WALLET_FAILED"]
        W1C -->|"> 30 min"| W1X["Escalate to Support"]
        W2["AML High Risk"] --> W2R["Block Address<br/>Offer Alternatives:<br/>- Different address<br/>- Platform wallet"]
        W3["Custodian Unavailable"] --> W3R["Retry 3x with backoff<br/>30s / 60s / 120s"]
        W3R -->|"All retries fail"| W3X["wallet_status = failed<br/>BO Notification"]
        W4["OnChainID Deploy Fail"] --> W4R["Retry with adjusted gas<br/>Max 3 attempts"]
        W4R -->|"All retries fail"| W4X["wallet_status = failed<br/>BO Notification"]
    end
```

---

#### Recovery Table

| Error Scenario | Trigger | Recovery Action | Max Retries | Escalation |
|---------------|---------|-----------------|-------------|------------|
| eKYC image quality fail | Blurry / wrong document detected by VPay | Retake photo with camera guide | Unlimited | — |
| Liveness check fail | Face detection fails | Retry with instructions | 3 attempts | Cooldown period imposed by VPay |
| eKYC rejected | Expired ID, fraud suspected | Show rejection reason + retry option | Per VPay cooldown policy | Fraud cases escalated to BO |
| Wallet creation timeout | RegisterIdentityWorkflow exceeds 10 min | BO notification created, workflow continues retrying | — | `>` 30 min escalates to support |
| AML high risk | Chainalysis score `>=` 70 | Block address, offer different address or platform wallet | — | BO notification (`AML_HIGH_RISK`) |
| Custodian unavailable | BitGo/Fireblocks API down | Retry with exponential backoff (30s, 60s, 120s) | 3 attempts | `wallet_status` = `failed`, BO notification |
| OnChainID deploy fail | Gas estimation error, nonce conflict | Retry with adjusted gas parameters | 3 attempts | `wallet_status` = `failed`, BO notification |
| Webhook validation fail | Invalid HMAC-SHA256 signature | Return 401, log security event | — | Security monitoring alert |
| Blockchain reorg | OnChainID transaction reverted | Re-deploy OnChainID, log reorg event | 1 re-deploy | Investigation logged |
| AML service unavailable | Chainalysis API down | Retry 3x with backoff, show "Try again later" | 3 attempts | Event logged for monitoring |

</details>

---

## Cross-Role Interactions

### System Sequence

<details>
<summary>Sequence diagram showing cross-role interactions for eKYC webhook and wallet creation</summary>


#### Sequence Diagram

```mermaid
%%{init: {'themeCSS': '.section, .actor, .messageText, .title, text, .taskText, .cluster text { font-size: 24px !important; } .mermaid { zoom: 1.6; }','themeVariables': {'fontSize': '24px'}  } }%%
sequenceDiagram
    participant INV as RL_INV
    participant APP as VPay App
    participant VBE as VPay BE
    participant RWA as RWA API
    participant BC as Blockchain
    participant EB as Event Bus
    participant BO as RL_BO

    Note over INV, BO: EP_EKYC — eKYC Verification Flow

    INV->>APP: Tap "Complete KYC"
    APP->>APP: Open eKYC flow (ID front, back, selfie)
    APP->>VBE: Submit documents
    VBE->>VBE: AI Processing (~30s)
    alt Approved (~85%)
        VBE->>RWA: POST /webhook/kyc (kyc.status_changed, approved)
        RWA->>RWA: Validate HMAC signature
        RWA->>RWA: Update kycLevel=2, kycStatus=approved
        RWA->>RWA: Log to KYCStatusLog
    else Flagged (~15%)
        VBE->>RWA: POST /webhook/kyc (kyc.status_changed, pending_review)
        RWA->>RWA: Update kycStatus=pending
        RWA->>BO: Create BO Notification (KYC_FLAGGED)
    end

    Note over INV, BO: EP_WLST — Wallet Setup Flow

    RWA->>RWA: Trigger EP_WLST_1 (on approval)
    RWA->>RWA: Queue RegisterIdentityWorkflow
    RWA->>BC: Step 1: Deploy OnChainID
    BC-->>RWA: OnChainID address
    RWA->>BC: Step 2: Register Identity (wallet → OnChainID)
    BC-->>RWA: IdentityRegistered event
    RWA->>BC: Step 3: Issue KYC Claim via Claim Issuer
    BC-->>RWA: ClaimAdded event
    RWA->>RWA: Step 4: Update DB (wallet_status=ready)
    RWA->>EB: Publish wallet.ready event
    EB->>VBE: wallet.ready
    VBE->>APP: Push notification "Your wallet is ready!"
    APP->>INV: Display notification
    INV->>APP: Tap notification
    APP->>RWA: GET /user/wallet
    RWA-->>APP: status=ready, address=0x...
    APP->>INV: Show wallet details + navigate to Home
```

</details>

---

## References

### Source Documents

<details>
<summary>PRD and wireframe references</summary>


#### PRD Links

- [EP_EKYC PRD](../../../nghia_po_proposal/prd/rp2511_e47_sseq_onbo_ep_ekyc.md) — eKYC Verification for Investor (`UF_ONBO.EP_EKYC`)
- [EP_WLST PRD](../../../nghia_po_proposal/prd/rp2511_e47_sseq_onbo_ep_wlst.md) — Investor Wallet Setup (`UF_ONBO.EP_WLST`)

#### Wireframe Links

- ../../investor/onbo/vpay-entry.html — `investor/onbo/vpay-entry.html`
- ../../investor/onbo/kyc-gate.html — `investor/onbo/kyc-gate.html`
- ../../investor/onbo/wallet-setup.html — `investor/onbo/wallet-setup.html`

</details>
