import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarRateIcon from '@material-ui/icons/StarRate';
import ReactPlayer from 'react-player';

export default function MovieDialog(props) {
  const id = props.match.params.id;

  const [movie, setMovie] = useState(false);
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
  }, [])
  
  useEffect(() => {
    if (movie) {
      getStars();
      getYoutubeLink();
    }
    console.log(movie)
  }, [movie]);

  /* const [stars, setStars] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(false);
  
  useEffect(() => {
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

    getStars();
    getYoutubeLink();
  }, [movie.id]); */

  return (
    <h1>hello</h1>
  );
}