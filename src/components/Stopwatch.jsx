import { useEffect, useState } from "react";
import ClockText from "@/components/ClockText";
import ClockStatus from "@/components/ClockStatus";
import { TimeDuration } from "@/lib/timer";
import { Button } from "@/components/ui/button";
import { Play, Pause, TimerReset, Coffee, Trees } from "lucide-react";

const Stopwatch = () => {
  const [time, setTime] = useState(() => new TimeDuration());
  const [startTime, setStartTime] = useState(0);
  const [breakEndTime, setBreakEndTime] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);
  const [pauseStartTime, setPauseStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [mode, setMode] = useState("work");

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    if (mode === "work") {
      const interval = setInterval(() => {
        setTime(new TimeDuration(startTime, Date.now()));
      }, 500);

      return () => {
        console.log("clean");
        clearInterval(interval);
      };
    }
    if (mode === "break") {
      const interval = setInterval(() => {
        setTime(new TimeDuration(Date.now(), breakEndTime));
      }, 500);
      return () => {
        console.log("clean");
        clearInterval(interval);
      };
    }
  }, [mode, isRunning, startTime, breakEndTime]);

  useEffect(() => {
    if (mode === "break" && time.getElapsed() <= 600) {
      setMode("work");
      setStartTime(Date.now());
      setBreakDuration(0);
    }
  }, [time, mode]);

  function handlePausePlay() {
    if (!isStarted) {
      setStartTime(Date.now());
      setIsStarted(true);
      setIsRunning(true);
      return;
    }

    // Changing to Pause
    if (isRunning) {
      setIsRunning(false);
      setPauseStartTime(Date.now());
    }

    //Changing to Play
    if (!isRunning) {
      setIsRunning(true);

      if (mode === "work") {
        setStartTime((prev) => Date.now() - (pauseStartTime - prev));
      }

      if (mode === "break") {
        setBreakEndTime((prev) => prev + (Date.now() - pauseStartTime));
      }

      setPauseStartTime(0);
    }
  }

  function handleReset() {
    setIsRunning(false);
    setIsStarted(false);
    setBreakDuration(0);
    setMode("work");
    setTime(new TimeDuration());
  }

  function handleChangeMode(breakLength = "short") {
    // work going to break
    if (mode === "work") {
      setMode("break");
      let breakFactor = 0.2;
      if (breakLength === "long") {
        breakFactor = 1;
      }

      const newbreakEndTime =
        Date.now() + time.getElapsed() * breakFactor + breakDuration;
      setBreakEndTime(newbreakEndTime);
      setTime(new TimeDuration(Date.now(), newbreakEndTime));
    }

    // break going to work
    if (mode === "break") {
      setMode("work");
      if (time.getElapsed() > 0) {
        setBreakDuration(time.getElapsed());
      }
      setStartTime(Date.now());
      setTime(new TimeDuration());
    }
  }

  return (
    <div className='clock m-auto flex flex-col items-center justify-center'>
      <ClockStatus mode={mode} />
      <ClockText time={time} mode={mode} />
      {/* <h2>{breakDuration / 1000}</h2> */}

      <div className='clock-controls space-x-3 py-5'>
        <Button
          id='play-button'
          className='h-12 w-12'
          onClick={handlePausePlay}
          size='icon'
          variant='outline'
        >
          {!isRunning ? <Play /> : <Pause />}
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
          disabled={
            mode === "work" && breakDuration + time.getElapsed() < 1000 * 30
          }
          onClick={handleChangeMode}
          size='icon'
        >
          <Coffee />
        </Button>

        <Button
          disabled={breakDuration + time.getElapsed() < 1000 * 60}
          size='icon'
          className='h-12 w-12'
          onClick={() => handleChangeMode("long")}
        >
          <Trees />
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
