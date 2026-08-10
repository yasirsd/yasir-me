/**
 * Dedicated feature module for the Motion `domMax` bundle.
 *
 * Future signature interactions that genuinely need Motion (LaptopStory,
 * CareerTimeline, SkillConstellation, PortfolioChat message transitions)
 * dynamic-import THIS module from inside their own client-only island,
 * so the ~86 KB (raw) feature bundle stays off the initial route and
 * only downloads when that island is close to / inside the viewport.
 *
 *   // Inside the island:
 *   const [features, setFeatures] = useState<any>(null);
 *   useEffect(() => {
 *     import("@/motion/features-dom-max").then((m) => setFeatures(m.default));
 *   }, []);
 *   ...
 *   {features ? (
 *     <LazyMotion features={features} strict>
 *       <m.div ... />
 *     </LazyMotion>
 *   ) : null}
 *
 * Not imported anywhere in Milestone A.3 code. Kept as the seam for B/C/D.
 */
import { domMax } from "motion/react";
export default domMax;
