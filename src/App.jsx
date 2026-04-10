import MouseFollower from "mouse-follower";
import { useEffect } from "react";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

MouseFollower.registerGSAP(gsap);

const App = () => {
  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 0.4,
      skewing: 2,
    });

    return () => cursor.destroy();
  }, []);
  return (
    <div className="w-full h-full bg-[#0d0d14] text-white">
      <Header/>
      <Routes>
        <Route path="/newspiderlync/" element={<Home/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
