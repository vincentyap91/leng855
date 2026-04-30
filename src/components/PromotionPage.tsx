import { gameCategoryBanners } from "../data/gameCategoryBanners";
import { promotionSectionGroups } from "../data/promotions";

function PromotionCard({ id, title, image }: { id: string; title: string; image: string }) {
  return (
    <article className="promo-item overflow-hidden rounded-xl bg-[var(--surface)]">
      <a href={`#/promotion/${id}`} className="promo-image relative block" aria-label={title}>
        <img
          src={image}
          alt={title}
          className="img-responsive block w-full object-cover"
        />
        <span
          className="claimable-tag absolute right-0 top-0 z-10 rounded-full px-4 py-2 text-sm font-extrabold leading-tight tracking-wide whitespace-nowrap md:px-5 md:py-2.5 md:text-base"
          style={{
            background: "linear-gradient(180deg, var(--primary-bright) 0%, var(--primary-dark) 100%)",
            color: "#ffffff",
            boxShadow: "0 2px 10px color-mix(in srgb, var(--primary-dark) 45%, transparent)",
          }}
        >
          Claimable
        </span>
      </a>
    </article>
  );
}

export function PromotionPage() {
  return (
    <section className="t3-promotion-content banner-layout">
      <div className="mb-5 overflow-hidden rounded-xl">
        <img
          src={gameCategoryBanners.promotion}
          alt="Promotion"
          className="t3-categories-img block w-full object-cover"
        />
      </div>

      {promotionSectionGroups.map((section) => (
        <div key={section.title} className="t3-promotion-category mb-7">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="h-[2px] w-8 rounded-full"
              style={{ backgroundColor: "var(--gold)" }}
            />
            <h2 className="t3-custom-promotion-title m-0 text-[14px] font-extrabold uppercase tracking-wide text-[var(--primary-dark)]">
              {section.title}
            </h2>
          </div>

          <div className="t3-new-promotion-list grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.items.map((promo) => (
              <PromotionCard key={promo.id} id={promo.id} title={promo.title} image={promo.image} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
