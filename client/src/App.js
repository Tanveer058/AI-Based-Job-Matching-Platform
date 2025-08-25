import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import JobDetails from './pages/JobDetails';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute.js';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard.js';
import ResumeBuilder from './pages/ResumeBuilder.js';
import PublicRoute from './components/PublicRoute.js';
import PostJob from './pages/PostJob.js';
import MyPostedJobs from './pages/MyPostedJobs.js';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import './app.css';
import PageNotFound from './pages/PageNotFound.jsx';
import UpdateJob from './pages/UpdateJob.js';
import { Toaster } from 'react-hot-toast';
import CandidateResumes from './pages/CandidateResumes.js';
import UpdateResume from './pages/UpdateResume.jsx';

function App() {
  return (
    <div className="app-container">
      <Toaster position="top-center" /> {/* Global toast notifications */}
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />

            <Route path="/candidate-dashboard" element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateDashboard />
              </ProtectedRoute>
            } />

            <Route path="/employer-dashboard" element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            } />

            <Route path="/job/:id" element={
              <ProtectedRoute allowedRole="employer">
                <JobDetails />
              </ProtectedRoute>
            } />

            <Route path="/resume-builder" element={
              <ProtectedRoute allowedRole="candidate">
                <ResumeBuilder />
              </ProtectedRoute>
            } />

            <Route path="/post-job" element={
              <ProtectedRoute allowedRole="employer">
                <PostJob />
              </ProtectedRoute>
            } />

            <Route path="/my-posted-jobs" element={
              <ProtectedRoute allowedRole="employer">
                <MyPostedJobs />
              </ProtectedRoute>
            } />

            <Route path="/update-job/:jobId" element={
              <ProtectedRoute allowedRole="employer">
                <UpdateJob />
              </ProtectedRoute>
            } />

            <Route path="/candidate-resumes" element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateResumes />
              </ProtectedRoute>
            } />

            
            <Route path="/update-resume/:id" element={
              <ProtectedRoute allowedRole="candidate">
                <UpdateResume />
              </ProtectedRoute>
            } />



          

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;



