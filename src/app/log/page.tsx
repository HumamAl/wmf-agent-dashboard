"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { activityLog } from "@/lib/demo-data";
import { formatDistanceToNow } from "date-fns";
import { Activity, Bot, User } from "lucide-react";

export default function LogPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">
            Full audit trail of all agent and human actions
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Activity className="w-3 h-3" />
          {activityLog.length} entries
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {activityLog.map((log, idx) => (
              <div
                key={log.id}
                className={`flex items-start gap-4 p-4 ${
                  idx !== activityLog.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                {/* Actor icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    log.actor === "ai_agent"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {log.actor === "ai_agent" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {log.details}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(log.timestamp), {
                          addSuffix: true,
                        })}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          log.actor === "ai_agent"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {log.actor === "ai_agent" ? "AI Agent" : "Human"}
                      </Badge>
                    </div>
                  </div>
                  {log.relatedType && (
                    <div className="mt-1">
                      <Badge variant="outline" className="text-[10px]">
                        {log.relatedType} &middot; {log.relatedId}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
