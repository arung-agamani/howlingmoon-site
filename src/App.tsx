import Particles from "react-tsparticles"

import About from "./components/pages/About"
import Contacts from "./components/pages/Contacts"
import Experiences from "./components/pages/Experiences"
import Projects from "./components/pages/Projects"

function App() {
  const particlesInit = async (main: any) => {
    console.log(main)
  }

  const particlesLoaded = async (container: any) => {
    console.log(container)
  }
  
  return (
    <div className="text-gray-400 bg-gray-900 bg-opacity-5 pb-32">
      <Particles className="absolute -z-10"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#00000000'
            }
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#368394"
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            shape: {
              type: "circle"
            },
            size: {
              random: false,
              value: 5
            },
            move: {
              direction: "none",
              enable: true,
              random: true,
              speed: 6,
              straight: true
            },
            number: {
              value: 20
            }
          }
        }}
      />
      <About />
      <Projects />
      <Experiences />
      <Contacts />
    </div>
  )
}

export default App
