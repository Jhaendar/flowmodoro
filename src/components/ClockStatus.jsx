import PropTypes from "prop-types";
import { Hourglass, Coffee } from "lucide-react";

const ClockStatus = (props) => {
  const { isWorkMode } = props;

  return (
    <div className='clock-status flex flex-row items-center space-x-2'>
      {isWorkMode ? (
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
  isWorkMode: PropTypes.bool.isRequired,
};

export default ClockStatus;
