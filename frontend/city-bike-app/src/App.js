import './App.css';
import SearchForm from './components/SearchForm'
import StationList from './components/StationList'
import JourneyList from './components/JourneyList'
import SearchBar from './components/SearchBar'
import StationDetails from './components/StationDetails';
import requests from './serverRequest'
import {useState, useEffect} from 'react';

const App = () => {
    const [stations, setStations] = useState({}) 
    const [selectedStation, setSelectedStation] = useState({})
    const [searchInput, setSearchInput] = useState("")
    const [displayedJourneys, setDisplayedJourneys] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
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
            <button onClick={()=>{setSearchInput(""); setDisplayedJourneys([]); setSelectedStation({}); setCurrentPage(0)}}>Back</button>
            <SearchForm currentPage={currentPage} selectedStation={selectedStation} setDisplayedJourneys={setDisplayedJourneys}/>
            <StationDetails extended={true} station={selectedStation}/>
            <JourneyList journeys={displayedJourneys} />
            <button onClick={()=>setCurrentPage(currentPage+1)}>Next Page</button>
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
            Loading stations...
        </div>
    )
    }
}

export default App;
