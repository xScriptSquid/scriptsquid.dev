import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entry = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writeups' }),
  schema: entry,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: entry.extend({
    stack: z.array(z.string()).default([]),
    problem: z.string().optional(),
    built: z.string().optional(),
    results: z.string().optional(),
    lessons: z.string().optional(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.enum(['network', 'terminal', 'shield']).optional(),
    order: z.number(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lead: z.string().optional(),
    pgpNote: z.string().optional(),
    pgp: z.string().optional(),
    terminal: z
      .array(
        z.object({
          command: z.string().max(32),
          output: z.string().max(36),
        }),
      )
      .optional(),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/roles' }),
  schema: z.object({
    title: z.string(),
    start: z.number().int(),
    end: z.number().int().optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/skills' }),
  schema: z.object({
    title: z.string(),
    note: z.string().max(60).optional(),
    items: z.array(z.string()).min(1),
    order: z.number(),
  }),
});

export const collections = { writeups, projects, services, pages, roles, skills };
