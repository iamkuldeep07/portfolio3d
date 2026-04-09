import { Suspense, useState } from "react";
import { myProjects } from "../constants";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import DemoComputer from "../components/DemoComputer";
import CanvasLoader from "../components/Loading.jsx";

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const currentProject = myProjects[selectedProjectIndex];

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section className="c-space my-20" id="work">
      <p className="sm:text-4xl text-3xl font-semibold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent">
        My Work
      </p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-8 w-full">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6 relative sm:p-10 py-10 px-5 rounded-2xl bg-[#0E0E10]/80 backdrop-blur-xl border border-[#1C1C21] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Spotlight Background */}
          <img
            src={currentProject.spotlight}
            alt="spotlight"
            className="absolute top-0 right-0 w-full h-full object-cover opacity-10 pointer-events-none"
          />

          {/* Logo */}
          <div
            className="p-3 backdrop-blur-xl rounded-xl border border-white/10 hover:scale-110 transition duration-300 w-fit"
            style={currentProject.logoStyle}
          >
            <img
              src={currentProject.logo}
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-4 relative z-10">
            <p className="text-white text-2xl font-semibold">
              {currentProject.title}
            </p>

            <p className="text-[#CFCFCF] text-sm leading-relaxed">
              {currentProject.desc}
            </p>

            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              {currentProject.subdesc}
            </p>
          </div>

          {/* Tags + Link */}
          <div className="flex items-center justify-between flex-wrap gap-5 mt-4">
            
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div
                  key={index}
                  className="tech-logo bg-[#1a1a1a] p-2 rounded-md border border-[#2a2a2a]"
                >
                  <img src={tag.path} alt={tag.name} className="w-5 h-5" />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 text-sm text-white hover:text-purple-400 transition"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              Check Live Site ↗
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="arrow-btn hover:scale-110 transition"
              onClick={() => handleNavigation("previous")}
            >
              <img
                src="/assets/left-arrow.png"
                alt="left arrow"
                className="w-4 h-4"
              />
            </button>

            <button
              className="arrow-btn hover:scale-110 transition"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (3D CANVAS) */}
        <div className="border border-[#1C1C21] bg-[#0E0E10] rounded-2xl h-[400px] md:h-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <directionalLight position={[10, 10, 5]} />

            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>

            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;