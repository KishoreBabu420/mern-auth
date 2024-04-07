import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInWithGooglePopup } from '../utils/firebase';
import { loginSuccess } from '../redux/user/user.slice';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = async () => {
    try {
      const result = await signInWithGooglePopup();
      const newUser = {
        username: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      const res = await axios.post('api/auth/google', newUser);
      if (res.data.success) {
        dispatch(loginSuccess(res.data));
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      toast.error(`Couldn't login with Google`);
    }
  };
  return (
    <button
      type='button'
      onClick={clickHandler}
      className='p-3 text-white uppercase bg-red-500 rounded-lg hover:opacity-90'
    >
      Sign in with google
    </button>
  );
};

export default OAuth;
