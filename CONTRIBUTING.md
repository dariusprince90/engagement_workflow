# Contributing to the New Engagement Workflow Web Front-End

See the [README](README.md) to get an overview of the project
To provide feedback, please follow the guidance in this document.

Use your best judgment and feel free to propose changes to anything in this repository, including these contribution guidelines.

## Creating Issues

- You can [create an issue](../../../issues/new/choose), but before doing that please read the bullets below and include as many details as possible.
- Perform a [cursory search](../../../issues) to see if a similar item has already been submitted.

## Recommended setup for contributing

**NOTE:** Always be sure to use **_only_** approved versions from the [AppDev Workstation Configuration][repo--appdev-workstation-configuration] guide.

- Install [Git][git] and clone this repository
- Install nvm
- Install (via nvm) node v16.x
- Install the [Chocolatey CLI][chocolatey-cli]
- Install [VS Code][vscode]
- Install all recommended VS Code extensions (included in /.vscode/extensions.json)
  - Restart VS Code after installing extensions
- Setup NPM configuration for font awesome pro
  - If you have not already setup your workstation's npm configuration for font awesome pro, follow these steps
    - Open PowerShell
    - Navigate to your user profile folder
      - `cd $env:USERPROFILE`
    - Execute the following commands
      - `npm config set "@fortawesome:registry" https://npm.fontawesome.com/`
      - `npm config set "//npm.fontawesome.com/:_authToken" <your-font-awesome-token>`
- Install dependencies
  - `npm install`
- Add a file named `.env.local` to the root of this repo
  - This will be for your local environment variables while developing locally
  - Copy all values from .env.dev into this new file
  - NOTE: to enable the design-time overlay for local development, add the following entry to your .env.local file
    - `REACT_APP__ENABLE_DESIGN_TIME_OVERLAY=true`
- Add a custom ssl cert for your local install
  - Install `mkcert` from an elevated/admin shell
    - `choco install mkcert`
  - Setup mkcert from an elevated/admin shell (creates a CA)
    - `mkcert -install`
  - Navigate to the root of this repo and execute the following commands
    - `mkdir .cert`
    - `mkcert -key-file ./.cert/localhost-key.pem -cert-file ./.cert/localhost-cert.pem "localhost"`
    - **NOTE**: The `.cert` folder is excluded from source control.
    - **NOTE**: These files should be treated just like passwords.
    - **NEVER COMMIT THESE FILES TO SOURCE CONTROL**

## Documentation style guide

- Please reference GitHub's [basic writing and formatting syntax][gh-md-syntax-guidance].
- Use syntax-highlighted examples liberally.
- Write one sentence per line.

## Making changes

- Create a [topic branch][topic-branch] named appropriately (`<initials>-issue-<issue#>[-additional-info]`).
  - Branches for new features belong in the `feature/` folder.
  - Branches for bug fixes belong in the `fix/` folder.
  - examples
    - `feature/mob-issue-123`
    - `feature/daf-issue-456-add-cancel-button`
    - `fix/mob-issue-222`
    - `fix/daf-issue-333-fix-typo`
- Once you are ready with your changes, don't forget to self review to quicken the review process :zap:.
  - [ ] Confirm that the changes meet the user experience and goals laid out in the issue/requirements/etc.
  - [ ] You've **tested the changes locally** to confirm desired functionality.
  - [ ] Ensure any documentation within the code is updated (README, CONTRIBUTING, etc.)
  - [ ] Review the changes for grammar, spelling, etc.
  - [ ] All code, markdown, etc. is properly formatted, linted, etc.
  - [ ] Unit tests are added/updated for changed methods.
  - [ ] Unit tests are added for all new methods.
  - [ ] All unit tests pass.
  - [ ] etc.

## Commit messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.

## Pull requests

Pull requests serve as the primary mechanism by which contributions are proposed and accepted.

- Open a pull request from your topic branch.
  - For additional guidance, read through the [GitHub Flow Guide][github-flow-guide].
- Don't forget to link the PR to the issue you are solving.
- Be prepared to address feedback on your pull request and iterate if necessary.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes][gh-suggested-changes] or pull request comments.
  - You can apply suggested changes directly through the UI.
  - You can make any other changes in your local branch and push the changes when complete.
- As you update your PR and apply changes, reply to each conversation that required your attention.
- Do not resolve conversations created by other users; reviewers will resolve conversations they start.
