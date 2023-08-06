import { useEffect, useState } from 'react';
import { BASE_URL, options } from 'utils/API';
import List from 'components/List/List';

export default function Home() {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/3/trending/movie/day?language=en-US`, options)
      .then(data => data.json())
      .then(data => setTrending(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <List list={trending}/>
  );
}
