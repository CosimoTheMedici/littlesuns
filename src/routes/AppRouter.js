import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Unauthorised from '../components/errors/errorPages/Unauthorised'
// import Four0Four from '../components/errors/errorPages/404'
import Login from '../pages/auth/Login'
import RequireAuth from '../pages/auth/RequireAuth'
import PersistLogin from '../pages/auth/PersistLogin'
import ViewParents from '../pages/views/ViewParents'
import ViewPayments from '../pages/views/ViewPayments'
import ViewStudents from '../pages/views/ViewStudents'
import Home from '../pages/views/Home'
import CheckAttendance from '../pages/views/CheckAttendance'
import ViewAttendies from '../pages/views/ViewAttendies'
import FullStudentDetails from '../pages/views/FullStudentDetails'
import Questionare from '../pages/views/Questionare'
import TakeQuestionnare from '../pages/views/TakeQuestionnare'


const AppRouter = () => {
  return (
     <Routes>
        {/* public routes  */}
        <Route path='/' element={<Login />} />
        {/* <Route path='/unauthorised' element={<Unauthorised />} />
        <Route path='/404' element={<Four0Four />} /> */}
        <Route path='/home' element={<Home />} />
        
        {/* protected */}
        
        <Route element={<PersistLogin />}>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[2001]}/>}>
        
        <Route path='/view/students' element={<ViewStudents />} />
        <Route path='/view/parents' element={<ViewParents />} />
        <Route path='/view/payments' element={<ViewPayments />} />
        <Route path='/view/attendance' element={<ViewAttendies />} />
        <Route path='/check/attendance' element={<CheckAttendance />} />
        <Route path='/student/details' element={<FullStudentDetails />} />
        <Route path='/view/questionare' element={<Questionare />} />
        <Route path='/take/Questionare' element={<TakeQuestionnare />} />

        </Route>
        
        {/* protected agents */}
        <Route element={<RequireAuth allowedRoles={[3000]}/>}>
        

        </Route>

        <Route element={<RequireAuth allowedRoles={[4000]}/>}>
      

        </Route>

        <Route element={<RequireAuth allowedRoles={[4000,3000]}/>}>
        </Route>

        </Route>

        {/*  */}
        {/* <Route path='*' element={<Missing />} /> */}
     </Routes>
  )
}

export default AppRouter