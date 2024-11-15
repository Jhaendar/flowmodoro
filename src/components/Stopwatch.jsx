import { useEffect, useState } from "react";
import ClockText from "@/components/ClockText";
import ClockStatus from "@/components/ClockStatus";
import { TimeDuration } from "@/lib/timer";
import { Button } from "@/components/ui/button";
import { Play, Pause, TimerReset, Coffee, Trees } from "lucide-react";
import useSound from "use-sound";
import chimeURL from "@/assets/Sounds/chime.mp3";
import changeModeURL from "@/assets/Sounds/changemode.mp3";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  resetTimer,
  startTimer,
  resumeTimer,
  pauseTimer,
  timerRefresh,
  changeToWorkTimer,
  changeToBreakTimer,
  updateWorkTimer,
  setMode,
  setStatus,
} from "@/features/timer/timerSlice";

const Stopwatch = () => {
  const workStartTime = useSelector((state) => state.timer.workStartTime);
  const workEndTime = useSelector((state) => state.timer.workEndTime);
  const breakStartTime = useSelector((state) => state.timer.breakStartTime);
  const breakEndTime = useSelector((state) => state.timer.breakEndTime);
  const mode = useSelector((state) => state.timer.mode);
  const status = useSelector((state) => state.timer.status);
  const dispatch = useDispatch();

  function getTime() {
    if (mode === "work") {
      return new TimeDuration(workStartTime, workEndTime);
    }
    if (mode === "break") {
      return new TimeDuration(breakStartTime, breakEndTime);
    }
  }
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

  const [playChangeMode] = useSound(changeModeURL, { volume: 0.5 });
  const [playChime] = useSound(chimeURL, { volume: 0.5 });

  return (
    <Card className='clock m-auto flex flex-col items-center justify-center'>
      <CardHeader>
        <CardTitle className='text-center text-3xl'>FLOWMODORO</CardTitle>
      </CardHeader>

      <CardContent>
        <ClockStatus mode={mode} />
        <ClockText time={getTime()} mode={mode} />

        <div className='clock-controls space-x-3 py-5'>
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
            onClick={() =>
              handleChangeMode(mode === "break" ? "work" : "break")
            }
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
      </CardContent>
    </Card>
  );
};

export default Stopwatch;
