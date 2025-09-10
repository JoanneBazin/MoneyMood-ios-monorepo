import { SkeletonBox } from "./SkeletonBase";

export const HistorySkeleton = () => (
  <div className="skeleton-container">
    <SkeletonBox width="100%" height="29px" />

    <SkeletonBox width="100%" height="45px" />
    <SkeletonBox width="100%" height="45px" />
    <SkeletonBox width="100%" height="45px" />
  </div>
);
