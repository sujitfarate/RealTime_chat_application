import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Autocomplete, Button, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useEffect } from 'react';
import { useState } from 'react';
import BasicPopover from '../SearchEmployee/SearchEmployee';
import Chat from '../Chatscreen/chat';
import { useLocation } from 'react-router-dom';
import axios from "axios"
import Chatscreen from '../SearchEmployee/SearchEmployee';
import SearchEmployee from '../SearchEmployee/SearchEmployee';
import Chatv1 from '../Chatscreen/Chatv1';
// import SearchEmployee from '../SearchEmployee/SearchEmployee';



const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const location=useLocation()
  console.log("location",location)
  const username=location.state.name;
  const email=location.state.email;
  const password=location.state.password;
const[localvalue,setLocalvalue]=useState("")
const[message,setMessage]=useState("")
const[emp,setEmp]=useState([])
const[name,setName]=useState("")
const[filterEmployee,setFilterEmployee]=useState([])
const [open, setOpen] = React.useState(false);
// const[lastmsg,setLastmsg]=useState("")


useEffect(()=>{
  
  let data = {
    
    email: email,
    password: password
  }
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:4000/fetchFilteremoloyee',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
      console.log(response)
    console.log(response.data);
  
      setEmp(response.data)
    })
  .catch((error) => {
    console.log(error);
  });
},[])




const getEmpId=(id,name)=>{
  console.log("click on id ",id);
  // localStorage.setItem("userid",name)
  // setLocalvalue(localStorage.getItem("userid"))
  setLocalvalue(name)
  // console.log("click on id ",id);
  // console.log(localStorage.getItem("userid"));

}

const sendMessage=(e)=>{
 setMessage( document.getElementById("message").value)
//  setMessage(msg)
console.log(message)

}


const searchName=(e)=>{
  setName(e.target.value)
 
 

}

const handleClick=()=>{
setOpen(true)
}

useEffect(()=>{
  const FormData = require('form-data');
  let data = new FormData();
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:4000/search/'+name,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    setFilterEmployee(response.data)
    console.log(JSON.stringify(response.data));
  }) 
  .catch((error) => {
    console.log(error);
  });
},[name])


// useEffect(()=>{
  
//   let data = JSON.stringify({
//     "Chat_Id1": "sujit_sakshi",
//     "Chat_Id2": "sakshi_sujit"
//   });
  
//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'http://localhost:4000/get_last_msg',
//     headers: { 
//       'Content-Type': 'application/json'
//     },
//     data : data
//   };
  
//   axios.request(config)
//   .then((response) => {
//     setLastmsg(response.data)
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
  

// },[lastmsg])


// console.log("filterEmployee",filterEmployee)
  return (
    <Box sx={{ display: 'flex',backgroundColor:"" }}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,backgroundColor:"#524ea8" }}
      >
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
        {/* <AccountCircleIcon  /> */}
          <Typography variant="h6" noWrap component="div">
           {localvalue}
          </Typography>
          <Typography sx={{marginLeft:"70%"}}>{"Welcome :) "+username}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          backgroundColor:"#383c8dd4",
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
           
          },
         
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar  sx={{backgroundColor:"",}}>
      <Button onClick={handleClick} variant='outlined' sx={{width:"15vw"}}>Find user</Button>
          {/* <TextField type='search' placeholder='Search' size='small' value={name} onChange={searchName} /> */}
          {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={filterEmployee}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    /> */}
      
      
        </Toolbar>
        <Divider />
        <List>
          {emp?.map((text, index) => (
            <>
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>getEmpId(text._id,text.name)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <AccountCircleIcon  /> : <AccountCircleIcon  />}
                </ListItemIcon>
                <ListItemText  primary={text.name} 
                // secondary={text.name=="sujit"&&lastmsg.message} 
                />
              </ListItemButton>
            </ListItem> <Divider />
            </>
          ))}
        </List>
        
       
      </Drawer>
    
    {/* <Chat email={email} localvalue={localvalue} username={username}/> */}
    <Chatv1 email={email} localvalue={localvalue} username={username}/>
       <SearchEmployee open={open} setOpen={setOpen} filterEmployee={filterEmployee} setName={setName}  name={name} setLocalvalue={setLocalvalue}/>
      </Box>
      
    
  );
}
