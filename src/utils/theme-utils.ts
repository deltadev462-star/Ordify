// Generate a local fallback image using canvas
export const generateFallbackImage = (text: string): string => {
  // Create a data URL for a simple SVG fallback
  const svg = `
    <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="20" 
        fill="#6b7280" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;
  
  // Convert SVG to data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
