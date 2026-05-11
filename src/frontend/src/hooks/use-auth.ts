import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { identity, loginStatus, login, clear, isAuthenticated } =
    useInternetIdentity();

  return {
    isAuthenticated,
    identity,
    loginStatus,
    login,
    logout: clear,
  };
}
