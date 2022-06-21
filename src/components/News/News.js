import './News.css';
import React,{  useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { _allNews, _isLoading } from '../../redux/selectors/newsSelectors';
import { fetchNews } from '../../redux/thunks/newsThunk';
import Header from '../Header/Header';

function News() {
  const dispatch = useDispatch();
  const isLoading = useSelector(_isLoading)
  const allNews = useSelector(_allNews)
  
  useEffect(()=>{
    dispatch(fetchNews())
  },[])
  return (
    <div className='container'>
      <Header />
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
