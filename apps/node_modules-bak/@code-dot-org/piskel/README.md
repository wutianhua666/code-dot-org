Code Studio Piskel
======

[![Travis Status](https://api.travis-ci.org/code-dot-org/piskel.png?branch=master)](https://travis-ci.org/code-dot-org/piskel)

This is a custom version of the excellent [Piskel Editor](https://github.com/juliandescottes/piskel) by [@juliandescottes](https://github.com/juliandescottes) and [@grosbouddha](https://github.com/grosbouddha), designed for embedded use with the Code.org Code Studio learning platform.  For more information on using or developing Piskel, please see [the main repository](https://github.com/juliandescottes/piskel).

This project is published on npm as [@code-dot-org/piskel](https://www.npmjs.com/package/@code-dot-org/piskel).

## Using this package

Install the package from npm:

```
npm install @code-dot-org/piskel
```

This will install the release build of Piskel to `node_modules/@code-dot-org/piskel`.  The application root is at `node_modules/@code-dot-org/piskel/dest/prod`.  You can run the static version of Piskel by opening `index.html` in that folder.

A `piskel-root` utilty is also installed at `node_modules/.bin/piskel-root` that prints the absolute path to the application root.  It's recommended that you depend on this utility in any build scripts to be resilient against future changes to the internal layout of the Piskel package.

## Local Development Setup

Note: To run local integration tests you should install CasperJS 1.0.2 (not included as a dependency in this repo) and make sure it has access to PhantomJS 1.9.2 (downloaded to node_modules/.bin on `npm install` but not necessarily in your PATH).

## Publishing a new version

To publish a new version to npm switch to the master branch, use `npm login` to sign in as an account with access to the `@code-dot-org` scope, then `npm version [major|minor|patch]` for the appropriate version bump.  This will do the following:

* Run linting and tests to verify your local repo.
* Rebuild the release package.
* Bump the version, adding a corresponding commit and version tag.
* Push the commit and tag to github.
* Publish the new release package to npm.

## License

Code Studio Piskel is Copyright 2016 Code.org

Piskel is Copyright 2016 Julian Descottes

Both are licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
