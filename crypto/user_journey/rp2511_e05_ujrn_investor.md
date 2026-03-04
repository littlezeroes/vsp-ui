---
title: rp2511_e05_ujrn_investor
toc_min_heading_level: 2
toc_max_heading_level: 3
author: Ken
first_created: 2026-01-02
last_updated: 2026-01-02
version: 1.0
status: draft
---

# Investor User Journey

---

## General Info

### Key Terms and Naming Convention

| Name/Term | Description |
|-----------|-------------|
| **User Journey** | - Complete end-to-end experience for a user role<br/>- This document: Investor User Journey (RL_INV) |
| **Platform Phase** | - A stage in the platform lifecycle<br/>- Used as prefix for User Flow codes<br/>- Investor phases: `DISC`, `ONBO`, `PREO`, `TOKO`, `OSET`, `XFER`, `MKT`, `REDM`, `LIQD`, `PROT`, `MNTR`, `SUPP`, `IEXT` |
| **User Flow** | - A phase within the journey with a specific goal<br/>- ID Format: `UF_XXXX (RL_INV)`<br/>- Example: `UF_DISC (RL_INV)` (App Discovery) |
| **Epic** | - A group of related features within a flow<br/>- ID Format: `UF_XXXX.EP_YYYY` or `XXXX.EP_YYYY`<br/>- Example: `DISC.EP_APST` (App Store Discovery) |
| **Feature** | - A specific capability or screen within an epic<br/>- ID Format: `XXXX.EP_YYYY.FT_ZZZZ`<br/>- Example: `DISC.EP_APST.FT_LSTN` (App Store Listing) |
| **User Story** | - A detailed user action within a feature<br/>- Example: User sees app rating, User taps Install |
| **Role Investor** | - Codename: `RL_INV`<br/>- Primary responsibility: Invest, trade, redeem tokens<br/>- Platform: VPay Mobile App (external system) → RWA Platform APIs<br/>- Persona: Tran Mai Linh (29, Product Manager)<br/>- **Note:** Investors interact with VPay Frontend first; VPay Backend calls RWA Platform for properties, projects, tokens, gas |
| **VPay App** | - External mobile app for investor interactions<br/>- Handles eKYC, fiat deposits/withdrawals<br/>- **One-way push model:** VPay calls RWA Platform APIs; RWA never calls VPay APIs<br/>- Syncs data via Event Bus |
| **Event Bus** | - Bidirectional communication between VPay and RWA Platform<br/>- VPay → RWA: eKYC status, commitment changes<br/>- RWA → VPay: token allocation, transfer status, redemption status |
| **Wallet Setup** | - RWA Platform creates custodial wallet automatically after eKYC approval<br/>- Links wallet to on-chain identity for compliance<br/>- User notified when ready |
| **AML Screening** | - Platform performs anti-money laundering checks<br/>- Applied during token transfers (CEX, P2P) |
| **Oracle Data** | - Property valuations and market data<br/>- Provides NAV and price information<br/>- Used in: Portfolio viewing, market data screens |
| **Gas Fees** | - Platform pays blockchain transaction fees on behalf of users<br/>- Fees may be charged back to users (see terms) |
| **Settlement** | - RWA Platform orchestrates token allocation and fund distribution<br/>- Coordinates with VPay for fiat processing |
| **Token Operations** | - Token allocation during settlement<br/>- Token burning during redemption |

### Tagging

| Tag | Description |
|-----|-------------|
| **[EXTSYS]** | - Feature occurs in an external system outside the Platform/App<br/>- Examples: App Store, Google Play, VPay app, CEX (exchange), physical locations<br/>- Platform has no control over these interactions<br/>- Documented for complete user journey visibility |
| **[OPTIONAL]** | - Feature may or may not be implemented<br/>- Implementation depends on business decision<br/>- Core functionality works without this feature<br/>- **NFT Certificate:** Property NFT minting is optional; investors always receive official ownership documents (So do / Red Book) |

### Alternative Epics

- **Definition:** When a user flow has mutually exclusive paths (user chooses ONE option), use **alternative epics** with suffix `_1`, `_2`, `_3`, etc.
- **Naming:** `UF_XXXX.EP_YYYY_1`, `UF_XXXX.EP_YYYY_2`, `UF_XXXX.EP_YYYY_3`
- **Rules:**
  - Each alternative epic is a complete, independent path
  - User completes exactly ONE alternative epic (not multiple)
  - Common setup/prompt features go in a preceding epic (e.g., `EP_YYYY` for prompt, then `EP_YYYY_1/2/3` for alternatives)

**Example: Transfer Destination Alternatives (UF_XFER)**

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_XFER.EP_CEXR**<br/>CEX Transfer | FT_CEXD<br/>CEX Destination | - Transfer tokens to CEX for secondary market trading<br/>- AML check on destination address | Must-have |
| **UF_XFER.EP_P2P**<br/>P2P Transfer (Alternative) | FT_P2PM<br/>P2P Marketplace | - Alternative when CEX unavailable<br/>- Trade with verified users on Platform | Should-have |

**Note on Wallet Setup:**
- Wallet setup in UF_ONBO is **automatic** (not user choice) - triggered after eKYC approval
- Wallet addresses are managed by the platform for security and compliance; external deposit addresses require verification
- Self-custody option is available later in UF_XFER for outbound transfers (not during onboarding)

---

## Investor Persona: Tran Mai Linh

### Demographics

| Attribute | Details |
|-----------|---------|
| **Name** | Tran Mai Linh |
| **Age** | 29 |
| **Job** | Product Manager, tech startup |
| **Location** | HCMC District 2 |
| **Income** | 45M VND/month |
| **Education** | Business degree |
| **Status** | Single, renting |
| **Tech Level** | High |
| **Investment Capacity** | 50-150M VND (USD 2,000-6,000) |

### Psychographics

| Aspect | Description |
|--------|-------------|
| **Lifestyle** | Urban professional, career-focused |
| **Values** | Financial freedom, innovation, self-improvement |
| **Interests** | Finance, tech, travel, career growth |
| **Media** | LinkedIn, Instagram, YouTube, tech blogs |
| **Social Circle** | Tech workers, startup founders |
| **Risk Tolerance** | Moderate |
| **Decisions** | Research-based, trusts peer recommendations |

### Motivations

1. Build Wealth - Own real estate without billions in capital
2. Passive Income - Reduce reliance on salary
3. Diversify Assets - Beyond bank savings and stocks
4. Keep Up with Peers - Friends are buying property
5. Early Adopter - Be first to try new investment methods
6. Future Security - Prepare for marriage, family, retirement

### Pain Points

1. Cannot Afford Property - HCMC needs 2-3B VND minimum
2. Low Bank Returns - Only 2-3% annually
3. Limited Options - Stock market feels risky
4. No Transparency - Hard to get real estate info
5. No Time - Too busy for property management
6. Scam Concerns - Worried about fraud
7. Tech Confusion - Does not understand blockchain

### Jobs to Be Done

| Type | Job |
|------|-----|
| **Functional** | Invest safely with more than 5% returns |
| **Functional** | Track investments on mobile |
| **Functional** | Withdraw money when needed |
| **Emotional** | Feel like a property owner |
| **Emotional** | Be confident about finances |
| **Emotional** | Reduce money anxiety |
| **Social** | Share success with friends |
| **Social** | Help family invest too |

### Moments That Matter

| Moment | Feeling | Success Factor |
|--------|---------|----------------|
| **App Discovery** | Skeptical to Curious | Clear value, trust signals |
| **KYC Done** | Anxious to Relieved | Fast, clear process |
| **First Investment** | Excited and Nervous | Easy flow, celebration |
| **First Payout** | Thrilled | On-time, transparent |
| **Portfolio Milestone** | Proud | Recognition |
| **Referral Success** | Generous | Easy sharing |
| **Property Redemption** | Triumphant | Smooth handover |
| **Issue Resolved** | Relieved | Fast response |

---

## User Flow Summary (RL_INV)

| User Flow | Description |
|-----------|-------------|
| UF_DISC<br/>App Discovery | - Goal: Discover and install VPay App (which includes RWA investment features); Duration: 1-7 days; Sentiment: Skeptical to Curious<br/>- Discover app via social media ads, App Store, or peer referral<br/>- Download app, view welcome carousel with key features<br/>- Browse project details, property list, pricing without registration (read-only mode) |
| UF_ONBO<br/>Registration and KYC | - Goal: Create account and complete KYC verification; Duration: 10-15 minutes; Sentiment: Nervous to Relieved<br/>- Sign Up: New users register VPay account (email, phone, OTP verification)<br/>- Sign In: Existing users authenticate via VPay credentials<br/>- Complete eKYC: upload National ID (front/back), selfie with ID<br/>- Wait for AI verification (~85% auto-approved) or manual review<br/>- Wallet setup: automatic after eKYC approval (no user action) |
| UF_PREO<br/>Token Offering Preparation | - Goal: Browse projects and prepare funds for investment; Duration: 1-3 days; Sentiment: Curious to Informed<br/>- Browse available real estate projects and individual properties<br/>- Use investment calculator to estimate returns<br/>- Deposit VND to VPay wallet for future investment |
| UF_TOKO<br/>Token Offering Participation | - Goal: Join whitelist and commit investment; Duration: 2-5 minutes; Sentiment: Focused to Determined<br/>- Join whitelist (on-chain identity verification), view offering details<br/>- Check VPay wallet balance, deposit VND if needed<br/>- Commit investment amount with biometric confirmation<br/>- Modify/cancel commitment before deadline |
| UF_OSET<br/>Token Allocation Receipt | - Goal: Receive allocated tokens after Token Offering; Duration: Passive (T+0 to T+2); Sentiment: Anticipating to Accepting<br/>- Receive push notification with allocation result<br/>- View allocated tokens in portfolio<br/>- Receive VPay refund for oversubscription excess |
| UF_XFER<br/>Token Transfer | - Goal: Transfer tokens to external destinations or trade P2P on Platform; Duration: As needed; Sentiment: Confident to Strategic<br/>- View token pool info (supply, burned), property pool info (available, redeemed)<br/>- View market indicators (price trends, sentiment, project health metrics)<br/>- Transfer tokens to CEX or trade on P2P Marketplace (if CEX unavailable)<br/>- Note: Automatic AML check on outbound transfer (by Platform) |
| UF_MKT<br/>Secondary Market Trading | - Goal: Trade tokens on CEX secondary market; Duration: As needed; Sentiment: Strategic to Opportunistic<br/>- Trade tokens on CEX secondary market<br/>- Note: CEX activities are out of Platform control (reference only); AML by CEX<br/>- For P2P trading on Platform, see UF_XFER.EP_P2P |
| UF_REDM<br/>Redemption Request | - Goal: Submit redemption request; Duration: Varies (Batch Cycle); Sentiment: Hopeful to Excited<br/>- Check eligibility (vesting, balance)<br/>- Request redemption for a **Property Pool** (e.g., "2BR") not specific unit<br/>- **Batch Allocation:** Wait for scheduled batch (e.g., Monthly) to receive specific property assignment<br/>- **Anti-Cherry-Picking:** Financial penalty (0.5% deduction) if assigned property is rejected |
| UF_LIQD<br/>Liquidation and Exit | - Goal: Receive cash distributions from property sales; Duration: Passive; Sentiment: Curious to Satisfied<br/>- Liquidation process disclosed at Token Offering start<br/>- Receive liquidation announcement with timeline and process details<br/>- Note: CEX trading expected to continue; redemption may be adjusted per contract<br/>- View estimated distribution amount per token<br/>- Receive VPay credit for liquidation proceeds (proportional to token balance)<br/>- Download tax receipt for reporting |
| UF_PROT<br/>Notification and Participation | - Goal: Handle delays, failures, and buybacks; Duration: If applicable; Sentiment: Anxious to Relieved<br/>- Note: Not a triggering role - receives alerts from RL_SYS via Platform<br/>- Receive emergency notifications (token pause, construction failure, force majeure)<br/>- Cast vote on proposals (timeline extension, continue vs refund) with 66% approval threshold<br/>- Receive compensation via VPay from escrow + SPV reserves if project fails |
| UF_MNTR<br/>Notification and Engagement | - Goal: Stay informed about investments and project progress; Duration: Daily/Weekly; Sentiment: Engaged to Informed<br/>- Receive notifications from platform (price alerts, project updates, announcements)<br/>- View notification details, check portfolio if relevant<br/>- May trigger follow-up user flows (e.g., view project, check balance) |
| UF_SUPP<br/>Support Tickets | - Goal: Get help with issues; Duration: As needed; Sentiment: Frustrated to Relieved<br/>- Submit support tickets for deposit/withdrawal/redemption issues |
| UF_IEXT<br/>Referral and Feedback | - Goal: Share and earn rewards; Duration: Ongoing; Sentiment: Generous to Valued<br/>- Share referral code, earn rewards for successful referrals<br/>- Provide app feedback and feature suggestions |

---

## UF_DISC (RL_INV): App Discovery

**Duration:** 1-7 days
**Goal:** Discover and install VPay App (which includes RWA investment features)
**Sentiment:** Skeptical to Curious

**Phase Considerations:**
- **Initial Phase (Year 1-2):** Marketing focuses on flagship project story; App Store messaging emphasizes "own a piece of this landmark property"; Welcome carousel highlights single premium opportunity
- **Later Phase (Year 3+):** Marketing shifts to portfolio diversity; App Store messaging emphasizes "choose from 10+ premium projects"; Welcome carousel highlights building a diverse real estate portfolio

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_DISC.EP_APST**<br/>App Store Discovery | FT_LSTN [EXTSYS]<br/>App Store Listing | - Professional description, screenshots, video<br/>- User sees Instagram ad, swipes to App Store<br/>- Views app description (4.8 stars, 1,234 reviews), screenshots | Should-have |
| | FT_PREV [EXTSYS]<br/>Preview Video | - 30-second explainer video<br/>- User watches video explaining value proposition<br/>- Reads verified user reviews | Should-have |
| **UF_DISC.EP_SOCV**<br/>Social Validation | FT_PEER [EXTSYS]<br/>Peer Demonstration | - User sees colleague portfolio (500 tokens, +12% gain)<br/>- Asks questions about investment process<br/>- Trust building through personal connections | Should-have |
| | FT_REVW [EXTSYS]<br/>Review Reading | - User browses online reviews<br/>- Tech blogs and finance sites cover the platform<br/>- Independent sources confirm legitimacy | Should-have |
| **UF_DISC.EP_INST**<br/>VPay App Installation | FT_DNLD [EXTSYS]<br/>Download and Install | - User installs VPay App (not separate RWA app)<br/>- VPay App includes RWA investment module<br/>- First app open experience | Must-have |
| | FT_SPLS<br/>Splash Screen | - VinGroup branding with loading animation<br/>- Builds confidence through brand recognition<br/>- First visual impression of platform | Should-have |
| | FT_WCAR<br/>Welcome Carousel | - 3 slides explaining value proposition:<br/>  - Slide 1: Own real estate from 10M VND<br/>  - Slide 2: Earn rental yields automatically<br/>  - Slide 3: Redeem for actual property<br/>- Get Started CTA button to begin registration | Should-have |

### Epic, Feature, and User Story Details

#### EP_APST: App Store Discovery

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_DISC.EP_APST**<br/>App Store Discovery | | - User discovers app through digital channels (social media ads, App Store search, peer recommendation)<br/>- First touchpoint with the platform brand |
| | FT_LSTN.US01<br/>App Store Listing | - User sees Instagram ad with property images<br/>- Thinking: "This looks professional, maybe worth checking out"<br/>- **Acceptance Criteria:** Ad displays high-quality property images; Ad contains app screenshot; Swipe-up link is functional |
| | FT_LSTN.US02<br/>App Store Listing | - User swipes up to App Store<br/>- Thinking: "Easy to find in the store"<br/>- **Acceptance Criteria:** Redirect works for both iOS App Store and Google Play; Deep link opens correct app page; Load time < 3 seconds |
| | FT_LSTN.US03<br/>App Store Listing | - User reads app description<br/>- Thinking: "Good ratings, seems trustworthy"<br/>- **Acceptance Criteria:** App rating displays 4.5+ stars; Review count shows 1,000+ reviews;<br/>  - Initial: Description highlights flagship project and VinGroup backing<br/>  - Later: Description highlights portfolio diversity and multiple project options |
| | FT_LSTN.US04<br/>App Store Listing | - User views app screenshots<br/>- Thinking: "Clean interface, looks easy to use"<br/>- **Acceptance Criteria:** Minimum 5 screenshots displayed; Screenshots show property gallery, portfolio, investment flow; Images are high resolution (1242x2688 for iOS) |
| | FT_PREV.US01<br/>Preview Video | - User watches preview video<br/>- Thinking: "Now I understand how it works"<br/>- **Acceptance Criteria:** Video duration 30-60 seconds; Video auto-plays on scroll; Video explains: tokenization, investment process, redemption |
| | FT_PREV.US02<br/>Preview Video | - User reads user reviews<br/>- Thinking: "Real people are making money with this"<br/>- **Acceptance Criteria:** Reviews are from verified purchasers; Recent reviews (within 30 days) are visible; Average rating displayed prominently |

---

#### EP_SOCV: Social Validation

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_DISC.EP_SOCV**<br/>Social Validation | | - User seeks validation from peers before committing<br/>- Trust building through personal connections |
| | FT_PEER.US01<br/>Peer Demonstration | - User sees colleague portfolio<br/>- Thinking: "Wow, my colleague is actually making returns"<br/>- **Acceptance Criteria:** Portfolio shows token count, invested amount, gain/loss percentage; Data is real-time or < 24h old; Shareable portfolio view available |
| | FT_PEER.US02<br/>Peer Demonstration | - User asks questions about app<br/>- Thinking: "If they trust it, maybe I can too"<br/>- **Acceptance Criteria:** FAQ section available in-app; Investment process documented; Contact support option visible |
| | FT_REVW.US01<br/>Review Reading | - User browses online reviews<br/>- Thinking: "Independent sources confirm legitimacy"<br/>- **Acceptance Criteria:** Platform mentioned in 3+ reputable tech/finance publications; Press kit available on website; Social media presence verified |

---

#### EP_INST: Installation

- **Note:** Investor installs **VPay App** [EXTSYS], not a separate RWA app. VPay App provides access to RWA investment features via integrated RWA module.
- **WARNING (MEMO-DISC-01):** Welcome carousel must include an investment risk disclaimer slide. Vietnamese securities regulations require risk disclosures at point of marketing. App Store listing must also include risk disclosure language. No implicit return promises should appear without accompanying risk warnings.
- **WARNING (MEMO-DISC-04):** The "Skip" path on FT_WCAR.US02 leads to anonymous browse mode — user skips UF_ONBO entirely and goes directly to UF_PREO (browsing projects). Anonymous mode is not fully documented: need to define visible vs gated content for anonymous users, and include a persistent "Register to invest" CTA on browse mode screens.

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_DISC.EP_INST**<br/>VPay App Installation | | - User downloads and opens VPay App for the first time [EXTSYS]<br/>- VPay App includes RWA investment module<br/>- Critical moment: first impression must be positive |
| | FT_DNLD.US01<br/>Download and Install | - User taps Install button for VPay App<br/>- Thinking: "Small app size, won't take up much space"<br/>- **Acceptance Criteria:** VPay App size `<`100MB; Download completes within 60 seconds on 4G; Progress indicator shown during download |
| | FT_DNLD.US02<br/>Download and Install | - User opens VPay App<br/>- Thinking: "Let's see what this is about"<br/>- **Acceptance Criteria:** VPay App launches within 3 seconds; No crash on first launch; Permissions requested only when needed |
| | FT_SPLS.US01<br/>Splash Screen | - User sees splash screen<br/>- Thinking: "VinGroup backing gives me confidence"<br/>- **Acceptance Criteria:** VinGroup logo displayed prominently; Loading animation smooth (60fps); Splash duration 2-3 seconds max |
| | FT_WCAR.US01<br/>Welcome Carousel | - User views welcome carousel<br/>- Thinking: "This sounds like exactly what I need"<br/>- **Acceptance Criteria:** Exactly 3 slides displayed; Swipe navigation works; Each slide has: headline, description, illustration; Progress dots visible;<br/>  - Initial: Slides focus on flagship project story and single investment opportunity<br/>  - Later: Slides highlight portfolio diversity and multiple project options |
| | FT_WCAR.US02<br/>Welcome Carousel | - User taps Get Started<br/>- Thinking: "Ready to explore more"<br/>- **Acceptance Criteria:** CTA button visible without scrolling; Button text is "Get Started"; Tap navigates to registration flow; Skip option available |

---

## UF_ONBO (RL_INV): Registration and KYC

**Duration:** 10-15 minutes
**Goal:** Create VPay account and complete KYC verification to access RWA investment module
**Sentiment:** Nervous to Relieved

**Architecture Note:**
- Investor uses **VPay App** (installed in UF_DISC) - there is NO separate RWA app
- RWA investment features are accessed as an **integrated module within VPay App**
- All registration, sign-in, and eKYC happen **within VPay App**
- Upon eKYC approval, RWA Platform **automatically** creates custodial wallet + on-chain identity

**Responsibility Split:**
- **VPay App:** User registration, authentication, eKYC process, fiat wallet
- **RWA Platform (Backend):** Upon eKYC approval → creates custodial wallet → deploys on-chain identity

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_ONBO.EP_SIUP**<br/>VPay Sign Up | FT_SIUB<br/>Sign Up Button | - User taps Sign Up in VPay App (RWA module)<br/>- Native VPay registration flow (not OAuth)<br/>- VPay branding visible for trust | Must-have |
| | FT_VREG<br/>VPay Registration | - User enters email, phone, creates password within VPay App<br/>- OTP verification for phone number<br/>- Account created in VPay system | Must-have |
| | FT_WELC<br/>Welcome Screen | - User sees welcome screen in VPay App<br/>- RWA investment module now accessible<br/>- Next step: Complete eKYC | Must-have |
| **UF_ONBO.EP_SSIN**<br/>VPay Sign In | FT_SSIN<br/>Sign In | - User signs in with existing VPay credentials<br/>- Email/phone + password or biometric<br/>- Native VPay authentication (not OAuth) | Must-have |
| **UF_ONBO.EP_EKYC**<br/>KYC Verification | FT_GATE<br/>KYC Gate | - Shows KYC Level 2 requirement for investment<br/>- Clear explanation of why KYC is needed<br/>- CTA button to start eKYC flow | Must-have |
| | FT_DOCS<br/>Document Upload | - Upload National ID (front and back)<br/>- Take selfie with ID for liveness check<br/>- All within VPay App | Must-have |
| | FT_APRC<br/>AI Processing | - 30-second AI verification process<br/>- Shows approval result (approved or under review)<br/>- On approval: triggers RWA wallet setup | Must-have |
| **UF_ONBO.EP_WLST**<br/>Automatic Wallet Setup | FT_AUTO<br/>Auto Wallet Creation | - **Triggered automatically** after eKYC approval<br/>- RWA Platform creates custodial wallet<br/>- On-chain identity deployed with compliance claims<br/>- User notified when complete | Must-have |

### Epic, Feature, and User Story Details

#### EP_SIUP: VPay Sign Up

- **Note:** User is already in VPay App. Sign up happens natively within VPay App.
- **WARNING (MEMO-ONBO-05):** VPay handles ToS/Privacy consent during sign-up. RWA Platform does not need a separate consent step for registration. All consent records must include timestamps.

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_ONBO.EP_SIUP**<br/>VPay Sign Up | | - New user creates VPay account within VPay App<br/>- First-time users without existing VPay account |
| | FT_SIUB.US01<br/>Sign Up Button | - User taps Get Started from welcome carousel<br/>- Thinking: "I'm new here, let me create an account"<br/>- **Acceptance Criteria:** Screen displays "Sign Up" button; VPay branding visible; Button prominent on screen |
| | FT_SIUB.US02<br/>Sign Up Button | - User taps Sign Up button<br/>- Thinking: "Creating my account now"<br/>- **Acceptance Criteria:** Opens registration form within VPay App; |
| | FT_VREG.US01<br/>VPay Registration | - User enters email address<br/>- Thinking: "Using my main email for this"<br/>- **Acceptance Criteria:** Email format validation; Check for existing account; Clear error messages |
| | FT_VREG.US02<br/>VPay Registration | - User enters phone number and receives OTP<br/>- Thinking: "Standard verification process"<br/>- **Acceptance Criteria:** Vietnamese phone format (+84); OTP sent within 30 seconds; Resend option after 60 seconds |
| | FT_VREG.US03<br/>VPay Registration | - User creates password and confirms<br/>- Thinking: "Need a strong password"<br/>- **Acceptance Criteria:** Password strength indicator; Minimum 8 characters with complexity; Confirmation must match |
| | FT_WELC.US01<br/>Welcome Screen | - User sees welcome screen after account created<br/>- Thinking: "Account created, ready to explore"<br/>- **Acceptance Criteria:** Welcome message with user name; Next step: Complete eKYC; RWA module accessible |

---

#### EP_SSIN: VPay Sign In

- **Note:** User is already in VPay App. Sign in happens natively.
- **WARNING (MEMO-ONBO-05):** VPay handles session consent during sign-in. No separate RWA consent step needed.

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_ONBO.EP_SSIN**<br/>VPay Sign In | | - Existing VPay user signs in to access RWA module<br/>- Native VPay authentication (not OAuth) |
| | FT_SSIN.US01<br/>Sign In | - User taps Sign In from welcome carousel<br/>- Thinking: "I already have VPay, this should be quick"<br/>- **Acceptance Criteria:** Sign In button visible; VPay branding; Opens sign in form |
| | FT_SSIN.US02<br/>Sign In | - User enters credentials or uses biometric<br/>- Thinking: "Using Face ID is so convenient"<br/>- **Acceptance Criteria:** Supports email/phone + password; Supports Face ID and fingerprint; Authentication within VPay App |
| | FT_SSIN.US03<br/>Sign In | - User sees home screen after sign in<br/>- Thinking: "Now I can access RWA investments"<br/>- **Acceptance Criteria:** RWA investment module accessible; If eKYC complete: full access; If not: prompted to complete eKYC |

---

#### EP_EKYC: KYC Verification

- **Note:** eKYC happens within VPay App (user is already in VPay). After approval, RWA Platform is notified and **automatically** creates custodial wallet + deploys on-chain identity.
- **WARNING:** No investor accreditation/qualification check is implemented for Alpha (mass retail product). Accreditation may be needed later for professional investor tiers.
- **WARNING:** VPay handles KYC data sharing consent during eKYC flow. All consent records must include timestamps.
- **WARNING:** Data handoff contract between VPay and RWA is not fully defined (what fields, what format, when pushed). KYC expiry handling not yet defined.

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_ONBO.EP_EKYC**<br/>KYC Verification | | - User completes identity verification within VPay App<br/>- On approval: RWA Platform notified, automatically creates wallet + on-chain identity<br/>- Required for regulatory compliance and investment eligibility |
| | FT_GATE.US01<br/>KYC Gate | - User sees KYC gate screen explaining requirement<br/>- Thinking: "I understand why they need to verify me"<br/>- **Acceptance Criteria:** Clear explanation of KYC Level 2 requirement; Lists benefits of completing KYC; Shows estimated time (5 minutes) |
| | FT_GATE.US02<br/>KYC Gate | - User taps Complete KYC button<br/>- Thinking: "Let me get this done quickly"<br/>- **Acceptance Criteria:** Opens eKYC flow within VPay App; Step-by-step progress indicator |
| | FT_DOCS.US01<br/>Document Upload | - User uploads National ID front image<br/>- Thinking: "Need to make sure the photo is clear"<br/>- **Acceptance Criteria:** Camera opens with ID frame guide; Image quality check before submission; Retry option if image is blurry |
| | FT_DOCS.US02<br/>Document Upload | - User uploads National ID back image<br/>- Thinking: "Almost done with documents"<br/>- **Acceptance Criteria:** Same quality standards as front; MRZ code detected if applicable; Progress indicator shows 2/3 complete |
| | FT_DOCS.US03<br/>Document Upload | - User takes selfie holding ID for liveness check<br/>- Thinking: "This proves it's really me"<br/>- **Acceptance Criteria:** Face detection with bounding box; Liveness detection (blink, turn head); Match selfie to ID photo |
| | FT_APRC.US01<br/>AI Processing | - User waits for AI processing<br/>- Thinking: "Hope this goes smoothly"<br/>- **Acceptance Criteria:** Processing animation displayed; Estimated wait time shown; Processing completes within 30 seconds |
| | FT_APRC.US02<br/>AI Processing | - User sees approval result<br/>- Thinking: "Great, I'm approved!"<br/>- **Acceptance Criteria:** Shows "KYC Approved" or "Under Review (1-2 days)"; Auto-approval rate ~85%; Clear next steps displayed |
| | FT_APRC.US03<br/>AI Processing | - User sees "Account Ready" confirmation<br/>- Thinking: "My account is ready to invest"<br/>- **Acceptance Criteria:** RWA Platform notified of approval; Wallet + on-chain identity created automatically; User notified "Your account is ready" |

---

#### EP_WLST: Automatic Wallet Setup

- **Note:** Wallet creation is **automatic** - triggered after eKYC approval. No manual wallet selection by user.
- Wallet addresses are managed by the platform for security and compliance; external deposit addresses require verification during Token Offering settlement.
- Self-custody wallet option is available later in UF_XFER for outbound transfers (not during onboarding).
- **WARNING:** Wallet and OnChainID creation is currently automatic with no explicit user consent. No legal requirement identified yet. Decision on consent placement deferred — options include: one-time consent at first ICO participation, consent step between eKYC and wallet creation, or opt-in during profile setup.
- **WARNING:** Two communication models coexist: eKYC approval trigger uses Model 1 (VPay Backend → RWA Platform API, direct push). Wallet.ready notification back to VPay uses Model 2 (Event Bus, Kafka/Redis Streams).

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_ONBO.EP_WLST**<br/>Automatic Wallet Setup | | - Triggered automatically after eKYC approval<br/>- RWA Platform creates custodial wallet<br/>- On-chain identity deployed with compliance claims<br/>- User notified when complete |
| | FT_AUTO.US01<br/>Auto Wallet Creation | - RWA Platform receives eKYC approval notification<br/>- Thinking: (backend processing)<br/>- **Acceptance Criteria:** Approval notification received; Wallet creation initiated; On-chain identity deployment initiated |
| | FT_AUTO.US02<br/>Auto Wallet Creation | - Platform creates custodial wallet<br/>- Thinking: (backend processing)<br/>- **Acceptance Criteria:** Wallet address generated; Keys stored securely; Wallet linked to user account |
| | FT_AUTO.US03<br/>Auto Wallet Creation | - Platform deploys on-chain identity<br/>- Thinking: (backend processing)<br/>- **Acceptance Criteria:** On-chain identity deployed; Compliance claims issued; Wallet linked to identity |
| | FT_AUTO.US04<br/>Auto Wallet Creation | - User receives notification that account is ready<br/>- Thinking: "My wallet is ready!"<br/>- **Acceptance Criteria:** Push notification: "Your investment account is ready"; Wallet visible in Profile; Full RWA module access granted |

---

## UF_PREO (RL_INV): Token Offering Preparation

**Duration:** 1-3 days
**Goal:** Browse projects and prepare funds for investment
**Sentiment:** Curious to Informed

**Architecture Note:**
- Investor interacts with **VPay App** → VPay Backend orchestrates all operations → VPay Backend calls RWA Platform API
- Non-registered users may browse project info and property details (read-only)
- Registration and eKYC required for depositing VND

**Responsibility Split:**
- **VPay App/Backend:** Display UI, handle deposits, wallet balance management
- **RWA Platform (Backend):** Project data, property details, calculator parameters, Token Offering data

**Relationship to UF_TOKO:**
- **Shared Project Hub:** Both UF_PREO and UF_TOKO use the same Project Hub (web + app) for project listing and details
- **UF_PREO Focus:** Research and discovery - projects in ALL states (Coming Soon, Active, Past); deep-dive into project info, documents, properties; deposit funds in preparation
- **UF_TOKO Focus:** Active participation - only ACTIVE Token Offerings with live metrics (amount raised, investor count, countdown like Kickstarter); whitelist and commit flow
- **Transition:** User researches in UF_PREO → When ready to invest in active offering, enters UF_TOKO flow

**Get Help:** "Need Help?" button available on Project Details, Property Details, and Education screens → Opens ticket with "Pre-Offering Inquiry" category pre-filled (see UF_SUPP)

**Phase Considerations:**
- **Initial Phase (Year 1-2):** 1-2 projects available; focus on understanding the flagship project deeply; simpler navigation
- **Later Phase (Year 3+):** Multiple projects; need for filtering, comparison, and project selection; richer discovery features

### Epic and Feature Summary

| Epic | Feature | Description | Priority | Phase |
|------|---------|-------------|----------|-------|
| **UF_PREO.EP_HOME**<br/>Home Screen | FT_HERO<br/>Hero Banner | - Featured Token Offering banner<br/>- Project name and countdown timer<br/>- Invest Now CTA button | Must-have | Both |
| | FT_TOCO<br/>Token Offering Cards | - Active Token Offerings displayed<br/>- Status, countdown, raised amount visible<br/>- Tap to view offering details | Must-have | Both |
| | FT_FEAT<br/>Featured Projects | - Initial: Single project spotlight with deep info<br/>- Later: 3+ project cards with comparison<br/>- Education center link | Must-have | Both |
| **UF_PREO.EP_PROJ**<br/>Project Browsing | FT_PJLS<br/>Project List | - Later Phase: Grid/list view with filters<br/>- Valuation, token price, status visible<br/>- Properties count per project | Must-have | Later |
| | FT_PJCM<br/>Project Comparison | - Later Phase: Side-by-side comparison<br/>- Compare 2-3 projects on key metrics<br/>- Help users make investment decisions | Should-have | Later |
| | FT_PJDT<br/>Project Details | - Tabs: Overview, Properties, Documents, Market<br/>- Location, developer, valuation info<br/>- Token supply and min investment shown | Must-have | Both |
| | FT_IMGL<br/>Image Gallery | - 10+ photos with swipe navigation<br/>- 360 virtual tour available<br/>- Zoom and fullscreen support | Must-have | Both |
| **UF_PREO.EP_PROP**<br/>Property Browsing | FT_PPLS<br/>Property List | - Filter by type (Studio, 2BR, 3BR)<br/>- Sort by estimated value (from appraisal/oracle), size, token weight<br/>- Search functionality | Must-have | Both |
| | FT_PPDT<br/>Property Details | - 20+ photos with 3D virtual tour<br/>- Size, floor, building, token weight<br/>- Map with location and amenities | Must-have | Both |
| | FT_WTLS<br/>Watchlist | - Save favorite properties with heart icon<br/>- View saved properties in one place<br/>- Receive alerts on watchlisted items | Should-have | Both |
| **UF_PREO.EP_EDUC**<br/>Education | FT_EDCT<br/>Education Center | - Getting Started articles and videos<br/>- Advanced topics and FAQs<br/>- Tokenization explainers | Must-have | Both |
| | FT_CALC<br/>Investment Calculator | - Input investment amount<br/>- Initial: Calculate for the project<br/>- Later: Select project to calculate | Must-have | Both |
| **UF_PREO.EP_DPST**<br/>Deposit Funds | FT_WALL<br/>Wallet Screen | - VPay balance displayed<br/>- Available for investment amount<br/>- Deposit/Withdraw buttons | Must-have | Both |
| | FT_METH [EXTSYS]<br/>Deposit Methods | - Bank Transfer (recommended)<br/>- VPay Card and E-Wallet options<br/>- QR code for quick transfer | Must-have | Both |
| | FT_CONF<br/>Deposit Confirmation | - Push notification on credit<br/>- Success animation<br/>- Updated balance display | Must-have | Both |

### Epic, Feature, and User Story Details

#### EP_HOME: Home Screen

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PREO.EP_HOME**<br/>Home Screen | | - User lands on home screen after onboarding<br/>- Discovers investment opportunities and platform features |
| | FT_HERO.US01<br/>Hero Banner | - User sees hero banner with featured Token Offering<br/>- Thinking: "This looks like a premium investment opportunity"<br/>- **Acceptance Criteria:** Banner shows project name and image; Countdown timer visible; "Invest Now" CTA button prominent |
| | FT_TOCO.US01<br/>Token Offering Cards | - User sees active Token Offerings<br/>- Thinking: "I can see what's available right now"<br/>- **Acceptance Criteria:**<br/>  - Initial: 1-2 cards (flagship project focus)<br/>  - Later: Multiple cards with scroll; Each shows status, price, raised amount; Countdown timer per card |
| | FT_FEAT.US01<br/>Featured Projects | - User sees featured projects section<br/>- Thinking: "These are the top opportunities"<br/>- **Acceptance Criteria:**<br/>  - Initial: Single project spotlight with comprehensive details (why this project, key highlights, developer story)<br/>  - Later: 3+ project cards with images; Each shows valuation and token price; Tap navigates to project details |
| | FT_FEAT.US02<br/>Featured Projects | - User sees education center link<br/>- Thinking: "I should learn more about tokenization"<br/>- **Acceptance Criteria:** "Learn about tokenization" link visible; Navigates to Education Center; Icon indicates educational content |
| | FT_FEAT.US03<br/>Featured Projects | - User sees market highlights<br/>- Thinking: "Good to see the market overview"<br/>- **Acceptance Criteria:**<br/>  - Initial: Single token price and metrics<br/>  - Later: Token prices for multiple projects; 24h volume shown; Market trend indicators |

---

#### EP_PROJ: Project Browsing

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PREO.EP_PROJ**<br/>Project Browsing | | - User explores available real estate projects<br/>- Initial: Deep dive into flagship project; Later: Compare projects to find best fit |
| | FT_PJLS.US01<br/>Project List | - User taps to view available projects<br/>- Thinking: "Let me see what's available"<br/>- **Acceptance Criteria:**<br/>  - Initial: Direct to Project Details (single project focus); "More projects coming soon" indicator<br/>  - Later: Opens Projects screen with grid/list toggle; All projects loaded within 2 seconds |
| | FT_PJLS.US02<br/>Project List | - User sees project cards with key metrics<br/>- Thinking: "I can compare projects easily"<br/>- **Acceptance Criteria:**<br/>  - Initial: N/A (single project)<br/>  - Later: Image, valuation, token price per card; Status badge (Active, Coming Soon, Sold Out); Properties count displayed |
| | FT_PJCM.US01<br/>Project Comparison | - User compares multiple projects<br/>- Thinking: "Which project suits me best?"<br/>- **Acceptance Criteria:**<br/>  - Initial: N/A<br/>  - Later: Compare 2-3 projects side-by-side; Key metrics: yield, price, location, completion; Highlight differences |
| | FT_PJDT.US01<br/>Project Details | - User taps project card to view details<br/>- Thinking: "I want to learn more about this project"<br/>- **Acceptance Criteria:** Opens Project Details screen within 1 second; Header with project image; Tab navigation visible |
| | FT_PJDT.US02<br/>Project Details | - User views Overview tab<br/>- Thinking: "This covers all the essential info"<br/>- **Acceptance Criteria:** Location on map; Developer info with track record; Valuation, token supply, min investment displayed |
| | FT_PJDT.US03<br/>Project Details | - User views Properties tab<br/>- Thinking: "I can see individual units"<br/>- **Acceptance Criteria:** List of properties with filters; Unit types and availability shown; Tap to view property details |
| | FT_PJDT.US04<br/>Project Details | - User views Documents tab<br/>- Thinking: "Legal documents are available for review"<br/>- **Acceptance Criteria:** Offering memorandum downloadable; Legal opinion accessible; Inspection report available |
| | FT_PJDT.US05<br/>Project Details | - User views Market Data tab<br/>- Thinking: "I can analyze the market performance"<br/>- **Acceptance Criteria:** Token price chart with 7d, 30d, All views; Trading volume displayed; Market cap shown |
| | FT_IMGL.US01<br/>Image Gallery | - User views project image gallery<br/>- Thinking: "Beautiful photos of the property"<br/>- **Acceptance Criteria:** 10+ photos minimum; Swipe navigation; Pinch to zoom enabled |
| | FT_IMGL.US02<br/>Image Gallery | - User taps 360 virtual tour<br/>- Thinking: "This gives me a real feel for the space"<br/>- **Acceptance Criteria:** Immersive 360 view opens; Touch/gyro navigation; Exit button visible |

---

#### EP_PROP: Property Browsing

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PREO.EP_PROP**<br/>Property Browsing | | - User explores individual properties within projects<br/>- Finds specific units that match preferences |
| | FT_PPLS.US01<br/>Property List | - User filters properties by type<br/>- Thinking: "I want to see only 2BR units"<br/>- **Acceptance Criteria:** Filter by Studio, 2BR, 3BR, etc.; Filter chips visible; Results update instantly |
| | FT_PPLS.US02<br/>Property List | - User sorts properties<br/>- Thinking: "Show me the lowest value first"<br/>- **Acceptance Criteria:** Sort by estimated value, size, token weight; Sort direction toggle; Current sort indicated |
| | FT_PPDT.US01<br/>Property Details | - User taps property to view details<br/>- Thinking: "This unit looks perfect for me"<br/>- **Acceptance Criteria:** Opens Property Details screen; High-res images displayed; Key specs visible |
| | FT_PPDT.US02<br/>Property Details | - User sees property images and 3D tour<br/>- Thinking: "I can visualize living here"<br/>- **Acceptance Criteria:** 20+ photos available; 3D virtual tour option; Gallery navigation smooth |
| | FT_PPDT.US03<br/>Property Details | - User sees property specifications<br/>- Thinking: "All the details I need"<br/>- **Acceptance Criteria:** Size in sqm; Floor and building displayed; Token weight and value shown |
| | FT_PPDT.US04<br/>Property Details | - User sees location on map<br/>- Thinking: "Good location with amenities nearby"<br/>- **Acceptance Criteria:** Map with building pin; Nearby amenities marked; Distance to key locations shown |
| | FT_PPDT.US05<br/>Property Details | - User sees financial calculator<br/>- Thinking: "Let me calculate my potential returns"<br/>- **Acceptance Criteria:** Token cost for this property; Rental yield estimate; Investment calculator integrated |
| | FT_WTLS.US01<br/>Watchlist | - User taps heart icon to save property<br/>- Thinking: "I want to keep track of this one"<br/>- **Acceptance Criteria:** Heart icon fills on tap; Property added to watchlist; Toast notification confirms save |

---

#### EP_EDUC: Education

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PREO.EP_EDUC**<br/>Education | | - User learns about real estate tokenization<br/>- Builds confidence through educational content |
| | FT_EDCT.US01<br/>Education Center | - User views Getting Started section<br/>- Thinking: "I need to understand tokenization first"<br/>- **Acceptance Criteria:** "What is Real Estate Tokenization" article available; Beginner-friendly language; Reading time shown |
| | FT_EDCT.US02<br/>Education Center | - User watches How Token Offerings Work video<br/>- Thinking: "Visual explanation helps me understand"<br/>- **Acceptance Criteria:** 5-minute video available; Play/pause controls; Progress bar visible |
| | FT_EDCT.US03<br/>Education Center | - User reads Understanding Lock-up and Vesting<br/>- Thinking: "I need to know the restrictions"<br/>- **Acceptance Criteria:** Clear explanation of terms; Examples included; Related articles linked |
| | FT_EDCT.US04<br/>Education Center | - User views Advanced Topics<br/>- Thinking: "I want to learn about redemption and taxes"<br/>- **Acceptance Criteria:** Redemption Process article; Liquidation explained; Tax Guide available |
| | FT_EDCT.US05<br/>Education Center | - User views FAQs<br/>- Thinking: "I have some specific questions"<br/>- **Acceptance Criteria:** 20+ common questions; Search functionality; Expandable answers |
| | FT_CALC.US01<br/>Investment Calculator | - User enters investment amount<br/>- Thinking: "Let me see what 50M gets me"<br/>- **Acceptance Criteria:** Amount input field; Currency formatting; Min/max validation |
| | FT_CALC.US02<br/>Investment Calculator | - User sees token calculation<br/>- Thinking: "So I'd own 500 tokens"<br/>- **Acceptance Criteria:** Token count displayed; Property share percentage shown; Visual representation |
| | FT_CALC.US03<br/>Investment Calculator | - User sees projected returns<br/>- Thinking: "7.2% yield is better than my bank"<br/>- **Acceptance Criteria:** Annual income estimated; Yield percentage shown; Monthly income breakdown |
| | FT_CALC.US04<br/>Investment Calculator | - User sees comparison with bank savings<br/>- Thinking: "I'd earn 2.6M more per year"<br/>- **Acceptance Criteria:** Bank savings rate (2%) shown; Difference calculated; Visual comparison chart |
| | FT_CALC.US05<br/>Investment Calculator | - User taps Invest button<br/>- Thinking: "I'm ready to invest now"<br/>- **Acceptance Criteria:** CTA button prominent; Navigates to Token Offering flow; Amount pre-filled |

---

#### EP_DPST: Deposit Funds

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PREO.EP_DPST**<br/>Deposit Funds | | - User adds funds to VPay wallet for investment<br/>- Prepares for Token Offering participation |
| | FT_WALL.US01<br/>Wallet Screen | - User taps Wallet tab<br/>- Thinking: "Let me check my balance"<br/>- **Acceptance Criteria:** Opens Wallet screen; Balance prominently displayed; Last updated timestamp shown |
| | FT_WALL.US02<br/>Wallet Screen | - User sees current balance (0 VND)<br/>- Thinking: "I need to deposit funds first"<br/>- **Acceptance Criteria:** VPay Balance: 0 VND; Available for Investment shown; Total Invested displayed |
| | FT_WALL.US03<br/>Wallet Screen | - User taps Deposit Funds<br/>- Thinking: "Let me add money to my wallet"<br/>- **Acceptance Criteria:** Opens deposit flow; Clear navigation path; Back button available |
| | FT_METH.US01<br/>Deposit Methods | - User sees deposit options<br/>- Thinking: "Bank transfer seems reliable"<br/>- **Acceptance Criteria:** Bank Transfer marked as recommended; VPay Card option; E-Wallet option; Fees displayed per method |
| | FT_METH.US02<br/>Deposit Methods | - User selects Bank Transfer<br/>- Thinking: "This is my preferred method"<br/>- **Acceptance Criteria:** Opens bank transfer screen; Instructions displayed; Amount input available |
| | FT_METH.US03<br/>Deposit Methods | - User enters amount (50M VND)<br/>- Thinking: "This is my investment budget"<br/>- **Acceptance Criteria:** Amount input with validation; Min/max limits shown; Formatted display (50,000,000) |
| | FT_METH.US04<br/>Deposit Methods | - User sees bank transfer details<br/>- Thinking: "I'll copy this to my banking app"<br/>- **Acceptance Criteria:** Account name displayed; Account number shown; Bank name and transfer content provided |
| | FT_METH.US05<br/>Deposit Methods | - User taps Copy Account Info<br/>- Thinking: "Easy to paste in my bank app"<br/>- **Acceptance Criteria:** All info copied to clipboard; Toast confirms copy; One-tap copy button |
| | FT_METH.US06<br/>Deposit Methods | - User sees QR code for quick transfer<br/>- Thinking: "I can just scan this"<br/>- **Acceptance Criteria:** Large QR code displayed; Transfer reference embedded; Compatible with major bank apps |
| | FT_METH.US07<br/>Deposit Methods | - User scans QR with banking app<br/>- Thinking: "Auto-fill saves time"<br/>- **Acceptance Criteria:** QR recognized by bank app; Transfer info auto-filled; Amount pre-populated |
| | FT_METH.US08<br/>Deposit Methods | - User confirms transfer in banking app<br/>- Thinking: "Transfer complete on my end"<br/>- **Acceptance Criteria:** Note shows "Funds typically reflect in 1-30 minutes"; Webhook processing enabled; Status polling active |
| | FT_CONF.US01<br/>Deposit Confirmation | - User receives push notification<br/>- Thinking: "My funds have arrived!"<br/>- **Acceptance Criteria:** Notification: "50,000,000 VND added to your wallet"; Sound/vibration alert; Tap opens wallet |
| | FT_CONF.US02<br/>Deposit Confirmation | - User sees updated balance<br/>- Thinking: "Now I can invest"<br/>- **Acceptance Criteria:** VPay Balance: 50,000,000 VND; Available for Investment updated; Transaction in history |
| | FT_CONF.US03<br/>Deposit Confirmation | - User sees success animation<br/>- Thinking: "Nice visual feedback"<br/>- **Acceptance Criteria:** Celebration animation plays; Amount displayed prominently; "Start Investing" CTA shown |

---

## UF_TOKO (RL_INV): Token Offering Participation

**Duration:** 2-5 minutes
**Goal:** Join whitelist and commit investment
**Sentiment:** Focused to Determined

**Architecture Note:**
- Investor interacts with **VPay App** → VPay Backend orchestrates all operations → VPay Backend calls RWA Platform API
- All commitment operations go through VPay first; VPay handles fiat escrow and gating

**Responsibility Split:**
- **VPay App/Backend:** Balance checks, VND deposits, fiat fund holding (escrow), biometric confirmation, gating logic (eKYC check)
- **RWA Platform (Backend):** On-chain whitelist verification, token escrow preparation, offering details, commitment recording

**Relationship to UF_PREO:**
- **Shared Project Hub:** Same Project Hub (web + app) as UF_PREO, but filtered to show ACTIVE Token Offerings only
- **Live Offering Metrics:** Like Kickstarter - displays real-time funding progress, investor count, time remaining
- **Entry Point:** User comes from UF_PREO (after research) or directly via notification/marketing link
- **Distinction:** UF_PREO = browse and prepare; UF_TOKO = commit and invest

**Get Help:** "Need Help?" button available on Offering Details, Commitment, and Confirmation screens → Opens ticket with "Token Offering Issue" category pre-filled (see UF_SUPP)

**Phase Considerations:**
- **Initial Phase (Year 1-2):** 1 active Token Offering at a time; focus on flagship project offering; simpler decision (invest or wait)
- **Later Phase (Year 3+):** Multiple concurrent Token Offerings possible; need to choose which offering to join; compare live metrics across offerings

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_TOKO.EP_DISC**<br/>Token Offering Discovery | FT_CPLS<br/>Offering List | - Active Token Offerings with live metrics<br/>- Kickstarter-style: amount raised, investor count, % funded<br/>- Countdown timers and funding progress bars | Must-have |
| | FT_CPDT<br/>Offering Details | - Header with live funding stats and countdown<br/>- Kickstarter-style: raised amount, investor count, progress bar<br/>- Tabs: Overview, Terms, Project Info; Join Offering CTA | Must-have |
| **UF_TOKO.EP_JOIN**<br/>Join Process | FT_WTLT<br/>Whitelist | - Step 1: Join Whitelist flow<br/>- On-chain identity verification<br/>- Success confirmation when whitelisted | Must-have |
| | FT_CMMT<br/>Commitment Screen | - Step 2: Commit Investment flow<br/>- Amount slider with min/max range<br/>- Token calculation and terms checkbox | Must-have |
| **UF_TOKO.EP_CONF**<br/>Confirmation | FT_BIOM<br/>Biometric Auth | - Biometric authentication trigger<br/>- Face ID or fingerprint verification<br/>- Processing commitment message | Must-have |
| | FT_SUCC<br/>Success Screen | - Commitment confirmed celebration<br/>- Details: amount, token count<br/>- Next steps and View Portfolio CTA | Must-have |
| **UF_TOKO.EP_MODI**<br/>Commitment Modification | FT_PEND<br/>Pending Commitment | - View pending commitment in portfolio<br/>- Status shows "Awaiting Allocation"<br/>- Modify/Cancel options available | Must-have |
| | FT_MODF<br/>Modify Commitment | - Adjust commitment amount before deadline<br/>- VPay adjusts fiat escrow hold<br/>- RWA updates commitment record | Should-have |
| | FT_CANL<br/>Cancel Commitment | - Cancel commitment before deadline<br/>- VPay releases fiat hold<br/>- Full refund to wallet | Should-have |

### Epic, Feature, and User Story Details

#### EP_DISC: Token Offering Discovery

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_TOKO.EP_DISC**<br/>Token Offering Discovery | | - User discovers and selects Token Offering<br/>- Reviews offering details before joining |
| | FT_CPLS.US01<br/>Offering List | - User taps Active Token Offerings from home<br/>- Thinking: "Let me see all available offerings"<br/>- **Acceptance Criteria:** Opens Offering List screen; Active offerings displayed first; Load time `<` 2 seconds |
| | FT_CPLS.US02<br/>Offering List | - User sees active offering cards with live metrics<br/>- Thinking: "45M raised from 120 investors - this is popular!"<br/>- **Acceptance Criteria:** Kickstarter-style metrics: amount raised (e.g., 45M/100M), investor count (e.g., 120 backers), % funded progress bar; Token price and min investment; Countdown timer (e.g., "2 days left") |
| | FT_CPLS.US03<br/>Offering List | - User sees past offerings section<br/>- Thinking: "I can see previous Token Offerings"<br/>- **Acceptance Criteria:** Completed Token Offerings listed; Final raise amount shown; "Sold Out" badge displayed |
| | FT_CPLS.US04<br/>Offering List | - User taps offering card<br/>- Thinking: "I want details on this one"<br/>- **Acceptance Criteria:** Opens Offering Details screen; Transition animation smooth; Back navigation available |
| | FT_CPDT.US01<br/>Offering Details | - User sees offering header with live stats<br/>- Thinking: "45% funded with 120 investors - momentum is building!"<br/>- **Acceptance Criteria:** Live metrics header: raised/target (e.g., 45M/100M = 45%), investor count, progress bar; Large countdown timer; Project name and status badge |
| | FT_CPDT.US02<br/>Offering Details | - User views Overview tab<br/>- Thinking: "This covers the key investment terms"<br/>- **Acceptance Criteria:** Token price displayed; Total supply shown; Min/max investment; Lock-up and vesting periods |
| | FT_CPDT.US03<br/>Offering Details | - User views Terms tab<br/>- Thinking: "I need to understand the allocation rules"<br/>- **Acceptance Criteria:** Allocation method explained; Refund method described; Platform fees listed |
| | FT_CPDT.US04<br/>Offering Details | - User sees action buttons<br/>- Thinking: "I'm ready to join this offering"<br/>- **Acceptance Criteria:** "Join Offering" primary CTA button; "Learn More" secondary button; Button disabled if offering ended |

---

#### EP_JOIN: Join Process

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_TOKO.EP_JOIN**<br/>Join Process | | - User joins whitelist and commits investment<br/>- Two-step process for regulatory compliance |
| | FT_WTLT.US01<br/>Whitelist | - User taps Join Offering button<br/>- Thinking: "Let's get started"<br/>- **Acceptance Criteria:** App checks KYC Level 2; Proceeds if KYC valid; Shows error if KYC incomplete |
| | FT_WTLT.US02<br/>Whitelist | - User sees whitelist screen<br/>- Thinking: "First I need to join the whitelist"<br/>- **Acceptance Criteria:** Step 1 indicator visible; Explanation of whitelist purpose; "Join Whitelist" button |
| | FT_WTLT.US03<br/>Whitelist | - User taps Join Whitelist<br/>- Thinking: "This should be quick"<br/>- **Acceptance Criteria:** Loading: "Adding you to whitelist"; On-chain identity verification; Process < 10 seconds |
| | FT_WTLT.US04<br/>Whitelist | - User sees whitelist success<br/>- Thinking: "Great, now I can commit"<br/>- **Acceptance Criteria:** Success message: "You are whitelisted"; Checkmark animation; Auto-proceeds to Step 2 |
| | FT_CMMT.US01<br/>Commitment Screen | - User sees commitment screen<br/>- Thinking: "Now I choose how much to invest"<br/>- **Acceptance Criteria:** Step 2 indicator visible; Available balance shown; Commitment form displayed |
| | FT_CMMT.US02<br/>Commitment Screen | - User sees amount slider<br/>- Thinking: "I can adjust my investment easily"<br/>- **Acceptance Criteria:** Slider range: min to max (e.g., 10M-100M VND); Current value displayed; Haptic feedback on change |
| | FT_CMMT.US03<br/>Commitment Screen | - User sets investment amount<br/>- Thinking: "50M is my target investment"<br/>- **Acceptance Criteria:** Amount: 50,000,000 VND; Manual input option available; Validation for min/max |
| | FT_CMMT.US04<br/>Commitment Screen | - User sees token calculation<br/>- Thinking: "I'll get 500 tokens for 50M"<br/>- **Acceptance Criteria:** Tokens: 500 displayed; Payment hold: 50M shown; Clear calculation breakdown |
| | FT_CMMT.US05<br/>Commitment Screen | - User sees allocation note<br/>- Thinking: "I understand there might be oversubscription"<br/>- **Acceptance Criteria:** Note explains funds held until offering ends; Excess refunded if oversubscribed; Timeline displayed |
| | FT_CMMT.US06<br/>Commitment Screen | - User checks terms checkbox<br/>- Thinking: "I accept the investment terms"<br/>- **Acceptance Criteria:** Checkbox: "I understand the terms and risks"; Must check to proceed; Terms link available |

---

#### EP_CONF: Confirmation

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_TOKO.EP_CONF**<br/>Confirmation | | - User confirms commitment with biometric authentication<br/>- Receives confirmation and next steps |
| | FT_BIOM.US01<br/>Biometric Auth | - User taps Commit button<br/>- Thinking: "Final step to confirm my investment"<br/>- **Acceptance Criteria:** Commit button enabled when checkbox checked; Biometric prompt appears; Cancel option available |
| | FT_BIOM.US02<br/>Biometric Auth | - User authenticates with biometric<br/>- Thinking: "Using Face ID is secure"<br/>- **Acceptance Criteria:** Face ID or fingerprint accepted; Fallback to PIN available; Authentication < 3 seconds |
| | FT_BIOM.US03<br/>Biometric Auth | - User sees processing message<br/>- Thinking: "Processing my commitment"<br/>- **Acceptance Criteria:** Loading: "Processing commitment"; Progress indicator; No timeout for normal cases |
| | FT_SUCC.US01<br/>Success Screen | - User sees success screen<br/>- Thinking: "Yes! My commitment is confirmed"<br/>- **Acceptance Criteria:** "Commitment Confirmed" headline; Celebration animation (confetti); Sound/haptic feedback |
| | FT_SUCC.US02<br/>Success Screen | - User sees commitment details<br/>- Thinking: "I committed 50M for 500 tokens"<br/>- **Acceptance Criteria:** Amount committed displayed; Token count shown; Project name visible |
| | FT_SUCC.US03<br/>Success Screen | - User sees next steps<br/>- Thinking: "Tokens will be allocated when offering ends"<br/>- **Acceptance Criteria:** Timeline explained; Push notification enabled; Allocation date displayed |
| | FT_SUCC.US04<br/>Success Screen | - User taps View My Portfolio<br/>- Thinking: "Let me check my pending investment"<br/>- **Acceptance Criteria:** Opens Portfolio screen; Pending commitment visible; Status: "Awaiting Allocation" |

---

#### EP_MODI: Commitment Modification

- **Note:** Available only **before offering deadline**. After deadline, commitment is final and proceeds to allocation.
- **Responsibility Split:**
  - **VPay App/Backend:** Adjusts fiat escrow hold, releases funds on cancellation
  - **RWA Platform (Backend):** Updates commitment records, adjusts dashboard data

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_TOKO.EP_MODI**<br/>Commitment Modification | | - User can modify or cancel commitment before offering deadline<br/>- Available from Portfolio screen or Offering Details |
| | FT_PEND.US01<br/>Pending Commitment | - User views pending commitment in portfolio<br/>- Thinking: "Let me check my commitment status"<br/>- **Acceptance Criteria:** Status: "Awaiting Allocation"; Committed amount displayed; Offering deadline shown |
| | FT_PEND.US02<br/>Pending Commitment | - User sees Modify/Cancel options<br/>- Thinking: "I can still change my mind"<br/>- **Acceptance Criteria:** "Modify" button visible; "Cancel" button visible; Buttons disabled after deadline |
| | FT_MODF.US01<br/>Modify Commitment | - User taps Modify button<br/>- Thinking: "I want to increase my investment"<br/>- **Acceptance Criteria:** Opens modification screen; Current amount pre-filled; Same min/max validation |
| | FT_MODF.US02<br/>Modify Commitment | - User adjusts amount and confirms<br/>- Thinking: "Changing to 70M instead of 50M"<br/>- **Acceptance Criteria:** Biometric confirmation required; VPay adjusts fiat escrow hold; RWA updates commitment record |
| | FT_MODF.US03<br/>Modify Commitment | - User sees modification success<br/>- Thinking: "My commitment has been updated"<br/>- **Acceptance Criteria:** Success message: "Commitment Updated"; New amount displayed; Updated token calculation |
| | FT_CANL.US01<br/>Cancel Commitment | - User taps Cancel button<br/>- Thinking: "I changed my mind about this investment"<br/>- **Acceptance Criteria:** Confirmation dialog: "Are you sure?"; Shows refund amount; Warning about losing spot |
| | FT_CANL.US02<br/>Cancel Commitment | - User confirms cancellation<br/>- Thinking: "Yes, I want to cancel"<br/>- **Acceptance Criteria:** Biometric confirmation required; VPay releases fiat hold; RWA removes commitment record |
| | FT_CANL.US03<br/>Cancel Commitment | - User sees cancellation success<br/>- Thinking: "My funds are back in my wallet"<br/>- **Acceptance Criteria:** Success message: "Commitment Cancelled"; Funds returned to VPay wallet; "Browse Offerings" CTA |

---

## UF_OSET (RL_INV): Token Allocation Receipt

**Duration:** Passive (T+0 to T+2)
**Goal:** Receive allocated tokens after Token Offering
**Sentiment:** Anticipating to Accepting

**Architecture Note:**
- Investor interacts with **VPay App** → VPay Backend orchestrates all operations → VPay Backend calls RWA Platform API
- Allocation results pushed from RWA Platform → VPay via notifications

**Responsibility Split:**
- **VPay App/Backend:** Refund status, fiat balance updates, notification delivery to investor
- **RWA Platform (Backend):** Token minting, allocation calculation, portfolio data, token pricing

**Settlement Process:** RWA Platform orchestrates token allocation workflow: coordinates token minting, VPay for fund transfer verification, and investor notifications.

**Get Help:** "Need Help?" button available on Allocation Result and Breakdown screens → Opens ticket with "Allocation Inquiry" category pre-filled (see UF_SUPP)

**Lock-up and Vesting (Optional - Per Project):**
- **Lock-up period:** Optional restriction preventing token transfers for a fixed period (e.g., 90 days) after allocation
- **Vesting schedule:** Optional gradual unlock of tokens over time (e.g., linear vesting over 365 days)
- **Project configuration:** Each project offering defines its own lock-up and vesting terms (or none)
- **No lock-up/vesting:** Some project offerings may allow immediate transferability after allocation
- **Investor visibility:** Terms are disclosed during UF_TOKO (before commitment) and displayed in allocation results
- **Portfolio impact:** If lock-up/vesting applies, portfolio shows "Locked" vs "Transferable" token counts

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_OSET.EP_OFFC**<br/>Offering Completion | FT_ENDN<br/>End Notification | - Push notification when offering ends<br/>- Status shows "Calculating allocation"<br/>- Processing indicator visible | Must-have |
| | FT_PROC<br/>Processing Status | - Visual indicator of allocation calculation<br/>- Estimated wait time displayed<br/>- Real-time status updates | Must-have |
| **UF_OSET.EP_ALOC**<br/>Allocation Result | FT_ALSC<br/>Allocation Screen | - Push notification when tokens allocated<br/>- Allocation Result screen displays<br/>- Offering completion summary | Must-have |
| | FT_BRKD<br/>Breakdown Display | - Committed vs allocated comparison<br/>- Oversubscription vs Undersubscription logic<br/>- Refund amount explanation | Must-have |
| | FT_CANC<br/>Cancellation Screen | - **[Scenario: Failure]** Notification of offering cancellation<br/>- Full refund explanation (Threshold missed)<br/>- "View Wallet" CTA | Must-have |
| **UF_OSET.EP_PORT**<br/>Portfolio Update | FT_PFSC<br/>Portfolio Screen | - Total value with new tokens<br/>- Project count updated<br/>- Available balance shows refund | Must-have |
| | FT_TBAL<br/>Token Balance Card | - Project card with token count<br/>- Value and change percentage<br/>- Lock-up status indicator | Must-have |

### Epic, Feature, and User Story Details

#### EP_OFFC: Offering Completion

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_OSET.EP_OFFC**<br/>Offering Completion | | - Token Offering ends<br/>- System calculates allocation for all participants |
| | FT_ENDN.US01<br/>End Notification | - User receives push notification<br/>- Thinking: "The offering has ended, what's next?"<br/>- **Acceptance Criteria:** Notification: "Token Offering has ended - Allocation in progress"; Tap opens app; Sent within 1 minute of offering end |
| | FT_ENDN.US02<br/>End Notification | - User opens app and sees status<br/>- Thinking: "They're calculating my allocation"<br/>- **Acceptance Criteria:** Offering status shows "Calculating allocation"; Animated processing indicator; Expected timeline displayed |
| | FT_PROC.US01<br/>Processing Status | - User sees processing status screen<br/>- Thinking: "I'll check back in a few hours"<br/>- **Acceptance Criteria:** Visual indicator of allocation calculation; "Processing" badge on offering; Pull to refresh enabled |

---

#### EP_ALOC: Allocation Result

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_OSET.EP_ALOC**<br/>Allocation Result | | - User receives allocation result<br/>- Views detailed breakdown of token allocation |
| | FT_ALSC.US01<br/>Allocation Screen | - User receives push notification<br/>- Thinking: "My tokens have been allocated!"<br/>- **Acceptance Criteria:** Notification sent after token allocation; Notification: "Your tokens have been allocated"; Tap opens Allocation Result screen |
| | FT_ALSC.US02<br/>Allocation Screen | - User opens app to view result<br/>- Thinking: "Let me see how many tokens I got"<br/>- **Acceptance Criteria:** Allocation Result screen opens; Project name displayed; Celebration animation for success |
| | FT_ALSC.US03<br/>Allocation Screen | - User sees offering completion message<br/>- Thinking: "Token Offering is complete"<br/>- **Acceptance Criteria:** "Token Offering Complete" headline; Project name: Vinhomes Grand Park; Completion badge visible |
| | FT_BRKD.US01<br/>Breakdown Display | - User sees commitment breakdown<br/>- Thinking: "I committed 50M for 500 tokens"<br/>- **Acceptance Criteria:** Committed: 50M for 500 tokens; Original commitment clearly shown; Investment date displayed |
| | FT_BRKD.US02<br/>Breakdown Display | - User sees demand information<br/>- Thinking: "How popular was this offering?"<br/>- **Acceptance Criteria:** Demand status shown; **[If Over]** "140% Oversubscribed"; **[If Under]** "80% Subscribed (Threshold met)" |
| | FT_BRKD.US03<br/>Breakdown Display | - User sees allocation ratio<br/>- Thinking: "How much did I get?"<br/>- **Acceptance Criteria:** **[If Over]** Allocation ratio < 100% (e.g. 71%); **[If Under]** Allocation: 100% (Full Allocation) |
| | FT_BRKD.US04<br/>Breakdown Display | - User sees tokens received<br/>- Thinking: "357 tokens is still a good start"<br/>- **Acceptance Criteria:** Tokens received count; Token value displayed; "View in Portfolio" link |
| | FT_BRKD.US05<br/>Breakdown Display | - User sees amount charged<br/>- Thinking: "Only 35.7M was charged"<br/>- **Acceptance Criteria:** Amount charged vs Original Commitment; Difference calculated |
| | FT_BRKD.US06<br/>Breakdown Display | - User sees refund amount (if any)<br/>- Thinking: "I'll get 14.3M back"<br/>- **Acceptance Criteria:** **[If Over]** Refund amount displayed; **[If Under]** Refund: 0 VND (unless partial fill logic, but usually 100%); Status: "Already credited" |
| | FT_BRKD.US07<br/>Breakdown Display | - [IF APPLICABLE] User sees vesting timeline (if project has lock-up/vesting)<br/>- Thinking: "90 days lock-up, then 1 year vesting" or "Tokens are immediately transferable"<br/>- **Acceptance Criteria:** If lock-up/vesting: Lock-up period, vesting schedule, calendar visual; If no restrictions: "Tokens available for transfer immediately" |
| | FT_CANC.US01<br/>Cancellation Screen | - **[Scenario: Failure]** User receives cancellation notification<br/>- Thinking: "Offering cancelled? What happened?"<br/>- **Acceptance Criteria:** Notification: "Offering Cancelled - Minimum Threshold Not Met"; Tap opens Cancellation Screen |
| | FT_CANC.US02<br/>Cancellation Screen | - User sees cancellation details<br/>- Thinking: "Only 40% subscribed, threshold was 50%"<br/>- **Acceptance Criteria:** Reason: "Minimum Subscription Threshold (X%) not met"; Subscription Rate displayed; "Offering Failed" badge |
| | FT_CANC.US03<br/>Cancellation Screen | - User sees full refund<br/>- Thinking: "I get all my money back"<br/>- **Acceptance Criteria:** Refund Amount: 100% of Commitment; Status: Credited to VPay Wallet; "View Wallet" CTA |

---

#### EP_PORT: Portfolio Update

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_OSET.EP_PORT**<br/>Portfolio Update | | - User views updated portfolio with new tokens<br/>- Monitors investment value and status |
| | FT_PFSC.US01<br/>Portfolio Screen | - User taps View Portfolio<br/>- Thinking: "Let me see my total investment"<br/>- **Acceptance Criteria:** Opens Portfolio screen; New tokens included; Animation highlights new addition |
| | FT_PFSC.US02<br/>Portfolio Screen | - User sees total value<br/>- Thinking: "My portfolio is worth 35.7M"<br/>- **Acceptance Criteria:** Total Value: 35,700,000 VND; Real-time pricing; Last updated timestamp |
| | FT_PFSC.US03<br/>Portfolio Screen | - User sees token count<br/>- Thinking: "357 tokens across 1 project"<br/>- **Acceptance Criteria:** Total Tokens: 357; Projects: 1; Diversification indicator |
| | FT_PFSC.US04<br/>Portfolio Screen | - User sees available balance<br/>- Thinking: "My refund is available"<br/>- **Acceptance Criteria:** Available Balance: 14,300,000 (refunded); "From oversubscription refund" note; Withdraw option |
| | FT_TBAL.US01<br/>Token Balance Card | - User sees project token balance card<br/>- Thinking: "Here's my Vinhomes investment"<br/>- **Acceptance Criteria:** Vinhomes Grand Park card; Project image displayed; Tap to expand details |
| | FT_TBAL.US02<br/>Token Balance Card | - User sees token count on card<br/>- Thinking: "357 tokens is my stake"<br/>- **Acceptance Criteria:** Tokens: 357; Token percentage of project shown; Visual token indicator |
| | FT_TBAL.US03<br/>Token Balance Card | - User sees value on card<br/>- Thinking: "Worth 35.7M at current price"<br/>- **Acceptance Criteria:** Value: 35.7M VND; Price per token shown; Real-time update |
| | FT_TBAL.US04<br/>Token Balance Card | - User sees change percentage<br/>- Thinking: "No change yet, just allocated"<br/>- **Acceptance Criteria:** Change: 0% (just allocated); Green/red color coding; Comparison to purchase price |
| | FT_TBAL.US05<br/>Token Balance Card | - User sees lock-up status<br/>- Thinking: "Locked for 90 days"<br/>- **Acceptance Criteria:** Status: Locked (90 days); Lock icon visible; Countdown to unlock date |

---

## UF_XFER (RL_INV): Token Transfer

**Duration:** As needed
**Goal:** Transfer tokens to external destinations
**Sentiment:** Confident to Strategic

**Architecture Note:**
- Investor interacts with **VPay App** → VPay Backend validates eKYC and calls RWA Platform API for token transfer
- All token transfers go through RWA Platform (never direct blockchain interaction by user)

**Responsibility Split:**
- **VPay App/Backend:** User interface, eKYC gating (validates user is approved before transfer), notification delivery
- **RWA Platform (Backend):** Token pool data, portfolio management, transfer execution, AML screening, compliance verification

**Transfer Compliance Flow:**
- **CEX Transfer:** User requests → VPay validates eKYC → RWA performs AML check on destination → If passed: execute transfer; If flagged: block and notify BO
- **P2P Transfer:** User initiates → VPay validates both parties' eKYC → RWA performs **AML check first** (before escrow) → Then compliance check → Execute transfer or block if flagged
- **Lock-up Enforcement:** Platform enforces lock-up; transfer attempts during lock-up period will fail

**Get Help:** "Need Help?" button available on Transfer Flow and CEX Transfer screens → Opens ticket with "Transfer Issue" category pre-filled (see UF_SUPP)

**Phase Considerations:**
- **Initial Phase (Year 1-2):** Portfolio shows 1-2 projects; Token balance cards display flagship project prominently; Transfer flow is straightforward (single project focus)
- **Later Phase (Year 3+):** Portfolio shows multiple projects with filtering and sorting; Token balance cards need project selection before transfer; Cross-project portfolio analysis becomes important

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_XFER.EP_PORT**<br/>Portfolio Overview | FT_DASH<br/>Portfolio Dashboard | - Total value, return percentage<br/>- Lock-up status and vested amount<br/>- Token balances overview | Must-have |
| | FT_TBCD<br/>Token Balance Cards | - Project cards with key metrics<br/>- Token count, value, change<br/>- Tap to expand details | Must-have |
| **UF_XFER.EP_TBAL**<br/>Token Balance Details | FT_TBDT<br/>Token Balance Details | - Detailed view per token balance<br/>- Overview, Performance, Properties tabs<br/>- Current value and cost basis | Must-have |
| | FT_PERF<br/>Performance Tab | - Value chart (7d, 30d, All time)<br/>- Token price history<br/>- Trading volume visualization | Must-have |
| | FT_PRPT<br/>Properties Tab | - List of properties in project<br/>- Construction progress display<br/>- Watchlisted properties highlighted | Should-have |
| **UF_XFER.EP_POOL**<br/>Pool Information | FT_TKNP<br/>Token Pool Info | - Total supply, circulating, burned<br/>- Vesting schedule overview<br/>- Token distribution stats | Must-have |
| | FT_PRPP<br/>Property Pool Info | - Properties available, redeemed<br/>- Property types distribution<br/>- Redemption eligibility overview | Must-have |
| **UF_XFER.EP_ORCL**<br/>Oracle Data Viewing | FT_PINFO<br/>Property Information | - View ownership status, legal status<br/>- View valuation updates<br/>- NAV per token | Must-have |
| | FT_CNST<br/>Construction Progress | - Milestones and completion percentage<br/>- Photo gallery and progress reports<br/>- Delay alerts and timeline updates | Must-have |
| | FT_ADAT<br/>Area Market Data | - Comparable property sales in area<br/>- Rental yields and area trends<br/>- Neighborhood price per sqm | Should-have |
| | FT_SENT<br/>Sentiment Analysis | - News mentions and articles<br/>- Social media sentiment<br/>- Overall sentiment indicator | Should-have |
| **UF_XFER.EP_MRKT**<br/>Market Data | FT_MKTI<br/>Market Indicators | - Token price vs NAV comparison<br/>- Neighborhood data and trends<br/>- Project health rating | Should-have |
| | FT_NAVC<br/>NAV Comparison | - Trading volume indicators<br/>- Market sentiment display<br/>- Premium/discount to NAV | Should-have |
| **UF_XFER.EP_LCKE**<br/>Lock-up End | FT_LEND<br/>End Notification | - Push notification when lock-up ends<br/>- Portfolio status update<br/>- Transfer button enabled | Must-have |
| | FT_STUP<br/>Status Update | - Lock-up status shows "Ended"<br/>- Vested amount displayed<br/>- Transfer options available | Must-have |
| **UF_XFER.EP_CEXR**<br/>CEX Transfer | FT_CEXD<br/>CEX Destination | - Select transfer destination (CEX wallet)<br/>- Enter CEX deposit address<br/>- Select token amount to transfer | Must-have |
| | FT_AMLC<br/>AML Check | - Platform performs AML check on destination<br/>- If passed: proceed to execution<br/>- If flagged: block transfer, notify BO for review | Must-have |
| | FT_CEXE<br/>Transfer Execution | - Biometric confirmation<br/>- Transfer tokens to CEX wallet<br/>- Success confirmation and transaction hash | Must-have |
| **UF_XFER.EP_P2P**<br/>P2P Transfer and Trading | FT_P2PM<br/>P2P Marketplace | - Alternative when CEX unavailable<br/>- Browse buy/sell offers from verified users<br/>- Create, accept, or counter P2P offers<br/>- Price negotiation between parties | Should-have |
| | FT_P2PS<br/>P2P Selection | - Select verified recipient or offer<br/>- View user reputation/verification badge<br/>- P2P terms and escrow agreement | Should-have |
| | FT_P2PX<br/>P2P Execution | - Transfer to verified user<br/>- Platform-held escrow for trades<br/>- Biometric confirmation<br/>- Transaction receipt for both parties | Should-have |
| **UF_XFER.EP_UPDT**<br/>Transfer Complete | FT_BLUP<br/>Balance Update | - Token balance decreased<br/>- Transaction logged<br/>- Portfolio value recalculated | Must-have |
| | FT_TXHS<br/>Transaction History | - CEX/P2P transfers logged<br/>- Transfer history visible<br/>- Export option available | Must-have |

### Epic, Feature, and User Story Details

#### EP_PORT: Portfolio Overview

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_PORT**<br/>Portfolio Overview | | - User checks portfolio value quickly<br/>- Daily/weekly monitoring routine |
| | FT_DASH.US01<br/>Portfolio Dashboard | - User opens app to Portfolio screen<br/>- Thinking: "Let me check how my investments are doing"<br/>- **Acceptance Criteria:** Portfolio screen is default tab; Loads within 2 seconds; Pull to refresh enabled |
| | FT_DASH.US02<br/>Portfolio Dashboard | - User sees total value<br/>- Thinking: "My portfolio grew to 41.3M"<br/>- **Acceptance Criteria:** Total Value: 41,300,000 (up from 35.7M); Real-time price update; Last refresh timestamp |
| | FT_DASH.US03<br/>Portfolio Dashboard | - User sees total return<br/>- Thinking: "I'm up 15.7%!"<br/>- **Acceptance Criteria:** Total Return: +15.7% (5.6M gain); Green color for positive; Absolute and percentage shown |
| | FT_DASH.US04<br/>Portfolio Dashboard | - User sees lock-up status<br/>- Thinking: "35 more days until I can transfer"<br/>- **Acceptance Criteria:** Lock-up Status: 35 days remaining; Countdown displayed; Calendar icon |
| | FT_DASH.US05<br/>Portfolio Dashboard | - User sees vested amount<br/>- Thinking: "Nothing vested yet during lock-up"<br/>- **Acceptance Criteria:** Vested: 0% (lock-up still active); Progress bar; Vesting schedule link |
| | FT_TBCD.US01<br/>Token Balance Cards | - User scrolls to token balances section<br/>- Thinking: "Let me see my individual token balances"<br/>- **Acceptance Criteria:** Project cards displayed; Sorted by value descending; Animation on scroll;<br/>  - Initial: 1-2 project cards with detailed view per card<br/>  - Later: Multiple cards with compact view; Filter and search enabled |
| | FT_TBCD.US02<br/>Token Balance Cards | - User sees project card details<br/>- Thinking: "Vinhomes is up 15.7%"<br/>- **Acceptance Criteria:** Vinhomes Grand Park: 357 tokens, +15.7%; Project image shown; Tap to expand |

---

#### EP_TBAL: Token Balance Details

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_TBAL**<br/>Token Balance Details | | - User analyzes individual token balances in detail<br/>- Reviews performance and property status |
| | FT_TBDT.US01<br/>Token Balance Details | - User taps project card<br/>- Thinking: "I want more details on this token balance"<br/>- **Acceptance Criteria:** Opens Token Balance Details screen; Header shows project image; Tab navigation visible |
| | FT_TBDT.US02<br/>Token Balance Details | - User sees token balance header<br/>- Thinking: "Current value vs what I paid"<br/>- **Acceptance Criteria:** Current value displayed; Cost basis shown; Unrealized gain/loss calculated |
| | FT_TBDT.US03<br/>Token Balance Details | - User views Overview tab<br/>- Thinking: "All my token balance details in one place"<br/>- **Acceptance Criteria:** Tokens owned; Current price; Lock-up status; Vested amount; Next milestone |
| | FT_PERF.US01<br/>Performance Tab | - User views Performance tab<br/>- Thinking: "Let me see the price history"<br/>- **Acceptance Criteria:** Value chart displayed; Period selector: 7d, 30d, All; Interactive chart |
| | FT_PERF.US02<br/>Performance Tab | - User sees price chart<br/>- Thinking: "Price has been trending up"<br/>- **Acceptance Criteria:** Token price history; Current price highlighted; High/low markers |
| | FT_PERF.US03<br/>Performance Tab | - User sees volume chart<br/>- Thinking: "Good trading volume recently"<br/>- **Acceptance Criteria:** Trading volume bars; 24h volume displayed; Volume trend indicator |
| | FT_PRPT.US01<br/>Properties Tab | - User views Properties tab<br/>- Thinking: "What properties are in this project?"<br/>- **Acceptance Criteria:** List of 1,000 properties; Filter and search; Scroll with lazy loading |
| | FT_PRPT.US02<br/>Properties Tab | - User sees construction progress<br/>- Thinking: "Project is 75% complete"<br/>- **Acceptance Criteria:** Progress: 75% complete; Visual progress bar; Timeline milestones |
| | FT_PRPT.US03<br/>Properties Tab | - User sees expected completion<br/>- Thinking: "Should be done by Q2 2027"<br/>- **Acceptance Criteria:** Expected: Q2 2027; Days remaining calculated; On-track indicator |
| | FT_PRPT.US04<br/>Properties Tab | - User sees watchlisted properties<br/>- Thinking: "My favorite units are highlighted"<br/>- **Acceptance Criteria:** Starred properties at top; Heart icon visible; Quick access to details |

---

#### EP_POOL: Pool Information

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_POOL**<br/>Pool Information | | - User views token and property pool details<br/>- Understands overall token economics |
| | FT_TKNP.US01<br/>Token Pool Info | - User views Token Pool section<br/>- Thinking: "Let me understand the token supply"<br/>- **Acceptance Criteria:** Total supply displayed; Circulating vs locked shown; Burned tokens count |
| | FT_TKNP.US02<br/>Token Pool Info | - User sees vesting schedule<br/>- Thinking: "When do tokens become available?"<br/>- **Acceptance Criteria:** Vesting timeline visible; Current unlock percentage; Next unlock date |
| | FT_PRPP.US01<br/>Property Pool Info | - User views Property Pool section<br/>- Thinking: "How many properties are available?"<br/>- **Acceptance Criteria:** Properties available count; Redeemed count; Property types breakdown |
| | FT_PRPP.US02<br/>Property Pool Info | - User sees redemption eligibility<br/>- Thinking: "Am I eligible to redeem?"<br/>- **Acceptance Criteria:** Minimum tokens required; User's eligibility status; Link to redemption flow |

---

#### EP_ORCL: Oracle Data Viewing

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_ORCL**<br/>Oracle Data Viewing | | - User views Oracle data gathered by RL_SYS<br/>- Data includes: property info, construction progress, area market data, sentiment |
| | FT_PINFO.US01<br/>Property Information | - User taps Project Info tab<br/>- Thinking: "What's the current ownership status?"<br/>- **Acceptance Criteria:** Opens Property Information screen; Data from Oracle displayed; Last update timestamp |
| | FT_PINFO.US02<br/>Property Information | - User views ownership status<br/>- Thinking: "Properties are legally transferred to SPV"<br/>- **Acceptance Criteria:** Ownership: SPV (confirmed); Legal status: Clear title; Registry reference shown |
| | FT_PINFO.US03<br/>Property Information | - User views valuation updates<br/>- Thinking: "Valuation has increased 5% since Token Offering"<br/>- **Acceptance Criteria:** Current valuation from Oracle; Change from initial; Last appraisal date |
| | FT_PINFO.US04<br/>Property Information | - User views NAV per token<br/>- Thinking: "NAV is 112K per token"<br/>- **Acceptance Criteria:** NAV: 112,000 VND/token; Based on property valuation data; Calculation method link |
| | FT_CNST.US01<br/>Construction Progress | - User taps Construction tab<br/>- Thinking: "How is the project progressing?"<br/>- **Acceptance Criteria:** Opens Construction Progress screen; Visual timeline; Overall percentage |
| | FT_CNST.US02<br/>Construction Progress | - User views milestones<br/>- Thinking: "Foundation and structure complete"<br/>- **Acceptance Criteria:** Milestone list with dates; Status per milestone (complete/in-progress/upcoming); Delay indicators if any |
| | FT_CNST.US03<br/>Construction Progress | - User views completion percentage<br/>- Thinking: "75% complete, on schedule"<br/>- **Acceptance Criteria:** Progress: 75%; Status: On track; Expected completion: Q2 2027 |
| | FT_CNST.US04<br/>Construction Progress | - User views photo gallery<br/>- Thinking: "Real photos of the construction site"<br/>- **Acceptance Criteria:** Photo gallery with dates; Swipe navigation; Zoom enabled; Sorted by date |
| | FT_CNST.US05<br/>Construction Progress | - User views progress reports<br/>- Thinking: "Monthly report available"<br/>- **Acceptance Criteria:** Downloadable PDF reports; Monthly updates; Quality inspection notes |
| | FT_ADAT.US01<br/>Area Market Data | - User taps Area Data tab<br/>- Thinking: "What's happening in the local market?"<br/>- **Acceptance Criteria:** Opens Area Market Data screen; Comparable data displayed; Data sources noted |
| | FT_ADAT.US02<br/>Area Market Data | - User views comparable sales<br/>- Thinking: "Similar properties sold at 85M/sqm"<br/>- **Acceptance Criteria:** Comparable sales list; Price per sqm; Distance from project |
| | FT_ADAT.US03<br/>Area Market Data | - User views rental yields<br/>- Thinking: "Average rental yield is 6.5% in this area"<br/>- **Acceptance Criteria:** Rental yield: 6.5%; Comparison to project expected yield; Trend indicator |
| | FT_ADAT.US04<br/>Area Market Data | - User views area trends<br/>- Thinking: "Property prices up 8% YoY"<br/>- **Acceptance Criteria:** YoY price change: +8%; 3-year trend chart; Area development news |
| | FT_SENT.US01<br/>Sentiment Analysis | - User taps Sentiment tab<br/>- Thinking: "What are people saying about this project?"<br/>- **Acceptance Criteria:** Opens Sentiment Analysis screen; Overall sentiment indicator; Source breakdown |
| | FT_SENT.US02<br/>Sentiment Analysis | - User views news mentions<br/>- Thinking: "Positive coverage in major news"<br/>- **Acceptance Criteria:** News article list; Publication date and source; Sentiment per article (positive/neutral/negative) |
| | FT_SENT.US03<br/>Sentiment Analysis | - User views social media sentiment<br/>- Thinking: "Good buzz on social media"<br/>- **Acceptance Criteria:** Social sentiment score; Mention count (7d, 30d); Key topics/hashtags |
| | FT_SENT.US04<br/>Sentiment Analysis | - User views overall sentiment<br/>- Thinking: "Overall sentiment is positive"<br/>- **Acceptance Criteria:** Overall: Positive (78/100); Trend vs last month; Alert if significant change |

---

#### EP_MRKT: Market Data

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_MRKT**<br/>Market Data | | - User monitors market conditions<br/>- Compares token price to net asset value |
| | FT_MKTI.US01<br/>Market Indicators | - User taps Market tab<br/>- Thinking: "What's happening in the market?"<br/>- **Acceptance Criteria:** Opens Market Indicators screen; Data refreshes automatically; Last update shown |
| | FT_MKTI.US02<br/>Market Indicators | - User sees token vs NAV<br/>- Thinking: "Token is trading at a small premium"<br/>- **Acceptance Criteria:** Price: 115K; NAV: 112K; Premium: +2.7% |
| | FT_MKTI.US03<br/>Market Indicators | - User sees neighborhood data<br/>- Thinking: "Local real estate prices are rising"<br/>- **Acceptance Criteria:** Avg price/sqm: 85M; YoY change: +8.5%; Market comparison |
| | FT_MKTI.US04<br/>Market Indicators | - User sees project health<br/>- Thinking: "Project is on track with AAA rating"<br/>- **Acceptance Criteria:** Progress: 75%; Status: On track; Rating: AAA |
| | FT_NAVC.US01<br/>NAV Comparison | - User sees trading indicators<br/>- Thinking: "Good trading volume this week"<br/>- **Acceptance Criteria:** 24h volume: 500M; 7-day trend: +3.2%; Liquidity indicator |
| | FT_NAVC.US02<br/>NAV Comparison | - User sees market sentiment<br/>- Thinking: "Market is feeling positive"<br/>- **Acceptance Criteria:** Market sentiment: Positive; Sentiment indicator; Based on volume/price |

---

#### EP_LCKE: Lock-up End

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_LCKE**<br/>Lock-up End | | - Lock-up period ends after 90 days<br/>- User can now transfer vested tokens |
| | FT_LEND.US01<br/>End Notification | - User receives push notification<br/>- Thinking: "Finally, I can transfer now!"<br/>- **Acceptance Criteria:** Notification: "Lock-up ended - You can now transfer your tokens"; Tap opens portfolio; Sent at midnight on lock-up end date |
| | FT_LEND.US02<br/>End Notification | - User opens portfolio<br/>- Thinking: "Let me see what's transferable"<br/>- **Acceptance Criteria:** Navigate to Vinhomes Grand Park; Transfer options highlighted; New badge visible |
| | FT_STUP.US01<br/>Status Update | - User sees lock-up status updated<br/>- Thinking: "Lock-up has ended"<br/>- **Acceptance Criteria:** Lock-up status: Ended; No more countdown; Status badge changed |
| | FT_STUP.US02<br/>Status Update | - User sees vested amount<br/>- Thinking: "2.7% of my tokens are transferable"<br/>- **Acceptance Criteria:** Vested: 2.7% (10 tokens); Day 91 of 365; Linear vesting shown |
| | FT_STUP.US03<br/>Status Update | - User sees transfer button<br/>- Thinking: "I can transfer tokens now"<br/>- **Acceptance Criteria:** Transfer button enabled; Previously grayed out; Tooltip explains vested amount |

---

#### EP_CEXR: CEX Transfer

- **Compliance Flow:** User requests → VPay validates eKYC → RWA performs AML check on destination → If passed: execute transfer; If flagged: block and notify BO
- **Responsibility:** VPay validates user eKYC; RWA performs AML screening and transfer execution
- After transfer completes → tokens are in CEX wallet → see UF_MKT for trading

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_CEXR**<br/>CEX Transfer | | - User transfers tokens from Platform wallet to CEX wallet<br/>- Primary path for secondary market trading |
| | FT_CEXD.US01<br/>CEX Destination | - User taps Transfer button<br/>- Thinking: "I want to transfer tokens to the exchange"<br/>- **Acceptance Criteria:** Transfer options displayed; CEX Transfer selected; Continue button |
| | FT_CEXD.US02<br/>CEX Destination | - User enters CEX deposit address<br/>- Thinking: "Pasting my VinaExchange deposit address"<br/>- **Acceptance Criteria:** Address input field; Paste from clipboard; QR scanner option; Address format validation |
| | FT_CEXD.US03<br/>CEX Destination | - User selects token amount<br/>- Thinking: "I'll transfer 10 tokens"<br/>- **Acceptance Criteria:** Amount input; Max button for vested amount; Vested: 10 tokens available; Fee preview |
| | FT_CEXD.US04<br/>CEX Destination | - User reviews transfer summary<br/>- Thinking: "Let me confirm the details"<br/>- **Acceptance Criteria:** Destination address displayed; Amount: 10 tokens; Estimated arrival; Network fee shown |
| | FT_AMLC.US01<br/>AML Check | - Platform performs AML check<br/>- Thinking: "Waiting for verification..."<br/>- **Acceptance Criteria:** Loading indicator; "Verifying destination..." message; Takes 2-5 seconds |
| | FT_AMLC.US02<br/>AML Check | - [If AML passed] User proceeds to execution<br/>- Thinking: "Address verified, ready to transfer"<br/>- **Acceptance Criteria:** Green checkmark; "Address verified" message; Proceed button enabled |
| | FT_AMLC.US03<br/>AML Check | - [If AML flagged] Transfer blocked<br/>- Thinking: "Why is my transfer blocked?"<br/>- **Acceptance Criteria:** Red warning; "Transfer blocked - under review" message; Support link; BO notified automatically |
| | FT_CEXE.US01<br/>Transfer Execution | - User confirms with biometric<br/>- Thinking: "Final confirmation"<br/>- **Acceptance Criteria:** Biometric prompt (Face ID/fingerprint); Fallback to PIN; Confirm button |
| | FT_CEXE.US02<br/>Transfer Execution | - Transfer executes on blockchain<br/>- Thinking: "Transfer in progress..."<br/>- **Acceptance Criteria:** Progress indicator; "Submitting transaction..." message; Transaction hash displayed when submitted |
| | FT_CEXE.US03<br/>Transfer Execution | - User sees transfer success<br/>- Thinking: "Tokens sent to exchange!"<br/>- **Acceptance Criteria:** Success message; Transaction hash (tappable for explorer); Estimated arrival time at CEX; Done button → returns to portfolio |

---

#### EP_P2P: P2P Transfer and Trading

- **Note:** P2P only PLANNED for when CEX unavailable or doesn't support token
- **Compliance Flow:** AML check happens **BEFORE escrow** → Then compliance verification → Then transfer execution
- **Responsibility:** VPay validates both parties' eKYC; RWA performs AML + compliance checks

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_P2P**<br/>P2P Transfer and Trading | | - User transfers or trades tokens peer-to-peer on the Issuance Platform<br/>- Alternative when CEX is unavailable; direct trades between verified users<br/>- AML check performed before escrow (not after) |
| | FT_P2PM.US01<br/>P2P Marketplace | - User taps P2P Marketplace<br/>- Thinking: "Let me see available trades on the platform"<br/>- **Acceptance Criteria:** Opens P2P marketplace screen; Buy/sell offers listed; Filters by price, quantity, project |
| | FT_P2PM.US02<br/>P2P Marketplace | - User browses buy/sell offers<br/>- Thinking: "These prices look reasonable"<br/>- **Acceptance Criteria:** Offer details: price, quantity, user rating; Sort by price, date, reputation; Refresh/pull-to-update |
| | FT_P2PM.US03<br/>P2P Marketplace | - User creates own P2P offer<br/>- Thinking: "I want to sell my tokens at this price"<br/>- **Acceptance Criteria:** Create offer: type (buy/sell), price, quantity; Preview and confirm; Offer visible to other users |
| | FT_P2PM.US04<br/>P2P Marketplace | - User accepts P2P offer<br/>- Thinking: "This price looks fair"<br/>- **Acceptance Criteria:** Trade details shown; Escrow terms agreement; Proceed to selection |
| | FT_P2PS.US01<br/>P2P Selection | - User selects offer or recipient for direct transfer<br/>- Thinking: "I want to proceed with this trade/transfer"<br/>- **Acceptance Criteria:** Opens P2P detail screen; Verified user badge shown; Search by address for direct transfers |
| | FT_P2PS.US02<br/>P2P Selection | - User reviews P2P terms<br/>- Thinking: "This is a verified user with good reputation"<br/>- **Acceptance Criteria:** Recipient/counterparty details; Verification badge and rating; Escrow and fee terms displayed |
| | FT_P2PX.US01<br/>P2P Execution | - User confirms P2P transfer/trade<br/>- Thinking: "Confirming with biometric"<br/>- **Acceptance Criteria:** Biometric authentication; AML check completed **before** escrow; Compliance verified; Escrow holds tokens/funds during trade |
| | FT_P2PX.US02<br/>P2P Execution | - User sees P2P success<br/>- Thinking: "Transfer/trade complete"<br/>- **Acceptance Criteria:** Success message; Transaction receipt; Both parties notified; Escrow released |

---

#### EP_UPDT: Transfer Complete

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_XFER.EP_UPDT**<br/>Transfer Complete | | - Triggered after transfer completes<br/>- User sees updated portfolio after transfer<br/>- Transaction recorded in history |
| | FT_BLUP.US01<br/>Balance Update | - User opens VPay App<br/>- Thinking: "Let me check my updated portfolio"<br/>- **Acceptance Criteria:** Portfolio updated; Sync complete; No manual refresh needed |
| | FT_BLUP.US02<br/>Balance Update | - User sees token balance<br/>- Thinking: "347 tokens remaining"<br/>- **Acceptance Criteria:** Tokens: 347 (down from 357); Transferred amount noted; Change highlighted |
| | FT_BLUP.US03<br/>Balance Update | - User sees updated value<br/>- Thinking: "Token value is 39.9M"<br/>- **Acceptance Criteria:** Value: 39.9M (347 x 115K); Price updated; Calculation shown |
| | FT_TXHS.US01<br/>Transaction History | - User views transaction history<br/>- Thinking: "Let me see my transfer activity"<br/>- **Acceptance Criteria:** Transfer to VinaExchange: -10 tokens; Date and time shown; Transaction type labeled |

---

## UF_MKT (RL_INV): Secondary Market Trading

**Duration:** As needed
**Goal:** Trade tokens on secondary market
**Sentiment:** Strategic to Opportunistic

**Architecture Note:**
- Investor interacts with **VPay App** for market data viewing → VPay calls RWA Platform API
- CEX trading happens in external CEX app (out of platform control); Platform only provides notifications

**Responsibility Split:**
- **VPay App/Backend:** Display market data, send notifications, update wallet balance (on withdrawal)
- **RWA Platform (Backend):** Market data aggregation, valuation queries, transfer arrival tracking
- **CEX (External):** Trading execution, AML for CEX trades, order matching

**Data Sources:**
- NAV and market data from property valuations
- Market health indicators processed by platform, displayed via VPay App

**CEX Activities - Out of Platform Control:**
- **External system:** CEX (Centralized Exchange) is a third-party platform, not part of the Issuance Platform
- **Reference only:** Epics, features, and user stories describing CEX activities (EP_TRDG, EP_WDRW) are for **reference purposes only** - actual UX depends on the CEX partner
- **Platform touchpoints:** Only the following are actual Issuance Platform actions:
  - EP_ARIV: Notification when tokens arrive at CEX (Platform → Investor)
  - FT_RCVD: VPay credit when funds withdrawn from CEX to VPay wallet
- **P2P Trading:** If CEX is unavailable, use P2P Marketplace in UF_XFER (see UF_XFER.EP_P2P)
- **AML responsibility:** CEX handles AML for trades on their platform (not Issuance Platform responsibility)

**Phase Considerations:**
- **Initial Phase (Year 1-2):** 1-2 token pairs on CEX; Thinner order books with wider spreads; Focus on flagship token education; Liquidity building period
- **Later Phase (Year 3+):** Multiple token pairs with better liquidity; Tighter spreads; Cross-project trading opportunities; Market maker presence established

### Epic and Feature Summary

| Epic | Feature | Description | Priority | Scope |
|------|---------|-------------|----------|-------|
| **UF_MKT.EP_MKTD**<br/>Market Data Viewing | FT_PRNV<br/>Price vs NAV | - Token price vs NAV comparison<br/>- Premium/discount indicator<br/>- Historical divergence chart | Must-have | Platform |
| | FT_LIQD<br/>Liquidity Indicators | - Order book depth visualization<br/>- Bid-ask spread display<br/>- Liquidity health score (Good/Fair/Low) | Must-have | Platform |
| | FT_VOLM<br/>Trading Volume | - 24h, 7d, 30d volume charts<br/>- Volume trend indicators<br/>- Historical volume comparison | Should-have | Platform |
| | FT_HLTH<br/>Market Health Score | - Composite market health indicator<br/>- Component breakdown (price, liquidity, volume)<br/>- Alert on significant changes | Should-have | Platform |
| **UF_MKT.EP_ARIV**<br/>Arrival Confirmation | FT_NTFY<br/>CEX Notification | - Push notification when tokens arrive at CEX<br/>- Balance visible in CEX app<br/>- Ready to trade | Must-have | Platform |
| | FT_RCVD<br/>Funds Received | - VPay credit notification<br/>- Updated wallet balance<br/>- Transaction logged | Must-have | Platform |
| **UF_MKT.EP_TRDG**<br/>CEX Trading | FT_MKTV [EXTSYS]<br/>Market View | - Token trading screen on CEX<br/>- RWA/VND trading pair<br/>- Order book and charts | Must-have | CEX (ref) |
| | FT_ORDR [EXTSYS]<br/>Order Placement | - Buy/sell order types<br/>- Limit and market orders<br/>- Order confirmation | Must-have | CEX (ref) |
| | FT_EXEC [EXTSYS]<br/>Trade Execution | - Order matched and filled<br/>- Trade confirmation<br/>- Updated balance | Must-have | CEX (ref) |
| **UF_MKT.EP_WDRW**<br/>Withdraw Proceeds | FT_WDFL [EXTSYS]<br/>Withdrawal Flow | - Withdraw VND from CEX<br/>- VPay wallet destination<br/>- Withdrawal confirmation | Must-have | CEX (ref) |

### Epic, Feature, and User Story Details

#### EP_MKTD: Market Data Viewing

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MKT.EP_MKTD**<br/>Market Data Viewing | | - User views market health data<br/>- Data processed by platform, displayed via VPay App |
| | FT_PRNV.US01<br/>Price vs NAV | - User opens Market Dashboard<br/>- Thinking: "How is my token trading vs actual asset value?"<br/>- **Acceptance Criteria:** Opens Market Dashboard; Data loads within 2 seconds; Real-time updates enabled |
| | FT_PRNV.US02<br/>Price vs NAV | - User sees token price vs NAV comparison<br/>- Thinking: "Token is at 4.5% premium to NAV"<br/>- **Acceptance Criteria:** Current Price: 115K; NAV: 110K; Premium/Discount: +4.5%; Color-coded indicator (green for small premium, red for large divergence) |
| | FT_PRNV.US03<br/>Price vs NAV | - User views historical divergence<br/>- Thinking: "Premium has been stable this month"<br/>- **Acceptance Criteria:** Divergence chart (7d, 30d, All); Historical average shown; Divergence alerts history |
| | FT_LIQD.US01<br/>Liquidity Indicators | - User taps Liquidity tab<br/>- Thinking: "How liquid is this token?"<br/>- **Acceptance Criteria:** Opens Liquidity screen; Order book visualization; Bid-ask spread displayed |
| | FT_LIQD.US02<br/>Liquidity Indicators | - User views order book depth<br/>- Thinking: "Good depth on both sides"<br/>- **Acceptance Criteria:** Visual depth chart; Buy/sell walls shown; Top 10 levels displayed |
| | FT_LIQD.US03<br/>Liquidity Indicators | - User sees bid-ask spread<br/>- Thinking: "1.5% spread is reasonable"<br/>- **Acceptance Criteria:** Bid: 114K; Ask: 116K; Spread: 1.5%; Historical spread comparison |
| | FT_LIQD.US04<br/>Liquidity Indicators | - User sees liquidity health score<br/>- Thinking: "Liquidity is marked as 'Good'"<br/>- **Acceptance Criteria:** Liquidity Health: Good/Fair/Low; Score breakdown; Comparison to other tokens (Later Phase) |
| | FT_VOLM.US01<br/>Trading Volume | - User taps Volume tab<br/>- Thinking: "What's the trading activity?"<br/>- **Acceptance Criteria:** Opens Volume screen; Volume charts displayed; Period selector available |
| | FT_VOLM.US02<br/>Trading Volume | - User views volume charts<br/>- Thinking: "Good volume this week"<br/>- **Acceptance Criteria:** 24h: 500M VND; 7d: 3.2B VND; 30d: 12.5B VND; Bar chart visualization |
| | FT_VOLM.US03<br/>Trading Volume | - User sees volume trends<br/>- Thinking: "Volume is trending up 15%"<br/>- **Acceptance Criteria:** Trend indicator: +15% vs last period; Moving average line; Unusual volume alerts |
| | FT_HLTH.US01<br/>Market Health Score | - User taps Health tab<br/>- Thinking: "What's the overall market health?"<br/>- **Acceptance Criteria:** Opens Market Health screen; Composite score displayed; Component breakdown |
| | FT_HLTH.US02<br/>Market Health Score | - User views market health score<br/>- Thinking: "Market health is 85/100 - healthy"<br/>- **Acceptance Criteria:** Overall Score: 85/100; Status: Healthy; Color indicator (green/yellow/red) |
| | FT_HLTH.US03<br/>Market Health Score | - User sees component breakdown<br/>- Thinking: "Price stability is good, liquidity could be better"<br/>- **Acceptance Criteria:** Price Stability: 90; Liquidity: 75; Volume: 88; Each with explanation |
| | FT_HLTH.US04<br/>Market Health Score | - User sets health alerts<br/>- Thinking: "Alert me if health drops below 70"<br/>- **Acceptance Criteria:** Set threshold alerts; Push notification when triggered; Alert history viewable |

---

#### EP_ARIV: Arrival Confirmation

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MKT.EP_ARIV**<br/>Arrival Confirmation | | - Tokens arrive at CEX after transfer<br/>- User ready to trade on secondary market |
| | FT_NTFY.US01<br/>CEX Notification | - User receives push notification<br/>- Thinking: "Tokens arrived at my CEX"<br/>- **Acceptance Criteria:** Notification: "10 tokens credited to VinaExchange"; Tap opens VinaExchange; Sent when credited |

---

#### EP_TRDG: CEX Trading [EXTSYS]

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MKT.EP_TRDG**<br/>CEX Trading | | - User trades RWA tokens on CEX<br/>- External system (reference only) |
| | FT_MKTV.US01 [EXTSYS]<br/>Market View | - User opens CEX trading screen<br/>- Thinking: "Let me check the RWA/VND pair"<br/>- **Acceptance Criteria:** RWA/VND trading pair displayed; Order book visible; Price charts available |
| | FT_ORDR.US01 [EXTSYS]<br/>Order Placement | - User places buy/sell order<br/>- Thinking: "I want to sell 5 tokens at 116K"<br/>- **Acceptance Criteria:** Order type selected (limit/market); Price and quantity entered; Order confirmation shown |
| | FT_EXEC.US01 [EXTSYS]<br/>Trade Execution | - Order matched and filled<br/>- Thinking: "My order was filled"<br/>- **Acceptance Criteria:** Trade confirmation received; Balance updated; Trade history recorded |

---

#### EP_WDRW: Withdraw Proceeds [EXTSYS]

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MKT.EP_WDRW**<br/>Withdraw Proceeds | | - User withdraws VND proceeds from CEX<br/>- External system (reference only) |
| | FT_WDFL.US01 [EXTSYS]<br/>Withdrawal Flow | - User initiates withdrawal from CEX<br/>- Thinking: "Let me withdraw my VND to VPay"<br/>- **Acceptance Criteria:** Withdrawal initiated; VPay wallet selected as destination; Confirmation received |
| | FT_WDFL.US02 [EXTSYS]<br/>Withdrawal Flow | - User receives funds in VPay<br/>- Thinking: "My VND arrived in VPay"<br/>- **Acceptance Criteria:** VPay balance updated; Transaction logged; Notification received |

---

## UF_REDM (RL_INV): Redemption Request

**Duration:** Varies (request submission is quick; platform may batch requests monthly)
**Goal:** Submit redemption request with token amount
**Sentiment:** Hopeful to Excited

**Get Help:** "Need Help?" button available on Eligibility, Property Assignment, and Redemption Status screens → Opens ticket with "Redemption Support" category pre-filled (see UF_SUPP)

**Important Notes:**
- Randomization parameters are registered at request submission (actual randomization happens at execution)
- Platform may batch redemption requests (e.g., monthly) before execution
- Full redemption process (property assignment, paperwork, handover) happens after batch execution
- **Ownership Certificate:** Investor receives official ownership documents (So do / Red Book) upon completion
- **NFT Certificate [OPTIONAL]:** Property NFT minting is an optional feature - may or may not be implemented. If enabled, NFT serves as a blockchain-verified certificate of ownership

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_REDM.EP_ELIG**<br/>Eligibility Check | FT_RINF<br/>Redemption Info | - Push notification when redemption available<br/>- Token requirement displayed<br/>- Suggestion to accumulate more tokens | Must-have |
| | FT_ACUM [EXTSYS]<br/>Accumulate Tokens | - Buy tokens on CEX over time<br/>- Transfer to RWA wallet<br/>- Reach redemption threshold | Must-have |
| **UF_REDM.EP_INIT**<br/>Initiate Redemption | FT_POOL<br/>Pool Selection | - Select Property Pool (e.g. Standard, Premium)<br/>- View pool token requirements<br/>- Continue to request | Must-have |
| **UF_REDM.EP_REQ**<br/>State 1: Requested | FT_CNFM<br/>Confirmation | - Enter token amount / quantity<br/>- **Anti-Cherry-Picking Warning** (Penalty details)<br/>- Request queued for next batch | Must-have |
| | FT_LOCK<br/>Lock Tokens | - Biometric authentication<br/>- Tokens transferred to escrow<br/>- Status: QUEUED FOR BATCH | Must-have |
| **UF_REDM.EP_RECV**<br/>State 2: Allocated | FT_ASGN<br/>Assignment Review | - Notification of batch results<br/>- View specific assigned unit (e.g. A-1201)<br/>- Accept (Proceed) or Reject (Penalty) | Must-have |
| | FT_STUP<br/>Status Update | - Acceptance confirms allocation<br/>- Status update to PAPERWORK PENDING<br/>- Timeline visualization | Must-have |
| **UF_REDM.EP_PAPR**<br/>State 3: Paperwork | FT_DOCS<br/>Document Signing | - 3 legal documents listed<br/>- In-app PDF viewer<br/>- Digital signature flow | Must-have |
| | FT_TAXP<br/>Tax Payment | - Property transfer tax 2%<br/>- VPay payment confirmation<br/>- Status: PAPERWORK complete | Must-have |
| **UF_REDM.EP_HAND**<br/>State 4: Handover | FT_MINT<br/>Complete Redemption | - Token burn (required): Burn tokens to complete redemption<br/>- NFT mint **[OPTIONAL]**: If enabled, mint property NFT certificate<br/>- Blockchain transaction progress | Must-have |
| | FT_PHYS [EXTSYS]<br/>Physical Handover | - Appointment scheduling<br/>- Property site visit<br/>- Ownership certificate receipt | Must-have |
| **UF_REDM.EP_COMP**<br/>Completion | FT_NFTG [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** Only if NFT minting is enabled<br/>- Property NFT displayed with metadata and IPFS links<br/>- Ownership document upload to NFT | Nice-to-have |
| | FT_PFUP<br/>Portfolio Update | - Tokens burned (0 remaining)<br/>- Properties Owned: 1<br/>- Total value updated | Must-have |

### Epic, Feature, and User Story Details

#### EP_ELIG: Eligibility Check

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_ELIG**<br/>Eligibility Check | | - User checks if eligible for property redemption<br/>- Accumulates tokens to meet threshold |
| | FT_RINF.US01<br/>Redemption Info | - User receives push notification<br/>- Thinking: "Properties are ready for redemption!"<br/>- **Acceptance Criteria:** Notification: "Properties ready for redemption"; Tap opens portfolio; Sent when construction complete |
| | FT_RINF.US02<br/>Redemption Info | - User sees banner on Home screen<br/>- Thinking: "I should check my redemption eligibility"<br/>- **Acceptance Criteria:** Banner: "Properties now available for redemption"; Tap navigates to Portfolio; Dismissible banner |
| | FT_RINF.US03<br/>Redemption Info | - User navigates to Portfolio and project<br/>- Thinking: "Let me see my Vinhomes token balance"<br/>- **Acceptance Criteria:** Vinhomes Grand Park selected; Redemption Available section visible; Construction complete badge |
| | FT_RINF.US04<br/>Redemption Info | - User sees token requirement<br/>- Thinking: "I need 30,000 tokens for a Studio"<br/>- **Acceptance Criteria:** Your tokens: 347; Min needed: 30,000; Gap clearly shown |
| | FT_RINF.US05<br/>Redemption Info | - User sees suggestion to buy more<br/>- Thinking: "I need to accumulate more tokens"<br/>- **Acceptance Criteria:** "Buy 29,653 more tokens to redeem a Studio"; Buy tokens link; CEX trading link |
| | FT_ACUM.US01<br/>Accumulate Tokens | - User buys tokens on CEX over time<br/>- Thinking: "Building up my token balance over 3 months"<br/>- **Acceptance Criteria:** CEX purchase tracked; Token balance increases; Progress toward goal shown |
| | FT_ACUM.US02<br/>Accumulate Tokens | - User transfers tokens from CEX to RWA wallet<br/>- Thinking: "Moving tokens to my RWA wallet"<br/>- **Acceptance Criteria:** Transfer from CEX successful; Balance updated in app; Transfer history logged |
| | FT_ACUM.US03<br/>Accumulate Tokens | - User reaches 30,000 tokens<br/>- Thinking: "I'm now eligible for redemption!"<br/>- **Acceptance Criteria:** Token count: 30,000+; Eligibility unlocked; Notification sent |

---

#### EP_INIT: Initiate Redemption

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_INIT**<br/>Initiate Redemption | | - User selects a Property Pool<br/>- Checks eligibility for the selected pool |
| | FT_ELGB.US01<br/>Eligibility Screen | - User taps Redeem Property button<br/>- Thinking: "Starting the redemption process"<br/>- **Acceptance Criteria:** Opens Redemption Flow; Step indicator visible; Screen 1: Pool Selection |
| | FT_POOL.US01<br/>Pool Selection | - User sees available Property Pools<br/>- Thinking: "I want a Standard 2BR unit"<br/>- **Acceptance Criteria:** List of pools (e.g., Standard Studio, Standard 2BR, Premium 3BR); Token price ranges shown; Availability status |
| | FT_POOL.US02<br/>Pool Selection | - User selects "Standard 2BR Pool"<br/>- Thinking: "This fits my token balance"<br/>- **Acceptance Criteria:** Pool details expanded; Avg. valuation; Token requirement (e.g., 50,000 tokens); "Select this Pool" button |
| | FT_ELGB.US02<br/>Eligibility Screen | - User sees eligibility for selected pool<br/>- Thinking: "Checking if I qualify"<br/>- **Acceptance Criteria:** Checks run against selected pool requirements; Tokens check (≥50K); KYC check; Lock-up check; All Green |
| | FT_POOL.US03<br/>Pool Selection | - User taps Continue<br/>- Thinking: "Ready to make my request"<br/>- **Acceptance Criteria:** Proceed to Request screen; Selected Pool: Standard 2BR; Est. Token Cost carried over |

---

#### EP_REQ: State 1 - Requested (Queued)

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_REQ**<br/>State 1: Requested | | - User submits request for Pool<br/>- Queued for Batch Allocation |
| | FT_CNFM.US01<br/>Confirmation | - User reviews request details<br/>- Thinking: "I'm requesting 1 unit from 2BR Pool"<br/>- **Acceptance Criteria:** Pool: Standard 2BR; Quantity: 1; Est. Token Cost: 50,000; Batch Date: [Next Month 1st] |
| | FT_CNFM.US02<br/>Confirmation | - User sees Anti-Cherry-Picking Warning<br/>- Thinking: "I can't just pick the best value unit"<br/>- **Acceptance Criteria:** Warning Box: "Property assignment is random within the pool. Rejecting the assigned unit results in a **0.5% token deduction penalty**."; "I understand" checkbox required |
| | FT_CNFM.US03<br/>Confirmation | - User sees fees and timeline<br/>- Thinking: "Fees paid later, timeline is 30-60 days"<br/>- **Acceptance Criteria:** Est. Transfer Tax: ~2%; Timeline: Allocation on [Date], Paperwork after allocation |
| | FT_CNCL.US01<br/>Cancel Request (Pre-Batch) | - User taps Cancel Request (before batch date)<br/>- Thinking: "I changed my mind"<br/>- **Acceptance Criteria:** Button "Cancel Request" available; Confirmation popup "Cancel and Unlock Tokens?"; 100% Refund processed immediately |
| | FT_LOCK.US01<br/>Lock Tokens | - User submits request<br/>- Thinking: "Locking my tokens now"<br/>- **Acceptance Criteria:** "Lock 50,000 Tokens" button; Biometric auth prompt; Re-confirms penalty policy |
| | FT_LOCK.US02<br/>Lock Tokens | - User sees success message<br/>- Thinking: "Now I wait for propery assignment"<br/>- **Acceptance Criteria:** "Request Queued"; Tokens moved to Escrow; "You will be notified on [Batch Date]"; Tracking ID |
| | FT_LOCK.US03<br/>Lock Tokens | - User checks status<br/>- Thinking: "Status is Queued"<br/>- **Acceptance Criteria:** Status: QUEUED FOR BATCH; Est. Allocation Date shown |

---

#### EP_RECV: State 2 - Allocated (Property Assigned)

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_RECV**<br/>State 2: Allocated | | - System assigns property (Batch)<br/>- User reviews and accepts/rejects |
| | FT_ASGN.US01<br/>Assignment Notification | - User receives push notification (Post-Batch)<br/>- Thinking: "My property has been assigned!"<br/>- **Acceptance Criteria:** Notification: "Property Assignment Complete. Tap to view your unit."; Sent after batch execution |
| | FT_ASGN.US02<br/>Assignment Review | - User views assigned property details<br/>- Thinking: "Let's see what I got... Unit A-1201"<br/>- **Acceptance Criteria:** Unit A-1201 displayed; Floor, View, Orientation details; Valuation vs Token Cost comparison |
| | FT_ASGN.US03<br/>Assignment Review | - User considers Acceptance<br/>- Thinking: "This unit looks good, I'll take it"<br/>- **Acceptance Criteria:** "Accept & Proceed to Paperwork" button primary; "Reject Unit" secondary (clearly labeled with Penalty) |
| | FT_ASGN.US04<br/>Assignment Rejection | - User taps Reject (No Cancellation)<br/>- Thinking: "I really don't want this unit, even with a penalty"<br/>- **Acceptance Criteria:** Warning popup: "Cancellation is not possible after allocation. Rejecting results in **0.5% penalty**."; Confirm Reject action |
| | FT_ASGN.US05<br/>Assignment Acceptance | - User taps Accept<br/>- Thinking: "Let's move to paperwork"<br/>- **Acceptance Criteria:** Confirmation message; Status updates to PAPERWORK PENDING; "Next: Sign Documents" |
| | FT_STUP.US01<br/>Status Update | - User sees updated timeline<br/>- Thinking: "Allocation done, Paperwork is next"<br/>- **Acceptance Criteria:** Timeline: Requested -> Allocated (Done) -> Paperwork (Active) -> Handover |

---

#### EP_PAPR: State 3 - Paperwork

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_PAPR**<br/>State 3: Paperwork | | - User signs legal documents<br/>- Pays property transfer tax |
| | FT_DOCS.US01<br/>Document Signing | - User receives push notification (Day 3)<br/>- Thinking: "Documents are ready to sign"<br/>- **Acceptance Criteria:** Notification: "Legal documents ready for signature"; Tap opens documents; Sent when docs prepared |
| | FT_DOCS.US02<br/>Document Signing | - User opens Document Signing screen<br/>- Thinking: "3 documents to review and sign"<br/>- **Acceptance Criteria:** 3 documents listed; Document names visible; Status per document |
| | FT_DOCS.US03<br/>Document Signing | - User sees Property Transfer Agreement<br/>- Thinking: "Main legal document"<br/>- **Acceptance Criteria:** PDF, 15 pages; Preview available; Required signature |
| | FT_DOCS.US04<br/>Document Signing | - User sees Tax Declaration Form<br/>- Thinking: "Tax documentation required"<br/>- **Acceptance Criteria:** PDF, 2 pages; Tax details; Required signature |
| | FT_DOCS.US05<br/>Document Signing | - User sees Handover Protocol<br/>- Thinking: "Handover procedures documented"<br/>- **Acceptance Criteria:** PDF, 5 pages; Handover terms; Required signature |
| | FT_DOCS.US06<br/>Document Signing | - User taps Review Documents<br/>- Thinking: "Let me read through these"<br/>- **Acceptance Criteria:** Opens in-app PDF viewer; Page navigation; Zoom enabled |
| | FT_DOCS.US07<br/>Document Signing | - User taps Sign All Documents<br/>- Thinking: "Ready to sign everything"<br/>- **Acceptance Criteria:** Digital signature flow starts; Sign on screen option; VPay auth for verification |
| | FT_DOCS.US08<br/>Document Signing | - User completes signing<br/>- Thinking: "All documents signed digitally"<br/>- **Acceptance Criteria:** VPay auth completed; Screen signature captured; Biometric confirmation; Success message |
| | FT_TAXP.US01<br/>Tax Payment | - User sees tax payment screen<br/>- Thinking: "Time to pay the transfer tax"<br/>- **Acceptance Criteria:** Property transfer tax: 60,000,000 VND (2%); Amount breakdown; Payment button |
| | FT_TAXP.US02<br/>Tax Payment | - User pays via VPay wallet<br/>- Thinking: "Using my VPay balance"<br/>- **Acceptance Criteria:** VPay payment confirmation; Balance check; Biometric auth |
| | FT_TAXP.US03<br/>Tax Payment | - User sees tax confirmation<br/>- Thinking: "Tax payment complete"<br/>- **Acceptance Criteria:** Tax paid confirmation; Receipt generated; Transaction logged |
| | FT_TAXP.US04<br/>Tax Payment | - User sees status update<br/>- Thinking: "Paperwork phase complete"<br/>- **Acceptance Criteria:** PAPERWORK Complete; Awaiting handover (1-3 days); Progress: 75% |

---

#### EP_HAND: State 4 - Handover

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_HAND**<br/>State 4: Handover | | - Tokens burned (required), property ownership transferred<br/>- Physical handover scheduled<br/>- **[OPTIONAL]** If NFT enabled: Property NFT minted on blockchain |
| | FT_MINT.US01<br/>Complete Redemption | - User receives push notification (Day 16)<br/>- Thinking: "Final step - complete my redemption"<br/>- **Acceptance Criteria:** Notification: "Final step: Complete your redemption"; Tap opens handover; Sent when ready |
| | FT_MINT.US02<br/>Complete Redemption | - User opens Handover screen<br/>- Thinking: "Ready to complete redemption"<br/>- **Acceptance Criteria:** "Ready to complete redemption"; Action summary; Complete Redemption button |
| | FT_MINT.US03<br/>Complete Redemption | - User sees what happens next<br/>- Thinking: "Tokens burn, property assigned to me"<br/>- **Acceptance Criteria:** Tokens burned; Property removed from pool; (If NFT enabled: NFT minted) |
| | FT_MINT.US04<br/>Complete Redemption | - User taps Complete Redemption<br/>- Thinking: "This is the moment"<br/>- **Acceptance Criteria:** Biometric auth; Blockchain transaction initiated; Loading state |
| | FT_MINT.US05<br/>Complete Redemption | - User sees Step 1: Burning tokens<br/>- Thinking: "My tokens are being burned"<br/>- **Acceptance Criteria:** "Burning 30,000 tokens... Done"; Checkmark; Transaction hash |
| | FT_MINT.US06 [OPTIONAL]<br/>NFT Minting | - **[OPTIONAL]** User sees Step 2: Minting NFT<br/>- Thinking: "My property NFT is being created"<br/>- **Acceptance Criteria:** "Minting Property NFT... Done"; Checkmark; NFT ID displayed |
| | FT_MINT.US07 [OPTIONAL]<br/>NFT Minting | - **[OPTIONAL]** User sees Step 3: IPFS upload<br/>- Thinking: "Metadata stored permanently"<br/>- **Acceptance Criteria:** "Uploading metadata to IPFS... Done"; IPFS hash; Link to view |
| | FT_MINT.US08<br/>Complete Redemption | - User sees success animation<br/>- Thinking: "I own Studio A-1201!"<br/>- **Acceptance Criteria:** "You own Studio A-1201" headline; Celebration animation; Property image |
| | FT_PHYS.US01<br/>Physical Handover | - User taps Schedule Property Handover<br/>- Thinking: "Time to visit my property"<br/>- **Acceptance Criteria:** Opens appointment booking; Calendar visible; Available slots shown |
| | FT_PHYS.US02<br/>Physical Handover | - User selects date and time<br/>- Thinking: "Next Saturday works for me"<br/>- **Acceptance Criteria:** Calendar picker; Time slots; Availability checked |
| | FT_PHYS.US03<br/>Physical Handover | - User sees location<br/>- Thinking: "Vinhomes Grand Park Sales Office"<br/>- **Acceptance Criteria:** Location: Vinhomes Grand Park Sales Office; Map link; Directions |
| | FT_PHYS.US04<br/>Physical Handover | - User confirms appointment<br/>- Thinking: "Appointment is set"<br/>- **Acceptance Criteria:** Appointment confirmed; Calendar invite; Reminder set |
| | FT_PHYS.US05<br/>Physical Handover | - User visits property site<br/>- Thinking: "Meeting the developer representative"<br/>- **Acceptance Criteria:** In-person visit; Representative present; Property inspection |
| | FT_PHYS.US06<br/>Physical Handover | - User signs final paperwork<br/>- Thinking: "Physical documents to sign"<br/>- **Acceptance Criteria:** Physical documents signed; Witness present; Legal completion |
| | FT_PHYS.US07<br/>Physical Handover | - User receives ownership certificate<br/>- Thinking: "I have my So do (Red Book)!"<br/>- **Acceptance Criteria:** So do (Red Book) received; Official document; Government registration |
| | FT_PHYS.US08<br/>Physical Handover | - User receives property keys<br/>- Thinking: "The keys to my new property!"<br/>- **Acceptance Criteria:** Physical keys received; Handover complete; Welcome package |

---

#### EP_COMP: Completion

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_REDM.EP_COMP**<br/>Completion | | - Portfolio updated with property ownership<br/>- **[OPTIONAL]** If NFT enabled: Property NFT displayed in gallery |
| | FT_NFTG.US01 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL - only if NFT enabled]** User views NFT Gallery<br/>- Thinking: "My property NFT is here"<br/>- **Acceptance Criteria:** Property NFT card displayed; Gallery view; Tap for details |
| | FT_NFTG.US02 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User sees NFT image<br/>- Thinking: "Beautiful exterior photo"<br/>- **Acceptance Criteria:** Exterior of Studio A-1201; High-res image; NFT frame |
| | FT_NFTG.US03 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User sees NFT name<br/>- Thinking: "Vinhomes Grand Park - Studio A-1201"<br/>- **Acceptance Criteria:** Full property name; Project identified; Unit number |
| | FT_NFTG.US04 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User sees token ID<br/>- Thinking: "Token ID 1201 on blockchain"<br/>- **Acceptance Criteria:** Token ID: 1201; Unique identifier; Blockchain verified |
| | FT_NFTG.US05 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User sees blockchain info<br/>- Thinking: "On Arbitrum network"<br/>- **Acceptance Criteria:** Blockchain: Arbitrum; Contract address; Explorer link |
| | FT_NFTG.US06 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User sees metadata<br/>- Thinking: "All property details on IPFS"<br/>- **Acceptance Criteria:** Size, floor, building; Legal docs IPFS links; Metadata complete |
| | FT_NFTG.US07 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User taps Upload Ownership Documents<br/>- Thinking: "Adding my So do to the NFT"<br/>- **Acceptance Criteria:** Camera opens; Photo of So do; Upload to IPFS |
| | FT_NFTG.US08 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User uploads document to IPFS<br/>- Thinking: "Permanently stored on blockchain"<br/>- **Acceptance Criteria:** IPFS upload successful; NFT metadata updated; Confirmation shown |
| | FT_NFTG.US09 [OPTIONAL]<br/>NFT Gallery | - **[OPTIONAL]** User sees legal owner<br/>- Thinking: "My name is on the NFT"<br/>- **Acceptance Criteria:** Legal Owner: Tran Mai Linh; Ownership verified; Government registered |
| | FT_PFUP.US01<br/>Portfolio Update | - User views Portfolio screen<br/>- Thinking: "My portfolio looks different now"<br/>- **Acceptance Criteria:** Portfolio updated; New layout; Property section added |
| | FT_PFUP.US02<br/>Portfolio Update | - User sees token balance<br/>- Thinking: "No more tokens, all redeemed"<br/>- **Acceptance Criteria:** Tokens: 0 (30,000 burned); Redemption noted; History available |
| | FT_PFUP.US03<br/>Portfolio Update | - User sees properties owned<br/>- Thinking: "I own 1 property now!"<br/>- **Acceptance Criteria:** Properties Owned: 1; Property section; Tap to view property details (or NFT if enabled) |
| | FT_PFUP.US04<br/>Portfolio Update | - User sees property card<br/>- Thinking: "Studio A-1201 with estimated value"<br/>- **Acceptance Criteria:** Studio A-1201; Estimated value: 3B; Property image; (NFT badge if enabled) |
| | FT_PFUP.US05<br/>Portfolio Update | - User sees total value<br/>- Thinking: "My portfolio is worth 3B VND!"<br/>- **Acceptance Criteria:** Total Portfolio Value: 3B VND; Property valuation; Market estimate |

---

## UF_LIQD (RL_INV): Liquidation and Exit

**Duration:** Passive
**Goal:** Receive cash distributions from property sales
**Sentiment:** Curious to Satisfied

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_LIQD.EP_ANOC**<br/>Announcement | FT_PUSH<br/>Push Notification | - Liquidation event announcement<br/>- Partial or full liquidation type<br/>- Distribution timeline preview | Must-have |
| | FT_EVDT<br/>Event Details | - Reason for liquidation<br/>- Expected timeline<br/>- Distribution calculation | Must-have |
| **UF_LIQD.EP_DIST**<br/>Distribution | FT_CLCN<br/>Calculation | - Estimated distribution amount<br/>- Per-token calculation<br/>- Before fees and taxes | Must-have |
| | FT_RCPT<br/>Receipt | - VPay credit notification<br/>- Final amount after deductions<br/>- Transaction confirmation | Must-have |
| **UF_LIQD.EP_TAX**<br/>Tax Documentation | FT_TXRC<br/>Tax Receipt | - Downloadable tax receipt<br/>- Capital gains calculation<br/>- Tax filing support | Must-have |
| | FT_PFUP<br/>Portfolio Update | - Tokens reduced after liquidation<br/>- Transaction history updated<br/>- Distribution summary | Must-have |

### Epic, Feature, and User Story Details

#### EP_ANOC: Announcement

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_LIQD.EP_ANOC**<br/>Announcement | | - User is notified of liquidation event<br/>- Understands liquidation reason and timeline |
| | FT_PUSH.US01<br/>Push Notification | - User receives push notification<br/>- Thinking: "A liquidation is happening?"<br/>- **Acceptance Criteria:** Notification: "Liquidation event announced for [Project]"; Tap opens details; Priority notification |
| | FT_PUSH.US02<br/>Push Notification | - User sees liquidation type<br/>- Thinking: "Partial liquidation - selling 30% of units"<br/>- **Acceptance Criteria:** Partial (30%) or Full (100%) displayed; Units affected; Clear explanation |
| | FT_EVDT.US01<br/>Event Details | - User opens Liquidation Event screen<br/>- Thinking: "Let me understand what's happening"<br/>- **Acceptance Criteria:** Event details displayed; Reason explained; Timeline shown |
| | FT_EVDT.US02<br/>Event Details | - User sees liquidation reason<br/>- Thinking: "Properties sold at premium price"<br/>- **Acceptance Criteria:** Reason: "30% of properties sold at 15% premium"; Market conditions explained; Investor benefit highlighted |
| | FT_EVDT.US03<br/>Event Details | - User sees timeline<br/>- Thinking: "Distribution in 14 days"<br/>- **Acceptance Criteria:** Distribution date: 14 days; Key milestones; Calendar integration option |
| | FT_EVDT.US04<br/>Event Details | - User sees affected tokens<br/>- Thinking: "My 347 tokens are partially affected"<br/>- **Acceptance Criteria:** Your tokens: 347; Affected: 104 (30%); Remaining: 243 |

---

#### EP_DIST: Distribution

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_LIQD.EP_DIST**<br/>Distribution | | - User sees distribution calculation<br/>- Receives proceeds to VPay wallet |
| | FT_CLCN.US01<br/>Calculation | - User sees distribution estimate<br/>- Thinking: "I'll receive about 13.5M"<br/>- **Acceptance Criteria:** Estimated distribution displayed; Calculation breakdown; Before taxes note |
| | FT_CLCN.US02<br/>Calculation | - User sees per-token calculation<br/>- Thinking: "130K per token is a good return"<br/>- **Acceptance Criteria:** Per token: 130,000 VND; Premium to purchase price; Gain percentage |
| | FT_CLCN.US03<br/>Calculation | - User sees total before fees<br/>- Thinking: "104 tokens x 130K = 13.52M"<br/>- **Acceptance Criteria:** 104 x 130K = 13,520,000 VND; Calculation shown; Gross amount |
| | FT_CLCN.US04<br/>Calculation | - User sees fee deductions<br/>- Thinking: "Platform fee is 1%"<br/>- **Acceptance Criteria:** Platform fee: 1% (135,200); Tax: Capital gains; Net calculation |
| | FT_RCPT.US01<br/>Receipt | - User receives push notification on distribution day<br/>- Thinking: "My distribution has arrived!"<br/>- **Acceptance Criteria:** Notification: "Liquidation proceeds credited"; Amount shown; Tap opens wallet |
| | FT_RCPT.US02<br/>Receipt | - User sees VPay credit<br/>- Thinking: "13.38M in my wallet"<br/>- **Acceptance Criteria:** VPay Balance updated; Credit: 13,384,800 VND; After all deductions |
| | FT_RCPT.US03<br/>Receipt | - User sees distribution breakdown<br/>- Thinking: "I can see where every VND went"<br/>- **Acceptance Criteria:** Gross: 13,520,000; Platform fee: -135,200; Net: 13,384,800; Complete breakdown |

---

#### EP_TAX: Tax Documentation

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_LIQD.EP_TAX**<br/>Tax Documentation | | - User downloads tax documentation<br/>- Portfolio updated with liquidation |
| | FT_TXRC.US01<br/>Tax Receipt | - User taps Download Tax Receipt<br/>- Thinking: "I need this for tax filing"<br/>- **Acceptance Criteria:** PDF download starts; Official tax document; Ready for submission |
| | FT_TXRC.US02<br/>Tax Receipt | - User sees capital gains calculation<br/>- Thinking: "My gain is documented"<br/>- **Acceptance Criteria:** Purchase price: 104 x 100K = 10,400,000; Sale price: 13,520,000; Capital gain: 3,120,000 |
| | FT_TXRC.US03<br/>Tax Receipt | - User sees tax withheld info<br/>- Thinking: "Useful for my annual filing"<br/>- **Acceptance Criteria:** Tax rate displayed; Amount withheld (if any); Filing instructions |
| | FT_PFUP.US01<br/>Portfolio Update | - User views updated portfolio<br/>- Thinking: "My token count is reduced"<br/>- **Acceptance Criteria:** Portfolio refreshed; New token count; Liquidation noted |
| | FT_PFUP.US02<br/>Portfolio Update | - User sees token balance<br/>- Thinking: "243 tokens remaining"<br/>- **Acceptance Criteria:** Tokens: 243 (was 347); Reduction: 104; Status: Active |
| | FT_PFUP.US03<br/>Portfolio Update | - User sees transaction history<br/>- Thinking: "Liquidation event is logged"<br/>- **Acceptance Criteria:** Liquidation: -104 tokens; +13.38M VND; Date and reference |
| | FT_PFUP.US04<br/>Portfolio Update | - User sees remaining value<br/>- Thinking: "Still have 28M in tokens"<br/>- **Acceptance Criteria:** Remaining value: 28,000,000 (243 x 115K); Updated valuation; Market price |

---

## UF_PROT (RL_INV): Notification and Participation

**Duration:** If applicable
**Goal:** Handle delays, failures, and buybacks
**Sentiment:** Anxious to Relieved

**Phase Considerations:**
- **Initial Phase (Year 1-2):** Fewer governance votes (1-2 projects); Investors learning governance process; Focus on flagship project issues only
- **Later Phase (Year 3+):** Multiple governance topics across projects; Need for vote tracking by project; More experienced investor base with faster decision-making

**Important Notes:**
- Not a triggering role in this phase - receives alerts from RL_SYS via Platform
- Voting threshold: 66% approval required for governance decisions
- Compensation from escrow + SPV reserves if project fails

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_PROT.EP_EMRG**<br/>Emergency Notification | FT_NTFY<br/>Alert Notification | - Push notification for emergency events<br/>- Token pause, construction issues<br/>- Immediate action required | Must-have |
| | FT_DTLS<br/>Event Details | - Detailed explanation of issue<br/>- Impact assessment<br/>- Next steps outlined | Must-have |
| **UF_PROT.EP_VOTE**<br/>Governance Voting | FT_PROP<br/>Proposal Screen | - Voting proposal displayed<br/>- Options explained<br/>- Deadline shown | Must-have |
| | FT_CAST<br/>Cast Vote | - Vote submission flow<br/>- Token-weighted voting<br/>- Confirmation receipt | Must-have |
| **UF_PROT.EP_COMP**<br/>Compensation | FT_ESCR<br/>Escrow Release | - Compensation from escrow<br/>- VPay credit notification<br/>- Amount calculation | Must-have |
| | FT_RFND<br/>Refund Processing | - Full or partial refund<br/>- Original investment returned<br/>- Processing timeline | Must-have |
| **UF_PROT.EP_BYBK**<br/>Buyback Program | FT_OFFR<br/>Buyback Offer | - Buyback price displayed<br/>- Timeline and terms<br/>- Opt-in/opt-out choice | Should-have |
| | FT_PART<br/>Participation | - Acceptance flow<br/>- Token transfer<br/>- Payout confirmation | Should-have |

### Epic, Feature, and User Story Details

#### EP_EMRG: Emergency Notification

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PROT.EP_EMRG**<br/>Emergency Notification | | - User receives emergency notification<br/>- Understands impact and next steps |
| | FT_NTFY.US01<br/>Alert Notification | - User receives high-priority push notification<br/>- Thinking: "Something urgent about my investment"<br/>- **Acceptance Criteria:** Notification: "Important: [Project] token trading paused"; Priority sound; Tap opens details |
| | FT_NTFY.US02<br/>Alert Notification | - User sees alert banner in app<br/>- Thinking: "I need to understand what's happening"<br/>- **Acceptance Criteria:** Red alert banner; Cannot dismiss easily; Direct link to details |
| | FT_DTLS.US01<br/>Event Details | - User opens Event Details screen<br/>- Thinking: "Construction delay, 6 months added"<br/>- **Acceptance Criteria:** Issue type: Construction Delay; Original timeline vs new; Cause explained |
| | FT_DTLS.US02<br/>Event Details | - User sees impact assessment<br/>- Thinking: "How does this affect my investment?"<br/>- **Acceptance Criteria:** Impact on token value; Trading restrictions; Vesting adjustments |
| | FT_DTLS.US03<br/>Event Details | - User sees what's protected<br/>- Thinking: "Escrow funds are safe"<br/>- **Acceptance Criteria:** Escrow status: Protected; Insurance coverage; Legal protections |
| | FT_DTLS.US04<br/>Event Details | - User sees next steps<br/>- Thinking: "Voting will happen in 7 days"<br/>- **Acceptance Criteria:** Governance vote scheduled; Date and time; What to expect |

---

#### EP_VOTE: Governance Voting

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PROT.EP_VOTE**<br/>Governance Voting | | - User participates in governance vote<br/>- Decides project future with other investors |
| | FT_PROP.US01<br/>Proposal Screen | - User receives voting notification<br/>- Thinking: "Time to vote on the proposal"<br/>- **Acceptance Criteria:** Notification: "Voting now open"; Tap opens proposal; Deadline shown |
| | FT_PROP.US02<br/>Proposal Screen | - User sees proposal details<br/>- Thinking: "Choose between extension or refund"<br/>- **Acceptance Criteria:** Proposal: Timeline Extension vs Refund; Both options explained; Implications detailed |
| | FT_PROP.US03<br/>Proposal Screen | - User sees Option A: Continue<br/>- Thinking: "Wait 6 more months for completion"<br/>- **Acceptance Criteria:** Extend timeline 6 months; Updated completion date; Incentive: +2% bonus tokens |
| | FT_PROP.US04<br/>Proposal Screen | - User sees Option B: Refund<br/>- Thinking: "Get my money back now"<br/>- **Acceptance Criteria:** Full refund at original price; Token burn; 14-day processing |
| | FT_PROP.US05<br/>Proposal Screen | - User sees voting deadline<br/>- Thinking: "7 days to decide"<br/>- **Acceptance Criteria:** Deadline: 7 days; Countdown timer; Vote status |
| | FT_PROP.US06<br/>Proposal Screen | - User sees current results<br/>- Thinking: "65% are voting to continue"<br/>- **Acceptance Criteria:** Continue: 65%; Refund: 35%; Real-time updates |
| | FT_CAST.US01<br/>Cast Vote | - User selects their vote<br/>- Thinking: "I'll vote to continue"<br/>- **Acceptance Criteria:** Option A selected; Vote button enabled; Review summary |
| | FT_CAST.US02<br/>Cast Vote | - User sees vote weight<br/>- Thinking: "My 347 tokens count"<br/>- **Acceptance Criteria:** Your vote: 347 tokens; Percentage of total; Impact displayed |
| | FT_CAST.US03<br/>Cast Vote | - User taps Submit Vote<br/>- Thinking: "Confirming my vote"<br/>- **Acceptance Criteria:** Biometric confirmation; On-chain transaction; Processing indicator |
| | FT_CAST.US04<br/>Cast Vote | - User sees vote confirmation<br/>- Thinking: "My vote has been recorded"<br/>- **Acceptance Criteria:** "Vote Recorded" message; Transaction hash; Cannot change vote |
| | FT_CAST.US05<br/>Cast Vote | - User sees vote result notification (after deadline)<br/>- Thinking: "The majority chose to continue"<br/>- **Acceptance Criteria:** Notification: "Vote result: Continue (72%)"; Outcome explained; Next steps |

---

#### EP_COMP: Compensation

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PROT.EP_COMP**<br/>Compensation | | - User receives compensation for issues<br/>- Escrow funds released if project fails |
| | FT_ESCR.US01<br/>Escrow Release | - User receives compensation notification<br/>- Thinking: "I'm getting compensation"<br/>- **Acceptance Criteria:** Notification: "Compensation credited to your wallet"; Amount shown; Tap opens details |
| | FT_ESCR.US02<br/>Escrow Release | - User sees compensation amount<br/>- Thinking: "2% bonus for the delay"<br/>- **Acceptance Criteria:** Compensation: 694,000 VND (2% of 34.7M); Calculation shown; Source: Escrow |
| | FT_ESCR.US03<br/>Escrow Release | - User sees VPay credit<br/>- Thinking: "Already in my wallet"<br/>- **Acceptance Criteria:** VPay balance updated; Transaction logged; Receipt available |
| | FT_RFND.US01<br/>Refund Processing | - User receives refund notification (if voted refund and won)<br/>- Thinking: "Getting my full investment back"<br/>- **Acceptance Criteria:** Notification: "Refund processing started"; Timeline: 14 days; Status tracking |
| | FT_RFND.US02<br/>Refund Processing | - User sees refund calculation<br/>- Thinking: "Full return at original price"<br/>- **Acceptance Criteria:** Original investment: 35,700,000 VND; 357 tokens at 100K each; Full refund |
| | FT_RFND.US03<br/>Refund Processing | - User sees tokens burned<br/>- Thinking: "My tokens are returned"<br/>- **Acceptance Criteria:** Tokens burned: 357; Portfolio updated; Transaction logged |
| | FT_RFND.US04<br/>Refund Processing | - User receives refund credit<br/>- Thinking: "Money is back in my wallet"<br/>- **Acceptance Criteria:** VPay credit: 35,700,000 VND; Confirmation; Withdrawal available |

---

#### EP_BYBK: Buyback Program

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_PROT.EP_BYBK**<br/>Buyback Program | | - User considers buyback offer<br/>- Optional exit at guaranteed price |
| | FT_OFFR.US01<br/>Buyback Offer | - User receives buyback notification<br/>- Thinking: "Platform is offering to buy my tokens"<br/>- **Acceptance Criteria:** Notification: "Buyback offer available"; Tap opens details; Limited time |
| | FT_OFFR.US02<br/>Buyback Offer | - User sees buyback price<br/>- Thinking: "105K per token is a 5% premium"<br/>- **Acceptance Criteria:** Price: 105,000 per token; 5% above current price; Guaranteed execution |
| | FT_OFFR.US03<br/>Buyback Offer | - User sees offer terms<br/>- Thinking: "30 days to decide"<br/>- **Acceptance Criteria:** Timeline: 30 days; All or partial; No obligation |
| | FT_OFFR.US04<br/>Buyback Offer | - User calculates potential proceeds<br/>- Thinking: "347 tokens x 105K = 36.4M"<br/>- **Acceptance Criteria:** Calculator available; Net proceeds shown; Comparison to market |
| | FT_PART.US01<br/>Participation | - User taps Accept Buyback<br/>- Thinking: "I'll take the guaranteed exit"<br/>- **Acceptance Criteria:** Opens acceptance flow; Amount selection; Terms confirmation |
| | FT_PART.US02<br/>Participation | - User selects token amount<br/>- Thinking: "Selling all 347 tokens"<br/>- **Acceptance Criteria:** All tokens selected; Partial option available; Value displayed |
| | FT_PART.US03<br/>Participation | - User confirms buyback<br/>- Thinking: "Confirming with biometric"<br/>- **Acceptance Criteria:** Biometric auth; Token transfer to platform; Processing indicator |
| | FT_PART.US04<br/>Participation | - User sees buyback confirmation<br/>- Thinking: "Tokens sold, payment pending"<br/>- **Acceptance Criteria:** "Buyback confirmed"; Tokens: 0; Payment: 3-5 days |
| | FT_PART.US05<br/>Participation | - User receives payout<br/>- Thinking: "36.4M credited to my wallet"<br/>- **Acceptance Criteria:** VPay credit: 36,435,000 VND; Transaction complete; Portfolio updated |

---

## UF_MNTR (RL_INV): Notification and Engagement

**Duration:** Daily/Weekly
**Goal:** Stay informed about investments and project progress
**Sentiment:** Engaged to Informed

**Phase Considerations:**
- **Initial Phase (Year 1-2):** Fewer notifications (1-2 projects); Dashboard focuses on flagship project; All milestones from single project
- **Later Phase (Year 3+):** More notifications from multiple projects; Need for notification filtering and grouping by project; Portfolio-wide summary and cross-project comparison

**Important Notes:**
- **MNTR phase (platform-side):** RL_ADM, RL_SYS, RL_BO trigger monitoring and alerts → Platform sends notifications to RL_INV
- **RL_INV's role:** Receive notifications from platform (price alerts, project updates, announcements)
- **After receiving notifications, RL_INV views detailed data via other user flows:**
  - Oracle data (property info, construction progress, sentiment) → See `UF_XFER.EP_ORCL` (Oracle Data Viewing)
  - Market data (price vs NAV, liquidity, market health) → See `UF_MKT.EP_MKTD` (Market Data Viewing)
- May trigger follow-up user flows (e.g., view project, check balance, view Oracle data)

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_MNTR.EP_DASH**<br/>Dashboard Monitoring | FT_PVCH<br/>Portfolio Value Check | - Daily value check routine<br/>- Quick glance at returns<br/>- Market updates | Must-have |
| | FT_PRAL<br/>Price Alerts | - Custom price alert settings<br/>- Push notifications on triggers<br/>- Alert management | Should-have |
| **UF_MNTR.EP_NEWS**<br/>Project Updates | FT_MILE<br/>Milestone Updates | - Construction progress notifications<br/>- Key milestone achievements<br/>- Photo/video updates | Must-have |
| | FT_NEWS<br/>News Feed | - Project news articles<br/>- Market analysis<br/>- Developer announcements | Should-have |
| **UF_MNTR.EP_RPRT**<br/>Reports | FT_PRPT<br/>Progress Reports | - Monthly/quarterly reports<br/>- Detailed analytics<br/>- PDF download | Should-have |
| | FT_PERF<br/>Performance Summary | - Return calculation<br/>- Benchmark comparison<br/>- Historical performance | Should-have |

### Epic, Feature, and User Story Details

#### EP_DASH: Dashboard Monitoring

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MNTR.EP_DASH**<br/>Dashboard Monitoring | | - User monitors portfolio regularly<br/>- Sets up custom alerts for price movements |
| | FT_PVCH.US01<br/>Portfolio Value Check | - User opens app for daily check<br/>- Thinking: "Quick look at my portfolio"<br/>- **Acceptance Criteria:** Portfolio screen loads < 2 seconds; Today's change displayed; Visual indicators |
| | FT_PVCH.US02<br/>Portfolio Value Check | - User sees value change<br/>- Thinking: "Up 1.2% today, nice"<br/>- **Acceptance Criteria:** Daily change: +1.2%; Green/red coloring; Absolute amount shown |
| | FT_PVCH.US03<br/>Portfolio Value Check | - User pulls to refresh<br/>- Thinking: "Getting the latest prices"<br/>- **Acceptance Criteria:** Pull-to-refresh enabled; Loading indicator; Last updated timestamp |
| | FT_PVCH.US04<br/>Portfolio Value Check | - User taps to view detailed market data<br/>- Thinking: "Let me check price vs NAV"<br/>- **Cross-reference:** → `UF_MKT.EP_MKTD` (Market Data Viewing)<br/>- User views price vs NAV, liquidity health, trading volume |
| | FT_PRAL.US01<br/>Price Alerts | - User taps Set Price Alert<br/>- Thinking: "Alert me if price drops below 110K"<br/>- **Acceptance Criteria:** Opens alert settings; Price input; Above/below options |
| | FT_PRAL.US02<br/>Price Alerts | - User sets alert condition<br/>- Thinking: "Notify when below 110K"<br/>- **Acceptance Criteria:** Alert type: Below; Price: 110,000; Project selected |
| | FT_PRAL.US03<br/>Price Alerts | - User receives alert notification<br/>- Thinking: "Price dropped below my threshold"<br/>- **Acceptance Criteria:** Notification: "Price alert triggered"; Current price; Tap opens portfolio |
| | FT_PRAL.US04<br/>Price Alerts | - User manages active alerts<br/>- Thinking: "Let me review my alerts"<br/>- **Acceptance Criteria:** Alert list displayed; Enable/disable toggle; Delete option |
| | FT_PRAL.US05<br/>Price Alerts | - User taps notification to view market data<br/>- Thinking: "Let me check the details"<br/>- **Cross-reference:** → `UF_MKT.EP_MKTD` (Market Data Viewing)<br/>- User views price vs NAV, liquidity indicators, trading volume |

---

#### EP_NEWS: Project Updates

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MNTR.EP_NEWS**<br/>Project Updates | | - User receives project milestone updates<br/>- Stays informed about development progress |
| | FT_MILE.US01<br/>Milestone Updates | - User receives milestone notification<br/>- Thinking: "Construction hit 80% complete!"<br/>- **Acceptance Criteria:** Notification: "Milestone: 80% construction complete"; Tap opens details; Photo attached |
| | FT_MILE.US02<br/>Milestone Updates | - User views milestone details<br/>- Thinking: "Great progress photos"<br/>- **Acceptance Criteria:** Milestone screen; Progress photos; Description; Timeline update |
| | FT_MILE.US03<br/>Milestone Updates | - User sees updated timeline<br/>- Thinking: "On track for Q2 2027 completion"<br/>- **Acceptance Criteria:** Updated completion date; Status: On Track; Remaining milestones |
| | FT_MILE.US04<br/>Milestone Updates | - User views construction gallery<br/>- Thinking: "Building looks amazing"<br/>- **Acceptance Criteria:** Photo gallery; Drone footage; Before/after comparisons |
| | FT_MILE.US05<br/>Milestone Updates | - User taps to view detailed Oracle data<br/>- Thinking: "Let me check full project status"<br/>- **Cross-reference:** → `UF_XFER.EP_ORCL` (Oracle Data Viewing)<br/>- User views property info, construction progress, area market data, sentiment |
| | FT_NEWS.US01<br/>News Feed | - User opens News tab<br/>- Thinking: "What's new with my projects?"<br/>- **Acceptance Criteria:** News feed displayed; Latest articles first; Filter by project;<br/>  - Initial: Simple chronological feed from 1-2 projects<br/>  - Later: Grouped by project with filters and search |
| | FT_NEWS.US02<br/>News Feed | - User reads project article<br/>- Thinking: "Vinhomes wins development award"<br/>- **Acceptance Criteria:** Article opens; Images included; Share option |
| | FT_NEWS.US03<br/>News Feed | - User sees market analysis<br/>- Thinking: "HCMC real estate market strong"<br/>- **Acceptance Criteria:** Market reports; Expert analysis; Data visualizations |

---

#### EP_RPRT: Reports

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_MNTR.EP_RPRT**<br/>Reports | | - User reviews detailed reports<br/>- Downloads documentation for records |
| | FT_PRPT.US01<br/>Progress Reports | - User taps View Reports<br/>- Thinking: "Monthly report is ready"<br/>- **Acceptance Criteria:** Reports list; Monthly/quarterly; Download available |
| | FT_PRPT.US02<br/>Progress Reports | - User views monthly report<br/>- Thinking: "Detailed project update"<br/>- **Acceptance Criteria:** In-app viewer; All metrics included; Professional format |
| | FT_PRPT.US03<br/>Progress Reports | - User downloads PDF report<br/>- Thinking: "Saving for my records"<br/>- **Acceptance Criteria:** PDF download; Share option; Email option |
| | FT_PERF.US01<br/>Performance Summary | - User views performance summary<br/>- Thinking: "How am I doing overall?"<br/>- **Acceptance Criteria:** Total return; Since inception; IRR calculation |
| | FT_PERF.US02<br/>Performance Summary | - User sees benchmark comparison<br/>- Thinking: "Outperforming bank savings"<br/>- **Acceptance Criteria:** vs Bank savings: +12%; vs VN-Index: +5%; Visual chart |
| | FT_PERF.US03<br/>Performance Summary | - User sees income received<br/>- Thinking: "Total income from all sources"<br/>- **Acceptance Criteria:** Rental income: 2.5M; Liquidation: 13.4M; Total received |

---

## UF_SUPP (RL_INV): Support Tickets

**Duration:** As needed
**Goal:** Get help with issues across all platform phases
**Sentiment:** Frustrated to Relieved

**Relationship to RL_BO:**
- All investor tickets are handled by Back Office (RL_BO) team
- Tickets are categorized by type and routed to appropriate BO specialists
- Investor sees only ticket status and responses - internal BO process is abstracted
- Tickets can be created from Help Center or contextually within each phase

**Ticket Categories (mapped to platform phases):**

| Category | Examples | Related Phase |
|----------|----------|---------------|
| **Pre-Offering Inquiry** | Project questions, eligibility, offering timeline | UF_PREO |
| **Token Offering Issue** | Commitment problems, modification requests, how-to questions | UF_TOKO |
| **Allocation Inquiry** | Allocation results, disputes, refund timing | UF_OSET |
| **Transfer Issue** | Failed CEX transfers, blockchain errors, transfer status | UF_XFER |
| **Redemption Support** | Redemption status, document issues, handover delays | UF_REDM |
| **Deposit/Withdrawal** | Failed/missing deposits, withdrawal issues | Finance |
| **Technical Issue** | App bugs, login problems, notification issues | Technical |
| **General Inquiry** | Other questions not covered above | General |

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_SUPP.EP_HELP**<br/>Help Center | FT_FAQS<br/>FAQs | - Searchable FAQ database by category<br/>- Common question answers<br/>- Try FAQ before ticket recommended | Must-have |
| | FT_CHAT<br/>Live Chat | - In-app chat support<br/>- Agent connection during business hours<br/>- Chat history and transcript | Should-have |
| **UF_SUPP.EP_TICK**<br/>Support Tickets | FT_CRTK<br/>Create Ticket | - 8 ticket categories (see table above)<br/>- Auto-suggest based on current screen context<br/>- Description, attachments, priority | Must-have |
| | FT_TRAK<br/>Track Ticket | - Ticket status: Open, In Progress, Resolved, Closed<br/>- Response notifications<br/>- Two-way messaging with BO agent | Must-have |
| **UF_SUPP.EP_CTXH**<br/>Contextual Help | FT_INLN<br/>Inline Help | - "Need Help?" button on key screens<br/>- Pre-fills ticket category based on context<br/>- Quick access from PREO, TOKO, OSET, XFER, REDM | Must-have |

### Epic, Feature, and User Story Details

#### EP_HELP: Help Center

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_SUPP.EP_HELP**<br/>Help Center | | - User finds answers to common questions<br/>- Gets live support when needed |
| | FT_FAQS.US01<br/>FAQs | - User taps Help in settings<br/>- Thinking: "I have a question about redemption"<br/>- **Acceptance Criteria:** Help Center opens; Search bar prominent; Categories visible |
| | FT_FAQS.US02<br/>FAQs | - User searches for topic<br/>- Thinking: "How does property redemption work?"<br/>- **Acceptance Criteria:** Search results displayed; Relevant articles; Quick answers |
| | FT_FAQS.US03<br/>FAQs | - User reads FAQ article<br/>- Thinking: "This answers my question"<br/>- **Acceptance Criteria:** Article displayed; Clear explanation; Related articles linked |
| | FT_FAQS.US04<br/>FAQs | - User marks article helpful<br/>- Thinking: "This was useful"<br/>- **Acceptance Criteria:** Helpful/Not helpful buttons; Feedback recorded; Thank you message |
| | FT_CHAT.US01<br/>Live Chat | - User taps Chat with Support<br/>- Thinking: "I need to talk to someone"<br/>- **Acceptance Criteria:** Chat window opens; Agent connecting; Wait time shown |
| | FT_CHAT.US02<br/>Live Chat | - User connects with agent<br/>- Thinking: "Agent is now available"<br/>- **Acceptance Criteria:** Agent name displayed; Chat active; Typing indicator |
| | FT_CHAT.US03<br/>Live Chat | - User describes issue<br/>- Thinking: "My deposit hasn't arrived"<br/>- **Acceptance Criteria:** Message sent; Read receipts; Agent response |
| | FT_CHAT.US04<br/>Live Chat | - User receives resolution<br/>- Thinking: "Issue resolved, thanks!"<br/>- **Acceptance Criteria:** Resolution provided; Chat transcript; Rate experience option |

---

#### EP_TICK: Support Tickets

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_SUPP.EP_TICK**<br/>Support Tickets | | - User submits formal support request<br/>- Tracks ticket progress to resolution |
| | FT_CRTK.US01<br/>Create Ticket | - User taps Submit a Request<br/>- Thinking: "I need formal support"<br/>- **Acceptance Criteria:** Ticket form opens; Category selection; Required fields |
| | FT_CRTK.US02<br/>Create Ticket | - User selects issue category<br/>- Thinking: "This is about a deposit issue"<br/>- **Acceptance Criteria:** 8 categories: Pre-Offering Inquiry, Token Offering Issue, Allocation Inquiry, Transfer Issue, Redemption Support, Deposit/Withdrawal, Technical Issue, General Inquiry; Selection required; Category description shown |
| | FT_CRTK.US03<br/>Create Ticket | - User describes issue<br/>- Thinking: "Explaining my problem in detail"<br/>- **Acceptance Criteria:** Text input field; Min/max characters; Formatting options |
| | FT_CRTK.US04<br/>Create Ticket | - User attaches screenshot<br/>- Thinking: "Adding proof of the issue"<br/>- **Acceptance Criteria:** Attach option; Photo/file upload; Multiple attachments |
| | FT_CRTK.US05<br/>Create Ticket | - User submits ticket<br/>- Thinking: "Ticket submitted successfully"<br/>- **Acceptance Criteria:** Confirmation screen; Ticket ID; Expected response time |
| | FT_TRAK.US01<br/>Track Ticket | - User views ticket list<br/>- Thinking: "Let me check my open tickets"<br/>- **Acceptance Criteria:** My Tickets list; Status per ticket; Most recent first |
| | FT_TRAK.US02<br/>Track Ticket | - User sees ticket status<br/>- Thinking: "In Progress - being reviewed"<br/>- **Acceptance Criteria:** Status: Open, In Progress, Resolved, Closed; Status updates; Timeline |
| | FT_TRAK.US03<br/>Track Ticket | - User receives response notification<br/>- Thinking: "Support has responded"<br/>- **Acceptance Criteria:** Notification: "Support responded to ticket #123"; Tap opens ticket |
| | FT_TRAK.US04<br/>Track Ticket | - User sees resolution<br/>- Thinking: "Issue has been fixed"<br/>- **Acceptance Criteria:** Resolution message; Status: Resolved; Confirm resolution button |

---

#### EP_CTXH: Contextual Help

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_SUPP.EP_CTXH**<br/>Contextual Help | | - User gets help directly from the screen they're on<br/>- Category auto-selected based on context |
| | FT_INLN.US01<br/>Inline Help | - User taps "Need Help?" on Project Details screen<br/>- Thinking: "I have a question about this project"<br/>- **Acceptance Criteria:** Opens ticket form; Category pre-filled: "Pre-Offering Inquiry"; Project context attached |
| | FT_INLN.US02<br/>Inline Help | - User taps "Need Help?" on Token Offering screen<br/>- Thinking: "I'm having trouble committing"<br/>- **Acceptance Criteria:** Opens ticket form; Category pre-filled: "Token Offering Issue"; Offering context attached |
| | FT_INLN.US03<br/>Inline Help | - User taps "Need Help?" on Allocation Results screen<br/>- Thinking: "I don't understand my allocation"<br/>- **Acceptance Criteria:** Opens ticket form; Category pre-filled: "Allocation Inquiry"; Allocation details attached |
| | FT_INLN.US04<br/>Inline Help | - User taps "Need Help?" on Transfer screen<br/>- Thinking: "My transfer is stuck"<br/>- **Acceptance Criteria:** Opens ticket form; Category pre-filled: "Transfer Issue"; Transaction ID attached |
| | FT_INLN.US05<br/>Inline Help | - User taps "Need Help?" on Redemption screen<br/>- Thinking: "I have a question about my redemption"<br/>- **Acceptance Criteria:** Opens ticket form; Category pre-filled: "Redemption Support"; Redemption request context attached |

---

## UF_IEXT (RL_INV): Referral and Feedback

**Duration:** Ongoing
**Goal:** Share and earn rewards, provide feedback
**Sentiment:** Generous to Valued

**Phase Considerations:**
- **Initial Phase (Year 1-2):** Referral messaging focuses on flagship project; Smaller user base with early-adopter incentives; Feature requests focus on foundational functionality
- **Later Phase (Year 3+):** Referral messaging highlights portfolio diversity and multiple projects; Larger community with tiered rewards; Feature requests can address advanced portfolio management

**Important Notes:**
- Optional investor activities beyond core investing functions
- Share referral code, earn rewards for successful referrals
- Provide app feedback and feature suggestions

### Epic and Feature Summary

| Epic | Feature | Description | Priority |
|------|---------|-------------|----------|
| **UF_IEXT.EP_REFR**<br/>Referral Program | FT_CODE<br/>Referral Code | - Unique referral code display<br/>- Share options<br/>- QR code generation | Should-have |
| | FT_RWRD<br/>Rewards Tracking | - Referral status tracking<br/>- Reward earnings<br/>- Payout history | Should-have |
| **UF_IEXT.EP_FDBK**<br/>Feedback | FT_RATE<br/>App Rating | - In-app rating prompt<br/>- App Store redirect<br/>- Feedback collection | Should-have |
| | FT_FEAT<br/>Feature Request | - Feature suggestion submission<br/>- Vote on suggestions<br/>- Status tracking | Nice-to-have |

### Epic, Feature, and User Story Details

#### EP_REFR: Referral Program

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_IEXT.EP_REFR**<br/>Referral Program | | - User shares referral code with friends<br/>- Earns rewards for successful referrals |
| | FT_CODE.US01<br/>Referral Code | - User taps Refer Friends<br/>- Thinking: "Let me share with my colleague"<br/>- **Acceptance Criteria:** Referral screen opens; Unique code displayed; Share options |
| | FT_CODE.US02<br/>Referral Code | - User sees referral code<br/>- Thinking: "My code is LINH2024"<br/>- **Acceptance Criteria:** Code: LINH2024; Copy button; Large display |
| | FT_CODE.US03<br/>Referral Code | - User shares via messaging app<br/>- Thinking: "Sending to my friend on Zalo"<br/>- **Acceptance Criteria:** Share sheet opens; Pre-written message; Platform selection;<br/>  - Initial: Message highlights flagship project opportunity<br/>  - Later: Message highlights portfolio diversity and project options |
| | FT_CODE.US04<br/>Referral Code | - User shows QR code<br/>- Thinking: "My friend can scan this"<br/>- **Acceptance Criteria:** QR code displayed; Contains referral link; Save option |
| | FT_RWRD.US01<br/>Rewards Tracking | - User views referral dashboard<br/>- Thinking: "How many people have signed up?"<br/>- **Acceptance Criteria:** Referral dashboard; Invited count; Status per referral |
| | FT_RWRD.US02<br/>Rewards Tracking | - User sees pending referral<br/>- Thinking: "My friend is completing KYC"<br/>- **Acceptance Criteria:** Referral: Nguyen Van A; Status: Pending (KYC); Progress indicator |
| | FT_RWRD.US03<br/>Rewards Tracking | - User sees completed referral<br/>- Thinking: "They made their first investment!"<br/>- **Acceptance Criteria:** Referral: Nguyen Van A; Status: Completed; Reward earned |
| | FT_RWRD.US04<br/>Rewards Tracking | - User sees reward earned<br/>- Thinking: "I earned 500K for this referral"<br/>- **Acceptance Criteria:** Reward: 500,000 VND; Credited to VPay; Transaction logged |
| | FT_RWRD.US05<br/>Rewards Tracking | - User sees total earnings<br/>- Thinking: "Total of 2M from 4 referrals"<br/>- **Acceptance Criteria:** Total earned: 2,000,000 VND; Referrals: 4 completed; Leaderboard position |

---

#### EP_FDBK: Feedback

| UserFlow.Epic | Feature.UserStory | Description |
|---------------|-------------------|-------------|
| **UF_IEXT.EP_FDBK**<br/>Feedback | | - User provides app feedback<br/>- Suggests new features |
| | FT_RATE.US01<br/>App Rating | - User sees rating prompt<br/>- Thinking: "I've been using the app for a while"<br/>- **Acceptance Criteria:** Rating prompt after milestone; Star rating; Dismiss option |
| | FT_RATE.US02<br/>App Rating | - User gives 5-star rating<br/>- Thinking: "Love this app!"<br/>- **Acceptance Criteria:** Stars selected; Redirect to App Store; Thank you message |
| | FT_RATE.US03<br/>App Rating | - User gives lower rating<br/>- Thinking: "Some improvements needed"<br/>- **Acceptance Criteria:** Stars selected; Feedback form opens; Not redirected to store |
| | FT_RATE.US04<br/>App Rating | - User submits feedback<br/>- Thinking: "Hope they fix this issue"<br/>- **Acceptance Criteria:** Feedback submitted; Thank you message; Review by team |
| | FT_FEAT.US01<br/>Feature Request | - User taps Suggest a Feature<br/>- Thinking: "I have a great idea"<br/>- **Acceptance Criteria:** Feature request form; Title and description; Category selection |
| | FT_FEAT.US02<br/>Feature Request | - User submits suggestion<br/>- Thinking: "Add portfolio export to Excel"<br/>- **Acceptance Criteria:** Suggestion submitted; Added to list; Vote count: 1 |
| | FT_FEAT.US03<br/>Feature Request | - User views suggestion list<br/>- Thinking: "What are others suggesting?"<br/>- **Acceptance Criteria:** List of suggestions; Sort by votes; Status per item |
| | FT_FEAT.US04<br/>Feature Request | - User votes on suggestion<br/>- Thinking: "I want this feature too"<br/>- **Acceptance Criteria:** Vote button; Count increases; One vote per user |

---
