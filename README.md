# electron-vue

#### Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn run dev

# build electron application for production
yarn run build

# lint all JS/Vue component files in `src/`
yarn run lint

```

#### Packaging

``` bash
# install electron-packager
yarn global add electron-packager

# install wine
brew cask install xquartz
brew install wine

# build for Windows 32bit
electron-packager . next-tool-electron --platform=win32 --arch=ia32 --electronVersion=1.7.5 --out 'build' --overwrite

# build for Linux, mac, Windows 64bit
electron-packager . next-tool-electron --platform=linux,darwin,win32 --arch=x64 --electronVersion=1.7.5 --out 'build' --overwrite

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[1c165f7](https://github.com/SimulatedGREG/electron-vue/tree/1c165f7c5e56edaf48be0fbb70838a1af26bb015) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
