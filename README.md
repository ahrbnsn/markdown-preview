# Markdown previewer

Handy when drafting some hot new thing. Even helpful editing tepid older things.

`yarn dev` starts the server

`$EDITOR pages/new-piece-of-lightning-fire.md`

In your favorite browser, navigate to `localhost:3000/new-piece-of-lightning-fire`

Hot reloading will update the browser page on every save.

# What

Built on [with-mdx](https://github.com/vercel/next.js/tree/canary/examples/with-mdx), this project adds basic styles, mimicking github's look & feel. It supports (limited) code block syntax highlighting courtesy of [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) and callout blocks courtesy of [remark-admonitions](https://github.com/elviswolcott/remark-admonitions)

# Why

I have been completely corrupted. Vim or bust. If I can't write in Vim, I sob. Gnash my teeth. In general, wallow in despair. I also, though, want pretty, stylized output & previews.

Last week, I would spam commits, refreshing Github's markdown viewer, pushing a new `git commit -m "oops small tweak` every 42 seconds. Rinse & repeat. It was excessive.

Now, I throw vim on half my screen, a browser on the other half, and happily type-tap my way to (hopeful) coherence, previewing my draft _before_ pushing up commits, tinkering & editing to my heart's content.

## Ready-made Alternatives

- [dillinger.io](https://dillinger.io/)
- [Bear](https://bear.app/)
- [iA Writer](https://ia.net/writer)
