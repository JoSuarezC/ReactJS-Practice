import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const params = useParams();
  const id = params['id'];
  const queryKey = ['events', { id }];
  const submit = useSubmit();

  // Wont use useLoaderData hook because data is cached in useQuery and to keep functionalities that useQuery offers
  const { data, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 10000, // dont send request until 10 seconds has passed
  });

  function handleSubmit(formData) {
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message || 'Failed to load event. Try again later'
          }
        />
        <div className='form-actions'>
          <Link
            to='../'
            className='button'
          >
            {' '}
            Okay{' '}
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm
        inputData={data}
        onSubmit={handleSubmit}
      >
        {state === 'submitting' ? (
          <p> Sending data... </p>
        ) : (
          <>
            <Link
              to='../'
              className='button-text'
            >
              Cancel
            </Link>
            <button
              type='submit'
              className='button'
            >
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  const id = params['id'];
  return queryClient.fetchQuery({
    queryKey: ['events', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
}

export async function action({ request, params }) {
  const id = params['id'];
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  console.log('formData', formData);
  console.log('updatedEventData', updatedEventData);
  await updateEvent({ id, event: updatedEventData });
  queryClient.invalidateQueries(['events', { id }]);
  return redirect('../');
}
