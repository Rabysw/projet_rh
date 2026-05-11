import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/hooks/use-api";

export interface NotificationItem {
  type: string;
  message: string;
  date: string;
  lu: boolean;
}

const STORAGE_KEY = "ices_notifications_read_keys";

function notifKey(n: Pick<NotificationItem, "type" | "message" | "date">): string {
  // Stable, deterministic key without backend id
  return `${n.type}::${n.message}::${n.date}`;
}

function readReadKeys(): Set<string> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return new Set();
  try {
    const arr = JSON.parse(raw) as string[];
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function persistReadKeys(keys: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(keys)));
}

export function useNotifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readKeys, setReadKeys] = useState<Set<string>>(() => readReadKeys());

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFetch<NotificationItem[]>("/collaborateur/notifications");
      setItems(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const id = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const derived = useMemo(() => {
    const list = items.map((n) => {
      const key = notifKey(n);
      const isRead = n.lu || readKeys.has(key);
      return { ...n, lu: isRead, _key: key };
    });
    const unreadCount = list.filter((n) => !n.lu).length;
    return { list, unreadCount };
  }, [items, readKeys]);

  const markAsRead = (key: string) => {
    setReadKeys((prev) => {
      const next = new Set(prev);
      next.add(key);
      persistReadKeys(next);
      return next;
    });
  };

  const markAllAsRead = () => {
    setReadKeys((prev) => {
      const next = new Set(prev);
      for (const n of derived.list) next.add(n._key);
      persistReadKeys(next);
      return next;
    });
  };

  return {
    notifications: derived.list,
    unreadCount: derived.unreadCount,
    isLoading,
    error,
    refresh,
    markAsRead,
    markAllAsRead,
  };
}

