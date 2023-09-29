import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

function NewEventPage() {
  return <EventForm method='POST' />;
}

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();

  console.log('test', data, request);

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch('http://localhost:8080/events/', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      {
        message: 'Could not fetch details for selected event',
      },
      {
        status: 500,
      }
    );
  }

  return redirect('/events');
}
