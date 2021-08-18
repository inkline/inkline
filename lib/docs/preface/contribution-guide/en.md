---
title: Contribution Guide
description: Actively participate in the development and the future of Inkline by contributing regularly.
---
# Contribution Guide
## Actively participate in the development and the future of Inkline by contributing regularly.

Open Source projects are maintained and backed by a **wonderful community** of users and collaborators.

We encourage you to actively participate in the development and future of Inkline by contributing to the source code, improving documentation, reporting potential bugs or testing new features.

### Channels

There are many ways to taking part in the Inkline community.

1. <a href="https://github.com/inkline/inkline" rel="nofollow" target="_blank">Github Repositories</a>: Report bugs or create feature requests against the dedicated Inkline repository.
2. <a href="https://discord.gg/2w5UGnK" rel="nofollow" target="_blank">Discord</a>: Join the Discord Server to chat instantly with other developers in the Inkline community.
3. <a href="https://twitter.com/inkline" rel="nofollow" target="_blank">Twitter</a>: Stay in touch with the progress we make and learn about the awesome things happening around Inkline.

### Using the issue tracker

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


### Bug Reports

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

<a href="https://github.com/inkline/inkline/issues/new" rel="nofollow" target="_blank">Create a bug report</a>

## Feature requests
Feature requests are welcome! When opening a feature request, it's up to *you* to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

When adding a new feature to the library, make sure you update the documentation package as well.

### Testing
Before providing a pull request be sure to test the feature you are adding. Inkline's target code coverage is 100% and we're proudly consistent with that.

<a href="https://coveralls.io/github/inkline/inkline?branch=master" rel="nofollow">
    <img src="https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master" alt="Coverage Status" data-canonical-src="https://coveralls.io/repos/github/inkline/inkline/badge.svg?branch=master" style="max-width:100%;">
</a>


### Pull requests

Good pull requests — patches, improvements, new features are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before starting on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you might spend a lot of time working on something that the project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the project (indentation, accurate comments, etc.) and any other requirements (such as test coverage).

**Do not edit `inkline.css`, or `inkline.js`
directly!** Those files are automatically generated. You should edit the source files in [`/src`](https://github.com/inkline/inkline/tree/master/src) instead.

Similarly, when contributing to Inkline's documentation, you should edit the documentation source files in
[the `/src` directory](https://github.com/inkline/inkline.io/tree/master/src).

Adhering to the following process is the best way to get your work included in the project:

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

4. Locally rebase the upstream master branch into your topic branch:

   ```bash
   git pull --rebase upstream master
   ```

5. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

6. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description against the `master` branch.

### Local Development

1. First, fork the repository and create a branch as specified in the [Pull Request Guidelines](#pull-requests) above.

2. You'll find a well-structured [Vite.js](https://vitejs.dev) + [Vue.js](https://vuejs.org) project.

3. Run `npm install` to install all dependencies.

4. To start developing, run `npm run dev` in your command line to run Inkline in development mode. The documentation will be automatically generated based on the UI library updates.

5. To test, run `npm run test:dev` to run the UI Library tests in development mode. Make sure you run `npm run test` to run all the tests once before creating a pull request.

### License
By contributing your code, you agree to license your contribution under the <a href="https://github.com/inkline/inkline/blob/master/LICENSE" rel="nofollow" target="_blank">MIT License</a>. By contributing to the documentation, you agree to license your contribution under the <a href="https://github.com/inkline/inkline.io/blob/master/LICENSE" rel="nofollow" target="_blank">Creative Commons Attribution 3.0 Unported License</a>.
