import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

export type Title = "Planned Features" | "New Features" | "Bugs" | "Fixed Bugs";

type TableWithContentProps = {
  title: Title;
  children: React.ReactNode;
};

const TableWithContent = ({ title, children }: TableWithContentProps) => {
  return (
    <div className="max-w-5xl w-full p-11">
      <h1 className="text-4xl font-bold mb-12 text-center">{title}</h1>
      <Table className="border-collapse border-2 border-dotted">
        <TableHeader className="sticky top-0 bg-white">
          <TableRow>
            <TableHead className="border-2 border-dotted">Number</TableHead>
            <TableHead className="border-2 border-dotted">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
};

export default TableWithContent;
