# Contributing to Inkline

### Actively participate in the development and the future of Inkline by contributing regularly.

Open Source projects are maintained and backed by a **wonderful community** of users and collaborators.

We encourage you to actively participate in the development and future of Inkline by contributing to the source code, improving documentation, reporting potential bugs or testing new features.

### Channels

There are many ways to taking part in the Inkline community.

1. <a href="https://github.com/inkline/inkline" rel="nofollow" target="_blank">Github Repositories</a>: Report bugs or create feature requests against the dedicated Inkline repository.
2. <a href="https://discord.gg/2w5UGnK" rel="nofollow" target="_blank">Discord</a>: Join the Discord Server to chat instantly with other developers in the Inkline community.
3. <a href="https://twitter.com/inkline" rel="nofollow" target="_blank">Twitter</a>: Stay in touch with the progress we make and learn about the awesome things happening around Inkline.

## Using the issue tracker

The [issue tracker](https://github.com/inkline/inkline/issues) is
the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests)
and [submitting pull requests](#pull-requests), but please respect the following
restrictions:

* Please **do not** use the issue tracker for personal support requests.

* Please **do not** get off track in issues. Keep the discussion on topic and
  respect the opinions of others.

* Please **do not** post comments consisting solely of "+1" or ":thumbsup:".
  Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)
  instead. We reserve the right to delete comments which violate this rule.

## Issues and labels

Our bug tracker utilizes several labels to help organize and identify issues. Here's what they represent and how we use them:

- `browser bug` - Issues that are reported to us, but actually are the result of a browser-specific bug. These are diagnosed with reduced test cases and result in an issue opened on that browser's own bug tracker.
- `confirmed` - Issues that have been confirmed with a reduced test case and identify a bug in Inkline.
- `css` - Issues due to our compiled CSS or source Sass files.
- `js` - Issues stemming from our compiled or source JavaScript files.
- `docs` - Issues for improving or updating our documentation.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified. New features require a minor version bump (e.g., `v1.0.0` to `v1.1.0`).
- `help wanted` - Issues where we need or would love help from the community to resolve.
- `meta` - Issues with the project itself or our GitHub repository.

For a complete look at our labels, see the [project labels page](https://github.com/inkline/inkline/labels).

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. Provide a clear title and description of the issue.
2. Share the version of Inkline you are using.
3. Add code examples to demonstrate the issue. You can also provide a complete repository to reproduce the issue quickly.

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report:

- What is your environment?
- What steps will reproduce the issue?
- What browser(s) and OS experience the problem?
- Do other browsers show the bug differently?
- What would you expect to be the outcome?

All these details will help us fix any potential bugs. Remember, fixing bugs takes time. We're doing our best!

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

### Reporting upstream browser bugs

Sometimes bugs reported to us are actually caused by bugs in the browser(s) themselves, not bugs in Inkline per se.
When feasible, we aim to report such upstream bugs to the relevant browser vendor(s), and then list them on our [Wall of Browser Bugs](http://getInkline.com/browser-bugs/) and [document them in MDN](https://developer.mozilla.org/en-US/docs/Web).

| Vendor(s)     | Browser(s)                   | Rendering engine | Bug reporting website(s)                                                              | Notes                                                    |
| ------------- | ---------------------------- | ---------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Mozilla       | Firefox                      | Gecko            | https://bugzilla.mozilla.org/enter_bug.cgi                                            | "Core" is normally the right product option to choose.   |
| Apple         | Safari                       | WebKit           | https://bugs.webkit.org/enter_bug.cgi?product=WebKit <br> https://bugreport.apple.com | In Apple's bug reporter, choose "Safari" as the product. |
| Google, Opera | Chrome, Chromium, Opera v15+ | Blink            | https://code.google.com/p/chromium/issues/list                                        | Click the "New issue" button.                            |
| Microsoft     | Edge                         | EdgeHTML         | https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/                 |                                                          |

## Feature requests
Feature requests are welcome! When opening a feature request, it's up to *you* to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

When adding a new feature to the framework, make sure you update the documentation package as well.

### Testing
Before providing a pull request be sure to test the feature you are adding. Inkline's target code coverage is 100% and we're proudly consistent with that.

<a href="https://coveralls.io/github/inkline/inkline?branch=master" rel="nofollow">
    <img src="https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master" alt="Coverage Status" data-canonical-src="https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master" style="max-width:100%;">
</a>

## Pull requests

Good pull requests—patches, improvements, new features are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before starting on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you might spend a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the
project (indentation, accurate comments, etc.) and any other requirements
(such as test coverage).

**Do not edit `inkline.css`, or `inkline.js`
directly!** Those files are automatically generated. You should edit the
source files in [`/packages/inkline/src`](https://github.com/inkline/inkline/tree/master/packages/inkline/src) instead.

Similarly, when contributing to Inkline's documentation, you should edit the
documentation source files in
[the `/packages/docs` directory](https://github.com/inkline/inkline/tree/master/packages/docs).

Adhering to the following process is the best way to get your work
included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/inkline.git

   # Navigate to the newly cloned directory
   cd inkline

   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/inkline/inkline.git
   ```

2. Create a new topic branch (off the main project master branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

3. Make sure your commits are logically structured. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html). Use Git's
   [interactive rebase](https://help.github.com/en/github/using-git/about-git-rebase)
   feature to tidy up your commits before making them public.

4. Locally rebsase the upstream master branch into your topic branch:

   ```bash
   git pull --rebase upstream master
   ```

5. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

6. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.

**Important!** By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](../packages/inkline/LICENSE) (for code changes) and under the terms of the
[Creative Commons Attribution 3.0 Unported License](../packages/docs/LICENSE)
(for documentation changes).

## Code guidelines

### HTML

Adhere to the linting and [Code](http://codeguide.co/#html) guidelines.

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples for better accessibility.

### Sass

Adhere to the linting and [RSCSS](https://rscss.io) guidelines.

- Default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines) for more details.

### JS

Adhere to the linting guidelines.

- Use semicolons
- 4 spaces (no tabs)
- strict mode

### Vue

Adhere to the linting and [Concepts](https://inkline.io/docs/preface/concepts) guidelines.

- Prefix Inkline components with the `I` character
- Provide multiple customization options
- Use mixins where applicable

## Local Development

1. First, fork the repository and create a branch as specified in the [Pull Request Guidelines](#pull-requests) above.

2. You'll find a structured [lerna](https://lerna.js.org) project. The folder structure is as follows:
- `packages/inkline` contains the UI Framework
- `packages/docs` contains the Documentation
- `packages/vue-cli-plugin` contains the Vue CLI integration
- `packages/nuxt-module` contains the Nuxt integration

3. Run `npm install` to install all dependencies. The four child projects dependencies will be automatically installed and linked as well.

4. To start developing, run `npm run dev` in your command line to run both inkline and the docs in development mode. The documentation will be automatically linked to the ui framework updates and will react to changes in the framework code.

5. To test, go to `packages/inkline` and run `npm run test:dev` to run the UI Framework tests in development mode. Make sure you run `npm run test` to run all the tests once (ui framework, docs, integrations) before creating a pull request.

## License

By contributing your code, you agree to license your contribution under the [MIT License](https://github.com/inkline/inkline/tree/master/packages/inkline/LICENSE).
By contributing to the documentation, you agree to license your contribution under the [Creative Commons Attribution 3.0 Unported License](https://github.com/inkline/inkline/tree/master/packages/docs/LICENSE).
