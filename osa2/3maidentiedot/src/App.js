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
      {props.c.name}
      <button onClick={props.handleKlik} value={props.c.name}>show</button>
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
          {props.c.languages.map(language => <li key={language.id}>{language.name}</li>)}
        </ul>
        <img src={props.c.flag} alt="flagPhoto" width="10%" ></img>
      </div>
    )
}



const App = () => {
   const [countries, setCountries] = useState([])
   const [filter, setFilter] = useState('')
   const [filteredCountries, setFilteredCountries] = useState([])
   const [klik, setKlik] = useState('off')
   const [klikValue, setKlikValue] = useState('')
  

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
    setKlik('off')
  }

  const handleKlik = (event) => {
    setKlik('on')
    setKlikValue(event.target.value)
  }

  


  const handleContent = () => {
    if (filteredCountries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1 && klik !=='on') {
      return (
        <div>
          {filteredCountries.map((c) => <CountryName key={c.id} c={c} handleKlik={handleKlik} name={klikValue} />)}
        </div>
        )
    } else if (filteredCountries.length === 1) {
      return (
        <div>
          {filteredCountries.map((c) => <CountryInfo key={c.id} c={c}/> )}
        </div>
        )
    } else if (klik === "on") {
      return (
        <div>
          {filteredCountries.map((c) => klikValue === c.name ? <CountryInfo key={c.id} c={c}/> : console.log(klikValue))}
        </div>
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
