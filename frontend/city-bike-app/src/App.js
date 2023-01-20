import './App.css';
import SearchField from './components/SearchForm'
import StationList from './components/StationList'
import JourneyList from './components/JourneyList'
import SearchBar from './components/SearchBar'
import requests from './serverRequest'
import {useState, useEffect} from 'react';
import StationDetails from './components/StationDetails';

const App = () => {
    const [stations, setStations] = useState({}) 
    const [selectedStation, setSelectedStation] = useState({})
    const [searchInput, setSearchInput] = useState("")
    const [displayedJourneys, setDisplayedJourneys] = useState([])
    useEffect(()=>{ 
    const initStations = async() => {
        const data = await requests.getStations()
        if (data.status === 200){
            setStations(data.data)
            console.log("Stations initialized successfully")
            return 1
        }
        else{
            console.log("Get request for stations failed with status code: ", data.status)
            return 0
        }
    }
        initStations()
    },[])
    
    if (Object.keys(selectedStation).length > 0){
        return(
            <div className='center-container'>
            <button onClick={()=>{setSearchInput(""); setDisplayedJourneys([]); setSelectedStation({})}}>Back</button>
            <SearchField setSearchInput={setSearchInput} selectedStation={selectedStation} setDisplayedJourneys={setDisplayedJourneys}/>
            <StationDetails extended={true} station={selectedStation}/>
            <JourneyList journeys={displayedJourneys} />
            </div>
        )
    }
    else if (stations !== {}){
        return(
            <div className='center-container'>
                <SearchBar setSearchInput={setSearchInput} />
                <StationList stations={stations} searchInput={searchInput} setSelectedStation={setSelectedStation}/>
            </div>
        )
    }
    

    else{
    return(
        <div className='app-container'>
            <SearchField/>
            Loading stations...
        </div>
    )
    }
}

export default App;
