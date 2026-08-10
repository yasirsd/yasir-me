/**
 * Dedicated feature module for the Motion `domAnimation` bundle (smaller
 * than `domMax` — no layout animations / no `layoutId`).
 *
 * Below-fold reveal-style animations that need Motion should
 * dynamic-import THIS module from their own client island.
 *
 * Not imported anywhere in Milestone A.3 code.
 */
import { domAnimation } from "motion/react";
export default domAnimation;
