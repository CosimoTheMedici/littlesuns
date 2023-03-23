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
import { createParentInitialStates } from '../../components/formHelpers/initialStates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { errorNotification, successNotification } from '../../utils/notifications';
import moment from 'moment';
import { paymentModeArray } from '../../utils/utilArrays';
import { findArrayValue } from '../../utils/utilFunctions';



const ViewPayments = () => {
    const [modalCreateParent, setModalcreateParent] = useState(false);
    const [createParentDetails, setCreateParentDetails] = useState(createParentInitialStates);
    const [deleteModal, setDeleteModal] = useState(false);
    const [paymentsDatas, setPaymentsData] = useState(false);
    const axiosInstance = useAxiosPrivate()
    const [CurrentViewRecord, setCurrentViewRecord] = useState({});
    const [Partners] = useState([]);


    const handletoggleModalCreatePartner = () => {
      setModalcreateParent(!modalCreateParent);
       };
    const handletoggleModalViewPartner = () => {
      setModalcreateParent(!modalCreateParent);
       };
       useEffect(() => {
        fetchPaymentsList()
      
        
      }, [])


       async function fetchPaymentsList() {
        try {
          const { data: fetchPaymentResponses, status } = await axiosInstance.get(`api/v1/payments/`);
          const { data:paymentdatas } =fetchPaymentResponses
          console.log("fetchPaymentResponses",fetchPaymentResponses)
       
          
          let data = [];
          let x = 1;
          

          paymentdatas.forEach((paymentdata) => {
        let {
          attendance_createdBy,
          attendance_date,
          attendance_id,
          attendance_payment_id,
          attendance_student_id,
          payment_amount,
          payment_attendance_id,
          payment_created_by,
          payment_date,
          payment_id,
          payment_mode,
          payment_recipt_no,
          payment_ref_no,
          payment_student_id,
          student_DOB,
          student_age,
          student_createdBy,
          student_firstname,
          student_id,
          student_lastname,
          student_secondname
          
          
        } = paymentdata;

        payment_mode =  findArrayValue(paymentModeArray ,payment_mode)
        payment_mode=payment_mode.label

         
        const datas = {
          _id:x,

          payment_amount,
          payment_recipt_no,
          payment_mode,
          attendance_date:moment(attendance_date.split('T')[0]).format('DD-MM-YYYY'),
          payment_date:moment(payment_date.split('T')[0]).format('DD-MM-YYYY'),
          student_full_name:student_firstname+" "+student_secondname+" "+student_lastname,      
    
        };
        data.push(datas);
        x = x + 1;
      });
          
    
        
    
          if (status === 200) {
            //setPropertiesData(propertydatas);
            console.log("paymentsData",paymentdatas)
            setPaymentsData(data);
            console.log("data",data)

           
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
        handletoggleModalCreatePartner();

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
              'firstname':createParentDetails.firstname,
              'secondname':createParentDetails.secondname,
              'lastname':createParentDetails.lastname,
              'phone':createParentDetails.phone,      
              'email':createParentDetails.email,      
              'relationship':createParentDetails.relationship,      
            }      
      
            try {
              const createUnitsResponse = await axiosInstance.post('api/v1/units/create',payload);
              console.log("createUnitsResponse",createUnitsResponse)  
              const { status } = createUnitsResponse; 
              
            
              if (status === 201) {
                console.log("added")
                successNotification("Unit added successful")
                setCreateParentDetails(createParentInitialStates)
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

        setCreateParentDetails({
          ...createParentDetails,
          [name]: value,
        });
      };

    const ASTarrifModalBody = (
        <CCardBody>
          <div>
            <h4>Channel ID : {CurrentViewRecord.channelId}</h4>
            <p className="text-muted">
              Charge Band Id : {CurrentViewRecord.chargeBandId}
            </p>
            <p className="text-muted">
              Description : {CurrentViewRecord.description}
            </p>
            <p className="text-muted">Status : {CurrentViewRecord.status}</p>
          </div>
        </CCardBody>
      );
    
      const ASModalTarrifFooter = (
        <>
          <CButton variant="secondary" onClick={handletoggleModalCreatePartner}>
            Close
          </CButton>
        </>
      );
    
      const DeleteModalBody = (
        <CCardBody>
          <p>Are you sure you want to delete this account?</p>
          <div className="d-flex justify-content-between mr-3">
            <CButton
              size="md"
              className="btn btn-primary"
              onClick={handletoggleModalCreatePartner}
            >
              Delete
            </CButton>
            <CButton
              size="md"
              className="btn btn-primary"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              Cancel
            </CButton>
          </div>
        </CCardBody>
      );
      const partnerfields = [
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
          key: "student_full_name",
          label: "Student Name",
          _style: { width: "2%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "payment_amount",
          label: "Amount",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
        {
          key: "payment_date",
          label: "Payment Date",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "attendance_date",
          label: "Attendance Date",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
        {
          key: "payment_mode",
          label: "Mode of Payment",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },      

        {
          key: "payment_recipt_no",
          label: "Recipt No",
          _style: { width: "3%" },
          sorter: true,
          filter: true,
        },
       
        // {
        //   key: "status",
        //   label: "status",
        //   _style: { width: "1%" },
        //   sorter: true,
        //   filter: true,
        // },
      
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
                      <CNavLink>Manage Payments </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader >
                            {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <span className="pull-right float-right">
                              <CButton
                                className="btn btn-primary btn-icon m-1"
                                type="button"
                                onClick={() => handletoggleModalCreatePartner()}
                              >
                                <span className="ul-btn__icon">
                                  <i className="i-Gear-2"></i>
                                </span>
                                Add A Payment
                              </CButton>
                            </span>
                            </div> */}
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={paymentsDatas}
                              fields={partnerfields}
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
                                            handletoggleModalViewPartner(item)
                                          }
                                        >
                                          View More Details
                                        </CButton>
                                      </CDropdownItem>

                                  
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
                                          Add a Parent/Gurdian
                                        </CButton>
                                      </CDropdownItem> */}
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
        modalState={modalCreateParent}
        modalTitle={<h4>{"Add a Parent/Gurdian"}</h4>}
        handleClose={handletoggleModalCreatePartner}
        modalBody={
          <span>
            
            <CCardBody>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                       <form onSubmit={handleSubmit}>
              
                        <ModalSelect 
                           label={"Select Student"}
                           arrayData={[{value:1 ,label:"two"},{value:1 ,label:"one"},{value:1 ,label:"theree"}]}
                           defaultSelectText={'selected'}
                           onChange={handleChange}
                           //value={}
                           name={"k"}
                           id={"k"}
                           />
                           <br/>
                        <ModalInput
                         onChange={handleChange}
                        //   value=
                          name="n"
                          id="f"
                          InputType="text"
                          placeholder="Amount"
                          label="Amount"
                        />
                        <br/>
                        <ModalSelect 
                           label={"Mode of payment"}
                           arrayData={[{value:1 ,label:"two"},{value:1 ,label:"one"},{value:1 ,label:"theree"}]}
                           defaultSelectText={'M'}
                           onChange={handleChange}
                           //value={}
                           name={"k"}
                           id={"k"}
                           />
                        <br/>

                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="n"
                          id="f"
                          InputType="text"
                          placeholder="Enter Phone Number"
                          label="Ref number"
                          
                        />
                        <br/>

                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="n"
                          id="f"
                          InputType="date"
                          placeholder="Enter Lastname"
                          label="Date"
                        />
                        <br/>

                       
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="n"
                          id="f"
                          InputType="email"
                          placeholder="Enter Email"
                          label="Email"
                          max={24}
                        />
                        <br/>
                        <ModalInput
                          onChange={handleChange}
                        //   value=
                          name="n"
                          id="f"
                          InputType="text"
                          placeholder="Enter Relationship"
                          label="Relationship"
                          max={24}
                        />
                        
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
          </span>
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

export default MainLayoutAuth(ViewPayments)