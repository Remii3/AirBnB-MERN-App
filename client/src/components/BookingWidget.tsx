import { useEffect, useState, useContext, ChangeEvent } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface BookingWidgetPropsTypes {
  place: { _id: string; price: number };
}

const BookingWidget = ({ place }: BookingWidgetPropsTypes) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }
  async function bookThisPlace() {
    const response = await axios.post('bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    <Navigate to={redirect} />;
  }

  const checkInHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckIn(e.target.value);
  };

  const checkoutHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckOut(e.target.value);
  };
  const numberOfGuestHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckIn(e.target.value);
  };
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckIn(e.target.value);
  };
  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckIn(e.target.value);
  };
  return (
    <div className='rounded-2xl bg-white p-4 shadow'>
      <div className='text-center text-2xl'>
        Price: ${place.price} / per night
      </div>
      <div className='mt-4 rounded-2xl border'>
        <div className='flex'>
          <div className='py-3 px-4'>
            <label>Check in:</label>
            <input
              type='date'
              value={checkIn}
              onChange={e => checkInHandler(e)}
            />
          </div>
          <div className='border-1 py-3 px-4'>
            <label>Check out:</label>
            <input
              type='date'
              value={checkOut}
              onChange={e => checkoutHandler(e)}
            />
          </div>
          <div className='border-t py-3 px-4'>
            <label>Number of guests:</label>
            <input
              type='number'
              value={numberOfGuests}
              onChange={e => numberOfGuestHandler(e)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className='border-t py-3 px-4'>
              <label>Your full name:</label>
              <input type='text' value={name} onChange={e => nameHandler(e)} />
              <label>Phone number:</label>
              <input type='tel' value={phone} onChange={e => phoneHandler(e)} />
            </div>
          )}
          <button onClick={bookThisPlace} className='primary mt-4'>
            Book this place
            {numberOfNights > 0 && (
              <span> ${numberOfNights * place.price}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
