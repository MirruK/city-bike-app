const JourneyList = ({journeys}) => {
    return (
        <div>
            <ul>

                {Object.values(journeys).map((journey)=>{
                    return(
                        <li style={{listStyleType: "none"}}>
                            Time of departure: {journey.departure.slice(0,19)}<br/>
                            Time of return: {journey.return.slice(0,19)}<br/>
                            Departure Station ID: {journey.departure_station_id}<br/>
                            Return Station ID: {journey.return_station_id}<br/>
                            Journey Duration (sec): {journey.duration_sec}<br/>
                            Covered Distance (m): {journey.covered_distance_m}<br/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default JourneyList
