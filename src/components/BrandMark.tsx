import Image from "next/image";
import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="brand-mark" aria-label="Urban Shine Cleaning home">
      <span className={`brand-icon ${inverse ? "brand-icon--inverse" : ""}`}>
        <Image src="/images/logo/urban-shine-logo.png" alt="" width={48} height={48} priority />
      </span>
      <span className="brand-copy">
        <strong className={inverse ? "text-white" : ""}>URBAN SHINE</strong>
        <span className={inverse ? "text-mint" : ""}>CLEANING</span>
      </span>
    </Link>
  );
}
