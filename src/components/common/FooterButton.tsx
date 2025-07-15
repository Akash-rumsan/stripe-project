import { Table as ReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface TableFooterProps<T> {
  table: ReactTable<T>;
}
const FooterButton = <T,>({ table }: TableFooterProps<T>) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};
export default FooterButton;
