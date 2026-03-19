import { BrandPreviewPage } from "@/components/brand-preview-page";
import { getBrandPreview } from "@/lib/brand-previews";

export default function OutcomeFirstPage() {
  const preview = getBrandPreview("outcome-first");
  if (!preview) return null;
  return <BrandPreviewPage preview={preview} />;
}
