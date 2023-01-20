const JourneyList = ({journeys}) => {
    console.log("Journeys: ", journeys)
    return (
        <div>
            <ul>

                {Object.values(journeys).map((journey)=>{
                    return(
                        <li>
                            {journey.departure}
                            {journey.return}
                            {journey.departure_station_id}
                            {journey.return_station_id}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default JourneyList
