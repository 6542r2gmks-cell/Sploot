import { HomePage } from "@/components/home-page";
import { getFeaturedDogs } from "@/lib/server/shelter-pets";

export default async function DemoTrialPage() {
  const liveDogs = await getFeaturedDogs();

  return <HomePage mode="demo" initialDogs={liveDogs} />;
}
