import { useState, useEffect } from "react";

export default axios => {
  const [error, setError] = useState(null);

  // DEPRECATED COMMENT, I LEAVE IT FOR INFORMATION
  // We use componentWillMount, but is deprecated. So instead,
  // we can do this in the constructor. The idea only is creating this
  // interceptors when the component is created.
  // If we do it in componentDidMount, that lifeCycle will be executed
  // AFTER all the child componentDidMount methods has finished. So if
  // in one of the children componentDidMount there is an error, this will never
  // be executed and set. This method is executed BEFORE children are rendered.
  // As we are registering interceptors and not caussing side effects, we can do it.
  // NEW COMMENT
  // As we want to execute this code to execute before jsx is rendered, we just leave it
  // outside any method, or useEffect hook
  const resInterceptor = axios.interceptors.response.use(
    res => res,
    err => {
      /* Set up axios listener. Set up global interceptor
        which allow us to handle errors.

        ARGS: 
            - response handler. Take res and return it.
            - Error obj, that is coming from API query.
          */
      setError(err);
    }
  );
  // When a req is sent, clear error.
  const reqInterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  useEffect(() => {
    return () => {
      // Remove/Unmount interceptors so they do not stay in memory
      // when ther are not needed anymore.
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmationHandler = () => {
    setError(null);
  };

  // return error, and a function to clear error
  return [error, errorConfirmationHandler];
};
