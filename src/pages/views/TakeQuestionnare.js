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
import { useLocation ,useNavigate  } from 'react-router-dom';

const TakeQuestionnare = () => {
    const [formValues, setFormValues] = useState({});
    const [studentData, setStudentData] = useState({})
    const [modalCreateParent, setModalcreateParent] = useState(false);
    const [accordionToggle, setAccordionToggle] = useState(false);
    const [querysData, setQuerysData] = useState([]);
    const [modalCreateQues, setModalcreateQues] = useState(createQuestionInitialStates);
    const axiosInstance = useAxiosPrivate();
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [accordionToggles, setAccordionToggles] = useState(
        querysData.map(() => false)
    );
    const { state }=location


  useEffect(() => {
    if (!location.state || !location.state.data){navigate('/view/students',{replace:true})}
    fetchAllQuerysList()
    setStudentData(state.data)


   
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

     const handleChange1 = ({ currentTarget: input }) => {
      let name = input.id;
      let value = input.value;

      setModalcreateQues({
        ...modalCreateQues,
        [name]: value,
      });
    };

    

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

      let name='name'

       
      const datas = {
        _id:x,
        questions_createdBy,
        questions_creation_date:moment(questions_creation_date.split('T')[0]).format('DD-MM-YYYY'),
        questions_id,
        questions_q,
        questions_status,
        questions_visibility,
        name,
   
  
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

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("Form Values: ", formValues);
        console.log("Form Values: ", studentData.student_id);
        console.log("Form Values: ", Object.values(formValues).length);

        if (Object.values(formValues).length > 0) {
           

            let payload = {
              'responses_res':formValues,
              'responses_student_id':studentData.student_id,
              'responses_createdBy':auth.user,
            
            }      
      
            try {
              const createQueryResponse = await axiosInstance.post('api/v1/responses/create',payload);
              console.log("createQueryResponse",createQueryResponse)  
              const { status } = createQueryResponse; 
              
            
              if (status === 201) {
                successNotification("Added Successful")
                //setModalcreateQues(createQuestionInitialStates)
                setFormValues({})
                fetchAllQuerysList();
              } else {
                errorNotification("Something went wrong")
              }
            } catch (ex) {
              console.log({ex})
              errorNotification("Error:something went wrong")
  
            }
          } else if (Object.values(formValues).length <= 0) {
            warningNotification("There is an Empty Field")
          }
      };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
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
                {/* <button  className="btn btn-primary ml-1" data-bs-dismiss="modal"
                  onClick={() =>
                    handletoggleModalViewQuestion()
                  }
                >
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Create new Question</span>
                </button> */}
                    </nav>

                </div>
            </div>
        </div>
        <br/>
        <br/>
        <div id="accordion" >
        <form onSubmit={handleSubmit}>
        {querysData.map((item, index) => (
         
          <div class="card" key={index}>
            <div class="card-header" id="headingOne">
              <h6 class="mb-0">
              <span class="collapsed collapse-title" >
               
                {item.questions_q}
              </span>
              <div class="card-body">
              <TextArea 
              id={item.questions_id}
              name={item.questions_id}
              value={formValues[item.questions_id] || "" }
              onChange={handleChange}
            />
              </div>
              </h6>
            </div>
          </div>
          
          ))}

         <div id="accordion" >
         
          <div class="card" >
            
            <div  aria-labelledby="headingOne" data-parent="#accordion">
            
              <div class="card-body">
               <div className="row">
                <div className="col-sm-6">
                    <button type="submit" className="btn btn-warning ml-1" data-bs-dismiss="modal">
                      <i className="bx bx-check d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Change </span>
                  </button>
                </div>
                <div className="col-sm-6">
                <button  type="submit" className="btn btn-primary ml-1" data-bs-dismiss="modal"
                  
                >
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="d-none d-sm-block">Submit Questionare</span>
                </button> 
                </div>
                  
                  
              </div>
            </div>
          </div>
          


          </div>
          </div>


         </form>
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

export default MainLayoutAuth(TakeQuestionnare)