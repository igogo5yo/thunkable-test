import { useDispatch, useSelector } from "react-redux";
import {
  create,
  edit,
  IProjectItem,
  remove,
  selectEditableId,
  selectProjects,
  selectShowCreationForm,
  update,
} from "../../projectsSlice";
import { Button, Input, Typography, Modal } from "antd";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { DeleteIcon, EditIcon, Question } from "./icons";

const { Text } = Typography;
const { confirm } = Modal;

const useTableData = () => {
  const projectsList = useSelector(selectProjects);
  const showForm = useSelector(selectShowCreationForm);
  const editableId = useSelector(selectEditableId);
  const [name, setName] = useState<string>("");
  const id = uuidv4();
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      rows: showForm
        ? [
            {
              name,
              id,
            } as IProjectItem,
            ...projectsList,
          ]
        : projectsList,
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          render: (value: string, record: IProjectItem, idx: number) => {
            let comp = (
              <>
                <Text style={{ fontSize: 20, color: "rgba(0, 0, 0, 0.7)", marginRight: 24 }} strong>{value}</Text>
                <Button
                  type="link"
                  icon={<EditIcon />}
                  onClick={() => {
                    dispatch(edit(record.id));
                  }}
                />
              </>
            );

            if (showForm && idx === 0) {
              comp = (
                <Input
                  width={200}
                  value={name}
                  onPressEnter={() => {
                    if (!name) return;
                    dispatch(
                      create({
                        id,
                        name,
                        date: Date.now(),
                      })
                    );
                    setName("");
                  }}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name your project"
                  autoFocus
                />
              );
            }

            if (editableId === record.id) {
              comp = (
                <Input
                  key={`edit-${record.id}`}
                  width={200}
                  defaultValue={record.name}
                  onPressEnter={(e) => {
                    const { value } = e.target as HTMLInputElement;
                    if (!value.length) return;

                    dispatch(
                      update({
                        ...record,
                        name: value,
                      })
                    );
                  }}
                  autoFocus
                />
              );
            }

            return (
              <div style={{ display: 'flex' }}>
                <img
                  src="/img/defaultProjectIcon.png"
                  style={{ width: "32px", height: "32px", marginRight: 24 }}
                  alt="default project icon"
                />
                {comp}
              </div>
            );
          },
        },
        {
          title: "Date",
          dataIndex: "date",
          align: "center",
          className: "project-date-cell",
          render: (value: string, record: IProjectItem, idx: number) =>
            showForm && idx === 0 ? (
              ""
            ) : (
              <Text style={{ color: "rgba(0, 0, 0, 0.5)" }}>
                {moment(value).format("MMM DD, YYYY h:mm a")}
              </Text>
            ),
        },
        {
          title: "actions",
          dataIndex: "id",
          align: 'right',
          width: 50,
          render: (value: string, record: IProjectItem, idx: number) => {
            if (showForm && idx === 0) return null;

            return (
              <Button
                type="link"
                icon={<DeleteIcon />}
                onClick={() => {
                  confirm({
                    title: 'Are you sure you want to delete this project?',
                    icon: <span className="anticon"><Question width={22} height={22} /></span>,
                    content: 'This action can\'t be undone.',
                    onOk: () => {
                      dispatch(remove(record.id));
                    }
                  });
                }}
              />
            );
          },
        },
      ],
    }),
    [dispatch, editableId, id, name, projectsList, showForm]
  );
};

export default useTableData;
