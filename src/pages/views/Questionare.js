import React, {useState, useEffect} from 'react'
import MainLayoutAuth from '../../layouts/MainLayoutAuth'
import { ModalLargeComponent } from '../../components/customComponents/bootstrapModals/Modal'
import {
 
  CCardBody,

} from "@coreui/react";
import { TextArea } from '../../components/customComponents/inputs/Input';
import { createQuestionInitialStates } from '../../components/formHelpers/initialStates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { errorNotification, successNotification, warningNotification } from '../../utils/notifications';
import moment from 'moment';

const Questionare = () => {
  const [modalCreateParent, setModalcreateParent] = useState(false);
  const [accordionToggle, setAccordionToggle] = useState(false);
  const [querysData, setQuerysData] = useState([]);
  const [modalCreateQues, setModalcreateQues] = useState(createQuestionInitialStates);
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();
  const [accordionToggles, setAccordionToggles] = useState(
    querysData.map(() => false)
  );

  useEffect(() => {
    fetchAllQuerysList()

   
  }, [])


  const handletoggleModalViewQuestion = () => {
    setModalcreateParent(!modalCreateParent);
     };

     const handleToggleClick = (index) => {
      // Create a new copy of the accordionToggles array to avoid mutating the state directly
      const newAccordionToggles = [...accordionToggles];
      
      // Toggle the state of the clicked item
      newAccordionToggles[index] = !newAccordionToggles[index];
      
      // Update the state with the new array
      setAccordionToggles(newAccordionToggles);
    }
  const handleDeleteQuery = async (items) => {
    console.log(items)
    const {
      
      questions_creation_date,
      questions_id,
      questions_q,
      questions_status,
      questions_visibility,
     
    } = items;

    const check = 
    [ 
      questions_id,
     
    ].every(value => value);
      if (check===true) {

        let payload = {
          'questions_id':items.questions_id,
          'questions_createdBy':auth.user,
        
        }      
  
        try {
          const createQueryResponse = await axiosInstance.patch('api/v1/questions/delete',payload);
          console.log("createQueryResponse",createQueryResponse)  
          const { status } = createQueryResponse; 
          
        
          if (status === 201) {
            successNotification("Deleted Successful")
            setModalcreateQues(createQuestionInitialStates)
            fetchAllQuerysList()
          } else {
            errorNotification("Something went wrong")
          }
        } catch (ex) {
          console.log({ex})
          errorNotification("Error:something went wrong")

        }
      } else if (check === false) {
        warningNotification("There is an Empty Field")
      }

     };

     const handleChange = ({ currentTarget: input }) => {
      let name = input.id;
      let value = input.value;

      setModalcreateQues({
        ...modalCreateQues,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      handletoggleModalViewQuestion();
      //console.log(modalCreateQues)

      const {
        query,
       
      } = modalCreateQues;
  
      const check = 
      [ 
        query,
       
      ].every(value => value);
        if (check===true) {

          let payload = {
            'questions_q':modalCreateQues.query,
            'questions_createdBy':auth.user,
          
          }      
    
          try {
            const createQueryResponse = await axiosInstance.post('api/v1/questions/create',payload);
            console.log("createQueryResponse",createQueryResponse)  
            const { status } = createQueryResponse; 
            
          
            if (status === 201) {
              successNotification("Added Successful")
              setModalcreateQues(createQuestionInitialStates)
              fetchAllQuerysList();
            } else {
              errorNotification("Something went wrong")
            }
          } catch (ex) {
            console.log({ex})
            errorNotification("Error:something went wrong")

          }
        } else if (check === false) {
          warningNotification("There is an Empty Field")
        }
    }

    async function fetchAllQuerysList() {
      try {
        const { data: fetchQueryResponses, status } = await axiosInstance.get(`api/v1/questions/`);
        const { data:querydatas } =fetchQueryResponses
        console.log("fetchQueryResponses",fetchQueryResponses)
     
        
        let data = [];
        let x = 1;
        

        querydatas.forEach((querydata) => {
      let {
        questions_createdBy,
        questions_creation_date,
        questions_id,
        questions_q,
        questions_status,
        questions_visibility,
        
        
      } = querydata;

      

       
      const datas = {
        _id:x,
        questions_createdBy,
        questions_creation_date:moment(questions_creation_date.split('T')[0]).format('DD-MM-YYYY'),
        questions_id,
        questions_q,
        questions_status,
        questions_visibility,
   
  
      };
      data.push(datas);
      x = x + 1;
    });
        
  
      
  
        if (status === 200) {
          //setPropertiesData(propertydatas);
          console.log("paymentsData",querydatas)
          setQuerysData(data);
          console.log("data",data)

         
        } else {
          errorNotification("Unable to fetch Questions Data");
        }
      } catch (ex) {
        errorNotification("Unable to fetch Something went wrong");
        console.log({ ex });
      }
    }
  return (
    <div class="page-heading">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Questionnare</h3>
                    <p class="text-subtitle text-muted"></p>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li class="breadcrumb-item active" aria-current="page">questionare</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                <button  className="btn btn-primary ml-1" data-bs-dismiss="modal"
                  onClick={() =>
                    handletoggleModalViewQuestion()
                  }
                >
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Create new Question</span>
                </button>
                    </nav>

                </div>
            </div>
        </div>
        <br/>
        <br/>
        <div id="accordion" >
        {querysData.map((item, index) => (
         
          <div class="card" key={index}>
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
              <span class="collapsed collapse-title" onClick={() => handleToggleClick(index)}>
                {/* <i   class={`bi ${accordionToggle ? "bi-chevron-up" : "bi-chevron-down"}`}></i> */}
                <i
                  className={`bi ${
                    accordionToggles[index] ? "bi-chevron-up" : "bi-chevron-down"
                  }`}
                ></i>
              </span>
              <div class="card-body">
                  {item.questions_q}
              </div>
              </h5>
            </div>
            <div  id={`collapse-${index}`}  className={`collapse ${ accordionToggles[index] ? "show" : ""  }`}  aria-labelledby="headingOne" data-parent="#accordion">
            {/* <div id="collapseOne"  class={`collapse ${accordionToggle ? "show" : ""}`} aria-labelledby="headingOne" data-parent="#accordion"> */}
              <div class="card-body">
                  <button type="submit" className="btn btn-warning ml-1" data-bs-dismiss="modal">
                      <i className="bx bx-check d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Change </span>
                  </button>
                  {"  "}
                  <button  className="btn btn-danger ml-1" data-bs-dismiss="modal"onClick={() => handleDeleteQuery(item)}>
                      <i className="bx bx-check d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Delete Question</span>
                  </button>
              </div>
            </div>
          </div>
          
          ))}
          </div>

 
                <ModalLargeComponent
                  modalState={modalCreateParent}
                  modaalTitle="Delete Partner"
                  //handleClose={() => setDeleteModal(false)}
                  handleClose={handletoggleModalViewQuestion}
                  modalBody={
                      <span>
                      <CCardBody>
                        <form onSubmit={handleSubmit}>
                      <TextArea
                          onChange={handleChange}
                        //   value=
                          name="query"
                          id="query"
                          placeholder="Enter Query"
                          label="Create A Query"
                          rows="7"
                          
                        />
                        
                         <div className="modal-footer">
                            <button type="button" onClick={handletoggleModalViewQuestion} className="btn btn-light-secondary"
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
                      </CCardBody>
                    </span>
                  }
                />
           </div>
  )
}

export default MainLayoutAuth(Questionare)