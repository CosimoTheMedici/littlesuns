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
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/customComponents/bootstrapModals/Modal'
import { ModalInput, ModalSelect } from '../../components/customComponents/inputs/Input';
import { createPaymentInitialStates } from '../../components/formHelpers/initialStates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { errorNotification, successNotification } from '../../utils/notifications';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import { paymentModeArray } from '../../utils/utilArrays';



const ViewAttendees = () => {
    const [modalCreatePartner, setModalcreatePartner] = useState(false);
    const [createPaymentsDetails, setCreatePaymentsDetails] = useState(createPaymentInitialStates);
    const [modalCreatePayment, setModalCreatePayment] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [studentsData, setStudentsData] = useState([]);
    const axiosInstance = useAxiosPrivate();
    const { auth } = useAuth();
    const [CurrentViewRecord, setCurrentViewRecord] = useState({});
    const [Partners] = useState([]);
    



    const handletoggleModalCreatePartner = () => {
       };
    const handletoggleModalViewPartner = () => {
        setModalcreatePartner(!modalCreatePartner);
       };
    const handleCloseModal = (func,setFunc) => {
      setFunc(!func);
       };
    const handletoggleModalMakePayment = (item = {},) => {
        setModalCreatePayment(!modalCreatePayment);
        setCurrentViewRecord(item)
       };

       useEffect(() => {
        fetchStudentAttendanceList()
      
        
      }, [])

       async function fetchStudentAttendanceList() {
        try {
          const { data: fetchStudentsResponses, status } = await axiosInstance.get(`api/v1/attendances/`);
          const { data:studentdatas } =fetchStudentsResponses
          console.log("fetchStudentsResponses",fetchStudentsResponses)
       
          
          let data = [];
          let x = 1;
          

          studentdatas.forEach((studentdata) => {
        let {
          attendance_createdBy,
          attendance_date,
          attendance_id,
          attendance_payment_id,
          attendance_student_id,
          student_DOB,
          student_age,
          student_createdBy,
          student_firstname,
          student_id,
          student_lastname,
          student_secondname,
        } = studentdata;
   
        const datas = {
          _id:x,
          attendance_date:moment(attendance_date.split('T')[0]).format('DD-MM-YYYY'),
          student_age,
          student_createdBy,
          student_firstname,
          student_id,
          student_lastname,
          student_secondname,
          attendance_student_id,
          attendance_id,
          student_full_name:student_firstname+" "+student_secondname+" "+student_lastname,
          attendance_payment_status:attendance_payment_id === 0? "not paid":'paid'
    
        };
        data.push(datas);
        x = x + 1;
      });
          
    
        
    
          if (status === 200) {
            //setPropertiesData(propertydatas);
            console.log("paymentsData",studentdatas)
            setStudentsData(data);

           
          } else {
            errorNotification("Unable to fetch Student Data");
          }
        } catch (ex) {
          errorNotification("Unable to fetch Something went wrong");
          console.log({ ex });
        }
      }

       const handleSubmit = async (e) => {
        e.preventDefault();
        handletoggleModalMakePayment();

        const {
          amount,
          MOP,
          REFNo,
        } = createPaymentsDetails;
    
        const check = 
        [ 
          amount,
          MOP,
        ].every(value => value);
          if (check===true) {

            let payload = {
              payment_amount:createPaymentsDetails.amount,
              payment_mode:createPaymentsDetails.MOP,
              payment_ref_no:createPaymentsDetails.REFNo,
              payment_attendance_id:CurrentViewRecord.attendance_id,
              payment_student_id:CurrentViewRecord.student_id,
              payment_created_by:auth.user
            } 
            
      
            try {
              const createAttendancesResponse = await axiosInstance.post('api/v1/payments/create',payload);
              //console.log("createUnitsResponse",createAttendancesResponse)  
              const { status } = createAttendancesResponse; 
              
            
              if (status === 201) {
                fetchStudentAttendanceList()
                successNotification("Payment added successful")
                setCreatePaymentsDetails(createPaymentInitialStates)
              } else {
                errorNotification("something went wrong")
              }
            } catch (ex) {
              console.log({ex})
              errorNotification("Error:something went wrong")

            }
          } else if (check === false) {
          }
       }

       const handleChange = ({ currentTarget: input }) => {
        let name = input.id;
        let value = input.value;

        setCreatePaymentsDetails({
          ...createPaymentsDetails,
          [name]: value,
        });
      };

       const handleRedirect =  (newpage) =>  window.location.href = newpage;

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
    //       <CButton variant="secondary" onClick={handletoggleModalCreatePartner}>
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
    //           onClick={handletoggleModalCreatePartner}
    //         >
    //           Delete
    //         </CButton>
    //         <CButton
    //           size="md"
    //           className="btn btn-primary"
    //           onClick={() => setDeleteModal(!deleteModal)}
    //         >
    //           Cancel
    //         </CButton>
    //       </div>
    //     </CCardBody>
    //   );
      const studentFields = [
        {
          key: "_id",
          label: "ID",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
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
          key: "attendance_date",
          label: "Date",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "attendance_payment_status",
          label: "Payment status",
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
                      <CNavLink>Manage Attendance </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader >
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <span className="pull-right float-right">
                              <CLink
                                className="btn btn-primary btn-icon m-1"
                                type="button"
                                to='/check/attendance'
                                //onClick={handleRedirect('/check/attendance')}
                                //onClick={handleRedirect('/check/attendance')}
                              >
                                <span className="ul-btn__icon">
                                  <i className="i-Gear-2"></i>
                                </span>
                                Add Attendance
                              </CLink>
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
                                      {/* <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handletoggleModalViewPartner(item)
                                          }
                                        >
                                          Edit Student Details
                                        </CButton>
                                      </CDropdownItem> */}

                                  
                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handletoggleModalMakePayment(item)
                                          }
                                        >
                                          Make Payment
                                        </CButton>
                                      </CDropdownItem>
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
                                            handletoggleModalViewPartner(index);
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
        modalState={modalCreatePayment}
        modalTitle={<h4>{`Payment for ${CurrentViewRecord.student_full_name} date ${CurrentViewRecord.attendance_date}`}</h4>}
        handleClose={handletoggleModalMakePayment}
        modalBody={ CurrentViewRecord.attendance_payment_status ==="not paid" ? (
          <span>
            <CCardBody>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                       <form onSubmit={handleSubmit}>
                        <ModalInput
                         onChange={handleChange}
                        //   value=
                          name="amount"
                          id="amount"
                          InputType="text"
                          placeholder="Enter Amount"
                          label="Payment Amount"
                        />
                        <br/>
                      
                        
                        <ModalSelect
                           label={"Mode of payment"}
                           arrayData={paymentModeArray}
                           defaultSelectText={'Mode of Payment'}
                           onChange={handleChange}
                           //value={}
                           name={"MOP"}
                           id={"MOP"}
                           
                           />
                          
                        <br/>
                        {createPaymentInitialStates.MOP !==1 || createPaymentInitialStates.MOP === "" ?

                          <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="REFNo"
                          id="REFNo"
                          InputType="text"
                          placeholder="Enter Ref No"
                          label="REF No"
                          /> : null
                        }
                        <br/>

                        <div className="modal-footer">
                            <button type="button" onClick={handletoggleModalCreatePartner} className="btn btn-light-secondary"
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
          </span>) :
          (<span>
            <CCardBody>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                    <h4>paid</h4>
                    </div>
                   
                </div>
            </div>
            </CCardBody>
          </span>)
        }
       
      />
   
      <Modal
        modalState={deleteModal}
        modaalTitle="Delete Partner"
        handleClose={() => setDeleteModal(false)}
        modalBody={
            <span>
            <CCardBody>
             
            </CCardBody>
          </span>
        }
      />
     
    </Fragment>
  )
}

export default MainLayoutAuth(ViewAttendees)