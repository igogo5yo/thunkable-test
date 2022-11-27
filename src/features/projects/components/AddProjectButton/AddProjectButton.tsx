import React, { FC } from "react";
import { Button } from "antd";
import cx from "classnames";
import { ReactComponent as PlusSign } from "./Plus_Sign.svg";
import "./AddProjectButton.css";
import { useAppDispatch } from "../../../../app/hooks";
import { showCreationForm } from "../../projectsSlice";

interface IAddProjectButtonProps {
  className?: string;
}

const AddProjectButton: FC<IAddProjectButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={cx(["add-project-btn-root", className])}>
      <Button
        shape="circle"
        icon={<PlusSign />}
        className="add-project-btn"
        onClick={() => {
          dispatch(showCreationForm());
        }}
      />
    </div>
  );
};

export default AddProjectButton;
