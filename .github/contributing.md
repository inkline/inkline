# Contributing to Inkline

Contributing to Inkline is very straightforward. **Here's how you can help.**

Please review this document in order to make the contribution
process easy and effective for everyone involved.

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

* Please **do not** open issues or pull requests regarding the code in
  [`Normalize`](https://github.com/necolas/normalize.css) (open them in
  their respective repositories).

* Please **do not** open issues regarding the official themes offered on <http://inkline.io/themes/>.
  Instead, please email any questions or feedback regarding those themes to `themes AT inkline DOT io`.


## Issues and labels

Our bug tracker utilizes several labels to help organize and identify issues. Here's what they represent and how we use them:

- `browser bug` - Issues that are reported to us, but actually are the result of a browser-specific bug. These are diagnosed with reduced test cases and result in an issue opened on that browser's own bug tracker.
- `confirmed` - Issues that have been confirmed with a reduced test case and identify a bug in Inkline.
- `css` - Issues due to our compiled CSS or source Stylus files.
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

0. **Validate and lint your code** &mdash; [validate your HTML](http://html5.validator.nu)
   and lint your HTML to ensure your problem isn't caused by a simple error in your own code.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example.


A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? Do other browsers show the bug differently? What
would you expect to be the outcome? All these details will help people to fix
any potential bugs.

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

Feature requests are welcome! Before opening a feature request, please take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to *you* to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.


## Pull requests

Good pull requests—patches, improvements, new features—are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

In particular, **pull requests that add new features to Inkline v3 will be
rejected.** Inkline v3 is now in maintenance mode and is therefore closed
off to new features, so that we can focus our efforts on Inkline v4, the
future of the framework. Pull requests that add new features should target
[Inkline v4 (the `v4-dev` git branch)](https://github.com/inkline/inkline/tree/v4-dev)
instead, where they will be welcomed and duly considered.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the
project (indentation, accurate comments, etc.) and any other requirements
(such as test coverage).

**Do not edit `Inkline.css`, `Inkline-theme.css`, or `Inkline.js`
directly!** Those files are automatically generated. You should edit the
source files in [`/Inkline/scss/`](https://github.com/inkline/inkline/tree/v4-dev/scss)
and/or [`/Inkline/js/`](https://github.com/inkline/inkline/tree/v4-dev/js) instead.

Similarly, when contributing to Inkline's documentation, you should edit the
documentation source files in
[the `/Inkline/docs/4.0` directory of the `v4-dev` branch](https://github.com/inkline/inkline/tree/v4-dev/docs/4.0).
**Do not edit the `gh-pages` branch.** That branch is generated from the
documentation source files and is managed separately by the Inkline Core Team.

Adhering to the following process is the best way to get your work
included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/Inkline.git
   # Navigate to the newly cloned directory
   cd Inkline
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/inkline/inkline.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout v4-dev
   git pull upstream v4-dev
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely to be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream v4-dev
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `v4-dev` branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](LICENSE) (if it
includes code changes) and under the terms of the
[Creative Commons Attribution 3.0 Unported License](docs/LICENSE)
(if it includes documentation changes).

### Pull request bots

[@twbs-rorschach](https://github.com/twbs-rorschach) is a Inkline bot that hangs out in our GitHub issue tracker and automatically checks all pull requests for a few simple common mistakes. It's possible that Rorschach might leave a comment on your pull request and then close it. If that happens, simply fix the problem(s) mentioned in the comment (there should be link(s) in the comment explaining the problem(s) in detail) and then either:

* Push the revised version to your pull request's branch and post a comment on the pull request saying that you've fixed the problem(s). One of the Inkline Core Team members will then come along and reopen your pull request.
* Or you can just open a new pull request for your revised version.

[@twbs-savage](https://github.com/twbs-savage) is a Inkline bot that automatically runs cross-browser tests (via [Sauce](https://saucelabs.com) and Travis CI) on JavaScript pull requests. Savage will leave a comment on pull requests stating whether cross-browser JS tests passed or failed, with a link to the full Travis build details. If your pull request fails, check the Travis log to see which browser + OS combinations failed. Each browser test in the Travis log includes a link to a Sauce page with details about the test. On those details pages, you can watch a screencast of the test run to see exactly which unit tests failed.


## Code guidelines

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines) for more details.

### JS

- No semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"
- Don't use [jQuery event alias convenience methods](https://github.com/jquery/jquery/blob/master/src/event/alias.js) (such as `$().focus()`). Instead, use [`$().trigger(eventType, ...)`](http://api.jquery.com/trigger/) or [`$().on(eventType, ...)`](http://api.jquery.com/on/), depending on whether you're firing an event or listening for an event. (For example, `$().trigger('focus')` or `$().on('focus', function (event) { /* handle focus event */ })`) We do this to be compatible with custom builds of jQuery where the event aliases module has been excluded.

### Checking coding style

Run `grunt test` before committing to ensure your changes follow our coding standards.


## License

By contributing your code, you agree to license your contribution under the [MIT License](LICENSE).
By contributing to the documentation, you agree to license your contribution under the [Creative Commons Attribution 3.0 Unported License](docs/LICENSE).

Prior to v3.1.0, Inkline's code was released under the Apache License v2.0.