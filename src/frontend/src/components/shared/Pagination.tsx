import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(page, totalPages);

  let ellipsisCount = 0;
  const pageNodes = pages.map((p): React.ReactNode => {
    if (p === "...") {
      ellipsisCount += 1;
      return (
        <span
          key={`ellipsis-${ellipsisCount}`}
          className="w-9 text-center text-muted-foreground text-sm"
        >
          …
        </span>
      );
    }
    return (
      <PaginationButton
        key={p}
        onClick={() => onPageChange(Number(p))}
        active={Number(p) === page}
        data-ocid={`pagination.page.${p}`}
      >
        {p}
      </PaginationButton>
    );
  });

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <PaginationButton
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        data-ocid="pagination.pagination_prev"
      >
        <ChevronLeft size={16} />
      </PaginationButton>

      {pageNodes}

      <PaginationButton
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        data-ocid="pagination.pagination_next"
      >
        <ChevronRight size={16} />
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  children,
  onClick,
  disabled,
  active,
  "aria-label": ariaLabel,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  "aria-label"?: string;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      data-ocid={dataOcid}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      {children}
    </button>
  );
}

function buildPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
