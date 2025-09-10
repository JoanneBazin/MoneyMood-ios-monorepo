import { SkeletonBox } from "./SkeletonBase";

export const CreateSkeleton = () => (
  <div className="skeleton-container">
    <SkeletonBox width="100%" height="29px" />

    <SkeletonBox width="100%" height="150px" />
    <SkeletonBox width="100%" height="150px" />
  </div>
);
