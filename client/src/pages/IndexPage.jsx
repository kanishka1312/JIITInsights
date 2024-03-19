import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../Component/Chat";
import Carousel from "../Carousel";
import Footer from "../Footer";
import video from '/video1.mp4';
import { TypeAnimation } from 'react-type-animation';
import ParticlesBackground from "../Component/ParticlesBackground";

export default function IndexPage() {
  const [hosted, setHosted] = useState([]);
  useEffect(() => {
    axios.get('/user-hosted').then(response => {
      // console.log(response.data);
      setHosted(response.data);
    });
  }, []);
  return (
    <div className="p-0 m-0">
      <div className="relative">
        <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">
   
         <div className="text-white text-4xl font-bold mb-4">
  <TypeAnimation
    sequence={['Welcome to ']}
    wrapper="span"
    speed={20}

  />
  <TypeAnimation
    sequence={['JIIT Insights...']}
    wrapper="span"
    speed={50}
    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
  
  />
</div>

<div className="text-white text-4xl font-bold mb-4">
  <TypeAnimation
    sequence={['Never']}
    wrapper="span"
    speed={20}
    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
   
  />
  <TypeAnimation
    sequence={[' miss an event']}
    wrapper="span"
    speed={50}
 
  />
</div>

<div className="text-white text-4xl font-bold mb-4">
  <TypeAnimation
    sequence={['Get to know everything about ']}
    wrapper="span"
    speed={20}
  
  />
  <TypeAnimation
    sequence={['college']}
    wrapper="span"
    speed={50}
    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
   
  />
</div>

 





          </div>
        </div>
      </div>

      <div>
        <Carousel />
      </div>
      <div>
      <section id="features" className="p-0 bg-gradient-to-b from-black to-black">
          <div className="flex flex-wrap justify-center">
            <div className="feature-box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 text-center">
            <i class="fas fa-tag fa-beat-fade fa-2x" style={{ color: '#b3009b' }}></i>

              <h3 className="font-bold text-xl mt-2 text-white">Society Swag Central</h3>
              <p className="text-gray-500">Get Your Exclusive Society Merchandise Here! Customized gear, trendy designs, and member discounts.</p>
            </div>
            <div className="feature-box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 text-center">
            <i className="fas fa-bullseye fa-beat-fade fa-2x" style={{ color: '#b3009b' }}></i>


              <h3 className="font-bold text-xl mt-2 text-white">Never Miss an Epic Moment</h3>
              <p className="text-gray-500">Event Reminders Just When You Need Them! Personalized notifications, countdowns, and RSVP options.</p>
            </div>
            <div className="feature-box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 text-center">
            <i className="fas fa-brain fa-beat-fade fa-2x" style={{ color: '#b3009b' }}></i>
              <h3 className="font-bold text-xl mt-2 text-white">All-Inclusive Campus Hub</h3>
              <p className="text-gray-500">Your One-Stop Access to Everything! From society news to mess schedules to past achievements, it's all here.</p>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  )
}