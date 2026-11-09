import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  duration = 36,
  reverse = false,
  className,
  separator = "✦",
  itemClassName,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
  itemClassName?: string;
}) {
  const sequence = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn("marquee-track items-center", reverse && "marquee-reverse")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "flex shrink-0 items-center gap-6 px-6 text-[clamp(1.6rem,4vw,3.6rem)] leading-none",
              itemClassName
            )}
          >
            {item}
            <span className="text-[0.32em] text-brasa">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
