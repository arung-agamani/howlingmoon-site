import { useState, useMemo } from "react";
import { buildFFmpegCommand, DEFAULT_SIMPLE_CONFIG } from "../../../lib/ffmpeg";
import type { FFmpegSimpleConfig } from "../../../types/ffmpeg";
import { Label, Input, Select, Slider, Fieldset, CommandOutput } from "./ui";

export function SimpleTab() {
    const [config, setConfig] = useState<FFmpegSimpleConfig>({
        ...DEFAULT_SIMPLE_CONFIG,
    });

    const update = <K extends keyof FFmpegSimpleConfig>(
        key: K,
        value: FFmpegSimpleConfig[K]
    ) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const command = useMemo(
        () => buildFFmpegCommand({ mode: "simple", ...config }),
        [config]
    );

    return (
        <div className="space-y-5">
            {/* Files */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label>Input file</Label>
                    <Input
                        value={config.inputFile}
                        onChange={(e) => update("inputFile", e.target.value)}
                    />
                </div>
                <div>
                    <Label>Output file</Label>
                    <Input
                        value={config.outputFile}
                        onChange={(e) => update("outputFile", e.target.value)}
                    />
                </div>
            </div>

            {/* Video */}
            <Fieldset legend="Video">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Label>Format</Label>
                        <Select
                            value={config.format}
                            onChange={(e) =>
                                update(
                                    "format",
                                    e.target.value as FFmpegSimpleConfig["format"]
                                )
                            }
                        >
                            <option value="mp4">MP4</option>
                            <option value="mkv">MKV</option>
                            <option value="webm">WebM</option>
                            <option value="avi">AVI</option>
                            <option value="mov">MOV</option>
                            <option value="gif">GIF</option>
                        </Select>
                    </div>
                    <div>
                        <Label>Codec</Label>
                        <Select
                            value={config.videoCodec}
                            onChange={(e) =>
                                update(
                                    "videoCodec",
                                    e.target
                                        .value as FFmpegSimpleConfig["videoCodec"]
                                )
                            }
                        >
                            <option value="libx264">H.264</option>
                            <option value="libx265">H.265 (HEVC)</option>
                            <option value="libvpx-vp9">VP9</option>
                            <option value="copy">Copy (no re-encode)</option>
                        </Select>
                    </div>
                    <div>
                        <Label>Resolution</Label>
                        <Select
                            value={config.resolution}
                            onChange={(e) =>
                                update(
                                    "resolution",
                                    e.target
                                        .value as FFmpegSimpleConfig["resolution"]
                                )
                            }
                        >
                            <option value="original">Original</option>
                            <option value="2160p">2160p (4K)</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                        </Select>
                    </div>
                    <div>
                        <Label>FPS</Label>
                        <Select
                            value={config.fps}
                            onChange={(e) =>
                                update(
                                    "fps",
                                    e.target.value as FFmpegSimpleConfig["fps"]
                                )
                            }
                        >
                            <option value="original">Original</option>
                            <option value="60">60 fps</option>
                            <option value="30">30 fps</option>
                            <option value="24">24 fps</option>
                        </Select>
                    </div>
                </div>
                <Slider
                    label="CRF (Quality)"
                    value={config.crf}
                    min={0}
                    max={51}
                    onChange={(v) => update("crf", v)}
                />
                <p className="text-xs text-gray-500">
                    Lower = better quality / larger file. 18–23 is a good range
                    for H.264.
                </p>
            </Fieldset>

            {/* Audio */}
            <Fieldset legend="Audio">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Codec</Label>
                        <Select
                            value={config.audioCodec}
                            onChange={(e) =>
                                update(
                                    "audioCodec",
                                    e.target
                                        .value as FFmpegSimpleConfig["audioCodec"]
                                )
                            }
                        >
                            <option value="aac">AAC</option>
                            <option value="libmp3lame">MP3</option>
                            <option value="libopus">Opus</option>
                            <option value="copy">Copy</option>
                            <option value="none">No audio</option>
                        </Select>
                    </div>
                    <div>
                        <Label>Bitrate</Label>
                        <Select
                            value={config.audioBitrate}
                            onChange={(e) =>
                                update("audioBitrate", e.target.value)
                            }
                        >
                            <option value="64k">64 kbps</option>
                            <option value="96k">96 kbps</option>
                            <option value="128k">128 kbps</option>
                            <option value="192k">192 kbps</option>
                            <option value="256k">256 kbps</option>
                            <option value="320k">320 kbps</option>
                        </Select>
                    </div>
                </div>
            </Fieldset>

            <CommandOutput command={command} />
        </div>
    );
}
