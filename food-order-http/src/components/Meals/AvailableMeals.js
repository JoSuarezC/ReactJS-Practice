import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const { isLoading, sendRequest, error } = useHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    sendRequest(
      {
        url: API_URL,
      },
      (data) => {
        const mealsList = [];
  
        for (let key in data) {
          mealsList.push({
            id: key,
            ...data[key],
          });
        }
  
        setMeals(mealsList);
      }
    );
  }, [sendRequest]);


  if (isLoading) {
    return <p className={classes.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={classes.loading}> {error} </p>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
