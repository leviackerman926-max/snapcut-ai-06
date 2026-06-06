import { Link } from "@tanstack/react-router";
import logo from "@/assets/snapcut-logo.asset.json";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo.url} alt="SnapCut AI" className="h-9 w-9 object-contain" />
          <span className="font-display text-lg font-bold tracking-tight">
            Snap<span className="text-gradient-brand">Cut</span> AI
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#api" className="hover:text-foreground transition-colors">API</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
          <Button variant="hero" size="sm">Get started</Button>
        </div>
      </div>
    </header>
  );
}
