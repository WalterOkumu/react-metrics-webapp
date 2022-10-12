/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcSearch, FcHome } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';
import { VscMenu } from 'react-icons/vsc';
import Search from '../Search';
import './Navbar.styles.scss';

const Navbar = ({ handleSearch }) => {
  const [clickSearch, setClickSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setClickSearch(!clickSearch);
  };

  const navigateBack = () => {
    if (location.pathname === '/') {
      setClickSearch(!clickSearch);
    } else {
      navigate('/');
    }
  };

  return (
    <nav>
      {
        clickSearch
          ? (
            <div className="navbar">
              <GrClose onClick={navigateBack} style={{ fontSize: '1.5em' }} />
              <Search
                onBlur={handleClick}
                handleSearch={handleSearch}
              />
            </div>
          )
          : (
            <div className="navbar">
              {
                clickSearch
                  ? (<GrClose onClick={navigateBack} style={{ fontSize: '1.5em' }} />)
                  : (<VscMenu />)
              }
              {
                location.pathname === '/'
                  ? (
                    <FcSearch
                      style={{ fontSize: '1.5em' }}
                      onClick={handleClick}
                    />
                  )
                  : (
                    <FcHome
                      style={{ fontSize: '1.5em' }}
                      onClick={navigateBack}
                    />
                  )
              }
            </div>
          )
      }
    </nav>
  );
};

export default Navbar;
