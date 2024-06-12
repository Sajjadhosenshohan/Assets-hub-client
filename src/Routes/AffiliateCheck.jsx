
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
const AffiliateCheck = ({ children }) => {
  const { user, userDataEmployee } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userDataEmployee?.affiliate === 'no') {
    return (
      <div className="my-52 text-center text-3xl text-red-600">
        Please contact your HR to get affiliated with a company.
      </div>
    );
  }

  return children;
};

export default AffiliateCheck;
