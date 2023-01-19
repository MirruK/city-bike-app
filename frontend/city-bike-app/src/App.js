import './App.css';
import SearchField from './components/SearchForm';
import StationList from './components/StationList';
import {useState, useEffect} from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api'

const App = () => {
    const [stations, setStations] = useState({}) 
    const [searchInput, setSearchInput] = useState("")
    useEffect(()=>{ 
    const initStations = async() => {
        const data = await axios.get(`${baseURL}/stations`)
        if (data.status === 200){
            console.log(data.data)
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

    if (stations !== {}){
        return(
            <div>
                <SearchField searchInput={searchInput} setSearchInput={setSearchInput}/>
                <StationList stations={stations} searchInput={searchInput}/>
            </div>
        )
    }
    

    else{
    return(
        <div>
            <SearchField/>
            Loading stations...
        </div>
    )
    }
}

export default App;
