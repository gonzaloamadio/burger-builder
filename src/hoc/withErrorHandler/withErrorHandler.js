// HOC component, that will wrap a component that should have this error handling.
import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

// Essentially is a class factory. withErrorHandler create these classes.
// Could be a functional component with useEffect.
// As argument takes: The wrapped component, and the axios intance.
// The axios instance which was used  a global error handler on it.
const withErrorHandler = (WrappedComponent, axios) => {
  // Anonymus class, we do not use it anywhere else.
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={clearError}>
          {/* As modal is always present (it is only outside viewport),
                        we have to check if there is message to show, if not will give error. */}
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
