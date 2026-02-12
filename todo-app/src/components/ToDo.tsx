import { useState } from "react";

type ToDoProps = {
  id: number;
  text: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, editText: string) => void;
};

function ToDo({ id, text, isCompleted, onToggle, onDelete, onEdit }: ToDoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  return (
    <div className="todo my-2 w-1/2 flex justify-around">
      <input type="checkbox" checked={isCompleted} onChange={() => onToggle(id)}/>

      {isEditing ? (
        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="border p-1 rounded"/>
      ) : (
        <div className={isCompleted ? "line-through" : ""}>{text}</div>
      )}

      <div className="buttons flex">
        <button
          onClick={() => {
            if (isEditing) {
              onEdit(id, editText);
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md font-bold mx-1"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => onDelete(id)}
          className="bg-red-600 hover:bg-red-800 p-3 py-1 text-white rounded-md font-bold mx-1" >
            Delete
        </button>
      </div>
    </div>
  );
}

export default ToDo;