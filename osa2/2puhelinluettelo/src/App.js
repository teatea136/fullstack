import React, { useState, useEffect } from 'react'
import personService from './services/person' 
import './index.css'

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

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.type}>
      {props.message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ messageType, setMessageType ] = useState(null)
  const [ message, setMessage ] = useState(null)

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
      event.target.value === item.name ? window.alert(`${event.target.value} is already added to phonebook`) : (console.log('no same numbers'))
    })
  }
    
  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
    persons.forEach((item) => {
      event.target.value === item.number ? window.alert(`${event.target.value} is already added to phonebook`) : (console.log('no same numbers'))
    })
  }

  const handleUpdateNumber = (id, updateNumber) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: updateNumber}

    personService
      .update(id, changedPerson) 
      .then(returnedPerson => {
      setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
      setMessageType("confirm")
      setMessage(
        `The information of ${returnedPerson.name} was updated to the server`
      )
      
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
      }) 
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    console.log(personObject);

    persons.some(e => e.name === newName) ?
    persons.forEach((item) => {
      newName === item.name ? 
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ? 
        handleUpdateNumber(item.id, newNumber)
        : console.log("user didnt change number") 
      : console.log("nope")
    })
    :
    personService
    .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(
          `The information of ${returnedPerson.name} was added to the server`
        )
        setMessageType("confirm")
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000) 
      })

    setNewName('')
    setNewNumber('')
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
        setMessage(
          `The information was deleted from the server`
        )
        setMessageType("confirm")
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000) 
      })
      .catch(error => {
        setMessage(
          `${person.name} was already removed from server`
        )
        setMessageType("error")
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000) 
      })
    : console.log('delete canceled') 
      
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <AddPerson addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>
      <h2>Numbers</h2>
      {showAll ? persons.map(name => <Person key={name.id} person={name} handleDeleteClick={() => handleDeleteClick(name.id)}/> ) : filteredPersons.map(name => <Person key={name.id} person={name} handleDeleteClick={() => handleDeleteClick(name.id)}/> )}
      
    </div>
  )
}

export default App
