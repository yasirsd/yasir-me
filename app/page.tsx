import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "@/ui/container";
import { DisplayHeading } from "@/ui/display-heading";
import { EditorialText } from "@/ui/editorial-text";
import { SectionLabel } from "@/ui/section-label";
import { Button } from "@/ui/button";
import { Divider } from "@/ui/divider";

/**
 * Temporary Phase 1 homepage placeholder.
 * Final hero / sections arrive in later phases.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-dvh items-center py-[var(--section-space)]">
      <Container width="readable">
        <SectionLabel>Phase 1 · Foundation</SectionLabel>
        <DisplayHeading size="xl" className="mt-4">
          {siteConfig.name}
        </DisplayHeading>
        <EditorialText size="large" className="mt-4">
          {siteConfig.role}
        </EditorialText>
        <EditorialText className="mt-6">
          Production foundation is active. Visual QA lives on the internal
          design-system route while cinematic sections are built in later phases.
        </EditorialText>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/design-system">Open Design System</Button>
          <Button href={siteConfig.resumePath} variant="secondary">
            View Résumé
          </Button>
        </div>
        <Divider className="my-10" label="Internal" />
        <p className="type-body-small text-foreground-tertiary">
          Developers: evaluate tokens, type, glass, and motion at{" "}
          <Link
            href="/design-system"
            className="text-foreground underline decoration-border-strong"
          >
            /design-system
          </Link>
          . This route is noindex and excluded from the sitemap.
        </p>
      </Container>
    </div>
  );
}
