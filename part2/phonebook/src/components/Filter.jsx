const Filter = ({ filterKey, setFilterKey }) => {
  return (
    <>
      <div>
        filter shown with
        <input
          type="text"
          value={filterKey}
          onChange={(e) => setFilterKey(e.target.value)}
        />
      </div>
    </>
  );
};

export default Filter;
