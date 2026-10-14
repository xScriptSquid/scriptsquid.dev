import { getCollection, type CollectionEntry } from 'astro:content';

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function collectTags(
  writeups: CollectionEntry<'writeups'>[],
): { slug: string; label: string }[] {
  const labels = new Map<string, string>();
  for (const writeup of writeups) {
    for (const tag of writeup.data.tags) {
      const slug = tagSlug(tag);
      if (!slug || labels.has(slug)) continue;
      labels.set(slug, tag);
    }
  }
  return [...labels.entries()]
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function readingLabel(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export async function getWriteups(): Promise<CollectionEntry<'writeups'>[]> {
  const writeups = await getCollection(
    'writeups',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return writeups.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getServices(): Promise<CollectionEntry<'services'>[]> {
  const services = await getCollection('services');
  return services.sort((a, b) => a.data.order - b.data.order);
}

export async function getRoles(): Promise<CollectionEntry<'roles'>[]> {
  const roles = await getCollection('roles');
  return roles.sort((a, b) => a.data.order - b.data.order);
}

export async function getSkills(): Promise<CollectionEntry<'skills'>[]> {
  const skills = await getCollection('skills');
  return skills.sort((a, b) => a.data.order - b.data.order);
}

export async function getLearning(): Promise<CollectionEntry<'learning'>[]> {
  const learning = await getCollection('learning');
  return learning.sort((a, b) => a.data.order - b.data.order);
}
