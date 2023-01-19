const SearchForm = ({searchInput, setSearchInput}) => {
    return(
        <div>
            <form onSubmit={console.log("Search form submitted")}>
                 <label>Search:</label>
                 <input onChange={(event)=>setSearchInput(event.target.value)}/>
            <br/>
        <label for="cars">Sort by:</label>
        <select id="cars" name="sortBy">
        <option value="">None</option>
        <option value="length">Distance travelled</option>
        <option value="time">Trip duration</option>
        <option value="returning">Return Date/Time</option>
        <option value="departing">Departure Date/Time</option>
        </select> 
        <label for="Ordering">Order:</label>
        <select id="order by" name="order">
        <option value="empty">None</option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
        </select> <br/>
        <button>Search</button>
            </form>
        </div>
    )
}

export default SearchForm
