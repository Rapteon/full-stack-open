import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKey, setFilterKey] = useState("");

  const handleAddPerson = (person) => {
    const hasName = (persons, name) =>
      persons.map((person) => person.name).includes(name);

    if (hasName(persons, person.name)) {
      alert(`${person.name} is already added to the phonebook`);
    } else {
      setPersons(
        persons.concat({
          ...person,
          id: persons.length + 1,
        }),
      );
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterKey={filterKey} setFilterKey={setFilterKey}></Filter>
      <h2>add a new</h2>
      <PersonForm onAddPerson={handleAddPerson}></PersonForm>
      <Persons persons={persons} filterKey={filterKey}></Persons>
    </div>
  );
};

export default App;
