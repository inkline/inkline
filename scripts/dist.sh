rm dist/index.html
mv dist/css/index.css dist/css/inkline.css
mv dist/js/chunk-vendors.js dist/js/vendors.js
mv dist/js/index.js dist/js/inkline.js
git add dist
git commit -m "Generated dist folder."