import { useEffect } from "react";

export function BackgroundPointerMotion() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const root = document.documentElement;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, opacity: 0, targetOpacity: 0, pageX: 50, pageY: 42, targetPageX: 50, targetPageY: 42 };
    let frame = 0;

    const animate = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.6;
      pointer.y += (pointer.targetY - pointer.y) * 0.6;
      pointer.opacity += (pointer.targetOpacity - pointer.opacity) * 0.1;
      pointer.pageX += (pointer.targetPageX - pointer.pageX) * 0.12;
      pointer.pageY += (pointer.targetPageY - pointer.pageY) * 0.12;

      root.style.setProperty("--background-pointer-x", `${pointer.x.toFixed(2)}px`);
      root.style.setProperty("--background-pointer-y", `${pointer.y.toFixed(2)}px`);
      root.style.setProperty("--background-pointer-x-percent", `${pointer.pageX.toFixed(2)}%`);
      root.style.setProperty("--background-pointer-y-percent", `${pointer.pageY.toFixed(2)}%`);
      root.style.setProperty("--background-glow-strength", pointer.opacity.toFixed(3));

      const settled = Math.abs(pointer.targetX - pointer.x) < 0.08
        && Math.abs(pointer.targetY - pointer.y) < 0.08
        && Math.abs(pointer.targetOpacity - pointer.opacity) < 0.005
        && Math.abs(pointer.targetPageX - pointer.pageX) < 0.08
        && Math.abs(pointer.targetPageY - pointer.pageY) < 0.08;
      if (settled) frame = 0;
      else frame = window.requestAnimationFrame(animate);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(animate); };
    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = ((event.clientX / window.innerWidth) - 0.5) * 36;
      pointer.targetY = ((event.clientY / window.innerHeight) - 0.5) * 24;
      pointer.targetPageX = (event.clientX / window.innerWidth) * 100;
      pointer.targetPageY = (event.clientY / window.innerHeight) * 100;
      pointer.targetOpacity = 0.42;
      schedule();
    };
    const onPointerEnd = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.targetPageX = 50;
      pointer.targetPageY = 42;
      pointer.targetOpacity = 0;
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    window.addEventListener("blur", onPointerEnd);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("blur", onPointerEnd);
      root.style.removeProperty("--background-pointer-x");
      root.style.removeProperty("--background-pointer-y");
      root.style.removeProperty("--background-pointer-x-percent");
      root.style.removeProperty("--background-pointer-y-percent");
      root.style.removeProperty("--background-glow-strength");
    };
  }, []);

  return null;
}
