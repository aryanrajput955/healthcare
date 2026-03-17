"use client";

import Image from "next/image";

/**
 * A reusable component that takes a Cloudinary URL and automatically
 * adds optimization parameters (f_auto, q_auto).
 */
export default function CloudinaryImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "", 
  priority = false,
  ...props 
}) {
  // Function to inject Cloudinary optimization parameters
  const getOptimizedUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    
    // Check if it already has transformations
    if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto")) return url;

    // Inject f_auto (auto format) and q_auto (auto quality) after the 'upload' part of the URL
    return url.replace("/upload/", "/upload/f_auto,q_auto/");
  };

  const optimizedSrc = getOptimizedUrl(src);

  const isHeightAuto = className.includes('h-auto');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt || "Indiem Healthcare"}
        width={width}
        height={height}
        className="w-full h-full"
        style={{ 
          width: '100%',
          height: isHeightAuto ? 'auto' : '100%',
          objectFit: className.includes('object-contain') ? 'contain' : 'cover'
        }}
        unoptimized // Allow external URLs without full next.config domain setup
        priority={priority}
        {...props}
      />
    </div>
  );
}
