import PropTypes from "prop-types";

const ClockText = (props) => {
  const { time } = props;

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return (
    <p className='clock-text'>
      <span className='time-text px-2 align-middle font-mono text-5xl'>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </p>
  );
};

ClockText.propTypes = {
  time: PropTypes.number.isRequired,
};

export default ClockText;
