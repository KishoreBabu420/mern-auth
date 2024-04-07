import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

import { uploadFile } from '../utils/firebase';

import { toast } from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
    profilePicture: currentUser.profilePicture,
  });

  const { username, email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
      setImage(undefined);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const path = `uploads/${currentUser.username}-${Date.now()}`;

    // Use toast.promise for upload with notifications
    toast
      .promise(
        uploadFile(image, path), // Pass the upload function as the promise
        {
          loading: 'Uploading...',
          success: <b>File uploaded successfully!</b>,
          error: <b>File uploading failed!</b>,
        },
        {
          style: {
            minWidth: '250px',
          },
          success: {
            duration: 3000,
            icon: '🔥',
          },
        },
      )
      .then((downloadURL) => {
        setUser({ ...user, profilePicture: downloadURL });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        profilePicture: user.profilePicture,
      };
      console.log(updatedUser);
      const res = await axios.post(
        `/api/user/update/${currentUser._id}`,
        updatedUser,
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <main className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form
        className='flex flex-col gap-6'
        onSubmit={handleSubmit}
      >
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={user.profilePicture || currentUser.profilePicture}
          alt={currentUser.username}
          className='self-center w-24 h-24 my-2 transition-all duration-300 ease-in-out rounded-full cursor-pointer hover:scale-105'
          onClick={(e) => fileRef.current.click(e)}
        />
        <input
          type='text'
          id='username'
          name='username'
          placeholder='Username'
          className='p-3 rounded-lg bg-slate-100'
          value={username}
          onChange={handleChange}
        />

        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          className='p-3 rounded-lg bg-slate-100'
          value={email}
          onChange={handleChange}
        />

        <input
          type='password'
          id='password'
          placeholder='Password'
          name='password'
          className='p-3 rounded-lg bg-slate-100'
          value={password}
          onChange={handleChange}
        />

        <button className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between gap-2 mt-5'>
        <p className='text-center text-red-700 cursor-pointer'>
          Delete your account
        </p>
        <p className='text-center text-red-700 cursor-pointer'>Sign Out</p>
      </div>
    </main>
  );
};

export default Profile;
