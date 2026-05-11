import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "Une erreur est survenue",
  message = "Impossible de charger les données pour le moment.",
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center",
        className,
      )}
      data-ocid="error_state"
      role="alert"
    >
      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle size={20} className="text-destructive" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-sm">
          {title}
        </p>
        <p className="text-muted-foreground text-sm mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors mt-1"
          data-ocid="error_state.retry_button"
        >
          <RefreshCw size={14} />
          Réessayer
        </button>
      )}
    </div>
  );
}
