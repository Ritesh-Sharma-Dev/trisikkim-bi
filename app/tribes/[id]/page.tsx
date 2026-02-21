import { notFound } from "next/navigation";
import { getTribeById, getAllTribes } from "../../../lib/tribes-data";
import { TribeDetailContent } from "./tribe-detail-content";

export default async function TribeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tribe = getTribeById(id);

  if (!tribe) {
    notFound();
  }

  const allTribes = getAllTribes();
  const currentIdx = allTribes.findIndex((t) => t.id === tribe.id);
  const prevTribe = currentIdx > 0 ? allTribes[currentIdx - 1] : null;
  const nextTribe =
    currentIdx < allTribes.length - 1 ? allTribes[currentIdx + 1] : null;

  return (
    <TribeDetailContent
      tribe={tribe}
      prevTribe={prevTribe}
      nextTribe={nextTribe}
    />
  );
}
