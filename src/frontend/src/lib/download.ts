import { API_BASE_URL } from "@/lib/api-client";

function getToken(): string | null {
  return localStorage.getItem("ices_token");
}

function normalizeUrl(path: string): string {
  if (path.startsWith("/api/")) return path;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}

function parseFilenameFromContentDisposition(value: string | null): string | null {
  if (!value) return null;
  // Basic support for: attachment; filename=foo.pdf
  const match = value.match(/filename="?([^"]+)"?/i);
  return match?.[1] ?? null;
}

export async function downloadFile(path: string, filenameFallback: string) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(normalizeUrl(path), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "Erreur de téléchargement" }));
    throw new Error(errorData.detail || "Erreur de téléchargement");
  }

  const blob = await res.blob();
  const contentDisposition = res.headers.get("Content-Disposition");
  const filename = parseFilenameFromContentDisposition(contentDisposition) ?? filenameFallback;

  const objectUrl = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

