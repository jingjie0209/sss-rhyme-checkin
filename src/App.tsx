import { KeyboardProvider } from "./mobile/Keyboard";
import { MobileDeviceProvider } from "./mobile/Device";
import { MobileRuntime } from "./mobile/MobileRuntime";
import Prototype from "./Prototype";

export default function App() {
  const isRealMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.platform));

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
