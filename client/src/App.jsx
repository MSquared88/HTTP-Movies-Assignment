import React, { useState, useEffect } from "react";
import axios from 'axios'

//router
import { Route } from "react-router-dom";

//components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm'


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] =useState([])
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/`)
      .then(res => {
          console.log(res)
          setMovies(res.data)
      })
      .catch(err => console.log(err.response))
    },[])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render= {props => {
        return <MovieList {...props } movies={movies}/> 
      }}
       />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        exact path='/update-movie/:id'
        render={props => {
          return <UpdateForm {...props} movies={movies} updateMovies={setMovies} />
        }}
      />  
    </>
  );
};

export default App;
