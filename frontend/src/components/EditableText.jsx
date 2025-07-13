import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { CgCheckR } from "react-icons/cg";
import { updateUser } from "../libs/fetchUsersUtils";
import { API_URL } from "../libs/api";
function EditableText({
  data,
  type,
  textSize = 16,
  hoverMode = true,
  isMyAccount,
  id,
  fieldName,
  editWidth,
  editHeight,
}) {
  const [onHover, setOnHover] = useState(false);
  const [dataValue, setDataValue] = useState(data);
  const [prevDataValue, setPrevDataValue] = useState(data);
  const [isEditMode, setIsEditMode] = useState(false);
  let prevData;

  useEffect(() => {
    setDataValue(data);
  }, [data])

  const user = JSON.parse(sessionStorage.getItem("user"));
  const handleUpdate = async () => {
    await updateUser(API_URL, id, { [fieldName]: dataValue });
  };
  const buttonElement = () => {
    return (
      <>
        <button
          onClick={() => {
            setIsEditMode(false);
            setPrevDataValue(dataValue);
            handleUpdate();
            user[fieldName] = dataValue;
            sessionStorage.setItem("user", JSON.stringify(user));
          }}
          className={`items-end text-[18px] ml-2 px-1 border-2 rounded-[8px]`}
        >
          confirm
        </button>
        <button
          onClick={() => {
            setIsEditMode(false);
            setDataValue(prevDataValue);
          }}
          className={`text-[18px] ml-2 px-1 border-2 rounded-[8px]`}
        >
          cancel
        </button>
      </>
    );
  };
  const editMode = (type) => {
    if (type === "textarea") {
      return (
        <>
          <textarea
            className={`items-center text-[${textSize}px] border-1 rounded-[8px] my-1 p-0 w-[${editWidth}] h-[${editHeight}]`}
            value={dataValue}
            onChange={(e) => setDataValue(e.target.value)}
            autoFocus
          ></textarea>
          {buttonElement()}
        </>
      );
    }

    return (
      <>
        <input
          type="text"
          className={`items-center text-[${textSize}px] border-1 rounded-[8px] my-1 p-0 w-[${editWidth}] h-[${editHeight}]`}
          value={dataValue}
          onChange={(e) => setDataValue(e.target.value)}
          autoFocus
        />
        {buttonElement()}
      </>
    );
  };
  const defaultMode = () => {
    return (
      <div className="flex items-center gap-2">
        {type === "textarea" ? (
          <div className="whitespace-pre-wrap break-words w-auto max-w-[60vw]">
            {dataValue}
          </div>
        ) : (
          <div className="break-words">{dataValue}</div>
        )}
        {(onHover || !hoverMode) && isMyAccount && (
          <button onClick={() => setIsEditMode(true)}>
            <AiOutlineEdit size={18} className={``} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`ml-4`}
      style={{
        fontSize: textSize,
      }}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {isEditMode ? editMode(type) : defaultMode()}
    </div>
  );
}

export default EditableText;
