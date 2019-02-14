rm dist/index.html
mv dist/js/chunk-vendors.js dist/js/vendors.js
mv dist/js/chunk-vendors.js.map dist/js/vendors.js.map
mv dist/js/index.js dist/js/inkline.js
mv dist/js/index.js.map dist/js/inkline.js.map
mv dist/css/index.css dist/css/inkline.css
git add dist
git commit -m "Generated dist folder."
exit 0