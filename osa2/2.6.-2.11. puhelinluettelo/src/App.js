import React, { useState } from 'react'

const Person = (props) => {
  return(
  <div>
    {props.person.name} {props.person.number}
  </div>
)}

const Filter = (props) => {
  return (
    <div>
    filter shown with <input 
    value={props.filter}
    onChange={props.handleFilter}/>
    </div>
)}

const AddPerson = (props) => {
  return (
  <form onSubmit={props.addPerson}>
  <div>
    name: <input 
    value={props.newName}
    onChange={props.handleAddName}/>
  </div>
  <div>
    number: <input 
    value={props.newNumber}
    onChange={props.handleAddNumber}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)}


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ filteredPersons, setFilteredPersons ] = useState([])

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    persons.forEach((item) => {
      event.target.value === item.name ? window.alert(`${event.target.value} is already added to phonebook`) : (console.log('no same names'))
    })
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
    persons.forEach((item) => {
      event.target.value === item.number ? window.alert(`${event.target.value} is already added to phonebook`) : (console.log('no same numbers'))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
    setFilteredPersons(persons.filter(item => item.name.toUpperCase().includes(event.target.value.toUpperCase()) || item.number.toUpperCase().includes(event.target.value.toUpperCase())))
    console.log(filteredPersons);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <AddPerson addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>
      <h2>Numbers</h2>
      {showAll ? persons.map(name => <Person person={name}/> ) : filteredPersons.map(name => <Person person={name}/> )}
    </div>
  )
}

export default App
