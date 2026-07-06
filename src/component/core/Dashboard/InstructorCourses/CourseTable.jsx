import React from 'react'
// import { Table,Tbody,Thead,Tr,Th,Td } from '@chakra-ui/react'

import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CourseTable({ courses, setCourses }) {
    
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);

    return (
        <div>

        </div>
    )
}

export default CourseTable