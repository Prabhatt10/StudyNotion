// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

// import { AiFillCaretDown } from "react-icons/ai"
// import { FaPlus } from "react-icons/fa"
// import { MdEdit } from "react-icons/md"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { RxDropdownMenu } from "react-icons/rx"

// function NestedView({handleChangeEditSectionName}) {
//   const {course} = useSelector((state) => state.course);
//   const {token} = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [addSubSection, setAddSubsection] = useState(null)
//   const [viewSubSection, setViewSubSection] = useState(null)
//   const [editSubSection, setEditSubSection] = useState(null)

//   const [confirmationModal, setConfirmationModal] = useState(null)



//   return (
//     <div>
//       <div>
//         {
//           course.courseContent.map((section, index) => (
//             <details key={section._id} open>
//               <summary>
//                 <div>
//                   <RxDropdownMenu />
//                   <p>
//                     {section.sectionName}
//                   </p>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() => handldeChangeEditSectionName(
//                       section.sectionName,
//                       section._id
//                     )}
//                   >
//                     <MdEdit />
//                   </button>
//                   <button
//                     onClick={() => setConfirmationModal({
//                       text1: "Delete this section",
//                       text2 : "All the lectures in this section will be deletedd",
//                       btn1Text: "Delete",
//                       btn2Text: "Cancel",
//                       btn1Handler : () => handleDeleteSection(section._id),
//                       btn2Handler : () => setConfirmationModal(null);
//                     })}
//                   >
//                     <RiDeleteBin6Line />
//                   </button>
//                   <span>|</span>
//                   <AiFillCaretDown />
//                 </div>
//               </summary>

//             </details>
//           )
//         )}
//       </div>
//     </div>
//   )
// }

// export default NestedView



import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"

import { setCourse } from "../../../../../slices/courseSlice"

import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

function NestedView({ handleChangeEditSectionName }) {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)

  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      };

      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
  };

  return (
    <>
      <div>
        {
          course?.courseContent?.map((section) => (
            <details key={section._id} open>

              <summary>
                <div>
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>

                <div>
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this section",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSection(section._id),
                        btn2Handler: () =>
                          setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line />
                  </button>

                  <span>|</span>

                  <AiFillCaretDown />
                </div>
              </summary>

              <div>

                {section.subSection.map((data) => (
                  <div
                    key={data._id}
                    onClick={() => setViewSubSection(data)}
                  >

                    <div>
                      <RxDropdownMenu />
                      <p>{data.title}</p>
                    </div>

                    <div
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setEditSubSection({
                            ...data,
                            sectionId: section._id,
                          })
                        }
                      >
                        <MdEdit />
                      </button>

                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Sub-Section",
                            text2: "This lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(
                                data._id,
                                section._id
                              ),
                            btn2Handler: () =>
                              setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>

                  </div>
                ))}

                <button
                  onClick={() => setAddSubsection(section._id)}
                >
                  <FaPlus />
                  <p>Add Lecture</p>
                </button>

              </div>

            </details>
          ))
        }
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : null}
    </>
  )
}

export default NestedView