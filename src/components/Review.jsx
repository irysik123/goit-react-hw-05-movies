import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, options } from 'utils/API';

const Reviews = () => {
  let { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState(null);
  useEffect(() => {
    fetch(`${BASE_URL}/3/movie/${movieId}/reviews?language=en-US&page=1`, options)
      .then(data => data.json())
      .then(data => {
        setMovieReviews(data);
      });
  }, [movieId]);

  return (
    <ul>
        {movieReviews ? (movieReviews.results.map((result) => <li key={result.id}>
            <div>
                <h4>Author: {result.author}</h4>
                <p>{result.content}</p>
            </div>
        </li>)) : (<div>No reviews yet...</div>)}
    </ul>
  );
};

export default Reviews;