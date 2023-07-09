import React, { useRef, useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Task = ({ task, data, completed, id, updateTodo, deleteTodo }) => {
  const [editTask, setEditTask] = useState(task);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const editData = () => {
    if (editTask.length > 0) {
      updateTodo({ id: id, taskName: editTask, completed: completed });
    }
    if (editTask.length === 0) {
      setEditTask(task);
    }
  };
  const handleEdit = (e) => {
    setEditTask(e.target.value);
  };
  const handleDelete = () => {
    deleteTodo({ id: id });
  };
  const handleComplete = () => {
    updateTodo({ id: id, taskName: editTask, completed: !completed });
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setIsEdit(false);
    editData();
  };

  return (
    <div className="w-100 d-flex justify-content-between">
      <main className="d-flex align-items-center justify-contents-center">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={completed}
          onChange={() => handleComplete()}
          className="me-2 form-check-input"
        />
        {isEdit ? (
          <form onSubmit={handleBlur}>
            <input
              ref={inputRef}
              className="form-control"
              type="text"
              name="editTask"
              id="editTask"
              value={editTask}
              onChange={(e) => handleEdit(e)}
              onBlur={handleBlur}
            />
          </form>
        ) : (
          <span>{completed ? <s>{editTask}</s> : editTask}</span>
        )}
      </main>
      <section>
        <BiEditAlt
          className="me-2"
          size={20}
          onClick={() => setIsEdit(!isEdit)}
        />
        <AiFillDelete size={20} onClick={handleDelete} />
      </section>
    </div>
  );
};

export default Task;
