import React, { useState, useEffect } from 'react';

// created a Book interface
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

// created a ReadingList component
const ReadingList = () => {
    const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);

    // get the favorite books from local storage
    useEffect(() => {
        const favBooks = localStorage.getItem('readingList');
        if (favBooks) {
            setFavouriteBooks(JSON.parse(favBooks));
        }
        // just for testing purpose
        // console.log("favouriteBooks on localStorage useEffect:", favBooks)
    }, []);

    return (
        <div className="min-h-screen pb-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
            <div className='align-cente pr-10 pb-3 text-right text-[22px] max-w-[575px] align-middle bg-gradient-to-r from-[#ADFF01] via-gray-400 to-gray-200 bg-clip-text text-transparent xl:text-[4rem] md:text-5xl font-bold font-polySans md:max-w-5xl '>
                Your Reading List
            </div>
            <div className="flex flex-wrap p-10">
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
                        </div>
                    </li>
                ))}
            </div>
        </div >
    );
}

export default ReadingList;
