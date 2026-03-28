import { useState, useMemo } from "react";
import { buildFFmpegCommand, PRESETS } from "../../../lib/ffmpeg";
import type { FFmpegPresetId } from "../../../types/ffmpeg";
import { Label, Input, Select, CommandOutput } from "./ui";

export function PresetTab() {
    const [selectedPreset, setSelectedPreset] =
        useState<FFmpegPresetId>("convert-mp4");
    const [inputFile, setInputFile] = useState("input.mp4");
    const [outputFile, setOutputFile] = useState("output.mp4");
    const [extras, setExtras] = useState<Record<string, string>>({});

    const preset = PRESETS.find((p) => p.id === selectedPreset)!;

    const updatePreset = (id: FFmpegPresetId) => {
        setSelectedPreset(id);
        const p = PRESETS.find((pr) => pr.id === id)!;
        const defaults: Record<string, string> = {};
        p.extraFields?.forEach((f) => {
            defaults[f.name] = f.defaultValue ?? "";
        });
        setExtras(defaults);
    };

    const command = useMemo(
        () =>
            buildFFmpegCommand({
                mode: "preset",
                presetId: selectedPreset,
                inputFile,
                outputFile,
                extras,
            }),
        [selectedPreset, inputFile, outputFile, extras]
    );

    return (
        <div className="space-y-4">
            <div>
                <Label>Preset</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRESETS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => updatePreset(p.id)}
                            className={`text-left p-3 rounded-md border transition-colors ${
                                selectedPreset === p.id
                                    ? "border-green-500 bg-green-500/10"
                                    : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                            }`}
                        >
                            <span className="text-sm font-medium text-white">
                                {p.label}
                            </span>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {p.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="preset-input">Input file</Label>
                    <Input
                        id="preset-input"
                        value={inputFile}
                        onChange={(e) => setInputFile(e.target.value)}
                        placeholder="input.mp4"
                    />
                </div>
                <div>
                    <Label htmlFor="preset-output">Output file</Label>
                    <Input
                        id="preset-output"
                        value={outputFile}
                        onChange={(e) => setOutputFile(e.target.value)}
                        placeholder="output.mp4"
                    />
                </div>
            </div>

            {preset.extraFields && preset.extraFields.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {preset.extraFields.map((field) => (
                        <div key={field.name}>
                            <Label htmlFor={`extra-${field.name}`}>
                                {field.label}
                            </Label>
                            {field.type === "select" ? (
                                <Select
                                    id={`extra-${field.name}`}
                                    value={
                                        extras[field.name] ??
                                        field.defaultValue ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        setExtras((prev) => ({
                                            ...prev,
                                            [field.name]: e.target.value,
                                        }))
                                    }
                                >
                                    {field.options?.map((opt) => (
                                        <option
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </Select>
                            ) : (
                                <Input
                                    id={`extra-${field.name}`}
                                    type={field.type === "number" ? "number" : "text"}
                                    value={
                                        extras[field.name] ??
                                        field.defaultValue ??
                                        ""
                                    }
                                    onChange={(e) =>
                                        setExtras((prev) => ({
                                            ...prev,
                                            [field.name]: e.target.value,
                                        }))
                                    }
                                    placeholder={field.placeholder}
                                    min={field.type === "number" ? 1 : undefined}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <CommandOutput command={command} />
        </div>
    );
}
