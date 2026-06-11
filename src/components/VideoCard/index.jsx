// Dependencies
import { useCallback, useRef ,useState} from "react";

// Assets
import "./index.css";

const VideoCard = ({ index, video, isLoaded, refForwarder, onDoubleClick }) => {
  const videoRef = useRef(null);
  const [orientationClass, setOrientationClass] = useState("");

  // Handle click
  // - Seek forward / backward on double click
  const handleDoubleClick = (e) => {
    onDoubleClick(e);
  };

  const forward = useCallback((_ref) => {
    videoRef.current = _ref;
    refForwarder(_ref);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect orientation when video metadata loads
  const handleLoadedMetadata = (e) => {
    const videoEl = e.currentTarget;
    
    // Check if the video asset is landscape
    if (videoEl.videoWidth > videoEl.videoHeight) {
      setOrientationClass("auto-rotate-landscape");
    } else if (videoEl.videoWidth < videoEl.videoHeight) {
      setOrientationClass("video-portrait");
    } else {
      setOrientationClass("video-square");
    }
  };

  // Safely encode only the filename part of the URL
  let safeUrl = null;
  if (isLoaded && video) {
    try {
      safeUrl = video.url.replace(video.filename, encodeURIComponent(video.filename));
    } catch (e) {
      console.error("Invalid URL in VideoCard:", video, e);
      safeUrl = encodeURI(video.url); // fallback to original
    }
  }

  return (
    <div className={`video ${orientationClass}`} >
      <video
        className="player"
        data-index={index}
        src={safeUrl}
        ref={forward}
        onDoubleClick={handleDoubleClick}
        playsInline={true}
        onLoadedMetadata={handleLoadedMetadata}
        muted={true}
        preload="auto"
      />
    </div>
  );
};

export default VideoCard;
