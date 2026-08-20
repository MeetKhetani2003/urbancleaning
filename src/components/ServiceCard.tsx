import Image from "next/image";
import Link from "next/link";
import type { Service } from "../../data/services";

export function ServiceCard({ service, priority = false }: { service: Service; priority?: boolean }) {
  return (
    <article className="service-card reveal">
      <Link href={`/services/${service.slug}`} className="card-image service-card-image" aria-label={`View ${service.title}`}>
        <Image src={service.image} alt={service.title} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" priority={priority} />
        <span className="image-sheen" />
      </Link>
      <div className="service-card-body">
        <span className="eyebrow eyebrow--small">{service.category}</span>
        <h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3>
        <p>{service.description}</p>
        <Link href={`/services/${service.slug}`} className="text-link">View service <span aria-hidden>→</span></Link>
      </div>
    </article>
  );
}
