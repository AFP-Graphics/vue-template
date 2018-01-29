# {{ name }}

> {{ description }}

Made with ❤️ by AFP Graphics Team.
Based on vue-webpack-template v{{ template_version }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Deployment

### Automatic

You need to create a repository on Gitlab, then follow the instructions

``` bash
# commit changes to Git
git add .
git commit -m "your commit"

# add remote origin to your repository
git remote add origin <url-of-your-repository>

# push changes to Gitlab (updating master branch will allow you to deploy your project)
git push --set-upstream origin master
```

### Manual

You need to create a .env file in the root directory

```
PUBLIC_SERVER_HOST=
PUBLIC_SERVER_PASSWORD=
PUBLIC_SERVER_PATH=
PUBLIC_SERVER_USERNAME=
```

Then, 

``` bash
npm run deploy
```