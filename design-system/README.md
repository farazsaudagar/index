# Design System

A reusable, themeable design system for the BookHouse application.

## Structure

### Tokens (`tokens.ts`)

Centralized design values:

- **Colors**: Base, accent, surface, and gradient colors
- **Spacing**: Consistent spacing scale (xs to 4xl)
- **Sizes**: Component sizes (books, buttons, avatars)
- **Border Radius**: Standard border radius values
- **Shadows**: Shadow definitions for different components
- **Typography**: Font families, sizes, and weights
- **Transitions**: Duration and easing values

### Utilities

- `colorMix()`: Helper for CSS `color-mix()` with opacity
- `shadowString()`: Generate shadow strings from token definitions
- `innerShadowString()`: Generate inset shadow strings

### Primitives

Reusable components in `primitives/`:

- **Avatar**: User avatar with optional username inline
- **IconButton**: Icon button with variants (default, ghost, overlay)
- **ShelfPlank**: Shelf container component with shadows and bevels
- **BookDeck**: Inner book deck container with background styling
- **Typography**: Typography component with semantic variants (h1, h2, h3, body, caption)

## Usage

### Importing

```typescript
// Import all tokens
import { colors, sizes, spacing, typography, transitions } from "@/design-system/tokens";

// Import utilities
import { colorMix, shadowString } from "@/design-system/tokens";

// Import primitives
import { Avatar, IconButton, ShelfPlank, BookDeck, Typography } from "@/design-system/primitives";

// Or from the main index
import { Avatar, colorMix, sizes } from "@/design-system";
```

### Examples

#### Using Tokens

```typescript
import { sizes, spacing, colorMix } from "@/design-system/tokens";

const bookWidth = sizes.bookWidth; // 85px
const gap = spacing.md; // "12px"
const shadow = colorMix("var(--accent-deep)", 10); // CSS color-mix string
```

#### Using Primitives

```typescript
import { Avatar, Typography } from "@/design-system/primitives";

<Avatar size="medium" username="Reader" showUsername />
<Typography variant="h1">Title</Typography>
```

#### Composing Components

```typescript
import { ShelfPlank, BookDeck, Avatar, IconButton } from "@/design-system/primitives";
import { ChevronRight } from "lucide-react";

<ShelfPlank hoverable>
  <div className="flex items-center justify-between">
    <Avatar username="Reader" showUsername />
    <BookDeck width={340}>
      {/* Books */}
    </BookDeck>
    <IconButton
      icon={ChevronRight}
      onClick={handleClick}
      aria-label="More books"
    />
  </div>
</ShelfPlank>
```

## Theming

All colors use CSS custom properties defined in `globals.css`. To theme the application:

1. Update CSS variables in `app/globals.css`
2. Components automatically use the new values
3. Design tokens reference these variables, ensuring consistency

## Component Layer Classes

Semantic, reusable Tailwind classes defined in `@layer components` (`app/globals.css`):

### Button Classes
- `.btn-icon` - Base icon button styles
- `.btn-icon-disabled` - Disabled state
- `.btn-icon-enabled` - Enabled state

### Layout Classes
- `.container-shelf-wrapper` - Shelf card outer wrapper
- `.container-shelf-responsive` - Responsive shelf container widths
- `.container-shelf-section` - Section container
- `.layout-flex-center` - Flex with items-center and justify-between
- `.layout-flex-row` - Horizontal flex with gap-6
- `.layout-flex-col-tall` - Tall column layout for shelf cards
- `.layout-book-deck` - Book deck container layout
- `.layout-loading` - Loading state container
- `.layout-grid-shelves` - Grid layout for shelf cards

### Shelf Classes
- `.shelf-plank-base` - Base shelf plank styling
- `.shelf-plank-hoverable` - Hoverable shelf plank
- `.shelf-wall-shadow` - Wall cast shadow element
- `.shelf-top-bevel` - Top bevel/shine effect
- `.shelf-section-plank` - Section shelf plank
- `.shelf-section-bevel` - Section shelf bevel
- `.shelf-book-area` - Book area background
- `.shelf-fade-overlay` - Fade overlay for book carousels

### Input Classes
- `.input-search` - Search input styling
- `.icon-position-search` - Search icon positioning

### Navigation Classes
- `.nav-link` - Navigation link styling

### Utility Classes
- `.fade-gradient-right` - Fade gradient overlay

## Usage Examples

```typescript
// Instead of long className strings
<div className="relative mt-6 flex justify-center">
  <div className="w-[95%] sm:w-[88%] md:w-[85%] lg:w-[82%] xl:w-[92%] transition-all duration-200">

// Use semantic classes
<div className="container-shelf-wrapper">
  <div className="container-shelf-responsive">
```

## Benefits

- **Reusability**: Components can be used across different pages
- **Consistency**: Centralized tokens ensure visual consistency
- **Themeability**: Easy to change themes via CSS variables
- **Maintainability**: Single source of truth for design values
- **Type Safety**: Full TypeScript support
- **Testability**: Primitives can be tested in isolation
- **Semantic Classes**: Long className combinations replaced with semantic names
- **DRY Principle**: Define once, use everywhere

