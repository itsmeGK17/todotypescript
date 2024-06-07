import React, { useEffect, useState } from "react";
import "./todo.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

interface TodoProps {
  id: number;
  text: string;
  isCheck: boolean;
}

const Todos: React.FC = () => {
  const [inputField, setInputField] = useState<string>("");
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("All");

  // const Swal = require("sweetalert2");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputField !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputField, isCheck: false },
      ]);
      setInputField("");
    } else {
      alert("plz enter Item");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCheck: !todo.isCheck };
        }
        return todo;
      })
    );
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditText(text);
    setEditId(id);
  };

  const handleSaveEdit = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: editText };
        }
        return todo;
      })
    );
    setEditId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const filterTodoTask = (value: string) => {
    setFilterType(value);
    setTodos(
      todos.filter((ele) => {
        if (value === "All") {
          return true;
        } else if (value === "Active") {
          return !ele.isCheck;
        } else if (value === "Complete") {
          return ele.isCheck;
        } else {
          return ele;
        }
      })
    );
  };

  const ClearAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    filterTodoTask(filterType);
  }, [filterType]);

  return (
    <div className="form-content">
      <form className="form_input" onSubmit={handleSubmit}>
        <input
          // variant="standard"
          type="text"
          value={inputField}
          placeholder="Add Item..."
          onChange={(e) => setInputField(e.target.value)}
        />
        <button type="submit" className="btn btn-success form_add">
          Add
        </button>
        <div className="todo_list">
          {todos.map((todo) => (
            <li key={todo.id}>
              {editId === todo.id ? (
                <>
                  <TextField
                    variant="standard"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <Tooltip title="Save" arrow placement="top">
                    <Button onClick={() => handleSaveEdit(todo.id)}>
                      <SaveIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Cancel" arrow placement="top">
                    <Button onClick={handleCancelEdit}>
                      <CancelIcon />
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.isCheck}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span
                    style={{
                      textDecoration: todo.isCheck ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                  <div className="form_btn">
                    <Tooltip title="Edit" placement="top" arrow>
                      <Button
                        className="btn_icon"
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" arrow>
                      <Button
                        className="btn_icon"
                        color="error"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </>
              )}
            </li>
          ))}
        </div>
        <Button onClick={() => filterTodoTask("All")}>All</Button>
        <Button onClick={() => filterTodoTask("Active")}>Active</Button>
        <Button onClick={() => filterTodoTask("Complete")}>Complete</Button>
        <Button onClick={ClearAll}>Clear All</Button>
      </form>
    </div>
  );
};

export default Todos;
