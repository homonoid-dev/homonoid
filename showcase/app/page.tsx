export default function Page() {
  return (
    <div className="p-8 max-w-4xl space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Harmonia Component System</h1>
        <p className="text-muted mt-2">
          Scroll down to see the main content smoothly flow underneath the frosted glass header.
        </p>
      </div>

      {Array.from({ length: 10 }, (_, i) => (
        <section
          key={i}
          className="p-6 rounded-xl border border-border/50 bg-surface/50 space-y-3"
        >
          <h2 className="text-xl font-semibold">Section {i + 1}</h2>
          <p className="text-sm text-muted leading-relaxed">
            Continuity, token-driven theming, and physics-based interactions. As you scroll, this content passes directly behind the frosted glass header, blurring with the background chroma theme.
          </p>
        </section>
      ))}
    </div>
  );
}
