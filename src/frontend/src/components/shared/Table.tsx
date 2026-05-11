import { cn } from "@/lib/utils";
import type { TableColumn, TableSort } from "@/types";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface TableProps<T extends { id: bigint }> {
  columns: TableColumn<T>[];
  data: T[];
  sort?: TableSort;
  onSort?: (key: string) => void;
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends { id: bigint }>({
  columns,
  data,
  sort,
  onSort,
  emptyMessage = "Aucun enregistrement trouvé.",
  className,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-border bg-card",
        className,
      )}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left font-display font-semibold text-foreground/80 whitespace-nowrap",
                  col.sortable &&
                    onSort &&
                    "cursor-pointer select-none hover:text-foreground transition-colors",
                  col.className,
                )}
                onClick={() => col.sortable && onSort?.(String(col.key))}
                onKeyDown={(e) =>
                  e.key === "Enter" && col.sortable && onSort?.(String(col.key))
                }
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && onSort && (
                    <SortIcon currentKey={String(col.key)} sort={sort} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-muted-foreground"
                data-ocid="table.empty_state"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={String(row.id)}
                className={cn(
                  "border-b border-border/60 last:border-0 transition-colors hover:bg-muted/30",
                  idx % 2 === 1 && "bg-muted/10",
                )}
                data-ocid={`table.row.item.${idx + 1}`}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn("px-4 py-3 align-middle", col.className)}
                  >
                    {col.render
                      ? col.render(row)
                      : String(
                          (row as Record<string, unknown>)[String(col.key)] ??
                            "—",
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function SortIcon({
  currentKey,
  sort,
}: { currentKey: string; sort?: TableSort }) {
  if (!sort || sort.key !== currentKey) {
    return <ChevronsUpDown size={13} className="text-muted-foreground/60" />;
  }
  return sort.direction === "asc" ? (
    <ChevronUp size={13} className="text-primary" />
  ) : (
    <ChevronDown size={13} className="text-primary" />
  );
}
