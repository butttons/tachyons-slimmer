# Tachyons-slimmer

Install globally or as a peer dependency. 

Usage
```bash
tachyons-slimmer
```

Options
```
  --out,             -o     Output of CSS file. Defaults to tachyons.slim.css
  --dir,             -d     Directory to parse
  --file-type,       -f     Default: html. Types of file to parse. Vue files can also be parsed.
  --preserve-import, -p     Will not remove un-used style rules from imported tachyons CSS files.
  --config,          -c     Config file. Defaults to 'tachyons-slimmer.config.js'
  --vue,             -v     Default: false. Set to true to parse .vue files.
  --vue-pug,                Default: false. Set to true to parse pug templates to HTML in .vue files.    
  --tachyons-debug          Default: false. Set to true to include tachyons debug imports.
  --tachyons-normalize      Default: true. Set to false to exclude normalize.css
```
