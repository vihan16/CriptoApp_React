import React, { useState, useContext,useEffect } from 'react'
import { CoinContext } from '../../context/CoinContext'

function Home() {

  const {allCoin, currency} = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])

  useEffect(()=>{
    setDisplayCoin(allCoin)
  },[allCoin])

  return (
    <div className='home flex justify-center items-center'>
      <div className='hero'>
        <h1>Largest <br />Crypto Marketplace</h1>
        <p>Welcome to the worlds's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form action="">
          <input type="text" placeholder='Search crypto' />
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p>24h Change</p>
            <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoin.slice(0,10).map((item,index)=>(
          <div className='table-layout' key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
