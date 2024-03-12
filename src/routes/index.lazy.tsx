import { createLazyFileRoute } from "@tanstack/react-router";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container } from "@tsparticles/engine";

import QuoteHero from "../components/pages/QuoteHero";
import Contacts from "../components/pages/Contacts";
import Experiences from "../components/pages/Experiences";
import Projects from "../components/pages/Projects";
import Hero from "../components/pages/Hero";
// import Certificates from "../components/pages/Certifications";
import Certificates from "components/pages/Certifications";

function Index() {
    const [init, setInit] = useState(false);

    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await console.log(container);
        },
        []
    );

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <div className="text-gray-400 bg-gray-900 bg-opacity-5 pb-32">
            <Particles
                className="absolute -z-10"
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#00000000",
                        },
                    },
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: "#368394",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            random: true,
                            speed: 10,
                            straight: true,
                        },
                        number: {
                            value: 20,
                        },
                    },
                }}
            />
            <Hero />
            <Projects />
            <Experiences />
            <Certificates />
            <QuoteHero />
            <Contacts />
        </div>
    );
}

export const Route = createLazyFileRoute("/")({
    component: Index,
});
