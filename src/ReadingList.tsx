import React, { useState, useEffect } from 'react';

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


function ReadingList() {
    const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);
    // const [isFavorite, setIsFavorite] = useState(false);

    // get the favorite books from local storage
    useEffect(() => {
        const favBooks = localStorage.getItem('readingList');
        if (favBooks) {
            setFavouriteBooks(JSON.parse(favBooks));
        }
        console.log("favouriteBooks on localStorage useEffect:", favBooks)
    }, []);

    return (
        <div className="min-h-screen pb-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
            <div className='md:mb-8 mb-6 md:pb-2 bg-gradient-to-r from-[#ADFF01] via-gray-400 to-gray-200 bg-clip-text text-transparent xl:text-[4rem] md:text-5xl font-bold font-polySans md:max-w-5xl text-center text-[22px] max-w-[575px]'>
                Your Reading List
            </div>
            <div className="flex text-black p-12">

                {favouriteBooks && favouriteBooks.map((book) => (
                    <li key={book.id}>
                        <div className="p-4 flex">
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
        </div >
    );
}

export default ReadingList;
