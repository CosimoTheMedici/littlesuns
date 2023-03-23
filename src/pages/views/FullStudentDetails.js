import moment from 'moment';
import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { images } from '../../assets/images'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import MainLayoutAuth from '../../layouts/MainLayoutAuth'
import { relationshipArray } from '../../utils/utilArrays';
import { findArrayValue } from '../../utils/utilFunctions';

const FullStudentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state }=location
    const axiosInstance = useAxiosPrivate();
    const [studentData, setStudentData] = useState({})
    const [attendanceData, setAttendanceData] = useState([])
    const [gurdiansData, setGurdiansData] = useState([])
    const [qnRData, setQnRData] = useState([])


    //const { id } = state || {};
    useEffect(() => {
        if (!location.state || !location.state.data){navigate('/view/students')}
        setStudentData(state.data)
        setGurdiansData(state.data.student_parent.sort((a, b) => a.parent_relationship - b.parent_relationship));
        //console.log("state.data.student_id",state.data.student_id)
        fetchStudentAttendances(state.data.student_id)
        fetchStudentQnR(state.data.student_id)

    }, [])

    async function fetchStudentQnR(id) {
        console.log("studentData.student_id",studentData.student_id)
        try {
          const { data: fetchResResponses, status:Rstatus } = await axiosInstance.get(`api/v1/students/qnrByID/${id}`);
          const { data: fetchQuesResponses, status:QStatus } = await axiosInstance.get(`api/v1/questions`);
          const { data:Rdatas } =fetchResResponses
          const { data:Qdatas } =fetchQuesResponses
          console.log("Rdatas",Rdatas[0])
          console.log("Qdatas",Qdatas)
          let ResDatas = JSON.parse(Rdatas[0].responses_res)
          console.log("ResData",ResDatas)
          
          let data = [];
          let x = 1;

          Object.entries(ResDatas).forEach(([key, value]) => {
            console.log(key,value);
            const result = Qdatas.find(data => data.questions_id == key);
            
            let questions_q=result.questions_q
            const datas = {
                _id:x,
                questions_q,
                value            
            
                };
            console.log("datas",datas)
            data.push(datas);
            x = x + 1;

        });

          if (Rstatus === 200) {
            //setPropertiesData(propertydatas);
            setQnRData(data);

           
          } else {
            //errorNotification("Unable to fetch Student Data");
          }
        } catch (ex) {
          //errorNotification("Unable to fetch Something went wrong");
          console.log({ ex });
        }
      }
    async function fetchStudentAttendances(id) {
        console.log("studentData.student_id",studentData.student_id)
        try {
          const { data: fetchStudentsResponses, status } = await axiosInstance.get(`api/v1/attendances/byId/${id}`);
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
        } = studentdata;
   
        const datas = {
          _id:x,
          attendance_date:moment(attendance_date.split('T')[0]).format('DD-MM-YYYY'),
          attendance_student_id,
          attendance_id,
          attendance_payment_status:attendance_payment_id === 0? "not paid":'paid'
    
        };
        data.push(datas);
        x = x + 1;
      });
          
    
        
    
          if (status === 200) {
            //setPropertiesData(propertydatas);
            console.log("paymentsData",studentdatas)
            setAttendanceData(data);

           
          } else {
            //errorNotification("Unable to fetch Student Data");
          }
        } catch (ex) {
          //errorNotification("Unable to fetch Something went wrong");
          console.log({ ex });
        }
      }




      return (
    <div class="page-heading">
        <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Card</h3>
                    <p class="text-subtitle text-muted">Bootstrap’s cards provide a flexible and extensible content
                        container with multiple variants and options.</p>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Card</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <section id="content-types">
        <div class="row">
            
            <div class="col-xl-4 col-md-6 col-sm-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-header text-center">
                        
                        <img src={images.one_image} class="card-img-top img-fluid" alt="singleminded"/>
                            <h4 class="card-title">Enterpreneur</h4>
                            <p></p>
                         </div>
                         {/* student_DOB: "2023-02-27"
                        student_age: 34
                        student_createdBy: 1
                        student_firstname: "mama"
                        student_id: 1
                        student_lastname: "kaka"
                        student_secondname: "milka"
                        student_three_names: "mama milka kaka" */}
                        
                        <div class="card-body">
                            <h5 class="card-title">{studentData.student_three_names}</h5>
                            <p class="card-text">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"></li>
                                    <li class="list-group-item">Gender : {studentData.student_gender}</li>
                                    <li class="list-group-item">Age : {studentData.student_age}</li>
                                    <li class="list-group-item">DOB : {studentData.student_DOB}</li>
                                </ul>
                            </p>
                            <p class="card-text">
                               Big Description.
                            </p>
                        </div>
                    </div>
                    
                </div>
              
            </div>
           
            <div class="col-xl-4 col-md-6 col-sm-12">
                <div class="card">
                    <div class="card-content">
                        
                        <div class="card-body">
                            <h4 class="card-title">Gurdians</h4>
                            {gurdiansData.map((item, index) => (
                              
                                <div class="card-body" key={index}>
                                <h5 class="card-title">{relationshipArray.find(obj => obj.value === item.parent_relationship)?.label}</h5>
                                <p class="card-text">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">{item.parent_firstname} {item.parent_secondname} {item.parent_lastname} </li>
                                        <li class="list-group-item">Phone : {item.parent_phone}</li>
                                        <li class="list-group-item">Email : {item.parent_email}</li>
                                    </ul>
                                </p>
                                {/* <p class="card-text">
                                    Chocolate sesame snaps apple pie danish cupcake sweet roll jujubes tiramisu.Gummies
                                    bonbon apple pie fruitcake icing biscuit apple pie jelly-o sweet roll.
                                </p> */}
                                </div>

                            ))}
                            
                            <button class="btn btn-primary block">Update now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6 col-sm-12">
                <div class="card">
                    <div class="card-content">
                        
                        <div class="card-body">
                            <h4 class="card-title">Attendancies</h4>
                            {attendanceData.map((item, index) => (
                              
                                <div class="card-body" key={index}>
                                <h5 class="card-title">Last 5 attendancies</h5>
                                <p class="card-text">
                                    <ul class="list-group list-group-flush">
                                        
                                        <li class="list-group-item">
                                        <div class="row">
                                        <div class="col-xl-9 col-md-9 col-sm-12">{item.attendance_date}</div>
                                        <div class="col-xl-3 col-md-3 col-sm-12">
                                            <div class= {item.attendance_payment_status=="not paid" ? "avatar bg-danger me-3" : "avatar bg-success me-3"}>
                                                <span class="avatar-content">AS</span>
                                            </div>
                                        </div>
                                        </div>
                                        </li>
                                    </ul>
                                </p>
                                {/* <p class="card-text">
                                    Chocolate sesame snaps apple pie danish cupcake sweet roll jujubes tiramisu.Gummies
                                    bonbon apple pie fruitcake icing biscuit apple pie jelly-o sweet roll.
                                </p> */}
                                </div>

                            ))}
                            
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="row">
       

        <div class="col-xl-12 col-md-12 col-sm-12">
        <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            
                            <div class="list-group">
                            {qnRData.map((item, index) => ( 
                             <a class="list-group-item list-group-item-action active" key={index}>
                             <div class="d-flex w-100 justify-content-between">
                                 <h5 class="mb-1 text-white">{item.questions_q}</h5>
                                 {/* <small>3 days ago</small> */}
                             </div>
                             <p class="mb-1">
                             {item.value}
                             </p>
                             {/* <small>Donec id elit non mi porta.</small> */}
                         </a>
                         
                             
                        ))}
                               
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default MainLayoutAuth(FullStudentDetails)