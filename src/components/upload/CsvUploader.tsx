"use client";

import { useState, useRef } from "react";

type Status = "idle" | "uploading" | "success" | "error";

export default function CsvUploader() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    if (!file.name.endsWith(".csv")) {
      setStatus("error");
      setMessage("Please upload a .csv file.");
      return;
    }

    setStatus("uploading");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Upload failed");

      setStatus("success");
      setMessage(`Imported ${json.count} round${json.count !== 1 ? "s" : ""}.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-gray-900 p-12 text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
      }}
    >
      <p className="mb-4 text-gray-400">
        Drag & drop your UDisc export here, or
      </p>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={status === "uploading"}
        className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold hover:bg-green-500 disabled:opacity-50 transition-colors"
      >
        {status === "uploading" ? "Uploading…" : "Choose CSV file"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "error" ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
