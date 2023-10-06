import { TableCell, TableRow } from "./ui/table";

type IssueProps = {
  issue: {
    number: number;
    title: string;
  };
  idx: number;
};

const TableContent = ({ issue, idx }: IssueProps) => {
  return (
    <TableRow
      className="border-dotted border-2 hover:bg-muted/100"
      key={issue.number}
    >
      <TableCell className="font-medium border-dotted border-2 w-[100px]">
        {idx + 1}
      </TableCell>
      <TableCell className="break-words max-w-xs border-dotted border-2">
        {issue.title}
      </TableCell>
    </TableRow>
  );
};

export default TableContent;
