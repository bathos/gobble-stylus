# gobble-stylus-2

Render stylus as CSS as a gobble transformation.

> Note: When I made this a few weeks ago, no "gobble-stylus" existed on npm.
Since this one works rather differently than that one I’m publishing it anyway.
The differences are that this one is file-style and allows more than a single
src/dest, and the `definitions` option, which for my own use case is critical.

## Installation

If you haven’t installed gobble yet, [do that first][1]. This is your usual
npm install.

```bash
npm install gobble-stylus-2 --save-dev
```

## Usage

In your gobblefile, you can now use the transformation.

```js
import 'gobble';

export default gobble('my-stylus-directory').transform('stylus-2', opts);
```

When you provide the first transform arg as a string, Gobble goes looking for it
on its own; no need to `require`. However you can also `require` it and pass in
the module itself instead of a string.

## Options

For the most part, the options object is identical to the one you’d normally
pass to the stylus API’s `render` method. There are four exceptions: `filename`,
`sourceRoot` and `basePath` options aren’t relevent because that logic falls
under gobble’s purview, and `definitions` is an option unique to this module to
provide indirect access to stylus’ `define` method.

### Opt specific to gobble-stylus-2

 - `definitions`: An object hash of variable names / values. This corresponds
   with the `define` method -- the values can be functions or strings or
   whatever.

### Regular stylus opts

 - `compress`: Boolean -- compress the output
 - `hoist atrules`: Boolean -- moves @import / @export to the top
 - `imports`: An array of files to additionally import
 - `include css`: Boolean -- include regular CSS on @import
 - `paths`: An array of paths which css includes can be relative to.  Note that
   if you’re used to using the stylus method `include`, this is its equivalent
   -- `include()` seems to just be aspartame for `paths.push()`.
 - `prefix`: Not sure if this is related to vendor prefixes or what.
 - `resolve url`: Boolean -- resolve relative URLs in imports
 - `sourcemap`: If truthy, generate sourcemap. In gobble-stylus, sourcemaps are
   default. This can also be an object with additional options:
     - `comment`: Adds that comment line that I hate (off by default nyehhh)
     - `inline`: Inlines the map as base64 (...wait what?)
     - `sourceRoot`: String; set the map’s source root
     - `basePath`: Default: `.`
 - `use`: An array of stylus middleware / plugin things (or a single one)
 - `warn`: Boolean -- warn on weirdness

I think there are more options, too; not all of them are documented, though some
only make sense when using the CLI.

### Regular gobble opts

 - `accept` Array of file extensions to recognize as stylus. Default is `.styl`
   and `.stylus`.
 - `ext`: The output file extension.

[1]: https://github.com/gobblejs/gobble

### Notes

This operates on any files in the gobble node that end in a stylus extension
(styl, stylus). If you went to target a specific file (perhaps one that includes
its peers explicitly), just use gobble’s built-in node methods to select it:

```js
gobble('css').include('index.css').transform('stylus-2', opts);
```
