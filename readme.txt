>:these all methods started with $ are mongoose operations]


>>>>$in is used for query operations to match documents based on a field value 
against multiple values
{_id:{$in:[value1,value2]}}

>>>>$addToSet:is used to update operations to add elements to an array field while 
ensuring uniqueness
>>>>$addToSet:{follwers:userId}
here we are adding userId to follers array

>>>>$set:method is used to update a value a value in the database
>>>>$push:method is used to append an element into the array if it is not already a array then it makes it an array and then add the values to it

>>>>$pull:method is used to remove an element from the array

>>>>.updateMany():method is used to update many operations at once 

>>>>Difference between map,filter and reduce method in an array:
>>.map():makes a new array based on the condition means it transforms each element of an array
>>.filter():is used for selecting elements from an array baSED on a condition.
>>reduce():method is used for accumulating values from an array into a single value.
>accumulating means to store 


....All methods related to an array:{
1) Manipulating arrays:
.../push():method is used to add an element to the end of an array and returns the new length of the array
while pop():method is used to remove an element from the end of an array and returns that element
.../shift():method is used to remove the first element of an array and returns that element
while unshift():method is used to add one or more element to the begining of an array and returns the new length of an array

>>>>> Similarity between push() and unshift() method is that these both are adding the elemnt into an array and returns the new length of an array
while difference is that between push() and unshift is that they makes operation one is from end and other is from last

>>>>> Similarity between pop() and shift() method is that they both are removing the elements from an array and returns that element
while difference is that one is removing from last and other is from started
.../splice():Adds or remove elements from an array at a specified index

}

{
    2):Accessing Array Items:
    >>>.concat():Joins two or more arrays and returns a new array.
    these concat() method is also implemented on strings
    >>>.slice():returns a shallow copy of a portion of an array into a new array object
    >>>.indexOf():returns the first index at which a given element can be found in the array
    or -1 if this element is not present
    lastIndexOf():returns the last index of an element in array that position it will found
    -1 if it is not found
}
{
    3):Iterating over arrays:
    .forEach():is used to executes  a provided function once for each array element
    .map():is used to creates a new array with the results of calling a provided function on every element in the calling array
    .filter():is used to creates a new array with all elements that pass the condition implemented by the provided function
    .find()
}

>>>Promise.all():method is used to wait for multiple promises to resolve or reject.It takes an array or iterable value of promises and returns a single Promise that resolves when all of the input promises 
have resolved .If any of the promise is rejected the return promise will be rejected immediately



>>>morgan :is used for logging the requests and then send it to the server while multer is used for storing the files
