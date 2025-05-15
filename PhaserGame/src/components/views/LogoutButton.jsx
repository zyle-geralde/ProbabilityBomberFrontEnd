import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../controllers/AuthController';

function LogoutButton () {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser({ navigate });
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;