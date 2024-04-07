import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200'>
      <div className='flex items-center justify-between max-w-6xl p-3 mx-auto'>
        <h1 className='text-2xl font-black uppercase'>
          <Link to='/'>
            <span className='text-red-800 hover:text-red-600'>Auth</span> App
          </Link>
        </h1>
        <ul className='flex items-center gap-6'>
          <li className='font-bold uppercase text-md hover:text-red-800'>
            <Link to='/'>Home</Link>
          </li>
          <li className='font-bold uppercase text-md hover:text-red-800'>
            <Link to='/about'>About</Link>
          </li>
          <li className='font-bold uppercase text-md hover:text-red-800'>
            {currentUser ? (
              <Link to='/profile'>
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.username}
                  className='w-10 h-10 rounded-full'
                />
              </Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
