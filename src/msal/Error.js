import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.object.isRequired
};

const Error = ({ error }) => {
  return (
    <div className="msal-error">
      <p>An authentication error occurred:</p>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};

Error.propTypes = propTypes;

export default Error;
