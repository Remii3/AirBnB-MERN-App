import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(res => {
      const { data }: any = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const inputHeader = (text: string) => {
    return <h2 className='mt-4 text-2xl'>{text}</h2>;
  };

  const inputDescription = (text: string) => {
    return <p className='text-sm text-gray-500'>Title for your place</p>;
  };

  const preInput = (header: string, description: string) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  async function savePlace(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put('/places', {
        id,
        ...placeData,
      });
      setRedirect(true);
      return <Navigate to={'/account/places'} />;
    } else {
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place')}
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='title, for my apartment'
        />
        {preInput('Address', 'Address to your place')}
        <input
          type='text'
          placeholder='address'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        {preInput('Photos', 'The more the better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Description of the place')}
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {preInput('Perks', 'Select all the perks of the place')}
        <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra info', 'House rules, etc')}
        <textarea
          value={extraInfo}
          onChange={e => setExtraInfo(e.target.value)}
        />
        {preInput(
          'Checkout in&out times, max guests',
          'Add checkin and out times',
        )}
        <div className='grid gap-2 sm:grid-cols-3'>
          <div>
            <h3 className='mt-2 -mb-1'>Check in time</h3>
            <input
              type='text'
              placeholder='14:00'
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Check out time</h3>
            <input
              type='text'
              placeholder='11:00'
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Max number of guests</h3>
            <input
              type='number'
              value={maxGuests}
              onChange={e => setMaxGuests(Number(e.target.value))}
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Price per night</h3>
            <input
              type='number'
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
            />
          </div>
          <button type='submit' className='primary my-4'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
