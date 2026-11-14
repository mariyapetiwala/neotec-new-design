import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type Particle = { x: number; y: number; dx: number; dy: number; phase: number };
type Ripple = { x: number; y: number; start: number };

export function TechnologyParticleWave({ hostRef }: { hostRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !host || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false, lastRippleX: -1000, lastRippleY: -1000 };
    const ripples: Ripple[] = [];
    let particles: Particle[] = [];
    let positions: { x: number; y: number; glow: number }[] = [];
    let columns = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let lastTime = 0;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(24, Math.min(104, Math.ceil(width / 20)));
      rows = Math.max(14, Math.min(28, Math.ceil((height * 0.56) / 18)));
      particles = [];
      positions = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          particles.push({
            x: (column / (columns - 1)) * width,
            y: height * 0.39 + (row / (rows - 1)) * height * 0.58,
            dx: 0,
            dy: 0,
            phase: column * 0.19 + row * 0.31,
          });
        }
      }
      positions = particles.map(() => ({ x: 0, y: 0, glow: 0 }));
      if (reducedMotion.matches) draw(0);
    };

    const addRipple = (x: number, y: number, now: number) => {
      ripples.push({ x, y, start: now });
      if (ripples.length > 5) ripples.shift();
    };

    const localPoint = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = localPoint(event);
      pointer.active = true;
      pointer.targetX = point.x;
      pointer.targetY = point.y;
      const moved = Math.hypot(point.x - pointer.lastRippleX, point.y - pointer.lastRippleY);
      if (moved > 46) {
        addRipple(point.x, point.y, performance.now());
        pointer.lastRippleX = point.x;
        pointer.lastRippleY = point.y;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const point = localPoint(event);
      pointer.active = true;
      pointer.targetX = point.x;
      pointer.targetY = point.y;
      pointer.lastRippleX = point.x;
      pointer.lastRippleY = point.y;
      addRipple(point.x, point.y, performance.now());
    };
    const onPointerEnd = () => { pointer.active = false; pointer.targetX = -1000; pointer.targetY = -1000; };

    const draw = (now: number) => {
      if (!context || !width || !height) return;
      const elapsed = Math.min(now - lastTime || 16, 40);
      lastTime = now;
      pointer.x += (pointer.targetX - pointer.x) * 0.13;
      pointer.y += (pointer.targetY - pointer.y) * 0.13;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const column = i % columns;
        const row = Math.floor(i / columns);
        const wave = Math.sin(column * 0.13 - now * 0.00042 + row * 0.33) * 15
          + Math.sin(column * 0.047 + now * 0.00026) * 11;
        const baseX = particle.x + Math.sin(row * 0.48 + column * 0.09 - now * 0.0002) * 2.2;
        const baseY = particle.y + wave + Math.sin(now * 0.001 + particle.phase) * 1.7;
        const cursorDx = baseX - pointer.x;
        const cursorDy = baseY - pointer.y;
        const distance = Math.hypot(cursorDx, cursorDy);
        const influence = pointer.active ? Math.max(0, 1 - distance / 175) : 0;
        const directionX = distance > 0.01 ? cursorDx / distance : 0;
        const directionY = distance > 0.01 ? cursorDy / distance : 1;
        let targetX = directionX * influence * influence * 34;
        let targetY = directionY * influence * influence * 34 + Math.sin(distance * 0.04 - now * 0.006) * influence * 7;

        let rippleGlow = 0;
        for (const ripple of ripples) {
          const age = (now - ripple.start) / 1000;
          if (age > 1.15) continue;
          const radius = age * 190;
          const rippleDistance = Math.hypot(baseX - ripple.x, baseY - ripple.y);
          const ring = Math.exp(-(((rippleDistance - radius) / 20) ** 2)) * (1 - age / 1.15);
          targetX += directionX * ring * 15;
          targetY += directionY * ring * 15;
          rippleGlow = Math.max(rippleGlow, ring);
        }

        particle.dx += (targetX - particle.dx) * Math.min(1, elapsed * 0.009);
        particle.dy += (targetY - particle.dy) * Math.min(1, elapsed * 0.009);
        positions[i] = {
          x: baseX + particle.dx,
          y: baseY + particle.dy,
          glow: Math.max(influence, rippleGlow),
        };
      }

      context.lineWidth = 0.65;
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = row * columns + column;
          const point = positions[index];
          if (column < columns - 1) {
            const next = positions[index + 1];
            const pulse = (Math.sin(now * 0.0014 + index * 0.19) + 1) * 0.5;
            context.strokeStyle = `rgba(21, 185, 255, ${0.085 + pulse * 0.075})`;
            context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(next.x, next.y); context.stroke();
            if (index % 67 === 0) {
              const travel = (now * 0.0002 + index * 0.31) % 1;
              context.fillStyle = "rgba(129, 235, 255, 0.72)";
              context.beginPath(); context.arc(point.x + (next.x - point.x) * travel, point.y + (next.y - point.y) * travel, 1.25, 0, Math.PI * 2); context.fill();
            }
          }
          if (row < rows - 1 && column < columns - 1) {
            const next = positions[index + columns + 1];
            context.strokeStyle = "rgba(21, 185, 255, 0.075)";
            context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(next.x, next.y); context.stroke();
          }
        }
      }

      for (let i = 0; i < positions.length; i++) {
        const point = positions[i];
        const size = 0.75 + point.glow * 1.55;
        context.fillStyle = `rgba(94, 221, 255, ${0.36 + point.glow * 0.58})`;
        if (point.glow > 0.48) {
          context.shadowColor = "rgba(31, 196, 255, 0.9)";
          context.shadowBlur = 7 * point.glow;
        }
        context.beginPath(); context.arc(point.x, point.y, size, 0, Math.PI * 2); context.fill();
        context.shadowBlur = 0;
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const age = (now - ripple.start) / 1000;
        if (age > 1.15) { ripples.splice(i, 1); continue; }
        context.beginPath();
        context.arc(ripple.x, ripple.y, age * 190, 0, Math.PI * 2);
        context.strokeStyle = `rgba(78, 218, 255, ${(1 - age / 1.15) * 0.24})`;
        context.lineWidth = 1.2;
        context.stroke();
      }
    };

    const animate = (now: number) => {
      if (!visible || document.hidden || reducedMotion.matches) { frame = 0; return; }
      draw(now);
      frame = window.requestAnimationFrame(animate);
    };
    const start = () => {
      if (visible && !document.hidden && !reducedMotion.matches && !frame) frame = window.requestAnimationFrame(animate);
    };
    const stop = () => { if (frame) window.cancelAnimationFrame(frame); frame = 0; };
    const onVisibility = () => document.hidden ? stop() : start();
    const onMotionPreference = () => {
      stop();
      if (reducedMotion.matches) draw(0);
      else start();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? start() : stop(); });
    intersectionObserver.observe(host);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerdown", onPointerDown, { passive: true });
    host.addEventListener("pointerup", onPointerEnd, { passive: true });
    host.addEventListener("pointercancel", onPointerEnd, { passive: true });
    host.addEventListener("pointerleave", onPointerEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionPreference);
    resize();
    start();

    return () => {
      stop();
      observer.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointerup", onPointerEnd);
      host.removeEventListener("pointercancel", onPointerEnd);
      host.removeEventListener("pointerleave", onPointerEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionPreference);
    };
  }, [hostRef]);

  return <canvas ref={canvasRef} className="technology-wave-canvas pointer-events-none absolute inset-0" aria-hidden="true" />;
}
