import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';

type BookingResponseType = {
  _id: string;
};
interface BookingTypes {
  place: {
    title: string;
    address: string;
  };
  price: number;
  checkIn: Date;
  checkOut: Date;
  addedPhotos: string[];
}

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingTypes | null>(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(
          ({ _id }: BookingResponseType) => _id === id,
        );
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return <></>;
  }
  return (
    <div>
      {' '}
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className='my-6 flex items-center justify-between rounded-2xl bg-gray-200 p-6'>
        <div>
          <h2 className='mb-4 text-2xl'>Your booking information:</h2>
          <BookingDates booking={booking} className={''} />
        </div>
        <div className='bg-primary rounded-2xl p-6 text-white'>
          <div>Total price</div>
          <div className='text-3xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallery title={booking.place.title} photos={booking.addedPhotos} />
    </div>
  );
};

export default BookingPage;
