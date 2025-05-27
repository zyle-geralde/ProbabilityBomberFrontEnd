import { Navigate } from 'react-router-dom';
import * as AuthController from '../../controllers/AuthController'; 

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = AuthController.getCurrentUserRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;