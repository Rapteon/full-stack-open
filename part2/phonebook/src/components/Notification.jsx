const Notification = ({ message, isError }) => {
  const defaultStyle = {
    border: "2px solid green",
    backgroundColor: "lightgrey",
    color: "green",
    padding: 10,
  };
  const errorStyle = {
    ...defaultStyle,
    borderColor: "red",
    color: "red",
  };
  return message === null ? null : (
    <p style={isError ? errorStyle : defaultStyle}>{message}</p>
  );
};

export default Notification;
