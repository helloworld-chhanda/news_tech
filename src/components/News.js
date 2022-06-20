import './News.css';
import React,{  useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../images/logo.png';

function News() {
  const [isLoading,setIsLoading] = useState(true);
  const [allNews,setAllNews] = useState([]);
  const getNews = async (search='apple') =>{
    setIsLoading(true);
    if(!search) {
      setIsLoading(false);
      return;
    }
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${search}&from=2022-06-16&to=2022-06-16&sortBy=popularity&apiKey=67a73fe9e2034c589ed00342ef80e50d`)
    const articles = response.data.articles;
    setAllNews(articles);
    setIsLoading(false);
    console.log(articles);
  }
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
    getNews(value);
  }
  useEffect(()=>{
    getNews();
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
