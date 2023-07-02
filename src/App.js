import Login from "./login/login";
import AppDrawer from "./AppDrawer/Appdrawer";


import Register from "./register/register";
import{BrowserRouter,Route,Routes} from "react-router-dom"
import Chatv1 from "./Chatscreen/Chatv1";

function App() {
  return (
    <div className='app'>
      <BrowserRouter><Routes>
      <Route path="/" element={<Register/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/chat" element={<AppDrawer/>}/>
        <Route path="/chatv1" element={<AppDrawer/>}/>
        
        </Routes></BrowserRouter>
     {/* <AppDrawer/> */}
     {/* <PlusMinus/> */}
     
    
     
    </div>
  );
}

export default App;
