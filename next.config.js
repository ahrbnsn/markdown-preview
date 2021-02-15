const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [
      [require('remark-prism'), {}],
      [require('remark-admonitions'), {}],
    ],
    rehypePlugins: [],
  },
});
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
});
