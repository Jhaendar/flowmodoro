import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="font-">Hello React</h1>
      <div>
        <button
          className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <Button>TEST</Button>
      </div>
    </>
  );
}

export default App;
