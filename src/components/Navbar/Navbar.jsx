import React from 'react'
import './Navbar.css'
import download from "../../assets/download.png"
import { MdArrowOutward } from "react-icons/md";
import { CoinContext } from '../../context/CoinContext';
import { useContext } from 'react';
import {Link} from 'react-router-dom'


function Navbar() {

  const{setCurrency}= useContext(CoinContext)

  const currencyHandler = (e)=>{
     switch (e.target.value){
      case "usd":{
        setCurrency({name:"usd", symbol:"$"})
        break
      }
      case "eur":{
        setCurrency({name:"eur", symbol:"€"})
        break
      }
      case "inr":{
        setCurrency({name:"inr", symbol:"₹"})
        break
      }
      default:{
        setCurrency({name:"usd", symbol:"$"})
        break
      }
     }
  }


  return (
    <div className='navbar flex flex-wrap p-5 justify-between items-center border-y cursor-pointer '>
      <Link to={`/`}>
      <img src={download} alt="" className='h-8'/>
      </Link>
      <ul className='flex justify-center items-center  gap-10 align-middle '>
        <Link to={`/`}><li>Home</li></Link>
        <li>Features</li>
        <li>Prising</li>
        <li>Blog</li>
      </ul>
      <div className='nav-right flex justify-center gap-4'>
        <select onChange={currencyHandler} className='p-1 bg-transparent '>
            <option className='text-black'  value="usd">Usd</option>
            <option className='text-black' value="eur">Eur</option>
            <option className='text-black' value="inr">Inr</option>
        </select>
        <button className='flex justify-center border rounded-xl border-white-100 bg-white p-1.5 px-2 text-black'>Sign Up <MdArrowOutward /></button>
      </div>
    </div>
  )
}

export default Navbar
