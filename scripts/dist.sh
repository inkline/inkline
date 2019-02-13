rm dist/index.html
mv dist/js/chunk-vendors.js dist/js/vendors.js
mv dist/js/chunk-vendors.js.map dist/js/vendors.js.map
git add dist
git commit -m "Generated dist folder."
exit 0