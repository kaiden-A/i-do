

function SearchBar(){

    return(
        <>
            <div className="search-filter">
                <form>
                    <input 
                        type="text"
                        placeholder="Search for a group..."
                    />
                </form>
                <button className="btn btn-primary">SEARCH</button>
            </div>
        </>
    )
}

export default SearchBar;