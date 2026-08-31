import {createMDX} from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * Workflow lessons moved out of `training/` on 2026-08-31: they span the CRM,
 * the Proposal Engine and Presentations, so nesting them under CRM Training
 * labelled every one of them as a CRM lesson. Old links stay good.
 */
const WORKFLOW_LESSONS = ['rfp-to-win', 'client-presentations', 'tracked-client-link'];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return WORKFLOW_LESSONS.map((slug) => ({
      source: `/docs/training/workflows/${slug}`,
      destination: `/docs/workflows/${slug}`,
      permanent: true,
    })).concat([
      {source: '/docs/training/workflows', destination: '/docs/workflows', permanent: true},
    ]);
  },
};

export default withMDX(config);
