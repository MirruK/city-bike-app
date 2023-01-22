import requests from '../serverRequest'
import {useState, useEffect} from 'react'
import '../App.css'

const SearchForm = ({selectedStation, currentPage, setDisplayedJourneys}) => {
    const [lastQuery, setLastQuery] = useState({})
    const getNextPage = async() => {
        if (lastQuery === {}) return;
        const queries = {...lastQuery, page : currentPage}
        console.log("New Query with page: ", queries)
        const journeys = await requests.getFilteredJourneys(selectedStation, queries)
        if (journeys.status === 200) setDisplayedJourneys(journeys.data) 
        else console.log("Getting journeys failed with code: ", journeys.status)
        
    }
    useEffect(()=>{getNextPage()},[currentPage])
    const formSubmit = async(event) => {
        event.preventDefault()
        const queries = {
            sortBy : event.currentTarget.elements.sortBy.value,
            order : event.currentTarget.elements.order.value,
            rideType : event.currentTarget.elements.rideType.value,
            id : selectedStation.id
        }
        setLastQuery(queries)
        const journeys = await requests.getFilteredJourneys(selectedStation, queries)
        console.log("journeys res:", journeys)
        if (journeys.status === 200) setDisplayedJourneys(journeys.data) 
        else console.log("Getting journeys failed with code: ", journeys.status)
        
    }
    return(
        <div>
        <br/>
        <form className='input-field' onSubmit={formSubmit}>
        <label htmlFor="sortBy">Sort by:</label>
        <select id="cars" name="sortBy">
        <option value="">None</option>
        <option value="length">Distance travelled</option>
        <option value="time">Trip duration</option>
        <option value="returning">Return Date/Time</option>
        <option value="departing">Departure Date/Time</option>
        </select> 
        <label htmlFor="order">Order:</label>
        <select id="order by" name="order">
        <option value="empty">None</option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
        </select> <br/>
        <label htmlFor="rideType">Journey returns to/departs from station:</label>
        <select id="ride-type" name="rideType">
        <option value="empty">None</option>
        <option value="departing">Departing</option>
        <option value="returning">Returning</option>
        </select> <br/>
        <button>Apply Filters</button>
        </form>
        </div>
    )
}

export default SearchForm
