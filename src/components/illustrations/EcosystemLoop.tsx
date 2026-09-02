// The homepage hero visual: three stakeholder scenes (restaurant -> volunteer
// -> NGO/community) connected by the GoodLoop ribbon. Built entirely from
// existing pieces of the app's illustration system (PersonFigure,
// HelpingHandsIllustration) rather than a new one-off illustration, so the
// hero visually matches every dashboard and page around it.
import { PersonFigure } from "./AvatarFace";
import { HelpingHandsIllustration } from "./HelpingHands";
import { ShopFrontIllustration } from "./ShopFront";
import { LoopRibbon } from "./LoopRibbon";
import { Doodle } from "./Doodle";

const SCENES = [
  {
    key: "restaurant",
    eyebrow: "Restaurants + hotels",
    caption: "Have good food left? Put it back in the loop.",
    color: "var(--color-role-restaurant)",
    bg: "var(--color-role-restaurant-bg)",
  },
  {
    key: "volunteer",
    eyebrow: "Volunteers",
    caption: "Pick it up. Keep it moving.",
    color: "var(--color-role-volunteer)",
    bg: "var(--color-role-volunteer-bg)",
  },
  {
    key: "ngo",
    eyebrow: "NGOs + communities",
    caption: "Food finds the people who need it most.",
    color: "var(--color-role-ngo)",
    bg: "var(--color-role-ngo-bg)",
  },
] as const;

export function EcosystemLoop({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <LoopRibbon className="absolute left-0 top-0 h-full w-28 sm:w-32" />

      <div className="relative flex flex-col gap-10 py-2 pl-24 sm:pl-28">
        {SCENES.map((scene) => (
          <div key={scene.key} className="flex items-center gap-4">
            <div
              className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full ring-4 ring-sand-50 sm:h-32 sm:w-32"
              style={{ backgroundColor: scene.bg }}
            >
              {scene.key === "restaurant" && (
                <>
                  <ShopFrontIllustration className="h-20 w-20 sm:h-24 sm:w-24" />
                  <Doodle kind="sparkle" color="var(--color-sun-400)" className="absolute -right-1 -top-1 h-6 w-6" />
                </>
              )}
              {scene.key === "volunteer" && (
                <>
                  <svg viewBox="0 0 60 155" className="h-24 w-24 sm:h-28 sm:w-28" aria-hidden="true">
                    <PersonFigure seed="ecosystem-volunteer" pose="carry" />
                  </svg>
                  <Doodle kind="heart" color="var(--color-accent-500)" className="absolute -right-1 -top-1 h-6 w-6" />
                </>
              )}
              {scene.key === "ngo" && (
                <>
                  <HelpingHandsIllustration className="h-20 w-20 sm:h-24 sm:w-24" />
                  <Doodle kind="star" color="var(--color-berry-500)" className="absolute -right-1 -top-1 h-6 w-6" />
                </>
              )}
            </div>

            <div>
              <span
                className="inline-block rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ color: scene.color, backgroundColor: scene.bg }}
              >
                {scene.eyebrow}
              </span>
              <p className="mt-1.5 max-w-[16rem] text-sm leading-snug text-sand-600">{scene.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
