import React, { use, useEffect } from 'react'
import Login from './component/Auth/login'
import EmployeeDashboard from './component/Dashboard/EmployeeDashboard'
import AdminDashboard from './component/Dashboard/AdminDashboard'
import { getLocalStorage, SetLocalStorage } from './utils/localstorage'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from './context/AuthProvider'
import AllTask from './others/AllTask'
import EmployeesDetails from './component/Employee/EmployeesDetails'

const App = () => {
  const [user,setUser]=useState(null);
  const [LoggedInUser,setLoggedInUser]=useState(null);
  const [details,setDetails]=useState(null);
  const [Profile,setProfile]=useState(null);
  const [ProfileDetail,setProfileDetail]=useState();


  const AuthData=useContext(AuthContext);

  useEffect(() => {
    const LoggedInUser=localStorage.getItem("LoginUser");
    if(LoggedInUser){
      const userdata=JSON.parse(LoggedInUser);
      setUser(userdata.role);
      setLoggedInUser(userdata.data);
    }
  },[])




  function LoginHandler(email,password){
    if(AuthData && AuthData.userdata.admin.find((a)=>{
      return email==a.email && password==a.password
    })){
      setUser("admin");
      localStorage.setItem("LoginUser", JSON.stringify({ role: "admin",data:AuthData.userdata.admin }));
      setLoggedInUser(AuthData.userdata.admin);
    }
    else if (AuthData && AuthData.userdata.employees.find((e)=>{
     return email==e.email && password==e.password
    })){
      setUser("employee");
      let employee=AuthData.userdata.employees.find((e)=>{
         if(email==e.email && password==e.password){
          return e;
         }
       });
      localStorage.setItem("LoginUser", JSON.stringify({ role: "employee" ,data:employee }));
      setLoggedInUser(employee);
    }
    else{
      alert("Invalid credentials");
    }
  }
     
useEffect(() => {
   SetLocalStorage();
   getLocalStorage();
}, []);
LocalStrorage.setItem("vaibhav","hxvee");

  return (
    <>  
    {!user ? <Login LoginHandler={LoginHandler}/> : ''}
    {user==("admin") && details==null ? <AdminDashboard data={{LoggedInUser,setDetails,setUser}}/> : ''}
    {user=="employee" ? <EmployeeDashboard data={{LoggedInUser,setUser}}/> : null}
    {details=="alltasks" && Profile==null ? <AllTask setProfile={{setProfile,setProfileDetail}}/> : ''}
    {Profile != null ? <EmployeesDetails data={{ProfileDetail,setDetails,setProfile}}/> : ''} 
    </>
  )
}

export default App
