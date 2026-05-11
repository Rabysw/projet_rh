# ICES — Design Brief

## Tone
Refined, trustworthy, efficient. Professional enterprise HR platform commanding stability without sterility.

## Color Palette (OKLCH)
| Semantic | Light | Dark | Purpose |
| --- | --- | --- | --- |
| Primary | `0.32 0.15 254` (Navy) | `0.68 0.18 200` (Bright Blue) | Primary actions, navigation |
| Secondary | `0.85 0.08 60` (Warm Grey) | `0.32 0.05 254` (Dark Slate) | Secondary info, muted backgrounds |
| Accent | `0.58 0.22 200` (Teal) | `0.65 0.25 200` (Vibrant Cyan) | CTAs, highlights, active states |
| Destructive | `0.55 0.22 25` (Warm Red) | `0.65 0.19 22` (Red) | Delete, warnings |
| Foreground | `0.18 0.02 254` (Dark Navy) | `0.96 0.01 0` (Off-white) | Text, primary content |
| Muted | `0.88 0.05 70` (Light Warm) | `0.28 0.03 254` (Slate) | Secondary text, disabled states |

## Typography
**Display:** Space Grotesk (bold, geometric, distinctive) for headers and navigation  
**Body:** DM Sans (clean, neutral, highly readable) for content and form text  
**Mono:** System monospace for code and technical values  

## Structural Zones
| Zone | Surface | Border | Purpose |
| --- | --- | --- | --- |
| Header | Card: `1.0 0 0` light / `0.22 0.03 254` dark | Bottom border `--border` | Tenant/user info, logout |
| Sidebar | `0.96 0.01 0` light / `0.22 0.03 254` dark | Right border `--sidebar-border` | Navigation, collapsible at 768px |
| Main Content | `0.98 0.01 0` light / `0.15 0.02 254` dark | None | Content area background |
| Cards | `1.0 0 0` light / `0.22 0.03 254` dark | Subtle `--border` with `shadow-sm` | Dashboard metrics, data containers |
| Tables | `1.0 0 0` light / `0.22 0.03 254` dark | Row dividers `--border` | Employee lists, structured data |
| Form Inputs | `0.95 0.01 0` light / `0.32 0.03 254` dark | Focus ring `--ring` teal | Text fields, selects, interactive |

## Shape Language
- **Border Radius:** `10px` (0.625rem) default, `6px` (sm), `12px` (lg), `full` for avatars/badges  
- **Shadows:** `shadow-xs` (subtle elevation), `shadow-sm` (cards), no heavy shadows  
- **Spacing:** 4px grid (Tailwind default), 16px card padding, 24px section gaps  

## Component Patterns
- **Button:** Navy primary with white text, teal accent for secondary, warm grey for tertiary  
- **Badge:** Small pills with accent color for active status, warm for warning, red for delete  
- **Card:** White background with `border` and `shadow-sm`, warm grey divider lines  
- **Table Row:** Alternating `bg-muted/30` every other row, teal hover accent  
- **Form Input:** Subtle `bg-input` with `border`, focus ring teal  
- **Sidebar Link:** Navy primary on hover, accent underline when active  

## Motion
**Transition Smooth:** `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` — applied to hover states, form focus, sidebar collapse  
**Sidebar Collapse:** Smooth width transition at 768px breakpoint, icons only on mobile  

## Differentiation
Warm accent (teal) in micro-interactions humanizes enterprise UI. Intentional surface hierarchy—card elevation, border colors, and background depth layers prevent flat prototype feeling. Geometric Space Grotesk headers signal modern tech/HR leadership.

## Responsive
**Mobile-first approach:** Base design for mobile, enhanced at `md:` (768px) breakpoint.  
**Sidebar:** Collapsible icon-only at mobile, full width at md+  
**Table:** Horizontal scroll or card layout on mobile  
**Cards:** Full-width on mobile, grid layout at md+  

## Constraints
- No gradients, glows, or neon effects — clean CSS only  
- No arbitrary colors — all via OKLCH tokens in Tailwind config  
- Navy/teal is the only accent pop — all other UI is muted or neutral  
- High contrast text for accessibility (AA+ compliance built-in via OKLCH values)  
