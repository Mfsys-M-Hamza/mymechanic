import Image from "next/image";
import Link from "next/link";
import { client } from "@/config/client";
import { asset } from "@/lib/basePath";

/** Brand logo — always rendered at its intrinsic aspect ratio. */
export function Logo({ size = 56, priority = false, linked = true }: { size?: number; priority?: boolean; linked?: boolean }) {
  const width = Math.round((size * client.logo.width) / client.logo.height);
  const img = (
    <Image
      src={asset(client.logo.src)}
      alt={linked ? `${client.name} — home` : client.logo.alt}
      width={width}
      height={size}
      priority={priority}
      sizes={`${width}px`}
      style={{ width, height: size }}
    />
  );
  return linked ? (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-lg">
      {img}
    </Link>
  ) : (
    img
  );
}
