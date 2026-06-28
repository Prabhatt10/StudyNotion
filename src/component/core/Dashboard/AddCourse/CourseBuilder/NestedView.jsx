import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

import { setCourse } from "../../../../../slices/CourseSlice";

import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
      },
      token
    );

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      dispatch(
        setCourse({
          ...course,
          courseContent: updatedCourseContent,
        })
      );
    }

    setConfirmationModal(null);
  };

  return (
    <>
      <div className="rounded-md bg-richblack-700 p-6">
        <div className="space-y-4">
          {course?.courseContent?.map((section) => (
            <details
              key={section._id}
              open
              className="overflow-hidden rounded-md border border-richblack-600 bg-richblack-800"
            >
              <summary className="flex cursor-pointer items-center justify-between border-b border-richblack-600 px-5 py-4">
                {/* Left */}
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-xl text-richblack-300" />

                  <p className="font-medium text-richblack-5">
                    {section.sectionName}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-x-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      );
                    }}
                    className="text-richblack-300 transition-all hover:text-yellow-50"
                  >
                    <MdEdit size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();

                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2:
                          "All lectures inside this section will be deleted.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSection(section._id),
                        btn2Handler: () =>
                          setConfirmationModal(null),
                      });
                    }}
                    className="text-richblack-300 transition-all hover:text-pink-200"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>

                  <span className="text-richblack-400">|</span>

                  <AiFillCaretDown className="text-richblack-300" />
                </div>
              </summary>

              <div className="px-6 py-2">
                {section?.subSection?.map((data) => (
                  <div
                    key={data._id}
                    onClick={() => setViewSubSection(data)}
                    className="flex cursor-pointer items-center justify-between border-b border-richblack-700 py-4 last:border-none"
                  >
                    <div className="flex items-center gap-x-3">
                      <RxDropdownMenu className="text-lg text-richblack-300" />

                      <p className="text-richblack-5">{data.title}</p>
                    </div>

                    <div
                      className="flex items-center gap-x-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setEditSubSection({
                            ...data,
                            sectionId: section._id,
                          })
                        }
                        className="text-richblack-300 transition-all hover:text-yellow-50"
                      >
                        <MdEdit size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Lecture?",
                            text2:
                              "This lecture will be deleted permanently.",
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
                        className="text-richblack-300 transition-all hover:text-pink-200"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setAddSubsection(section._id)}
                  className="mt-4 flex items-center gap-x-2 font-medium text-yellow-50 transition-all hover:text-yellow-100"
                >
                  <FaPlus className="text-sm" />
                  <span>Add Lecture</span>
                </button>
              </div>
            </details>
          ))}
        </div>
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}

export default NestedView;