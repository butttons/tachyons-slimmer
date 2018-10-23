export default `
Usage
  $ tachyons-slimmer

Options
  --out,             -o     Output of CSS file. Defaults to tachyons.slim.css
  --dir,             -d     Directory to parse
  --file-type,       -f     Types of file to parse. Defaults to html. Vue files can also be parsed.
  --preserve-import, -p     Will not remove un-used style rules from imported SCSS files.
  --config,          -c     Config file. Defaults to 'tachyons-slimmer.config.js'
  --vue,             -v     Set to true to parse .vue files.
  --vue-pug,                Set to true to parse pug templates to HTML in .vue files.    

Examples
  $ tachyons-slimmer --vue --vue-pug
`;
