import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

import { uploadFile } from '../utils/firebase';

import { toast } from 'react-hot-toast';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [user, setUser] = useState({});

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
  return (
    <main className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-6'>
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
          defaultValue={currentUser.username}
          placeholder='Username'
          className='p-3 rounded-lg bg-slate-100'
        />

        <input
          type='email'
          id='email'
          name='email'
          defaultValue={currentUser.email}
          placeholder='Email'
          className='p-3 rounded-lg bg-slate-100'
        />

        <input
          type='password'
          id='password'
          placeholder='Password'
          className='p-3 rounded-lg bg-slate-100'
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
