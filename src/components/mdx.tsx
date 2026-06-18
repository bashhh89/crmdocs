import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AudioPlayer } from '@/components/audio-player';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    AudioPlayer,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
