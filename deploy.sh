set -e
npm run build
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://gedenata.github.io/oddbit-movie-vue
git push -f git@github.com:gedenata/oddbit-movie-vue.git master:gh-pages

cd -