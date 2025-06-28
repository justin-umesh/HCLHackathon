import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";

interface TableProps {
  headers: {
    key: string;
    value: React.ReactNode | string;
  }[];
  rows: {
    key: string;
    cells: {
      key: string;
      value: React.ReactNode | string;
    }[];
  }[];
}

const TableComponent: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            {headers?.map((header) => (
              <TableHeadCell
                id={header.key}
                key={header.key}
                className="whitespace-nowrap"
              >
                {header.value}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {rows.map((row) => (
            <TableRow
              key={row.key}
              id={row.key}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {row.cells.map((cell) => (
                <TableCell
                  key={`${row.key}-${cell.key}`}
                  id={cell.key}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  {cell.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
