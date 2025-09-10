import { SkeletonBox, SkeletonGrid } from "./SkeletonBase";

export const DashboardSkeleton = () => (
  <div className="skeleton-container">
    <SkeletonBox width="25%" height="54px" />
    <SkeletonGrid>
      <SkeletonBox width="100%" height="90px" />
      <SkeletonBox width="100%" height="90px" />
    </SkeletonGrid>
    <SkeletonBox width="100%" height="328px" />
  </div>
);
