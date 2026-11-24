import logo from "@/assets/silent-logo.jpg.asset.json";

export type Link = { label: string; desc: string; url: string };

export type SiteContent = {
  brand: { name: string; studio: string; logo: string; footerText: string; copyright: string };
  nav: { label: string; href: string }[];
  socials: { label: string; url: string }[];
  hero: {
    badge: string;
    titleLines: string[];
    subtitle: string;
    playLabel: string;
    playUrl: string;
    secondaryLines: string[];
    quote: string;
  };
  pillars: { title: string; text: string }[];
  mimic: {
    kicker: string;
    title: string;
    intro: string;
    traits: { key: string; value: string }[];
  };
  gameplay: { kicker: string; title: string; steps: string[] };
  asylum: {
    kicker: string;
    title: string;
    blurb: string;
    rooms: { name: string; sub: string }[];
  };
  development: {
    kicker: string;
    title: string;
    text: string;
    primaryLabel: string;
    primaryUrl: string;
    secondaryLabel: string;
    secondaryUrl: string;
    stats: { key: string; value: string }[];
  };
  footer: { name: string; line: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    name: "THE MIMIC",
    studio: "Silent Interactive Studios",
    logo: logo.url,
    footerText: "It is not trying to escape anymore. It is already here.",
    copyright: "© 2026 Silent Interactive Studios",
  },
  nav: [
    { label: "Home", href: "#top" },
    { label: "The Mimic", href: "#mimic" },
    { label: "Developers", href: "#team" },
    { label: "The Asylum", href: "#asylum" },
    { label: "Status", href: "#dev" },
  ],
  socials: [
    { label: "Discord", url: "https://discord.com/invite/ezgg" },
    { label: "YouTube", url: "#" },
    { label: "X", url: "#" },
    { label: "Roblox", url: "#" },
  ],
  hero: {
    badge: "Patient No. 17 · Basement ward · 1961",
    titleLines: ["THE", "MIMIC"],
    subtitle:
      "A multiplayer supernatural survival horror game. Nobody is who they seem.",
    playLabel: "Play on Roblox",
    playUrl: "https://www.roblox.com",
    secondaryLines: ["Meet the", "developers"],
    quote: "“Do not answer if it calls you by name.”",
  },
  pillars: [
    { title: "Hide", text: "Lockers, under beds, dark corners." },
    { title: "Deceive", text: "It wears the face of your friend." },
    { title: "Escape", text: "Restore power. Find the keys. Get out." },
  ],
  mimic: {
    kicker: "Patient record · Cell 6",
    title: "THE MIMIC",
    intro:
      "Admitted 14 September 1961. Name unknown. It copies the voices of staff perfectly. It does not eat. It does not sleep. At first it copied voices. Then it copied the people who spoke them.",
    traits: [
      {
        key: "True form",
        value:
          "Pale, elongated humanoid. Distorted proportions, hunched posture, long limbs, claw-like hands.",
      },
      {
        key: "Movement",
        value:
          "Tilted head, neck twitching, uneven walking — imitating human anatomy without understanding it.",
      },
      {
        key: "Disguise",
        value:
          "An ordinary player avatar, or a copied survivor. The tell is subtle: a head turn, a delay, too much stillness.",
      },
      {
        key: "Reveal",
        value:
          "A dedicated transformation when the moment is right. Then the hunt begins.",
      },
    ],
  },
  gameplay: {
    kicker: "One match · five stages",
    title: "HOW A NIGHT GOES",
    steps: [
      "Players enter the asylum. Roles are handed out in secret.",
      "Survivors explore, collect items and unlock restricted wings.",
      "The Mimic watches, disguises itself and picks its moment.",
      "Players disappear. The lights fail. The building turns on you.",
      "Escape — before it becomes you.",
    ],
  },
  asylum: {
    kicker: "The map · one building, many paths",
    title: "THE ASYLUM",
    blurb:
      "Cold corridors, red emergency light and rooms left half open. One memorable map built for hiding, lying and running.",
    rooms: [
      { name: "Main entrance", sub: "Reception · Ground floor" },
      { name: "Dorm B", sub: "Eight beds · always one more" },
      { name: "Treatment room", sub: "Top floor · session forty-one" },
      { name: "Pharmacy", sub: "Nine doses missing" },
      { name: "Morgue", sub: "Body record M-09" },
      { name: "Boiler room", sub: "Voices in the pipes" },
      { name: "Service tunnels", sub: "Something follows" },
      { name: "Isolation cells", sub: "Cell 6 is empty" },
    ],
  },
  development: {
    kicker: "Project status · early development",
    title: "STILL AWAKE",
    text:
      "We are in concept and early asset development. Direction, animation and map building are underway — and we are recruiting a scripter.",
    primaryLabel: "Join the Discord",
    primaryUrl: "https://discord.com/invite/ezgg",
    secondaryLabel: "Apply as scripter",
    secondaryUrl: "#",
    stats: [
      { key: "Platform", value: "Roblox" },
      { key: "Genre", value: "Social-deception horror" },
      { key: "First prototype", value: "One map · one Mimic" },
      { key: "Team", value: "Direction · Animation · Maps" },
    ],
  },
  footer: {
    name: "THE MIMIC",
    line: "It is not trying to escape anymore. It is already here.",
  },
};

/** Saved content wins section by section; anything missing falls back to defaults. */
export function mergeContent(saved: unknown): SiteContent {
  if (!saved || typeof saved !== "object") return DEFAULT_CONTENT;
  const s = saved as Record<string, unknown>;
  const out: Record<string, unknown> = { ...DEFAULT_CONTENT };
  for (const k of Object.keys(DEFAULT_CONTENT) as (keyof SiteContent)[]) {
    const d = DEFAULT_CONTENT[k];
    const v = s[k];
    if (v == null) continue;
    if (Array.isArray(d)) {
      if (Array.isArray(v)) out[k] = v;
      continue;
    }
    if (typeof v === "object" && !Array.isArray(v)) out[k] = { ...(d as object), ...(v as object) };
  }
  return out as SiteContent;
}

/** A malformed save must never take the page down — fall back to defaults instead. */
export function parseContent(json: string | null): SiteContent {
  if (!json) return DEFAULT_CONTENT;
  try {
    return mergeContent(JSON.parse(json));
  } catch {
    return DEFAULT_CONTENT;
  }
}
