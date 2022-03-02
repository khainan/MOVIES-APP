import type { GetServerSideProps, NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';

// styles
import styles from '../styles/Home.module.css';

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
  const menus = [
    {
      icon: '',
      key: 'home',
      title: 'Home',
    },
    {
      icon: '',
      key: 'favorite',
      title: 'Favorite',
    },
  ];

  const handleClickMovie = (movie: Movies) => {
    const { id } = movie || {};
    localStorage.setItem('movieData', JSON.stringify(movie));
    Router.push({
      pathname: `/${id}`,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeaderSidebar menus={menus} />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          {movies.length ? (
            movies.map((movie) => (
              <a
                key={movie.id}
                className={styles.card}
                onClick={() => handleClickMovie(movie)}
              >
                <h2>{movie.title}</h2>
                <p>{movie.year}</p>
              </a>
            ))
          ) : (
            <p>{'No Movie Available :('}</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
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
        console.log('Success fetch the data');
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
