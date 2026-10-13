"use client";

import ErrorBox from "@/components/ErrorBox";
import StatusBadge from "@/components/StatusBadge";
import { API_URL } from "@/lib/api";
import { useHealth } from "@/lib/useHealth";

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

export default function DashboardPage() {
  const { data, error, loading, reload } = useHealth();
  const state = loading ? "loading" : error ? "error" : "ok";

  const cards = data
    ? [
        { label: "Status", value: data.status.toUpperCase() },
        { label: "Service", value: data.service },
        { label: "Version", value: data.version },
        { label: "Python", value: data.python_version },
        { label: "Uptime", value: formatUptime(data.uptime_seconds) },
        { label: "Server time", value: new Date(data.timestamp).toLocaleString() },
      ]
    : [];

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 break-all text-sm text-slate-500">
            System status from <code className="rounded bg-slate-100 px-1">{API_URL}/api/health</code>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge state={state} />
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        {loading && !data && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-200" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorBox message={error} onRetry={reload} />}

        {data && (
          <>
            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              {data.message}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => (
                <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{c.label}</p>
                  <p className="mt-2 break-words text-xl font-semibold text-slate-900">{c.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
