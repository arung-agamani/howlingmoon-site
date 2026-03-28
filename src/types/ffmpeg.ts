// ---- Presets ----
export type FFmpegPresetId =
    | "convert-mp4"
    | "extract-audio"
    | "compress-video"
    | "discord-compress"
    | "convert-gif"
    | "trim-video"
    | "change-resolution"
    | "remove-audio"
    | "add-subtitle";

export interface FFmpegPreset {
    id: FFmpegPresetId;
    label: string;
    description: string;
    /** Extra fields the preset may require beyond input/output */
    extraFields?: PresetExtraField[];
}

export interface PresetExtraField {
    name: string;
    label: string;
    type: "text" | "number" | "select";
    placeholder?: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
}

// ---- Simple config ----
export type VideoFormat = "mp4" | "mkv" | "webm" | "avi" | "mov" | "gif";
export type VideoCodec = "libx264" | "libx265" | "libvpx-vp9" | "copy";
export type AudioCodec = "aac" | "libmp3lame" | "libopus" | "copy" | "none";
export type ResolutionPreset =
    | "original"
    | "2160p"
    | "1080p"
    | "720p"
    | "480p";
export type FpsPreset = "original" | "60" | "30" | "24";

export interface FFmpegSimpleConfig {
    inputFile: string;
    outputFile: string;
    format: VideoFormat;
    videoCodec: VideoCodec;
    resolution: ResolutionPreset;
    fps: FpsPreset;
    crf: number; // 0-51
    audioCodec: AudioCodec;
    audioBitrate: string; // e.g. "128k"
}

// ---- Advanced config ----
export interface FFmpegAdvancedConfig extends FFmpegSimpleConfig {
    // Trim
    startTime: string; // HH:MM:SS or seconds
    endTime: string;
    // Bitrate control
    videoBitrate: string; // e.g. "5M"
    maxBitrate: string;
    bufferSize: string;
    twoPass: boolean;
    // Scaling
    customWidth: string;
    customHeight: string;
    keepAspectRatio: boolean;
    // Frame options
    keyframeInterval: string;
    bFrames: string;
    // Audio
    audioSampleRate: string;
    audioChannels: string;
    // Container
    faststart: boolean;
    stripMetadata: boolean;
    // Extra
    extraFlags: string;
}

// ---- Union type for the builder ----
export type FFmpegBuilderMode = "preset" | "simple" | "advanced";

export interface FFmpegPresetInput {
    mode: "preset";
    presetId: FFmpegPresetId;
    inputFile: string;
    outputFile: string;
    extras: Record<string, string>;
}

export type FFmpegConfig =
    | FFmpegPresetInput
    | ({ mode: "simple" } & FFmpegSimpleConfig)
    | ({ mode: "advanced" } & FFmpegAdvancedConfig);
