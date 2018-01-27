# Gluon

This app works on React Native (iOS, Android) and web.

The commands in the instructions below assume you are in the root of this repo.

## Initial Setup

- Run `yarn install`. This fetches the dependencies.

### Building for Web

- Run `yarn web-watch`. This compiles the TypeScript code and recompiles it whenever any files are changed.
- Open [localhost:8080](http://localhost:8080) in your browser to view the result.

### Building for React Native

- Run `yarn rn-watch`. This compiles the TypeScript code and recompiles it whenever any files are changed.
- In another command prompt run `yarn start`. This starts the React Native Packager.
- Run `yarn run-ios` for iOS, or `yarn run-android` for android.
- OR use Xcode or Android Studio to build and deploy the native app code just like you would with any other React Native project. 


# Development tools

Install these Chrome Extensions:

* [Redux DevTools](http://extension.remotedev.io/) 

    This lets you easily debug apps state and actions, time travel, etc.
    
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 

    This lets you debug React components, their props, etc.


## Visual Studio Code

Recommended IDE - [Visual Studio Code](https://code.visualstudio.com/)

Recommended Vscode extensions:

* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
* [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)

# Development flow

### 1. Open integrated terminal

``Ctrl + Shift + ` ``

### 2. Create new feature branch

```
git checkout -b great-new-feature
```

### 3. Run Build Task

`CMD + Shift + B`

### 4. Start Debugging

`F5`

### 5. Edit code with hot reloading

Edit source files as usual. Build task uses webpack hot reloading. You will see your changes without reloading App State.

### 6. Commit and push your changes to Git

This will trigger precommit script which will lint the code and will run unit tests. If these fail, it will not let you commit broken code.

### 7. Create Merge Request

# CodePush

We are using [CodePush](https://microsoft.github.io/code-push/) to deploy mobile app updates directly to their users’ devices.

## Install the CodePush CLI

```
npm install -g code-push-cli
```

## Login

Project admin will have to give you access before you can release new versions

```
code-push login
```
