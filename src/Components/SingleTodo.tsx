import React, { useState } from "react";
import { TodoType } from "../model";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";

interface singleProps {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const SingleTodo = ({ todo, setTodos, todos }: singleProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, todo: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    setEditTodo("");
  };

  return (
    <form className="single_form">
      {editTodo ? (
        <input
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="single_todo">{todo.todo}</s>
      ) : (
        <span className="single_todo">{todo.todo}</span>
      )}

      <div className="icon_btn">
        <span
          // className="icon"
          // onClick={() => {
          //   if (!edit && !todo.isDone) {
          //     setEdit(!edit);
          //   }
          // }}
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            handleEdit(todo.id, todo.todo)
          }
        >
          <EditIcon />
        </span>
        <span className="icon" onClick={(e) => handleDelete(todo.id)}>
          <DeleteForeverIcon />
        </span>
        <span className="icon" onClick={(e) => handleDone(todo.id)}>
          <DoneIcon />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
