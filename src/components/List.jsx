import { Link, useLocation } from 'react-router-dom';
import './List.css';
/* import PropTypes from 'prop-types'; */

export default function List({ list }) {
  const location = useLocation();
  return (
    <ul>
      {list &&
        list.results.map(film => (
          <Link
            to={`/movies/${film.id}`}
            state={{ from: location }}
            key={film.id}
          >
            <li className="movie_link">{film.title}</li>
          </Link>
        ))}
    </ul>
  );
}

/* List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};


 */
