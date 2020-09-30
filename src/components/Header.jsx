import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import StarRateIcon from '@material-ui/icons/StarRate';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30
  },
  textField: {
    width: 260,
  },
  appBar: {
    height: 80,
  },
  sliderRoot: {
    color: 'white'
  },
  valueLabel: {
    color: 'gray'
  },
  starIcon: {
    paddingTop: 40,
    marginRight: 10
  },
  slider: {
    paddingTop: 50,
    width: 200
  },

  /*------MOBILE------*/

  mobileAppBar: {
    height: 56
  },
  mobileForm: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  mobileTitle: {
    position: 'relative',
  },
  mobileStarIcon: {
    marginRight: 10
  },
  mobileSlider: {
    padding: 0,
    width: 200
  }
}));

export default function Header({ ratingRange, setRatingRange, error, setError }) {
  const classes = useStyles();
  const history = useHistory();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const [movieQuery, setMovieQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const handleSumbit = async () => {
    history.replace(`/?search=${movieQuery}`);
  }

  return (
    <AppBar position="sticky" className={isDesktop ? classes.appBar : classes.mobileAppBar}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" className={isDesktop ? classes.title : classes.mobileTitle} onClick={e => history.push('/')}>
          {isDesktop ? 'Movie-Finder' : 'MF'}
        </Typography>
        <form 
          className={isDesktop ? classes.form : classes.mobileForm} 
          onSubmit={e => {
            e.preventDefault();
            handleSumbit();
          }}>
          <SearchIcon 
            style={{color: 'white'}}
            onClick={e => {
              setShowRating(false);
              setShowSearchBar(!showSearchBar);
            }}
          />
          {isDesktop || showSearchBar ? (
            <TextField
              className={classes.textField}
              onChange={e => {
                setMovieQuery(e.target.value);
                setError(false);
              }}
              placeholder='Search for an awesome movie'
              InputProps={{
                style: {
                  color: '#fff',
                }
              }}
              error={error}
            />
          ) : (
            null
          )}
        </form>
        <StarRateIcon 
          className={isDesktop ? classes.starIcon : classes.mobileStarIcon} 
          onClick={e => {
            setShowSearchBar(false);
            setShowRating(!showRating)
          }}
        />
        {isDesktop || showRating ? (
           <Slider
              className={isDesktop ? classes.slider : classes.mobileSlider} 
              value={ratingRange}
              onChange={(e, newRange) => {setRatingRange(newRange)}}
              valueLabelDisplay="auto"
              min={1}
              max={10}
              step={1}
              aria-labelledby="range-slider"
              classes={{
                root: classes.sliderRoot,
                valueLabel: classes.valueLabel
              }}
            />
          ) : (
            null
          )}
      </Toolbar>
    </AppBar>
  );
}
