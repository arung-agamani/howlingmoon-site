import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";

const tools = [
    {
        id: "ffmpeg",
        title: "FFmpeg Command Builder",
        description:
            "Build ready-to-use ffmpeg commands with presets, simple configuration, or advanced options.",
        icon: Terminal,
        href: "/toolbox/ffmpeg",
    },
];

function ToolboxIndex() {
    return (
        <div className="min-h-screen bg-gray-900 pt-20 pb-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Toolbox
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        A collection of handy developer tools — built for quick
                        access and daily use.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {tools.map((tool) => (
                        <Link
                            key={tool.id}
                            to={tool.href}
                            className="group border-2 border-gray-800 rounded-lg p-6 bg-gray-900 hover:border-green-500 transition-all"
                        >
                            <tool.icon className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h2 className="text-lg font-semibold text-white mb-2">
                                {tool.title}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const Route = createLazyFileRoute("/toolbox/")({
    component: ToolboxIndex,
});
