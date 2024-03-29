import { lazy, Suspense } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "components/ui/navigation-menu";

const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => null
        : lazy(() =>
              import("@tanstack/router-devtools").then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          );

// TODO: work on this. Also navigation menu is set to hidden using class, so just a note here.
export const Route = createRootRoute({
    component: () => (
        <>
            <NavigationMenu className="fixed top-0 left-0 container max-w-screen-2xl w-screen text-white z-50 hidden">
                <NavigationMenuList className="w-full justify-around">
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/projects">Projects</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to="/playground">Playground</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Outlet />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
        </>
    ),
});
