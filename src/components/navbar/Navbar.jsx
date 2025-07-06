import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { logout, currentUser } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dental Dashboard</h1>
      
    </nav>
  );
};

export default Navbar;