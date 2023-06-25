import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import axios from 'axios';
import { Link } from 'react-router-dom';

const style = {
  wrapper: `min-h-screen pb-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black`,
  container: `flex flex-col items-center justify-center pt-10 `,
  mainText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  headingText: `md:mt-4 md:mb-8 mb-6 md:pb-2 bg-gradient-to-r from-black via-gray-600 to-[#9d9ea1]/50 bg-clip-text text-transparent xl:text-[4rem] md:text-5xl font-bold font-polySans md:max-w-5xl text-center text-[22px] max-w-[575px]`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] py-1  items-center bg-gray-100 rounded-[0.8rem] hover:bg-gray-200 text-black`,
  searchIcon: `text-black mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-black placeholder:text-[#8a939b]`,

  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
    };
    canonicalVolumeLink: string;
  }
};


function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loadStatus, setLoadStatus] = useState(false);
  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // get the favorite books from local storage
  useEffect(() => {
    const favBooks = localStorage.getItem('readingList');
    if (favBooks) {
      setFavouriteBooks(JSON.parse(favBooks));
    }
  }, []);


  // Update localStorage whenever favourite books change
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(favouriteBooks));
    console.log("favouriteBooks on localStorage useEffect:", JSON.stringify(favouriteBooks))
  }, [favouriteBooks]);

  // on click of search icon or enter key - it will search for the books
  const searchBook = async () => {
    // console.log("search by icon:", searchQuery)

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
      );

      setBooks(response.data.items);
      console.log("response", response);
      console.log("books", response.data.items);
      setLoadStatus(true);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoadStatus(false);
    }
  }

  // on click of favorite icon - it will add the book to favorite list
  const addToFavorite = (book: Book) => {
    // setIsFavorite(true)
    console.log("add to favorite:", book)
    setFavouriteBooks([...favouriteBooks, book]);
    console.log("favouriteBooks:", favouriteBooks)
  }


  return (
    <div className={style.wrapper}>
      <div>
        <figure className={style.container}>
          <div className="text-center pb-10 align-middle min-w-[1100px] h-[300px] p-8 bg-[#adff01] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className={style.headingText}>
              Search Your Book Here
            </div>

            {/* creating search bar */}
            <div className={style.searchBar}>
              <div className={style.searchIcon}>
                <AiOutlineSearch onClick={searchBook} />
              </div>
              {/* <input
                    className={style.searchInput}
                    placeholder="Search for any NFT Collection on Mantle Chain" onClick={searchCollection()}
                /> */}
              <input className={style.searchInput} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  console.log("Enter key pressed:", searchQuery)
                  searchBook()
                }

              }} />
            </div>

          </div>
        </figure>

        {/* displaying books here */}
        {loadStatus &&
          <div className="flex flex-row justify-normal align-baseline  text-black p-12">

            {books && books.slice(0, 5).map((book) => (
              <li key={book.id}>
                <div className="p-4">
                  <div className="card w-[240px] bg-base-100 shadow-xl">
                    <figure>
                      {book.volumeInfo?.imageLinks?.thumbnail && (
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt="google api books" />
                      )}
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title"> {book.volumeInfo.title}</h2>
                      <p>By {book.volumeInfo.authors}</p>
                      <p className='text-gray-600'> Published By : {book.volumeInfo.publisher}</p>
                      <div className='text-xs font-bold'>{book.volumeInfo.publishedDate}</div>
                      <div className='flex'>
                        <div className="card-actions">
                          <a href={book.volumeInfo?.canonicalVolumeLink} className="bg-[#ADFF01] rounded p-2 px-4" >Know More</a>
                        </div>
                        <div className='pl-5 justify-end'>
                          {
                            isFavorite ? <BsHeartFill onClick={() => setIsFavorite(false)} /> : <BsHeart onClick={()=> addToFavorite(book)} />
                          }
                        
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* <div>Book Name: {book.volumeInfo.title}</div>
                    <div>Book Author: {book.volumeInfo.authors}</div>
                    <div>Book Publisher: {book.volumeInfo.publisher}</div>
                    <div>Book Published Date: {book.volumeInfo.publishedDate}</div> 
                    <div>Book Description: {book.volumeInfo.description}</div>
                    <div><img src={book.volumeInfo.imageLinks.small} alt="google book" /></div> 
                  */}
                </div>
              </li>
            ))}


          </div>
        }

      </div>
    </div>
  );
}

export default Home;
