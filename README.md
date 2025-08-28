# matter.js controller demo

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Dependencies

1. matter-js/matter.js 
commit: 0ab899ab358b1dafb6ffc6657e396c35770e4594


## Get started

### clone matter-js/matter.js
```bash
$ git clone https://github.com/matter-js/matter.js.git
$ git checkout 0ab899ab358b1dafb6ffc6657e396c35770e4594
```

### create npm link
```bash
$ cd matter.js/packages
# create link for general/model/node/protocol/react-native/types/matter.js
# such as general:
$ cd general
$ npm link
```

### clone this repository

## Run

### Install dependencies
```bash
$ npm install
```

### Install matter.js packages
```bash
$ npm link @matter/general
$ npm link @matter/react-native
$ npm link @matter/model
$ npm link @matter/node
$ npm link @matter/protocol
$ npm link @matter/types
$ npm link @project-chip/matter.js
```

### Start the app
```bash
$ npx expo run:android 
```
