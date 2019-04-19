#
# Inkline
#

rm ./dist/demo.html

rm ./dist/Inkline.common.js
rm ./dist/Inkline.common.js.map
rm ./dist/Inkline.umd.min.js
rm ./dist/Inkline.umd.min.js.map

mv ./dist/Inkline.umd.js dist/inkline.js
mv ./dist/Inkline.umd.js.map dist/inkline.js.map
sed -i '' 's/Inkline.umd.js.map/inkline.js.map/g' './dist/inkline.js'
sed -i '' 's/Inkline.umd.js/inkline.js/g' './dist/inkline.js.map'

mv ./dist/Inkline.css ./dist/inkline.css

#
# Validation
#

rm ./dist/InklineValidation.common.js
rm ./dist/InklineValidation.common.js.map
rm ./dist/InklineValidation.umd.min.js
rm ./dist/InklineValidation.umd.min.js.map

mv ./dist/InklineValidation.umd.js dist/validation.js
mv ./dist/InklineValidation.umd.js.map dist/validation.js.map
sed -i '' 's/InklineValidation.umd.js.map/validation.js.map/g' './dist/validation.js'
sed -i '' 's/InklineValidation.umd.js/validation.js/g' './dist/validation.js.map'

#
# Save & Exit
#

git add ./dist/
git commit -m "Generated dist folder."
exit 0
