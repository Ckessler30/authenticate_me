import React from "react"
import './searchBar.css'
import { Route, NavLink } from "react-router-dom"
import { useState } from "react"

import FilteredQuestions from "../FilteredQuestions"

const SearchBar = ({placeHolder, data}) => {

    const [filteredQuestions, setFilteredQuestions] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    const handleFilter = (event) => {
        const searchWord = event.target.value 
        setWordEntered(searchWord)
        // const newFilter = data.filter((value) => {
        //     return value.title.toLowerCase().includes(searchWord.toLowerCase())
        // })
        if(searchWord === ''){
            setFilteredQuestions([])
        }else{
            // setFilteredQuestions(newFilter)
        }

    }

    const clearSearch = () => {
        setFilteredQuestions([])
        setWordEntered('')
    }

    return (
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search for a question..."
            onChange={handleFilter}
            value={wordEntered}
          />
          <div className="searchIcon">
            {/* {filteredQuestions.length === 0 ? SearchIcon : ClearSearch} */}
            <NavLink to="/filtered/questions">
                <button></button>
            </NavLink>
          </div>
        </div>
        <div className="searchResult"></div>
      </div>
    );
}


export default SearchBar