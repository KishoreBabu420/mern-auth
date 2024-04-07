import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialUser = {
  username: '',
  email: '',
  password: '',
};
const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const { username, email, password } = user;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && email && password) {
      try {
        setIsLoading(true);
        const newUser = { username, email, password };
        const res = await axios.post(`/api/auth/register`, newUser);
        if (res.data.success) {
          setIsLoading(false);
          toast.success(res.data.message);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      } finally {
        setUser(initialUser);
      }
    } else {
      toast.error(`All fields are required`);
    }
  };
  return (
    <main className='max-w-lg p-3 mx-auto'>
      <h1 className='my-4 text-3xl font-bold text-center'>Create an Account</h1>

      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Username'
          id='username'
          onChange={handleChange}
          name='username'
          value={username}
          className='p-3 rounded-lg bg-slate-100'
        />
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
          disabled={isLoading}
          type='submit'
          className='p-3 text-white uppercase rounded-lg shadow-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? 'Loading...' : 'Create an Account'}
        </button>
      </form>

      <div className='flex justify-center gap-2 mt-5 text-center'>
        <p>
          Have an account? &nbsp;
          <span className='text-blue-500'>
            <Link to='/login'>Login</Link>
          </span>
        </p>
      </div>
    </main>
  );
};

export default Register;
