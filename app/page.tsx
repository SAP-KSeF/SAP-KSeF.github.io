"use client";

import TableContent from "@/components/TableContent";
import TableWithContent from "@/components/TableWithContent";
import { useSearchParams } from "next/navigation";
import tableData from "../static/issues.json";

type StateProps = "open" | "closed";
type LabelProps = "new feature" | "bug";

type FilterIssuesProps = {
  state: StateProps;
  label: LabelProps;
};

type TableDataProps = {
  title: "Planned Features" | "New Features" | "Bugs" | "Fixed Bugs";
  content: React.ReactNode;
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

  const renderTableContent = ({ state, label }: FilterIssuesProps) => {
    const tableDataContent = filterIssues({ state, label });

    return tableDataContent.map((issue) => {
      return <TableContent issue={issue} key={issue.number} />;
    });
  };

  const tableContent = tableData.map((issue) => {
    return <TableContent issue={issue} key={issue.number} />;
  });

  const renderTableWithContent = ({ title, content }: TableDataProps) => {
    return <TableWithContent title={title}>{content}</TableWithContent>;
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white overflow-x-hidden">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {(searchParams.length === 0 ||
          searchParams.includes("planned-features")) &&
          renderTableWithContent({
            title: "Planned Features",
            content: renderTableContent({
              state: "open",
              label: "new feature",
            }),
          })}

        {(searchParams.length === 0 || searchParams.includes("new-features")) &&
          renderTableWithContent({
            title: "New Features",
            content: renderTableContent({
              state: "closed",
              label: "new feature",
            }),
          })}

        {(searchParams.length === 0 || searchParams.includes("bugs")) &&
          renderTableWithContent({
            title: "Bugs",
            content: renderTableContent({ state: "open", label: "bug" }),
          })}

        {(searchParams.length === 0 || searchParams.includes("fixed-bugs")) &&
          renderTableWithContent({
            title: "Fixed Bugs",
            content: renderTableContent({ state: "closed", label: "bug" }),
          })}
      </div>
    </main>
  );
}
