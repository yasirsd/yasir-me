import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Container } from "@/ui/container";
import { DisplayHeading } from "@/ui/display-heading";
import { EditorialText } from "@/ui/editorial-text";
import { SectionLabel } from "@/ui/section-label";
import { Tag } from "@/ui/tag";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

/**
 * Placeholder case-study route shell for later Phase 8 content.
 */
export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="py-[var(--section-space)]">
      <Container width="readable">
        <SectionLabel>Case study · Coming later</SectionLabel>
        <DisplayHeading size="h1" className="mt-4">
          {project.title}
        </DisplayHeading>
        <EditorialText className="mt-4">{project.summary}</EditorialText>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </Container>
    </div>
  );
}
