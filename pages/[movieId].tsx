import type { NextPage } from 'next';
import Router from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';

// styles
import styles from '../styles/Home.module.scss';

// utils
import { translate } from '../src/utils/translate';

type Movies = {
  id: string;
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
};

interface IFavoriteProps {
  movies: Movies[];
}


const DetailMoviePage: NextPage<IFavoriteProps> = () => {
  const [movieData, setMovieData] = useState('');
  const [movieLists, setMovieLists] = useState([]);
  const [language, setLanguage] = useState('en');

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

  const handleGetLikes = useCallback(() => {
    const likes: any = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];

    setMovieLists(parsedLikes);
  }, []);

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const handleUpdateMovie = (movie: any) => {
    setMovieLists(movie);
  };

  useEffect(() => {
    const movie = localStorage.getItem('movieData');
    
    if (movie) {
      setMovieData(movie);
    } else {
      Router.back();
    }

    localStorage.setItem('lang', language);
    handleGetLikes();
  }, [language, handleGetLikes]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Favorite</title>
        <meta name="description" content="Favorite Page by Movie App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar
        menus={menus}
        language={language}
        onChangeLanguage={(lang: string) => handleChangeLanguage(lang)}
      >
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {movieData}
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default DetailMoviePage;