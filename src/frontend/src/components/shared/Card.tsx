import { cn } from "@/lib/utils";
import { 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription, 
  CardFooter 
} from "../ui/Card";

export { 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription, 
  CardFooter 
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      type={onClick ? "button" : undefined}
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        hover &&
          "hover:shadow-md hover:-translate-y-0.5 transition-smooth cursor-pointer",
        onClick && "w-full text-left",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="font-display font-bold text-3xl text-foreground mt-1.5 tabular-nums">
            {value}
          </p>
        </div>
        {icon && (
          <div className="icon-wrap w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
