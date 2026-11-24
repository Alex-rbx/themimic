import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { DEVELOPERS } from "@/lib/developers";

/** Looks up each developer's Roblox avatar; a failed lookup just leaves the avatar empty. */
export const getAvatars = createServerFn({ method: "GET" }).handler(async () => {
  const ids = DEVELOPERS.map((d) => d.robloxUserId).join(",");
  try {
    const res = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar?userIds=${ids}&size=420x420&format=Png&isCircular=false`,
    );
    if (!res.ok) return {} as Record<string, string>;
    const body = (await res.json()) as { data?: { targetId: number; imageUrl?: string }[] };
    const out: Record<string, string> = {};
    for (const d of body.data ?? []) if (d.imageUrl) out[String(d.targetId)] = d.imageUrl;
    return out;
  } catch {
    return {} as Record<string, string>;
  }
});

export const avatarsQuery = queryOptions({ queryKey: ["dev-avatars"], queryFn: () => getAvatars() });
