// Email types
export type EmailClassification = 'rfq' | 'order_status' | 'change_request' | 'administrative' | 'spam';

export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  body: string;
  receivedAt: string;
  threadId: string;
  classification: EmailClassification;
  classificationConfidence: number;
  hasAttachments: boolean;
  attachments?: string[];
  isRead: boolean;
  status: 'new' | 'processing' | 'reviewed' | 'actioned';
}

// RFQ types
export interface RFQField {
  value: string;
  confidence: number;
  source: string;
}

export interface RFQLineItem {
  partDescription: RFQField;
  quantity: RFQField;
  finishSystem: RFQField;
  color: RFQField;
  dimensions: RFQField;
  maskingNotes: RFQField;
}

export interface RFQ {
  id: string;
  emailId: string;
  customerName: RFQField;
  customerContact: RFQField;
  shipTo: RFQField;
  lineItems: RFQLineItem[];
  leadTime: RFQField;
  specialNotes: string;
  missingFields: string[];
  status: 'extracted' | 'draft_ready' | 'under_review' | 'approved' | 'needs_info';
  draftQuoteUrl?: string;
  createdAt: string;
}

// Order Status types
export interface OrderStatus {
  id: string;
  customer: string;
  poNumber: string;
  woNumber: string;
  partDescription: string;
  quantity: number;
  currentStatus: 'Received' | 'In Production' | 'Coating' | 'Curing' | 'QC' | 'Packaging' | 'Ready to Ship' | 'Shipped';
  promiseDate: string;
  shipDate?: string;
  notes: string;
}

export interface StatusEmailDraft {
  id: string;
  customer: string;
  customerEmail: string;
  orders: OrderStatus[];
  emailSubject: string;
  emailBody: string;
  status: 'draft' | 'reviewed' | 'approved' | 'sent';
  createdAt: string;
  flaggedIssues: string[];
}

// Activity Log
export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  actor: 'ai_agent' | 'human';
  details: string;
  relatedId?: string;
  relatedType?: 'email' | 'rfq' | 'order_status';
}

// Dashboard stats
export interface DashboardStats {
  emailsProcessedToday: number;
  pendingReviews: number;
  quotesDraftedThisWeek: number;
  statusUpdatesSentThisWeek: number;
  avgClassificationConfidence: number;
  rfqsThisMonth: number;
}
