import AccountNav from '../components/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';

type BookingsTypes = [
  {
    _id: number;
    place: {
      title: string;
      address: string;
    };
    price: number;
    checkIn: Date;
    checkOut: Date;
    addedPhotos: string[];
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingsTypes | []>([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map(booking => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className='flex gap-4 overflow-hidden rounded-2xl bg-gray-200'
            >
              <div className='w-48'>
                <PlaceImg
                  photos={booking.addedPhotos}
                  className=''
                  index={booking._id}
                />
              </div>
              <div className='grow py-3 pr-3'>
                <h2 className='text-xl'>{booking.place.title}</h2>
                <div className='text-xl'>
                  <BookingDates
                    booking={booking}
                    className='mb-2 mt-4 text-gray-500'
                  />
                  <div className='flex gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-8 w-8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                      />
                    </svg>
                    <span className='text-2xl'>
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
