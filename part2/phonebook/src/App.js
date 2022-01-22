import React, { useState, useEffect } from 'react'
import dbHandler from './services/persons'
import Notification from './components/Notification'

/**
 * filter = function used to filter items.
 * items = array containing the object to be filtered.
 * updater = a react hook function to update the UI
 */
 const Search = ({filter, items, updater}) => {
  return (
    <input onChange={event => updater(filter(event.target.value, items))}/>
  )
}

const notify = (message, messageModifier, isError, isErrorModifier) => {
  messageModifier(message)
  isError
    ? isErrorModifier(true)
    : isErrorModifier(false)
  
  setTimeout(() => {
      messageModifier(null)
      isErrorModifier(false)
  }, 5000)
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, submitter}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={ (event) => setNewName(event.target.value)}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={ (event) => setNewNumber(event.target.value)}/>
      </div>
      <div>
        <button type="submit" onClick={submitter}>add</button>
      </div>
    </form>
  )
}

const People = ({searchPersons, persons, setPersons, messageModifier, isErrorModifier}) => {
  const deletePerson = (event) => {
    // window.confirm() returns true if OK is selected, else false by default.
    const personToDelete = persons.find(person => person.id === parseInt(event.target.value)).name
    if (window.confirm(`Delete ${personToDelete}?`)) {
      dbHandler
        .del(parseInt(event.target.value))
        .then(response => {
          // We don't receive a usable response. Got an empty object.
          setPersons(persons.filter(person => person.id !== parseInt(event.target.value)))
        })
        .then(() => {
          notify(`Deleted ${personToDelete}`, messageModifier, false, isErrorModifier)
        })
        .catch(error => {
          notify(`Information of {personToDelete} has already been removed from server`, messageModifier, true, isErrorModifier)
        })
    }
  }
  return (
    searchPersons.length === 0
      ? persons.map(person => <p key={person.name}>{person.name} {person.number}<button value={person.id} onClick={deletePerson}>delete</button></p>)
      : searchPersons.map(person => <p key={person.name}>{person.name} {person.number}<button>delete</button></p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const loadPersons = () => {
    dbHandler
      .getAll()
      .then(persons => setPersons(persons))
  }

  useEffect(loadPersons, [])
  
  const addNewPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length !== 0) {
      const confirmMessage = `${newName} is already added to the phonebook. Replace the old number with a new one?`
      if (window.confirm(confirmMessage)) {
        dbHandler
          .update({name: newName, number: newNumber}, persons.find(person => person.name === newName).id)
          .then(response => setPersons(persons.filter(person => person.name !== newName).concat(response)))
          .then(() => {
            notify(`Updated ${newName}`, setNotificationMessage, false, setIsError)
          })
          .catch(error => {
            notify(`Information of ${newName} has already been removed from the server`, setNotificationMessage, true, setIsError)
          })
      }
    }
    else {
      dbHandler
        .add({name: newName, number: newNumber})
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(() => {
          notify(`Added ${newName}`, setNotificationMessage, false, setIsError)
        })
        .catch(error => {
          notify(`${newName} could not be added to server`, setNotificationMessage, true, setIsError)
        })
    }
    setNewName('')
    setNewNumber('')
    setSearchResults([])
  }
  const filterPeople = (name, persons) => {
    return persons.filter(person => person.name.match(new RegExp(`${name}`, 'i')))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError}/>
      <h2>Search</h2>
      <div>
          filter shown with: 
          <Search filter={filterPeople} items={persons} updater={setSearchResults} />
      </div>
      <PersonForm newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        submitter={addNewPerson}/>
      <h2>Numbers</h2>
      <People
        searchPersons={searchResults}
        persons={persons}
        setPersons={setPersons}
        messageModifier={setNotificationMessage}
        isErrorModifier={setIsError}/>
    </div>
  )
}

export default App