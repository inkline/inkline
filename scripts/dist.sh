rm dist/demo.html

rm dist/Inkline.common.js
rm dist/Inkline.common.js.map
rm dist/Inkline.umd.min.js
rm dist/Inkline.umd.min.js.map

mv dist/Inkline.umd.js dist/inkline.js
mv dist/Inkline.umd.js.map dist/inkline.js.map
sed -i '' 's/Inkline.umd.js.map/inkline.js.map/g' 'dist/inkline.js'

mv dist/Inkline.css dist/inkline.css

git add dist/
git commit -m "Generated dist folder."
exit 0