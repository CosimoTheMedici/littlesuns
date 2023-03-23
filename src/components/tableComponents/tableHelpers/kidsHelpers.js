import { useState } from 'react'
import {paginationFactory, SizePerPageDropdownStandalone } from 'react-bootstrap-table-next'
import { Link, useNavigate } from 'react-router-dom'
import ModalComponent from '../../customComponents/bootstrapModals/Modal'
import { Modal } from '../../customComponents/modals/Modal'



const RankFormatter=(cell, row, rowIndex) =>{
    const [modalCreatePartner, setModalcreatePartner] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


   const handleClick = () => {
       console.log("cell",cell)
       console.log("row",row)
       console.log("rowIndex",rowIndex)
       console.log("cell",)
       
   }
   const handletoggleModalCreatePartner = () => {
    setModalcreatePartner(!modalCreatePartner);
   };

   const handleEditClick=() => {
    console.log("mmimi")
   }

   return (
                    <>
                            <div className="dropdown">
                                <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="user-menu d-flex">
                                       
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style={{minWidth: "11rem"}}>
                                    
                                    <li><button type="button"   onClick={handletoggleModalCreatePartner}
                                           >
                                            Launch demo modal
                                        </button>
                                        <div class="modal text-left" id="animation" tabIndex="-1" role="dialog"
                                aria-labelledby="myModalLabel6" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="myModalLabel6">Disabled Animation</h4>
                                            <button type="button" class="close" data-bs-dismiss="modal"
                                                aria-label="Close">
                                                <i data-feather="x"></i>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p>
                                                Chocolate bar jelly dragée cupcake chocolate bar I love donut liquorice.
                                                Powder I love marzipan
                                                donut candy canes jelly-o. Dragée liquorice apple pie candy biscuit
                                                danish lemon drops sugar plum.
                                            </p>
                                            <div class="alert bg-rgba-success" role="alert">
                                                <span class="text-bold-600">Well done!</span>
                                                You successfully read this important alert
                                                message.
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-light-secondary"
                                                data-bs-dismiss="modal">
                                                <i class="bx bx-x d-block d-sm-none"></i>
                                                <span class="d-none d-sm-block">Close</span>
                                            </button>
                                            <button type="button" class="btn btn-primary ml-1" data-bs-dismiss="modal">
                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                <span class="d-none d-sm-block">Accept</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                    </li>
                                    <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-gear me-2"></i>
                                            Settings</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="icon-mid bi bi-wallet me-2"></i>
                                            Wallet</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#"><i
                                                className="icon-mid bi bi-box-arrow-left me-2"></i> Logout</a></li>
                                </ul>
                            </div>

                            <ModalComponent
                                modalState={deleteModal}
                                modaalTitle="Delete Partner"
                                handleClose={() => setDeleteModal(false)}
                                modalBody={
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title" id="myModalLabel6">Disabled Animation</h4>
                                            <button type="button" class="close" data-bs-dismiss="modal"
                                                aria-label="Close">
                                                <i data-feather="x"></i>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p>
                                                Chocolate bar jelly dragée cupcake chocolate bar I love donut liquorice.
                                                Powder I love marzipan
                                                donut candy canes jelly-o. Dragée liquorice apple pie candy biscuit
                                                danish lemon drops sugar plum.
                                            </p>
                                            <div class="alert bg-rgba-success" role="alert">
                                                <span class="text-bold-600">Well done!</span>
                                                You successfully read this important alert
                                                message.
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-light-secondary"
                                                data-bs-dismiss="modal">
                                                <i class="bx bx-x d-block d-sm-none"></i>
                                                <span class="d-none d-sm-block">Close</span>
                                            </button>
                                            <button type="button" class="btn btn-primary ml-1" data-bs-dismiss="modal">
                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                <span class="d-none d-sm-block">Accept</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                }
                                />
                            
                            </>
   );
 }


export const displayKidsfields = [
    {
       dataField: "_id",
       text: "ID",
       sort: true,
       headerStyle: { width: '5%' },
       style: { width: '5%' },
       align: 'left'      
    },
    {
        dataField: "firstName",
        text: "FirstName",
        style: { width: '10%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
               },
        headerStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        width: '10%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        textIndent: 0,
        },
        sort: true,
     },
    {
       dataField: "secondName",
       text: "secondName",
       style: { width: '10%' },  
       sort: true,
       headerStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        width: '10%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        textIndent: 0,
        },
    },
    {
       dataField: "lastName",
       text: "Last Name",
       style: { width: '10%' },  
       sort: true,
       headerStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        width: '10%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        textIndent: 0,
        },
    },
    {
        dataField: "unitName",
        text: "unitName",
        style: { width: '10%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
               }, 
        sort: true,
        headerStyle: {
            textAlign: 'left',
            whiteSpace: 'nowrap',
            width: '10%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            textIndent: 0,
            },
     },
   
 
  
    {
       dataField: "email",
       text: "Email",
       style: { width: '15%',
       overflow: 'hidden',
       whiteSpace: 'nowrap',
       textOverflow: 'ellipsis'
              }, 
       sort: true,
       headerStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '10%',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        textIndent: 0,
        },
    },
    {
       dataField: "IDNumber",
       text: "ID Number",
       style: { width: '15%',
       overflow: 'hidden',
       whiteSpace: 'nowrap',
       textOverflow: 'ellipsis'
              }, 
       sort: true,
       headerStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '10%',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        textIndent: 0,
        },
    },
    {
        dataField: "phoneNumber",
        text: "Phone",
        style: { width: '10%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
               }, 
        sort: true,
        headerStyle: {
            textAlign: 'left',
            whiteSpace: 'nowrap',
            width: '10%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            textIndent: 0,
            },
     },
    
    {
       dataField: "emergencyNumber",
       text: "Eme Number",
       style: { width: '10%',
       overflow: 'hidden',
       whiteSpace: 'nowrap',
       textOverflow: 'ellipsis'
              }, 
       sort: true,
       headerStyle: {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        width: '10%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        textIndent: 0,
        },
    },
  
    
    
    {
      dataField: 'rank',
      text: 'Action',
      formatter: RankFormatter,
      headerStyle: { width: 'auto' },
       style: { width: 'auto' }, 
     }
  ];
