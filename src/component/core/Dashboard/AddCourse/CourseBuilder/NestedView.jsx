import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function NestedView({handleChangeEditSectionName}) {
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)



  return (
    <div>
      <div>
        
      </div>
    </div>
  )
}

export default NestedView