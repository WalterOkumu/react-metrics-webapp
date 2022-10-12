/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { useDispatch, useSelector } from 'react-redux';
import CoinDisplay from '../CoinsDisplay';
import Navbar from '../Navbar';
import Loading from '../Loading';
import { fetchCrypto } from '../../features/cryptoSlice';
import './Home.styles.scss';

const Home = () => {
  const dispatch = useDispatch();

  const [globalStats, setGlobalStats] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [index, setIndex] = useState(20);

  const marketData = useSelector((state) => state?.crypto?.data);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCrypto());
  }, [dispatch]);

  useEffect(() => {
    setGlobalStats(marketData?.data?.stats);
    setCoinList(marketData?.data?.coins);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [marketData]);

  const handleSearch = (searchTerm) => {
    setSearch(coinList.filter((coin) => (
      coin.name.toLowerCase().includes(searchTerm)
      || coin.symbol.toLowerCase().includes(searchTerm)
    )));
  };

  const renderHome = () => globalStats && (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="container">
        <div className="header">
          Global Crypto Stats
        </div>
        <div className="stats-cards-container">
          <div className="stats-card hvr-shutter-in-horizontal">
            <div className="amount">
              {millify(globalStats.total)}
            </div>
            <div className="description">
              Total
            </div>
          </div>

          <div className="stats-card hvr-shutter-in-horizontal">
            <div className="amount">
              {millify(parseInt(globalStats.total24hVolume, 10))}
            </div>
            <div className="description">
              Total 24h Volume
            </div>
          </div>

          <div className="stats-card hvr-shutter-in-horizontal">
            <div className="amount">
              {millify(globalStats.totalCoins)}
            </div>
            <div className="description">
              Total Coins
            </div>
          </div>

          <div className="stats-card hvr-shutter-in-horizontal">
            <div className="amount">
              {millify(globalStats.totalExchanges)}
            </div>
            <div className="description">
              Total Exchanges
            </div>
          </div>

          <div className="stats-card hvr-shutter-in-horizontal">
            <div className="amount">
              {millify(parseInt(globalStats.totalMarketCap, 10))}
            </div>
            <div className="description">
              Total Market Cap
            </div>
          </div>

          <div className="stats-card hvr-shutter-in-horizontal">
            <div className="amount">
              {millify(globalStats.totalMarkets)}
            </div>
            <div className="description">
              Total Markets
            </div>
          </div>
        </div>
        <div className="coin-header">
          Top
          {' '}
          {index}
          {' '}
          Cryptocurrencies
          <button
            type="button"
            className="view-all hvr-sweep-to-right"
            onClick={() => {
              setViewAll(!viewAll);

              if (viewAll) {
                setIndex(20);
              } else {
                setIndex(100);
              }
            }}
          >
            {viewAll ? 'View Less' : 'View All'}
          </button>
        </div>
        {
          search && (
            <>
              <hr />
              <div className="search-results">
                Search Results...
                <button
                  type="button"
                  className="clear-search hvr-reveal"
                  onClick={() => setSearch('')}
                >
                  Clear Search
                </button>
              </div>
              <CoinDisplay coinList={search} />
              <hr />
            </>
          )
        }

        {
          viewAll
            ? <CoinDisplay coinList={coinList} />
            : <CoinDisplay coinList={coinList.slice(0, 20)} />
        }
      </div>
    </>
  );

  return (
    <>
      {
        loading ? <Loading /> : renderHome()
      }
    </>
  );
};

export default Home;
