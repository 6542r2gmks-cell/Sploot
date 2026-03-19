import { BrandPreviewPage } from "@/components/brand-preview-page";
import { getBrandPreview } from "@/lib/brand-previews";

export default function DemoCompanionCoachPage() {
  const preview = getBrandPreview("companion-coach");
  if (!preview) return null;
  return <BrandPreviewPage preview={preview} />;
}
