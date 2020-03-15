 #!/bin/sh

echo "Pushing to Github ..."
git config user.email "netlify@netlify.com"
git config user.name "Netlify CI"
git config push.default current
git stash
git checkout master
git stash pop
git add .
git commit -m "[skip ci] New content indexed!"
git push https://${GITHUB_TOKEN}@github.com/remtori/my-website.git
echo "Done !"