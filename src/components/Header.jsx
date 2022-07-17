import React from 'react';
import 'stylesheets/Header.css';
import appLogo from 'logo/appLogo.png';
import { useAuth } from 'providers/AuthProvider';

function Header() {
  const auth = useAuth();
  const { user, sessionData } = auth;

  return (
    <header>
      <div className="appName">
        <img src={appLogo} alt="" />
        <h1>Keeper</h1>
      </div>
      <div className="userUtilities">
        {sessionData.isLoggedIn && (
          <>
            <h3>Welcome, {user?.firstName}!</h3>
            <button onClick={auth.logout} className="logout">
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
