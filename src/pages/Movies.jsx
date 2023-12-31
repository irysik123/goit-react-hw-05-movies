import { useCallback, useEffect, useState } from 'react';
import { BASE_URL, options } from 'utils/API';
import List from 'components/List/List';
/* import history from 'history/browser'; */
import './Movies.css';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  /*     let params = new URLSearchParams(history.location.search)
    let query = params.get('query')
  const [search, setSearch] = useState(query ?? '');
  const [data, setData] = useState('');

  function handleSearch() {
    history.push({search:`?query=${search}`})
    fetch(
      `${BASE_URL}/3/search/movie?include_adult=false&language=en-US&page=1&query=${search}`,
      options
    )
      .then(data => data.json())
      .then(data => setData(data));
  }

  useEffect(() => {
    if(search) {
        handleSearch()
    }
  }, [])

  return (
    <div className='movie_search_box'>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='movie_input'
      />
      <button onClick={handleSearch} className='search_btn'>Search</button>

      <List list={data} />
    </div>
  ); */

  const [movieId, setMovieId] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const grabMovies = useCallback(query => {
    fetch(
      `${BASE_URL}/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
      options
    )
      .then(data => data.json())
      .then(data => setMovieId(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (query) {
      grabMovies(query);
    }
  }, [query, grabMovies]);

  const updateQueryString = evt => {
    evt.preventDefault();
    if (searchText === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: searchText });
  };

  return (
    <div className="movie_search_box">
      <form onSubmit={updateQueryString}>
        <input
          type="text"
          name="query"
          placeholder="Search movie"
          required
          className="movie_input"
          value={searchText}
          onChange={handleChange}
        />
        <button type="submit" className="search_btn">
          Search
        </button>
      </form>

      {movieId && <List list={movieId} />}
    </div>
  );
};

export default Movies;
