import { NextRequest, NextResponse } from 'next/server';

interface ClassifyRequest {
  subject: string;
  body: string;
  sender: string;
}

interface ClassifyResponse {
  classification: 'rfq' | 'order_status' | 'change_request' | 'administrative' | 'spam';
  confidence: number;
  reasoning: string;
  signals: string[];
}

const RFQ_PATTERNS = [
  /\brfq\b/i, /\bquote\b/i, /\bquoting\b/i, /\bpric(e|ing)\b/i,
  /\bestimate\b/i, /\bqty\b/i, /\bquantity\b/i, /\bfinish\b/i,
  /\bcoat(ing)?\b/i, /\baama\s*260[0-9]/i, /\bkynar\b/i, /\bpvdf\b/i,
  /\bral\s*\d{4}/i, /\bpowder\s*coat/i, /\bship\s*to\b/i,
  /\bextrusion/i, /\baluminum\b/i, /\bsteel\b/i,
];

const ORDER_STATUS_PATTERNS = [
  /\bstatus\b/i, /\bupdate\b/i, /\bpo\s*#/i, /\bwo\s*#/i,
  /\bship(ping|ment|ped)?\b/i, /\btrack(ing)?\b/i, /\bdelivery\b/i,
  /\bpromise\s*date\b/i, /\bwhen\b.*\b(ship|deliver|ready)\b/i,
  /\bETA\b/i, /\bpro\s*#/i,
];

const CHANGE_REQUEST_PATTERNS = [
  /\bchange\b/i, /\bmodif(y|ication)\b/i, /\brevise\b/i,
  /\bswitch\b/i, /\binstead\b/i, /\bcancel/i, /\brework\b/i,
  /\badhesion\b.*\b(fail|issue|problem)\b/i, /\bquality\b.*\b(issue|problem)\b/i,
  /\bflaking\b/i, /\bdefect/i,
];

const ADMIN_PATTERNS = [
  /\bschedule\b/i, /\bholiday\b/i, /\bmeeting\b/i, /\bpolicy\b/i,
  /\bhr\b/i, /\binternal\b/i, /\bteam\b/i, /\bplant\s*shutdown\b/i,
];

const SPAM_PATTERNS = [
  /\bsavings?\b/i, /\bdiscount\b/i, /\bblowout\b/i, /\bunsubscribe\b/i,
  /\bclick\s*here\b/i, /\blimited\s*(time|stock|offer)\b/i, /\bfree\b/i,
  /\b(huge|big|massive)\s*(sale|savings|deal)/i,
];

function countMatches(text: string, patterns: RegExp[]): number {
  return patterns.filter((p) => p.test(text)).length;
}

function classifyEmail(req: ClassifyRequest): ClassifyResponse {
  const combined = `${req.subject} ${req.body}`;

  const scores: Record<string, { count: number; patterns: RegExp[] }> = {
    rfq: { count: countMatches(combined, RFQ_PATTERNS), patterns: RFQ_PATTERNS },
    order_status: { count: countMatches(combined, ORDER_STATUS_PATTERNS), patterns: ORDER_STATUS_PATTERNS },
    change_request: { count: countMatches(combined, CHANGE_REQUEST_PATTERNS), patterns: CHANGE_REQUEST_PATTERNS },
    administrative: { count: countMatches(combined, ADMIN_PATTERNS), patterns: ADMIN_PATTERNS },
    spam: { count: countMatches(combined, SPAM_PATTERNS), patterns: SPAM_PATTERNS },
  };

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b.count - a.count);
  const [topClass, topScore] = sorted[0];
  const [, secondScore] = sorted[1];

  const totalMatches = sorted.reduce((sum, [, s]) => sum + s.count, 0);
  const confidence = totalMatches > 0
    ? Math.min(0.99, 0.65 + (topScore.count / totalMatches) * 0.30 + Math.min(topScore.count, 6) * 0.02)
    : 0.50;

  const matchedPatterns = topScore.patterns
    .filter((p) => p.test(combined))
    .map((p) => {
      const match = combined.match(p);
      return match ? match[0] : '';
    })
    .filter(Boolean);

  const signals = matchedPatterns.slice(0, 5);

  const classLabels: Record<string, string> = {
    rfq: 'Request for Quote',
    order_status: 'Order Status Inquiry',
    change_request: 'Change Request',
    administrative: 'Administrative',
    spam: 'Spam / Promotional',
  };

  const separation = topScore.count - secondScore.count;
  let reasoning: string;
  if (separation >= 3) {
    reasoning = `Strong signal for ${classLabels[topClass]}. Detected ${topScore.count} matching indicators including: ${signals.join(', ')}. High separation from next-best category.`;
  } else if (separation >= 1) {
    reasoning = `Moderate signal for ${classLabels[topClass]} with ${topScore.count} indicators (${signals.join(', ')}). Some overlap with ${classLabels[sorted[1][0]]} category.`;
  } else {
    reasoning = `Weak differentiation between ${classLabels[topClass]} and ${classLabels[sorted[1][0]]}. Best match based on ${topScore.count} indicators: ${signals.join(', ')}. Manual review recommended.`;
  }

  return {
    classification: topClass as ClassifyResponse['classification'],
    confidence: Math.round(confidence * 100) / 100,
    reasoning,
    signals,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ClassifyRequest = await request.json();

    if (!body.subject && !body.body) {
      return NextResponse.json(
        { error: 'At least one of subject or body is required' },
        { status: 400 },
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

    const result = classifyEmail({
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
