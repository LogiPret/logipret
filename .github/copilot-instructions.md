# Website Development Guidelines

IMPORTANT DO NOT DO THE SLOPPY AI SLOPPY STUFF. FOLLOW THESE GUIDELINES EXACTLY AS WRITTEN. FAILURE TO COMPLY WILL RESULT IN REJECTION OF PULL REQUESTS.

NEVER PASTE COMMANDS IN TERMINAL TO EDIT OR CREATE CODE, USE YOUR DEDICATED COPILOT TOOLS

## Language Requirements (CRITICAL)

**All website content MUST be written in English.** This includes:

- Page titles and headings
- Button labels and CTAs
- Navigation items
- Form labels and placeholders
- Error messages
- Alt text for images
- Meta descriptions

## Component Reusability (CRITICAL)

### Rule 1: Use Existing Components

Before creating ANY UI element, check `src/components/ui/`:

- `Button` - All buttons (primary, secondary, outline, ghost, danger)
- `Card` - All card containers
- `Input` - All form inputs
- `Container` - Page width wrapper
- `Section` - Page sections with spacing
- `Badge` - Status/tag indicators

**NEVER create duplicate button/card/input styles. Use variants instead.**

### Rule 2: Extend, Don't Duplicate

If a component needs a new variant:

1. Add the variant to the existing component
2. Update the types
3. Document in context/components.md

Bad:

```tsx
// Creating a new button file for a different style
<button className="bg-green-500...">Save</button>
```

Good:

```tsx
import { Button } from "@/components/ui";
<Button variant="primary">Save</Button>;
```

### Rule 3: Component Composition

Build complex UI by composing simple components:

```tsx
<Card>
  <CardTitle>Title</CardTitle>
  <CardContent>Content</CardContent>
  <Button>Action</Button>
</Card>
```

## Code Style

never use npm, always use pnpm

### Comments

- Only add comments for complex business logic
- No comments for obvious operations
- No comments for every line
- Use descriptive function/variable names instead

Bad:

```tsx
// Set the loading state to true
setLoading(true)
// Fetch the data
const data = await fetch(...)
// Set loading to false
setLoading(false)
```

Good:

```tsx
setLoading(true);
const data = await fetchUserData(userId);
setLoading(false);
```

### File Organization

```
src/
  components/
    ui/           # Reusable primitives (Button, Card, Input)
    layout/       # Layout components (Header, Footer)
    sections/     # Page sections (Hero, Features, CTA)
  app/            # Next.js pages
  lib/            # Utilities
```

### Imports

Always use the barrel export:

```tsx
import { Button, Card, Input } from "@/components/ui";
```

## Before Creating New Components

1. Check if it exists in `src/components/ui/`
2. Check if a variant can be added to existing component
3. Check `context/components.md` for component documentation
4. Only create new component if truly unique

## Tailwind Guidelines

- Use design tokens from tailwind.config.js (primary-500, etc.)
- Prefer utility classes over custom CSS
- Use responsive prefixes (md:, lg:) consistently
- Keep className strings readable (use cn() for conditionals)

## Page Structure

Every page should follow:

```tsx
import { Section, Container } from "@/components/ui";

export default function Page() {
  return (
    <>
      <Section spacing="lg">
        <Container>{/* Content */}</Container>
      </Section>
    </>
  );
}
```
