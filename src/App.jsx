import Stopwatch from "@/components/Stopwatch";

const App = () => {
  return (
    <>
      <div className=' space h-screen w-screen flex-auto flex-col justify-center'>
        <h1 className=' py-5 text-center text-3xl'>FLOWMODORO</h1>
        <Stopwatch />
      </div>
    </>
  );
};

export default App;
