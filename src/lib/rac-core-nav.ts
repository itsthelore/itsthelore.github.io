import { getCollection, render, type CollectionEntry } from 'astro:content';

export interface NavItem {
  slug: string;
  title: string;
  entry: CollectionEntry<'rac-core'>;
}

function titleFor(entry: CollectionEntry<'rac-core'>, headings: { depth: number; text: string }[]) {
  if (entry.data.title) return entry.data.title;
  if (entry.id === 'index') return 'Overview';
  return headings.find((h) => h.depth === 1)?.text ?? entry.id;
}

export async function buildRacCoreNav(): Promise<NavItem[]> {
  const entries = await getCollection('rac-core');
  const items = await Promise.all(
    entries.map(async (entry) => {
      const { headings } = await render(entry);
      return {
        slug: entry.id.replace(/\.md$/, ''),
        title: titleFor(entry, headings),
        entry,
      };
    }),
  );
  return items.sort((a, b) => a.title.localeCompare(b.title));
}
