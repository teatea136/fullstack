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

const Notification = ({ message }, {type}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState('something was done right')

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
  }

  const handleUpdateNumber = (id, name, newNumber) => {

    persons.forEach((item) => {
      name === item.name ? window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`) ? dothething : console.log('change canceled') : console.log('no update needed')
    })
  }

  const dothething = (id, newNumber) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: newNumber}

    personService
      .update(id, changedPerson) 
      .then(returnedPerson => {
      setPersons(persons.map(p => p.id !== id ? p : returnedPerson))}) 
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
      setConfirmMessage(
        `The information of ${returnedPerson.name} was added to the server`
      )
      setTimeout(() => {
        setConfirmMessage(null)
      }, 5000) 
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

  const handleDeleteClick = (id) => {
    const person = persons.find(p => p.id === id)
    console.log(person)
    window.confirm(`Delete ${person.name}`) ? 
    personService
      .deletion(id)
      .then(returnedPerson => {
        setConfirmMessage(
          `The information of ${returnedPerson.name} was deleted from the server`
        )
        setTimeout(() => {
          setConfirmMessage(null)
        }, 5000) 
      })
      .catch(error => {
        setErrorMessage(
          `${person.name} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000) 
      })
    : console.log('delete canceled') 
      
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmMessage} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <AddPerson addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>
      <h2>Numbers</h2>
      {showAll ? persons.map(name => <Person key={name.id} person={name} handleDeleteClick={() => handleDeleteClick(name.id)}/> ) : filteredPersons.map(name => <Person key={name.id} person={name} handleDeleteClick={() => handleDeleteClick(name.id)}/> )}
      
    </div>
  )
}

export default App
