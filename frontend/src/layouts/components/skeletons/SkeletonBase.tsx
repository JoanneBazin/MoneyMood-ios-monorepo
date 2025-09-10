import { SkeletonBoxProps, SkeletonGridProps } from "@/types";

export const SkeletonBox = ({ width, height }: SkeletonBoxProps) => (
  <div className="skeleton-box" style={{ width, height }} />
);

export const SkeletonGrid = ({
  columns = 2,
  gap = "26px",
  children,
}: SkeletonGridProps) => (
  <div
    className="skeleton-grid"
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }}
  >
    {children}
  </div>
);
