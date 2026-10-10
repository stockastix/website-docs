import { loader } from "fumadocs-core/source";

// was // import { docs } from '@/.source';
import { defineDocs } from "fumadocs-mdx/macro";
const docs = defineDocs({
  dir: "content/docs",
});

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
