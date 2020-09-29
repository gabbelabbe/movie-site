import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  grid: {
    justifyContent: 'center',
  },
});

function App() {
  const classes = useStyles();

  const [allMovies, setAllMovies] = useState(false);
  const [ratingRange, setRatingRange] = useState([1, 10]);
  const [filteredMovies, setFilteredMovies] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=9a2ba5c81b06f1077aea9307f97727bc&language=en-US&page=1');
      response = await response.json();
      setAllMovies(response.results);
      setFilteredMovies(response.results);
    }
    
    getMovies();
  }, []);
  
  useEffect(() => {
    if (allMovies) {
      const tempMovies = allMovies.filter(movie => movie.vote_average >= ratingRange[0] && movie.vote_average <= ratingRange[1]);
      setFilteredMovies(tempMovies);
    }
  }, [ratingRange, allMovies]);

  const generateMovieCards = () => {
    const movieCards = [];
    for (let i = 0; i < filteredMovies.length; i++) {
      movieCards.push(<Movie movie={filteredMovies[i]} key={filteredMovies[i].id} />);
    }
    return movieCards;
  }

  return (
    <div className="App">
      <Header ratingRange={ratingRange} setRatingRange={setRatingRange} setMovies={setAllMovies} />
      <Grid container spacing={3} className={classes.grid}>
        {filteredMovies ? (
          generateMovieCards()
        ): (
          <CircularProgress />
        )}
      </Grid>
    </div>
  );
}

export default App;
