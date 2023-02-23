import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('registration success');
    } catch (e) {
      alert('Registration failed. Try again later.');
    }
  };

  return (
    <div className='mt-4 flex grow items-center justify-around'>
      <div className='mb-64'>
        <h1 className='mb-4 text-center text-4xl'>Register</h1>
        <form onSubmit={registerUserHandler} className='mx-auto max-w-md'>
          <input
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={e => nameChangeHandler(e)}
          />
          <input
            type='text'
            placeholder='your@email.com'
            value={email}
            onChange={e => emailChangeHandler(e)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={e => passwordChangeHandler(e)}
          />
          <button className='primary'>Register</button>
          <p className='py-2 text-center text-gray-500'>
            Already a member?
            <Link className='text-black underline' to={'/login'}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
