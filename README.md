# Animation Recipes

## Reminder: When is CSS a better choice?

For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution. The strength of Motion is that it can do these simple kinds of animations but also scale to anything you can imagine. All with the same easy to write and maintain API.

## Animations with Motion

Remove any transition classes from Tailwind when using motion components.
From Tailwind V4 the colors use oklch by default which is not supported in Motion.

The main purpose of using motion is to use exit animations.
Sometimes using key prop to rerun the animation is enough. cf. `src/animations/price.tsx` example.

### Variants & Transitions

As a good practice, it's possible to define a state that will change the animation.
For example in our `src/animations/stepper.tsx` example in the parent element we have:

```typescript
<motion.div animate={status}>
```

And in the children we can define the variants (all children will be aware if the animate state changes from the parent):

```typescript
variants={{
  active: {
    scale: 1,
    transition: {
      delay: 0,
      duration: 0.3,
    },
  },
  complete: {
    scale: 1.25,
  },
}}
```

### Shared Transitions

When we have multiple animations running in sequence we want them to be synchronized.
To do so we can use the following component so each child will share the same transition.

```typescript
<MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.75, 0, 1] }}>
  {/* children */}
</MotionConfig>
```

It's still possible to override the transition in each child if needed.

### Exit Animations

One of the main features of Motion is the exit animation.
To do so we need to wrap the component with `AnimatePresence` and add the exit property to the motion component.

```typescript
<AnimatePresence initial={false}>
  <motion.div exit={{ opacity: 0 }} />
</AnimatePresence>
```

Most of the time we don't want the animation to run on the first render so we set `initial={false}` on the `AnimatePresence` component.
Make sure each child has a unique key so Motion can track them.

### Shared Layout Animation

When moving an element from one place to another we want the animation to be smooth.
`layoutId` prop can be used to link two elements together.
In the book example we pass: `layoutId={`book-cover-${book.isbn}`}` to both of selected and unselected book cover. So when the selected book changes the cover will animate to the new position.

cf. `src/animations/books.tsx` example.

# Keyframes

A trick with keyframes is omitting the `to` or `from` properties.
## Fade
```css
@keyframes fadeFromOpaque {
  from {
    opacity: 1;
  }
}

@keyframes fadeToOpaque {
  to {
    opacity: 1;
  }
}

@keyframes fadeFromTransparent {
  from {
    opacity: 0;
  }
}

@keyframes fadeToTransparent {
  to {
    opacity: 0;
  }
}
```

# Accessibility

Set `reducedMotion="user"` on `MotionConfig` to respect user preferences.

For tailwind use `motion-safe` and `motion-reduce` variants. Motion safe is used when the user  has not requested reduced motion, and motion reduce is used when the user has requested reduced motion.
eg. `motion-reduce:hidden` for `src/animations/components/shimmer-button.tsx`

For a hook cf. https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/ cf. example of usage in `src/animations/components/sparkle.tsx`

For reference motion has also its own hook: [useReducedMotion](https://motion.dev/docs/react-use-reduced-motion)
