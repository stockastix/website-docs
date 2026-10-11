import { notFound } from "next/navigation";
import Link from "fumadocs-core/link";
import { getGithubLastEdit } from "fumadocs-core/content/github";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Card } from "fumadocs-ui/components/card";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";

import { XInput } from "@/app/components/XInput";
import { source } from "@/lib/source";

// For styling math in markdown
import "katex/dist/katex.css";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { body: MDX, title, description, toc, full } = page.data;

  const [category, name] = params.slug ?? [];
  const isTechnicalIndicatorPage = category === "indicators" && name;
  const editOnGithub = {
    owner: "stockastix",
    repo: "technical-indicators",
    sha: "main",
    path: `content/docs/${page.path}`,
  };
  const lastModifiedTime = isTechnicalIndicatorPage
    ? await getGithubLastEdit(editOnGithub)
    : null;

  return (
    <DocsPage
      breadcrumb={{ includeSeparator: true }}
      full={full}
      toc={toc}
      lastUpdate={lastModifiedTime ? new Date(lastModifiedTime) : undefined}
      editOnGithub={lastModifiedTime ? editOnGithub : undefined}
    >
      <DocsTitle>{title}</DocsTitle>
      {description && <DocsDescription>{description}</DocsDescription>}

      {isTechnicalIndicatorPage && (
        <Card title="" className="prose">
          <p style={{ fontSize: "2em" }}>
            <XInput>{name}</XInput>
            <XInput type="punct">(</XInput>
            &lt;<Link href="../expression">expression</Link>&gt;
            <XInput type="punct">,</XInput>
            &lt;<Link href=".">number</Link>&gt;
            <XInput type="punct">)</XInput>
          </p>
        </Card>
      )}

      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            code: XInput,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
