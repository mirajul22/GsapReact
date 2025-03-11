import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState } from "react";
import Navbar from "../Navbar";

const App = () => {
  const [circle, setCircle] = useState(0);

  const roll = gsap.utils.random(-500, 500, 50);

  console.log(roll);

  useGSAP(() => {
    gsap.to(".circle", {
      x: circle,
      duration: 1,
    });
  }, [circle]);

  return (
    <>
      <main>
        <div className='flex flex-col items-center justify-center gap-8 pt-16'>

        <button
              onClick={() => {setCircle(roll)}}
              className='px-4 py-2 bg-black text-white rounded-lg'>
              Animate
            </button>

          <div className='circle h-[300px] w-[300px] bg-red-200 rounded-full'>
          </div>
        </div>
        {/* <Navbar/> */}
      </main>
    </>
  );
};

export default App;
