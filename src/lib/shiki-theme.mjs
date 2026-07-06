// A minimal custom Shiki theme so code blocks stay inside the Lore palette
// (rac-core's rac-localview/src/styles/tokens.css) instead of importing a
// stock theme's unrelated colors.
export const loreShikiTheme = {
  name: 'lore',
  type: 'dark',
  colors: {
    'editor.background': '#1a1a18',
    'editor.foreground': '#d6d4cc',
  },
  tokenColors: [
    { scope: ['comment'], settings: { foreground: '#8f8d84', fontStyle: 'italic' } },
    { scope: ['string', 'string.template'], settings: { foreground: '#57c97a' } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#ffb84d' } },
    { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: '#f5a623' } },
    { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#4ec9b0' } },
    { scope: ['entity.name.tag', 'entity.other.attribute-name'], settings: { foreground: '#f5a623' } },
    { scope: ['variable', 'variable.parameter'], settings: { foreground: '#d6d4cc' } },
    { scope: ['punctuation'], settings: { foreground: '#8f8d84' } },
  ],
};
