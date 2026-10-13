export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export type HealthResponse = {
  status: string;
  message: string;
  service: string;
  version: string;
  python_version: string;
  uptime_seconds: number;
  timestamp: string;
};

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/health`, { cache: "no-store", signal });
  } catch (err) {
    if (signal?.aborted) throw err;
    throw new Error(`Cannot connect to backend at ${API_URL}. Is it running?`);
  }
  if (!res.ok) {
    throw new Error(`Backend responded with HTTP ${res.status}`);
  }
  return (await res.json()) as HealthResponse;
}
