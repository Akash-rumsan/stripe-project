import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  isLoading: boolean;
  className: string;
  onPrev: () => void;
  onNext: () => void;
}

export default function CustomPagination({
  page,
  totalPages,
  isLoading,
  onPrev,
  onNext,
  className,
}: Readonly<PaginationProps>) {
  return (
    <div className={className}>
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={page === 1 || isLoading}
      >
        Previous
      </Button>
      <span className="text-sm">
        Page {page} of {totalPages || 1}
      </span>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={page >= (totalPages || 1) || isLoading}
      >
        Next
      </Button>
    </div>
  );
}
