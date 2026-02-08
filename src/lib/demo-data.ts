import type {
  Email,
  RFQ,
  OrderStatus,
  StatusEmailDraft,
  ActivityLog,
  DashboardStats,
} from './types';

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------
export const emails: Email[] = [
  {
    id: 'em-001',
    from: 'David Chen',
    fromEmail: 'dchen@apexarchitectural.com',
    subject: 'RFQ - Aluminum Curtainwall Extrusions, AAMA 2605 Kynar',
    body: `Hi Windsor team,

We have a new project coming up - 200 Collins Street tower renovation. Need pricing on the following:

1. 6063-T6 aluminum extrusion profiles, 4" x 2" rectangular tube, 0.125" wall, 24 ft lengths - Qty 450 pcs
   Finish: AAMA 2605, 70% PVDF Kynar 500, color Champagne Metallic (custom match to Valspar ES-36042)

2. Aluminum flat bar 4" x 1/4", 12 ft lengths - Qty 200 pcs
   Same finish spec as above

Mask all interior surfaces. Ship to our fabrication shop at 1847 Industrial Pkwy, Hayward CA 94545.

Need this quoted ASAP. Project timeline is tight - hoping for 3 week lead time on coating.

Thanks,
David Chen
Senior Project Manager
Apex Architectural Systems
(510) 555-0147`,
    receivedAt: '2026-02-08T08:12:00Z',
    threadId: 'th-001',
    classification: 'rfq',
    classificationConfidence: 0.98,
    hasAttachments: true,
    attachments: ['200_Collins_Extrusion_Drawing_Rev_C.pdf'],
    isRead: true,
    status: 'processing',
  },
  {
    id: 'em-002',
    from: 'Maria Santos',
    fromEmail: 'msantos@summitglassmetal.com',
    subject: 'RE: PO #SG-24-1187 Status Update Request',
    body: `Good morning,

Can you please provide an update on PO #SG-24-1187? This is the steel storefront framing for the Riverdale Medical Center project. We had 340 pieces of steel tube scheduled for powder coat in Dark Bronze.

Our installer is asking for a ship date. The original promise was Feb 6 but we haven't received shipping notification.

Also, any update on PO #SG-24-1192? That was the aluminum panel order with the Tiger Drylac RAL 7016 Anthracite Grey.

Thanks,
Maria Santos
Operations Manager
Summit Glass & Metal
(925) 555-0283`,
    receivedAt: '2026-02-08T08:45:00Z',
    threadId: 'th-002',
    classification: 'order_status',
    classificationConfidence: 0.96,
    hasAttachments: false,
    isRead: true,
    status: 'processing',
  },
  {
    id: 'em-003',
    from: 'James Whitfield',
    fromEmail: 'jwhitfield@pacificcurtainwall.com',
    subject: 'RFQ - Aluminum Panel System, AAMA 2604, Multiple Colors',
    body: `Hi,

Please quote the attached panel system for the Embarcadero Place project:

- 0.125" 5052-H32 aluminum flat sheets, 48" x 96" - Qty 180 sheets
  AAMA 2604 fluoropolymer, RAL 9016 Traffic White
- 0.125" 5052-H32 aluminum flat sheets, 48" x 96" - Qty 85 sheets
  AAMA 2604 fluoropolymer, RAL 7021 Black Grey
- 0.125" 5052-H32 aluminum flat sheets, 36" x 72" - Qty 60 sheets
  AAMA 2604 fluoropolymer, RAL 9016 Traffic White

All panels need edge masking 1/2" on all four sides for welding tabs.

Please include pricing for both standard and expedited lead times.

Regards,
James Whitfield
Estimating Department
Pacific Curtainwall Inc.
(415) 555-0391`,
    receivedAt: '2026-02-08T09:20:00Z',
    threadId: 'th-003',
    classification: 'rfq',
    classificationConfidence: 0.97,
    hasAttachments: true,
    attachments: ['Embarcadero_Panel_Schedule.xlsx', 'Panel_Detail_A3.pdf'],
    isRead: true,
    status: 'new',
  },
  {
    id: 'em-004',
    from: 'Robert Kim',
    fromEmail: 'rkim@meridianfab.com',
    subject: 'Change Request - WO #WMF-26-0892 Color Change',
    body: `Hey team,

We need to change the color on WO #WMF-26-0892 (our PO #MF-3345). The architect changed the spec from RAL 6005 Moss Green to RAL 6012 Black Green on the steel handrail components.

These are the 1.5" round tube pieces - I believe you already received them but hopefully haven't started coating yet. 120 pieces total.

Let me know if this affects the timeline or price. Current promise date is Feb 14.

Thanks,
Robert Kim
Meridian Fabrication LLC
(408) 555-0512`,
    receivedAt: '2026-02-08T10:05:00Z',
    threadId: 'th-004',
    classification: 'change_request',
    classificationConfidence: 0.94,
    hasAttachments: false,
    isRead: false,
    status: 'new',
  },
  {
    id: 'em-005',
    from: 'Lisa Tran',
    fromEmail: 'ltran@apexarchitectural.com',
    subject: 'RFQ - Custom Aluminum Brackets & Clips, Powder Coat',
    body: `Hi Windsor,

Need a quick quote on the following small-run items for our 200 Collins project:

1. Custom aluminum L-brackets, 6061-T6, 3" x 3" x 1/4", 4" length - Qty 600 pcs
   Powder coat TGIC polyester, RAL 9005 Jet Black, matte finish

2. Stainless steel z-clips, 16 ga, 2" x 3" - Qty 1,200 pcs
   (do you coat stainless? if not just quote the aluminum brackets)

3. Aluminum shim plates, 1/8" x 2" x 4" - Qty 300 pcs
   Same RAL 9005 Jet Black

Deliver to same Hayward address as our other orders.

Thanks,
Lisa Tran
Project Coordinator
Apex Architectural Systems`,
    receivedAt: '2026-02-08T10:30:00Z',
    threadId: 'th-005',
    classification: 'rfq',
    classificationConfidence: 0.95,
    hasAttachments: false,
    isRead: false,
    status: 'new',
  },
  {
    id: 'em-006',
    from: 'Karen Mitchell',
    fromEmail: 'kmitchell@wmfinishing.com',
    subject: 'FW: Updated Holiday Schedule 2026',
    body: `Team,

Please see the updated company holiday schedule for Q1-Q2 2026 attached. Note the plant shutdown week has moved from July 4th week to June 29 - July 3.

Please update your project timelines accordingly and communicate with customers on any affected orders.

Thanks,
Karen Mitchell
HR Manager
Windsor Metal Finishing`,
    receivedAt: '2026-02-08T07:30:00Z',
    threadId: 'th-006',
    classification: 'administrative',
    classificationConfidence: 0.99,
    hasAttachments: true,
    attachments: ['WMF_Holiday_Schedule_2026_v2.pdf'],
    isRead: true,
    status: 'actioned',
  },
  {
    id: 'em-007',
    from: 'Tony Marchetti',
    fromEmail: 'tmarchetti@crestwoodbuilders.com',
    subject: 'RE: RE: PO #CW-2026-0045 Shipment Confirmation',
    body: `Got it, thanks for the tracking info. We'll have our crew ready to unload Wednesday morning.

One more thing - can you send the batch cure reports and film thickness readings for this order? Our GC is requiring AAMA 2604 compliance documentation for the building envelope submittal.

Tony Marchetti
Crestwood Builders Group`,
    receivedAt: '2026-02-08T11:15:00Z',
    threadId: 'th-007',
    classification: 'order_status',
    classificationConfidence: 0.82,
    hasAttachments: false,
    isRead: false,
    status: 'new',
  },
  {
    id: 'em-008',
    from: 'Sales Department',
    fromEmail: 'offers@industrialcoatingsupply.net',
    subject: 'HUGE SAVINGS on Tiger Drylac Powder - End of Year Blowout!!',
    body: `Don't miss our end-of-season clearance on Tiger Drylac powder coatings!

Up to 40% off select colors and formulations. Limited stock available.

Click here to view our current inventory and pricing.

Unsubscribe | Privacy Policy`,
    receivedAt: '2026-02-08T06:00:00Z',
    threadId: 'th-008',
    classification: 'spam',
    classificationConfidence: 0.99,
    hasAttachments: false,
    isRead: false,
    status: 'actioned',
  },
  {
    id: 'em-009',
    from: 'Sarah Nakamura',
    fromEmail: 'snakamura@meridianfab.com',
    subject: 'PO #MF-3351 - Rush Order Aluminum Sunshades',
    body: `Hi Windsor,

We have a rush situation. Attached is PO #MF-3351 for 48 aluminum sunshade blades, 6063-T6 airfoil profile, 8 ft lengths.

Finish: AAMA 2605, 70% PVDF, Sherwin-Williams Fluropon Bone White.

These need to ship by Feb 18 absolute latest. Client is threatening liquidated damages on the Oceanview Towers project if we miss the install window.

Can you confirm acceptance and turn time? Happy to pay rush surcharge.

Sarah Nakamura
Project Manager
Meridian Fabrication LLC
(408) 555-0519`,
    receivedAt: '2026-02-08T11:45:00Z',
    threadId: 'th-009',
    classification: 'rfq',
    classificationConfidence: 0.88,
    hasAttachments: true,
    attachments: ['PO_MF-3351.pdf', 'Sunshade_Blade_Profile.dwg'],
    isRead: false,
    status: 'new',
  },
  {
    id: 'em-010',
    from: 'Greg Patel',
    fromEmail: 'gpatel@summitglassmetal.com',
    subject: 'Powder Coat Adhesion Issue - WO #WMF-26-0878',
    body: `We have a problem. The last shipment from WO #WMF-26-0878 (our PO #SG-24-1180) - the Dark Bronze powder on the steel mullions is flaking at the mitered joints.

We've pulled 12 pieces off the wall so far and our field crew found adhesion failures on about 30% of the mitered ends. Looks like the pretreatment didn't get into the joint properly.

Can we set up a call today to discuss? We need a plan for rework and replacement ASAP. The GC is all over us on this.

Greg Patel
Quality Manager
Summit Glass & Metal
(925) 555-0291`,
    receivedAt: '2026-02-08T12:10:00Z',
    threadId: 'th-010',
    classification: 'change_request',
    classificationConfidence: 0.78,
    hasAttachments: true,
    attachments: ['Adhesion_Failure_Photos.zip'],
    isRead: false,
    status: 'new',
  },
];

// ---------------------------------------------------------------------------
// RFQs (extracted from emails)
// ---------------------------------------------------------------------------
export const rfqs: RFQ[] = [
  {
    id: 'rfq-001',
    emailId: 'em-001',
    customerName: {
      value: 'Apex Architectural Systems',
      confidence: 0.99,
      source: 'Apex Architectural Systems - email signature',
    },
    customerContact: {
      value: 'David Chen',
      confidence: 0.99,
      source: 'David Chen, Senior Project Manager',
    },
    shipTo: {
      value: '1847 Industrial Pkwy, Hayward CA 94545',
      confidence: 0.97,
      source: 'Ship to our fabrication shop at 1847 Industrial Pkwy, Hayward CA 94545',
    },
    lineItems: [
      {
        partDescription: {
          value: '6063-T6 Aluminum Rectangular Tube, 4" x 2", 0.125" wall, 24 ft',
          confidence: 0.96,
          source: '6063-T6 aluminum extrusion profiles, 4" x 2" rectangular tube, 0.125" wall, 24 ft lengths',
        },
        quantity: {
          value: '450 pcs',
          confidence: 0.99,
          source: 'Qty 450 pcs',
        },
        finishSystem: {
          value: 'AAMA 2605, 70% PVDF Kynar 500',
          confidence: 0.98,
          source: 'AAMA 2605, 70% PVDF Kynar 500',
        },
        color: {
          value: 'Champagne Metallic (Valspar ES-36042)',
          confidence: 0.95,
          source: 'Champagne Metallic (custom match to Valspar ES-36042)',
        },
        dimensions: {
          value: '4" x 2" x 0.125" wall x 24 ft',
          confidence: 0.97,
          source: '4" x 2" rectangular tube, 0.125" wall, 24 ft lengths',
        },
        maskingNotes: {
          value: 'Mask all interior surfaces',
          confidence: 0.96,
          source: 'Mask all interior surfaces',
        },
      },
      {
        partDescription: {
          value: 'Aluminum Flat Bar 4" x 1/4", 12 ft',
          confidence: 0.95,
          source: 'Aluminum flat bar 4" x 1/4", 12 ft lengths',
        },
        quantity: {
          value: '200 pcs',
          confidence: 0.99,
          source: 'Qty 200 pcs',
        },
        finishSystem: {
          value: 'AAMA 2605, 70% PVDF Kynar 500',
          confidence: 0.92,
          source: 'Same finish spec as above',
        },
        color: {
          value: 'Champagne Metallic (Valspar ES-36042)',
          confidence: 0.90,
          source: 'Same finish spec as above',
        },
        dimensions: {
          value: '4" x 1/4" x 12 ft',
          confidence: 0.97,
          source: '4" x 1/4", 12 ft lengths',
        },
        maskingNotes: {
          value: 'Mask all interior surfaces',
          confidence: 0.78,
          source: 'Mask all interior surfaces (implied same as line 1)',
        },
      },
    ],
    leadTime: {
      value: '3 weeks requested',
      confidence: 0.95,
      source: 'hoping for 3 week lead time on coating',
    },
    specialNotes: 'Customer notes tight project timeline. Custom color match required - may need to order Valspar ES-36042 if not in stock.',
    missingFields: [],
    status: 'draft_ready',
    draftQuoteUrl: '/quotes/draft/rfq-001',
    createdAt: '2026-02-08T08:15:00Z',
  },
  {
    id: 'rfq-002',
    emailId: 'em-003',
    customerName: {
      value: 'Pacific Curtainwall Inc.',
      confidence: 0.99,
      source: 'Pacific Curtainwall Inc. - email signature',
    },
    customerContact: {
      value: 'James Whitfield',
      confidence: 0.99,
      source: 'James Whitfield, Estimating Department',
    },
    shipTo: {
      value: '',
      confidence: 0.0,
      source: 'No shipping address provided in email',
    },
    lineItems: [
      {
        partDescription: {
          value: '5052-H32 Aluminum Flat Sheet, 48" x 96"',
          confidence: 0.97,
          source: '0.125" 5052-H32 aluminum flat sheets, 48" x 96"',
        },
        quantity: {
          value: '180 sheets',
          confidence: 0.99,
          source: 'Qty 180 sheets',
        },
        finishSystem: {
          value: 'AAMA 2604 Fluoropolymer',
          confidence: 0.98,
          source: 'AAMA 2604 fluoropolymer',
        },
        color: {
          value: 'RAL 9016 Traffic White',
          confidence: 0.99,
          source: 'RAL 9016 Traffic White',
        },
        dimensions: {
          value: '0.125" x 48" x 96"',
          confidence: 0.98,
          source: '0.125" 5052-H32 aluminum flat sheets, 48" x 96"',
        },
        maskingNotes: {
          value: 'Edge mask 1/2" all four sides for welding tabs',
          confidence: 0.97,
          source: 'edge masking 1/2" on all four sides for welding tabs',
        },
      },
      {
        partDescription: {
          value: '5052-H32 Aluminum Flat Sheet, 48" x 96"',
          confidence: 0.97,
          source: '0.125" 5052-H32 aluminum flat sheets, 48" x 96"',
        },
        quantity: {
          value: '85 sheets',
          confidence: 0.99,
          source: 'Qty 85 sheets',
        },
        finishSystem: {
          value: 'AAMA 2604 Fluoropolymer',
          confidence: 0.98,
          source: 'AAMA 2604 fluoropolymer',
        },
        color: {
          value: 'RAL 7021 Black Grey',
          confidence: 0.99,
          source: 'RAL 7021 Black Grey',
        },
        dimensions: {
          value: '0.125" x 48" x 96"',
          confidence: 0.98,
          source: '0.125" 5052-H32 aluminum flat sheets, 48" x 96"',
        },
        maskingNotes: {
          value: 'Edge mask 1/2" all four sides for welding tabs',
          confidence: 0.92,
          source: 'All panels need edge masking (implied same spec)',
        },
      },
      {
        partDescription: {
          value: '5052-H32 Aluminum Flat Sheet, 36" x 72"',
          confidence: 0.97,
          source: '0.125" 5052-H32 aluminum flat sheets, 36" x 72"',
        },
        quantity: {
          value: '60 sheets',
          confidence: 0.99,
          source: 'Qty 60 sheets',
        },
        finishSystem: {
          value: 'AAMA 2604 Fluoropolymer',
          confidence: 0.98,
          source: 'AAMA 2604 fluoropolymer',
        },
        color: {
          value: 'RAL 9016 Traffic White',
          confidence: 0.99,
          source: 'RAL 9016 Traffic White',
        },
        dimensions: {
          value: '0.125" x 36" x 72"',
          confidence: 0.98,
          source: '0.125" 5052-H32 aluminum flat sheets, 36" x 72"',
        },
        maskingNotes: {
          value: 'Edge mask 1/2" all four sides for welding tabs',
          confidence: 0.92,
          source: 'All panels need edge masking (implied same spec)',
        },
      },
    ],
    leadTime: {
      value: 'Standard and expedited options requested',
      confidence: 0.85,
      source: 'Please include pricing for both standard and expedited lead times',
    },
    specialNotes: 'Customer requesting dual pricing for standard vs. expedited. Embarcadero Place project.',
    missingFields: ['shipTo'],
    status: 'needs_info',
    createdAt: '2026-02-08T09:25:00Z',
  },
  {
    id: 'rfq-003',
    emailId: 'em-005',
    customerName: {
      value: 'Apex Architectural Systems',
      confidence: 0.99,
      source: 'Apex Architectural Systems - email signature',
    },
    customerContact: {
      value: 'Lisa Tran',
      confidence: 0.99,
      source: 'Lisa Tran, Project Coordinator',
    },
    shipTo: {
      value: '1847 Industrial Pkwy, Hayward CA 94545',
      confidence: 0.82,
      source: 'Deliver to same Hayward address as our other orders (inferred from em-001)',
    },
    lineItems: [
      {
        partDescription: {
          value: 'Custom Aluminum L-Brackets, 6061-T6, 3" x 3" x 1/4", 4" length',
          confidence: 0.96,
          source: 'Custom aluminum L-brackets, 6061-T6, 3" x 3" x 1/4", 4" length',
        },
        quantity: {
          value: '600 pcs',
          confidence: 0.99,
          source: 'Qty 600 pcs',
        },
        finishSystem: {
          value: 'TGIC Polyester Powder Coat',
          confidence: 0.97,
          source: 'Powder coat TGIC polyester',
        },
        color: {
          value: 'RAL 9005 Jet Black, Matte',
          confidence: 0.99,
          source: 'RAL 9005 Jet Black, matte finish',
        },
        dimensions: {
          value: '3" x 3" x 1/4" x 4" L',
          confidence: 0.96,
          source: '3" x 3" x 1/4", 4" length',
        },
        maskingNotes: {
          value: 'None specified',
          confidence: 0.80,
          source: 'No masking requirements mentioned',
        },
      },
      {
        partDescription: {
          value: 'Stainless Steel Z-Clips, 16 ga, 2" x 3"',
          confidence: 0.94,
          source: 'Stainless steel z-clips, 16 ga, 2" x 3"',
        },
        quantity: {
          value: '1,200 pcs',
          confidence: 0.99,
          source: 'Qty 1,200 pcs',
        },
        finishSystem: {
          value: 'Unknown - Customer unsure if WMF coats stainless',
          confidence: 0.60,
          source: 'do you coat stainless? if not just quote the aluminum brackets',
        },
        color: {
          value: 'Not specified',
          confidence: 0.40,
          source: 'No color specified for stainless clips',
        },
        dimensions: {
          value: '16 ga x 2" x 3"',
          confidence: 0.94,
          source: '16 ga, 2" x 3"',
        },
        maskingNotes: {
          value: 'None specified',
          confidence: 0.80,
          source: 'No masking requirements mentioned',
        },
      },
      {
        partDescription: {
          value: 'Aluminum Shim Plates, 1/8" x 2" x 4"',
          confidence: 0.97,
          source: 'Aluminum shim plates, 1/8" x 2" x 4"',
        },
        quantity: {
          value: '300 pcs',
          confidence: 0.99,
          source: 'Qty 300 pcs',
        },
        finishSystem: {
          value: 'TGIC Polyester Powder Coat',
          confidence: 0.85,
          source: 'Same RAL 9005 (implied same powder system as line 1)',
        },
        color: {
          value: 'RAL 9005 Jet Black',
          confidence: 0.97,
          source: 'Same RAL 9005 Jet Black',
        },
        dimensions: {
          value: '1/8" x 2" x 4"',
          confidence: 0.98,
          source: '1/8" x 2" x 4"',
        },
        maskingNotes: {
          value: 'None specified',
          confidence: 0.80,
          source: 'No masking requirements mentioned',
        },
      },
    ],
    leadTime: {
      value: 'Not specified',
      confidence: 0.0,
      source: 'No lead time mentioned in email',
    },
    specialNotes: 'Line item 2 (stainless z-clips) needs clarification - customer is unsure if WMF coats stainless steel. May need to quote with/without. Related to 200 Collins project (same as rfq-001).',
    missingFields: ['leadTime', 'Line 2 finish spec', 'Line 2 color', 'Stainless capability confirmation'],
    status: 'needs_info',
    createdAt: '2026-02-08T10:35:00Z',
  },
  {
    id: 'rfq-004',
    emailId: 'em-009',
    customerName: {
      value: 'Meridian Fabrication LLC',
      confidence: 0.99,
      source: 'Meridian Fabrication LLC - email signature',
    },
    customerContact: {
      value: 'Sarah Nakamura',
      confidence: 0.99,
      source: 'Sarah Nakamura, Project Manager',
    },
    shipTo: {
      value: '',
      confidence: 0.0,
      source: 'No shipping address provided',
    },
    lineItems: [
      {
        partDescription: {
          value: '6063-T6 Aluminum Sunshade Blades, Airfoil Profile, 8 ft',
          confidence: 0.95,
          source: '48 aluminum sunshade blades, 6063-T6 airfoil profile, 8 ft lengths',
        },
        quantity: {
          value: '48 pcs',
          confidence: 0.99,
          source: '48 aluminum sunshade blades',
        },
        finishSystem: {
          value: 'AAMA 2605, 70% PVDF',
          confidence: 0.97,
          source: 'AAMA 2605, 70% PVDF',
        },
        color: {
          value: 'Sherwin-Williams Fluropon Bone White',
          confidence: 0.96,
          source: 'Sherwin-Williams Fluropon Bone White',
        },
        dimensions: {
          value: 'Airfoil profile x 8 ft (see attached DWG)',
          confidence: 0.80,
          source: 'airfoil profile, 8 ft lengths - cross section dims in attachment',
        },
        maskingNotes: {
          value: 'None specified',
          confidence: 0.75,
          source: 'No masking notes in email - check PO attachment',
        },
      },
    ],
    leadTime: {
      value: 'Rush - must ship by Feb 18',
      confidence: 0.98,
      source: 'need to ship by Feb 18 absolute latest',
    },
    specialNotes: 'RUSH ORDER. Customer willing to pay rush surcharge. Oceanview Towers project - liquidated damages risk for customer. Only 10 calendar days to coat and ship.',
    missingFields: ['shipTo', 'Exact airfoil cross-section dimensions'],
    status: 'extracted',
    createdAt: '2026-02-08T11:50:00Z',
  },
];

// ---------------------------------------------------------------------------
// Order Statuses
// ---------------------------------------------------------------------------
export const orderStatuses: OrderStatus[] = [
  // Summit Glass & Metal orders
  {
    id: 'os-001',
    customer: 'Summit Glass & Metal',
    poNumber: 'SG-24-1187',
    woNumber: 'WMF-26-0885',
    partDescription: 'Steel Storefront Tube, 2" x 4" x 14 ga',
    quantity: 340,
    currentStatus: 'QC',
    promiseDate: '2026-02-06',
    notes: 'Dark Bronze powder coat. Cure batch #2604. Film thickness testing in progress. 2 days behind schedule - QC hold for adhesion spot check.',
  },
  {
    id: 'os-002',
    customer: 'Summit Glass & Metal',
    poNumber: 'SG-24-1192',
    woNumber: 'WMF-26-0901',
    partDescription: 'Aluminum Panel, 5052-H32, 0.090"',
    quantity: 220,
    currentStatus: 'Coating',
    promiseDate: '2026-02-12',
    notes: 'Tiger Drylac RAL 7016 Anthracite Grey. Batch 1 of 2 on line now.',
  },
  {
    id: 'os-003',
    customer: 'Summit Glass & Metal',
    poNumber: 'SG-24-1180',
    woNumber: 'WMF-26-0878',
    partDescription: 'Steel Mullion Profiles, mitered assemblies',
    quantity: 180,
    currentStatus: 'Shipped',
    shipDate: '2026-02-03',
    promiseDate: '2026-02-04',
    notes: 'Dark Bronze powder coat. Shipped via Estes Express, PRO# 1234567890. Customer reported adhesion issues at miter joints.',
  },
  // Apex Architectural Systems orders
  {
    id: 'os-004',
    customer: 'Apex Architectural Systems',
    poNumber: 'APEX-26-0220',
    woNumber: 'WMF-26-0910',
    partDescription: '6063-T6 Aluminum Mullion, 4.5" x 2"',
    quantity: 280,
    currentStatus: 'In Production',
    promiseDate: '2026-02-14',
    notes: 'AAMA 2605 Kynar, Champagne Metallic. Pretreatment complete, awaiting prime coat.',
  },
  {
    id: 'os-005',
    customer: 'Apex Architectural Systems',
    poNumber: 'APEX-26-0218',
    woNumber: 'WMF-26-0905',
    partDescription: 'Aluminum Coping Cap, 0.063" x 12" x 120"',
    quantity: 95,
    currentStatus: 'Ready to Ship',
    promiseDate: '2026-02-07',
    notes: 'AAMA 2604, RAL 7035 Light Grey. Passed QC. Awaiting pickup scheduling.',
  },
  {
    id: 'os-006',
    customer: 'Apex Architectural Systems',
    poNumber: 'APEX-26-0215',
    woNumber: 'WMF-26-0898',
    partDescription: 'Aluminum Fascia Panel, 0.125" x 24" x 96"',
    quantity: 60,
    currentStatus: 'Shipped',
    shipDate: '2026-02-05',
    promiseDate: '2026-02-05',
    notes: 'AAMA 2605, Champagne Metallic. Shipped FedEx Freight, BOL #WMF-020526-01.',
  },
  // Meridian Fabrication orders
  {
    id: 'os-007',
    customer: 'Meridian Fabrication LLC',
    poNumber: 'MF-3345',
    woNumber: 'WMF-26-0892',
    partDescription: 'Steel Handrail Tube, 1.5" round, 16 ga',
    quantity: 120,
    currentStatus: 'Received',
    promiseDate: '2026-02-14',
    notes: 'Original spec RAL 6005 Moss Green. CHANGE REQUEST PENDING - customer wants RAL 6012 Black Green. Parts in staging, not yet prepped.',
  },
  {
    id: 'os-008',
    customer: 'Meridian Fabrication LLC',
    poNumber: 'MF-3340',
    woNumber: 'WMF-26-0888',
    partDescription: 'Steel Stair Stringer, 3/8" plate, fabricated',
    quantity: 8,
    currentStatus: 'Curing',
    promiseDate: '2026-02-10',
    notes: 'RAL 9005 Jet Black, semi-gloss. In oven batch #2608. ETA out of oven 3:30 PM today.',
  },
  {
    id: 'os-009',
    customer: 'Meridian Fabrication LLC',
    poNumber: 'MF-3338',
    woNumber: 'WMF-26-0882',
    partDescription: 'Aluminum Window Sill, 0.080" x 6" x 48"',
    quantity: 150,
    currentStatus: 'Packaging',
    promiseDate: '2026-02-08',
    notes: 'AAMA 2604, RAL 8019 Grey Brown. QC passed. Interleaving with foam for shipping.',
  },
  // Crestwood Builders orders
  {
    id: 'os-010',
    customer: 'Crestwood Builders Group',
    poNumber: 'CW-2026-0045',
    woNumber: 'WMF-26-0876',
    partDescription: 'Aluminum Storefront Framing, various profiles',
    quantity: 425,
    currentStatus: 'Shipped',
    shipDate: '2026-02-07',
    promiseDate: '2026-02-07',
    notes: 'AAMA 2604, Dark Bronze Anodize Match. Shipped ABF Freight, PRO# 9876543210. Customer requesting compliance docs.',
  },
  {
    id: 'os-011',
    customer: 'Crestwood Builders Group',
    poNumber: 'CW-2026-0048',
    woNumber: 'WMF-26-0912',
    partDescription: 'Steel Canopy Frame, HSS 4x4x1/4',
    quantity: 16,
    currentStatus: 'In Production',
    promiseDate: '2026-02-18',
    notes: 'RAL 7016 Anthracite Grey, TGIC polyester. Blast cleaning in progress.',
  },
  {
    id: 'os-012',
    customer: 'Crestwood Builders Group',
    poNumber: 'CW-2026-0050',
    woNumber: 'WMF-26-0918',
    partDescription: 'Aluminum Sunscreen Louvers, 6063-T6 airfoil',
    quantity: 64,
    currentStatus: 'Received',
    promiseDate: '2026-02-21',
    notes: 'AAMA 2605 Kynar, RAL 9010 Pure White. Parts received, pending incoming inspection.',
  },
  // Pacific Curtainwall orders
  {
    id: 'os-013',
    customer: 'Pacific Curtainwall Inc.',
    poNumber: 'PC-2026-0112',
    woNumber: 'WMF-26-0895',
    partDescription: 'Aluminum Spandrel Panel, 0.125" x 60" x 120"',
    quantity: 88,
    currentStatus: 'Coating',
    promiseDate: '2026-02-11',
    notes: 'AAMA 2605 Kynar, custom Champagne Pearl. Second coat application in progress.',
  },
  {
    id: 'os-014',
    customer: 'Pacific Curtainwall Inc.',
    poNumber: 'PC-2026-0108',
    woNumber: 'WMF-26-0880',
    partDescription: 'Aluminum Curtainwall Pressure Plate, extruded',
    quantity: 310,
    currentStatus: 'Shipped',
    shipDate: '2026-02-04',
    promiseDate: '2026-02-05',
    notes: 'AAMA 2604, RAL 9016 Traffic White. Shipped early. Yellow Freight, PRO# 5551234567.',
  },
  {
    id: 'os-015',
    customer: 'Pacific Curtainwall Inc.',
    poNumber: 'PC-2026-0115',
    woNumber: 'WMF-26-0920',
    partDescription: 'Aluminum Column Cover, 0.090" formed panels',
    quantity: 24,
    currentStatus: 'In Production',
    promiseDate: '2026-02-19',
    notes: 'AAMA 2605, Sherwin-Williams Fluropon Classic Bronze. Chrome pretreatment required per spec.',
  },
  // Additional mixed orders
  {
    id: 'os-016',
    customer: 'Summit Glass & Metal',
    poNumber: 'SG-24-1195',
    woNumber: 'WMF-26-0922',
    partDescription: 'Steel Angle, 3" x 3" x 1/4", various lengths',
    quantity: 200,
    currentStatus: 'Received',
    promiseDate: '2026-02-20',
    notes: 'RAL 9005 Jet Black, matte. Just received, awaiting production scheduling.',
  },
  {
    id: 'os-017',
    customer: 'Meridian Fabrication LLC',
    poNumber: 'MF-3348',
    woNumber: 'WMF-26-0915',
    partDescription: 'Aluminum Railing Post, 2" x 2" x 0.125" tube, 42"',
    quantity: 75,
    currentStatus: 'QC',
    promiseDate: '2026-02-10',
    notes: 'TGIC polyester, RAL 9005 Jet Black, satin. Film thickness measuring in progress.',
  },
  {
    id: 'os-018',
    customer: 'Apex Architectural Systems',
    poNumber: 'APEX-26-0222',
    woNumber: 'WMF-26-0919',
    partDescription: 'Aluminum Gutter, custom profile, 10 ft',
    quantity: 40,
    currentStatus: 'Curing',
    promiseDate: '2026-02-09',
    notes: 'AAMA 2604, RAL 7035 Light Grey. In oven, batch #2609. Due out 4:45 PM.',
  },
];

// ---------------------------------------------------------------------------
// Status Email Drafts
// ---------------------------------------------------------------------------
export const statusEmailDrafts: StatusEmailDraft[] = [
  {
    id: 'sed-001',
    customer: 'Summit Glass & Metal',
    customerEmail: 'msantos@summitglassmetal.com',
    orders: [orderStatuses[0], orderStatuses[1], orderStatuses[15]],
    emailSubject: 'Windsor Metal Finishing - Order Status Update: PO #SG-24-1187, SG-24-1192, SG-24-1195',
    emailBody: `Dear Maria,

Thank you for reaching out. Here is the current status on your open orders:

PO #SG-24-1187 (WO #WMF-26-0885) - Steel Storefront Tube, Dark Bronze
Status: Quality Control
We apologize for the delay on this order. The coating is complete and parts are currently in QC for final adhesion and film thickness testing. We expect QC to be completed by end of day tomorrow (Feb 9) with shipment on Feb 10. We will send tracking information as soon as the shipment is dispatched.

PO #SG-24-1192 (WO #WMF-26-0901) - Aluminum Panel, RAL 7016 Anthracite Grey
Status: Coating In Progress
The first batch is currently on the coating line. We are on track for the Feb 12 promise date. We will notify you when coating is complete and parts move to QC.

PO #SG-24-1195 (WO #WMF-26-0922) - Steel Angle, RAL 9005 Jet Black
Status: Received
Parts have been received and are queued for production scheduling. Promise date remains Feb 20.

Please let me know if you have any questions or need additional information.

Best regards,
Windsor Metal Finishing
Customer Service`,
    status: 'draft',
    createdAt: '2026-02-08T09:00:00Z',
    flaggedIssues: [
      'PO #SG-24-1187 is 2 days past promise date - delay explanation included',
      'Customer also asked about PO #SG-24-1192 which is on track',
    ],
  },
  {
    id: 'sed-002',
    customer: 'Crestwood Builders Group',
    customerEmail: 'tmarchetti@crestwoodbuilders.com',
    orders: [orderStatuses[9]],
    emailSubject: 'RE: RE: PO #CW-2026-0045 Shipment Confirmation',
    emailBody: `Hi Tony,

Thank you for confirming. Your crew should expect the delivery Wednesday morning via ABF Freight (PRO# 9876543210).

Regarding the compliance documentation for PO #CW-2026-0045:
- AAMA 2604 batch cure reports
- Film thickness measurement readings
- Cross-hatch adhesion test results

I am preparing these documents now and will send them over as a separate email within the next 2 hours.

Please let me know if the GC requires any additional documentation for the building envelope submittal.

Best regards,
Windsor Metal Finishing
Customer Service`,
    status: 'draft',
    createdAt: '2026-02-08T11:20:00Z',
    flaggedIssues: [
      'Customer requesting AAMA 2604 compliance documentation - QC team needs to provide batch reports',
    ],
  },
  {
    id: 'sed-003',
    customer: 'Meridian Fabrication LLC',
    customerEmail: 'rkim@meridianfab.com',
    orders: [orderStatuses[6], orderStatuses[7], orderStatuses[8], orderStatuses[16]],
    emailSubject: 'Windsor Metal Finishing - Order Status & Change Request Confirmation: PO #MF-3345',
    emailBody: `Hi Robert,

Thank you for notifying us of the color change on PO #MF-3345 (WO #WMF-26-0892).

Good news: the handrail tube components have not entered pretreatment yet, so we can accommodate the change from RAL 6005 Moss Green to RAL 6012 Black Green with no impact to timeline or pricing. The promise date remains Feb 14.

Here is a summary of your other open orders:

PO #MF-3340 (WO #WMF-26-0888) - Steel Stair Stringers, RAL 9005 Jet Black
Status: Curing - currently in oven, expected out at 3:30 PM today. On track for Feb 10 promise date.

PO #MF-3338 (WO #WMF-26-0882) - Aluminum Window Sills, RAL 8019 Grey Brown
Status: Packaging - QC passed, being packaged for shipment today. On track for Feb 8 promise date.

PO #MF-3348 (WO #WMF-26-0915) - Aluminum Railing Posts, RAL 9005 Jet Black
Status: Quality Control - film thickness measurements in progress. On track for Feb 10 promise date.

Please confirm the color change and I will update the work order.

Best regards,
Windsor Metal Finishing
Customer Service`,
    status: 'draft',
    createdAt: '2026-02-08T10:15:00Z',
    flaggedIssues: [
      'Color change on WO #WMF-26-0892 requires confirmation before updating work order',
      'PO #MF-3338 shipping today - need to confirm carrier',
    ],
  },
  {
    id: 'sed-004',
    customer: 'Pacific Curtainwall Inc.',
    customerEmail: 'jwhitfield@pacificcurtainwall.com',
    orders: [orderStatuses[12], orderStatuses[14]],
    emailSubject: 'Windsor Metal Finishing - Weekly Status Update: Pacific Curtainwall Open Orders',
    emailBody: `Hi James,

Here is your weekly status update on open orders:

PO #PC-2026-0112 (WO #WMF-26-0895) - Aluminum Spandrel Panels, Champagne Pearl
Status: Coating - second coat application currently in progress. On track for Feb 11 promise date.

PO #PC-2026-0115 (WO #WMF-26-0920) - Aluminum Column Covers, Classic Bronze
Status: In Production - chrome pretreatment underway per specification requirements. On track for Feb 19 promise date.

We also received your new RFQ for the Embarcadero Place panel system. Our estimating team is reviewing and will have pricing to you shortly. Note: we will need a shipping address to complete the quote.

Best regards,
Windsor Metal Finishing
Customer Service`,
    status: 'draft',
    createdAt: '2026-02-08T09:30:00Z',
    flaggedIssues: [
      'New RFQ from same customer (rfq-002) missing shipping address - mentioned in email',
    ],
  },
];

// ---------------------------------------------------------------------------
// Activity Log
// ---------------------------------------------------------------------------
export const activityLog: ActivityLog[] = [
  {
    id: 'al-001',
    timestamp: '2026-02-08T06:00:00Z',
    action: 'Email classified as spam',
    actor: 'ai_agent',
    details: 'Promotional email from industrialcoatingsupply.net classified as spam with 99% confidence. Auto-archived.',
    relatedId: 'em-008',
    relatedType: 'email',
  },
  {
    id: 'al-002',
    timestamp: '2026-02-08T07:30:00Z',
    action: 'Email classified as administrative',
    actor: 'ai_agent',
    details: 'Internal holiday schedule update from HR. Classified as administrative with 99% confidence.',
    relatedId: 'em-006',
    relatedType: 'email',
  },
  {
    id: 'al-003',
    timestamp: '2026-02-08T08:12:00Z',
    action: 'Email classified as RFQ',
    actor: 'ai_agent',
    details: 'RFQ from Apex Architectural Systems for curtainwall extrusions. AAMA 2605 Kynar spec. Classified with 98% confidence.',
    relatedId: 'em-001',
    relatedType: 'email',
  },
  {
    id: 'al-004',
    timestamp: '2026-02-08T08:15:00Z',
    action: 'RFQ data extracted',
    actor: 'ai_agent',
    details: 'Extracted 2 line items, customer info, ship-to address, and lead time from Apex Architectural RFQ. All fields high confidence. Draft quote generated.',
    relatedId: 'rfq-001',
    relatedType: 'rfq',
  },
  {
    id: 'al-005',
    timestamp: '2026-02-08T08:45:00Z',
    action: 'Email classified as order status inquiry',
    actor: 'ai_agent',
    details: 'Summit Glass & Metal requesting updates on PO #SG-24-1187 and SG-24-1192. Classified with 96% confidence.',
    relatedId: 'em-002',
    relatedType: 'email',
  },
  {
    id: 'al-006',
    timestamp: '2026-02-08T09:00:00Z',
    action: 'Status update email drafted',
    actor: 'ai_agent',
    details: 'Generated status update email for Summit Glass & Metal covering 3 open POs. Flagged: PO #SG-24-1187 is 2 days past promise date.',
    relatedId: 'sed-001',
    relatedType: 'order_status',
  },
  {
    id: 'al-007',
    timestamp: '2026-02-08T09:20:00Z',
    action: 'Email classified as RFQ',
    actor: 'ai_agent',
    details: 'RFQ from Pacific Curtainwall for Embarcadero Place panel system. AAMA 2604 spec, multiple colors. Classified with 97% confidence.',
    relatedId: 'em-003',
    relatedType: 'email',
  },
  {
    id: 'al-008',
    timestamp: '2026-02-08T09:25:00Z',
    action: 'RFQ data extracted - missing fields detected',
    actor: 'ai_agent',
    details: 'Extracted 3 line items from Pacific Curtainwall RFQ. Missing: shipping address. Status set to needs_info.',
    relatedId: 'rfq-002',
    relatedType: 'rfq',
  },
  {
    id: 'al-009',
    timestamp: '2026-02-08T09:30:00Z',
    action: 'Status update email drafted',
    actor: 'ai_agent',
    details: 'Generated weekly status update for Pacific Curtainwall covering 2 open orders. Mentioned missing ship-to on new RFQ.',
    relatedId: 'sed-004',
    relatedType: 'order_status',
  },
  {
    id: 'al-010',
    timestamp: '2026-02-08T10:05:00Z',
    action: 'Email classified as change request',
    actor: 'ai_agent',
    details: 'Meridian Fabrication requesting color change on WO #WMF-26-0892 from RAL 6005 to RAL 6012. Classified with 94% confidence.',
    relatedId: 'em-004',
    relatedType: 'email',
  },
  {
    id: 'al-011',
    timestamp: '2026-02-08T10:10:00Z',
    action: 'Order status cross-referenced',
    actor: 'ai_agent',
    details: 'Verified WO #WMF-26-0892 status is "Received" - parts not yet in pretreatment. Color change can be accommodated without timeline impact.',
    relatedId: 'os-007',
    relatedType: 'order_status',
  },
  {
    id: 'al-012',
    timestamp: '2026-02-08T10:15:00Z',
    action: 'Status update email drafted',
    actor: 'ai_agent',
    details: 'Generated response to Meridian Fabrication confirming color change feasibility. Included status on all 4 open orders.',
    relatedId: 'sed-003',
    relatedType: 'order_status',
  },
  {
    id: 'al-013',
    timestamp: '2026-02-08T10:30:00Z',
    action: 'Email classified as RFQ',
    actor: 'ai_agent',
    details: 'RFQ from Apex Architectural (Lisa Tran) for brackets, clips, and shims. Powder coat spec. Classified with 95% confidence.',
    relatedId: 'em-005',
    relatedType: 'email',
  },
  {
    id: 'al-014',
    timestamp: '2026-02-08T10:35:00Z',
    action: 'RFQ data extracted - multiple issues flagged',
    actor: 'ai_agent',
    details: 'Extracted 3 line items. Issues: stainless steel coating capability unclear (line 2), no lead time specified, ship-to inferred from prior order. Status set to needs_info.',
    relatedId: 'rfq-003',
    relatedType: 'rfq',
  },
  {
    id: 'al-015',
    timestamp: '2026-02-08T11:15:00Z',
    action: 'Email classified as order status inquiry',
    actor: 'ai_agent',
    details: 'Crestwood Builders requesting AAMA 2604 compliance documentation for PO #CW-2026-0045. Classification confidence 82% - could also be admin request.',
    relatedId: 'em-007',
    relatedType: 'email',
  },
  {
    id: 'al-016',
    timestamp: '2026-02-08T11:20:00Z',
    action: 'Status update email drafted',
    actor: 'ai_agent',
    details: 'Generated response to Crestwood Builders confirming delivery and promising compliance docs within 2 hours. Flagged: QC team action needed.',
    relatedId: 'sed-002',
    relatedType: 'order_status',
  },
  {
    id: 'al-017',
    timestamp: '2026-02-08T11:45:00Z',
    action: 'Email classified as RFQ',
    actor: 'ai_agent',
    details: 'Rush order RFQ from Meridian Fabrication for aluminum sunshade blades. AAMA 2605 Fluropon. Classification confidence 88% - has PO attached, could be direct order.',
    relatedId: 'em-009',
    relatedType: 'email',
  },
  {
    id: 'al-018',
    timestamp: '2026-02-08T11:50:00Z',
    action: 'RFQ data extracted - rush order flagged',
    actor: 'ai_agent',
    details: 'Extracted 1 line item from Meridian rush order. CRITICAL: Feb 18 ship deadline, only 10 calendar days. Missing ship-to address and exact profile dimensions.',
    relatedId: 'rfq-004',
    relatedType: 'rfq',
  },
  {
    id: 'al-019',
    timestamp: '2026-02-08T12:10:00Z',
    action: 'Email classified as change request',
    actor: 'ai_agent',
    details: 'Summit Glass & Metal reporting adhesion failure on shipped order WO #WMF-26-0878. Quality issue - not a typical change request. Confidence 78%.',
    relatedId: 'em-010',
    relatedType: 'email',
  },
  {
    id: 'al-020',
    timestamp: '2026-02-08T12:12:00Z',
    action: 'Quality issue flagged for human review',
    actor: 'ai_agent',
    details: 'URGENT: Adhesion failure reported on WMF-26-0878 (Dark Bronze on steel mullions at miter joints). ~30% failure rate per customer. Escalated to QC manager for immediate review.',
    relatedId: 'os-003',
    relatedType: 'order_status',
  },
];

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------
export const dashboardStats: DashboardStats = {
  emailsProcessedToday: 10,
  pendingReviews: 6,
  quotesDraftedThisWeek: 7,
  statusUpdatesSentThisWeek: 12,
  avgClassificationConfidence: 0.93,
  rfqsThisMonth: 14,
};

// Alias for pages that use the plural form
export const activityLogs = activityLog;
