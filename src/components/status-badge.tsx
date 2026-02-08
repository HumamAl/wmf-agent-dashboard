import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Received: "bg-slate-100 text-slate-700",
  "In Production": "bg-blue-100 text-blue-700",
  Coating: "bg-indigo-100 text-indigo-700",
  Curing: "bg-violet-100 text-violet-700",
  QC: "bg-amber-100 text-amber-700",
  Packaging: "bg-cyan-100 text-cyan-700",
  "Ready to Ship": "bg-emerald-100 text-emerald-700",
  Shipped: "bg-green-100 text-green-700",
  // RFQ statuses
  extracted: "bg-blue-100 text-blue-700",
  draft_ready: "bg-indigo-100 text-indigo-700",
  under_review: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  needs_info: "bg-red-100 text-red-700",
  // Email draft statuses
  draft: "bg-slate-100 text-slate-700",
  reviewed: "bg-amber-100 text-amber-700",
  sent: "bg-green-100 text-green-700",
};

export function StatusBadge({ status }: { status: string }) {
  const color = statusColors[status] || "bg-gray-100 text-gray-700";
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <Badge variant="secondary" className={cn("text-xs", color)}>
      {label}
    </Badge>
  );
}
