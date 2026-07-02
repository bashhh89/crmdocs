type Tool = 'proposals' | 'crm' | 'services' | 'connected';

const styles: Record<Tool, { label: string; className: string }> = {
  proposals: {
    label: 'PROPOSALS',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
  },
  crm: {
    label: 'CRM',
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
  },
  services: {
    label: 'SERVICES',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
  },
  connected: {
    label: 'CONNECTED',
    className: 'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200',
  },
};

export function ToolBadge({ tool, children }: { tool: Tool; children?: string }) {
  const config = styles[tool];

  return (
    <span
      className={`ml-2 inline-block rounded px-2 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {children ?? config.label}
    </span>
  );
}

export function WhereThisLives({ tool, path }: { tool: Tool; path: string }) {
  return (
    <div className="my-4 rounded-lg border bg-fd-card p-3 text-sm">
      <span className="font-semibold">Where this lives:</span>
      <ToolBadge tool={tool} /> <span className="text-fd-muted-foreground">{path}</span>
    </div>
  );
}
