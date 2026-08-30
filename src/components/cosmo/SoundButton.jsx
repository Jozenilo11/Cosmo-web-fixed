import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundButton() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/sounds/cosmo-space.mp3");

    audio.loop = true;
    audio.volume = 0;

    audioRef.current = audio;

    return () => {
      if (fadeRef.current) {
        clearInterval(fadeRef.current);
      }

      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const fadeIn = (audio) => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
    }

    audio.volume = 0;

    const targetVolume = 0.25;
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;

    fadeRef.current = setInterval(() => {
      if (audio.volume < targetVolume) {
        audio.volume = Math.min(
          targetVolume,
          audio.volume + volumeStep
        );
      } else {
        audio.volume = targetVolume;
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, stepTime);
  };

  const fadeOut = (audio) => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
    }

    const duration = 1000;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = audio.volume / steps;

    fadeRef.current = setInterval(() => {
      if (audio.volume > volumeStep) {
        audio.volume = Math.max(
          0,
          audio.volume - volumeStep
        );
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;

        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, stepTime);
  };

  const toggle = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (on) {
      fadeOut(audio);
      setOn(false);
    } else {
      try {
        await audio.play();
        setOn(true);
        fadeIn(audio);
      } catch (error) {
        console.error(
          "No se pudo reproducir el audio:",
          error
        );
      }
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-[#340654] via-[#2a2c69] to-[#288c84] text-white shadow-[0_8px_30px_rgba(42,44,105,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
      aria-label={on ? "Silenciar" : "Sonido ambiental"}
      title={
        on
          ? "Silenciar ambiente cósmico"
          : "Activar ambiente cósmico"
      }
    >
      {on ? (
        <Volume2 size={24} className="animate-pulse" />
      ) : (
        <VolumeX size={24} />
      )}
    </button>
  );
}