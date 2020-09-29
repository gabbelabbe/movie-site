import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarRateIcon from '@material-ui/icons/StarRate';
import ReactPlayer from 'react-player';

export default function MovieDialog({ open, setOpen, movie }) {

  const [stars, setStars] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(false);
  
  useEffect(() => {
    const getStars = async () => {
      let response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=9a2ba5c81b06f1077aea9307f97727bc`);
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
      let response = await fetch(`http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=9a2ba5c81b06f1077aea9307f97727bc`);
      response = await response.json();
      if (response.results.length !== 0) {
        setYoutubeLink(`https://youtube.com/watch?v=${response.results[0].key}`);
      }
    }

    getStars();
    getYoutubeLink();
  }, [movie.id]);

  return (
    <Dialog 
      open={open} 
      onClose={e => setOpen(false)} 
      fullWidth
      maxWidth='lg'
      
    >
      <DialogContent>
      <Grid container spacing={2}>
          <Grid item>
            <ButtonBase>
              <img src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt='Poster Img' />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {movie.title}
                </Typography>
                <Typography gutterBottom>
                  {movie.overview}
                </Typography>
                {stars ? 
                  <Typography gutterBottom>
                    Top Billed Cast: {stars}
                  </Typography> :
                  null
                }
              </Grid>
              <Grid item container>
                <Grid item>
                  <StarRateIcon />
                </Grid>
                <Grid item>
                  <Typography variant='overline'>
                    {movie.vote_average}
                  </Typography>
                </Grid> 
              </Grid>
            </Grid>
          </Grid>
          {youtubeLink ?
            <Grid item>
              <ReactPlayer
                
                url={youtubeLink}
              /> 
            </Grid>
            :
            null
          }
        </Grid>
      </DialogContent>
    </Dialog>
  );
}