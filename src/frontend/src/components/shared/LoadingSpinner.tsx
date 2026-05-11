import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-3",
};

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        sizeClasses[size],
        className,
      )}
    />
  );
}

export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
      {["a", "b", "c", "d", "e"].slice(0, cols - 1).map((k) => (
        <div
          key={k}
          className="h-4 bg-muted rounded flex-1"
          style={{ maxWidth: k === "a" ? 160 : 120 }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-32 mb-4" />
      <div className="h-8 bg-muted rounded w-20" />
    </div>
  );
}
