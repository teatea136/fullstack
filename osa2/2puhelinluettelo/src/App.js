import React, { useState, useEffect } from 'react'
import personService from './services/person' 

const Person = (props) => {
  return(
  <div>
    {props.person.name} {props.person.number} 
    <button onClick={props.handleDeleteClick}>delete</button>
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
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ filteredPersons, setFilteredPersons ] = useState([])

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })

  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
    setFilteredPersons(persons.filter(item => item.name.toUpperCase().includes(event.target.value.toUpperCase()) || item.number.toUpperCase().includes(event.target.value.toUpperCase())))
    console.log(filteredPersons);
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    const person = persons.find(p => p.id === event.target.id)

    window.confirm(`Delete ${person}`) ? 
    personService
      .deletion() 
    : console.log('canceled') 
      
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <AddPerson addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>
      <h2>Numbers</h2>
      {showAll ? persons.map(name => <Person person={name} handleDeleteClick={handleDeleteClick}/> ) : filteredPersons.map(name => <Person person={name} handleDeleteClick={handleDeleteClick}/> )}
      
    </div>
  )
}

export default App
