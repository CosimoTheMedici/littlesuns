import React,{ useEffect,useState } from 'react'
import { Input1, ModalInput } from '../../components/customComponents/inputs/Input';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import MainLayoutAuth from '../../layouts/MainLayoutAuth'
import { errorNotification, successNotification } from '../../utils/notifications';

const CheckAttendance = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const axiosInstance = useAxiosPrivate()
    const { auth } = useAuth()

    const [checkedItems, setCheckedItems] = useState([]);

    // const studentsData = [
    //   { student_fullname: 'Alice' },
    //   { student_fullname: 'Bob' },
    //   { student_fullname: 'Charlie' },
    // ];
  
    const handleChange = (e, index) => {
      const { checked } = e.target;
  
      setCheckedItems(prevState => {
        const newCheckedItems = [...prevState];
        newCheckedItems[index] = checked;
        return newCheckedItems;
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const selectedStudents = studentsData.filter((_, index) => checkedItems[index]);
      
      console.log('Selected students:', selectedStudents);
      let payload = []
      selectedStudents.map((item, index) => (
        payload.push({attendance_student_id:item.student_id,attendance_createdBy:auth.user,attendance_date:new Date().toISOString().slice(0, 10)})
      ))

      console.log('payload',payload)

       try {
          const { data: fetchStudentsResponses, status } = await axiosInstance.post(`api/v1/attendances/create`,payload);
          const { data:studentdatas } =fetchStudentsResponses
          console.log("fetchStudentsResponses",fetchStudentsResponses)
       
          
          let data = [];
          let x = 1;

          

    //       studentdatas.forEach((studentdata) => {
    //     let {
    //       student_DOB,
    //       student_age,
    //       student_createdBy,
    //       student_firstname,
    //       student_id,
    //       student_lastname,
    //       student_secondname
    //     } = studentdata;
   
    //     const datas = {
    //       _id:x,
    //       student_DOB:student_DOB.split('T')[0],
    //       student_age,
    //       student_createdBy,
    //       student_firstname,
    //       student_id,
    //       student_lastname,
    //       student_secondname,
    //       student_fullname:student_firstname+" " + student_secondname +" "+ student_lastname
    
    //     };
    //     data.push(datas);
    //     x = x + 1;
    //   });
          
    
        
    
          if (status === 200 || status ===201) {
            fetchStudentList(date)
            successNotification("llkkkkkk")

           
          } else {
            errorNotification("Unable to fetch Student Data");
          }
        } catch (ex) {
          errorNotification("Unable to fetch Something went wrong");
          console.log({ ex });
        }
    };



    useEffect(() => {
        fetchStudentList(date)
               
      }, [date])

      async function fetchStudentList(date) {
        try {
          const { data: fetchStudentsResponses, status } = await axiosInstance.get(`api/v1/students/notInAttendance/${date}`);
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
          student_secondname
        } = studentdata;
   
        const datas = {
          _id:x,
          student_DOB:student_DOB.split('T')[0],
          student_age,
          student_createdBy,
          student_firstname,
          student_id,
          student_lastname,
          student_secondname,
          student_fullname:student_firstname+" " + student_secondname +" "+ student_lastname
    
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
  return (
    <section className="tasks">
        <div className="row">
            <div className="col-lg-7">
                <div className="card widget-todo">
                    <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                        <h4 className="card-title d-flex">
                            <i className="bx bx-check font-medium-5 pl-25 pr-75"></i>Tasks
                        </h4>
                        <ul className="list-inline d-flex mb-0">
                            <li className="d-flex align-items-center">
                                <i className="bx bx-check-circle font-medium-3 me-50"></i>
                                <div className="dropdown">
                                    <div className="dropdown-toggle me-1" role="button" id="dropdownMenuButton"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Task
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Option 1</a>
                                        <a className="dropdown-item" href="#">Option 2</a>
                                        <a className="dropdown-item" href="#">Option 3</a>
                                    </div>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <i className="bx bx-sort me-50 font-medium-3"></i>
                                <div className="dropdown">
                                    <div className="dropdown-toggle" role="button" id="dropdownMenuButton2"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Task
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                        <a className="dropdown-item" href="#">Option 1</a>
                                        <a className="dropdown-item" href="#">Option 2</a>
                                        <a className="dropdown-item" href="#">Option 3</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body px-0 py-1">
                        <ul className="widget-todo-list-wrapper" id="widget-todo-list">
                            <li className="widget-todo-item">
                            <div className="row">
                            <div className="col-md-12">
                                <div className="form-group row align-items-center">
                                    <div className="col-lg-2 col-3">
                                        <label className="col-form-label">Enter Date</label>
                                    </div>
                                    <div className="col-lg-10 col-9">
                                        <input
                                            type ="date"
                                            id="date"
                                            className="form-control"
                                            name="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            max={new Date().toISOString().slice(0, 10)}
                                            min = {new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}

                                            />
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                            </li>

                            <li className="widget-todo-item">
                                <div
                                    className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                    <div className="widget-todo-title-area d-flex align-items-center">
                                        <i data-feather="list" className="cursor-move"></i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-list cursor-move"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                        <div className="checkbox checkbox-shadow">
                                            <input type="checkbox" className="form-check-input" id="checkbox1"/>
                                            <label htmlFor="checkbox1" style={{paddingRight:"7px"}}></label>
                                        </div>
                                        <span className="widget-todo-title ml-50">Add SCSS and JS files if
                                            required</span>
                                    </div>
                                    
                                </div>
                            </li>
                            {/* <form>
                            {studentsData.map((item, index) => {
                                    return (
                                    <li className="widget-todo-item" item={item} key={index} >
                                        <div
                                            className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                            <div className="widget-todo-title-area d-flex align-items-center">
                                                <i data-feather="list" className="cursor-move"></i>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-list cursor-move"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                                <div className="checkbox checkbox-shadow">
                                                    <input type="checkbox" className="form-check-input" id="checkbox1"/>
                                                    <label htmlFor="checkbox1" style={{paddingRight:"7px"}}></label>
                                                </div>
                                                <span className="widget-todo-title ml-50">{item.student_fullname}</span>
                                            </div>
                                            
                                        </div>
                                    </li>

                                    );
                                    })}
                            <hr />
                            <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                               
                                <button type="button" className="btn btn-primary btn-lg btn-block" data-bs-dismiss="modal">
                                    <i className="bx bx-check d-block d-sm-none"></i>
                                    <span className="d-none d-sm-block">Acceptkk</span>
                                </button>
                            </div>
                            <div className="col-2"></div>

                            </div>
                            </form> */}

                            <form onSubmit={handleSubmit}>
                                {studentsData.map((item, index) => (
                                    <li className="widget-todo-item" item={item} key={index}>
                                    <div className="widget-todo-title-wrapper d-flex justify-content-between align-items-center mb-50">
                                        <div className="widget-todo-title-area d-flex align-items-center">
                                        <i data-feather="list" className="cursor-move"></i>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-list cursor-move"
                                        >
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                        </svg>
                                        <div className="checkbox checkbox-shadow">
                                            <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`checkbox${index}`}
                                            onChange={(e) => handleChange(e, index)}
                                            checked={checkedItems[index] || false}
                                            />
                                            <label htmlFor={`checkbox${index}`} style={{ paddingRight: '7px' }}></label>
                                        </div>
                                        <span className="widget-todo-title ml-50">{item.student_fullname}</span>
                                        </div>
                                    </div>
                                    </li>
                                ))}
                                <hr />
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className="col-8">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block" data-bs-dismiss="modal">
                                        <i className="bx bx-check d-block d-sm-none"></i>
                                        <span className="d-none d-sm-block">Accept</span>
                                    </button>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                                </form>
                                <br />

                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-lg-5">
                <div className="card widget-todo">
                    <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                        <h4 className="card-title d-flex">
                            <i className="bx bx-check font-medium-5 pl-25 pr-75"></i>Progress
                        </h4>

                    </div>
                    <div className="card-body px-0 py-1">
                        <table className="table table-borderless">
                            <tr>
                                <td className="col-3">UI Design</td>
                                <td className="col-6">
                                    <div className="progress progress-info">
                                        <div className="progress-bar" role="progressbar" style={{width: "60%"}}
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td className="col-3 text-center">60%</td>
                            </tr>
                            <tr>
                                <td className="col-3">VueJS</td>
                                <td className="col-6">
                                    <div className="progress progress-success">
                                        <div className="progress-bar" role="progressbar" style={{width: "35%"}}
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td className="col-3 text-center">30%</td>
                            </tr>
                            <tr>
                                <td className="col-3">Laravel</td>
                                <td className="col-6">
                                    <div className="progress progress-danger">
                                        <div className="progress-bar" role="progressbar" style={{width: "50%"}}
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td className="col-3 text-center">50%</td>
                            </tr>
                            <tr>
                                <td className="col-3">ReactJS</td>
                                <td className="col-6">
                                    <div className="progress progress-primary">
                                        <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td className="col-3 text-center">80%</td>
                            </tr>
                            <tr>
                                <td className="col-3">Go</td>
                                <td className="col-6">
                                    <div className="progress progress-secondary">
                                        <div className="progress-bar" role="progressbar" style={{width: "65%"}}
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                                <td className="col-3 text-center">65%</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MainLayoutAuth(CheckAttendance)