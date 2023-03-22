# svg-to-webfont

Generator a full pack of webfonts from SVG icons.

Features:

* Supported font formats: WOFF2, WOFF, EOT, TTF and SVG.
* Supported browsers: IE8+.
* Generates CSS files and HTML preview, allows to use custom templates.

## Install

```
npm install --save-dev svg-to-webfont
```
or
```
yarn add --save-dev svg-to-webfont
```

## Usage

### runing from cli 
#### setp 1 : adding script to package.json
Add the `svg-to-webfont` script to the pacakge.json file like the example below, make sure to create a config file and add the necessary files and set the relative path of the config file in the script with the `-c` arg. 
```json
 "scripts": {
    "svg-to-webfont": "svg-to-webfont -c ./config.json"
  },
```
example of the json config file:
```json
// config.json
{
    "dest": "dist",
    "icons": "icons",
    "fontName": "ircolor-icons",
    "css": true,
    "cssDest": "dist/css/ircolor-icons.css",
    "cssFontsUrl": "../fonts/",
    "types": [
        "woff",
        "woff2",
        "ttf",
        "eot"
    ],
    "templateOptions": {
        "classPrefix": "ir-",
        "baseSelector": ".ir"
    }
}
```

running the script form cli like this will run the package:
```
npm run svg-to-webfont
```
NOTE : if the pack is created successfully a success message is diplayed !
### runing from api 

```js
const { generateIconPackage } = require('svg-to-webfont')

const config = {
    dest: "dist",
    icons: "icons",
    fontName: "ircolor-icons",
    css: true,
    cssDest: "dist/css/ircolor-icons.css",
    cssFontsUrl: "../fonts/",
    types: [
        "woff",
        "woff2",
        "ttf",
        "eot"
    ],
    templateOptions: {
        "classPrefix": "i-",
        "baseSelector": ".i"
    }
}

generateIconPackage(config)

```

## List of options



### icons

*required*

Type: `string`

path to the folder where svg icons sit.

### dest

*required*

Type: `string`

Directory for generated font files.

### fontName

Type: `string`
<br>
Default: `'iconfont'`

Name of font and base name of font files.

### css

Type: `boolean`
<br>
Default: `true`

Whether to generate CSS file.

### cssDest

Type: `string`
<br>
Default: `path.join(options.dest, options.fontName + '.css')`

Path for generated CSS file.

### cssTemplate

Type: `string`
<br>
Default: path of default CSS template

Path of custom CSS template.
Generator uses handlebars templates.

Template receives options from `options.templateOptions` along with the following options:

* fontName
* src `string` &ndash; Value of the `src` property for `@font-face`.
* codepoints `object` &ndash; Codepoints of icons in hex format.

Paths of default templates are stored in the `webfontsGenerator.templates` object.

* `webfontsGenerator.templates.css` &ndash; Default CSS template path.
	<br>
	It generates classes with names based on values from `options.templateOptions`.

* `webfontsGenerator.templates.scss` &ndash; Default SCSS template path.
	<br>
	It generates mixin `webfont-icon` to add icon styles.
	<br>
	It is safe to use multiple generated files with mixins together.
	<br>
	Example of use:

	```
	@import 'iconfont';
	.icon { @include webfont-icon('icon'); }
	```

### cssFontsPath

Type: `string`
<br>
Default: `options.destCss`

Fonts path used in CSS file.

### html

Type: `boolean`
<br>
Default: `false`

Whether to generate HTML preview.

### htmlDest

Type: `string`
<br>
Default: `path.join(options.dest, options.fontName + '.html')`

Path for generated HTML file.

### htmlTemplate

Type: `string`
<br>
Default: `templates/html.hbs`

HTML template path.
Generator uses handlebars templates.

Template receives options from `options.templateOptions` along with the following options:

* fontName
* styles `string` &ndash; Styles generated with default CSS template.
	(`cssFontsPath` is chaged to relative path from `htmlDest` to `dest`)
* names `array.<string>` &ndash; Names of icons.

### templateOptions

Type: `object`

Additional options for CSS & HTML templates, that extends default options.

Default options are:
```js
{
	classPrefix: 'icon-',
	baseSelector: '.icon'
}
```

### types

Type: `array<string>`
<br>
Default: `['woff2', 'woff', 'eot']`

Font file types to generate.
Possible values: `svg, ttf, woff, woff2, eot`.

### order

Type: `array<string>`
<br>
Default: `['eot', 'woff2', 'woff', 'ttf', 'svg']`

Order of `src` values in `font-face` in CSS file.

### rename

Type: `function(string) -> string`
<br>
Default: basename of file

Function that takes path of file and return name of icon.

### startCodepoint

Type: `number`
<br>
Default: `0xF101`

Starting codepoint. Defaults to beginning of unicode private area.

### codepoints

Type: `object`

Specific codepoints for certain icons.
Icons without codepoints will have codepoints incremented from `startCodepoint` skipping duplicates.

### fontName, normalize, fontHeight, round, descent

Options that are passed directly to
[svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont).

### formatOptions

Type: `object`

Specific per format arbitrary options to pass to the generator

format and matching generator:
- `svg` - [svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont).
- `ttf` - [svg2ttf](https://github.com/fontello/svg2ttf).
- `woff2` - [ttf2woff2](https://github.com/nfroidure/ttf2woff2).
- `woff` - [ttf2woff](https://github.com/fontello/ttf2woff).
- `eot` - [ttf2eot](https://github.com/fontello/ttf2eot).

```js
webfontsGenerator({
  // options
  formatOptions: {
  	// options to pass specifically to the ttf generator
  	ttf: {
  		ts: 1451512800000
  	}
  }
}, function(error, result) {})
```

### writeFiles

Type: `boolean`
<br>
Default: `true`

It is possible to not create files and get generated fonts in object
 to write them to files later.
<br>
Also results object will have function `generateCss([urls])`
where `urls` is an object with future fonts urls.

```js
webfontsGenerator({
  // options
  writeFiles: false
}, function(error, result) {
  // result.eot, result.ttf, etc - generated fonts
  // result.generateCss(urls) - function to generate css
})
```

## License

Public domain, see the `LICENCE` file.
