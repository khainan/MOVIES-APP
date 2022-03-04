import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import MovieCard from '../src/components/MovieCard/MovieCard';

// styles
import styles from '../styles/Home.module.scss';

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

  const menus = [
    {
      icon: homeIcon,
      key: 'home',
      path: "/",
      title: 'Home',
    },
    {
      icon: starIcon,
      key: 'favorite',
      path: "/favorite",
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar menus={menus}>
        <div className={styles.content} onScroll={handleInfiniteScroll}>
          {movieLists.length &&
            movieLists.map((movie, movieIndex) => (
              <MovieCard movie={movie} key={movieIndex} />
            ))}
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
