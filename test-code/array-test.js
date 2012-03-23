var ary = [[1,15], [2,25], [3,35]];
console.log(ary.assoc(2));         // => [2, 25]
console.log(ary.assoc(100));       // => null
console.log(ary.assoc(15));        // => null

var a = [0, 1, 2, 3];
console.log(a.at(1));      //=> 1

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
a.choice();

var ary = [1, 2];
ary.clear();
console.log(ary);   //=> []

var ary = [1, 2, 3];
ary.collect(function(x){
    console.log(x*3);
});

var ary = [1, null, 2, null, 3, null];
console.log(ary.compact()); //=> [1, 2, 3]
console.log(ary);         //=> [1, null, 2, null, 3, null]

array = [1, 2, 3, 2, 1];
console.log(array.delete(2));     //=> 2
console.log(array);               //=> [1, 3, 1]

var ary = [null,null,null];
console.log(ary.delete(null));   //=> null
console.log(ary);                //=> []
console.log(ary.delete(null));   //=> null

array = [0, 1, 2, 3, 4];
array.delete_at(2);
console.log(array);           //=> [0, 1, 3, 4]

var a = [0, 1, 2, 3, 4, 5];
a.delete_if(function(x) {return x % 2 == 0;});
console.log(a);               //=> [1, 3, 5]

var a = [1, 2, 3, 4, 5];
try{
    console.log(a.fetch(10));
}catch(e){
    console.log(e);
}
console.log(a.fetch(10, 999)); //=> 999

var a = [0, 1, 2, 3, 4];
a.fill(10);
console.log(a); //=> [10, 10, 10, 10, 10]

var a = [0, 1, 2, 3, 4];
a.fill("a");
console.log(a); //=> ["a", "a", "a", "a", "a"]

console.log([0, 1, 2].first()); //=> 0
console.log([].first());        //=> null

var a = [1, [2, 3, [4], 5]];
console.log(a.flatten());         //=> [1, 2, 3, 4, 5]
console.log(a);                   //=> [1, [2, 3, [4], 5]]

var a = [[[1, [2, 3]]]]
console.log(a.flatten());         //=> [1, 2, 3]
console.log(a);                   //=> [1, 2, 3]

console.log([1, 2, 3].flatten()); //=> null

var a = [ 1, 2, [3, [4, 5] ] ];
a.flatten(1);                     //=> [1, 2, 3, [4, 5]]

var a = [ "a", "b", "c" ];
a.include("b");   //=> true
a.include("z");   //=> false


console.log([1, 0, 0, 1, 0].index(1));                          //=> 0
console.log([1, 0, 0, 0, 0].index(1));                          //=> 0
console.log([0, 0, 0, 0, 0].index(1));                          //=> null
console.log([0, 1, 0, 1, 0].index(function(x){return x > 0;})); //=> 1

var ary = [1, 2, 3];
ary.insert(2, "a", "b");
console.log(ary);         // => [1, 2, "a", "b", 3]
ary.insert(-2, "X");
console.log(ary);         // => [1, 2, "a", "b", "X", 3]

[1, 2, 3, 4].inspect(); // => "[1, 2, 3, 4]"

console.log([0, 1, 2].last()); //=> 2
console.log([].last());       //=> null

var ary =  [0, 1, 2];
console.log(ary.last(0));
console.log(ary.last(1));
console.log(ary.last(2));
console.log(ary.last(3));
console.log(ary.last(4));
/*=> []
     [2]
     [1, 2]
     [0, 1, 2]
     [0, 1, 2]*/
     
console.log([1, null, 3, null].size()); //=> 4

console.log([1, null, 3, null].nitems());         //=> 2
console.log([1, null, 3, null].nitems(function(x){return x == 1;})); //=> ?

[1,2,3].product([4,5]);     // => [[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]
[1,2].product([1,2]);       // => [[1,1],[1,2],[2,1],[2,2]]
[1,2].product([3,4],[5,6]); // => [[1,3,5],[1,3,6],[1,4,5],[1,4,6],[2,3,5],[2,3,6],[2,4,5],[2,4,6]]
[1,2].product();            // => [[1],[2]]
[1,2].product([]);          // => []

var a = [[15,1], [25,2], [35,3]];
console.log(a.rassoc(2)); // => [25, 2]

console.log([1, 0, 0, 1, 0].rindex(1)); //=> 3
console.log([1, 0, 0, 0, 0].rindex(1)); //=> 0
console.log([0, 0, 0, 0, 0].rindex(1)); //=> null
console.log([0, 1, 0, 1, 0].rindex(function(x){return x > 0;})); //=> 3

var a = [ 1, 2, 3];         //=> [1, 2, 3]
a.shuffle();                //=> [2, 3, 1]

console.log([1, 1, 1].uniq());           // => [1]
console.log([1, 4, 1].uniq());           // => [1, 4]
console.log([1, 3, 2, 2, 3].uniq());     // => [1, 3, 2]

console.log([1, "1"].uniq());            // [1, "1"]
console.log([1, "1", 1, "1", 3].uniq()); // [1, "1", 3]

var ary = ["a", "b", "c", "d", "e"];
console.log(ary.values_at(0, 2, 4));         //=> ["a", "c", "e"]
console.log(ary.values_at(3, 4, 5, 6, 35));  //=> ["d", "e", null, null, null]
console.log(ary.values_at(0, -1, -2));       //=> ["a", "e", "d"]
console.log(ary.values_at(-4, -5, -6, -35)); //=> ["b", "a", null, null]

console.log([1,2,3].zip([4,5,6], [7,8,9])); // => [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

console.log([1,2].zip(["a","b","c"], ["A","B","C","D"])); // => [[1, "a", "A"], [2, "b", "B"]]

console.log([1,2,3,4,5].zip(["a","b","c"], ["A","B","C","D"])); // => [[1, "a", "A"], [2, "b", "B"],[3, "c", "C"], [4, null, "D"], [5, null, null]]