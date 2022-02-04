import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { SearchInput } from '@components/Input';
import ActionButton from '@components/Button';

import { useWeb3Actions, useWeb3State } from '@features/web3/context';
import { metaMaskConnector } from '@features/web3/connectors';
import useFetchUserProfile from '@api/user/useFetchUserProfile';

import useDisableBodyScroll from '@shared/hooks/useDisableBodyScroll';

import Logo from '@assets/images/kitsumon-logo.png';

const Header = () => {
  const { pathname, push } = useRouter();
  const [open, setIsOpen] = useState(false);

  const { connect, disconnect } = useWeb3Actions();
  const { currentAddress } = useWeb3State();

  const { data: user } = useFetchUserProfile(currentAddress);

  const activeRoute = (link) => pathname === link;

  useDisableBodyScroll(open);

  const handleRestrictRoute = (e, route) => {
    e.preventDefault();
    if (route === '/account-settings') {
      if (!currentAddress) {
        connect(metaMaskConnector);
      }
      push('/account-settings');
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo-nav">
          <Link href="/" passHref>
            <a aria-label="Kitsumon logo">
              <img src={Logo.src} width="110" height="32" alt="Kitsumon logo" />
            </a>
          </Link>
          <SearchInput className="mobile-hide" />
        </div>
        <ul className={`nav-menu ${open ? 'active' : ''}`}>
          <li className="nav-item tablet-hide">
            <ul className="page-nav-menu">
              <li className="page-nav-item">
                <a
                  href="/"
                  rel="noopener noreferrer"
                  aria-label="Kitsumon homepage">
                  HOME
                </a>
              </li>
              <li className="page-nav-item">
                <Link href="/" passHref>
                  <a aria-label="Kitsumon marketplace">MARKET</a>
                </Link>
              </li>
              <li className="page-nav-item">
                <a
                  href="https://wiki.kitsumon.com/documentation/whitepaper"
                  rel="noopener noreferrer"
                  aria-label="Kitsumon github whitepaper">
                  WHITE PAPER
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item nav-item-search tablet-hide">
            <SearchInput className=" tablet-hide" />
          </li>
          <li className="nav-item">
            <Link href="/" passHref>
              <a
                className={activeRoute('/') ? 'selected' : ''}
                aria-label="Home">
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/explore" passHref>
              <a
                className={activeRoute('/explore') ? 'selected' : ''}
                aria-label="Explore">
                Explore
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <a
              href=""
              className={activeRoute('/account-settings') ? 'selected' : ''}
              onClick={(e) => handleRestrictRoute(e, '/account-settings')}
              aria-label="Account">
              Account
            </a>
          </li>

          <li className="nav-item">
            <div className="connect">
              <ActionButton
                label={
                  !currentAddress
                    ? 'Connect'
                    : user?.username || `${currentAddress.substring(0, 12)}...`
                }
                onClick={() => {
                  if (!currentAddress) {
                    connect(metaMaskConnector);
                  } else {
                    disconnect();
                  }
                }}
              />
            </div>
          </li>
        </ul>
        <div
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={`hamburger ${open ? 'active' : ''}`}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
