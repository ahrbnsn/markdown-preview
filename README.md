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

Last week, I would spam commits, refreshing Github's markdown viewer, pushing a new `git commit -m "oops small tweak"` every 42 seconds. Rinse & repeat. Excessive.

Now, I throw vim on half my screen, a browser on the other half, and happily type-tap my way to (hopeful) coherence, previewing my draft _before_ pushing up commits, tinkering & editing to my heart's content.

# Helpers

## Adding Table of Contents

`yarn addToc {filename}` will automatically replace the table of contents TOC in any file with a `toc` code comment:

```md
<!-- toc -->

- generated toc item
- generated toc item
<!-- tocstop -->
```

If you prefer to print the toc to stdout and avoid directly changing the file, use `yarn printTOC {filename}`

## Previewing documentation in another directory

```zsh
# .zshrc

export MARKDOWN_PREVIEW_DIR="~/workbench/markdown-preview" // location of this repo on your machine

# `sync_markdown`: copies `*.md` files from the current working directory over
#     to markdown-preview and watches for changes, updating the copied files
#     anytime they're modified
#
#     Symlinks unfortunately won't play nicely w/ webpack's hot reloading, and
#     I failed to figure out a good way to watch files in another directory
#     direcly, so we copy.

alias sync_markdown="node $MARKDOWN_PREVIEW_DIR/utils/sync -w $PWD/"

# `preview_markdown`: starts up the next.js app from anywhere our heart desires
alias preview_markdown="yarn --cwd "$MARKDOWN_PREVIEW_DIR" dev"

# `add_toc`: update toc for file
alias add_toc="yarn --cwd $MARKDOWN_PREVIEW_DIR markdown-toc -i $PWD/"

# `print_toc`: print to console the toc for file
alias print_toc="yarn --cwd $MARKDOWN_PREVIEW_DIR markdown-toc $PWD/"
```

After adding to your `.zshrc`, start the next dev server from any directory with `preview_markdown`, then run `sync_markdown` to get the engines revving

:::important
Edit the files in your current working directory _not_ the ones copied over to markdown-preview.
:::

## Ready-made Alternatives

- [dillinger.io](https://dillinger.io/)
- [Bear](https://bear.app/)
- [iA Writer](https://ia.net/writer)
