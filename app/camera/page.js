"use client";

import { useRef, useState } from "react";

export default function FullscreenCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // default: front cam on laptops

  // Start camera
  const startCamera = async (mode = facingMode) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
        setFacingMode(mode);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied or not available.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setStreaming(false);
  };

  // Capture photo
  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setCaptured(dataUrl);
    stopCamera();
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCaptured(url);
    }
  };

  // Toggle camera
  const switchCamera = () => {
    stopCamera();
    const newMode = facingMode === "environment" ? "user" : "environment";
    startCamera(newMode);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {!streaming && !captured && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => startCamera("user")} // default front cam for laptops
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            📷 Open Camera
          </button>

          <label
            htmlFor="fileInput"
            className="px-6 py-3 text-center bg-green-600 text-white rounded-xl shadow cursor-pointer hover:bg-green-700 transition"
          >
            📁 Upload from Files
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Fullscreen Camera */}
      {streaming && (
        <div className="fixed inset-0 bg-black flex justify-center items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Capture Button */}
          <button
            onClick={takePhoto}
            className="absolute bottom-10 px-8 py-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
          >
            📸 Capture
          </button>

          {/* Switch Camera Button */}
          <button
            onClick={switchCamera}
            className="absolute top-6 right-6 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
          >
            🔄 Switch
          </button>
        </div>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} width="1280" height="720" className="hidden" />

      {/* Captured Preview */}
      {captured && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={captured}
            alt="Captured"
            className="w-96 h-64 object-cover rounded-lg border shadow"
          />
          <button
            onClick={() => setCaptured(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700"
          >
            🔄 Retake
          </button>
        </div>
      )}
    </div>
  );
}
