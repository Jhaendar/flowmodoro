import Stopwatch from "@/components/Stopwatch";
import TodoListContainer from "./components/TodoListContainer";

const App = () => {
  return (
    <>
      <div className='mt-5 flex w-screen flex-col items-center gap-2'>
        <Stopwatch />
        <TodoListContainer />
      </div>
    </>
  );
};

export default App;
