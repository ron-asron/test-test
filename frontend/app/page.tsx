"use client";

import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { useHealth } from "@/lib/useHealth";

export default function HomePage() {
  const { data, error, loading, reload } = useHealth();
  const state = loading ? "loading" : error ? "error" : "ok";

  return (
    <section className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
        test
      </h1>
      <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
        A simple web application built with Next.js and FastAPI.
      </p>

      <div className="mt-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Message from backend
          </h2>
          <StatusBadge state={state} />
        </div>
        <div className="mt-4 min-h-[3rem] text-left">
          {loading && <p className="animate-pulse text-slate-400">Loading…</p>}
          {!loading && error && (
            <div className="text-rose-700">
              <p className="text-sm">{error}</p>
              <button
                type="button"
                onClick={reload}
                className="mt-2 text-sm font-medium text-indigo-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}
          {!loading && data && <p className="text-lg font-medium text-slate-800">{data.message}</p>}
        </div>
      </div>

      <Link
        href="/dashboard"
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
      >
        Open Dashboard
      </Link>
    </section>
  );
}
