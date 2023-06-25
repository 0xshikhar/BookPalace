import React from 'react'
import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
    return (
        <div>
            <div className="navbar bg-black">
                <div className="flex-1">
                    <div className="text-white font-serif ml-[0.8rem] font-semibold text-2xl">Book Palace</div>
                </div>
                <div className="flex align- justify-between px-2 mx-2 lg:flex text-white">
                    <div className='px-4'>
                        <Link to="/">Home </Link>
                    </div>
                    <div className='px-4'>
                        <Link to="/reading">Reading List </Link>
                    </div>

                </div>
                <div className="flex-none gap-2">

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt='profile-icon' />
                            </div>
                        </label>
                        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <div className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </div>
                            </li>
                            <li><div>Settings</div></li>
                            <li><div>Logout</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header