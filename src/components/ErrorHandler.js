const ErrorHandler = (props) => {
  try {
    return props.children;
  } catch (error) {
    return <h3>Error occured</h3>;
  }
};

export default ErrorHandler;
