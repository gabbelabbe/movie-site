import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  grid: {
    justifyContent: 'center',
  },
});

const useQuery = () => {
  const param = new URLSearchParams(useLocation().search);
  if (param.has('search')) {
    return param.get('search');
  }
}

export default function Home({ ratingRange, allMovies, setAllMovies, setError }) {
  const query = useQuery();
  const classes = useStyles();

  const [filteredMovies, setFilteredMovies] = useState([]);

  const getNewMovies = async (query) => {
    const modifiedMovieQuery = encodeURIComponent(query);
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9a2ba5c81b06f1077aea9307f97727bc&language=en-US&query=${modifiedMovieQuery}&page=1&include_adult=true`);
    response = await response.json();
    if (response.results.length === 0) {
      setError(true);
    } else {
      setError(false);
      setAllMovies(response.results);
    }
  }
  
  const getMovies = async () => {
    let response = await fetch(`${process.env.REACT_APP_BASE_TMDB_URL}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    response = await response.json();
    setAllMovies(response.results);
    setFilteredMovies(response.results);
  }

  useEffect(() => {  
    if (query) {
      getNewMovies(query);
    } else {
      getMovies();
    }
  }, [query])

  useEffect(() => {
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
      movieCards.push(<MovieCard movie={filteredMovies[i]} key={filteredMovies[i].id} />);
    }
    return movieCards;
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      {filteredMovies.length ? (
        generateMovieCards()
      ): (
        <CircularProgress />
      )}
    </Grid>
  );
}
