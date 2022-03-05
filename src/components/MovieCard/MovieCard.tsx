import { useEffect, useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

// assets
import ratingIcon from './assets/rating-icon.png';
import likeIcon from './assets/like-icon.png';
import viewsIcon from './assets/views-icon.png';
import unlikeIcon from './assets/unlike-icon.png';

// styles
import styles from './MovieCard.module.scss';

type Movies = {
  id: string;
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
};

interface IMovieCards {
  movie: Movies;
}

const MovieCard = (props: IMovieCards) => {
  const [liked, setLiked] = useState(false);
  const { movie } = props || {};

  const handleGetLikes = () => {
    const likes: any = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];
    const data: Movies[] = [...parsedLikes];

    return data;
  };

  const handleClickMovie = () => {
    localStorage.setItem('movieData', JSON.stringify(movie));
    Router.push({
      pathname: `/${movie.id}`,
    });
  };

  const handleLikeMovie = () => {
    let newLikes: Movies[] = handleGetLikes();

    if (!liked) {
      newLikes.push(movie);
      localStorage.setItem('likes', JSON.stringify(newLikes));
      setLiked(true);
    } else {
      newLikes = newLikes.filter(val => val.id !== movie.id);
      localStorage.setItem('likes', JSON.stringify(newLikes));
      setLiked(false)
    }
  };

  useEffect(() => {
    const newLikes = handleGetLikes();
    newLikes.map((val) => {
      if (val.id === movie.id) {
        setLiked(true);
      }
    });
  }, [movie]);

  return (
    <div className={styles['movie-card']}>
      <div
        className={styles['movie-card-container']}
        style={{ backgroundImage: `url(${movie.imageUrl})` }}
      >
        <div className={styles['movie-card-header']}>
          <h4>{`${movie.title} (${movie.year})`}</h4>
          <div className={styles['movie-card-rating']}>
            <Image alt="" src={ratingIcon} width={16} height={16} />
            <p>{`x${movie.rating}`}</p>
          </div>
        </div>
        <div className={styles['movie-card-content']}>
          <div className={styles['views-icon']} onClick={handleClickMovie}>
            <Image alt="" src={viewsIcon} width={34} height={34} />
          </div>
          <div
            className={liked ? styles['like-icon'] : styles['unlike-icon']}
            onClick={handleLikeMovie}
          >
            <Image
              alt=""
              src={liked ? likeIcon : unlikeIcon}
              width={34}
              height={34}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
