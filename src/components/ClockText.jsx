import PropTypes from "prop-types";
import { TimeDuration } from "@/lib/timer";

const ClockText = ({ time, mode }) => {
  let { hours, minutes, seconds } = time.getTimeComponents();
  let breakStyle = "text-green-500";

  return (
    <p className='clock-text'>
      <span
        className={`time-text px-2 align-middle font-mono text-5xl ${mode === "break" ? breakStyle : ""}`}
      >
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </p>
  );
};

ClockText.propTypes = {
  time: PropTypes.instanceOf(TimeDuration),
  mode: PropTypes.string.isRequired,
};

export default ClockText;
