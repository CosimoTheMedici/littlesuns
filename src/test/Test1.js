import React, { useState,Fragment } from 'react'
import MainLayoutAuth from '../layouts/MainLayoutAuth'
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
import Modal from '../components/customComponents/bootstrapModals/Modal'


const Test1 = () => {
    const [modalCreatePartner, setModalcreatePartner] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [CurrentViewRecord, setCurrentViewRecord] = useState({});
    const [Partners] = useState([]);


    const handletoggleModalCreatePartner = () => {
        setModalcreatePartner(!modalCreatePartner);
       };
    const handletoggleModalViewPartner = () => {
        setModalcreatePartner(!modalCreatePartner);
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
          key: "ID",
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
          key: "channelCode",
          label: "Corp Short Code",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "channelName",
          label: "Corporate Name",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "partnerEmail",
          label: "Partner email",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "branch",
          label: "Branch",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
      
        {
          key: "description",
          label: "Description",
          _style: { width: "3%" },
          sorter: true,
          filter: true,
        },
        {
          key: "verifiedIf",
          label: "Verification",
          _style: { width: "1%" },
          sorter: true,
          filter: true,
        },
        {
          key: "status",
          label: "status",
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
      const partner=[
    {    "ID":"d",
        "channelCode":"d",
        "channelName":"d",
        "partnerEmail":"d",
        "branch":"d",
        "description":"d",
        "verifiedIf":"d",
        "status":"d",},
        {    "ID":"d",
        "channelCode":"d",
        "channelName":"d",
        "partnerEmail":"d",
        "branch":"d",
        "description":"d",
        "verifiedIf":"d",
        "status":"d",},
        {    "ID":"d",
        "channelCode":"d",
        "channelName":"d",
        "partnerEmail":"d",
        "branch":"d",
        "description":"d",
        "verifiedIf":"d",
        "status":"d",},
      ]
  return (
    <Fragment>
        <CRow>
          <CCol xs="50" md="100" className="mb-4">
            <CCard>
              <CCardBody>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>Partners</CNavLink>
                    </CNavItem>
                    {/* <CNavItem>
                      <CNavLink>Partners Tarrifs</CNavLink>
                    </CNavItem> */}
                    <CNavItem>
                      <CNavLink>Unverified Partners</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Rejected Partners</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader>
                            Partner
                            <span className="pull-right float-right">
                              <CButton
                                class="btn btn-primary btn-icon m-1"
                                type="button"
                                onClick={() => handletoggleModalCreatePartner()}
                              >
                                <span className="ul-btn__icon">
                                  <i className="i-Gear-2"></i>
                                </span>
                                Create Partner
                              </CButton>
                            </span>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={partner}
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
                                          View Partner Details
                                        </CButton>
                                      </CDropdownItem>

                                      {/* <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handlePartnerStatus(item)
                                          }
                                        >
                                          {item.status === "ACTIVE"
                                            ? "DISABLE"
                                            : "ACTIVATE"}
                                        </CButton>
                                      </CDropdownItem> */}
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
                                          Update Partner Details
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

                    {/* <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader>
                            Partner
                            <span className="pull-right float-right">
                              <CButton
                                class="btn btn-primary btn-icon m-1"
                                type="button"
                                onClick={() => handletoggleModaltarrif()}
                              >
                                <span className="ul-btn__icon">
                                  <i className="i-Gear-2"></i>
                                </span>
                                <span className="ul-btn__text">
                                  Create Partner Tarrif
                                </span>
                              </CButton>
                            </span>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={partnerTarrifs}
                              fields={tarrifFields}
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
                                            handletoggleModalViewTarrifPartner(
                                              item
                                            )
                                          }
                                        >
                                          View Partner Details
                                        </CButton>
                                      </CDropdownItem>
                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() =>
                                            handletoggleModal(item)
                                          }
                                        >
                                          Update Partner Details
                                        </CButton>
                                      </CDropdownItem>
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
                                          toggleDetails(index);
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
                    </CTabPane> */}

                    <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader>Unverified Partners</CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={partner}
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
                                          View Partner Details
                                        </CButton>
                                      </CDropdownItem>
                                    </CDropdownMenu>
                                  </CDropdown>
                                ),
                                show_details: (index) => {
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

                    <CTabPane>
                      <CCol>
                        <CCard>
                          <CCardHeader>Rejected Partners</CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={partner}
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
                                          size="md"
                                          onClick={() =>
                                            handletoggleModalViewPartner(item)
                                          }
                                        >
                                          View Partner Details
                                        </CButton>
                                      </CDropdownItem>
                                      <CDropdownItem>
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="md"
                                          onClick={() =>
                                            handletoggleModalViewPartner(item)
                                          }
                                        >
                                          Edit Rejected Partner
                                        </CButton>
                                      </CDropdownItem>
                                    </CDropdownMenu>
                                  </CDropdown>
                                ),
                                show_details: (index) => {
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

      {/* <CustomModal
        modalState={ShowTarrifDetailsModal}
        modalBody={ASTarrifModalBody}
        modaalFooter={ASModalTarrifFooter}
        handletoggleModal={handletoggleTarrifModal}
      /> */}
      <Modal
        modalState={modalCreatePartner}
        modaalTitle={<h4>{CurrentViewRecord.channelName + " Details"}</h4>}
        handleClose={handletoggleModalCreatePartner}
        modalBody={
          <span>
            <CCardBody>
              <p>Partner Name : {CurrentViewRecord.channelName}</p>
              <p>Partner Email : {CurrentViewRecord.partnerEmail}</p>
              <p>Partner Short Code : {CurrentViewRecord.channelCode}</p>
              <p>Partner Address : {CurrentViewRecord.address}</p>
              <p>Institution ID: {CurrentViewRecord.institution_id}</p>
              <p>Phone : {CurrentViewRecord.phone}</p>
              <p>Description : {CurrentViewRecord.description}</p>
              <p>Corporate Id : {CurrentViewRecord.channelId}</p>
              <p>Working Hours : {CurrentViewRecord.working_hours}</p>
              <p>Branch : {CurrentViewRecord.branch}</p>
              <p>RM email : {CurrentViewRecord.email}</p>
              <p>Creation Date : {CurrentViewRecord.creationDate}</p>
              <p>Created By: {CurrentViewRecord.createdBy}</p>
              <p>Verification Status: {CurrentViewRecord.verifiedIf}</p>
              <p>Verification Date: {CurrentViewRecord.verifiedDate}</p>
              <p>Verification By: {CurrentViewRecord.verifiedBy}</p>
              <p>Updated By: {CurrentViewRecord.updatedBy}</p>
              <p>Updated Date: {CurrentViewRecord.updatedDate}</p>
              <p> Pass Count: {CurrentViewRecord.pass_count}</p>

              <p>Status: {CurrentViewRecord.status}</p>
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
              <p>Partner Name : {CurrentViewRecord.channelName}</p>
              <p>Partner Email : {CurrentViewRecord.partnerEmail}</p>
              <p>Partner Short Code : {CurrentViewRecord.channelCode}</p>
              <p>Partner Address : {CurrentViewRecord.address}</p>
              <p>Institution ID: {CurrentViewRecord.institution_id}</p>
              <p>Phone : {CurrentViewRecord.phone}</p>
              <p>Description : {CurrentViewRecord.description}</p>
              <p>Corporate Id : {CurrentViewRecord.channelId}</p>
              <p>Working Hours : {CurrentViewRecord.working_hours}</p>
              <p>Branch : {CurrentViewRecord.branch}</p>
              <p>RM email : {CurrentViewRecord.email}</p>
              <p>Creation Date : {CurrentViewRecord.creationDate}</p>
              <p>Created By: {CurrentViewRecord.createdBy}</p>
              <p>Verification Status: {CurrentViewRecord.verifiedIf}</p>
              <p>Verification Date: {CurrentViewRecord.verifiedDate}</p>
              <p>Verification By: {CurrentViewRecord.verifiedBy}</p>
              <p>Updated By: {CurrentViewRecord.updatedBy}</p>
              <p>Updated Date: {CurrentViewRecord.updatedDate}</p>
              <p> Pass Count: {CurrentViewRecord.pass_count}</p>

              <p>Status: {CurrentViewRecord.status}</p>
            </CCardBody>
          </span>
        }
      />
     
    </Fragment>
  )
}

export default MainLayoutAuth(Test1)