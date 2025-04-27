/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import cloudinary, { Cloudinary } from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";

interface IProps {
  publicId: string;
  playerConfig?: Record<string, any>;
  sourceConfig?: Record<string, any>;
}

const VideoPlayer = ({
  publicId,
  playerConfig,
  sourceConfig,
  ...props
}: IProps) => {
  const cloudinaryRef = useRef<Cloudinary | null>(null);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    const player: any = cloudinaryRef.current.videoPlayer(
      playerRef.current as any,
      {
        ...playerConfig,
      }
    );

    const handleKeyPress = (event: KeyboardEvent) => {
      if (!playerRef.current) return;
      switch (event.key.toLowerCase()) {
        // Volume controls
        case "arrowup": {
          event.preventDefault();
          player.volume(Math.min(playerRef.current.volume + 0.1, 1));
          break;
        }
        case "arrowdown": {
          event.preventDefault();
          player.volume(Math.max(playerRef.current.volume - 0.1, 0));
          break;
        }
        // Seeking controls
        case "arrowleft": {
          event.preventDefault();
          player.currentTime(Math.max(playerRef.current.currentTime - 10, 0));
          break;
        }
        case "arrowright": {
          event.preventDefault();
          player.currentTime(
            Math.min(playerRef.current.currentTime + 10, player.duration())
          );
          break;
        }
        // Play/Pause with Space
        case " ": {
          event.preventDefault();
          if (playerRef.current.paused) {
            player.play();
          } else {
            player.pause();
          }
          break;
        }
        // Fullscreen with F
        case "f": {
          event.preventDefault();
          if (player.isMaximized()) {
            player.exitMaximize();
          } else {
            player.maximize();
          }
          break;
        }
        // Mute/Unmute with M
        case "m": {
          event.preventDefault();
          if (player.isMuted()) {
            player.unmute();
          } else {
            player.mute();
          }
          break;
        }
      }
    };

    player.on("keydown", handleKeyPress);

    player.source(publicId, sourceConfig);
  }, []);

  return (
    <video ref={playerRef} className="cld-video-player cld-fluid" {...props} />
  );
};

export default VideoPlayer;
