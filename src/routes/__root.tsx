import { lazy, Suspense } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => null
        : lazy(() =>
              import("@tanstack/router-devtools").then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          );

export const Route = createRootRoute({
    component: () => (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
                <div className="container mx-auto px-4 flex items-center justify-between h-14">
                    <Link
                        to="/"
                        className="text-white font-semibold text-lg hover:text-green-400 transition-colors"
                    >
                        Howling Moon
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white transition-colors text-sm font-medium [&.active]:text-green-400"
                        >
                            Home
                        </Link>
                        <Link
                            to="/toolbox"
                            className="text-gray-300 hover:text-white transition-colors text-sm font-medium [&.active]:text-green-400"
                        >
                            Toolbox
                        </Link>
                        <Link
                            to="/playground"
                            className="text-gray-300 hover:text-white transition-colors text-sm font-medium [&.active]:text-green-400"
                        >
                            Playground
                        </Link>
                    </div>
                </div>
            </nav>
            <Outlet />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
        </>
    ),
});
