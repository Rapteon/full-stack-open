import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherHolder = ({city}) => {
	const [temp, setTemp] = useState(0)
	const [wind, setWind] = useState("")
	const [iconURL, setIconURL] = useState("")	//Didn't know what to put for an icon.

	const updateWeather = () => {
		console.log(city)
		//http://localhost:3002/weather
		console.log('Getting weather...')
		console.log(`Location ${city}`)
		axios
			.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
			.then(response => {
				console.log('Weather ready.')
				console.log(response.data)
				setTemp(`${response.data.main.temp} degree Celsius`)
				setWind(`speed ${response.data.wind.speed} km/hr, ${response.data.wind.deg} degrees`)
				console.log(`${response.data.weather[0].icon}`)
				setIconURL(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
			})
	}

	useEffect(updateWeather, [])
	return (
		<div>
			<h3>Weather in {city}</h3>
			<img src={iconURL}/>
			<h4>temperature {temp}</h4>
			<h4>wind {wind}</h4>
		</div>
	)
}
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
			{/*passing country.capital[0] because some countries have many capitals*/}
			<WeatherHolder city={country.capital[0]}/>
		</div>
	)
}

const CountryDisplay = ({countries, ready}) => {
	let selectedCountry = {}

	if (!ready) {
		console.log('Not ready')
		return <p></p>
	}
	else if (countries.length >= 10) {
		console.log('Too many matches')
		return <p>Too many matches, specify another filter</p>
	}
	else if (countries.length > 1) {
		console.log('countries > 1')
		return (
			<div>
				{
					countries.map(country =>
							<p key={country.name.common}>{country.name.common}
								<button key={country.name.common} onClick={(event) => {
									event.preventDefault()
									console.log('Result:', country)
								}}>show</button>
							</p>
					)
				}
				<CountryHolder country={selectedCountry}/>
			</div>
		)
	}
	else if (countries.length === 1) {
		return <CountryHolder country={countries[0]}/>
	}
	else {
		console.log('No countries')
		return <p>No countries found</p>
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
		//'http://restcountries.com/v3.1/all'
		//'http://localhost:3001/countries'
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        setCountries(response.data)
				setResults(response.data)
				setReady(ready)
				console.log('Ready')
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
	
	const resetSearchField = (event) => {
		event.preventDefault()
		setReady(false)
	}
  return (
    <div>
      find countries <input onInput={searchCountry} onBlur={resetSearchField}/>
			<CountryDisplay countries={results} ready={ready}/>	
    </div>
  )
}

export default App;
