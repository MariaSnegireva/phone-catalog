/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import debounce from 'lodash.debounce';
import {
  NavLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { StateStore } from '../../store/StoreContext';
import { Navbar } from '../Navbar/Navbar';
import { ICONS } from '../../images/icons/icons';
import './Header.scss';
import { getLinkLogoClass } from '../../helpers/getLinkClass';

export const Header = () => {
  const { products, totalCartQuantity, pathname } = useContext(StateStore);
  const [query, setQuery] = useState('');
  const [isQuery, setIsQuery] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    navigate('/menu');
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (isMenuOpen && pathname === '/menu') {
        handleMenuClose();
      } else {
        handleMenuClick();
      }
    }
  };

  useEffect(() => {
  if (products.length !== 0) {
    switch (pathname) {
      case '/phones':
        setIsQuery(true);
        setPlaceholder('Search in phones...');
        break;

      case '/tablets':
        setIsQuery(true);
        setPlaceholder('Search in tablets...');
        break;

      case '/accessories':
        setIsQuery(true);
        setPlaceholder('Search in accessories...');
        break;

      case '/favourites':
        setIsQuery(true);
        setPlaceholder('Search in favourites...');
        break;

      default:
        setIsQuery(false);
        setPlaceholder('');
    }
  }

    setQuery(searchParams.get('query') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, products, searchParams]);

  const favourites = products.filter(item => item.addedToFavourites === true);
  const carts = products.filter(item => item.addedToCart === true);

  const debouncedQuery = useMemo(
    () => debounce(
      (value) => {
        if (!value.trim()) {
          searchParams.delete('query');
        } else {
          searchParams.set('query', value.trim());
        }

        setSearchParams(searchParams);
      }, 500,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    debouncedQuery(value);
  };

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return (
    <header className="header">
      <div className=" header__left-side">
        <Navbar />
      </div>

      <div className="header__right-side">
        {isQuery && (
          <div className="header__right-side__search">
            <input
              type="text"
              className="header__right-side__search--query"
              placeholder={placeholder}
              value={query}
              onChange={handleQueryChange}
            />
            {query.length ? (
              <button
                data-cy="searchDelete"
                type="button"
                className="header__right-side__search--button"
                onClick={clearQuery}
              >
                <img
                  src={ICONS.close}
                  alt="Clear search"
                  className="header__right-side__search--icon"
                />
              </button>
            ) : (
              <img
                src={ICONS.search}
                alt="Search"
                className="header__right-side__search--icon"
              />
            )}
          </div>
        )}

        <div className="header__right-side__icon">
          {isMenuOpen && pathname === '/menu'
            ? (
              <div
                className="header__right-side__icon--menu--close"
                onClick={handleMenuClose}
                role="button"
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <img
                  src={ICONS.close}
                  alt="Close side menu"
                  className="pageMenu__bottom__icon--logo"
                />
              </div>
            ) : (
              <NavLink
                to="/menu"
                onClick={handleMenuClick}
                className={getLinkLogoClass}
              >
                <img
                  src={ICONS.menu}
                  alt="Side menu"
                  className="header__right-side__icon--menu"
                />
              </NavLink>
            )}
        </div>

        <div className="header__right-side__icon">
          <NavLink
            to="/favourites"
            className={getLinkLogoClass}
          >
            <img
              src={ICONS.favourites}
              alt="Favourites"
              className="header__right-side__icon--logo"
            />

            {
              !!favourites.length && (
                <div className="header__right-side__icon__counter">
                  {favourites.length}
                </div>
              )
            }
          </NavLink>
        </div>

        <div className="header__right-side__icon">
          <NavLink
            to="/cart"
            className={getLinkLogoClass}
          >
            <img
              src={ICONS.cart}
              alt="Cart"
              className="header__right-side__icon--logo"
            />

            {
              !!carts.length && (
                <div className="header__right-side__icon__counter">
                  {totalCartQuantity}
                </div>
              )
            }
          </NavLink>
        </div>
      </div>
    </header>
  );
};
