import '../App.css'

const StationDetails = ({extended, station}) => {
    if (extended){
    return(
        <div>
            <h3>{station.nimi}</h3>
            <h5>{station.namn}</h5>
        <div style={{display:"flex",width:"100%", alignContent:"center", justifyContent:"center"}}>
            <div style={{display: "flex", flexWrap:"wrap", width:"33%"}}>
                <div style={{width : "50%"}}>{station.osoite}</div>
                <div style={{width : "50%"}}>{station.adress}</div>
                <div style={{width : "100%"}}>{station.operaattor}</div>
            </div>
        </div>
        </div>
    )
    }
    else {
        return(
            <>
            <li>{station.nimi}<br/>
            {station.osoite}<br/>
            {station.operaattor}
            </li><br/>
            </>
        )
    }
}

export default StationDetails
