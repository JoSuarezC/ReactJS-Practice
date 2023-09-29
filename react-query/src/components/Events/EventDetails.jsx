import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params['id'];
  const { data, isPending, isError } = useQuery({
    queryKey: ['event', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      }); // exact: true. refetchType: not to re-send a request in the sam page inmediately after deletion
      navigate('/events');
    },
  });

  console.log('data', data);

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id });
  }

  const formattedDate =
    data &&
    new Date(data['date']).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button
                  onClick={handleStopDelete}
                  className='button-text'
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className='button'
                >
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title='Failed to delete event'
              message={
                deleteError.info?.message ||
                'Failed to delete event, please try again later.'
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link
          to='/events'
          className='nav-item'
        >
          View all Events
        </Link>
      </Header>
      <article id='event-details'>
        {isError && (
          <div className='center'>
            <ErrorBlock
              title='An error has ocurred'
              message='Please try again later'
            />
          </div>
        )}
        {isPending && (
          <div className='center'>
            <LoadingIndicator />
          </div>
        )}
        {data && (
          <>
            <header>
              <h1>{data['title']}</h1>
              <nav>
                <button onClick={handleStartDelete}>Delete</button>
                <Link to='edit'>Edit</Link>
              </nav>
            </header>
            <div id='event-details-content'>
              <img
                src={`http://localhost:3000/${data['image']}`}
                alt={data['title']}
              />
              <div id='event-details-info'>
                <div>
                  <p id='event-details-location'>{data['location']}</p>
                  <time dateTime={`${data['date']}T${data['time']}`}>
                    {formattedDate} @ {data['time']}
                  </time>
                </div>
                <p id='event-details-description'>{data['description']}</p>
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
}
