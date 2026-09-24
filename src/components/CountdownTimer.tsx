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
      <div className="flex justify-center items-center py-4 min-h-[90px] opacity-0">
        <span className="font-serif-lux text-5xl font-light">00</span>
      </div>
    );
  }

  if (timeLeft.isOpened) {
    return (
      <div className="py-4 text-center">
        <p className="font-serif-lux text-3xl sm:text-5xl font-light tracking-wide text-white">
          We’re open.
        </p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "days", value: pad(timeLeft.days) },
    { label: "hours", value: pad(timeLeft.hours) },
    { label: "minutes", value: pad(timeLeft.minutes) },
    { label: "seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <div
      className="flex justify-center items-center my-6"
      role="timer"
      aria-label="Time until opening"
    >
      <div className="flex divide-x divide-white/16">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center px-3 sm:px-6 md:px-7 first:pl-0 last:pr-0"
          >
            <span className="font-serif-lux font-light text-4xl sm:text-6xl md:text-7xl leading-none text-white tabular-nums tracking-tight">
              {unit.value}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.08em] text-neutral-400 mt-2 font-light lowercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
