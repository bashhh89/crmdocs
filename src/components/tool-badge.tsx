type Tool = 'proposals' | 'crm' | 'services' | 'connected';

const styles: Record<Tool, { label: string; className: string }> = {
  proposals: {
    label: 'PROPOSALS',
    className: 'bg-[#dbeafe] text-[#1e40af]',
  },
  crm: {
    label: 'CRM',
    className: 'bg-[#dcfce7] text-[#166534]',
  },
  services: {
    label: 'SERVICES',
    className: 'bg-[#ffedd5] text-[#9a3412]',
  },
  connected: {
    label: 'CONNECTED',
    className: 'bg-[#f3e8ff] text-[#7c3aed]',
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
