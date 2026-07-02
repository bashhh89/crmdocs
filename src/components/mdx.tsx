import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AudioPlayer } from '@/components/audio-player';
import { GlossaryTerm } from '@/components/glossary-term';
import { GuidedSim } from '@/components/guided-sim';
import { OhShit } from '@/components/oh-shit';
import { Shot } from '@/components/shot';
import { DecisionTree, KeyTakeaways, KnowledgeCheck, LessonMeta, PracticeChecklist, PromptCard, ScenarioBoard, WorkflowMap } from '@/components/training-visual';
import { ToolBadge, WhereThisLives } from '@/components/tool-badge';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    AudioPlayer,
    GlossaryTerm,
    GuidedSim,
    OhShit,
    DecisionTree,
    KeyTakeaways,
    KnowledgeCheck,
    LessonMeta,
    PracticeChecklist,
    PromptCard,
    ScenarioBoard,
    Shot,
    ToolBadge,
    WorkflowMap,
    WhereThisLives,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
