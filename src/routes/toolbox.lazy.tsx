import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

function ToolboxLayout() {
    return <Outlet />;
}

export const Route = createLazyFileRoute("/toolbox")({
    component: ToolboxLayout,
});
