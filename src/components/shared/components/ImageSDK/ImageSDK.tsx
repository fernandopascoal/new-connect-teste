import { useMemo, useRef, useState } from "react";

import { composeUrlCloudinary } from "../../utils/composeUrlCloudinary";
import { isCloudinary, isVideo } from "../../utils/validators";
import Image from "next/image";

interface ImageSDKProps extends ImageSDKInternalProps {
  src?: string;
  className?: string;
  alt?: string;
  controls?: boolean;
}

interface ImageSDKInternalProps {
  width?: number;
  height?: number;
  quality?: "best" | "good" | "eco" | "no-compression";
  fit?: "fill" | "fit";
}

const imagePlaceholder =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";

export const ImageSDK = ({
  src,
  className = "",
  width,
  height,
  quality = "good",
  fit = "fill",
  alt = "",
  controls = false,
}: ImageSDKProps) => {
  const preImageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isCloud = isCloudinary(src ?? "");
  const isVid = isVideo(src ?? "");
  const [isError, setError] = useState(false);

  const VideoThreath = () => {
    return (
      <>
        <Image
          src={composeUrlCloudinary({
            src: src?.replace(".mp4", ".png") ?? "",
            InternalProps: { width, height, quality, fit },
          })}
          alt={alt}
          className={className}
          ref={preImageRef}
          width={600}
          height={300}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
          placeholder="blur"
          blurDataURL={src}
          
        />

        <video
          className={className}
          ref={videoRef}
          autoPlay
          muted
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          controls={controls}
          loop
          playsInline
          onLoadedData={() => {
            if (videoRef.current && preImageRef.current) {
              videoRef.current.style.display = "block";
              preImageRef.current.style.display = "none";
            }
          }}
          style={{ display: "none" }}
          src={composeUrlCloudinary({
            src: src ?? "",
            InternalProps: { width, height, quality, fit },
          })}
        ></video>
      </>
    );
  };

  const ImageThreath = () => {
    return (
      <>
        <Image
          src={composeUrlCloudinary({
            src: src?.replace(".mp4", ".png") ?? "",
            InternalProps: { width, height, quality, fit },
          })}
          alt={alt}
          className={className}
          ref={preImageRef}
          width={600}
          height={300}
          onError={() => setError(true)}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
          placeholder="blur"
          blurDataURL={src}
        />
        <Image
          src={
            isError
              ? imagePlaceholder
              : composeUrlCloudinary({
                  src: src ?? "",
                  InternalProps: { width, height, quality, fit },
                })
          }
          alt={alt}
          className={className}
          ref={imageRef}
          width={600}
          height={300}
          onError={() => setError(true)}
          onLoad={() => {
            if (imageRef.current && preImageRef.current) {
              imageRef.current.style.display = "block";
              preImageRef.current.style.display = "none";
            }
          }}
          style={{ display: "none" }}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
          placeholder="blur"
          blurDataURL={src}
        />
      </>
    );
  };

  return useMemo(() => {
    if (!src) {
      return (
        <Image
          alt={alt}
          className={`${className}`}
          src={imagePlaceholder}
          width={600}
          height={300}
        />
      );
    } else if (isCloud) {
      return isVid ? <VideoThreath /> : <ImageThreath />;
    } else {
      return isVid ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          controls={controls}
          playsInline
          className={`${className}`}
          src={src ?? ""}
        ></video>
      ) : (
        <Image
          alt={alt}
          className={`${className}`}
          src={isError ? imagePlaceholder : src ?? ""}
          width={600}
          height={300}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
          placeholder="blur"
          blurDataURL={src}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, isError, className, isVid, isCloud]);
};
