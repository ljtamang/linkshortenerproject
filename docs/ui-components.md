# UI Components

## shadcn/ui Only

All UI elements in this app must use **shadcn/ui** components. Do not hand-write custom components for things shadcn/ui already provides (buttons, inputs, dialogs, dropdowns, cards, forms, etc.).

- Add new primitives with `npx shadcn add <component>` — never create files under `components/ui/*` by hand.
- Before building any UI element, check the [shadcn/ui registry](https://ui.shadcn.com/docs/components) for an existing component first.
- Compose app-specific UI (e.g. `components/`) out of `components/ui/*` primitives rather than writing raw HTML elements with custom styling.
- Use the `cn` helper from `@/lib/utils` for conditional/merged class names, matching the pattern shadcn components already use.

## Configuration

Component generation is controlled by [components.json](../components.json):

- Style: `base-nova`, base color `neutral`, Tailwind CSS variables enabled.
- Icon library: `lucide` — use `lucide-react` icons, not other icon sets.
- Aliases: import primitives via `@/components/ui`, not relative paths.

## Styling

- Use Tailwind CSS v4 utility classes for layout/spacing/one-off styling; rely on the shadcn component's built-in variants (e.g. `variant`, `size` props) instead of overriding internals with custom CSS.
- Don't introduce another component/styling library (Material UI, Chakra, Bootstrap, styled-components, etc.) alongside shadcn/ui.
