import { BrandPreviewPage } from "@/components/brand-preview-page";
import { getBrandPreview } from "@/lib/brand-previews";

export default function ModernMatchmakerPage() {
  const preview = getBrandPreview("modern-matchmaker");
  if (!preview) return null;
  return <BrandPreviewPage preview={preview} />;
}
