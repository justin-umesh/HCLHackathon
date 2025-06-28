import React from "react";
import TableComponent from "../../organisms/table";
import { baseSliceAPI } from "../../../utils/api/base-slice";
import type { BaseSliceApiKeys } from "../../../utils/api/constants";

interface TableTemplateProps {
  api: BaseSliceApiKeys;
}

const TableTemplate: React.FC<TableTemplateProps> = ({ api }) => {
  const useApi = baseSliceAPI[api];
  // @ts-ignore
  const { data, isLoading, isError } = useApi({})

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading post</p>;

  return <TableComponent headers={[]} rows={[]} />;
};

export default TableTemplate;
