import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

type TableWithContentProps = {
  title: "Planned Features" | "New Features" | "Bugs" | "Fixed Bugs";
  children: React.ReactNode;
};

const TableWithContent = ({ title, children }: TableWithContentProps) => {
  return (
    <div className="max-w-5xl w-full p-11" key={title}>
      <h1 className={`text-4xl font-bold mb-12 text-center`}>{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] border-2 border-dotted">
              Number
            </TableHead>
            <TableHead className="border-2 border-dotted">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
};

export default TableWithContent;
