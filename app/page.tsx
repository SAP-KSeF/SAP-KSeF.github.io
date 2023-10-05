"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import tableData from "../static/issues.json";

type StateProps = "open" | "closed";
type LabelProps = "new feature" | "bug";

type Issue = (typeof tableData)[0];

type TableDataProps = {
  title: string;
  data: typeof tableData;
};

export default function Home() {
  const params = useSearchParams();
  const searchParams = params.getAll("type");

  const filterIssues = ({
    state,
    label,
  }: {
    state: StateProps;
    label: LabelProps;
  }) => {
    return tableData.filter(
      (issue) =>
        issue.state === state && issue.labels.some((l) => l.name === label)
    );
  };

  const renderTableContent = (data: Issue[]) => {
    return data.map((issue, idx) => {
      return (
        <TableRow className="border-dotted border-2 hover:bg-muted/100" key={issue.number}>
          <TableCell className="font-medium border-dotted border-2 w-[100px]">
            {idx + 1}
          </TableCell>
          <TableCell className="break-words max-w-xs border-dotted border-2">
            {issue.title}
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderTable = ({ title, data }: TableDataProps) => {
    return (
      <div className="max-w-5xl w-full p-11" key={title}>
        <h1 className={`text-4xl font-bold mb-12 text-center`}>{title}</h1>
        <Table>
          <TableHeader >
            <TableRow>
              <TableHead className="w-[100px] border-2 border-dotted">
                Number
              </TableHead>
              <TableHead className="border-2 border-dotted">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableContent(data)}</TableBody>
        </Table>
      </div>
    );
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white overflow-x-hidden">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {(searchParams.length === 0 ||
          searchParams.includes("planned-features")) &&
          renderTable({
            title: "Planned Features",
            data: filterIssues({ state: "open", label: "new feature" }),
          })}

        {(searchParams.length === 0 || searchParams.includes("new-features")) &&
          renderTable({
            title: "New Features",
            data: filterIssues({ state: "closed", label: "new feature" }),
          })}

        {(searchParams.length === 0 || searchParams.includes("bugs")) &&
          renderTable({
            title: "Bugs",
            data: filterIssues({ state: "open", label: "bug" }),
          })}

        {(searchParams.length === 0 || searchParams.includes("fixed-bugs")) &&
          renderTable({
            title: "Fixed Bugs",
            data: filterIssues({ state: "closed", label: "bug" }),
          })}
      </div>
    </main>
  );
}
