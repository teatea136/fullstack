import React, { useState, useEffect } from "react"
import countryService from './services/country' 

const Filter = (props) => {
  return (
    <div>
    find countries <input 
    value={props.filter}
    onChange={props.handleFilter}/>
    </div>
  )
}

const CountryName = (props) => {
  return (
    <div>
      {props.country.name}
    </div>
  )
}

const CountryInfo = (props) => {
  
  return (
    <div>
      <h1>{props.c.name}</h1>
      <p>capital {props.c.capital}</p>
      <p>population {props.c.population}</p>
      <h2>languages</h2>
      <ul>
        {props.c.languages.map(language => <li>{language.name}</li>)}
      </ul>
      <img src={props.c.flag} alt="flagPhoto" width="10%" ></img>
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
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter(item => item.name.toUpperCase().includes(event.target.value.toUpperCase())))
  }


  const handleContent = () => {
    if (filteredCountries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map((name, index) => <CountryName key={index} country={name} />)}
        </div>
        )
    } else if (filteredCountries.length === 1) {
      return (
        <div>
          {filteredCountries.map((c, index) => <CountryInfo key={index} c={c} />)}
        </div>
        )
    } else if (filteredCountries.length === '') {
      return (
        null
      )
    } else { 
      return (
        <div>
        {console.log(filteredCountries.length)}
      </div>
      )
    }
  }
  
  return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      
      {handleContent()}
    </div>
  )
}

export default App
