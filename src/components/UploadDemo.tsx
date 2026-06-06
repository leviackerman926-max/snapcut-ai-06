import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon, Sparkles, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Phase = "idle" | "ready" | "processing" | "done";

export function UploadDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Unsupported format. Use JPG, PNG or WEBP.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Max file size is 10MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPhase("ready");
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const process = () => {
    setPhase("processing");
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setPhase("done");
          toast.success("Background removed!");
          return 100;
        }
        return p + 8;
      });
    }, 120);
  };

  const reset = () => {
    setPhase("idle");
    setPreview(null);
    setProgress(0);
  };

  return (
    <div className="glass rounded-2xl p-6 shadow-glow">
      {phase === "idle" && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="group flex min-h-[340px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-background/40 p-10 text-center transition-all hover:border-primary/60 hover:bg-primary/5"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow transition-transform group-hover:scale-110">
            <Upload className="h-7 w-7 text-primary-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold">Drop an image to remove the background</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            JPG, PNG or WEBP &middot; up to 10MB &middot; max 5000&times;5000
          </p>
          <Button variant="hero" className="mt-6">
            <ImageIcon /> Choose file
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {phase !== "idle" && preview && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-border bg-[conic-gradient(at_50%_50%,#1a2440_25%,#0f1a30_25%_50%,#1a2440_50%_75%,#0f1a30_75%)] bg-[length:24px_24px]">
            <img src={preview} alt="Preview" className="mx-auto max-h-[420px] w-auto" />
            {phase === "processing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Removing background &middot; {progress}%</p>
                <div className="mt-3 h-1.5 w-56 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-brand transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Demo preview &middot; connect Cloudinary + AI API for live processing.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={reset}>New image</Button>
              {phase === "ready" && (
                <Button variant="hero" size="sm" onClick={process}>
                  <Sparkles /> Remove background
                </Button>
              )}
              {phase === "done" && (
                <Button variant="hero" size="sm">
                  <Download /> Download PNG
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
