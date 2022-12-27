import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './BookSearch.css'
export default function BookSearch() {
    const [bookquery, setbookquery] = useState('')
    const [results, setresults] = useState([])
    const handlesearch = async (e) => {
        e.preventDefault()
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookquery}`).then((data) => {
            setresults([...data.data.items])
            console.log(data.data.items)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div id='main-wrap'>
            <div id='header-wrap' >
                <h1>BOOK SEARCH</h1>
            </div>
            <div id='searchbar-wrap'>
                <input type="search" name="search" id="searchbooks" placeholder='Enter the title of book' onChange={(e) => {
                    setbookquery(e.target.value)
                }} />
                <button id='search-btn' onClick={(e) => {
                    handlesearch(e)
                }}><img src='/searchicon.png' /></button>
            </div>

            <div id='bookresults-wrap'>
                {
                    results.map((item, i) => {
                        return (
                            <>
                                <a key={i} href={item.volumeInfo.infoLink}>
                                    <div>
                                        <img src={item.volumeInfo.imageLinks.thumbnail} alt="bookimage" /><br />
                                        <div id='onhover-display'  >
                                            <p id='hover-title'>{item.volumeInfo.title}</p><br />
                                            <p id='author'>{item.volumeInfo.authors[0]}</p><br />
                                            <p id='pagecount'>PAGECOUNT: {item.volumeInfo.pageCount}</p><br />
                                            <p id='rating'>RATING: {item.volumeInfo.averageRating}</p>
                                        </div>
                                    </div>
                                </a>

                            </>


                        )
                    })
                }
            </div>
        </div>
    )
}


