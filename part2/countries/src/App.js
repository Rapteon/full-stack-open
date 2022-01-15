import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryDisplay = ({countries, ready}) => {
	if (!ready) {
		return <p></p>
	}
	else if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>
	}
	else if (countries.length === 1) {
		return (
			<div>
				<h1>{countries[0].name.common}</h1>
				capital {countries[0].capital.map(cap => <span key={cap}>{cap} </span>)}
				<p>population {countries[0].population}</p>
				<h2>languages</h2>
				<ul>
				{
					Object.keys(countries[0].languages).map(lang =>
						<li key={lang}>{countries[0].languages[lang]}</li>)
				}
				</ul>
				<h1>{countries[0].flag}</h1>
			</div>
		)
	}
	else {
		return (
			<div>
				{
					countries.map(country =>
						<p key={country.name.common}>{country.name.common}</p>
					)
				}
			</div>
		)
	}
}

const App = () => {
  const [countries, setCountries] = useState([])
	const [results , setResults] = useState([])

	/*
	 * The setReady() hook is used to avoid showing
	 * 'Too many matches...' message when no search
	 * has been made.
	 * */
	const [ready, setReady] = useState(false)

  const searchHook = () => {
    axios
      .get('http://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
				setResults(response.data)
      })
  }

  useEffect(searchHook, [])

  const searchCountry = (event) => {
		event.preventDefault()
		setReady(true)
	  if (event.target.value === '') {
			setResults(countries)
		}
	  else {
			const filtered = countries.filter(country => {
				return country.name.common.match(new RegExp(event.target.value, 'i'))	
			})
			setResults(filtered)
		}
  }

  return (
    <div>
      find countries <input onInput={searchCountry}/>
			<CountryDisplay countries={results} ready={ready}/>	
    </div>
  )
}

export default App;
