import type {BaseLayoutProps} from 'fumadocs-ui/layouts/shared';
import {appName, gitConfig} from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span style={{fontWeight: 700, letterSpacing: '-0.01em', fontSize: '1rem'}}>
          {appName}
        </span>
      ),
      transparentMode: 'top',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'CRM',
        url: '/docs/user-guide/introduction',
      },
      {
        text: 'Proposal Engine',
        url: '/docs/proposal-engine/introduction',
      },
      {
        text: 'Service Dashboard',
        url: '/docs/service-dashboard/introduction',
      },
      {
        text: 'Developers',
        url: '/docs/operators/overview',
      },
      {
        type: 'button',
        text: 'Open CRM',
        url: 'https://crm.ancsports.net',
        external: true,
      },
    ],
  };
}
