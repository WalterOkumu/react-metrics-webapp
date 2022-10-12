/* eslint-disable react/prop-types */
import React from 'react';
import './Search.styles.scss';

const Search = ({ handleSearch }) => (
  <input type="text" className="search-input-box" onChange={(event) => handleSearch(event.target.value)} />
);

export default Search;
