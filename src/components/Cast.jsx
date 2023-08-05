import { useState, useEffect } from 'react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { BASE_URL, options, IMG_URl } from 'utils/API';

const Cast = () => {
  let { movieId } = useParams();

  const [movieCast, setMovieCast] = useState(null);
  useEffect(() => {
    fetch(`${BASE_URL}/3/movie/${movieId}/credits?language=en-US`, options)
      .then(data => data.json())
      .then(data => {
        setMovieCast(data);
      });
  }, [movieId]);

  return (
    <ul>
        {movieCast ? (movieCast.cast.map((cast) => <li key={cast.id}>
            <div>
                {cast.profile_path ? (<img src={IMG_URl + "w200" + cast.profile_path} alt={cast.original_name}></img>) : <HiOutlineEmojiHappy size='50px'/>}
                <p>{cast.name}</p>
                <p>Character: {cast.character}</p>
            </div>
        </li>)) : (<p>Sorry, no information</p>)}
    </ul>
  );
};

export default Cast;