import { memo } from "react";
import { Hourglass, Coffee } from "lucide-react";
import { useSelector } from "react-redux";
import { TIMER_MODE } from "@/lib/constants";

const ClockStatus = memo(() => {
  const mode = useSelector((state) => state.timer.mode);

  return (
    <div className='flex items-center justify-center'>
      {mode === TIMER_MODE.WORK ? (
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
});

ClockStatus.displayName = "ClockStatus";

export default ClockStatus;
