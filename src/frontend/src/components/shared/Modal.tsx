import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "sm",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const maxWidth = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-2xl" }[size];

  return (
    <dialog
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent max-w-none w-full h-full m-0 border-0 outline-none"
      open
      aria-labelledby="modal-title"
      data-ocid="modal.dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full rounded-2xl border border-border bg-card shadow-xl outline-none animate-in fade-in zoom-in-95 duration-200",
          maxWidth,
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-border">
          <div>
            <h2
              id="modal-title"
              className="font-display font-semibold text-lg text-foreground"
            >
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
            aria-label="Close dialog"
            data-ocid="modal.close_button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {children && <div className="p-6">{children}</div>}

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName: string;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  entityName,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirmer la suppression"
      description={`Êtes-vous sûr de vouloir supprimer ${entityName} ? Cette action est irréversible.`}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            data-ocid="modal.cancel_button"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
            data-ocid="modal.confirm_button"
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </button>
        </>
      }
    />
  );
}
