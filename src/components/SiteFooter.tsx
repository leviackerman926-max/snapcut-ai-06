import logo from "@/assets/snapcut-logo.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logo.url} alt="" className="h-7 w-7" />
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SnapCut AI &middot; Remove backgrounds in one click
          </span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
