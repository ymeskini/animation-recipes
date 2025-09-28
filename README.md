# Animation Recipes

## Reminder: When is CSS a better choice?

For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution. The strength of Motion is that it can do these simple kinds of animations but also scale to anything you can imagine. All with the same easy to write and maintain API.

## Animations with Motion

Remove any transition classes from Tailwind when using motion components.
From Tailwind V4 the colors use oklch by default which is not supported in Motion.

The main purpose of using motion is to use exit animations.
Sometimes using key prop to rerun the animation is enough. cf. `src/animations/price.tsx` example.
