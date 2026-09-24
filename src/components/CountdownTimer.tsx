"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate?: string;
}

export function CountdownTimer({
  targetDate = "2026-11-15T10:00:00+05:45",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOpened: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOpened: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();

    function update() {
      const diff = target - Date.now();
      if (isNaN(target) || diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOpened: true,
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isOpened: false,
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center gap-4 py-3 opacity-0">
        <span className="text-3xl font-light">--</span>
      </div>
    );
  }

  if (timeLeft.isOpened) {
    return (
      <div className="py-4 text-center">
        <p className="font-serif-lux text-3xl md:text-5xl text-gold-shimmer font-light tracking-wide">
          The Boutique Doors Are Open.
        </p>
      </div>
    );
  }

  const units = [
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MINUTES", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "SECONDS", value: String(timeLeft.seconds).padStart(2, "0") },
  ];

  return (
    <div
      className="flex items-center justify-center pt-2 pb-1"
      role="timer"
      aria-label="Countdown to Lumisa opening"
    >
      <div className="flex items-center divide-x divide-white/10 bg-black/40 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/5 shadow-2xl">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center px-3 sm:px-6 md:px-8 first:pl-2 last:pr-2 group"
          >
            <span className="font-serif-lux text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white group-hover:text-amber-200 transition-colors duration-300 tabular-nums">
              {unit.value}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 mt-1 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
