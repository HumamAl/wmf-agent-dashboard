"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClassificationBadge } from "@/components/classification-badge";
import { emails } from "@/lib/demo-data";
import type { Email } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import {
  Mail,
  Paperclip,
  ArrowRight,
  Eye,
  Filter,
} from "lucide-react";

export default function InboxPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredEmails =
    filter === "all"
      ? emails
      : emails.filter((e) => e.classification === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Email Inbox</h1>
          <p className="text-muted-foreground">
            Monitored inbox: sales@windsormetalfinishing.com
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Mail className="w-3 h-3" />
          {emails.length} emails
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {["all", "rfq", "order_status", "change_request", "administrative", "spam"].map(
          (f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs"
            >
              {f === "all"
                ? "All"
                : f
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
            </Button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Email List */}
        <div className="lg:col-span-2 space-y-2">
          {filteredEmails.map((email) => (
            <Card
              key={email.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedEmail?.id === email.id
                  ? "ring-2 ring-primary"
                  : ""
              } ${!email.isRead ? "border-l-4 border-l-primary" : ""}`}
              onClick={() => setSelectedEmail(email)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm truncate ${
                        !email.isRead ? "font-semibold" : ""
                      }`}
                    >
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {email.from} &lt;{email.fromEmail}&gt;
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {email.body.substring(0, 120)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {email.hasAttachments && (
                      <Paperclip className="w-3 h-3 text-muted-foreground" />
                    )}
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(email.receivedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <ClassificationBadge
                    classification={email.classification}
                    confidence={email.classificationConfidence}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Detail */}
        <div className="lg:col-span-3">
          {selectedEmail ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {selectedEmail.subject}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {selectedEmail.from} &lt;{selectedEmail.fromEmail}
                      &gt;
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Received:{" "}
                      {new Date(selectedEmail.receivedAt).toLocaleString()}
                    </p>
                  </div>
                  <ClassificationBadge
                    classification={selectedEmail.classification}
                    confidence={selectedEmail.classificationConfidence}
                  />
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                {/* AI Classification Details */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    AI Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Classification:
                      </span>
                      <div className="mt-1">
                        <ClassificationBadge
                          classification={selectedEmail.classification}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <p className="font-medium">
                        {Math.round(
                          selectedEmail.classificationConfidence * 100
                        )}
                        %
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Thread ID:</span>
                      <p className="font-mono text-xs">
                        {selectedEmail.threadId}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className="capitalize">{selectedEmail.status}</p>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                {selectedEmail.hasAttachments &&
                  selectedEmail.attachments && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">
                        Attachments
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmail.attachments.map((att) => (
                          <Badge
                            key={att}
                            variant="outline"
                            className="gap-1"
                          >
                            <Paperclip className="w-3 h-3" />
                            {att}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Email Body */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Email Body</h3>
                  <div className="bg-background border rounded-lg p-4 text-sm whitespace-pre-wrap">
                    {selectedEmail.body}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  {selectedEmail.classification === "rfq" && (
                    <Button size="sm" className="gap-1">
                      <ArrowRight className="w-3 h-3" />
                      View RFQ Extraction
                    </Button>
                  )}
                  {selectedEmail.classification === "order_status" && (
                    <Button size="sm" className="gap-1">
                      <ArrowRight className="w-3 h-3" />
                      View Order Status
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Mark as Reviewed
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-64">
              <div className="text-center text-muted-foreground">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select an email to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
