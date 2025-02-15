// import React from 'react'
import { Button } from '@mui/material'
import { MdOutlineChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate();
    const gotoback = () => {
        navigate(-1);
    }
    return (
        <>
            <Button onClick={gotoback} color='primary.main' variant='contained'>
                <MdOutlineChevronLeft /> Back
            </Button>

        </>
    )
}

export default BackButton
