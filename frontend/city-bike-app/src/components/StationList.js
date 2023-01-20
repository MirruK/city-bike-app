import StationDetails from './StationDetails'

const StationList = ({stations, searchInput, setSelectedStation}) => {
    const bindJourney = (boundStation) => {
        return ()=>{
            const station = boundStation
            setSelectedStation(station);
            console.log("Selected station has been set to ", station)
        }
    }
    const limitListings = () => {
        const results = Object.values(stations).filter((val)=>
                val.nimi.includes(searchInput))
        if (results.length > 20){
            return (<p>Please specify your search</p>)
        }
        else if (searchInput !== "" && results.length <= 0){return (<p>No stations found.</p>)}
        else{
                return (
        <div>
            <ul>
            {results.map((val)=>{ 
                return(
                    <div>
                    <StationDetails extended={false} station={val}/>
                    <button onClick={bindJourney(val)}>Select</button>
                    </div>
                    )
                }
            )}
            </ul>
        </div>  
            )
        }
    }
    return limitListings()
}

export default StationList
