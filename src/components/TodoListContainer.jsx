import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

import TodoItem from "./TodoItem";

import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "@/features/todos/todosSlice";

function TodoListContainer() {
  const todos = useSelector((state) => state.todos.todos);
  const workStartTime = useSelector((state) => state.timer.workStartTime);

  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  function handleAddTodo() {
    dispatch(
      addTodo({ content: newTodo, isFinished: false, isEditing: false })
    );
    setNewTodo("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-2 flex'>
          <Input
            type='text'
            placeholder='Add a new todo'
            className='mr-2 h-8 flex-grow bg-gray-700 text-sm text-white'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <Button
            className='h-8 w-8 bg-purple-600 p-0 hover:bg-purple-700'
            onClick={handleAddTodo}
            disabled={!newTodo}
          >
            <Plus className='h-6 w-6' />
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          {todos &&
            Object.values(todos).map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoListContainer;
