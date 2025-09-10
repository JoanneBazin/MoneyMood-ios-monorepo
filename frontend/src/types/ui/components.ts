import { BudgetEntry } from "@shared/schemas";

export interface BackArrowProps {
  destination?: string;
  onBack?: () => void;
}

export interface DataListProps<T extends BudgetEntry> {
  data: T[];
  emptyMessage: string;
  setSelectedEntry?: (entry: T) => void;
  edit?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface CollapseProps {
  data: BudgetEntry[];
  title: string;
  color: string;
}

export interface BudgetDataCardProps {
  title: string;
  children: React.ReactNode;
  color?: string;
}

export interface TotalCardProps {
  title: string;
  totalData: number;
  setView: () => void;
}

export interface AnimatedViewProps {
  view: string;
  children: React.ReactNode;
}
export interface AnimatedMenuProps {
  menu: string;
  children: React.ReactNode;
}

export interface SkeletonBoxProps {
  width: string;
  height: string;
}

export interface SkeletonGridProps {
  columns?: number;
  gap?: string;
  children: React.ReactNode;
}
