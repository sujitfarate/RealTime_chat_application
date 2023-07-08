
import io from "socket.io-client"
import {
    Box,
    Typography,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Button,
    List,
    IconButton,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "./chat.css";
  import { datetime } from "../Common_funtions/common_function";
  import SendIcon from "@mui/icons-material/Send";
  
  let socket=io("http://localhost:4000")
const Chatv1 = (props) => {


    const [message, setMessage] = useState(null);
    const[inputMessage,setInputMessage]=useState("")
    const[isTyping,setIsTyping]=useState(false)

socket.on("getData",(msg)=>{
          console.log("msgs",msg)
          setMessage(msg)
        })

    useEffect(()=>{

     
      let msg = JSON.stringify({
        // key:`${props.email}+${props.localvalue}`
        Chat_Id1: `${props.username}_${props.localvalue}`,
        Chat_Id2: `${props.localvalue}_${props.username}`,
      });

        socket.emit("recieveMsg",msg)
      
        // socket.on("getData",(msg)=>{
        //   console.log("msgs",msg)
        //   setMessage(msg)
        // })
        
    },[props.localvalue])

  
socket.on("checkTyping",(msg)=>{
  console.log("checkTyping",msg)
  setIsTyping(msg)
})
    

    const handleMessage=(e)=>{
      // console.log(e.target.value)
     
      if(e.target.value.length>0){
        socket.emit("isTyping", JSON.stringify({
          Chat_Id1: `${props.username}_${props.localvalue}`,
        Chat_Id2: `${props.localvalue}_${props.username}`,
        
          isTyping:true
        }))
        // setIsTyping(true)
      }else{
        socket.emit("isTyping", JSON.stringify({
        
          Chat_Id1: `${props.username}_${props.localvalue}`,
          Chat_Id2: `${props.localvalue}_${props.username}`,
        
          isTyping:false
        }))
        // setIsTyping(false)
      }
      setInputMessage(e.target.value)
    }



  
    const sendMessage = () => {
     
      // let message = document.getElementById("msg").value;
      if (inputMessage.trim() == "") {
        alert("please enter message to send");
      } else {
        let data = JSON.stringify({
          from: props.username,
          to: props.localvalue,
          message: inputMessage,
        });

       socket.emit("storeData",data)
       
  
      //  let msg = JSON.stringify({
      //   // key:`${props.email}+${props.localvalue}`
      //   Chat_Id1: `${props.username}_${props.localvalue}`,
      //   Chat_Id2: `${props.localvalue}_${props.username}`,
      // });

      //   socket.emit("recieveMsg",msg)


        // let config = {
        //   method: "post",
        //   maxBodyLength: Infinity,
        //   url: "http://localhost:4000/Send_msg",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   data: data,
        // };
  
        // axios
        //   .request(config)
        //   .then((response) => {
        //     console.log("sendmessage", response.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
  
     
      setInputMessage("")
    };
  
    
  // console.log(message)
    return (
      <div style={{ width: "-webkit-fill-available" }}>
        <Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // bgcolor: "background.default",
              backgroundColor:"#bcbcd9",
              p: 3,
              overflowY: "scroll",
              height: "90vh",
            }}
          >
            <Toolbar />
            {/* <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography> */}
            <List>
              {message?.map((val) => {
                console.log("message", val.Chat_Id);
                return (
                  <>
                    <ListItem
                      sx={{
                        textAlign:
                          val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? "right"
                            : "left",
                        display: "grid",
                        justifyContent:
                          val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? "end"
                            : "flex-start",
                      }}
                    >
                      <ListItemText
                        primary={
                          val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? `you: ${val.message}`
                            : `${props.localvalue} : ${val.message}`
                        }
                        secondary={datetime(val.datetime)}
                        sx={{
                          backgroundColor: val.Chat_Id == `${props.username}_${props.localvalue}`
                          ?"#3052c4a1":"white",
                          color:val.Chat_Id == `${props.username}_${props.localvalue}`
                          ?"white":"black",
                          border: "1px aqua",
                          borderRadius: "5px",
                          padding: "8px",
                        }}
                      />
                    </ListItem>
                  </>
                );
              })}
            </List>
            {isTyping?"Typing...":null}
          </Box>

          <footer className="message">
            <input
              type="text"
              placeholder="Enter Message..."
              style={{
                width: "95%",
                // height: "5vh",
                padding:"20px",
                // borderRadius: "13px",
                border: "1px solid white" ,
              }}
              onChange={handleMessage}
              // id="msg"
            />
            {/* <Button variant="contained" onClick={sendMessage}>
              Send
            </Button> */}
            <IconButton onClick={sendMessage} sx={{ backgroundColor: "#383c8dd4",margingLeft:"15px" }}>
              <SendIcon sx={{color:"white"}}/>
            </IconButton>
            {/* <SendIcon/> */}
          </footer>
        </Box>
      </div>
    );
}

export default Chatv1