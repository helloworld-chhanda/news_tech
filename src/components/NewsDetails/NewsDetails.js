import React from 'react'
import { useParams } from 'react-router-dom'
import { _allNews } from '../../redux/selectors/newsSelectors'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './NewsDetails.css'
import {useSelector} from 'react-redux'

function NewsDetails() {
    let { newsId } = useParams();
    const allNews = useSelector(_allNews)
   const news = allNews.find(function (news) {
    return  newsId == news.id 
   })
    return (
        <>
            <div className='container'>
                <Header />
                <div className='title'>
                    {news.title}
                </div>
                <img className='image' alt='newsImage' src={news.urlToImage} />
                <div className='content'>
                    {news.content} 
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
export default NewsDetails