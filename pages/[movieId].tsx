import type { NextPage } from 'next';
import Router, { withRouter } from 'next/router';
import { useState, useEffect } from 'react';

const DetailMoviePage: NextPage = () => {
  const [movieData, setMovieData] = useState('');

  useEffect(() => {
    const movie = localStorage.getItem('movieData');
    if (movie) {
      setMovieData(movie);
    } else {
      Router.back();
    }
  }, []);

  return <div>{movieData}</div>;
};

export default withRouter(DetailMoviePage);
