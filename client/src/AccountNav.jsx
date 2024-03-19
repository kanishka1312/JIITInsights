// AccountNav.js
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const { isAdmin } = useContext(UserContext);

  function linkClasses(type = null) {
    let classes = 'inline-flex border border-radius rounded-2xl gap-1 py-2 px-6 bg-gradient-to-r from-pink-500 to-purple-500 from-pink-500 to-purple-500 text-transparent bg-clip-text ';
    if (type === subpage) {
      classes += ' bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 via-yellow-500 from-purple-500 to-red-500 text-transparent bg-clip-text';
    } else {
      classes += ' bg-white ';
    }
    return classes;
  }

  return (
    <nav className="w-full flex  justify-center items-center mt-8 gap- mb-8 gap-16">
      <Link className={linkClasses('profile')} to={'/account'}>
             My Profile
      </Link>
      <Link className={linkClasses('participated')} to={'/account/participated'}>
        Participated Events
      </Link>
      {isAdmin && (
        <Link className={linkClasses('hosted')} to={'/account/hosted'}>
          Hosted Events
        </Link>
      )}
    </nav>
  );
}