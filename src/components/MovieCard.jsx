import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles({
  card: {
    width: 375,
    height: 250,
    boxShadow: '0px 2px 12px -6px black',
    overflow: 'hidden',
    '&:hover': {
      '& > $content': {
        top: 0,
        '& p, & .MuiGrid-container': {
          opacity: 1,
        },
      },
    },
  },
  gridItem: {
    margin: 10,
    width: 375,
    position: 'relative',
  },
  content: {
    cursor: 'pointer',
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
    background: 'white',
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 16px !important',
    top: '80%',
    transition: 'top 250ms ease',
    '& p, & .MuiGrid-container': {
      opacity: 0,
    },
    '& p': {
      display: '-webkit-box',
      '-webkit-line-clamp': 8,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

export default function MovieCard({ movie }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item className={classes.gridItem}>
      <Card
        className={classes.card}
        onClick={(e) => history.push(`movie/${movie.id}`)}
      >
        <CardMedia
          component='img'
          alt='Background img'
          style={{ height: '100%' }}
          image={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : `https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80`
          }
        />
        <CardContent className={classes.content}>
          <Typography variant='h5' component='h2' noWrap>
            {movie.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {movie.overview}
          </Typography>
          <Grid container>
            <Grid item>
              <StarRateIcon />
            </Grid>
            <Grid item>
              <Typography variant='overline'>{movie.vote_average}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
