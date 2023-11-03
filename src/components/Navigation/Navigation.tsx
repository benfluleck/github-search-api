import Star from '@components/Star/Star';
import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  children?: ReactNode | undefined;
}

const Navigation: FC<NavigationProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <nav
      data-testid="nav-component"
      className="bg-white border-solid border-black w-full h-16 shadow-md shadow-gray-200 flex justify-center sticky top-0"
    >
      <div className="w-5/12 max-[749px]:w-full">
        <div className="flex h-full gap-8 max-[749px]:px-2">
          {children}
          <Link aria-label="favourite" className="flex items-center" to="/favourites">
            <Star isStared={pathname === '/favourites'} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
