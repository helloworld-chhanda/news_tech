import './News.css';
import React,{  useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { _currentNews, _isLoading } from '../../redux/selectors/newsSelectors';
import { fetchNews } from '../../redux/thunks/newsThunk';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import imageLoader from '../../images/image-loader.gif'
import { nextPage } from '../../redux/slices/newsSlice';



/**
 * total results = 57
 * limit = 9
 * 
 * page = 1
 * result = 1 - 9
 * page = 2
 * result = 1 - 18
 * page = 3
 * result = 1 - 27
 * 
 * create a new variable `page` in news initial state
 * set its value to 1
 * create a new variable `limit` in news initial state
 * set its value to 9
 * create a new variable `currentNews` in news intitial state
 * set its value to []
 * set its value to 1-9 news in thunk success
 * create a reducer called nextPage inside slice
 * - which will increase the page by 1
 * - also set allNews to 1 to limit*2 number of news (use slice function to slice the array)
 * on click on load more dispatch the nextPage() action
 */
function News() {
  const dispatch = useDispatch();
  const isLoading = useSelector(_isLoading)
  const currentNews = useSelector(_currentNews)
  useEffect(()=>{
    dispatch(fetchNews())
  },[dispatch])
  function loadNextPage() {
    dispatch(nextPage())
  }
  return (
    <>
      <div className='container'>
        <Header />
        <div className='image-organize'>
          {isLoading ? <div className='loader'></div> : currentNews.map((news, index) => {
            return (
              <Link to={'/news-details/'+news.id}>
                <div className='news-container' key={index}>
                  <div className='news-image-container'>
                    {news?.urlToImage ? (
                        <img className='news-image' alt="newsImage" src={news.urlToImage} />
                    ) : (
                      <img className='news-image' alt="newsImage" src={imageLoader} />
                    )
                  }
                    {news.author ? (
                      <div className='author'>
                        {news.author}
                      </div>
                    ) : null}
                  </div>
                  <div className='news-content'>
                    {news.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className='load-container'>
          <div className='load-more' onClick={loadNextPage} >Load More</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default News;
