import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate=useNavigate();
    return (
        <div className="home">
            <h1>Sadhna</h1>
            
            <p> Track your daily tasks, stay consistent, and earn marks
                based on your performance.</p>

                <button  className="setup-btn" onClick={()=>navigate("/tasksetup")}>Set Up Tasks</button>
        </div>
    );
}
export default Home;