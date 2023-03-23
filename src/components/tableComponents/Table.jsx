import React,{useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
// import { paginationTotalRenderer, sizePerPageRenderer,sizePerPageOptionRenderer } from '../helpers/paginationHelpers';
// import { SizePerPageDropdownStandalone } from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';



const Table = (props) => {
    const [show, setShow] = useState()
    console.log("these",props.fields)
    const tableFields = props.fields
    const tableData = props.items
      
      const defaultSorted = [{
        dataField: 'property_Name',
        order: 'desc'
      }];

   

    const rowStyles = { backgroundColor: '#ffffff' };
    const rowStyles1 = {  width: '100rem',overflowX: 'scroll' };

    const options = {
      paginationPosition: 'top',
     };
  return (
    <>
    <div class="table-responsive-xl">
        <BootstrapTable
        bootstrap4
        keyField="_id"
        data={ tableData }
        columns={ tableFields }
        rowStyle={rowStyles}
        pagination={ paginationFactory(options) }
        //caption="Plain text header"
        tableClasses={rowStyles1}
        id="table-bordered"
        striped
        hover
        />
   </div>
   </>
  )
}

export default Table
