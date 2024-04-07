import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import toast from 'react-hot-toast';

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../redux/user/user.slice';

const initialUser = {
  email: '',
  password: '',
};
const Login = () => {
  const [user, setUser] = useState(initialUser);
  const { loading, error } = useSelector((state) => state.user);
  const { email, password } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginStart());
      try {
        const newUser = { email, password };
        const res = await axios.post(`/api/auth/login`, newUser);
        if (res.data.success) {
          dispatch(loginSuccess(res.data));
          toast.success(res.data.message);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (err) {
        dispatch(loginFailure(err.response.data));
        toast.error(error.message ? error.message : 'Something went wrong!');
      } finally {
        setUser(initialUser);
      }
    } else {
      toast.error(`All fields are required`);
    }
  };
  return (
    <main className='max-w-lg p-3 mx-auto'>
      <h1 className='my-4 text-3xl font-bold text-center'>
        Login to your Account
      </h1>

      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <input
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
          name='email'
          value={email}
          className='p-3 rounded-lg bg-slate-100'
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
          name='password'
          value={password}
          className='p-3 rounded-lg bg-slate-100'
        />

        <button
          type='submit'
          className='p-3 text-white uppercase rounded-lg shadow-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className='flex justify-center gap-2 mt-5 text-center'>
        <p>
          Don&apos;t have an account? &nbsp;
          <span className='text-blue-500'>
            <Link to='/register'>Register</Link>
          </span>
        </p>
      </div>
    </main>
  );
};

export default Login;
