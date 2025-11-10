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
import { MINIMUM_WORK_TIME_FOR_BREAK, BREAK_MODE, TIMER_MODE } from "@/lib/constants";

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
    if (newMode === TIMER_MODE.WORK) {
      dispatch(
        changeToWorkTimer({
          workStartTime: currentTime,
          workEndTime: currentTime,
        })
      );
    } else if (newMode === BREAK_MODE.SHORT) {
      dispatch(
        changeToBreakTimer({ breakStartTime: currentTime, breakMode: BREAK_MODE.SHORT })
      );
    } else if (newMode === BREAK_MODE.LONG) {
      dispatch(
        changeToBreakTimer({
          breakStartTime: currentTime,
          breakMode: BREAK_MODE.LONG,
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
        aria-label={status !== "running" ? "Start timer" : "Pause timer"}
      >
        {status !== "running" ? <Play /> : <Pause />}
      </Button>

      <Button
        id='reset-button'
        className='h-12 w-12'
        onClick={handleReset}
        size='icon'
        variant='outline'
        aria-label='Reset timer'
      >
        <TimerReset />
      </Button>

      <Button
        id='break-button'
        className='h-12 w-12'
        disabled={workEndTime - workStartTime < MINIMUM_WORK_TIME_FOR_BREAK || mode === TIMER_MODE.BREAK}
        onClick={() => handleChangeMode(mode === TIMER_MODE.BREAK ? TIMER_MODE.WORK : BREAK_MODE.SHORT)}
        size='icon'
        aria-label='Take short break'
      >
        <Coffee />
      </Button>

      <Button
        disabled={workEndTime - workStartTime < MINIMUM_WORK_TIME_FOR_BREAK || mode === TIMER_MODE.BREAK}
        size='icon'
        className='h-12 w-12'
        onClick={() => handleChangeMode(BREAK_MODE.LONG)}
        aria-label='Take long break'
      >
        <Trees />
      </Button>
    </div>
  );
}

export default ClockControls;
