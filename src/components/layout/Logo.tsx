import Image from "next/image";
import Link from "next/link";
import { client } from "@/config/client";
import { asset } from "@/lib/basePath";

/**
 * Brand logo — always rendered at its intrinsic aspect ratio.
 * When a light-theme variant exists, both are rendered and CSS shows the one for the
 * active theme (.logo-for-dark / .logo-for-light), so switching themes never re-fetches layout.
 */
export function Logo({ size = 56, priority = false, linked = true }: { size?: number; priority?: boolean; linked?: boolean }) {
  const width = Math.round((size * client.logo.width) / client.logo.height);
  const alt = linked ? `${client.name} — home` : client.logo.alt;
  const common = { width, height: size, priority, sizes: `${width}px`, style: { width, height: size } };
  const img = client.logo.srcLight ? (
    <>
      <Image src={asset(client.logo.src)} alt={alt} className="logo-for-dark" {...common} />
      <Image src={asset(client.logo.srcLight)} alt={alt} className="logo-for-light" {...common} />
    </>
  ) : (
    <Image src={asset(client.logo.src)} alt={alt} {...common} />
  );
  return linked ? (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-lg">
      {img}
    </Link>
  ) : (
    <span className="inline-flex shrink-0 items-center">{img}</span>
  );
}
