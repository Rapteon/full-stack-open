const Notification = ({ message }) => {
  const style = {
    border: "2px solid green",
    backgroundColor: "lightgrey",
    color: "green",
    padding: 10,
  };
  return message === null ? null : <p style={style}>{message}</p>;
};

export default Notification;
