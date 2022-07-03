import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { _allNews } from '../../redux/selectors/newsSelectors'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './NewsDetails.css'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react';
import { fetchNews } from '../../redux/thunks/newsThunk'
import leftArrow from '../../images/leftArrow.png';
import rightArrow from '../../images/rightArrow.png';
import { Link } from 'react-router-dom';
import imageLoader from '../../images/image-loader.gif'
import { getContent } from '../../common/utils'

function NewsDetails() {
    const dispatch = useDispatch();
    let { newsId } = useParams();
    const allNews = useSelector(_allNews)
    const [content,setContent] = useState("")

    async function setNewsContent(){
        if (allNews.length){
            const latestNews = allNews?.find(function (news) {
                return  Number(newsId) === news.id 
           }) 
           const result = await getContent(latestNews.url)
           setContent(result)
        }
    }
    useEffect(()=>{
      setNewsContent()  
        
    },[allNews])
    useEffect(()=>{
         dispatch(fetchNews())
         if (news?.description?.length > 30) setShowReadMore(true)
    },[dispatch])
    
    const news = allNews?.find(function (news) {
        return  Number(newsId) === news.id 
    })
   const [showReadMore,setShowReadMore]=useState(false);
   

    return (
        <>
            <div className='container'>
                <Header />
                <div className='details-image-container'>
                    <div className='title'>
                        {news?.title}
                    </div>
                    {
                        news?.urlToImage ? (
                            <img className='image' alt='newsImage' src={news?.urlToImage} />
                        ) : (
                            <img className='image' alt='newsImage' src={imageLoader} />
                        )
                    }
                    
                    {news?.author ? (
                      <div className='details-author'>
                        {news.author}
                      </div>
                    ) : null}
                </div>
                <div className='content' dangerouslySetInnerHTML={{__html: content}}>
                    {/* {showReadMore ? news?.description?.substr(0,30) : news?.description}
                    {
                        showReadMore ? (<button className="read-more-link" onClick={()=>{setShowReadMore(!showReadMore)}}>Read More</button>)
                            : null
                    } */}
                    
                        
                </div>
            </div>
            <div className='arrow-container'>
                <Link to={'/news-details/'+news?.id <= 1 ? 1 : (news?.id-1)}>
                    <img className='arrow' src={leftArrow} alt='vector1'/>
                </Link>
                <Link to={'/news-details/'+(news?.id+1)}>
                    <img className='arrow' src={rightArrow} alt='vector2'/>
                </Link>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
export default NewsDetails