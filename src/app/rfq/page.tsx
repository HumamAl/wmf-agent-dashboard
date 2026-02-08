"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { StatusBadge } from "@/components/status-badge";
import { rfqs } from "@/lib/demo-data";
import type { RFQ, RFQField } from "@/lib/types";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Edit,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

function FieldRow({ label, field }: { label: string; field: RFQField }) {
  return (
    <div className="grid grid-cols-12 gap-3 py-2 border-b border-border/50 last:border-0">
      <div className="col-span-3">
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="col-span-4">
        <span className="text-sm font-medium">{field.value || "\u2014"}</span>
      </div>
      <div className="col-span-2">
        <ConfidenceIndicator score={field.confidence} />
      </div>
      <div className="col-span-3">
        <span className="text-xs text-muted-foreground italic truncate block">
          {field.source}
        </span>
      </div>
    </div>
  );
}

export default function RFQPage() {
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">RFQ Review</h1>
          <p className="text-muted-foreground">
            AI-extracted quote requests with confidence scoring
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <FileText className="w-3 h-3" />
          {rfqs.length} active RFQs
        </Badge>
      </div>

      {/* RFQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rfqs.map((rfq) => (
          <Card
            key={rfq.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedRFQ?.id === rfq.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedRFQ(rfq)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm">
                    {rfq.customerName.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rfq.customerContact.value}
                  </p>
                </div>
                <StatusBadge status={rfq.status} />
              </div>
              <Separator className="my-2" />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {rfq.lineItems.length} line item
                  {rfq.lineItems.length !== 1 ? "s" : ""}
                </p>
                <p className="text-xs truncate">
                  {rfq.lineItems
                    .map((li) => li.partDescription.value)
                    .join(", ")}
                </p>
                {rfq.missingFields.length > 0 && (
                  <div className="flex items-center gap-1 text-amber-600 mt-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-xs">
                      {rfq.missingFields.length} missing field
                      {rfq.missingFields.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RFQ Detail */}
      {selectedRFQ && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>
                  RFQ: {selectedRFQ.customerName.value}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  ID: {selectedRFQ.id} &middot; Email: {selectedRFQ.emailId}{" "}
                  &middot; Created:{" "}
                  {new Date(selectedRFQ.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={selectedRFQ.status} />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Customer Information
              </h3>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="grid grid-cols-12 gap-3 pb-1 mb-2 border-b text-xs text-muted-foreground font-medium">
                  <div className="col-span-3">Field</div>
                  <div className="col-span-4">Extracted Value</div>
                  <div className="col-span-2">Confidence</div>
                  <div className="col-span-3">Source</div>
                </div>
                <FieldRow
                  label="Customer Name"
                  field={selectedRFQ.customerName}
                />
                <FieldRow
                  label="Contact"
                  field={selectedRFQ.customerContact}
                />
                <FieldRow label="Ship To" field={selectedRFQ.shipTo} />
                <FieldRow label="Lead Time" field={selectedRFQ.leadTime} />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Line Items ({selectedRFQ.lineItems.length})
              </h3>
              <div className="space-y-4">
                {selectedRFQ.lineItems.map((item, idx) => (
                  <div key={idx} className="bg-muted/30 rounded-lg p-3">
                    <h4 className="text-xs font-semibold mb-2">
                      Item {idx + 1}
                    </h4>
                    <div className="grid grid-cols-12 gap-3 pb-1 mb-2 border-b text-xs text-muted-foreground font-medium">
                      <div className="col-span-3">Field</div>
                      <div className="col-span-4">Extracted Value</div>
                      <div className="col-span-2">Confidence</div>
                      <div className="col-span-3">Source</div>
                    </div>
                    <FieldRow
                      label="Part Description"
                      field={item.partDescription}
                    />
                    <FieldRow label="Quantity" field={item.quantity} />
                    <FieldRow
                      label="Finish System"
                      field={item.finishSystem}
                    />
                    <FieldRow label="Color" field={item.color} />
                    <FieldRow label="Dimensions" field={item.dimensions} />
                    <FieldRow
                      label="Masking Notes"
                      field={item.maskingNotes}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Fields */}
            {selectedRFQ.missingFields.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  Missing / Ambiguous Information
                </h3>
                <ul className="space-y-1">
                  {selectedRFQ.missingFields.map((field) => (
                    <li
                      key={field}
                      className="text-sm text-amber-600 dark:text-amber-400"
                    >
                      &bull; {field}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special Notes */}
            {selectedRFQ.specialNotes && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Special Notes</h3>
                <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                  {selectedRFQ.specialNotes}
                </p>
              </div>
            )}

            {/* Actions */}
            <Separator />
            <div className="flex items-center gap-3 flex-wrap">
              <Button className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Approve &amp; Send Quote
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                View Draft Quote
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Request Edits
              </Button>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Request More Info
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
