import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';

function App() {
  const [ratingRange, setRatingRange] = useState([1, 10]);
  const [allMovies, setAllMovies] = useState([]);
  const [error, setError] = useState(false);

  return (
    <div className="App">
      <Router>  
        <Header ratingRange={ratingRange} setRatingRange={setRatingRange} error={error} setError={setError} />
        <Switch>
          <Route exact path='/'>
            <Home ratingRange={ratingRange} allMovies={allMovies} setAllMovies={setAllMovies} setError={setError} />
          </Route>
          <Route path='/movie/:id' component={Movie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
