import React, { useState,Fragment,useEffect } from 'react'
import MainLayoutAuth from '../../layouts/MainLayoutAuth'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CCollapse,
    CDataTable,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CLink,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CTabs,
  } from "@coreui/react";
import { Link } from 'react-router-dom';
import Modal from '../../components/customComponents/bootstrapModals/Modal'
import { ModalInput, ModalSelect } from '../../components/customComponents/inputs/Input';
import { createParentInitialStates, createStudentInitialStates } from '../../components/formHelpers/initialStates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { errorNotification, successNotification } from '../../utils/notifications';
import useAuth from '../../hooks/useAuth';
import { genderArray } from '../../utils/utilArrays';
import { findArrayValue } from '../../utils/utilFunctions';



const ViewStudents = () => {
    const [modalCreateParent, setModalCreateParent] = useState(false);
    const [modalCreateStudent, setModalcreateStudent] = useState(false);
    const [modalUpdateStudent, setModalUpdateStudent] = useState(false);
    const [modalViewStudent, setModalViewStudent] = useState(false);
    const [createStudentDetails, setCreateStudentDetails] = useState(createStudentInitialStates);
    const [createParentDetails, setCreateParentDetails] = useState(createParentInitialStates);
    const [studentsData, setStudentsData] = useState(false);
    const axiosInstance = useAxiosPrivate()
    const { auth } = useAuth()
    const [currentViewRecord, setCurrentViewRecord] = useState({});
    const [Partners] = useState([]);



    useEffect(() => {
      fetchStudentList()
    
      
    }, [])
    

    const handletoggleModalCreateStudent = () => {
        setModalcreateStudent(!modalCreateStudent);
        
       };
    const handletoggleModalCreateParent = (item) => {
        setModalCreateParent(!modalCreateParent);
        setCurrentViewRecord(item);

       };
    const handletoggleModalUpdateStudent = (item) => {
          setModalUpdateStudent(!modalUpdateStudent);
          setCurrentViewRecord(item);
          console.log("item",item)

       };
    const handletoggleViewStudentDetails = (item) => {
        setModalViewStudent(!modalViewStudent);
        setCurrentViewRecord(item);
        console.log('currentViewRecord',currentViewRecord)

       };

       async function fetchStudentList() {
        try {
          const { data: fetchStudentsResponses, status } = await axiosInstance.get(`api/v1/students/`);
          const { data:studentdatas } =fetchStudentsResponses
          console.log("fetchStudentsResponses",fetchStudentsResponses)
       
          
          let data = [];
          let x = 1;
          

          studentdatas.forEach((studentdata) => {
        let {
          student_DOB,
          student_age,
          student_createdBy,
          student_firstname,
          student_id,
          student_lastname,
          student_secondname,
          student_parent,
          student_gender
          
        } = studentdata;

        let name="name"
        // let {
        //   parent_createdBy,
        //   parent_email,
        //   parent_firstname,
        //   parent_id,
        //   parent_lastname,
        //   parent_phone,
        //   parent_relationship,
        //   parent_secondname,
        //   parent_student_ID,

        // } = studentdata;
   
        const datas = {
          _id:x,
          student_DOB:student_DOB.split('T')[0],
          student_age,
          student_createdBy,
          student_firstname,
          student_id,
          name,
          student_lastname,
          student_secondname,
          student_parent,
          student_three_names:student_firstname +" "+ student_secondname+" "+ student_lastname,
          student_gender:genderArray.find(obj => obj.value === student_gender)?.label
    
        };
        data.push(datas);
        x = x + 1;
      });
          
    
        
    
          if (status === 200) {
            //setPropertiesData(propertydatas);
            console.log("paymentsData",studentdatas)
            setStudentsData(data);
            console.log("data",data)

           
          } else {
            errorNotification("Unable to fetch Student Data");
          }
        } catch (ex) {
          errorNotification("Unable to fetch Something went wrong");
          console.log({ ex });
        }
      }

       const handleSubmitStudent = async (e) => {
        e.preventDefault();
        handletoggleModalCreateStudent();

        const {
          firstname,
          secondname,
          lastname,
          age,
          gender
        } = createStudentDetails;
    
        const check = 
        [ 
          firstname,
          secondname,
          lastname,
          age,
          gender
        ].every(value => value);
          if (check===true) {
            let payload = {
              'student_firstname':createStudentDetails.firstname,
              'student_secondname':createStudentDetails.secondname,
              'student_lastname':createStudentDetails.lastname,
              'student_age':createStudentDetails.age,
              'student_DOB':createStudentDetails.DOB,
              'student_gender':createStudentDetails.gender,
              'student_createdBy':auth.user 
            }  

            console.log("payload",payload)
            try {
              const createStudentResponse = await axiosInstance.post('api/v1/students/create',payload);
              console.log("createUnitsResponse")
              console.log("createUnitsResponse",createStudentResponse)
              const { status } = createStudentResponse; 
              
            
              if (status === 201) {
                console.log("added")
                fetchStudentList()
                successNotification("Student added successful")
                setCreateStudentDetails(createStudentInitialStates)
              } else {
                errorNotification("something went wrong")
              }
            } catch (ex) {
              console.log({ex})
              errorNotification("Error:something went wrong")

            }
          } else if (check === false) {
            errorNotification("You have an empty field")
          }
       }
       const handleSubmitParent = async (e) => {
        e.preventDefault();
        handletoggleModalCreateParent();
        console.log('createParentDetails',createParentDetails)
        const {
          firstname,
          secondname,
          lastname,
          phone,
          email,
          relationship,
        } = createParentDetails;
    
        const check = 
        [ 
          firstname,
          secondname,
          lastname,
          phone,
          email,
          relationship,
        ].every(value => value);
          if (check===true) {

            let payload = {
              'parent_firstname':createParentDetails.firstname,
              'parent_student_ID':currentViewRecord.student_id,
              'parent_secondname':createParentDetails.secondname,
              'parent_lastname':createParentDetails.lastname,
              'parent_phone':createParentDetails.phone,      
              'parent_email':createParentDetails.email,      
              'parent_relationship':createParentDetails.relationship, 
              'parent_createdBy':auth.user      
            }      
             
            try {
              const createParentsResponse = await axiosInstance.post('api/v1/parents/create',payload);
              console.log("createParentsResponse",createParentsResponse)  
              const { status } = createParentsResponse; 
              
            
              if (status === 201) {
                console.log("added")
                fetchStudentList()
                successNotification("Parent added successful")
                setCreateParentDetails(createParentInitialStates)
              } else {
                errorNotification("Parent not added")
              }
            } catch (ex) {
              console.log({ex})
              errorNotification("Error:something went wrong")

            }
          } else if (check === false) {
            errorNotification("You have an empty field")
          }
       }

       const handleChange = ({ currentTarget: input }) => {
        let name = input.id;
        let value = input.value;

        setCreateStudentDetails({
          ...createStudentDetails,
          [name]: value,
        });
      };
       const handleChangeParent = ({ currentTarget: input }) => {
        let name = input.id;
        let value = input.value;

        setCreateParentDetails({
          ...createParentDetails,
          [name]: value,
        });
      };

    // const ASTarrifModalBody = (
    //     <CCardBody>
    //       <div>
    //         <h4>Channel ID : {CurrentViewRecord.channelId}</h4>
    //         <p className="text-muted">
    //           Charge Band Id : {CurrentViewRecord.chargeBandId}
    //         </p>
    //         <p className="text-muted">
    //           Description : {CurrentViewRecord.description}
    //         </p>
    //         <p className="text-muted">Status : {CurrentViewRecord.status}</p>
    //       </div>
    //     </CCardBody>
    //   );
    
    //   const ASModalTarrifFooter = (
    //     <>
    //       <CButton variant="secondary" onClick={handletoggleModalCreateStudent}>
    //         Close
    //       </CButton>
    //     </>
    //   );
    
    //   const DeleteModalBody = (
    //     <CCardBody>
    //       <p>Are you sure you want to delete this account?</p>
    //       <div className="d-flex justify-content-between mr-3">
    //         <CButton
    //           size="md"
    //           className="btn btn-primary"
    //           onClick={handletoggleModalCreateStudent}
    //         >
    //           Delete
    //         </CButton>
    //         <CButton
    //           size="md"
    //           className="btn btn-primary"
    //           onClick={() => setModalViewStudent(!modalViewStudent)}
    //         >
    //           Cancel
    //         </CButton>
    //       </div>
    //     </CCardBody>
    //   );
     const relationshipArray = 
      [
            {value:1 ,label:"Dad"},
            {value:2 ,label:"Mom"},
            {value:3 ,label:"Big Bro"},
            {value:4 ,label:"Big Siz"},
            {value:5 ,label:"Auntie"},
            {value:6 ,label:"Uncle"},
            {value:7 ,label:"Gurdian"}
      ]
          
      const studentFields = [
        {
          key: "_id",
          label: "ID",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
        // {
        //   key: "channelId",
        //   label: "Corporate ID",
        //   _style: { width: "1%" },
        //   sorter: true,
        //   filter: true,
        // },
        {
          key: "student_firstname",
          label: "Firstname",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "student_secondname",
          label: "Second Name",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "student_lastname",
          label: "Lastname",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
        {
          key: "student_gender",
          label: "Gender",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "student_DOB",
          label: "DOB",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "student_age",
          label: "AGE",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
      
        {
          key: "ACTION",
          label: "ACTION",
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ];
     
  return (
    <Fragment>
        <CRow>
          <CCol xs="50" md="100" className="mb-4">
            <CCard>
              <CCardBody>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>Manage Students </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader >
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <span className="pull-right float-right">
                              <CButton
                                className="btn btn-primary btn-icon m-1"
                                type="button"
                                onClick={() => handletoggleModalCreateStudent()}
                              >
                                <span className="ul-btn__icon">
                                  <i className="i-Gear-2"></i>
                                </span>
                                Add Student
                              </CButton>
                            </span>
                            </div>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={studentsData}
                              fields={studentFields}
                              columnFilter
                              tableFilter
                              footer
                              bordered
                              itemsPerPage={5}
                              pagination
                              itemsPerPageSelect
                              hover
                              sorter
                              scopedSlots={{
                                ACTION: (item) => (
                                  <CDropdown className="m-1">
                                    <CDropdownToggle>Action</CDropdownToggle>
                                    <CDropdownMenu>
                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handletoggleViewStudentDetails(item)
                                          }
                                        >
                                          View Student Details
                                        </CButton>
                                      </CDropdownItem>
                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handletoggleModalUpdateStudent(item)
                                          }
                                        >
                                          Edit Student Details
                                        </CButton>
                                      </CDropdownItem>

                                  
                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handletoggleModalCreateParent(item)
                                          }
                                        >
                                          Add a Parent/Gurdian
                                        </CButton>
                                      </CDropdownItem>

                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          to="/take/Questionare" state={{ data: item }}
                                        >
                                          Take Questionare
                                        </CButton>
                                      </CDropdownItem>
                                      {/* <CLink
                              className="btn btn-primary ml-1"
                              to="/take/Questionare" state={{ data: currentViewRecord }}
                                >
                              <i className="bx bx-check d-block d-sm-none"></i>
                              <span className="d-none d-sm-block">View More Details1</span>
                            </CLink> */}
                                      {/* <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handleDeleteToggleModal(item)
                                          }
                                        >
                                          Delete Partner
                                        </CButton>
                                      </CDropdownItem> */}
                                    </CDropdownMenu>
                                  </CDropdown>
                                ),
                                show_details: (item, index) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={() => {
                                          handletoggleModalCreateStudent(index);
                                        }}
                                      >
                                        {Partners.includes(index)
                                          ? "Hide More Partner details"
                                          : "View More Partner details"}
                                      </CButton>
                                    </td>
                                  );
                                },
                                details: (item, index) => {
                                  return (
                                    <CCollapse show={Partners.includes(index)}>
                                      <CCardBody>
                                        <h4>Partner ID : {item.id}</h4>
                                        <p className="text-muted">
                                          Partner Name : {item.Partner_name}
                                        </p>
                                        <p className="text-muted">
                                          Partner Email : {item.email}
                                        </p>
                                        <p className="text-muted">
                                          Partner Address : {item.address}
                                        </p>
                                        <p className="text-muted">
                                          Country : {item.country}
                                        </p>
                                        <CButton size="sm" color="">
                                          <Link
                                            to={{
                                              pathname: "/admin/edit/Partner/",
                                              state: {
                                                id: item.Partner_name,
                                              },
                                            }}
                                          >
                                            View Details
                                          </Link>
                                        </CButton>

                                        <CButton size="sm" color="">
                                          <Link
                                            to={{
                                              pathname: "/admin/edit/Partner/",
                                              state: {
                                                id: item.Partner_name,
                                              },
                                            }}
                                          >
                                            Edit Partner Details
                                          </Link>
                                        </CButton>
                                      </CCardBody>
                                    </CCollapse>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

   
      <Modal
        modalState={modalCreateStudent}
        modalTitle={<h4>{"Add a Student"}</h4>}
        //handleClose={handletoggleModalCreateStudent}
        handleClose={() => setModalcreateStudent(false)}

        modalBody={
          <span>
            
            <CCardBody>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                       <form onSubmit={handleSubmitStudent}>
                        <ModalInput
                         onChange={handleChange}
                        //   value=
                          name="firstname"
                          id="firstname"
                          InputType="text"
                          placeholder="Enter Firstname"
                          label="First Name"
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="secondname"
                          id="secondname"
                          InputType="text"
                          placeholder="Enter Secondname"
                          label="Middle Name"
                        />
                        <br/>

                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="lastname"
                          id="lastname"
                          InputType="text"
                          placeholder="Enter Lastname"
                          label="Last Name"
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="DOB"
                          id="DOB"
                          InputType="date"
                          //placeholder="Enter Lastname"
                          label="Date of Birth"
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="age"
                          id="age"
                          InputType="number"
                          placeholder="Enter Age"
                          label="Age"
                          max={24}
                        />
                        <br/>
                        <ModalSelect
                           label={"Gender"}
                           arrayData={genderArray}
                           defaultSelectText={'Select Gender'}
                           onChange={handleChange}
                           //value={}
                           name="gender"
                           id="gender"
                           />
                        
                        <br/>
                        

                        <div className="modal-footer">
                            <button type="button" onClick={handletoggleModalCreateStudent} className="btn btn-light-secondary"
                                data-bs-dismiss="modal">
                                <i className="bx bx-x d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button type="submit" className="btn btn-primary ml-1" data-bs-dismiss="modal">
                                <i className="bx bx-check d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Submit</span>
                            </button>
                        </div>
                      </form>
                    </div>
                   
                </div>
            </div>
            </CCardBody>
          </span>
        }
       
      />
      <Modal
        modalState={modalUpdateStudent}
        modalTitle={<h4>{"Update "+currentViewRecord.student_three_names +" Details"}</h4>}
        //handleClose={handletoggleModalCreateStudent}
        handleClose={() => setModalUpdateStudent(false)}

        modalBody={
          <span>
            
            <CCardBody>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                       <form onSubmit={handleSubmitStudent}>
                        <ModalInput
                         onChange={handleChange}
                        //   value=
                          name="firstname"
                          id="firstname"
                          InputType="text"
                          placeholder="Enter Firstname"
                          label={currentViewRecord.student_firstname}
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="secondname"
                          id="secondname"
                          InputType="text"
                          placeholder="Enter Secondname"
                          label={currentViewRecord.student_secondname}
                        />
                        <br/>

                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="lastname"
                          id="lastname"
                          InputType="text"
                          placeholder="Enter Lastname"
                          label={currentViewRecord.student_lastname}
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="DOB"
                          id="DOB"
                          InputType="date"
                          //placeholder="Enter Lastname"
                          label={currentViewRecord.student_DOB}
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="age"
                          id="age"
                          InputType="number"
                          placeholder="Enter Age"
                          label={currentViewRecord.student_age}
                          max={24}
                        />
                        <br/>
                        <ModalSelect
                           label={currentViewRecord.student_gender}
                           arrayData={genderArray}
                           defaultSelectText={'Select Gender'}
                           onChange={handleChange}
                           //value={}
                           name="gender"
                           id="gender"
                           />

                        
                        <br/>
                        

                        <div className="modal-footer">
                            <button type="button" onClick={handletoggleModalCreateStudent} className="btn btn-light-secondary"
                                data-bs-dismiss="modal">
                                <i className="bx bx-x d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button type="submit" className="btn btn-primary ml-1" data-bs-dismiss="modal">
                                <i className="bx bx-check d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Submit</span>
                            </button>
                        </div>
                      </form>
                    </div>
                   
                </div>
            </div>
            </CCardBody>
          </span>
        }
       
      />
   
      <Modal
        modalState={modalViewStudent}
        modalTitle = {`View ${currentViewRecord.student_three_names}  Data `}
        handleClose={() => setModalViewStudent(false)}
        modalFooter={
                      <span>
                         <div >
                            <button type="button" onClick={() => setModalViewStudent(false)} className="btn btn-light-secondary"
                                data-bs-dismiss="modal">
                                <i className="bx bx-x d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            {"          "}
                           
                            <CLink
                              className="btn btn-primary ml-1"
                              to="/student/details" state={{ data: currentViewRecord }}
                                >
                              <i className="bx bx-check d-block d-sm-none"></i>
                              <span className="d-none d-sm-block">View More Details</span>
                            </CLink>
                        </div>
                      </span>
                    }
        modalBody={
            <span>
         
            <CCardBody>
            <p  className="text-muted">Student Firstname : {currentViewRecord.student_firstname}</p>
            <p  className="text-muted">Student Secondname : {currentViewRecord.student_secondname}</p>
            <p  className="text-muted">Student Lastname : {currentViewRecord.student_lastname}</p>
            <p  className="text-muted">Student Age : {currentViewRecord.student_age}</p>
            <p  className="text-muted">Student DOB : {currentViewRecord.student_DOB}</p>
          
              {currentViewRecord.student_parent && currentViewRecord.student_parent.length > 0 && (
                <>
                {/* {console.log("currentViewRecord.student_parent",currentViewRecord.student_parent)} */}
                  {currentViewRecord.student_parent.map((item, index) => (

                        <div key={index}>
                        {/* <p className="text-muted">
                          Guardian 
                        </p> */}
                        {index === 0 && (
                          <>
                          <p className="text-muted">
                            First Guardian Firstname: {item.parent_firstname}
                          </p>
                          <p className="text-muted">
                            First Guardian Secondname: {item.parent_secondname}
                          </p>
                          <p className="text-muted">
                            First Guardian Lastname: {item.parent_lastname}
                          </p>
                          <p className="text-muted">
                            First Guardian Email: {item.parent_email}
                          </p>
                          <p className="text-muted">
                            First Guardian Phone: {item.parent_phone}
                          </p>
                          
                          <p className="text-muted">
                            First Guardian Relationship: {relationshipArray.find(obj => obj.value === item.parent_relationship)?.label}
                          </p>
                          </>
                        )}
                        {index === 1 && (
                         

                            <>
                            <p className="text-muted">
                              Second Guardian Firstname: {item.parent_firstname}
                            </p>
                            <p className="text-muted">
                              Second Guardian Secondname: {item.parent_secondname}
                            </p>
                            <p className="text-muted">
                              Second Guardian Lastname: {item.parent_lastname}
                            </p>
                            <p className="text-muted">
                              Second Guardian Email: {item.parent_email}
                            </p>
                            <p className="text-muted">
                              Second Guardian Phone: {item.parent_phone}
                            </p>
                            <p className="text-muted">
                              Second Guardian Relationship: {relationshipArray.find(obj => obj.value === item.parent_relationship)?.label}
                            </p>
                            </>
                        )}
                        {index === 2 && (
                           <>
                           <p className="text-muted">
                             Third Guardian Firstname: {item.parent_firstname}
                           </p>
                           <p className="text-muted">
                             Third Guardian Secondname: {item.parent_secondname}
                           </p>
                           <p className="text-muted">
                             Third Guardian Lastname: {item.parent_lastname}
                           </p>
                           <p className="text-muted">
                             Third Guardian Email: {item.parent_email}
                           </p>
                           <p className="text-muted">
                             Third Guardian Phone: {item.parent_phone}
                           </p>
                          
                           <p className="text-muted">
                            Third Guardian Relationship: {relationshipArray.find(obj => obj.value === item.parent_relationship)?.label}
                            </p>
                           </>
                        )}
                        </div>

                    // <p key={index} className="text-muted">
                    //  Gurdian Firstname : {item.parent_firstname}

                    //   {/* parent_createdBy: 1
                    //   parent_email: "sss@gmail.com"
                    //   parent_firstname: "dd"
                    //   parent_id: 1
                    //   parent_lastname: "dd"
                    //   parent_phone: 33
                    //   parent_relationship: 3
                    //   parent_secondname: "dd"
                    //   parent_student_ID: 1 */}
                    // </p>
                  ))}

              {/* {currentViewRecord.student_parent.map((item, index) => (
                <div key={index}>
                  <p className="text-muted">
                    Guardian Firstname: {item.parent_firstname}
                  </p>
                  {index === 0 && (
                    <p className="text-muted">
                      First Guardian
                    </p>
                  )}
                  {index === 1 && (
                    <p className="text-muted">
                      Second Guardian
                    </p>
                  )}
                  {index === 2 && (
                    <p className="text-muted">
                      Third Guardian
                    </p>
                  )}
                </div>
              ))} */}

                </>
              )}
            </CCardBody>


          </span>
        }
      />

      <Modal
        modalState={modalCreateParent}
        modalTitle={<h4>{"Add a Parent/Gurdian"}</h4>}
        handleClose={() => setModalCreateParent(false)}
        //handleClose={handletoggleModalCreateParent}
        modalBody={
          <span>
  
            <CCardBody>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                       <form onSubmit={handleSubmitParent}>
                        <ModalInput
                         onChange={handleChangeParent}
                        //   value=
                          name="firstname"
                          id="firstname"
                          InputType="text"
                          placeholder="Enter Firstname"
                          label="First Name"
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChangeParent}
                        //   value=
                          name="secondname"
                          id="secondname"
                          InputType="text"
                          placeholder="Enter Secondname"
                          label="Middle Name"
                        />
                        <br/>

                        <ModalInput
                          onChange={handleChangeParent}
                        //   value=
                          name="lastname"
                          id="lastname"
                          InputType="text"
                          placeholder="Enter Lastname"
                          label="Last Name"
                        />
                        <br/>

                        <ModalInput
                          onChange={handleChangeParent}
                        //   value=
                          name="phone"
                          id="phone"
                          InputType="number"
                          placeholder="Enter Phone Number"
                          label="Phone Number"
                          max={24}
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChangeParent}
                        //   value=
                          name="email"
                          id="email"
                          InputType="email"
                          placeholder="Enter Email"
                          label="Email"
                        />
                        <br/>
                        <ModalSelect
                           label={"Relationship"}
                           arrayData={relationshipArray}
                           defaultSelectText={'Select Relationship'}
                           onChange={handleChangeParent}
                           //value={}
                           name="relationship"
                           id="relationship"
                           />
                        
                        <br/>

                        <div className="modal-footer">
                            <button type="button" onClick={handletoggleModalCreateParent} className="btn btn-light-secondary"
                                data-bs-dismiss="modal">
                                <i className="bx bx-x d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button type="submit" className="btn btn-primary ml-1" data-bs-dismiss="modal">
                                <i className="bx bx-check d-block d-sm-none"></i>
                                <span className="d-none d-sm-block">Submit</span>
                            </button>
                        </div>
                      </form>
                    </div>
                   
                </div>
            </div>
            </CCardBody>
          </span>
        }
       
      />
     
    </Fragment>
  )
}

export default MainLayoutAuth(ViewStudents)