import api from "../utils/api";
import { useState } from "react";
function Register() {
    const [getEmail,setEmail]=useState("Admin@gmail.com")
    const [getUsername,setUsername]=useState("Admin")
    const [getPassword,setPassword]=useState("123456789")
     const [getConfirmPassword,setConfirmPassword]=useState("123456789")
   
     Handle_registration = async (event)=>{
        event.preventDefault();

        const register = await api.post("/user",{
            email:getEmail,
            username:getUsername,
            password:getPassword
        })
        
        if (register.status ==201) {

            console.log(register.data);


        } else {

            console.log("Registration Fail: " + register.data);


        }
     }
    return(
        <>

<form onSubmit={Handle_registration} method="post">
    <input type="email" name="email" id="email" placeholder="Type Email Here" onChange={(e)=>{setEmail(e.target.value)}} value={getEmail} />
    <input type="text" name="username" id="username" placeholder="Type Username Here" onChange={(e)=>{setUsername(e.target.value)}} value={getUsername} />
    <input type="password" name="password" id="password" placeholder="Type Password Here" onChange={(e)=>{setPassword(e.target.value)}} value={getPassword} />
    <input type="password" name="password" id="password" placeholder="Type Password Here" onChange={(e)=>{setPassword(e.target.value)}} value={getPassword} />
    <input type="password" name="confirmpassword" id="conirmpassword" placeholder="Type ConfirmPassword Here" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={getConfirmPassword} />
    <input type="submit" value="Register" />
</form>
        </>
    )
    
}
export default Register;