import PropTypes from "prop-types"

// import React from 'react'

const DashboardInfoBox = ({ title, value }) => {
    return (
        <>
            <div className="w-full border border-[var(--primary)] p-3 rounded-lg">
                <label htmlFor="" className="font-bold tracking-widest text-xs block  uppercase">{title}</label>
                <h4 className="text-3xl font-light">
                    {value}
                </h4>
            </div>
        </>
    )
}

export default DashboardInfoBox

DashboardInfoBox.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
}
