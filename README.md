# WMF Customer Service AI Agent - MVP

AI-powered customer service assistant for **Windsor Metal Finishing** that automates RFQ response drafting and order status email preparation, with human-in-the-loop approval for all outbound communications.

## Architecture

```
Customer Emails / Order Data
        |
        v
Microsoft 365 (Sales Inbox + Excel Files)
        |
        v
n8n Workflow Engine
        |
        v
AI Classification & Extraction (Claude API)
        |
        |-- RFQ Workflow --> Draft Quote (Excel Template)
        |
        +-- Status Workflow --> Draft Status Emails
        |
        v
Review Dashboard (This App)
        |
        v
Human Review & Approval
        |
        v
Human-Sent Customer Emails
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Workflow Engine | n8n (self-hosted or cloud) |
| AI/NLP | Claude API (Anthropic) |
| Email/Files | Microsoft Graph API (M365) |
| File Storage | SharePoint / OneDrive |
| Notifications | Microsoft Teams |
| Deployment | Vercel |

## Features

### Email Classification
- Monitors M365 shared mailbox (`sales@windsormetalfinishing.com`)
- AI classifies incoming emails: RFQ, Order Status, Change Request, Administrative, Spam
- Confidence scoring for each classification

### RFQ Data Extraction
- Extracts structured data from emails and attachments
- Fields: customer name, contact, ship-to, parts, quantities, finish system (AAMA 2604/2605), colors, dimensions, masking notes, lead time
- Each field includes confidence score and source evidence
- Flags missing or ambiguous information

### Quote Drafting
- Populates existing WMF Excel quote template
- Saves drafts to SharePoint with version control
- Generates review package with RFQ summary, missing info flags, and suggested reply

### Order Status Automation
- Reads order status from Excel workbook (PO#, WO#, status, dates)
- Groups orders by customer
- Drafts professional status update emails using WMF template
- Queues as drafts -- never sends autonomously

### Human Review Dashboard
- Dashboard with stats overview
- Email inbox with classification badges
- RFQ detail view with confidence-scored fields
- Order status tracking with email draft preview
- Approve / Edit / Reject workflow
- Full audit trail

### AI Demo
- Interactive demo page to test email classification
- Real-time RFQ data extraction with confidence scoring
- Sample emails for quick testing

## n8n Workflows

Pre-built workflow configurations in `/public/n8n-workflows/`:

| Workflow | Description |
|----------|-------------|
| `email-monitor-classify.json` | M365 inbox monitoring + AI classification |
| `rfq-extraction-quote.json` | RFQ data extraction + Excel quote drafting |
| `order-status-daily.json` | Daily order status email generation |
| `approval-webhook.json` | Dashboard approval/rejection handling |

Import these directly into your n8n instance.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
src/
  app/
    page.tsx            # Dashboard overview
    inbox/page.tsx      # Email inbox with classification
    rfq/page.tsx        # RFQ review with confidence scoring
    status/page.tsx     # Order status & email drafts
    log/page.tsx        # Activity audit trail
    demo/page.tsx       # Interactive AI demo
    api/
      classify/         # Email classification endpoint
      extract-rfq/      # RFQ data extraction endpoint
  components/
    sidebar.tsx
    classification-badge.tsx
    confidence-indicator.tsx
    status-badge.tsx
    ui/                 # shadcn/ui components
  lib/
    types.ts            # TypeScript interfaces
    demo-data.ts        # Realistic demo data
    utils.ts
public/
  n8n-workflows/        # Importable n8n workflow configs
```

## Guardrails

- Human-in-the-loop approval required for all outbound emails
- Confidence thresholds prevent AI from guessing
- No pricing, delivery, or engineering commitments without review
- Full audit trail: original email -> extracted data -> draft -> approval -> send confirmation
- Agent never sends emails autonomously

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.
