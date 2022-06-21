import './News.css';
import React,{  useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../images/logo.png';
import {useDispatch,useSelector} from 'react-redux'
import { _allNews, _isLoading } from '../redux/selectors/newsSelectors';
import { fetchNews } from '../redux/thunks/newsThunk';

function News() {
  const dispatch = useDispatch();
  const isLoading = useSelector(_isLoading)
  const allNews = useSelector(_allNews)
  
  const [quote,setQuote] = useState('');
  const getQuote = async () =>{
    let response = await axios.get(`https://api.quotable.io/random`);
    let content = response.data.content;
    console.log(response);
    setQuote(content);
    console.log(content);
  }
  const handleOnKeyUp = (e) =>{
    const value = e.target.value;
    console.log(value);
    dispatch(fetchNews())
  }
  useEffect(()=>{
    dispatch(fetchNews())
    getQuote();
  },[])
  return (
    <div className='container'>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={logo}/>
      </div>
      <div className='quote'>{quote}</div>
      <div className='search-parent'>
        <input className='searchbox' type="text" onKeyUp={handleOnKeyUp} placeholder="Search News..."/>
        <div className='search'>
        </div>
      </div>
      <div className='image-organize'>
      {
        isLoading ? <div className='loader'></div> : allNews.map((news,index)=>{
          return (
            <div className='news-container' key={index}>
              <div className='news-image-container'>
                <img className='news-image' alt="newsImage" src={news.urlToImage}/>
                {news.author ? (
                  <div className='author'>
                    {news.author}
                  </div>
                ):null}
              </div>
              <div className='news-content'>
                  {news.title}
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default News;
