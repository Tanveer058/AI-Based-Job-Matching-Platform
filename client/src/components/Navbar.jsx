import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import LogoImg from '../assets/getHiredLogo2-removebg-preview.png';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinks = [
    { label: 'Home', path: '/' },
    auth.role === 'candidate' && { label: 'Dashboard', path: '/candidate-dashboard' },
    auth.role === 'employer' && { label: 'Dashboard', path: '/employer-dashboard' },
    auth.role === 'employer' && { label: 'Post a Job', path: '/post-job' },
    !auth.token && { label: 'Login', path: '/login' },
    !auth.token && { label: 'Signup', path: '/signup' },
  ].filter(Boolean);


  return (
    <>
      <AppBar className='shadow mb-8' position="static" sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar className="flex justify-between items-center px-4">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', margin: 20 }}>  
              <img
                src={LogoImg}
                alt="Logo"
                style={{
                  height: 60,
                  // margin: 20,
                  display: 'block',
                  marginTop: 0,
                  marginBottom: 0,
                  objectFit: 'contain'
                }}
              />
            </Link>

          {isMobile ? (
            <IconButton edge="end" onClick={toggleDrawer}>
              <MenuIcon sx={{ color: '#333' }} />
            </IconButton>
          ) : (
            <div className="flex gap-4">
              {/* {navLinks.map(({ label, path }) => (
                <div>
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `nav-link relative px-2 py-2 font-medium transition duration-200 ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
                </div>
              ))} */}
              {navLinks.map(({ label, path }) => (
                <div key={label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `nav-link relative px-2 py-2 font-medium transition duration-200 ${
                        isActive ? 'active' : ''
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </div>
              ))}

              {auth.token && (
                <Button
                  onClick={logout}
                  sx={{
                    color: '#222',
                    fontWeight: '550',
                    fontSize: '1rem',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    position: 'relative',
                    bottom: 5,
                    minWidth: 'unset',
                    backgroundColor: '#7fe7ebbe',
                    '&:hover': {
                      backgroundColor: 'rgba(88, 177, 172, 0.77)',
                      color: '#000'
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List className="w-64">
          {/* {navLinks.map(({ label, path }) => (
            <ListItem button key={label} component={navLinks} to={path} onClick={toggleDrawer}>
              <ListItemText primary={label} />
            </ListItem>
          ))} */}
          {navLinks.map(({ label, path }) => (
            <ListItem
              button
              key={label}
              component={Link}
              to={path}
              onClick={toggleDrawer}
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}

          {auth.token && (
            <ListItem button onClick={() => { logout(); toggleDrawer(); }}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
