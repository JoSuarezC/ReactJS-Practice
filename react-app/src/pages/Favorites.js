import { useContext } from 'react';
import FavoritesContext from '../store/favorites-context';

import MeetupList from '../components/meetups/MeetupList';

export default function FavoritesPage() {
  const favoritesContext = useContext(FavoritesContext);

  let content = <MeetupList meetups={favoritesContext.favorites}/>;

  if (favoritesContext.totalFavorites === 0) {
    content = <p>No Favorites Found</p>
  }

  return (
    <section>
      <h1> My Favorites </h1>
      {content}
    </section>
  );
};
