import { useIcesAuth } from "@/hooks/use-ices-auth";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { logout, user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userText = user
    ? user.full_name
    : null;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-card px-4 shadow-sm sm:px-6">
      {/* Left: mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors lg:hidden"
          aria-label="Open sidebar"
          data-ocid="header.menu_button"
        >
          <Menu size={20} />
        </button>
        <span className="hidden sm:block font-display font-semibold text-foreground text-base">
          {config?.company_name || "ICES"}
        </span>
        <span className="hidden sm:block text-muted-foreground">·</span>
        <span className="hidden sm:block text-sm text-muted-foreground font-medium">
          HR Platform
        </span>
      </div>

      {/* Right: user menu + logout */}
      <div className="flex items-center gap-2">
        {user && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              data-ocid="header.user_menu_button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                <User size={14} className="text-primary" />
              </div>
              <span className="hidden sm:block max-w-[120px] truncate">
                {userText}
              </span>
              <ChevronDown
                size={14}
                className={cn(
                  "text-muted-foreground transition-transform duration-200",
                  dropdownOpen && "rotate-180",
                )}
              />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                  onKeyDown={(e) =>
                    e.key === "Escape" && setDropdownOpen(false)
                  }
                  aria-hidden="true"
                />
                <div
                  className="absolute right-0 z-20 mt-2 w-52 origin-top-right rounded-xl border border-border bg-card shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150"
                  data-ocid="header.user_dropdown"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs text-muted-foreground">
                      Connecté en tant que
                    </p>
                    <p className="text-sm font-medium text-foreground truncate mt-0.5">
                      {user.full_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-primary font-medium mt-1">
                      {user.role === "admin_rh" && "Admin RH"}
                      {user.role === "direction" && "Direction"}
                      {user.role === "resp_rh" && "Responsable RH"}
                      {user.role === "manager" && "Manager"}
                      {user.role === "collaborateur" && "Collaborateur"}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      data-ocid="header.logout_button"
                    >
                      <LogOut size={14} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
