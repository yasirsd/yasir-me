import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Command } from "lucide-react";
import { createNoIndexMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { proofMetrics } from "@/data/metrics";
import { FadeReveal } from "@/motion/fade-reveal";
import { TextReveal } from "@/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/motion/stagger-group";
import { Container } from "@/ui/container";
import { DisplayHeading } from "@/ui/display-heading";
import { EditorialText } from "@/ui/editorial-text";
import { SectionLabel } from "@/ui/section-label";
import { Button } from "@/ui/button";
import { IconButton } from "@/ui/icon-button";
import { Surface } from "@/ui/surface";
import { PremiumGlass } from "@/ui/premium-glass";
import { Metric } from "@/ui/metric";
import { Tag } from "@/ui/tag";
import { Divider } from "@/ui/divider";
import { AmbientField } from "@/ui/ambient-field";
import {
  GoldDot,
  GoldHighlight,
  GoldMarker,
  GoldRule,
} from "@/ui/gold-signal";

export const metadata: Metadata = createNoIndexMetadata(
  "Design System QA (Internal)",
);

function Swatch({
  name,
  token,
  className,
}: {
  name: string;
  token: string;
  className: string;
}) {
  return (
    <div className="space-y-3">
      <div
        className={`h-20 rounded-[var(--radius-20)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] ${className}`}
      />
      <div>
        <p className="type-body-small text-foreground">{name}</p>
        <p className="type-technical text-foreground-tertiary">{token}</p>
      </div>
    </div>
  );
}

function DesignBlock({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16">
      <SectionLabel>{label}</SectionLabel>
      <DisplayHeading as="h2" size="h2" className="mt-3 max-w-2xl text-left">
        {title}
      </DisplayHeading>
      <div className="mt-8">{children}</div>
    </section>
  );
}

const navItems = [
  ["colors", "Colors"],
  ["typography", "Typography"],
  ["buttons", "Buttons"],
  ["materials", "Materials"],
  ["surfaces", "Surfaces"],
  ["editorial", "Editorial"],
  ["gold", "Gold"],
  ["layout", "Layout"],
  ["motion", "Motion"],
] as const;

export default function DesignSystemPage() {
  return (
    <div className="pb-[var(--section-space)]">
      <header className="relative overflow-hidden py-10 md:py-14">
        <AmbientField tone="mixed" className="opacity-80" />
        <Container width="wide" className="relative">
          <GoldMarker>Internal · Development / QA</GoldMarker>
          <DisplayHeading size="display" className="mt-5 max-w-3xl text-left">
            Design System
          </DisplayHeading>
          <EditorialText size="large" className="mt-4 measure-body">
            Visual and interaction foundation for {siteConfig.name}&apos;s
            portfolio. Not linked in public navigation. Noindex. Excluded from
            sitemap.
          </EditorialText>
          <p className="type-technical mt-6 max-w-xl text-foreground-tertiary">
            Principle — Surface ≠ Card. Rounded materials earn their place
            through grouping, interaction, or elevation — never by default.
          </p>
          <nav
            aria-label="Design system sections"
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2"
          >
            {navItems.map(([href, label]) => (
              <a
                key={href}
                href={`#${href}`}
                className="type-technical text-foreground-secondary transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </Container>
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </header>

      <Container width="wide">
        <DesignBlock
          id="colors"
          label="01 / Color"
          title="Graphite palette with signal accents"
        >
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            <Swatch name="Background" token="--background" className="bg-background" />
            <Swatch
              name="Elevated"
              token="--background-elevated"
              className="bg-background-elevated"
            />
            <Swatch name="Surface" token="--surface" className="bg-surface" />
            <Swatch
              name="Foreground"
              token="--foreground"
              className="bg-foreground"
            />
            <Swatch name="Signal Red" token="--signal-red" className="bg-signal" />
            <Swatch
              name="Electric Gold"
              token="--electric-gold"
              className="bg-gold"
            />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <p className="type-label text-foreground">Primary text</p>
              <p className="type-body mt-3 text-foreground measure-body">
                I build interfaces that feel fast.
              </p>
            </div>
            <div>
              <p className="type-label text-foreground-secondary">Secondary text</p>
              <p className="type-body mt-3 text-foreground-secondary measure-body">
                Senior Frontend Engineer with 7.8 years of product experience.
              </p>
            </div>
            <div>
              <p className="type-label text-foreground-tertiary">Tertiary text</p>
              <p className="type-body mt-3 text-foreground-tertiary measure-body">
                React · TypeScript · React Native · Performance
              </p>
            </div>
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="typography"
          label="02 / Typography"
          title="Editorial hierarchy through Geist Sans"
        >
          <div className="space-y-10 text-left">
            <div>
              <p className="type-technical text-foreground-tertiary">display-xl</p>
              <p className="type-display-xl mt-3">
                I build interfaces
                <br />
                that feel fast.
              </p>
            </div>
            <div>
              <p className="type-technical text-foreground-tertiary">display</p>
              <p className="type-display mt-3">
                Designed beautifully.
                <br />
                Engineered responsibly.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="type-technical text-foreground-tertiary">h1 / body</p>
                <p className="type-h1 mt-3 max-w-[18ch]">
                  Frontend engineering is more than making screens look good.
                </p>
                <p className="type-body-large mt-5 text-foreground-secondary measure-body">
                  7.8 years turning complex products into high-performance digital
                  experiences.
                </p>
              </div>
              <div className="lg:pt-10">
                <p className="type-technical text-foreground-tertiary">labels</p>
                <p className="type-label mt-3 text-foreground-secondary">
                  Senior Frontend Engineer
                </p>
                <p className="type-technical mt-3">
                  <GoldHighlight>Technical · React · TypeScript</GoldHighlight>
                </p>
              </div>
            </div>
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="buttons"
          label="03 / Buttons"
          title="Signal action, restrained secondary"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Explore My Work</Button>
              <Button variant="secondary">View Résumé</Button>
              <IconButton label="Open command palette preview">
                <Command className="size-4" aria-hidden="true" />
              </IconButton>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled primary</Button>
              <Button variant="secondary" disabled>
                Disabled secondary
              </Button>
            </div>
          </div>
          <EditorialText className="mt-6" size="small">
            Primary uses same-family tonal depth and a soft top highlight — still
            reads as Signal Red. Gold is never CTA fill. Touch never depends on
            hover.
          </EditorialText>
          <div className="mt-6">
            <Button href={siteConfig.resumePath} variant="secondary">
              Open résumé asset
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="materials"
          label="04 / Materials"
          title="Liquid glass hierarchy"
        >
          <EditorialText className="mb-6" size="small">
            Tested over graphite, signal, gold, and live typography — not empty
            black. Soft nearly dissolves; Medium interacts; Strong separates.
          </EditorialText>
          <div className="relative overflow-hidden rounded-[var(--radius-32)]">
            <div className="absolute inset-0 bg-background-elevated" />
            <AmbientField tone="mixed" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-end p-6 md:p-10"
            >
              <p className="max-w-[12ch] type-display text-foreground/25">
                I build interfaces that feel fast.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-8 hidden type-technical text-foreground/20 md:block"
            >
              React
              <br />
              TypeScript
              <br />
              Performance
            </div>
            <div className="relative grid gap-4 p-4 md:grid-cols-3 md:p-6">
              {(
                [
                  [
                    "soft",
                    "Soft",
                    "Editorial veil. Minimal blur, tonal separation, almost dissolves into the page.",
                  ],
                  [
                    "medium",
                    "Medium",
                    "Interactive material. Clearer optical edge, modest depth, faint environmental pickup.",
                  ],
                  [
                    "strong",
                    "Strong",
                    "Premium floating UI. Specular highlight, directional luminosity, strongest separation.",
                  ],
                ] as const
              ).map(([strength, title, note]) => (
                <PremiumGlass key={strength} strength={strength} className="min-h-52">
                  <p className="type-label text-foreground">{title}</p>
                  <p className="type-body-small mt-3 text-foreground-secondary">
                    {note}
                  </p>
                </PremiumGlass>
              ))}
            </div>
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="surfaces"
          label="05 / Surfaces"
          title="Elevation without outlining everything"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Surface edge="specular">
              <SectionLabel>Specular edge · no grey outline</SectionLabel>
              <DisplayHeading as="h3" size="h3" className="mt-3">
                Engineer by profession. Designer by instinct.
              </DisplayHeading>
              <EditorialText className="mt-4">
                Surfaces earn borders. Prefer tonal difference and specular
                highlight when a full outline adds nothing.
              </EditorialText>
            </Surface>
            <div className="grid grid-cols-2 gap-3">
              {proofMetrics.map((metric) => (
                <Metric
                  key={metric.id}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Tag>React</Tag>
            <Tag tone="signal">Performance</Tag>
            <Tag tone="gold">Accessibility</Tag>
          </div>
          <Divider className="mt-8" label="Hairline separator" />
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="editorial"
          label="06 / Editorial Composition"
          title="Typography outside the SaaS grid"
        >
          <div className="relative overflow-hidden py-4 md:py-8">
            <AmbientField tone="graphite" className="opacity-70" />
            {/*
              Mobile: intentional vertical editorial stack
              Desktop: asymmetric left headline / right metadata + concepts
            */}
            <div className="relative flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:gap-16">
              <div>
                <SectionLabel>02 / Engineering</SectionLabel>
                <GoldRule className="mt-5" />
                <h3 className="type-display mt-6 text-left">
                  Frontend engineering
                  <br />
                  is more than making
                  <br />
                  screens look good.
                </h3>
              </div>
              <div className="flex flex-col gap-8 md:min-h-[18rem] md:justify-between md:gap-10 md:items-end md:pt-16">
                <p className="type-technical text-foreground-tertiary md:editorial-meta md:text-right">
                  Product systems
                  <br />
                  Hyderabad
                  <br />
                  2019 — Present
                </p>
                <ul className="space-y-3 md:space-y-4 md:text-right">
                  {["Accessibility", "Performance", "Architecture"].map(
                    (item, index) => (
                      <li
                        key={item}
                        className="type-h3 text-foreground-secondary"
                      >
                        <span className="mr-3 type-technical text-foreground-tertiary">
                          0{index + 1}
                        </span>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
            <p className="type-body-small relative mt-8 max-w-md text-foreground-tertiary md:mt-12">
              No containing card. Composition relies on measure, asymmetry,
              metadata alignment, and negative space. Mobile recomposes the
              hierarchy instead of shrinking the desktop layout.
            </p>
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="gold"
          label="07 / Gold Signal Language"
          title="Electric Gold as micro-signal"
        >
          <EditorialText className="mb-8" size="small">
            Gold marks focus, current state, progress, and tiny optical emphasis.
            Never large card fills, CTAs, or paragraph text.
          </EditorialText>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <p className="type-technical text-foreground-tertiary">Status dot</p>
              <div className="flex items-center gap-3">
                <GoldDot />
                <span className="type-body-small text-foreground-secondary">
                  Available for work
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="type-technical text-foreground-tertiary">Progress line</p>
              <GoldRule />
              <p className="type-body-small text-foreground-secondary">
                Accent / chapter rule
              </p>
            </div>
            <div className="space-y-3">
              <p className="type-technical text-foreground-tertiary">Current marker</p>
              <GoldMarker>Now · Turing</GoldMarker>
            </div>
            <div className="space-y-3">
              <p className="type-technical text-foreground-tertiary">
                Technical highlight
              </p>
              <p className="type-body-small text-foreground-secondary">
                Focus ring uses{" "}
                <GoldHighlight>Electric Gold</GoldHighlight> for keyboard
                attention.
              </p>
            </div>
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="layout"
          label="08 / Layout"
          title="Editorial container widths"
        >
          <div className="space-y-3">
            {(
              [
                ["readable", "Readable", "Long-form copy and case-study prose"],
                ["standard", "Standard", "Default section composition"],
                ["wide", "Wide", "Systems, grids, design tooling"],
                ["cinematic", "Cinematic", "Signature storytelling stages"],
              ] as const
            ).map(([width, title, note]) => (
              <div
                key={width}
                className="rounded-[var(--radius-20)] bg-[rgb(255_255_255_/_0.015)] py-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)]"
              >
                <Container width={width}>
                  <p className="type-label text-foreground">{title}</p>
                  <p className="type-body-small mt-1 text-foreground-secondary">
                    {note}
                  </p>
                </Container>
              </div>
            ))}
          </div>
        </DesignBlock>

        <Divider />

        <DesignBlock
          id="motion"
          label="09 / Motion"
          title="Foundation motion only"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeReveal>
              <div>
                <p className="type-label text-foreground">Fade reveal</p>
                <EditorialText className="mt-3">
                  Slightly damped opacity and 10px travel. Confident — not bouncy.
                </EditorialText>
              </div>
            </FadeReveal>
            <TextReveal className="type-h3 max-w-[16ch]">
              I build interfaces that feel fast.
            </TextReveal>
          </div>
          <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Micro 150ms", "Interface 420ms", "Cinematic 850ms"].map(
              (item) => (
                <StaggerItem key={item}>
                  <p className="type-body-small text-foreground-secondary">
                    {item}
                  </p>
                </StaggerItem>
              ),
            )}
          </StaggerGroup>
          <EditorialText className="mt-6" size="small">
            Reduced motion keeps opacity and short transitions while removing
            larger translations. Not every QA element animates.
          </EditorialText>
        </DesignBlock>
      </Container>
    </div>
  );
}
