import { useState, memo } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { XIcon, CheckIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  setTodoIsEditing,
  setTodoIsFinished,
  updateTodo,
} from "@/features/todos/todosSlice";

const TodoItem = memo(({ todo }) => {
  const { id, content, isFinished, isEditing } = todo;
  const dispatch = useDispatch();
  const [editValue, setEditValue] = useState(content);

  function handleDeleteTodo() {
    dispatch(deleteTodo({ id }));
  }

  function handleUpdateTodo() {
    dispatch(updateTodo({ id, content: editValue, isEditing: false }));
    dispatch(setTodoIsEditing({ id, isEditing: false }));
  }

  function handleToggleTodoIsFinished() {
    dispatch(setTodoIsFinished({ id, isFinished: !isFinished }));
  }

  function handleStartEditing() {
    setEditValue(content);
    dispatch(setTodoIsEditing({ id, isEditing: true }));
  }

  function handleCancelEditing() {
    setEditValue(content);
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
          type='text'
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className='mr-1 h-8 flex-grow bg-gray-600 text-sm text-white'
          onKeyDown={(e) => e.key === "Enter" && handleUpdateTodo()}
          autoFocus
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
              onClick={handleUpdateTodo}
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
});

TodoItem.displayName = "TodoItem";

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isFinished: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
