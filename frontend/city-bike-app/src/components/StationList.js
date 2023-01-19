const StationList = ({stations, searchInput}) => {
    const limitListings = () => {
        const results = Object.values(stations).filter((val)=>
                val.nimi.includes(searchInput))
        if (results.length > 10){
            return (<p>Please specify your search</p>)
        }
        else{
            results.map((val)=>{
                return (
                    <div>
                    <li>{val.nimi}<br/>
                    {val.osoite}<br/>
                    {val.operaattor}
                    </li><br/>
                    </div>
                )
            })
        }
    }
    return (
        <div>
            <ul>
            {limitListings()}
            </ul>
        </div>
    )
}

export default StationList
