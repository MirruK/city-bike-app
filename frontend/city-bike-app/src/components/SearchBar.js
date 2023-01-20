const SearchBar = ({setSearchInput}) => {
    return(
        <div>
        <label>Search:</label>
        <input onChange={(event)=>setSearchInput(event.target.value)}/>
        </div>
    )
}
export default SearchBar
