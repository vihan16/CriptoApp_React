import React, { useState, useContext, useEffect } from "react";
import "../Coin/Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart.jsx/LineChart";

function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const { currency } = useContext(CoinContext);
  const [historicalData, setHistoricalData] = useState();
  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=15&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData , historicalData) {
    return (
      <div className="coin">
        <div className="coin-name flex justify-center items-center gap-4 mt-8 mb-9">
          <img src={coinData.image.small} alt="image" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart w-1/2 m-auto h-80">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info m-auto w-1/2 text-center mt-4 mb-6">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          {/* <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price}[currency.name].toLocaleString()</li>
          </ul> */}
          {/* <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap}[currency.name].toLocaleString()</li>
          </ul> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner flex justify-center m-11">
        <div className="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
        </div>
      </div>
    );
  }
}

export default Coin;
