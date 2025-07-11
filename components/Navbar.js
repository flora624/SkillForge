import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

// The Main Navbar
export default function Navbar() {
  const { isLoggedIn, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* The Logo */}
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="SkillForge Logo" width={80} height={40} priority />
          <svg
          viewBox="0 0 24 24"
          position="fixed"
          >
            
          </svg>
        </Link>
        
        {/* The Main Navigation Links */}
        <ul className="nav-links">
          <li><Link href="/#features">Why SkillForge?</Link></li>
          <li><Link href="/#projects">Projects</Link></li>
          
          {isClient && !loading && (
            isLoggedIn ? (
              <>
                {/* --- THIS IS THE NEW SVG ICON LINK --- */}
                <li>
                  <Link href="/profile" className="profile-icon-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="profile-svg-icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
                {/* --- END OF SVG ICON LINK --- */}
                
                <li><a onClick={handleLogout} className="logout-button">Logout</a></li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/signup" className="btn btn-primary">Sign Up</Link></li>
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}