import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EmailClassification } from "@/lib/types";

const classificationConfig: Record<
  EmailClassification,
  { label: string; className: string }
> = {
  rfq: {
    label: "RFQ",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  order_status: {
    label: "Order Status",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  change_request: {
    label: "Change Request",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  administrative: {
    label: "Admin",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  },
  spam: {
    label: "Spam",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};

export function ClassificationBadge({
  classification,
  confidence,
}: {
  classification: EmailClassification;
  confidence?: number;
}) {
  const config = classificationConfig[classification];
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className={cn("text-xs", config.className)}>
        {config.label}
      </Badge>
      {confidence !== undefined && (
        <span className="text-xs text-muted-foreground">
          {Math.round(confidence * 100)}%
        </span>
      )}
    </div>
  );
}
