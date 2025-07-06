// File: src/components/sidebar/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  User,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() =>
    JSON.parse(localStorage.getItem('sidebar-collapsed')) || false
  );

  const [dropdowns, setDropdowns] = useState({
    patients: true,
    incidents: true,
    calendar: true,
    doctors: true,
    appointments: true // <-- add this for patient role
  });

  const handleToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
  };

  const handleLogout = () => {
    logout();
    localStorage.setItem('sidebar-collapsed', JSON.stringify(true));
    navigate('/');
  };

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    if (currentUser) {
      setCollapsed(false);
      localStorage.setItem('sidebar-collapsed', 'false');
    }
  }, [currentUser]);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`bg-white h-screen shadow-lg transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="text-xl font-bold text-blue-600">ENTNT</span>}
        <button onClick={handleToggle} className="text-gray-500 hover:text-blue-600">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        <NavItem to={currentUser?.role === 'Admin' ? '/dashboard' : '/patient-dashboard'} icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} isActive={isActive} />

        {currentUser?.role === 'Admin' && (
          <>
            <Dropdown
              label="Patients"
              icon={Users}
              collapsed={collapsed}
              open={dropdowns.patients}
              onToggle={() => toggleDropdown('patients')}
              items={[
                { label: 'All Patients', to: '/patients' },
                { label: 'Add Patient', to: '/patients/new' },
                
              ]}
              isActive={isActive}
            />

            <Dropdown
              label="Incidents"
              icon={FileText}
              collapsed={collapsed}
              open={dropdowns.incidents}
              onToggle={() => toggleDropdown('incidents')}
              items={[
                { label: 'View Appointments', to: '/incidents' },
                { label: 'Book Appointment', to: '/incidents/new' }
              ]}
              isActive={isActive}
            />

            <Dropdown
              label="Calendar"
              icon={CalendarCheck}
              collapsed={collapsed}
              open={dropdowns.calendar}
              onToggle={() => toggleDropdown('calendar')}
              items={[
                { label: 'View Calendar', to: '/calendar' }
              ]}
              isActive={isActive}
            />

            <Dropdown
              label="Doctors"
              icon={Stethoscope}
              collapsed={collapsed}
              open={dropdowns.doctors}
              onToggle={() => toggleDropdown('doctors')}
              items={[
                { label: 'All Doctors', to: '/doctors' },
                { label: 'Add Doctor', to: '/doctors/new'},
              ]}
              isActive={isActive}
            />
          </>
        )}

        {currentUser?.role === 'Patient' && (
          <>
            <NavItem to="/profile" icon={User} label="My Profile" collapsed={collapsed} isActive={isActive} />
            <Dropdown
              label="Appointments"
              icon={FileText}
              collapsed={collapsed}
              open={dropdowns.appointments} // <-- use 'appointments' key
              onToggle={() => toggleDropdown('appointments')}
              items={[
                { label: 'View Appointments', to: '/incidents' },
                { label: 'Book Appointment', to: '/incidents/new' }
              ]}
              isActive={isActive}
            />
            <Dropdown
              label="Calendar"
              icon={CalendarCheck}
              collapsed={collapsed}
              open={dropdowns.calendar}
              onToggle={() => toggleDropdown('calendar')}
              items={[
                { label: 'View Calendar', to: '/calendar' }
              ]}
              isActive={isActive}
            />
          </>
        )}
      </nav>

      <div className="p-2 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon: Icon, label, collapsed, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium transition hover:bg-blue-100 text-gray-700 ${
      isActive(to) ? 'bg-blue-100 text-blue-700' : ''
    }`}
  >
    <Icon size={20} />
    {!collapsed && <span>{label}</span>}
  </Link>
);

const Dropdown = ({ label, icon: Icon, collapsed, open, onToggle, items, isActive }) => (
  <div>
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 p-2 rounded hover:bg-blue-50"
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && (open ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
    </button>
    {!collapsed && open && (
      <div className="ml-8 mt-1 space-y-1">
        {items.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`block text-sm rounded-md p-1 pl-3 transition hover:bg-blue-100 ${
              isActive(to) ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;