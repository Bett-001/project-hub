import { cn } from '@/lib/utils';

export function StatsCard({ title, value, icon, trend, className }) {
  const Icon = icon;

  return (
    <div className={cn("card-elevated p-6", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-1 font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              {trend.positive ? '+' : ''}{trend.value}%
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

