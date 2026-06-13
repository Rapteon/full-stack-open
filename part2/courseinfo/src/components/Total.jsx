const Total = ({ parts }) => {
  const sum = parts.reduce(
    (startingSum, part) => startingSum + part.exercises,
    0,
  );
  return <p>Number of exercises {sum}</p>;
};

export default Total;
