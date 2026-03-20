const colorGroups = [
  {
    label: 'Surface',
    tokens: [
      { name: '--background', value: 'oklch(0.952 0.009 255)' },
      { name: '--card', value: 'oklch(0.982 0.004 255)' },
      { name: '--popover', value: 'oklch(0.982 0.004 255)' },
    ],
  },
  {
    label: 'Contenu',
    tokens: [
      { name: '--foreground', value: 'oklch(0.254 0.029 254)' },
      { name: '--card-foreground', value: 'oklch(0.254 0.029 254)' },
      { name: '--muted-foreground', value: 'oklch(0.527 0.014 257)' },
    ],
  },
  {
    label: 'Interactif',
    tokens: [
      { name: '--primary', value: 'oklch(0.790 0.117 245)' },
      { name: '--secondary', value: 'oklch(0.934 0.043 245)' },
      { name: '--accent', value: 'oklch(0.868 0.165 84)' },
      { name: '--destructive', value: 'oklch(0.577 0.245 27.325)' },
    ],
  },
  {
    label: 'Structure',
    tokens: [
      { name: '--border', value: 'oklch(0.877 0.013 254)' },
      { name: '--input', value: 'oklch(0.877 0.013 254)' },
      { name: '--ring', value: 'oklch(0.790 0.117 245)' },
      { name: '--muted', value: 'oklch(0.877 0.013 254)' },
    ],
  },
]

export function ColorsSection() {
  return (
    <div className="flex flex-col gap-8">
      {colorGroups.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">
            {group.label}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.tokens.map((token) => (
              <div key={token.name} className="flex flex-col gap-2">
                <div
                  className="h-16 rounded-xl border border-border shadow-[var(--shadow-neo-sm)]"
                  style={{ background: `var(${token.name})` }}
                />
                <div>
                  <p className="text-xs font-mono font-medium text-foreground">{token.name}</p>
                  <p className="text-xs font-mono text-muted-foreground truncate">{token.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        Note : <code className="font-mono">--border</code>, <code className="font-mono">--input</code> et{' '}
        <code className="font-mono">--muted</code> partagent la même valeur OKLCh par design.
      </p>
    </div>
  )
}
