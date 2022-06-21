import './Header.css';
import React,{  useEffect } from 'react';
import logo from '../../images/logo.png';
import {useDispatch,useSelector} from 'react-redux'
import { fetchNews } from '../../redux/thunks/newsThunk';
import { fetchQuote } from '../../redux/thunks/quoteThunk';
import { _quote } from '../../redux/selectors/quoteSelectors';

function Header() {
  const dispatch = useDispatch();
  const quote = useSelector(_quote)
  
  const handleOnKeyUp = (e) =>{
    const value = e.target.value;
    dispatch(fetchNews(value))
  }
  useEffect(()=>{
    dispatch(fetchQuote());
  },[])
  return (
    <>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={logo}/>
      </div>
      <div className='quote'>{quote}</div>
      <div className='search-parent'>
        <input className='searchbox' type="text" onKeyUp={handleOnKeyUp} placeholder="Search News..."/>
        <div className='search'>
        </div>
      </div>
    </>
  );
}

export default Header;
