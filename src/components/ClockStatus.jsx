import { Hourglass, Coffee } from "lucide-react";

import { useSelector } from "react-redux";

const ClockStatus = () => {
  const mode = useSelector((state) => state.timer.mode);

  return (
    <div className='flex items-center justify-center'>
      {mode === "work" ? (
        <>
          <Hourglass className='' />
          <p className='font-sans text-2xl'>WORK TIME</p>
          <Hourglass className='' />
        </>
      ) : (
        <>
          <Coffee />
          <p className='font-sans text-2xl'>BREAK TIME</p>
          <Coffee />
        </>
      )}
    </div>
  );
};

export default ClockStatus;
