import { BrandPreviewPage } from "@/components/brand-preview-page";
import { getBrandPreview } from "@/lib/brand-previews";

export default function WarmGuidePage() {
  const preview = getBrandPreview("warm-guide");
  if (!preview) return null;
  return <BrandPreviewPage preview={preview} />;
}
