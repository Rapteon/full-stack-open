import Contact from "./Contact";

const Persons = ({ persons, filterKey, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(filterKey.toLocaleLowerCase()),
        )
        .map((person) => (
          <Contact
            key={person.id}
            person={person}
            onDelete={onDelete}
          ></Contact>
        ))}
    </>
  );
};

export default Persons;
