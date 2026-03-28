import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { TabButton } from "components/toolbox/ffmpeg/ui";
import { PresetTab } from "components/toolbox/ffmpeg/PresetTab";
import { SimpleTab } from "components/toolbox/ffmpeg/SimpleTab";
import { AdvancedTab } from "components/toolbox/ffmpeg/AdvancedTab";
import type { FFmpegBuilderMode } from "../../types/ffmpeg";

function FFmpegBuilder() {
    const [mode, setMode] = useState<FFmpegBuilderMode>("preset");

    return (
        <div className="min-h-screen bg-gray-900 pt-20 pb-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link
                    to="/toolbox"
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Toolbox
                </Link>

                <h1 className="text-3xl font-bold text-white mb-2">
                    FFmpeg Command Builder
                </h1>
                <p className="text-gray-400 mb-6">
                    Build a ready-to-use ffmpeg command. Pick a preset for
                    quick tasks, or configure every option manually.
                </p>

                <div className="flex gap-1 border-b border-gray-700 mb-6">
                    <TabButton
                        active={mode === "preset"}
                        onClick={() => setMode("preset")}
                    >
                        Presets
                    </TabButton>
                    <TabButton
                        active={mode === "simple"}
                        onClick={() => setMode("simple")}
                    >
                        Simple
                    </TabButton>
                    <TabButton
                        active={mode === "advanced"}
                        onClick={() => setMode("advanced")}
                    >
                        Advanced
                    </TabButton>
                </div>

                {mode === "preset" && <PresetTab />}
                {mode === "simple" && <SimpleTab />}
                {mode === "advanced" && <AdvancedTab />}
            </div>
        </div>
    );
}

export const Route = createLazyFileRoute("/toolbox/ffmpeg")({
    component: FFmpegBuilder,
});
