import { cn } from "@/lib/utils";

export function ConfidenceIndicator({
  score,
  showLabel = true,
}: {
  score: number;
  showLabel?: boolean;
}) {
  const percentage = Math.round(score * 100);
  const color =
    score >= 0.9
      ? "text-green-600 bg-green-100"
      : score >= 0.75
        ? "text-amber-600 bg-amber-100"
        : "text-red-600 bg-red-100";

  const barColor =
    score >= 0.9
      ? "bg-green-500"
      : score >= 0.75
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded", color)}>
          {percentage}%
        </span>
      )}
    </div>
  );
}
