import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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

interface IHomeProps {
  movies: Movies[];
}

const Home: NextPage<IHomeProps> = ({ movies }) => {
  const [movieLists, setMovieLists] = useState(movies.slice(0, 10));
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

  const handleInfiniteScroll = async (event: any) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.currentTarget || {};
    const scrollThreshold = scrollTop + offsetHeight + 10;

    if (scrollThreshold > scrollHeight) {
      const data = await fetch(
        'https://private-2fff44-bncfetest.apiary-mock.com/movies',
        {
          method: 'GET',
        }
      )
        .then((response) => {
          if (response.status === 200) {
            console.log('Success fetch the data');
            return response.json();
          }
          console.log('Failed fetch the data');
        })
        .then((result) => result)
        .catch((err) => err);

      if (data.data) {
        setMovieLists(movieLists.concat(data.data.slice(0, 10)));
      }
    }
  };

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movie App is a Movie list Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar
        menus={menus}
        language={language}
        onChangeLanguage={(lang: string) => handleChangeLanguage(lang)}
      >
        <div className={styles.wrapper} onScroll={handleInfiniteScroll}>
          <div className={styles.introduction}>
            <h1>Movie App</h1>
            <p>{translate('homeIntroduction', language)}</p>
          </div>
          <div className={styles.content}>
            {movieLists.length &&
              movieLists.map((movie, movieIndex) => (
                <MovieCard
                  movie={movie}
                  key={movieIndex}
                  showDeleteIcon={false}
                  onDeleteMovie={() => {}}
                />
              ))}
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const data = await fetch(
    'https://private-2fff44-bncfetest.apiary-mock.com/movies',
    {
      method: 'GET',
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      console.log('Failed fetch the data');
    })
    .then((result) => result)
    .catch((err) => err);

  return {
    props: {
      movies: data.data,
    },
  };
};

export default Home;
