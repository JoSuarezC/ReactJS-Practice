import { useHistory } from 'react-router-dom';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  const history = useHistory();

  async function onAddMeetup(meetupData) {
    await fetch('test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetupData),
    });
    
    history.replace('/'); 
  }

  return (
    <section>
      <h1>
        Add New Meetup
      </h1>
      <NewMeetupForm onAddMeetup={onAddMeetup}/>
    </section>
  );
};
