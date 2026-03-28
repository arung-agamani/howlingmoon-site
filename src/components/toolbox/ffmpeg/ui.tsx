import { useState } from "react";
import { Copy, Check } from "lucide-react";

// ---- Label ----

export function Label({
    children,
    htmlFor,
}: {
    children: React.ReactNode;
    htmlFor?: string;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-300 mb-1"
        >
            {children}
        </label>
    );
}

// ---- Input ----

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 ${props.className ?? ""}`}
        />
    );
}

// ---- Select ----

export function Select({
    value,
    onChange,
    children,
    ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            value={value}
            onChange={onChange}
            {...rest}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
            {children}
        </select>
    );
}

// ---- Slider ----

export function Slider({
    label,
    value,
    min,
    max,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}) {
    return (
        <div>
            <Label>
                {label}: <span className="text-green-400">{value}</span>
            </Label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-green-500"
            />
        </div>
    );
}

// ---- Toggle ----

export function Toggle({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
            <div
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onChange(!checked);
                }}
                tabIndex={0}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-green-500" : "bg-gray-600"}`}
            >
                <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`}
                />
            </div>
            {label}
        </label>
    );
}

// ---- CommandOutput ----

export function CommandOutput({ command }: { command: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-6">
            <Label>Generated Command</Label>
            <div className="relative">
                <pre className="rounded-md border border-gray-700 bg-gray-950 p-4 text-sm text-green-400 overflow-x-auto whitespace-pre-wrap break-all font-mono">
                    {command}
                </pre>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                </button>
            </div>
        </div>
    );
}

// ---- TabButton ----

export function TabButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                active
                    ? "bg-gray-800 text-green-400 border-b-2 border-green-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
        >
            {children}
        </button>
    );
}

// ---- Fieldset ----

export function Fieldset({
    legend,
    children,
    className,
}: {
    legend: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <fieldset
            className={`border border-gray-700 rounded-md p-4 space-y-4 ${className ?? ""}`}
        >
            <legend className="text-sm font-medium text-white px-2">
                {legend}
            </legend>
            {children}
        </fieldset>
    );
}
