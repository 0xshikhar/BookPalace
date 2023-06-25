import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios';

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
  };
  // imageLinks: {
  //   medium: string;
  // };
}

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loadStatus, setLoadStatus] = useState(false);


  const searchBook = async () => {
    console.log("icon:", searchQuery)

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
      );

      setBooks(response.data.items);
      console.log("response", response);
      setLoadStatus(true);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoadStatus(false);
    }
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
                if (e.key === 'Enter')
                  console.log("Enter key pressed:", searchQuery)
                searchBook()
              }} />
              {/* <Link href={/collections/{searchQuery}} > */}
              {/* <button onClick={() => {
                router.push(`/collections/${searchQuery}`);
              }} className="text-white px-2">Search</button> */}
              {/* </Link> */}
            </div>
            {/* <Link href="/explore" className="inline-flex justify-center align-middle items-center p-5 text-lg font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
              Join Current Live Event
              <BsFillArrowRightCircleFill className="ml-3" />
            </Link> */}
          </div>
        </figure>

        {/* displaying books here */}
        {loadStatus &&
          <div className="text-white">
            <ul>
              {books && books.slice(0, 5).map((book) => (
                <li key={book.id}>

                  <div>Book Name: {book.volumeInfo.title}</div>
                  <div>Book Author: {book.volumeInfo.authors}</div>
                  <div>Book Publisher: {book.volumeInfo.publisher}</div>
                  <div>Book Published Date: {book.volumeInfo.publishedDate}</div>
                  {/* <div>Book Description: {book.volumeInfo.description}</div> */}
                  {/* <div>Book Image: <img src={book.imageLinks.medium} alt="google book" /></div> */}
                </li>
              ))}
            </ul>

          </div>}

      </div>
    </div>
  );
}

export default Home;
