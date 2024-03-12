import { createLazyFileRoute } from "@tanstack/react-router";

function ProjectsPage() {
    return <div>Projects will be here</div>;
}

export const Route = createLazyFileRoute("/projects")({
    component: ProjectsPage,
});
