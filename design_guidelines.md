# Todo Application Design Guidelines

## Design Approach
**Selected System:** Linear/Notion-inspired minimal productivity design
**Rationale:** Utility-focused productivity tool requiring clarity, efficiency, and clean information hierarchy. Drawing from modern task management applications like Linear and Todoist for their excellent balance of aesthetics and functionality.

## Core Design Elements

### Typography
- **Primary Font:** Inter or DM Sans via Google Fonts CDN
- **Heading (Todo App Title):** text-2xl font-semibold
- **Todo Items:** text-base font-medium
- **Todo IDs:** text-sm text-gray-500 font-mono
- **Input Placeholder:** text-sm font-normal

### Layout System
**Spacing Units:** Tailwind classes using 2, 4, 6, 8, 12, and 16 (e.g., p-4, gap-6, mb-8)

**Container Structure:**
- Max width: max-w-2xl mx-auto
- Vertical padding: py-12 (desktop), py-8 (mobile)
- Horizontal padding: px-4

### Component Library

**Main Container**
- Centered layout with max-w-2xl
- White/neutral background card with subtle shadow (shadow-sm)
- Rounded corners: rounded-lg
- Padding: p-8

**Header Section**
- App title with icon (Heroicons check-circle)
- Margin bottom: mb-8
- Flex layout with items-center and gap-3

**Input Form**
- Flex container with gap-2 (responsive: flex-col sm:flex-row)
- Input field: Full width on mobile, flex-1 on desktop
- Input styling: border rounded-md px-4 py-2.5, focus ring
- Button: Solid fill, px-6 py-2.5, rounded-md, medium weight text

**Todo List**
- Vertical stack with gap-2
- Each todo item: Card-style with border, rounded-md, p-4
- Hover state: subtle background change
- Layout: Flex row with items-center justify-between
- ID badge: Inline mono font, smaller text, muted color

**Empty State**
- Centered text when no todos exist
- Icon (Heroicons clipboard-document-list)
- Subtle gray text suggesting first action

### Interactions
- Input focus: Visible focus ring
- Button: Scale on active (active:scale-95), no hover color changes
- Todo items: Subtle hover background transition

### Accessibility
- Semantic HTML (form, button, ul/li structure)
- Proper labels for input field
- Focus indicators on all interactive elements
- ARIA labels where appropriate

## Images
No images required for this productivity application. Use Heroicons for iconography only.