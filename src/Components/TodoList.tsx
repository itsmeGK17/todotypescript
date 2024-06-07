import { ReactNode } from "react";
import { TodoType } from "../model";
import "./todo.css";
import SingleTodo from "../Components/SingleTodo";

interface TodoProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoList: React.FC<TodoProps> = ({ todos, setTodos }: TodoProps) => {
  return (
    <div className="list_item">
      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
