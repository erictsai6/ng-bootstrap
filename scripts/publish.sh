echo "This script is used for publishing an NPM enabled version of the repository."
echo "Continuing will result in loss of any uncommitted work you have."
echo "Do not continue unless you know what you are doing."
echo "Would you like to continue (yes/no)?"

read answer

if [ "$answer" = "yes" ]
    then
        find . -type d  -not -name node_modules -not -name .git -not -name dist -maxdepth 1 -exec rm -R {} \;
        cp -a ./dist/. ./
fi
