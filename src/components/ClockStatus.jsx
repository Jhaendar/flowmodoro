import PropTypes from "prop-types";
import { Hourglass, Coffee } from "lucide-react";

const ClockStatus = (props) => {
  const { mode } = props;

  return (
    <div className='clock-status flex flex-row items-center justify-center'>
      {mode === "work" ? (
        <>
          <Hourglass className='' />
          <p className='align-middle font-sans text-2xl'>WORK TIME</p>
          <Hourglass className='' />
        </>
      ) : (
        <>
          <Coffee />
          <p className='align-middle font-sans text-2xl'>BREAK TIME</p>
          <Coffee />
        </>
      )}
    </div>
  );
};

ClockStatus.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default ClockStatus;
