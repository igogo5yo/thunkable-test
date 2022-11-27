import { FC } from "react";
import { useSelector } from "react-redux";
import { IProjectItem, selectShowCreationForm } from "../../projectsSlice";
import { Table } from "antd";
import useTableData from "./useTableData";

const ProjectsList: FC = () => {
  const showForm = useSelector(selectShowCreationForm);
  const { rows, columns } = useTableData();

  if (!rows.length && !showForm) return null;

  return (
    <Table<IProjectItem>
      pagination={false}
      showHeader={false}
      dataSource={rows}
      // @ts-ignore
      columns={columns}
    />
  );
};

export default ProjectsList;
