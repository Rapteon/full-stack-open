import React, { useState } from 'react'

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

const People = ({searchPersons, persons}) => {
  return (
    searchPersons.length === 0
      ? persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      : searchPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const addNewPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
      setSearchResults([])
    }
  }
  const filterPeople = (name, persons) => {
    return persons.filter(person => person.name.match(new RegExp(`${name}`, 'i')))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search</h2>
      <div>
          filter shown with: 
          <Search filter={filterPeople} items={persons} updater={setSearchResults} />
      </div>
      <PersonForm newName={newName} newNumber={newNumber}
        setNewName={setNewName} setNewNumber={setNewNumber}
        submitter={addNewPerson}/>
      <h2>Numbers</h2>
      <People searchPersons={searchResults} persons={persons}/>
    </div>
  )
}

export default App