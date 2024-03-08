import { createLazyFileRoute } from "@tanstack/react-router";

const Playground = () => {
    return (
        <>
            <h1>Hey, you found the hidden playground page!</h1>
            <p>I'll be creating some weird stuffs here so stay tuned!</p>
        </>
    );
};

export const Route = createLazyFileRoute("/playground")({
    component: Playground,
});
