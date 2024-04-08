import { Button } from "@/components/ui/button";
import { Play, Pause, TimerReset, Coffee, Trees } from "lucide-react";
import PropTypes from "prop-types";

const ClockControls = ({
  isRunning,
  setIsRunning,
  isWorkMode,
  setIsWorkMode,
  time,
  setTime,
  breakTime,
  setBreakTime,
}) => {
  return (
    <div className='clock-controls space-x-3 py-5'>
      <Button
        id='play-button'
        className='h-12 w-12'
        onClick={() => {
          setIsRunning(!isRunning);
        }}
        size='icon'
        variant='outline'
      >
        {!isRunning ? <Play /> : <Pause />}
      </Button>

      <Button
        id='reset-button'
        className='h-12 w-12'
        onClick={() => {
          setBreakTime(breakTime + time * 0.2);
          setTime(0);
          setIsRunning(false);
          setIsWorkMode(true);
        }}
        size='icon'
        variant='outline'
      >
        <TimerReset />
      </Button>

      <Button
        className='h-12 w-12'
        disabled={!isWorkMode || breakTime + time * 0.2 < 60 * 5}
        id='break-button'
        onClick={() => {
          setIsWorkMode(!isWorkMode);
          setBreakTime(breakTime + time * 0.2);
          setIsRunning(true);
          setTime(0);
        }}
        size='icon'
      >
        <Coffee />
      </Button>

      <Button
        disabled={!isWorkMode || breakTime + time * 0.2 < 60 * 5}
        size='icon'
        className='h-12 w-12'
        onClick={() => {
          setIsWorkMode(!isWorkMode);
          setBreakTime(breakTime + time);
          setIsRunning(true);
          setTime(0);
        }}
      >
        <Trees />
      </Button>
    </div>
  );
};

ClockControls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  setIsRunning: PropTypes.func.isRequired,
  isWorkMode: PropTypes.bool.isRequired,
  setIsWorkMode: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
  breakTime: PropTypes.number.isRequired,
  setBreakTime: PropTypes.func.isRequired,
};

export default ClockControls;
