import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

// assets
import ratingIcon from './assets/rating-icon.png';
import likeIcon from './assets/like-icon.png';
import viewsIcon from './assets/views-icon.png';
import unlikeIcon from './assets/unlike-icon.png';
import trashIcon from './assets/trash-icon.png';

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
  showDeleteIcon: boolean;
  onDeleteMovie: any;
}

const MovieCard = (props: IMovieCards) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { movie, showDeleteIcon, onDeleteMovie } = props || {};

  const handleGetLikes = useCallback(() => {
    const likes: any = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];

    parsedLikes.map((val: any) => {
      if (val.id === movie.id) {
        setLiked(true);
      }
    });

    setLikes(parsedLikes);
    return parsedLikes;
  }, [movie]);

  const handleDeleteMovie = () => {
    let newLikes: Movies[] = handleGetLikes();
    newLikes = newLikes.filter((val) => val.id !== movie.id);
    localStorage.setItem('likes', JSON.stringify(newLikes));
    onDeleteMovie(newLikes);
    setLiked(false);
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
      handleDeleteMovie();
    }
  };

  useEffect(() => {
    handleGetLikes();
  }, [handleGetLikes]);

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
          {!showDeleteIcon ? (
            <>
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
            </>
          ) : (
            <div className={styles['delete-icon']} onClick={handleDeleteMovie}>
              <Image alt="" src={trashIcon} width={34} height={34} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
