cd assets/maps
pwd
FILES=./*/
for map in $FILES
do 
  echo "Processing $map"
  echo "python3 scrapmap.py $map"
  python3 scrapmap.py "$map"
done
cd ../..
