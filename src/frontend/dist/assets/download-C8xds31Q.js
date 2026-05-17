import { a6 as API_BASE_URL } from "./index-BeBYdaDm.js";
function getToken() {
  return localStorage.getItem("ices_token");
}
function normalizeUrl(path) {
  if (path.startsWith("/api/")) return path;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}
function parseFilenameFromContentDisposition(value) {
  if (!value) return null;
  const match = value.match(/filename="?([^"]+)"?/i);
  return (match == null ? void 0 : match[1]) ?? null;
}
async function downloadFile(path, filenameFallback) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(normalizeUrl(path), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
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
export {
  downloadFile
};
