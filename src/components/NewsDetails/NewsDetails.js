import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { _allNews } from '../../redux/selectors/newsSelectors'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './NewsDetails.css'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react';
import { fetchNews } from '../../redux/thunks/newsThunk'

function NewsDetails() {
    const dispatch = useDispatch();
    let { newsId } = useParams();
    const allNews = useSelector(_allNews)
   const news = allNews.find(function (news) {
    return  newsId == news.id 
   })
   const [showReadMore,setShowReadMore]=useState(false);
   useEffect(()=>{
        dispatch(fetchNews())
   },[])
   useEffect(()=>{
       console.log("news",news);
       if (news?.description?.length > 30) setShowReadMore(true)
   },[])

    return (
        <>
            <div className='container'>
                <Header />
                <div className='title'>
                    {news?.title}
                </div>
                <img className='image' alt='newsImage' src={news?.urlToImage} />
                <div className='content'>
                    {showReadMore ? news?.description?.substr(0,30) : news?.description}
                    {
                        showReadMore ? (<div className="read-more-link" onClick={()=>{setShowReadMore(!showReadMore)}}>Read More</div>)
                            : null
                    }
                        
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
export default NewsDetails