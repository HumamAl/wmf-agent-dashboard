import { NextRequest, NextResponse } from 'next/server';
import type { RFQField, RFQLineItem } from '@/lib/types';

interface ExtractRequest {
  subject: string;
  body: string;
  sender: string;
}

interface ExtractedRFQ {
  customerName: RFQField;
  customerContact: RFQField;
  shipTo: RFQField;
  lineItems: RFQLineItem[];
  leadTime: RFQField;
  specialNotes: string;
  missingFields: string[];
}

function extractField(text: string, patterns: RegExp[], label: string): RFQField {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        value: match[1]?.trim() || match[0].trim(),
        confidence: 0.85 + Math.random() * 0.14,
        source: match[0].trim().slice(0, 80),
      };
    }
  }
  return { value: '', confidence: 0, source: `No ${label} found in email` };
}

function extractLineItems(body: string): RFQLineItem[] {
  const items: RFQLineItem[] = [];

  // Match quantity patterns
  const qtyMatches = [...body.matchAll(/(?:qty|quantity)[:\s]*(\d[\d,]*)\s*(pcs|pieces|sheets|ea|units|ft|lf)?/gi)];
  // Match numbered list items that look like part descriptions
  const numberedItems = [...body.matchAll(/^\s*(\d+)[.)]\s*(.+?)(?:\n|$)/gm)];
  // Match dash-prefixed items
  const dashItems = [...body.matchAll(/^\s*[-*]\s*(.+?)(?:\n|$)/gm)];

  const allItems = numberedItems.length > 0 ? numberedItems : dashItems;

  if (allItems.length > 0) {
    for (let i = 0; i < allItems.length; i++) {
      const itemText = allItems[i][numberedItems.length > 0 ? 2 : 1] || '';

      // Try to extract details from the item text and surrounding lines
      const contextStart = body.indexOf(itemText);
      const context = body.slice(contextStart, contextStart + 300);

      const partDesc = itemText.trim().slice(0, 100);
      const qtyMatch = context.match(/(?:qty|quantity)[:\s]*(\d[\d,]*)\s*(pcs|pieces|sheets|ea|units|ft|lf)?/i)
        || qtyMatches[i];
      const finishMatch = context.match(/(AAMA\s*260[0-9][^,.\n]*|powder\s*coat[^,.\n]*|PVDF[^,.\n]*|Kynar[^,.\n]*|TGIC[^,.\n]*|fluoropolymer[^,.\n]*)/i);
      const colorMatch = context.match(/(RAL\s*\d{4}\s*[^,.\n]*|[A-Z][a-z]+\s+(?:Metallic|White|Black|Grey|Gray|Bronze|Brown|Green|Blue|Red|Silver)[^,.\n]*)/);
      const dimMatch = context.match(/(\d+[/"']\s*x\s*\d+[/"'][^,.\n]*|\d+(?:\.\d+)?"\s*(?:x\s*\d+(?:\.\d+)?"\s*)*(?:x\s*\d+\s*(?:ft|in|"))?)/i);
      const maskMatch = context.match(/(mask[^.]*\.)/i);

      items.push({
        partDescription: {
          value: partDesc,
          confidence: partDesc.length > 10 ? 0.88 + Math.random() * 0.10 : 0.60,
          source: partDesc,
        },
        quantity: {
          value: qtyMatch ? `${qtyMatch[1]} ${qtyMatch[2] || 'pcs'}` : 'Not specified',
          confidence: qtyMatch ? 0.95 + Math.random() * 0.04 : 0,
          source: qtyMatch ? qtyMatch[0] : 'No quantity found',
        },
        finishSystem: {
          value: finishMatch ? finishMatch[1].trim() : 'Not specified',
          confidence: finishMatch ? 0.90 + Math.random() * 0.09 : 0,
          source: finishMatch ? finishMatch[0].trim() : 'No finish spec found',
        },
        color: {
          value: colorMatch ? colorMatch[1].trim() : 'Not specified',
          confidence: colorMatch ? 0.92 + Math.random() * 0.07 : 0,
          source: colorMatch ? colorMatch[0].trim() : 'No color found',
        },
        dimensions: {
          value: dimMatch ? dimMatch[1].trim() : 'See description',
          confidence: dimMatch ? 0.85 + Math.random() * 0.10 : 0.30,
          source: dimMatch ? dimMatch[0].trim() : 'Dimensions not clearly specified',
        },
        maskingNotes: {
          value: maskMatch ? maskMatch[1].trim() : 'None specified',
          confidence: maskMatch ? 0.88 + Math.random() * 0.10 : 0.70,
          source: maskMatch ? maskMatch[0].trim() : 'No masking requirements mentioned',
        },
      });
    }
  }

  // If no structured items found, create a single catch-all line item
  if (items.length === 0) {
    const qtyMatch = body.match(/(?:qty|quantity)[:\s]*(\d[\d,]*)\s*(pcs|pieces|sheets|ea|units)?/i);
    const finishMatch = body.match(/(AAMA\s*260[0-9][^,.\n]*|powder\s*coat[^,.\n]*|PVDF[^,.\n]*|Kynar[^,.\n]*)/i);
    const colorMatch = body.match(/(RAL\s*\d{4}\s*[^,.\n]*)/i);

    items.push({
      partDescription: {
        value: 'See email body - structured extraction failed',
        confidence: 0.40,
        source: 'Could not parse distinct line items',
      },
      quantity: {
        value: qtyMatch ? `${qtyMatch[1]} ${qtyMatch[2] || 'pcs'}` : 'Not specified',
        confidence: qtyMatch ? 0.90 : 0,
        source: qtyMatch ? qtyMatch[0] : 'No quantity found',
      },
      finishSystem: {
        value: finishMatch ? finishMatch[1].trim() : 'Not specified',
        confidence: finishMatch ? 0.85 : 0,
        source: finishMatch ? finishMatch[0] : 'No finish spec found',
      },
      color: {
        value: colorMatch ? colorMatch[1].trim() : 'Not specified',
        confidence: colorMatch ? 0.88 : 0,
        source: colorMatch ? colorMatch[0] : 'No color found',
      },
      dimensions: {
        value: 'Not specified',
        confidence: 0,
        source: 'Could not extract dimensions',
      },
      maskingNotes: {
        value: 'None specified',
        confidence: 0.70,
        source: 'No masking requirements mentioned',
      },
    });
  }

  return items;
}

function extractRFQ(req: ExtractRequest): ExtractedRFQ {
  const combined = `${req.subject}\n${req.body}`;

  const customerName = extractField(combined, [
    /(?:from|regards|sincerely)[,\s]*\n.*?\n([\w\s&.]+(?:Inc|LLC|Corp|Ltd|Co|Systems|Group|Builders|Fabrication|Metal|Glass)[\w\s.]*)/im,
    /([\w\s&]+(?:Inc|LLC|Corp|Ltd|Co|Systems|Group|Builders|Fabrication|Metal|Glass)[\w\s.]*)/i,
  ], 'customer name');

  const customerContact = extractField(combined, [
    /(?:thanks|regards|sincerely|cheers|best)[,\s]*\n\s*([A-Z][a-z]+ [A-Z][a-z]+)/m,
    /^([A-Z][a-z]+ [A-Z][a-z]+)\s*$/m,
  ], 'contact name');

  // Use sender as fallback for contact name
  if (!customerContact.value && req.sender) {
    const nameMatch = req.sender.match(/^([^@<]+)/);
    if (nameMatch) {
      customerContact.value = nameMatch[1].trim();
      customerContact.confidence = 0.75;
      customerContact.source = `Inferred from sender: ${req.sender}`;
    }
  }

  const shipTo = extractField(combined, [
    /(?:ship|deliver|send)\s*(?:to|at)\s*(?:our\s*)?(?:\w+\s+)?(?:at\s+)?(\d+[^.\n]{10,60}(?:\d{5}))/i,
    /(\d+\s+[\w\s]+(?:St|Ave|Blvd|Dr|Pkwy|Way|Rd|Lane|Ct)[.,\s]+[\w\s]+,?\s*[A-Z]{2}\s*\d{5})/i,
  ], 'shipping address');

  const leadTime = extractField(combined, [
    /(?:lead\s*time|turn\s*(?:around|time)|need\s*(?:this|them|it)\s*(?:by|in|within))\s*[:\s]*([^\n.]{5,60})/i,
    /(\d+\s*(?:week|day|business day)s?\s*(?:lead\s*time|turnaround)?)/i,
    /(?:ship|deliver)\s*(?:by|before|no later than)\s*([^\n.]{5,30})/i,
  ], 'lead time');

  const lineItems = extractLineItems(req.body);

  // Determine missing fields
  const missingFields: string[] = [];
  if (!shipTo.value) missingFields.push('shipTo');
  if (!leadTime.value) missingFields.push('leadTime');
  if (!customerContact.value) missingFields.push('customerContact');
  for (let i = 0; i < lineItems.length; i++) {
    const item = lineItems[i];
    if (item.quantity.confidence === 0) missingFields.push(`Line ${i + 1} quantity`);
    if (item.finishSystem.confidence === 0) missingFields.push(`Line ${i + 1} finish spec`);
    if (item.color.confidence === 0) missingFields.push(`Line ${i + 1} color`);
  }

  const specialNotes: string[] = [];
  if (/rush|urgent|asap|expedit/i.test(combined)) specialNotes.push('Rush/expedited request detected');
  if (/custom\s*(?:color|match)/i.test(combined)) specialNotes.push('Custom color match required');
  if (/mask/i.test(combined)) specialNotes.push('Masking requirements specified');
  if (/stainless/i.test(combined)) specialNotes.push('Stainless steel components mentioned - verify capability');

  // Round confidence values
  const roundConf = (f: RFQField): RFQField => ({
    ...f,
    confidence: Math.round(f.confidence * 100) / 100,
  });

  return {
    customerName: roundConf(customerName),
    customerContact: roundConf(customerContact),
    shipTo: roundConf(shipTo),
    lineItems: lineItems.map((item) => ({
      partDescription: roundConf(item.partDescription),
      quantity: roundConf(item.quantity),
      finishSystem: roundConf(item.finishSystem),
      color: roundConf(item.color),
      dimensions: roundConf(item.dimensions),
      maskingNotes: roundConf(item.maskingNotes),
    })),
    leadTime: roundConf(leadTime),
    specialNotes: specialNotes.join('. ') || 'No special notes.',
    missingFields,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ExtractRequest = await request.json();

    if (!body.body) {
      return NextResponse.json(
        { error: 'Email body is required' },
        { status: 400 },
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

    const result = extractRFQ({
      subject: body.subject || '',
      body: body.body || '',
      sender: body.sender || '',
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }
}
