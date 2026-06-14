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
      const hasConfirmed = window.confirm(
        `${person.name} is already added to the phonebook, replace the old number with a new one?`,
      );
      if (hasConfirmed) {
        let personToUpdate = persons.find((p) => p.name === person.name);

        personToUpdate = { ...personToUpdate, number: person.number };

        PersonService.updatePerson(personToUpdate).then((updatedPerson) => {
          console.log(updatedPerson);

          setPersons(
            persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
          );
        });
      }
    } else {
      PersonService.addPerson(person).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
    }
  };

  const handleDeletePerson = (person) => {
    const hasConfirmed = window.confirm(`Delete ${person.name}?`);
    if (hasConfirmed) {
      PersonService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterKey={filterKey} setFilterKey={setFilterKey}></Filter>
      <h2>add a new</h2>
      <PersonForm onAddPerson={handleAddPerson}></PersonForm>
      <Persons
        persons={persons}
        filterKey={filterKey}
        onDelete={handleDeletePerson}
      ></Persons>
    </div>
  );
};

export default App;
