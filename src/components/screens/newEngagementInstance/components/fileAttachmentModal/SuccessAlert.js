import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SuccessAlert = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="alert alert-success border border-success">
      <h5>
        <FontAwesomeIcon icon={['fas', 'check-circle']} />
        &ensp;Success!
      </h5>
      <p className="mb-0">Your attachment has been added successfully!</p>
    </div>
  );
};

export default SuccessAlert;
