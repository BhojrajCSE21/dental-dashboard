import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import PatientList from "./pages/patients/PatientList";
import PatientView from "./pages/patients/PatientView";
import IncidentList from "./pages/incidents/IncidentList";
import CalendarView from "./pages/calendar/CalendarView";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import AddPatient from "./pages/patients/AddPatient";
import AddIncident from "./pages/incidents/AddIncident";
import EditPatient from "./pages/patients/EditPatient";
import AddDoctor from "./pages/doctor/AddDoctor";
import DoctorList from "./pages/doctor/DoctorList";
import EditDoctor from "./pages/doctor/EditDoctor";
import EditIncident from "./pages/incidents/EditIncident";

const AppLayout = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  ) : (
    children
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes inside layout */}
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <Dashboard />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/patients"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <PatientList />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/incidents"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <IncidentList />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/calendar"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <CalendarView />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              <AppLayout>
                <ProtectedRoute role="Patient">
                  <PatientDashboard />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AppLayout>
                <ProtectedRoute role="Patient">
                  <PatientView />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/patients/new"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <AddPatient />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/patients/edit"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <EditPatient />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/incidents/new"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <AddIncident />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/doctors/new"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <AddDoctor />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/doctors"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <DoctorList />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/doctors/edit"
            element={
              <AppLayout>
                <ProtectedRoute role="Admin">
                  <EditDoctor />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          <Route
            path="/incidents/edit"
            element={
              <AppLayout>
                <ProtectedRoute role='Admin'>
                  <EditIncident />
                </ProtectedRoute>
              </AppLayout>
            }
          />
          {/* Catch-all redirect if needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
