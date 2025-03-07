import { notFound } from "next/navigation";
import { getGithubLastEdit } from "fumadocs-core/server";
import defaultMdxComponents from "fumadocs-ui/mdx";
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
  const isTechnicalIndicatorPage = category === "technical-indicators" && name;
  const editOnGithub = {
    owner: "stockastix",
    repo: "technical-indicators",
    sha: "main",
    // file path, make sure it's valid
    path: `content/docs/${page.file.path}`,
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
