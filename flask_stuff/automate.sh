#!/bin/sh

declare -a arr1=("weight", "temp", "SPO2", "hr", "hr2", "pain", "hemo", "sbp", "sbp2", "steps", "sleep", "mood", "energy", "prothtime", "sleep_eff", "glucose")
declare -b arr2=("a101", "a102", "a103", "a104", "a105")
## now loop through the above array
for i in "${arr1[@]}"
do

    for j in "${arr2[@]}" 
    do 
    	echo "$i,$j"
        python utils_test.py -t $i -u $j -c 1000;
    done
done

    
   

# You can access them using echo "${arr[0]}", "${arr[1]}" also


