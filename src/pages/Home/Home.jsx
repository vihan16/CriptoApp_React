import React, { useState, useContext,useEffect } from 'react'
import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'

function Home() {

  const {allCoin, currency} = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const[input, setInput] = useState('')

  const inputHandler = (e)=>{
    setInput(e.target.value)
    if(e.target.value == ''){
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler = async (e)=>{
    e.preventDefault()
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }

  useEffect(()=>{
    setDisplayCoin(allCoin)
  },[allCoin])

  return (
    <div className='home flex-col justify-center '>
      <div className='hero flex-col items-center justify-center text-center '>
        <h1 className='text-6xl font-bold mt-9 p-5'>Largest <br />Crypto Marketplace</h1>
        <p className='p-5 text-xl'>Welcome to the worlds's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler} className='mt-6' action="">
          <input onChange={inputHandler} list='coinlist' value={input}  className='border-none bg-slate-600 rounded-xl h-9 w-1/4 mr-2 text-center text-black' type="text" placeholder='Search crypto' required />

          <datalist id="coinlist">
            {allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
          </datalist>

          <button className='border border-slate-600
          px-3 py-1.5  rounded-xl text-slate-600 hover:bg-slate-600 hover:text-black' type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table flex-col justify-center bg-slate-700/40 mx-7 p-2 rounded-2xl text-center mt-20 mb-10 w-3/4 mr-auto ml-auto">
        <div className="table-layout py-4 mb-4 bg-slate-900/45 rounded-xl flex justify-evenly border-b">
            <p className='flex justify-start'>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p>24h Change</p>
            <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoin.slice(0,10).map((item,index)=>(
          <Link to={`/coin/${item.id}`} className='table-layout flex justify-evenly border-b items-center p-2 hover:bg-slate-800/85 ' key={index}>
            <p className='flex self-start '>{item.market_cap_rank}</p>
            <div className='flex-col items-center  justify-center '>
              <img className='h-10' src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? 'text-green-400': "text-red-500"}>
              {Math.floor(item.price_change_percentage_24h*100)/100.}</p>
            <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
