import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface TableLoaderProps {
  headers: string[];
  rowCount?: number;
}
const TableLoader: React.FC<TableLoaderProps> = ({ headers, rowCount = 3 }) => {
  return (
    <div className="border rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }, (_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {headers.map((header) => (
                <TableCell key={`cell-${rowIndex}-${header}`}>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoader;
