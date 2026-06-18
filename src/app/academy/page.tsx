import { Bricolage_Grotesque } from "next/font/google";
import AcademyCatalog from "./catalog";

// ANC Academy — course-catalog front door. Server component loads the display
// font (self-hosted via next/font) and exposes it as the --font-display CSS
// variable on a wrapper element; the client catalog applies it to headings.
// The variable class must be rendered (not just referenced) so next/font
// actually downloads the font files.

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export default function AcademyPage() {
  return (
    <div className={bricolage.variable}>
      <AcademyCatalog display="var(--font-display)" />
    </div>
  );
}