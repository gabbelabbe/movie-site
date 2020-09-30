import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StarRateIcon from '@material-ui/icons/StarRate';
import ReactPlayer from 'react-player';

const useStyles = makeStyles({
  backdrop: {
    width: 'calc(100vw - 5px)',
    maxHeight: '100vh',
    position: 'absolute',
    zIndex: -2,
    filter: 'brightness(50%)'
  },
  text: {
    color: 'white'
  }
});

export default function MovieDialog(props) {
  const id = props.match.params.id;
  const classes = useStyles();

  const [movie, setMovie] = useState({});
  const [stars, setStars] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(false);

  const getMovie = async () => {
    let response = await fetch(`${process.env.REACT_APP_BASE_TMDB_URL}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    response = await response.json();
    setMovie(response);
  }

  const getStars = async () => {
    let response = await fetch(`${process.env.REACT_APP_BASE_TMDB_URL}/${movie.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
    response = await response.json();
    let tempStarsArr = [];
    for (let i = 0; i < 3; i++) {
      if (response.cast[i]) {
        tempStarsArr.push(response.cast[i].name);
      }
    }
    tempStarsArr = tempStarsArr.join(' | ')
    setStars(tempStarsArr);
  }

  const getYoutubeLink = async () => {
    let response = await fetch(`${process.env.REACT_APP_BASE_TMDB_URL}/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
    response = await response.json();
    if (response.results.length !== 0) {
      setYoutubeLink(`https://youtube.com/watch?v=${response.results[0].key}`);
    }
  }

  useEffect(() => {
    getMovie();
  }, []);
  
  useEffect(() => {
    if (Object.keys(movie).length) {
      getStars();
      getYoutubeLink();
    }
  }, [movie]);

  return (
    <div>
      {Object.keys(movie).length ? ( 
        <Grid container spacing={3} style={{textAlign: 'left'}}>
          <img
            className={classes.backdrop}
            alt='A nice Backdrop :)'
            src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : `https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80`}
          />
          <Grid item xs={12} style={{marginTop: '30vh'}} />
          <Grid item>
            <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt='Poster Img' />
          </Grid>
          <Grid item xs={12} sm container >
            <Grid item xs container spacing={2} >
              <Grid item xs={7} style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                <Typography gutterBottom variant="h4" className={classes.text} >
                  {movie.title}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <StarRateIcon  className={classes.text} />
                    <Typography variant='overline' className={classes.text} >
                      {movie.vote_average}
                    </Typography>
                  </div>  
                </Typography>
                <Typography gutterBottom className={classes.text} >
                  {movie.overview}
                </Typography>
                {stars ? 
                  <Typography gutterBottom className={classes.text} >
                    Top Billed Cast: {stars}
                  </Typography> :
                  null
                }
                <Typography gutterBottom className={classes.text}>
                  {movie.genres.map(genre => {
                    if (movie.genres[movie.genres.length - 1] === genre) {
                      return genre.name
                    } 
                    return genre.name + ' | '
                  })}
                </Typography>
              </Grid>
              {youtubeLink ?
                (
                  <Grid item>
                    <ReactPlayer
                      url={youtubeLink}
                    /> 
                  </Grid>
                ) : (
                  null
                )
              }
            </Grid>
          </Grid>
        </Grid> ) : (
          null
        )
      }
    </div>
  );
}