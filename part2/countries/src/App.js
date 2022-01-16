import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryHolder = ({country}) => {
	if (Object.keys(country).length === 0)
		return <p></p>
	return (
		<div>
			<h1>{country.name.common}</h1>
			capital {country.capital.map(cap => <span key={cap}>{cap} </span>)}
			<p>population {country.population}</p>
			<h2>languages</h2>
			<ul>
			{
				Object.keys(country.languages).map(lang =>
					<li key={lang}>{country.languages[lang]}</li>)
			}
			</ul>
			<h1>{country.flag}</h1>
		</div>
	)
}

const CountryDisplay = ({countries, ready, setSelected}) => {
	if (!ready) {
		console.log('Not ready')
		return <p></p>
	}
	else if (countries.length > 10) {
		console.log('Too many matches')
		return <p>Too many matches, specify another filter</p>
	}
	else if (countries.length >= 1) {
		console.log('countries < 10 && countries > 1')
		return (
			<div>
				{
					countries.map(country =>
							<p key={country.name.common}>{country.name.common}
								<button key={country.name.common} onClick={(event) => {
									setSelected(country);
								}}>show</button>
							</p>
					)
				}
			</div>
		)
	}
	else {
		console.log('No countries')
		setSelected({})
		return <p>No countries found</p>
	}
}

const App = () => {
  const [countries, setCountries] = useState([])
	const [results , setResults] = useState([])
	const [selectedCountry, setSelectedCountry] = useState({})

	/*
	 * The setReady() hook is used to avoid showing
	 * 'Too many matches...' message when no search
	 * has been made.
	 * */
	const [ready, setReady] = useState(false)

  const searchHook = () => {
		//'http://restcountries.com/v3.1/all'
		//'http://localhost:3001/countries'
    axios
      .get('http://localhost:3001/countries')
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
			<CountryDisplay countries={results} ready={ready} setSelected={setSelectedCountry}/>	
			<CountryHolder country={selectedCountry}/>
    </div>
  )
}

export default App;
