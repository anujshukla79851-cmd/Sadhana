import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Tasksetup from "./pages/TaskSetup";
import Today from "./pages/Today";
import History from "./pages/History";

import { Route, Routes } from "react-router-dom";


function App() {
  
  return (
    <div>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/tasksetup" element={<Tasksetup />} />
        <Route path="/today" element={<Today/>}/>
        <Route path="history" element={<History/>}/>
    </Routes>
  </div>
  );
}
export default App;