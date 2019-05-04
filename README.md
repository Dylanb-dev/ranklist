# Quickstart

Set up firebase:

- install Firebase Tools: `npm i -g firebase-tools`
- create a project through the [firebase web console](https://console.firebase.google.com/)
- grab the projects ID from the web consoles URL: https://console.firebase.google.com/project/<projectId>

`touch .firebaserc`

```
{
  "projects": {
    "default": "<project-name-here>"
  }
}
```

- login to the Firebase CLI tool with `firebase login`

#### Install project:

```bash
npm install
```

#### Run Next.js development:

```bash
npm run dev
```

#### Run Firebase locally for testing:

```
npm run serve
```

#### Deploy it to the cloud with Firebase:

```bash
npm run deploy
```

#### Clean dist folder

```bash
npm run clean
```

# More Info

Firebase + nextjs
https://github.com/zeit/next.js/tree/master/examples/with-firebase-hosting-and-typescript

Nextjs + react-native-web
https://github.com/zeit/next.js/tree/master/examples/with-react-native-web

Typescript + eslint
https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
