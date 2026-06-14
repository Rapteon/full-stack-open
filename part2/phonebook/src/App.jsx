import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonService from "./services/person";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKey, setFilterKey] = useState("");
  useEffect(() => {
    PersonService.getPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleAddPerson = (person) => {
    const hasName = (persons, name) =>
      persons.map((person) => person.name).includes(name);

    if (hasName(persons, person.name)) {
      alert(`${person.name} is already added to the phonebook`);
    } else {
      PersonService.addPerson(person).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
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
