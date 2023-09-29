import EventsList from '../components/EventsList';
import { json, useLoaderData } from 'react-router-dom';

function EventsPage() {
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>
  // }

  const fetchedEvents = data.events;

  return <EventsList events={fetchedEvents} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    return json(
      {
        message: 'Ups, something went wrong',
      },
      {
        status: 500,
      }
    );
    // throw new Response(
    //   JSON.stringify({
    //     message: 'Ups, something went wrong',
    //   }),
    //   {
    //     status: 500,
    //   }
    // );
    //throw new Error('Something went wrong');
    // return {
    //   isError: true,
    //   message: 'Something went wrong',
    // };
  } else {
    //const resData = await response.json();
    return response;
  }
}
