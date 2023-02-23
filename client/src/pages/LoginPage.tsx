import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert('login success');
      setRedirect(true);
    } catch (err) {
      alert('login failed');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mt-4 flex grow items-center justify-around'>
      <div className='mb-64'>
        <h1 className='mb-4 text-center text-4xl'>Login</h1>
        <form
          onSubmit={e => loginSubmitHandler(e)}
          className='mx-auto max-w-md'
        >
          <input
            type='text'
            placeholder='your@email.com'
            value={email}
            onChange={e => emailHandler(e)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={e => passwordHandler(e)}
          />
          <button className='primary'>Login</button>
          <p className='py-2 text-center text-gray-500'>
            Don't have an account yet?
            <Link className='text-black underline' to={'/register'}>
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
