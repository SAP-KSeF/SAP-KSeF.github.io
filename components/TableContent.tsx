import { TableCell, TableRow } from "./ui/table";

type IssueProps = {
  issue: {
    number: number;
    title: string;
  };
};

const TableContent = ({ issue }: IssueProps) => {
  return (
    <TableRow
      className="border-dotted border-2 hover:bg-muted/100"
      key={issue.number}
    >
      <TableCell className="font-medium border-dotted border-2 w-[100px]">
        {issue.number}
      </TableCell>
      <TableCell className="break-words max-w-xs border-dotted border-2">
        {issue.title}
      </TableCell>
    </TableRow>
  );
};

export default TableContent;
