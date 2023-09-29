import { useContext } from 'react';

import FavoritesContext from '../../store/favorites-context';
import Card from '../ui/Card/Card';
import classes from './MeetupItem.module.css';

export default function MeetupItem({
  id,
  image,
  title,
  address,
  description,
}) {
  const favoritesContext = useContext(FavoritesContext);
  const itemIsFavorite = favoritesContext.itemIsFavorite(id);

  function toggleFavoriteStatusHandler() {
    itemIsFavorite
      ? favoritesContext.removeFavorite(id)
      : favoritesContext.addFavorite({
        id: id,
        image: image,
        title: title,
        address: address,
        description: description,
      });
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title}></img>
        </div>
        <div className={classes.content}>
          <h3> {title} </h3>
          <address> {address} </address>
          <p> {description} </p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {
              itemIsFavorite
                ? 'Remove from Favorites'
                : 'To Favorites'
            }
          </button>
        </div>
      </Card>
    </li>
  )
}