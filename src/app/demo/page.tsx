"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { ClassificationBadge } from "@/components/classification-badge";
import type { EmailClassification } from "@/lib/types";
import { Zap, Loader2, ArrowRight, Sparkles } from "lucide-react";

interface ClassificationResult {
  classification: EmailClassification;
  confidence: number;
  reasoning: string;
  allScores: { category: string; score: number }[];
}

interface ExtractionResult {
  fields: { name: string; value: string; confidence: number; source: string }[];
  missingFields: string[];
}

const sampleEmails = [
  {
    label: "RFQ - Aluminum Extrusions",
    subject: "Quote Request - 6063 Aluminum Extrusions, AAMA 2604 Powder Coat",
    body: `Hi WMF Team,

We need a quote for the following powder coating project:

Customer: Pacific Curtainwall Inc.
Ship to: 2400 Marine Dr, West Vancouver, BC

Parts: 6063-T5 Aluminum window extrusions
Quantity: 2,500 pieces (150 pieces/month ongoing)
Finish: AAMA 2604 compliant powder coat
Color: RAL 7016 Anthracite Grey
Max length: 24 feet
Masking: Both ends 1" for assembly

Need pricing by end of week if possible. Delivery needed within 3 weeks of PO.

Thanks,
David Chen
Pacific Curtainwall Inc.
604-555-0123`,
  },
  {
    label: "Order Status Inquiry",
    subject: "RE: PO #45-2891 Status Update Request",
    body: `Good morning,

Can you please provide an update on our order PO #45-2891? We have 500 steel panels in production that were supposed to ship last Friday.

Our customer is asking for delivery dates. Please advise ASAP.

Regards,
Mike Torres
Apex Architectural Systems`,
  },
  {
    label: "Administrative Email",
    subject: "Updated Holiday Schedule 2026",
    body: `Hi Team,

Please find attached the updated holiday schedule for 2026. Note the additional shutdown day on July 3rd.

Please plan your production schedules accordingly.

Best,
HR Department`,
  },
];

export default function DemoPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [classifying, setClassifying] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [classResult, setClassResult] = useState<ClassificationResult | null>(
    null
  );
  const [extractResult, setExtractResult] = useState<ExtractionResult | null>(
    null
  );

  const loadSample = (idx: number) => {
    setSubject(sampleEmails[idx].subject);
    setBody(sampleEmails[idx].body);
    setClassResult(null);
    setExtractResult(null);
  };

  const classify = async () => {
    setClassifying(true);
    setClassResult(null);
    setExtractResult(null);

    // Simulated AI classification
    await new Promise((r) => setTimeout(r, 1500));

    const lowerBody = body.toLowerCase();
    const lowerSubject = subject.toLowerCase();
    const combined = lowerBody + " " + lowerSubject;

    let result: ClassificationResult;

    if (
      combined.includes("quote") ||
      combined.includes("rfq") ||
      combined.includes("pricing") ||
      combined.includes("powder coat") ||
      combined.includes("finish")
    ) {
      result = {
        classification: "rfq",
        confidence: 0.96,
        reasoning:
          "Email contains quote request language, specific part descriptions, quantity requirements, and finish specifications consistent with an RFQ.",
        allScores: [
          { category: "RFQ", score: 0.96 },
          { category: "Order Status", score: 0.02 },
          { category: "Change Request", score: 0.01 },
          { category: "Administrative", score: 0.005 },
          { category: "Spam", score: 0.005 },
        ],
      };
    } else if (
      combined.includes("status") ||
      combined.includes("update") ||
      combined.includes("po #") ||
      combined.includes("ship")
    ) {
      result = {
        classification: "order_status",
        confidence: 0.93,
        reasoning:
          "Email references a specific PO number and requests delivery/shipping status update, consistent with an order status inquiry.",
        allScores: [
          { category: "RFQ", score: 0.03 },
          { category: "Order Status", score: 0.93 },
          { category: "Change Request", score: 0.02 },
          { category: "Administrative", score: 0.015 },
          { category: "Spam", score: 0.005 },
        ],
      };
    } else if (
      combined.includes("change") ||
      combined.includes("modify") ||
      combined.includes("revision")
    ) {
      result = {
        classification: "change_request",
        confidence: 0.88,
        reasoning:
          "Email contains language requesting modifications to an existing order or specification.",
        allScores: [
          { category: "RFQ", score: 0.05 },
          { category: "Order Status", score: 0.04 },
          { category: "Change Request", score: 0.88 },
          { category: "Administrative", score: 0.02 },
          { category: "Spam", score: 0.01 },
        ],
      };
    } else {
      result = {
        classification: "administrative",
        confidence: 0.85,
        reasoning:
          "Email appears to be internal administrative communication without specific RFQ or order references.",
        allScores: [
          { category: "RFQ", score: 0.05 },
          { category: "Order Status", score: 0.03 },
          { category: "Change Request", score: 0.02 },
          { category: "Administrative", score: 0.85 },
          { category: "Spam", score: 0.05 },
        ],
      };
    }

    setClassResult(result);
    setClassifying(false);
  };

  const extract = async () => {
    setExtracting(true);
    await new Promise((r) => setTimeout(r, 2000));

    // Smart extraction based on content
    const fields: ExtractionResult["fields"] = [];
    const missing: string[] = [];

    // Try to extract customer name
    const customerMatch = body.match(
      /(?:customer|from|company)[:\s]*([^\n]+)/i
    );
    if (customerMatch) {
      fields.push({
        name: "Customer Name",
        value: customerMatch[1].trim(),
        confidence: 0.92,
        source: `"${customerMatch[0].trim()}"`,
      });
    } else {
      missing.push("Customer name not explicitly stated");
    }

    // Try to extract quantity
    const qtyMatch = body.match(
      /(?:quantity|qty)[:\s]*([^\n]+)|(\d[\d,]+)\s*(?:pieces|pcs|units|panels)/i
    );
    if (qtyMatch) {
      fields.push({
        name: "Quantity",
        value: (qtyMatch[1] || qtyMatch[0]).trim(),
        confidence: 0.95,
        source: `"${(qtyMatch[0] || "").trim()}"`,
      });
    } else {
      missing.push("Quantity not specified");
    }

    // Try to extract finish
    const finishMatch = body.match(/AAMA\s*\d{4}[^\n]*/i);
    if (finishMatch) {
      fields.push({
        name: "Finish System",
        value: finishMatch[0].trim(),
        confidence: 0.98,
        source: `"${finishMatch[0].trim()}"`,
      });
    } else {
      missing.push("Finish system / AAMA spec not specified");
    }

    // Try to extract color
    const colorMatch = body.match(/(?:color|colour|RAL)[:\s]*([^\n]+)/i);
    if (colorMatch) {
      fields.push({
        name: "Color",
        value: colorMatch[0].trim(),
        confidence: 0.97,
        source: `"${colorMatch[0].trim()}"`,
      });
    } else {
      missing.push("Color not specified");
    }

    // Try to extract ship-to
    const shipMatch = body.match(/(?:ship\s*to|delivery)[:\s]*([^\n]+)/i);
    if (shipMatch) {
      fields.push({
        name: "Ship To",
        value: shipMatch[1].trim(),
        confidence: 0.88,
        source: `"${shipMatch[0].trim()}"`,
      });
    } else {
      missing.push("Ship-to location not specified");
    }

    // Try to extract lead time
    const leadMatch = body.match(
      /(?:within|need.*by|delivery.*within|lead\s*time)[:\s]*([^\n.]+)/i
    );
    if (leadMatch) {
      fields.push({
        name: "Lead Time",
        value: leadMatch[0].trim(),
        confidence: 0.82,
        source: `"${leadMatch[0].trim()}"`,
      });
    } else {
      missing.push("Lead time / delivery requirement not specified");
    }

    // Parts
    const partMatch = body.match(
      /(?:parts?|material|substrate)[:\s]*([^\n]+)/i
    );
    if (partMatch) {
      fields.push({
        name: "Part Description",
        value: partMatch[1].trim(),
        confidence: 0.9,
        source: `"${partMatch[0].trim()}"`,
      });
    }

    // Masking
    const maskMatch = body.match(/(?:masking|mask)[:\s]*([^\n]+)/i);
    if (maskMatch) {
      fields.push({
        name: "Masking Notes",
        value: maskMatch[1].trim(),
        confidence: 0.91,
        source: `"${maskMatch[0].trim()}"`,
      });
    }

    setExtractResult({ fields, missingFields: missing });
    setExtracting(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          AI Demo
        </h1>
        <p className="text-muted-foreground">
          Test the email classification and RFQ extraction engine in real-time
        </p>
      </div>

      {/* Sample Emails */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Load sample:</span>
        {sampleEmails.map((sample, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            onClick={() => loadSample(idx)}
            className="text-xs"
          >
            {sample.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Input
                placeholder="Email subject line..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Email Body
              </label>
              <Textarea
                placeholder="Paste email content here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={classify}
                disabled={!body || classifying}
                className="gap-2"
              >
                {classifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                Classify Email
              </Button>
              {classResult?.classification === "rfq" && (
                <Button
                  variant="outline"
                  onClick={extract}
                  disabled={extracting}
                  className="gap-2"
                >
                  {extracting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  Extract RFQ Data
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {/* Classification Result */}
          {classResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Classification Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <ClassificationBadge
                    classification={classResult.classification}
                    confidence={classResult.confidence}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {classResult.reasoning}
                </p>
                <Separator />
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                    All Category Scores
                  </h4>
                  <div className="space-y-2">
                    {classResult.allScores.map((s) => (
                      <div
                        key={s.category}
                        className="flex items-center gap-3"
                      >
                        <span className="text-xs w-28">{s.category}</span>
                        <div className="flex-1">
                          <ConfidenceIndicator score={s.score} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extraction Result */}
          {extractResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  RFQ Data Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {extractResult.fields.map((field) => (
                    <div
                      key={field.name}
                      className="flex items-start justify-between p-2 rounded bg-muted/30"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {field.name}
                        </p>
                        <p className="text-sm font-medium">{field.value}</p>
                        <p className="text-xs text-muted-foreground italic mt-0.5">
                          Source: {field.source}
                        </p>
                      </div>
                      <div className="ml-3 shrink-0">
                        <ConfidenceIndicator score={field.confidence} />
                      </div>
                    </div>
                  ))}
                </div>

                {extractResult.missingFields.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-xs font-semibold text-amber-600 mb-2">
                        Missing / Ambiguous Fields
                      </h4>
                      <ul className="space-y-1">
                        {extractResult.missingFields.map((f) => (
                          <li key={f} className="text-xs text-amber-600">
                            &bull; {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {!classResult && !extractResult && (
            <Card className="flex items-center justify-center h-64">
              <div className="text-center text-muted-foreground">
                <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Paste an email and click &quot;Classify&quot; to see the AI in action
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
