import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { navs } from '../constants/navigations';
import './SharedLayout.css';

export const SharedLayout = () => {
  return (
    <div>
      <header className="header">
        <nav>
          <ul className="list">
            {navs.map(nav => (
              <NavLink to={nav.url} children={nav.text} key={nav.text} />
            ))}
          </ul>
        </nav>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
