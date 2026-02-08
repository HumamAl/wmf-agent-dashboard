"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import { orderStatuses, statusEmailDrafts } from "@/lib/demo-data";
import type { StatusEmailDraft } from "@/lib/types";
import {
  Truck,
  Mail,
  CheckCircle,
  Edit,
  AlertTriangle,
  Eye,
  Calendar,
} from "lucide-react";

export default function StatusPage() {
  const [selectedDraft, setSelectedDraft] = useState<StatusEmailDraft | null>(
    null
  );

  // Group orders by customer
  const customerGroups = orderStatuses.reduce(
    (acc, order) => {
      if (!acc[order.customer]) acc[order.customer] = [];
      acc[order.customer].push(order);
      return acc;
    },
    {} as Record<string, typeof orderStatuses>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Status</h1>
          <p className="text-muted-foreground">
            Daily order status tracking and automated email drafts
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <Truck className="w-3 h-3" />
            {orderStatuses.length} orders
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Mail className="w-3 h-3" />
            {statusEmailDrafts.length} drafts
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Order Status Table */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Orders by Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(customerGroups).map(([customer, orders]) => (
                  <div key={customer}>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      {customer}
                      <Badge variant="secondary" className="text-xs">
                        {orders.length} order{orders.length !== 1 ? "s" : ""}
                      </Badge>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-left">
                            <th className="pb-2 text-xs font-medium text-muted-foreground">
                              PO #
                            </th>
                            <th className="pb-2 text-xs font-medium text-muted-foreground">
                              WO #
                            </th>
                            <th className="pb-2 text-xs font-medium text-muted-foreground">
                              Part / Description
                            </th>
                            <th className="pb-2 text-xs font-medium text-muted-foreground">
                              Qty
                            </th>
                            <th className="pb-2 text-xs font-medium text-muted-foreground">
                              Status
                            </th>
                            <th className="pb-2 text-xs font-medium text-muted-foreground">
                              Promise Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-border/50"
                            >
                              <td className="py-2 font-mono text-xs">
                                {order.poNumber}
                              </td>
                              <td className="py-2 font-mono text-xs">
                                {order.woNumber}
                              </td>
                              <td className="py-2 text-xs">
                                {order.partDescription}
                              </td>
                              <td className="py-2 text-xs">{order.quantity}</td>
                              <td className="py-2">
                                <StatusBadge status={order.currentStatus} />
                              </td>
                              <td className="py-2 text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                {new Date(
                                  order.promiseDate
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Drafts */}
        <div className="space-y-4">
          <h2 className="font-semibold">Status Email Drafts</h2>
          {statusEmailDrafts.map((draft) => (
            <Card
              key={draft.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedDraft?.id === draft.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedDraft(draft)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{draft.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {draft.customerEmail}
                    </p>
                  </div>
                  <StatusBadge status={draft.status} />
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {draft.orders.length} order
                  {draft.orders.length !== 1 ? "s" : ""} included
                </p>
                {draft.flaggedIssues.length > 0 && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-xs">
                      {draft.flaggedIssues.length} flagged issue
                      {draft.flaggedIssues.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Draft Preview */}
      {selectedDraft && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Email Preview: {selectedDraft.customer}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  To: {selectedDraft.customerEmail}
                </p>
              </div>
              <StatusBadge status={selectedDraft.status} />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-1">
                Subject
              </h3>
              <p className="text-sm font-medium">{selectedDraft.emailSubject}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-1">
                Email Body
              </h3>
              <div className="bg-background border rounded-lg p-4 text-sm whitespace-pre-wrap">
                {selectedDraft.emailBody}
              </div>
            </div>

            {selectedDraft.flaggedIssues.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  Flagged for Review
                </h3>
                <ul className="space-y-1">
                  {selectedDraft.flaggedIssues.map((issue, i) => (
                    <li
                      key={i}
                      className="text-sm text-amber-600 dark:text-amber-400"
                    >
                      &bull; {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />
            <div className="flex items-center gap-3">
              <Button className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Approve &amp; Send
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
