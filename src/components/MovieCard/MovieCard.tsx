import Image from 'next/image';
import Router from 'next/router';

// assets
import ratingIcon from './assets/rating-icon.png';
import likeIcon from './assets/like-icon.png';
import viewsIcon from './assets/views-icon.png';
import dislikeIcon from './assets/dislike-icon.png';

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
  const { movie } = props || {};

  const handleClickMovie = () => {
    localStorage.setItem('movieData', JSON.stringify(movie));
    Router.push({
      pathname: `/${movie.id}`,
    });
  };

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
          <div className={styles['eye-icon']} onClick={handleClickMovie}>
            <Image alt="" src={viewsIcon} width={24} height={24} />
          </div>
          <div className={styles['like-icon']}>
            <Image alt="" src={likeIcon} width={24} height={24} />
          </div>
          <div className={styles['dislike-icon']}>
            <Image alt="" src={dislikeIcon} width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
