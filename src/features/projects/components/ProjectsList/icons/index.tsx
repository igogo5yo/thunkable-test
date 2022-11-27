import { ReactComponent as EditIconDefault } from "./EditIcon.svg";
import { ReactComponent as EditIconHover } from "./EditIcon_Hover.svg";

import { ReactComponent as DeleteIconDefault } from "./DeleteIcon.svg";
import { ReactComponent as DeleteIconHover } from "./DeleteIcon_Hover.svg";
import { FC, FunctionComponent, useState } from "react";

const hoverHoc = (Icon: FunctionComponent, IconHover: FunctionComponent): FC => () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>{isHovered ? <IconHover /> : <Icon />}</div>
  );
}

export const EditIcon = hoverHoc(EditIconDefault, EditIconHover);
export const DeleteIcon = hoverHoc(DeleteIconDefault, DeleteIconHover);
export { ReactComponent as Question } from "./Question.svg";
