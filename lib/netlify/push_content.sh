#!/bin/sh

echo "Update published_commit"
git config --global user.email "netlify@netlify.com"
git config --global user.name "Netlify CI"
git config --global push.default current
git stash
git checkout master
git stash pop
git add .
git commit -m "[ci skip] Update published_commit"
git push https://${GITHUB_TOKEN}@github.com/remtori/my-website-content.git
echo "Done !"
