const Total = ({ parts }) => {
  const sum = parts.reduce(
    (startingSum, part) => startingSum + part.exercises,
    0,
  );
  return <strong>total of {sum} exercises</strong>;
};

export default Total;
