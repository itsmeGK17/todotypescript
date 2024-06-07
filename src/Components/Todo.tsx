import React, { FormEvent, useState } from "react";
import "./todo.css";
import AddIcon from "@mui/icons-material/Add";

interface TodoProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  setTodo,
  handleAddTodo,
}: TodoProps) => {
  // const handleAddTodo = () => {};

  return (
    <form onSubmit={(e) => handleAddTodo(e)} className="form-content">
      <input
        className="form_input"
        type="text"
        value={todo}
        placeholder="Add Item..."
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="btn btn-success  form_btn">
        <AddIcon />
      </button>
    </form>
  );
};

export default Todo;
