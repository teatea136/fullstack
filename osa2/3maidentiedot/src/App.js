import React, { useState, useEffect } from "react";

const Filter = (props) => {
  return (
    <div>
    find countries <input 
    value={props.filter}
    onChange={props.handleFilter}/>
    </div>
  )
}

const Content = (props) => {
  const content = null
  {props.countries.lenght} > 10 ?
  content = <p>Too many matches, specify another filter</p>
  :
  {props.countries.lenght} <= 10 && {props.countries.lenght} > 1?
  content = props.countries
  :
  {props.countries.lenght} === 1 ?
  content =
  <div>
    <h1>{props.countries.name}</h1>
    <p>capital {props.countries.capital}</p>
    <p>population {props.countries.population}</p>
    <h2>languages</h2>
    <ul>
      {props.countries.map(country => <li>{country.language}</li> )}
    </ul>
  </div>
  :
  console.log("no input")
  return (
    <div>
      {content}
    </div>
  )
}


const App = () => {
   const [countries, setCountries] = useState([])
   const [filter, setFilter] = useState('')
   const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
        .then(initialCountries => {
        setCountries(initialCountries)
        console.log(countries)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)

    countryService
    .getSome(filter)
    .then(returnedCountries => {
      setFilteredCountries(returnedCountries)
    })
      
    
  }

  return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Content countries={filteredCountries}/>
    </div>
  )
}

export default App;
