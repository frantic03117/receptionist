// import React from 'react'
import { Badge } from '@mui/material'
import { GoBell, GoSearch } from 'react-icons/go'
import { IoSettingsOutline } from 'react-icons/io5'
import adminimg from '../assets/images/avatar.png'
const Header = () => {
    return (
        <>
            <div className="w-full  px-5 py-2 bg-white rounded-md shadow-sm shadow-gray-300">
                <div className="grid grid-cols-12">
                    <div className="col-span-2">
                        <div className="w-full">
                            <button className='text-2xl'>
                                <GoSearch />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-10">
                        <div className="flex justify-end">
                            <ul className="inline-flex gap-5 items-center">
                                <li>
                                    <Badge variant="dot" badgeContent={4} color="primary">
                                        <button className='text-2xl'>
                                            <GoBell />
                                        </button>
                                    </Badge>
                                </li>
                                <li>
                                    <button className='text-2xl'>
                                        <IoSettingsOutline />
                                    </button>
                                </li>
                                <li>
                                    <Badge variant="dot" anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }} color="success">
                                        <button>
                                            <img src={adminimg} alt="" className="size-8 rounded-full" />
                                        </button>
                                    </Badge>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
