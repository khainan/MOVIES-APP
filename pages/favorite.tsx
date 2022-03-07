import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import MovieCard from '../src/components/MovieCard/MovieCard';

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

const Favorite: NextPage<IFavoriteProps> = () => {
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
    localStorage.setItem('lang', lang);
  };

  const handleUpdateMovie = (movie: any) => {
    setMovieLists(movie);
  };

  useEffect(() => {
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
            {movieLists.length ? (
              movieLists.map((movie, movieIndex) => (
                <MovieCard
                  movie={movie}
                  key={movieIndex}
                  showDeleteIcon
                  onDeleteMovie={(movie: Movies) => handleUpdateMovie(movie)}
                />
              ))
            ) : (
              <div className={styles['empty-favorite']}>
                <Image alt="" src={starIcon} width={40} height={40} />
                <h5>{translate('emptyFavoriteTitle', language)}</h5>
                <p>{translate('emptyFavoriteDescription', language)} <strong>Home</strong>.</p>
              </div>
            )}
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default Favorite;
