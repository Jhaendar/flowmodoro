import { Button } from "@/components/ui/button";
import { Play, Pause, TimerReset, Coffee, Trees } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  resetTimer,
  startTimer,
  resumeTimer,
  pauseTimer,
  timerRefresh,
  changeToWorkTimer,
  changeToBreakTimer,
} from "@/features/timer/timerSlice";

function ClockControls() {
  const workStartTime = useSelector((state) => state.timer.workStartTime);
  const workEndTime = useSelector((state) => state.timer.workEndTime);
  const mode = useSelector((state) => state.timer.mode);
  const status = useSelector((state) => state.timer.status);
  const dispatch = useDispatch();

  function handlePausePlay() {
    const currentTime = performance.now();
    if (status === "idle") {
      dispatch(
        startTimer({
          workStartTime: currentTime,
          workEndTime: currentTime,
        })
      );
      dispatch(timerRefresh());
    } else if (status === "running") {
      dispatch(pauseTimer({ pauseStartTime: currentTime }));
    } else if (status === "paused") {
      dispatch(resumeTimer({ pauseEndTime: currentTime }));
      dispatch(timerRefresh());
    }
  }

  function handleReset() {
    dispatch(resetTimer());
  }

  function handleChangeMode(newMode) {
    const currentTime = performance.now();
    if (newMode === "work") {
      dispatch(
        changeToWorkTimer({
          workStartTime: currentTime,
          workEndTim: currentTime,
        })
      );
    } else if (newMode === "break") {
      dispatch(
        changeToBreakTimer({ breakStartTime: currentTime, breakMode: "break" })
      );
    } else if (newMode === "long") {
      dispatch(
        changeToBreakTimer({
          breakStartTime: currentTime,
          breakMode: "long",
        })
      );
    }
  }

  return (
    <div className='space-x-3 py-5'>
      <Button
        id='play-button'
        className='h-12 w-12'
        onClick={handlePausePlay}
        size='icon'
        variant='outline'
      >
        {status != "running" ? <Play /> : <Pause />}
      </Button>

      <Button
        id='reset-button'
        className='h-12 w-12'
        onClick={handleReset}
        size='icon'
        variant='outline'
      >
        <TimerReset />
      </Button>

      <Button
        id='break-button'
        className='h-12 w-12'
        disabled={workEndTime - workStartTime < 5000 || mode === "break"}
        onClick={() => handleChangeMode(mode === "break" ? "work" : "break")}
        size='icon'
      >
        <Coffee />
      </Button>

      <Button
        disabled={workEndTime - workStartTime < 5000 || mode === "break"}
        size='icon'
        className='h-12 w-12'
        onClick={() => handleChangeMode("long")}
      >
        <Trees />
      </Button>
    </div>
  );
}

export default ClockControls;
