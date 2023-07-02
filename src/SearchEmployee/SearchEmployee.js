import {  Drawer, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import React from 'react'

const SearchEmployee = (props) => {
    const handleClose=()=>{
        props.setOpen(false)
        props.setName("")
    }

    const searchName=(e)=>{
        props.setName(e.target.value)
    }
    const getempFromsearch=(name)=>{
        props.setLocalvalue(name)
        props.setOpen(false)
// console.log(name)
    }
    console.log("filterEmployee",props.filterEmployee);
  return (
    <div>
        <Drawer open={props.open} onClose={handleClose}>

        <TextField type='search' placeholder='Search' size='small' 
        value={props.name} onChange={searchName} 
        />
        <List>{

            props.filterEmployee?props.filterEmployee.map(item=>{
                return(<>
                    <ListItem><ListItemButton onClick={()=>getempFromsearch(item.name)}>
                <ListItemText primary={item.name}/>
                </ListItemButton>
            </ListItem>
</>)
            }):null
            }
           
        </List>
        </Drawer>
    </div>
  )
}

export default SearchEmployee