import { KeyboardProvider } from "./mobile/Keyboard";
import { MobileDeviceProvider } from "./mobile/Device";
import { MobileRuntime } from "./mobile/MobileRuntime";
import Prototype from "./Prototype";

export default function App() {
  const ua = navigator.userAgent;
  // Some Android WebViews / WeChat browsers don't include "Android" in UA,
  // so we also check for common mobile identifiers and touch capability.
  const isRealMobile = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(ua)
    || (/Macintosh/.test(navigator.platform) && navigator.maxTouchPoints > 1)
    || (navigator.maxTouchPoints > 1 && window.innerWidth < 900);

  if (isRealMobile) {
    return (
      <MobileDeviceProvider>
        <KeyboardProvider>
          <Prototype />
        </KeyboardProvider>
      </MobileDeviceProvider>
    );
  }

  return (
    <MobileRuntime>
      <Prototype />
    </MobileRuntime>
  );
}
