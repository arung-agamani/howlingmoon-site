import { useState, useMemo } from "react";
import {
    buildFFmpegCommand,
    DEFAULT_ADVANCED_CONFIG,
} from "../../../lib/ffmpeg";
import type { FFmpegAdvancedConfig } from "../../../types/ffmpeg";
import {
    Label,
    Input,
    Select,
    Slider,
    Toggle,
    Fieldset,
    CommandOutput,
} from "./ui";

export function AdvancedTab() {
    const [config, setConfig] = useState<FFmpegAdvancedConfig>({
        ...DEFAULT_ADVANCED_CONFIG,
    });

    const update = <K extends keyof FFmpegAdvancedConfig>(
        key: K,
        value: FFmpegAdvancedConfig[K]
    ) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const command = useMemo(
        () => buildFFmpegCommand({ mode: "advanced", ...config }),
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

            {/* Trim */}
            <Fieldset legend="Trim">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Start time</Label>
                        <Input
                            value={config.startTime}
                            onChange={(e) =>
                                update("startTime", e.target.value)
                            }
                            placeholder="00:00:00"
                        />
                    </div>
                    <div>
                        <Label>End time</Label>
                        <Input
                            value={config.endTime}
                            onChange={(e) => update("endTime", e.target.value)}
                            placeholder="00:01:00"
                        />
                    </div>
                </div>
            </Fieldset>

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
                                    e.target
                                        .value as FFmpegAdvancedConfig["format"]
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
                                        .value as FFmpegAdvancedConfig["videoCodec"]
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
                                        .value as FFmpegAdvancedConfig["resolution"]
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
                                    e.target
                                        .value as FFmpegAdvancedConfig["fps"]
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
            </Fieldset>

            {/* Bitrate control */}
            <Fieldset legend="Bitrate Control">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label>Video bitrate</Label>
                        <Input
                            value={config.videoBitrate}
                            onChange={(e) =>
                                update("videoBitrate", e.target.value)
                            }
                            placeholder="e.g. 5M"
                        />
                    </div>
                    <div>
                        <Label>Max bitrate</Label>
                        <Input
                            value={config.maxBitrate}
                            onChange={(e) =>
                                update("maxBitrate", e.target.value)
                            }
                            placeholder="e.g. 8M"
                        />
                    </div>
                    <div>
                        <Label>Buffer size</Label>
                        <Input
                            value={config.bufferSize}
                            onChange={(e) =>
                                update("bufferSize", e.target.value)
                            }
                            placeholder="e.g. 10M"
                        />
                    </div>
                </div>
                <Toggle
                    label="Two-pass encoding"
                    checked={config.twoPass}
                    onChange={(v) => update("twoPass", v)}
                />
            </Fieldset>

            {/* Custom scaling */}
            <Fieldset legend="Custom Scaling">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Width</Label>
                        <Input
                            value={config.customWidth}
                            onChange={(e) =>
                                update("customWidth", e.target.value)
                            }
                            placeholder="1920"
                        />
                    </div>
                    <div>
                        <Label>Height</Label>
                        <Input
                            value={config.customHeight}
                            onChange={(e) =>
                                update("customHeight", e.target.value)
                            }
                            placeholder="1080"
                        />
                    </div>
                </div>
                <Toggle
                    label="Keep aspect ratio (height auto-calculated)"
                    checked={config.keepAspectRatio}
                    onChange={(v) => update("keepAspectRatio", v)}
                />
            </Fieldset>

            {/* Frame options */}
            <Fieldset legend="Frame Options">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label>Keyframe interval (-g)</Label>
                        <Input
                            value={config.keyframeInterval}
                            onChange={(e) =>
                                update("keyframeInterval", e.target.value)
                            }
                            placeholder="e.g. 48"
                        />
                    </div>
                    <div>
                        <Label>B-frames (-bf)</Label>
                        <Input
                            value={config.bFrames}
                            onChange={(e) => update("bFrames", e.target.value)}
                            placeholder="e.g. 3"
                        />
                    </div>
                </div>
            </Fieldset>

            {/* Audio */}
            <Fieldset legend="Audio">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Label>Codec</Label>
                        <Select
                            value={config.audioCodec}
                            onChange={(e) =>
                                update(
                                    "audioCodec",
                                    e.target
                                        .value as FFmpegAdvancedConfig["audioCodec"]
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
                    <div>
                        <Label>Sample rate</Label>
                        <Select
                            value={config.audioSampleRate}
                            onChange={(e) =>
                                update("audioSampleRate", e.target.value)
                            }
                        >
                            <option value="">Default</option>
                            <option value="44100">44100 Hz</option>
                            <option value="48000">48000 Hz</option>
                            <option value="96000">96000 Hz</option>
                        </Select>
                    </div>
                    <div>
                        <Label>Channels</Label>
                        <Select
                            value={config.audioChannels}
                            onChange={(e) =>
                                update("audioChannels", e.target.value)
                            }
                        >
                            <option value="">Default</option>
                            <option value="1">Mono</option>
                            <option value="2">Stereo</option>
                            <option value="6">5.1 Surround</option>
                        </Select>
                    </div>
                </div>
            </Fieldset>

            {/* Container options */}
            <Fieldset legend="Container Options" className="space-y-3">
                <Toggle
                    label="Fast start (moov atom at beginning — good for streaming)"
                    checked={config.faststart}
                    onChange={(v) => update("faststart", v)}
                />
                <Toggle
                    label="Strip metadata"
                    checked={config.stripMetadata}
                    onChange={(v) => update("stripMetadata", v)}
                />
            </Fieldset>

            {/* Extra flags */}
            <div>
                <Label>Extra flags (appended to command)</Label>
                <Input
                    value={config.extraFlags}
                    onChange={(e) => update("extraFlags", e.target.value)}
                    placeholder="-preset veryslow -tune film"
                />
            </div>

            <CommandOutput command={command} />
        </div>
    );
}
