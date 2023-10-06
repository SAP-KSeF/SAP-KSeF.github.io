"use client";

import Pagination from "@/components/Pagination";
import TableContent from "@/components/TableContent";
import TableWithContent, { Title } from "@/components/TableWithContent";
import { tablesConfig } from "@/config/tablesConfig";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import tableData from "../static/issues.json";

type Labels = "plannedFeatures" | "newFeatures" | "bugs" | "fixedBugs";

type StateProps = "open" | "closed";
type LabelProps = "new feature" | "bug";

type TableDataProps = {
  title: Title;
  label: Labels;
  currentPage: number;
};

type FilterIssuesProps = {
  state: StateProps;
  label: LabelProps;
  currentPage: number;
};

const ITEMS_PER_PAGE = 3;

export default function Home() {
  const params = useSearchParams();
  const searchParams =
    params.getAll("type").length > 0 ? params.getAll("type")[0].split(",") : [];

  const { currentPage, handlePreviousPage, handleNextPage } = usePagination({
    plannedFeatures: 1,
    newFeatures: 1,
    bugs: 1,
    fixedBugs: 1,
  });

  const getPaginationData = (label: Labels, currentPage: number) => {
    const filterAndPaginateIssues = ({
      state,
      label,
      currentPage,
    }: FilterIssuesProps) => {
      const filteredIssues = tableData.filter(
        (issue) =>
          issue.state === state && issue.labels.some((l) => l.name === label)
      );

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      return {
        slicedIssues: filteredIssues.slice(startIndex, endIndex),
        totalPages: Math.ceil(filteredIssues.length / ITEMS_PER_PAGE),
      };
    };

    return filterAndPaginateIssues({
      state:
        label.toLowerCase().includes("new") || label.includes("fixed")
          ? "closed"
          : "open",
      label: label.toLowerCase().includes("bug") ? "bug" : "new feature",
      currentPage,
    });
  };

  const renderTableWithPagination = ({
    title,
    label,
    currentPage,
  }: TableDataProps) => {
    const { slicedIssues, totalPages } = getPaginationData(label, currentPage);

    return (
      <>
        <TableWithContent title={title}>
          {slicedIssues.map((issue, idx) => (
            <TableContent issue={issue} idx={idx} key={issue.number} />
          ))}
        </TableWithContent>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => handlePreviousPage(label)}
          onNext={() => handleNextPage(label)}
        />
      </>
    );
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white overflow-x-hidden">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {tablesConfig.map((config) =>
          searchParams.length === 0 ||
          searchParams.includes(config.label.toLowerCase())
            ? renderTableWithPagination({
                title: config.title,
                label: config.label,
                currentPage: currentPage[config.label],
              })
            : null
        )}
      </div>
    </main>
  );
}
