import React, { useState } from "react";
import Task from "./Task";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../features/api/apiSlice";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const submit = (e) => {
    e.preventDefault();
    if (newTodo.length > 0) {
      addTodo({ id: Date.now(), taskName: newTodo, completed: false });
      setNewTodo("");
    }
  };
  let showTodos;
  showTodos = isLoading ? (
    "Loading..."
  ) : todos.length === 0 ? (
    "No Todos Available! Add todos..."
  ) : isSuccess ? (
    todos.map((item) => (
      <div key={item.id} className="border rounded p-3 mb-2">
        <Task
          id={item.id}
          task={item.taskName}
          completed={item.completed}
          data={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    ))
  ) : isError ? (
    <div>{error}</div>
  ) : null;

  return (
    <div className="col-11 col-md-10 col-lg-6 mx-auto">
      <form
        className="d-flex justify-content-center mt-5 mb-3"
        onSubmit={submit}
      >
        <input
          className="form-control me-2"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div>{showTodos}</div>
    </div>
  );
};

export default Todo;
