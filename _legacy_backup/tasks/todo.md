# Todo: Implement 6-Stage Scroll-Driven Process Section

## Problem Analysis
- User wants to showcase 6-stage manufacturing process
- Images should transition as user scrolls (Apple-style)
- Include progress timeline with orange line and Charpak logo markers
- Use placeholder images for now (can be replaced later)

## Current State
- Website has hero section, markets grid, and sustainability section
- JavaScript already has scroll animation capabilities (IntersectionObserver)
- Need to add new section between Markets and Sustainability

## The 6 Stages
1. **Stage 1:** The Design Brief
2. **Stage 2:** Concept Development
3. **Stage 3:** Prototypes & Samples
4. **Stage 4:** Tooling & Engineering
5. **Stage 5:** Production & Quality
6. **Stage 6:** Product Distribution

## Plan

### Todo Items
- [x] 1. Find insertion point in HTML (between Markets and Sustainability sections)
- [x] 2. Create HTML structure for process section with 6 image layers
- [x] 3. Add CSS styling for scroll-driven transitions
- [x] 4. Add progress timeline with orange line and stage markers
- [x] 5. Add JavaScript scroll handler to transition images
- [x] 6. Test scroll behavior and transitions

## Notes
- Keep changes minimal and simple
- Use placeholder images from Unsplash
- Orange color for timeline: #FF6B35
- Each stage gets ~600px of scroll height
- Images fade based on scroll position
- Easy to replace placeholder images later

## Review

### Summary of Changes

All tasks completed successfully. The website now has an Apple-style scroll-driven 6-stage process section.

**1. New Process Section**
- Added between Markets grid and Sustainability sections
- Full-screen sticky background with 6 layered images
- 3600px total height (600px per stage)
- Uses placeholder Unsplash images (easily replaceable)

**2. Progress Timeline**
- Orange horizontal line (#FF6B35) with 6 stage markers
- Each marker contains Charpak logo in white circle
- Active stage highlights in full opacity
- Inactive stages shown at 50% opacity

**3. Scroll-Driven Image Transitions**
- Images fade smoothly as user scrolls through section
- Calculates scroll progress (0-100%) through the 3600px section
- Each stage gets ~16.6% of scroll range (600px)
- Stage 1: 0-16% → Stage 2: 17-33% → etc.

**4. Dynamic Stage Information**
- Stage number and title update based on scroll position
- 6 stage titles:
  1. The Design Brief
  2. Concept Development
  3. Prototypes & Samples
  4. Tooling & Engineering
  5. Production & Quality
  6. Product Distribution

**5. Blue Overlay**
- Maintains brand consistency with hero section
- Gradient overlay: `rgba(10,35,66,0.85)` to `rgba(28,78,128,0.75)`
- Ensures text remains readable

**6. JavaScript Implementation**
- Throttled scroll listener for performance
- Uses requestAnimationFrame for smooth 60fps updates
- Calculates scroll progress relative to section height
- Updates active image, stage info, and timeline markers

### Files Modified
- `index.html` - Added CSS (lines 265-409) and HTML section (lines 538-601)
- `assets/js/main.js` - Added scroll handler (lines 54-122)

### Impact
- ~145 lines CSS
- ~65 lines HTML
- ~70 lines JavaScript
- Total: ~280 lines of clean, simple code
- Zero external dependencies
- Fully responsive with mobile breakpoints

### Technical Details
- Section height: 3600px (allows smooth scrolling through 6 stages)
- Sticky positioning: Background stays fixed while scrolling
- Scroll calculation: `-rect.top / (sectionHeight - viewportHeight)`
- Image transitions: CSS opacity with 0.5s ease-in-out
- Performance: Passive scroll listener + throttling via requestAnimationFrame

### How to Replace Placeholder Images
Simply update the 6 background-image URLs in lines 542-547 of index.html:
```html
<div class="process-image active" style="background-image: url('YOUR_IMAGE_PATH_HERE');"></div>
```

Recommended image specs:
- Format: JPG or WebP
- Dimensions: 1920x1080px or larger
- File size: <500KB each (compressed)
- Subject: Manufacturing/process-related imagery
