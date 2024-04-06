import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-200'>
      <div className='flex items-center justify-between max-w-6xl p-3 mx-auto'>
        <h1 className='font-bold'>
          <Link to='home'>Auth App</Link>
        </h1>
        <ul className='flex gap-4'>
          <li>
            <Link to='home'>Home</Link>
          </li>
          <li>
            <Link to='about'>About</Link>
          </li>
          <li>
            <Link to='profile'>Profile</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
