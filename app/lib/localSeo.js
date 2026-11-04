import serviceAreaData from "../data/service-areas.json";
import practiceAreaData from "../data/practice-areas_clean.json";

export const serviceAreas = serviceAreaData.areas || [];
export const practiceAreas = practiceAreaData.practiceAreas || [];

export function isLocalSeoPublished(area) {
  return area?.localSeoPublished === true;
}

export function buildLocalSeoSlug(area, practice) {
  if (!area?.slug || !practice?.slug) return "";
  return `${area.slug}-${practice.slug}`;
}

export function getLocalSeoTitle(practice) {
  return practice?.localSeoTitle || `${practice?.navTitle || "Criminal Defense"} Lawyer`;
}

export function getLocalSeoFaq(practice) {
  const faq = Array.isArray(practice?.faq) ? practice.faq : [];
  const featured = faq.filter((item) => item.localSeoFeatured === true);
  return featured.length ? featured : faq.slice(0, 5);
}

export function getLocalSeoCopy(area, practice) {
  return {
    eyebrow: "Local criminal defense",
    serviceLabel: `${practice.navTitle} Defense`,
    legalEyebrow: "Minnesota law and defense",
    legalIntro: `Minnesota criminal law applies statewide, but the court process, local agency records, and practical details of a case depend on where it is filed. The information below explains important issues Andrew reviews when defending ${practice.navTitle.toLowerCase()} cases.`,
    cityIntro: area.uniqueAngle,
    showLocalResources: true,
    ...practice.localSeo,
  };
}

export function getLocalSeoH1(area, practice) {
  return `${area.city} ${getLocalSeoTitle(practice)}`;
}

export function getLocalSeoPages({ publishedOnly = false } = {}) {
  return serviceAreas
    .filter((area) => !publishedOnly || isLocalSeoPublished(area))
    .flatMap((area) =>
      practiceAreas.map((practice) => ({
        area,
        practice,
        slug: buildLocalSeoSlug(area, practice),
      })),
    );
}

export function findLocalSeoPage(slug) {
  const cleanSlug = String(slug || "").trim();

  for (const area of serviceAreas) {
    const prefix = `${area.slug}-`;
    if (!cleanSlug.startsWith(prefix)) continue;

    const practiceSlug = cleanSlug.slice(prefix.length);
    const practice = practiceAreas.find((item) => item.slug === practiceSlug);

    if (practice) {
      return {
        area,
        practice,
        slug: buildLocalSeoSlug(area, practice),
      };
    }
  }

  return null;
}

export function getLocalSeoMetaDescription(area, practice) {
  return `Need legal help with ${practice.navTitle.toLowerCase()} in ${area.city}, Minnesota? Andrew Davis represents clients in ${area.city} and ${area.county}. Call for a free, confidential case evaluation.`;
}

export function getLocalSeoContentBlocks(practice, limit = 3) {
  const blocks = Array.isArray(practice?.contentBlocks)
    ? practice.contentBlocks
    : [];

  return blocks
    .filter((block) => {
      if (!block?.title) return false;
      return !/^serving\b/i.test(block.title);
    })
    .slice(0, limit);
}
