# Upwork Cover Letter - WMF Customer Service AI Agent

---

Hi,

You need an AI agent that watches your sales@ mailbox, figures out if an email is an RFQ, an order status inquiry, a change request, or spam -- then extracts the actual quote-worthy details (customer, parts, quantities, finish specs like AAMA 2604/2605, colors, dimensions) and drafts a quote using your existing Excel template. All with a human approving every outbound message. I've already started building it.

**Here's a working prototype:** [Live Dashboard](https://wmf-agent-dashboard.vercel.app) | [Source Code](https://github.com/HumamAl/wmf-agent-dashboard) | [Full Technical Approach](https://wmf-agent-dashboard.vercel.app/approach.html)

The demo shows AI-powered email classification and structured RFQ extraction with confidence scoring -- the two hardest parts of your pipeline. It's built on the same stack I'd use for your production system. The technical approach document covers the full architecture, workflow details, guardrails, and delivery plan.

## Technical Approach

- **n8n** for workflow orchestration -- email polling, classification routing, approval flows, scheduled order status runs
- **Microsoft Graph API** for M365 integration (shared mailbox monitoring, OneDrive/SharePoint file access, Teams notifications for approvals)
- **Claude API** for email classification and RFQ data extraction with structured output and confidence scores
- **Excel automation** for populating your existing quote template and reading order status data from your workbook
- **Human-in-the-loop at every outbound step** -- drafts queue in a dashboard, one-click approve/edit/reject before anything sends

I'm not proposing we replace your team's judgment. The agent handles the repetitive reading, classifying, and data entry. Your people make the final call.

## Delivery Plan

| Phase | Timeline | Deliverable |
|-------|----------|-------------|
| 1 | Week 1-2 | Email monitoring + classification + RFQ data extraction pipeline |
| 2 | Week 3-4 | Quote drafting from Excel template + approval workflow via Teams |
| 3 | Week 5-6 | Daily order status email automation from workbook data |
| 4 | Week 7-8 | Testing, edge cases, documentation, handoff |

Each phase ships something usable. You'll have email classification and RFQ extraction running by the end of week 2.

## Why Me

I work in the manufacturing/construction space and understand the difference between a 2604 and 2605 spec isn't cosmetic -- it's warranty-grade. I won't build something that confuses powder coat with liquid, or drops a line item because the customer formatted their RFQ as a paragraph instead of a table.

I also don't over-engineer. You need this to work reliably with your current Excel-based workflow, not a full ERP migration. The n8n approach means your team can see and adjust the workflows without calling a developer for every change.

Happy to walk through the prototype on a quick call and show you exactly how the classification and extraction pipeline works against real-world RFQ emails.

-- Omeiza

---
