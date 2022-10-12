/* eslint-disable react/prop-types */
import React from 'react';
import millify from 'millify';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './CoinDisplay.styles.scss';
import { Link } from 'react-router-dom';

const CoinDisplay = ({ coinList }) => (
  <div className="coin-display-container">
    <ul className="coin-display-list">
      {
        coinList.map((coin) => (
          <li key={coin.uuid} className="coin-display-list-item">
            <Link to={coin.uuid}>
              <div className="coin-card hvr-shrink">
                <div className="coin-image-container">
                  <img src={coin.iconUrl} alt={coin.name} className="coin-image" />
                  <Sparklines data={coin.sparkline} width={80} height={40} margin={5}>
                    <SparklinesLine color={coin.color} />
                  </Sparklines>
                </div>
                <div className="coin-details">
                  <div className="title">{coin.name}</div>
                  <div className="symbol">{coin.symbol}</div>
                  <div className="market-cap">
                    Market Cap:
                    {' '}
                    {millify(parseInt(coin.marketCap, 10))}
                  </div>
                  <div className="price">
                    Price:
                    {' '}
                    {millify(parseInt(coin.price, 10))}
                  </div>
                  <div className="rank">
                    Rank:
                    {' '}
                    {coin.rank}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default CoinDisplay;
