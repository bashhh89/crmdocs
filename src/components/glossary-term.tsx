const terms = {
  bidStatus: {
    label: 'Bid Status',
    definition:
      'Where a deal sits in the bid flow: RFP Received -> Scoping -> Bid Submitted -> Shortlisted -> Won, Lost, or No Bid',
  },
  pricingComplete: {
    label: 'Pricing Complete',
    definition:
      'A flag that flips automatically when the Proposal Engine generates a one-pager. Means the deal is ready to send.',
  },
  mirrorMode: {
    label: 'Mirror Mode',
    definition:
      'Proposal Engine feature that produces an exact-fidelity Excel-to-PDF proposal. Built because Natalia needed character-for-character fidelity.',
  },
  iotOperationsWorkspace: {
    label: 'IoT Operations Workspace',
    definition:
      'Spreadsheet-style Field Ops workspace in the Service Dashboard. Tracks displays, rack/device notes, IP details, walkthrough logs, maintenance.',
  },
  universalCrmPush: {
    label: 'Universal CRM Push',
    definition:
      'Auto-attach behavior. When Proposal Engine generates a proposal, SOW, or Excel, it automatically appears on the right deal in CRM.',
  },
  realTimeCrmSync: {
    label: 'Real-time CRM Sync',
    definition:
      'Every ticket, event, or workflow change in Service Dashboard appears in CRM in about 1 second.',
  },
  company: {
    label: 'Company',
    definition:
      'The CRM UI label for a client organization, venue owner, team, partner, or sponsor. This is the same business concept people may call an account.',
  },
} as const;

export function GlossaryTerm({ term }: { term: keyof typeof terms }) {
  const item = terms[term];

  return (
    <abbr
      title={item.definition}
      className="cursor-help decoration-dotted underline-offset-4"
    >
      {item.label}
    </abbr>
  );
}
