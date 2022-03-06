import type { NextPage } from 'next';
import Router, { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';

// styles
import styles from '../styles/Home.module.scss';

const DetailMoviePage: NextPage = () => {
  const [movieData, setMovieData] = useState('');

  const menus = [
    {
      icon: homeIcon,
      key: 'home',
      path: '/',
      title: 'Home',
    },
    {
      icon: starIcon,
      key: 'favorite',
      path: '/favorite',
      title: 'Favorite',
    },
  ];

  useEffect(() => {
    const movie = localStorage.getItem('movieData');
    if (movie) {
      setMovieData(movie);
    } else {
      Router.back();
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movie app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar menus={menus}>
        <div>{movieData}</div>
      </HeaderSidebar>
    </div>
  );
};

export default DetailMoviePage;
