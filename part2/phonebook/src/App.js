import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={ (event) => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={ (event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length !== 0 ? persons.map(person => <p key={person.name}>{person.name} {person.number}</p>) : "..."}
      {/* ... */}
    </div>
  )
}

export default App