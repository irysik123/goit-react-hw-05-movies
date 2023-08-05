import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import { BASE_URL, options, IMG_URl } from 'utils/API';
/* import { useLocation } from 'react-router-dom'; */
import './MovieDetails.css';
/* import history from 'history/browser'; */
import { HiArrowLeft } from 'react-icons/hi';

const MovieDetails = () => {
  let { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const [movieData, setMovieDate] = useState(null);
  const [movieYear, setMovieYear] = useState(null);
  useEffect(() => {
    fetch(`${BASE_URL}/3/movie/${movieId}?language=en-US`, options)
      .then(data => data.json())
      .then(data => {
        let date = new Date(data.release_date);
        let year = date.getFullYear();
        setMovieYear(year);
        setMovieDate(data);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  /*   function handleback(e) {
    e.preventDefault();
    history.back()
  } */

  return (
    <div className="movie_container">
      {/* <a onClick={handleback}>Go back</a> */}
      <Link to={backLinkLocationRef.current} className="back_link">
        <HiArrowLeft size="18" />
        Go back
      </Link>
      {movieData && movieYear ? (
        <>
          <div className="movie_box">
            <img
              src={IMG_URl + 'w300' + movieData.poster_path}
              alt={movieData.original_title}
            />
            <div>
              <h1>
                {movieData.original_title} ({movieYear})
              </h1>
              <p>{movieData.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{movieData.overview}</p>
              <h2>Genres</h2>
              <p>
                {movieData.genres.map(genres => (
                  <span key={genres.id} className="movie_genre">
                    {genres.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="add_info">
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={`./cast`} className="movie_link">
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`./reviews`} className="movie_link">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

/* <pre>{JSON.stringify(movieData, null, " ")}</pre>; */

export default MovieDetails;
