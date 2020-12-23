# Find the space station
Check it out at https://iss.lxbrown.dev

## To install
### Prerequisites 
* [git](https://git-scm.com/)
* [npm](https://www.npmjs.com/)
* (optional) [yarn](https://classic.yarnpkg.com/en/)

    ```shell
    npm install -g yarn
    ```
* (optional) [firebase-tools](https://firebase.google.com/). Only needed for deploying the app

    ```shell
    npm install -g firebase-tools
    ```

### Install

```shell
git clone https://github.com/lxbrown/find-the-space-station.git
cd find-the-space-station
yarn
```

You should now be able to host the page locally

```shell
yarn start
```

### Deploy
To deploy the app, you need to be an authorized user on the Firebase project - right now that's just me :). If you set up your own project ([Firebase docs](https://firebase.google.com/docs/web/setup#create-firebase-project)), you can test deploying locally

```shell
firebase emulators:start
```

And deploy to the live site

```shell
yarn deploy
```
