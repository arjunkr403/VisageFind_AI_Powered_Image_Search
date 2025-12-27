import { useState, useEffect } from "react";

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); //stop auto popup
      deferredPrompt(e); //store the event without storing , install popup will not show
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode:standalone").matches) {
      //check if already installed
      setIsInstalled(true);
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return; //early return if not supported

    deferredPrompt.prompt(); //this opens install prompt

    const { outcome } = await deferredPrompt.userChoice; //outcome can be accepted or dismissed

    if (outcome === "accepted") {
      console.log("user accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    setDeferredPrompt(null);
  };
  return { isSupported: !!deferredPrompt, isInstalled, install };
}
// set isSupported to true if deferredPrompt exists else false
// equivalent to Boolean(deferredPrompt)
