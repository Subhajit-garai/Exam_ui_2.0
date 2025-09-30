import { useEffect } from "react";

const ExamSecurity = () => {
  useEffect(() => {
    const goFullScreen = () => {
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  };

  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
};

    goFullScreen();
    // === Tab Switching Detection ===
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Don't switch tabs!");
        // Optionally log to server
      }
    };

    // === Fullscreen Detection ===
    const isFullScreen = () => {
      return (
        document.fullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
    };

    const handleFullScreenChange = () => {
      if (!isFullScreen()) {
        alert("Please stay in fullscreen mode!");
        // Optional: Send warning to backend
      }
    };

    // === Disable Right-Click & Selection ===
    const disableRightClick = (e: any) => e.preventDefault();
    const disableTextSelect = (e: any) => e.preventDefault();

    // === Keyboard Shortcut Detection ===
    const handleKeyDown = (e: any) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x", "t", "n"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        alert("No shortcuts allowed!");
      }
    };

    const handleBeforeUnload = (e: any) => {
      alert("Are you sure? This action will automatically submit your exam.");
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave?";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange); // Safari
    document.addEventListener("mozfullscreenchange", handleFullScreenChange); // Firefox
    document.addEventListener("MSFullscreenChange", handleFullScreenChange); // IE/Edge
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("selectstart", disableTextSelect);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("selectstart", disableTextSelect);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      ); // Safari
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      ); // Firefox
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; // This component just attaches global listeners
};

export default ExamSecurity;
