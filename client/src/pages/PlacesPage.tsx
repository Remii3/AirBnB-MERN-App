import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';

type Places = [
  { _id: string; title: string; description: string; photos: string[] },
];
const PlacesPage = () => {
  const [places, setPlaces] = useState<Places>();
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <Link
          className='bg-primary inline-flex gap-1 rounded-full py-2 px-6 text-white '
          to={'/account/places/new'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className='mt-4'>
        {places &&
          places.length > 0 &&
          places!.map(place => (
            <Link
              key={place._id}
              to={'/account/places/' + place._id}
              className='flex cursor-pointer gap-4 rounded-2xl bg-gray-100 p-4'
            >
              <div className='flex h-32 w-32 shrink-0 grow bg-gray-300'>
                <PlaceImg place={place} index={0} className={null} />
              </div>
              <div className='shrink grow-0'>
                <h2 className='text-xl'>{place.title}</h2>
                <p className='mt-2 text-sm'>{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
