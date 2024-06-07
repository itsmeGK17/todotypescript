import { text } from "stream/consumers";
import "./App.css";
import Todo from "./Components/Todo";
import { useState } from "react";
import { TodoType } from "./model";
import TodoList from "./Components/TodoList";
import Todos from "./Components/Todos";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };
  // console.log("123456", todos);

  return (
    <div className="App">
      <span className="heading">React ToDo - TypeScript</span>

      {/* <Todo todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} setTodos={setTodos} /> */}
      <Todos/>
    </div>
  );
};

export default App;
