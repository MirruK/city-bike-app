import axios from "axios"

const baseURL = "http://localhost:3001"

const getFilteredJourneys = (selectedStation, queries) =>{
    const queryString = `${baseURL}/api/stations/${selectedStation.id}/journeys?sortBy=${queries.sortBy}&order=${queries.order}&page=${queries.page || "0"}`
    console.log("Axios GET request made with url: ", queryString)
    return axios.get(queryString)
}

const getStations = () => {
    console.log("Get request sent to: ", `${baseURL}/api/stations`)
    return axios.get(`${baseURL}/api/stations`)
}

export default {getFilteredJourneys, getStations};
