"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, activityLog, emails } from "@/lib/demo-data";
import { ClassificationBadge } from "@/components/classification-badge";
import {
  Mail,
  Clock,
  FileText,
  Send,
  Brain,
  TrendingUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const stats = [
  {
    title: "Emails Processed Today",
    value: dashboardStats.emailsProcessedToday,
    icon: Mail,
    description: "Across all categories",
  },
  {
    title: "Pending Reviews",
    value: dashboardStats.pendingReviews,
    icon: Clock,
    description: "Awaiting human approval",
  },
  {
    title: "Quotes Drafted",
    value: dashboardStats.quotesDraftedThisWeek,
    icon: FileText,
    description: "This week",
  },
  {
    title: "Status Updates Sent",
    value: dashboardStats.statusUpdatesSentThisWeek,
    icon: Send,
    description: "This week",
  },
  {
    title: "Avg. AI Confidence",
    value: `${Math.round(dashboardStats.avgClassificationConfidence * 100)}%`,
    icon: Brain,
    description: "Classification accuracy",
  },
  {
    title: "RFQs This Month",
    value: dashboardStats.rfqsThisMonth,
    icon: TrendingUp,
    description: "Quote requests received",
  },
];

export default function DashboardPage() {
  const recentEmails = emails.slice(0, 5);
  const recentActivity = activityLog.slice(0, 8);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Windsor Metal Finishing &mdash; AI Customer Service Agent Overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Emails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEmails.map((email) => (
              <div
                key={email.id}
                className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {email.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">{email.from}</p>
                </div>
                <div className="flex flex-col items-end gap-1 ml-3">
                  <ClassificationBadge
                    classification={email.classification}
                    confidence={email.classificationConfidence}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(new Date(email.receivedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      log.actor === "ai_agent"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{log.action}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {log.details}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {formatDistanceToNow(new Date(log.timestamp), {
                        addSuffix: true,
                      })}{" "}
                      &middot;{" "}
                      {log.actor === "ai_agent" ? "AI Agent" : "Human"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
