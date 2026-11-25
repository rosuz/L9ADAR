# Design System: L9aDar Illustrated Login

## 1. Visual Theme & Atmosphere
A calm student-housing interface that preserves the supplied split-screen composition: brand and language navigation above, editorial promise with a bedroom illustration on the left, and a focused login form on the right. Density 4, variance 4, motion 2.

## 2. Color Palette & Roles
- **Ivory Canvas** (#F8FAF6) — calm page background
- **Paper Surface** (#FFFFFF) — input surfaces
- **Charcoal Ink** (#18211C) — primary text
- **Quiet Sage** (#606B64) — supporting copy
- **Forest Accent** (#397158) — the single accent for buttons, focus, links, and illustration details
- **Sage Border** (#DCE5DE) — structural dividers and input borders

## 3. Typography Rules
- **Display and body:** Outfit — tight display tracking, relaxed body leading, weight-led hierarchy
- Body copy stays below 65 characters per line; labels remain explicit above inputs
- Never use Inter or a generic serif

## 4. Component Stylings
- **Buttons:** Forest fill, 13px radius, no glow, subtle downward press on active
- **Inputs:** Paper fill, 13px radius, forest focus ring, explicit accessible labels; browser-native validation
- **Illustration:** Flat editorial room vignette in forest, sage, and ivory; transparent background; no text inside the asset

## 5. Layout Principles
Preserve the reference layout: story and illustration on the left, login form on the right, separated by one hairline divider. Keep the three benefits beneath the room illustration. Collapse to one column below 900px. Keep controls at least 44px tall and avoid page-level horizontal overflow.

## 6. Motion & Interaction
Keep motion nearly invisible: focus and button states respond within 200ms and only button presses use transform.

## 7. Anti-Patterns (Banned)
No emojis, pure black, neon glows, gradients, generic names, overlapping content, three-card rows, custom cursors, filler instructions, or AI copywriting clichés.
