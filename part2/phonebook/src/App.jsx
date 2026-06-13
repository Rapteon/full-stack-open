import { useState } from "react";

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKey, setFilterKey] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasName = (persons, name) =>
      persons.map((person) => person.name).includes(name);

    if (hasName(persons, newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }),
      );
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with
        <input
          type="text"
          value={filterKey}
          onChange={(e) => setFilterKey(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
          <input
            type="tel"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(filterKey.toLocaleLowerCase()),
        )
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default App;
