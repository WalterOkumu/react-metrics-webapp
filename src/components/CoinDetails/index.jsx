/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FcNext } from 'react-icons/fc';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import millify from 'millify';
import { findCoin } from '../../features/cryptoSlice';
import Loading from '../Loading';
import Navbar from '../Navbar';
import './CoinDetails.styles.scss';

const CoinDetails = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();

  const coinDetails = useSelector((state) => state?.crypto?.coin?.data?.coin);

  const coinId = location.pathname.split('/')[1];

  useEffect(() => {
    setLoading(true);
    dispatch(findCoin(coinId));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const renderCoinDetails = () => (
    <>
      <Navbar />
      <div className="coin-details-container">
        <div className="header">
          <div className="coin-image-container">
            <img src={coinDetails.iconUrl} alt={coinDetails.name} className="coin-image" />
          </div>
          <div className="title">
            {coinDetails.name}
          </div>
        </div>
        <div className="body">
          <div className="chart">
            <Sparklines data={coinDetails.sparkline} width={80} height={40} margin={5}>
              <SparklinesLine color={coinDetails.color} />
              <SparklinesLine style={{
                stroke: 'none',
                fill: coinDetails.color,
                fillOpacity: '0.4',
              }}
              />
            </Sparklines>
          </div>
          <div className="stats">
            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                BTC Price
              </div>
              <div className="amount">
                {parseFloat(coinDetails.btcPrice).toFixed(4)}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                All Time High
              </div>
              <div className="amount">
                {millify(coinDetails.allTimeHigh.price)}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                Change
              </div>
              <div className={`amount ${coinDetails.change > 0 ? 'above-zero' : 'below-zero'}`}>
                {coinDetails.change}
                %
                {' '}
                {
                  coinDetails.change > 0 ? <ImArrowUp className="arrow-up" /> : <ImArrowDown className="arrow-down" />
                }
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                Market Cap
              </div>
              <div className="amount">
                {millify(coinDetails.marketCap)}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                No of Exchanges
              </div>
              <div className="amount">
                {coinDetails.numberOfExchanges}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                No of Markets
              </div>
              <div className="amount">
                {coinDetails.numberOfMarkets}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                Price
              </div>
              <div className="amount">
                {millify(coinDetails.price)}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                Rank
              </div>
              <div className="amount">
                {coinDetails.rank}
              </div>
            </div>

            <div className="stats-group hvr-shutter-in-horizontal">
              <div className="description">
                Symbol
              </div>
              <div className="amount">
                {coinDetails.symbol}
              </div>
            </div>
          </div>
          <div className="description">{HTMLReactParser(coinDetails.description)}</div>
        </div>
        <div className="footer">
          <div className="title">
            References
          </div>
          <ul className="reference-list">
            {
              coinDetails.links.map((ref) => (
                <li key={ref.url}>
                  <Link to={ref.url}>
                    <FcNext />
                    {' '}
                    {ref.name}
                    {' '}
                    -
                    {' '}
                    {ref.url}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <>
      {
        loading ? <Loading /> : renderCoinDetails()
      }
    </>
  );
};

export default CoinDetails;
