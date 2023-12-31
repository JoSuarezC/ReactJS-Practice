import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params['id'];
  const queryKey = ['events', { id }];
  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      // optimistic update
      await queryClient.cancelQueries({ queryKey }); // cancel queries by useQuery
      const previousEvent = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, data.event); // manipulate stored data
      return { previousEvent };
    },
    onError: (error, data, context) => {
      // rollback if update fails
      queryClient.setQueryData(queryKey, context.previousEvent);
    },
    onSettled: () => {
      //finally block. Does not matter if fails or sucessded 
      queryClient.invalidateQueries(queryKey)
    }
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }

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
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
