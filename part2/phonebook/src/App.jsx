import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonService from "./services/person";
import Notification from "./components/Notification";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [notification, setNotification] = useState(null);

  const NOTIFICATION_DELAY = 5000;

  useEffect(() => {
    PersonService.getPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const displayNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, NOTIFICATION_DELAY);
  };
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
          displayNotification(`Updated ${person.name}`);
          setPersons(
            persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
          );
        });
      }
    } else {
      PersonService.addPerson(person).then((newPerson) => {
        displayNotification(`Added ${person.name}`);
        setPersons(persons.concat(newPerson));
      });
    }
  };

  const handleDeletePerson = (person) => {
    const hasConfirmed = window.confirm(`Delete ${person.name}?`);
    if (hasConfirmed) {
      PersonService.deletePerson(person.id).then(() => {
        displayNotification(`Deleted ${person.name}`);
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
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
