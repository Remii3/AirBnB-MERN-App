import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className='flex justify-between'>
      <Link to={'/'} className='flex items-center gap-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-8 w-8 -rotate-90'
        >
          <path d='M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z' />
        </svg>
        <span className='text-xl font-bold'>airbnb</span>
      </Link>
      <div className='flex gap-2 rounded-full border border-gray-300 py-2 px-4 shadow-md shadow-gray-300'>
        <div>Anywhere</div>
        <div className='border border-l border-gray-300' />
        <div>Any week</div>
        <div className='border border-l border-gray-300' />
        <div>Add guests</div>
        <button className='bg-primary rounded-full p-1 text-white '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-4 w-4'
          >
            <path
              fillRule='evenodd'
              d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <Link
        to={user ? '/account' : '/login'}
        className='flex items-center gap-2 rounded-full border border-gray-300 py-2 px-4'
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
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
        <div className='overflow-hidden rounded-full border border-gray-500 bg-gray-500 text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='relative top-1 h-6 w-6'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
};

export default Header;
