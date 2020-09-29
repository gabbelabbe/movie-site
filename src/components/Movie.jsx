import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarRateIcon from '@material-ui/icons/StarRate';
import MovieDialog from './MovieDialog';

const useStyles = makeStyles({
  card: {
    width: 375
  },
  gridItem: {
    margin: 10,
    width: 375
  },
});

export default function Movie({ movie }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <Grid item className={classes.gridItem}>
      <Card className={classes.card}>
        <CardActionArea onClick={e => setOpen(true)}>
          <CardMedia
            component="img"
            alt="Background img"
            height="185"
            image={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              {movie.overview}
            </Typography>
            <Grid container>
              <Grid item>
                <StarRateIcon />
              </Grid>
              <Grid item>
                <Typography variant='overline'>
                  {movie.vote_average}
                </Typography>
              </Grid> 
            </Grid>
          </CardContent>
        </CardActionArea>
        <MovieDialog
          open={open}
          setOpen={setOpen}
          movie={movie}
        />
      </Card>
    </Grid>
  );
}