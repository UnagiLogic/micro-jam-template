# Micro Jam #2: Escape!

## Theme: Escape something by clicking.

In Jam #1, we learned how to put a button on the screen. In Jam #2, that button is your only hope!

We are moving from "Just making it work" to "Making it feel something." Your goal is to turn a simple click interaction into a high-stakes escape sequence.

## The Challenge

You must use the provided 800x800 canvas and the module.js template to build a scene where the player is trying to escape a situation.

## You have 3 Specific Goals:

    1. Define the Threat: Decide what the player is escaping from. Is it a spaceship escaping a black hole? A hacker deleting their hard drive before the feds break in? A dog retreating into its "happy place" to escape a scary thunder noise?

    2. Design the "Button": Don't just draw a square. Make the clickable area represent the struggle. Is it a "Launch" key? A "Run" icon? A literal door handle?

    3. Simulate Progress: When the player clicks, something must happen to show progress. The escape isn't instant, it takes effort!

### Example Concepts

    The Sci-Fi Escape:

        Context: Your engine is failing, and the alien mothership is closing in.

        The Button: An "Emergency Warp" lever.

        The Increment: Every click charges the warp core by 5%. The screen shakes more as the charge gets higher.

    The Psychological Escape: (Example from the community)

        Context: An undead Lich is trying to possess a dog.

        The Button: A thought bubble of a "Safe Space."

        The Increment: Clicking pushes the dark fog (the Lich) away from the center of the screen. If you stop clicking, the fog comes back!

## Technical Requirements

    Files: You must work strictly inside module.js.

    Canvas Only: No HTML elements (no <button> tags). You must draw your button and detect clicks using coordinates.

    Win Condition: When the increment reaches 100% (or the goal), the game should visually change to show success (e.g., The ship flies away, the sun comes out).