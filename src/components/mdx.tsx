import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AudioPlayer } from '@/components/audio-player';
import { GuidedSim } from '@/components/guided-sim';
import { Shot } from '@/components/shot';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    AudioPlayer,
    GuidedSim,
    Shot,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
