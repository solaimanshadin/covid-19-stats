import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Stats from './Components/Stats/Stats';

function App() {
  
  const [countries, setCountry] = useState([]);
  const [worldWideStat,setWorldWideStat] = useState({});
  const [countryStat , setCountryStat] = useState({
    alpha3Code:"BGD",
    countryName: "Bangladesh",
    err: false,
  });

    useEffect(() => {
        fetch("https://covid19.mathdro.id/api")
        .then(res => res.json())
        .then(json => {
            const newData = {...worldWideStat};
            newData.infected = json.confirmed.value;
            newData.deaths = json.deaths.value;
            newData.recovered = json.recovered.value;
            setWorldWideStat(newData)
            console.log(newData)
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
      fetch("https://covid19.mathdro.id/api/countries/BGD")
      .then(res => res.json())
      .then(json => {
          const newData = {...countryStat};
          newData.infected = json.confirmed.value;
          newData.deaths = json.deaths.value;
          newData.recovered = json.recovered.value;
          setCountryStat(newData)
          console.log(newData)
      })
      .catch(err => console.log(err))
   },[])
    
  const countryChange = e => {
      const countryCode = e.target.value;
      fetch("https://covid19.mathdro.id/api/countries/"+countryCode)
      
      .then(res=> res.json())
      .then(json=> {
            const newData = {...countryStat};
            newData.infected = json.confirmed.value;
            newData.deaths = json.deaths.value;
            newData.recovered = json.recovered.value;
      
            newData.err = false;
            fetch("https://restcountries.eu/rest/v2/alpha/"+countryCode)
            .then(res=>res.json())
            .then(json => {
              newData.countryName = json.name;
              setCountryStat(newData);

            })
      })
      .catch(err=> {
        const newData = {...countryStat};
        newData.err = true;
        setCountryStat(newData);
      })
  }
  useEffect(()=>{
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res=> res.json())
    .then(json=> setCountry(json))
    .catch(err=> console.log(err))
  },[])

  
  return (
    <div className="App">
      <Header></Header>
      <Stats data={worldWideStat}>
        <h4>World Wide</h4>
      </Stats>
      <Stats data={countryStat}>
        <div className="country-selector">
          <h4>Statistic of {countryStat.countryName}</h4>
          <select style={{height:"40px"}} onChange={countryChange} id="">
            {
              countries.map(country => <option 
                selected={ country.alpha3Code === "BGD" && "Selected"}
                
                value={country.alpha3Code}>
                  {country.name}</option>)
            }
          </select>
          {countryStat.err && <p style={{color:"red"}}>Something Went Wrong for this Country Stats... </p>}
        </div>
      </Stats>
    </div>
  );
}

export default App;
