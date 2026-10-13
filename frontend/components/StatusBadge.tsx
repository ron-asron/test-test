type Props = { state: "loading" | "ok" | "error" };

const styles = {
  loading: { dot: "bg-amber-400 animate-pulse", text: "text-amber-700 bg-amber-50", label: "Checking" },
  ok: { dot: "bg-emerald-500", text: "text-emerald-700 bg-emerald-50", label: "Online" },
  error: { dot: "bg-rose-500", text: "text-rose-700 bg-rose-50", label: "Offline" },
};

export default function StatusBadge({ state }: Props) {
  const s = styles[state];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${s.text}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
