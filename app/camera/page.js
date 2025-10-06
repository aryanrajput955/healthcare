"use client";

import { useRef, useState } from "react";

export default function DocumentCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [streaming, setStreaming] = useState(false);

  // Start camera (for desktop)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // back cam for docs
      });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (err) {
      alert("Camera not available or permission denied.");
    }
  };

  // Capture from webcam
  const capturePhoto = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setCaptured(dataUrl);

    // stop stream after capture
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setStreaming(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Camera button for mobile (opens camera app) */}
      <label
        htmlFor="cameraInput"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
      >
        📷 Capture Document
      </label>
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setCaptured(URL.createObjectURL(file));
        }}
      />

      {/* Extra button for desktops (opens webcam fullscreen) */}
      <button
        onClick={startCamera}
        className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow hover:bg-gray-800 transition"
      >
        💻 Use Webcam
      </button>

      {/* Webcam fullscreen */}
      {streaming && (
        <div className="fixed inset-0 bg-black flex flex-col justify-center items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
          />
          <button
            onClick={capturePhoto}
            className="absolute bottom-8 px-8 py-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
          >
            📸 Capture
          </button>
        </div>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} width="1280" height="720" className="hidden" />

      {/* Preview */}
      {captured && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <img
            src={captured}
            alt="Captured Document"
            className="w-80 h-auto object-contain border rounded-lg shadow"
          />
          <button
            onClick={() => setCaptured(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            🔄 Retake
          </button>
        </div>
      )}
    </div>
  );
}
