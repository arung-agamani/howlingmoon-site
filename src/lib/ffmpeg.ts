import type {
    FFmpegConfig,
    FFmpegPreset,
    FFmpegSimpleConfig,
    FFmpegAdvancedConfig,
    FFmpegPresetId,
} from "../types/ffmpeg";

// ---- Preset definitions ----
export const PRESETS: FFmpegPreset[] = [
    {
        id: "convert-mp4",
        label: "Convert to MP4",
        description:
            "Re-encode any video file to MP4 (H.264 + AAC). Widely compatible.",
    },
    {
        id: "extract-audio",
        label: "Extract Audio",
        description: "Pull the audio track out of a video file as MP3.",
    },
    {
        id: "compress-video",
        label: "Compress Video",
        description:
            "Reduce file size with H.264 CRF 28. Good balance of quality vs size.",
    },
    {
        id: "discord-compress",
        label: "Discord Under 50 MB",
        description:
            "Compress video to fit under Discord's 50 MB upload limit using 2-pass target bitrate encoding.",
        extraFields: [
            {
                name: "duration",
                label: "Video duration (seconds)",
                type: "number" as const,
                placeholder: "e.g. 120",
                defaultValue: "120",
            },
            {
                name: "resolution",
                label: "Resolution",
                type: "select" as const,
                options: [
                    { label: "Original (no scaling)", value: "original" },
                    { label: "1080p", value: "1920:1080" },
                    { label: "720p", value: "1280:720" },
                    { label: "480p", value: "854:480" },
                ],
                defaultValue: "1280:720",
            },
        ],
    },
    {
        id: "convert-gif",
        label: "Convert to GIF",
        description: "Turn a video clip into an animated GIF (320 px wide).",
    },
    {
        id: "trim-video",
        label: "Trim / Cut Video",
        description: "Cut a segment from a video without re-encoding.",
        extraFields: [
            {
                name: "startTime",
                label: "Start time",
                type: "text",
                placeholder: "00:00:05",
                defaultValue: "00:00:00",
            },
            {
                name: "endTime",
                label: "End time",
                type: "text",
                placeholder: "00:01:00",
                defaultValue: "00:01:00",
            },
        ],
    },
    {
        id: "change-resolution",
        label: "Change Resolution",
        description: "Scale a video to a different resolution.",
        extraFields: [
            {
                name: "resolution",
                label: "Target resolution",
                type: "select",
                options: [
                    { label: "1080p", value: "1920:1080" },
                    { label: "720p", value: "1280:720" },
                    { label: "480p", value: "854:480" },
                ],
                defaultValue: "1280:720",
            },
        ],
    },
    {
        id: "remove-audio",
        label: "Remove Audio",
        description: "Strip the audio track, keep video only.",
    },
    {
        id: "add-subtitle",
        label: "Burn Subtitles",
        description: "Burn an SRT subtitle file into the video.",
        extraFields: [
            {
                name: "subtitleFile",
                label: "Subtitle file (.srt)",
                type: "text",
                placeholder: "subtitles.srt",
                defaultValue: "subtitles.srt",
            },
        ],
    },
];

// ---- Resolution map ----
const RESOLUTION_SCALE: Record<string, string> = {
    "2160p": "3840:2160",
    "1080p": "1920:1080",
    "720p": "1280:720",
    "480p": "854:480",
};

// ---- Helpers ----
function q(file: string): string {
    if (!file) return '""';
    // Wrap in quotes if the filename contains spaces
    if (file.includes(" ") || file.includes("'")) return `"${file}"`;
    return file;
}

// ---- Build from preset ----
function buildPresetCommand(
    presetId: FFmpegPresetId,
    input: string,
    output: string,
    extras: Record<string, string>
): string {
    const i = q(input);
    const o = q(output);

    switch (presetId) {
        case "convert-mp4":
            return `ffmpeg -i ${i} -c:v libx264 -c:a aac ${o}`;
        case "extract-audio":
            return `ffmpeg -i ${i} -vn -c:a libmp3lame -q:a 2 ${o}`;
        case "compress-video":
            return `ffmpeg -i ${i} -c:v libx264 -crf 28 -preset medium -c:a aac ${o}`;
        case "convert-gif":
            return `ffmpeg -i ${i} -vf "fps=15,scale=320:-1:flags=lanczos" ${o}`;
        case "trim-video": {
            const ss = extras.startTime || "00:00:00";
            const to = extras.endTime || "00:01:00";
            return `ffmpeg -ss ${ss} -to ${to} -i ${i} -c copy ${o}`;
        }
        case "change-resolution": {
            const res = extras.resolution || "1280:720";
            return `ffmpeg -i ${i} -vf scale=${res} -c:a copy ${o}`;
        }
        case "discord-compress": {
            const durationSec = parseFloat(extras.duration || "120");
            // Target 49 MB to be safely under the 50 MB limit
            const targetMB = 49;
            const audioBitrateK = 128;
            const videoBitrateK = Math.max(
                100,
                Math.floor((targetMB * 8192) / durationSec) - audioBitrateK
            );
            const scaleFilter =
                extras.resolution && extras.resolution !== "original"
                    ? ` -vf scale=${extras.resolution}`
                    : "";
            const pass1 = `ffmpeg -y -i ${i}${scaleFilter} -c:v libx264 -b:v ${videoBitrateK}k -pass 1 -an -f null -`;
            const pass2 = `ffmpeg -i ${i}${scaleFilter} -c:v libx264 -b:v ${videoBitrateK}k -pass 2 -c:a aac -b:a ${audioBitrateK}k ${o}`;
            return `# --- Pass 1 (analysis) ---\n${pass1}\n\n# --- Pass 2 (encode) ---\n${pass2}\n\n# Computed video bitrate: ${videoBitrateK} kbps (target ${targetMB} MB, ${durationSec}s, ${audioBitrateK}k audio)`;
        }
        case "remove-audio":
            return `ffmpeg -i ${i} -an -c:v copy ${o}`;
        case "add-subtitle": {
            const sub = extras.subtitleFile || "subtitles.srt";
            return `ffmpeg -i ${i} -vf subtitles=${q(sub)} ${o}`;
        }
        default:
            return `ffmpeg -i ${i} ${o}`;
    }
}

// ---- Build from simple config ----
function buildSimpleCommand(cfg: FFmpegSimpleConfig): string {
    const parts: string[] = ["ffmpeg"];

    parts.push(`-i ${q(cfg.inputFile)}`);

    // Video codec
    if (cfg.videoCodec !== "copy") {
        parts.push(`-c:v ${cfg.videoCodec}`);
        if (cfg.crf !== undefined && cfg.crf >= 0) {
            parts.push(`-crf ${cfg.crf}`);
        }
    } else {
        parts.push("-c:v copy");
    }

    // Resolution
    if (cfg.resolution !== "original" && RESOLUTION_SCALE[cfg.resolution]) {
        parts.push(`-vf scale=${RESOLUTION_SCALE[cfg.resolution]}`);
    }

    // FPS
    if (cfg.fps !== "original") {
        parts.push(`-r ${cfg.fps}`);
    }

    // Audio
    if (cfg.audioCodec === "none") {
        parts.push("-an");
    } else if (cfg.audioCodec !== "copy") {
        parts.push(`-c:a ${cfg.audioCodec}`);
        if (cfg.audioBitrate) {
            parts.push(`-b:a ${cfg.audioBitrate}`);
        }
    } else {
        parts.push("-c:a copy");
    }

    parts.push(q(cfg.outputFile));
    return parts.join(" ");
}

// ---- Build from advanced config ----
function buildAdvancedCommand(cfg: FFmpegAdvancedConfig): string {
    const parts: string[] = ["ffmpeg"];

    // Trim (before input for fast seek)
    if (cfg.startTime) parts.push(`-ss ${cfg.startTime}`);
    if (cfg.endTime) parts.push(`-to ${cfg.endTime}`);

    parts.push(`-i ${q(cfg.inputFile)}`);

    // Video codec
    if (cfg.videoCodec !== "copy") {
        parts.push(`-c:v ${cfg.videoCodec}`);

        // CRF or bitrate
        if (cfg.videoBitrate) {
            parts.push(`-b:v ${cfg.videoBitrate}`);
            if (cfg.maxBitrate) parts.push(`-maxrate ${cfg.maxBitrate}`);
            if (cfg.bufferSize) parts.push(`-bufsize ${cfg.bufferSize}`);
        } else if (cfg.crf !== undefined && cfg.crf >= 0) {
            parts.push(`-crf ${cfg.crf}`);
        }

        // Keyframe interval
        if (cfg.keyframeInterval) parts.push(`-g ${cfg.keyframeInterval}`);
        // B-frames
        if (cfg.bFrames) parts.push(`-bf ${cfg.bFrames}`);
    } else {
        parts.push("-c:v copy");
    }

    // Scale filter
    const filters: string[] = [];
    if (cfg.customWidth && cfg.customHeight) {
        const h = cfg.keepAspectRatio ? "-1" : cfg.customHeight;
        filters.push(`scale=${cfg.customWidth}:${h}`);
    } else if (
        cfg.resolution !== "original" &&
        RESOLUTION_SCALE[cfg.resolution]
    ) {
        filters.push(`scale=${RESOLUTION_SCALE[cfg.resolution]}`);
    }

    if (filters.length > 0) {
        parts.push(`-vf "${filters.join(",")}"`);
    }

    // FPS
    if (cfg.fps !== "original") {
        parts.push(`-r ${cfg.fps}`);
    }

    // Audio
    if (cfg.audioCodec === "none") {
        parts.push("-an");
    } else if (cfg.audioCodec !== "copy") {
        parts.push(`-c:a ${cfg.audioCodec}`);
        if (cfg.audioBitrate) parts.push(`-b:a ${cfg.audioBitrate}`);
        if (cfg.audioSampleRate) parts.push(`-ar ${cfg.audioSampleRate}`);
        if (cfg.audioChannels) parts.push(`-ac ${cfg.audioChannels}`);
    } else {
        parts.push("-c:a copy");
    }

    // Container options
    if (cfg.faststart) parts.push("-movflags +faststart");
    if (cfg.stripMetadata) parts.push("-map_metadata -1");

    // Two-pass note
    if (cfg.twoPass) {
        parts.push("# Note: 2-pass encoding requires running ffmpeg twice.");
    }

    // Extra flags
    if (cfg.extraFlags?.trim()) {
        parts.push(cfg.extraFlags.trim());
    }

    parts.push(q(cfg.outputFile));
    return parts.join(" ");
}

// ---- Main entry ----
export function buildFFmpegCommand(config: FFmpegConfig): string {
    switch (config.mode) {
        case "preset":
            return buildPresetCommand(
                config.presetId,
                config.inputFile,
                config.outputFile,
                config.extras
            );
        case "simple":
            return buildSimpleCommand(config);
        case "advanced":
            return buildAdvancedCommand(config);
    }
}

// ---- Default configs ----
export const DEFAULT_SIMPLE_CONFIG: FFmpegSimpleConfig = {
    inputFile: "input.mp4",
    outputFile: "output.mp4",
    format: "mp4",
    videoCodec: "libx264",
    resolution: "original",
    fps: "original",
    crf: 23,
    audioCodec: "aac",
    audioBitrate: "128k",
};

export const DEFAULT_ADVANCED_CONFIG: FFmpegAdvancedConfig = {
    ...DEFAULT_SIMPLE_CONFIG,
    startTime: "",
    endTime: "",
    videoBitrate: "",
    maxBitrate: "",
    bufferSize: "",
    twoPass: false,
    customWidth: "",
    customHeight: "",
    keepAspectRatio: true,
    keyframeInterval: "",
    bFrames: "",
    audioSampleRate: "",
    audioChannels: "",
    faststart: false,
    stripMetadata: false,
    extraFlags: "",
};
