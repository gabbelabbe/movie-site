import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    backgroundColor: '#282c34',
    height: 'inherit',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    position: 'relative',
    paddingTop: 30
  },
  form: {
    margin: 'auto',
  },
  textField: {
    paddingTop: 30,
    width: 260
  },
  appBar: {
    height: 80,
  },
  slider: {
    color: 'white'
  },
  thumb: {
    color: 'gray'
  }
}));

export default function Header({ ratingRange, setRatingRange, setMovies }) {
  const classes = useStyles();
  const [movieQuery, setMovieQuery] = useState('');
  const [error, setError] = useState(false);

  const handleSumbit = async () => {
    const modifiedMovieQuery = movieQuery.split(' ').join('%20');
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9a2ba5c81b06f1077aea9307f97727bc&language=en-US&query=${modifiedMovieQuery}&page=1&include_adult=true`);
    response = await response.json();
    if (response.results.length === 0) {
      setError(true);
    } else {
      setError(false);
      setMovies(response.results);
    }
  }

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" className={classes.title} >
          Movie-Finder
        </Typography>
        <form 
          className={classes.form} 
          onSubmit={e => {
            e.preventDefault();
            handleSumbit();
          }}>
          <TextField
            className={classes.textField}
            onChange={e => {
              setMovieQuery(e.target.value);
              setError(false);
            }}
            placeholder='Search for an awesome movie'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{color: 'white'}} />
                </InputAdornment>
              ),
              style: {
                color: '#fff',
              }
            }}
            error={error}
          />
        </form>
        <StarRateIcon style={{paddingTop: 40, marginRight: 10}} />
        <Slider
          style={{width: 200, paddingTop: 50}} 
          value={ratingRange}
          onChange={(e, newRange) => {setRatingRange(newRange)}}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          step={1}
          aria-labelledby="range-slider"
          classes={{
            root: classes.slider,
            valueLabel: classes.thumb
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
