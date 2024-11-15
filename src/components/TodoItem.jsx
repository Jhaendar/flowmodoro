import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { XIcon, CheckIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  setTodoIsEditing,
  setTodoIsFinished,
  updateTodo,
} from "@/features/todos/todosSlice";

function TodoItem({ todo }) {
  const { id, content, isFinished, isEditing } = todo;
  const dispatch = useDispatch();

  function handleDeleteTodo() {
    dispatch(deleteTodo({ id }));
  }

  function handleUpdateTodo(content) {
    dispatch(updateTodo({ id, content, isEditing: false }));
    dispatch(setTodoIsEditing({ id, isEditing: false }));
  }
  function handleToggleTodoIsFinished() {
    dispatch(setTodoIsFinished({ id, isFinished: !isFinished }));
  }

  function handleStartEditing() {
    dispatch(setTodoIsEditing({ id, isEditing: true }));
  }

  function handleCancelEditing() {
    dispatch(setTodoIsEditing({ id, isEditing: false }));
  }

  return (
    <div className='flex w-full items-center gap-2 border-b border-gray-700 p-2'>
      <Checkbox
        checked={isFinished}
        onCheckedChange={() => handleToggleTodoIsFinished()}
        className='ml-2 mr-2'
      />
      {isEditing ? (
        <Input
          data-id={id}
          type='text'
          defaultValue={content}
          className='mr-1 h-8 flex-grow bg-gray-600 text-sm text-white'
          onKeyPress={(e) =>
            e.key === "Enter" && handleUpdateTodo(e.currentTarget.value)
          }
        />
      ) : (
        <span
          className={`flex-grow truncate px-2 py-1 ${isFinished ? "text-gray-400 line-through" : ""}`}
        >
          {content}
        </span>
      )}
      <div className='flex items-center space-x-1 p-1'>
        {isEditing ? (
          <>
            <Button
              size='sm'
              className='h-6 w-6 bg-green-600 p-0 hover:bg-green-700'
              onClick={() =>
                handleUpdateTodo(
                  document.querySelector(`input[data-id="${id}"]`)?.value || ""
                )
              }
            >
              <CheckIcon className='h-3 w-3' />
            </Button>
            <Button
              size='sm'
              className='h-6 w-6 bg-red-600 p-0 hover:bg-red-700'
              onClick={() => handleCancelEditing()}
            >
              <XIcon className='h-3 w-3' />
            </Button>
          </>
        ) : (
          <>
            <Button
              size='sm'
              className='h-6 w-6 bg-blue-600 p-0 hover:bg-blue-700'
              onClick={() => handleStartEditing()}
            >
              <PencilIcon className='h-3 w-3' />
            </Button>
            <Button
              size='sm'
              className='h-6 w-6 bg-red-600 p-0 hover:bg-red-700'
              onClick={() => handleDeleteTodo()}
            >
              <Trash2Icon className='h-3 w-3' />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
