import React, { useEffect } from "react"
import './searchBar.css'
import { Route, NavLink } from "react-router-dom"
import { useState } from "react"

import FilteredQuestions from "../FilteredQuestions"
import { filteredQuestions } from "../../store/questions"
import { useDispatch, useSelector } from "react-redux"

const SearchBar = ({placeHolder, data }) => {
   
    const dispatch = useDispatch()
    const [currFilteredQuestions, setFilteredQuestions] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    const allQuestions = useSelector(state => state.questions.list)
 

    const handleFilter = (event) => {
        const searchWord = event.target.value 
        setWordEntered(searchWord)
        const newFilter = allQuestions.filter((question) => {
            return question.title.toLowerCase().includes(searchWord.toLowerCase())
        })
        if(searchWord === ''){
            setFilteredQuestions([])
        }else{
            setFilteredQuestions(newFilter)
        }
    }

    const onSearch = () => {
        dispatch(filteredQuestions(currFilteredQuestions))
    }


    const clearSearch = () => {
        setFilteredQuestions([])
        setWordEntered('')
    }

    return (
      <main>
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="Search !Quora"
              onChange={handleFilter}
              value={wordEntered}
            />
            <div className="searchIcon">
              {wordEntered.length < 1 ? (
                <NavLink to="/filtered/questions">
                  <button onClick={onSearch} className="searchButtons">
                    <i className="fas fa-search"></i>
                  </button>
                </NavLink>
              ) : (
                <div className="dualSearchButtons">
                  <NavLink to="/filtered/questions">
                    <button onClick={onSearch} className="searchButtons">
                      <i className="fas fa-search"></i>
                    </button>
                  </NavLink>
                  <button onClick={clearSearch} className="searchButtons">
                    <i className="far fa-times-circle"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* <div className="searchResult"></div> */}
        </div>
      </main>
    );
}


export default SearchBar