import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, 
  useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import LogoImg from '../assets/getHiredLogo2-removebg-preview.png';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      {/* Animated Toggle Icon */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: 8,        // Move closer to top
            right: 12,      // Move closer to right
            zIndex: 1500,
            padding: 0.5,  // Minimal padding
            transition: 'transform 0.3s ease',
            '&:hover': {
              backgroundColor: 'transparent'
            },
            backgroundColor: 'transparent'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s ease'
            }}
          >
            {drawerOpen ? (
              <CloseIcon sx={{ color: '#333', fontSize: 28 }} />
            ) : (
              <MenuIcon sx={{ color: '#333', fontSize: 28 }} />
            )}
          </Box>
        </IconButton>
      )}


      <AppBar
        position="fixed"
        className="shadow"
        sx={{
          backgroundColor: '#ffffff',
          transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1200,
          height: { xs: 56, sm: 80 },
          justifyContent: 'center'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: { xs: 56, sm: 64 },
            px: 2
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={LogoImg}
              alt="Logo"
              style={{
                height: isMobile ? 40 : 60,
                objectFit: 'contain'
              }}
            />
          </Link>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map(({ label, path }) => (
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
              ))}

              {auth.token && (
                <Button
                  onClick={logout}
                  sx={{
                    color: '#222',
                    fontWeight: 550,
                    fontSize: '1rem',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
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
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 250,
            paddingTop: 2,
            backgroundColor: '#fff',
            zIndex: 1400
          }
        }}
      >
        <List>
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

