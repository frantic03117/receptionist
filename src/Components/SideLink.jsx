import PropTypes from 'prop-types'
// import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideLink = ({ icon, title, url }) => {
    const { pathname } = useLocation();
    return (
        <>
            <Link to={url} className={`flex ms-3 w-full hover:shadow-sm hover:shadow-gray-500  ${pathname.includes(url) ? 'bg-[var(--primary)] text-white font-light ' : ' text-gray-400 font-semibold'}   px-2 py-2 rounded items-center gap-2`}>
                <span className='text-xl'>
                    {icon}
                </span>
                <span>
                    {title}
                </span>
            </Link>
        </>
    )
}

export default SideLink

SideLink.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    url: PropTypes.string
}
