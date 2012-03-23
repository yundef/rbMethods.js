"str".each_byte(function(b){console.log(b);});
// => 115
// => 116
// => 114

console.log("いろは".length);     //=> 6
console.log("いろは".bytesize()); //=> 9

console.log("foobar--".capitalize()); // => "Foobar--"
console.log("fooBAR--".capitalize()); // => "Foobar--"
console.log("FOOBAR--".capitalize()); // => "Foobar--"

console.log('a'.casecmp('A')); // => 0

console.log("foo".center(10));      // => "   foo    "
console.log("foo".center(9));       // => "   foo   "
console.log("foo".center(8));       // => "  foo   "
console.log("foo".center(7));       // => "  foo  "
console.log("foo".center(3));       // => "foo"
console.log("foo".center(2));       // => "foo"
console.log("foo".center(1));       // => "foo"
console.log("foo".center(10, "*")); // => "***foo****"

"hello世界".each_char(function(c){console.log(c);});

console.log("foo\n".chomp());         // => "foo"
console.log("foo\n".chomp("\n"));     // => "foo"
console.log("foo\r\n".chomp("\r\n")); // => "foo"

console.log("foo\r".chomp());         // => "foo"
console.log("foo\r\n".chomp());       // => "foo"
console.log("foo\n".chomp());         // => "foo"
console.log("foo\n\r".chomp());       // => "foo\n"

console.log("string\n".chop());   // => "string"
console.log("string\r\n".chop()); // => "string"
console.log("string".chop());     // => "strin"
console.log("strin".chop());      // => "stri"
console.log("".chop());           // => ""

console.log('abcdefg'.count('c'));             // => 1
console.log('123456789'.count('2378'));        // => 4
console.log('123456789'.count('2-8', '^4-6')); // => 4

console.log("123456789".delete("2378"));        //=> "14569"
console.log("123456789".delete("2-8", "^4-6")); //=> "14569"

console.log("STRing?".downcase()); // => "string?"

console.log("abc\r\n\f\x00\b10\\\"".dump()); // => "abc\r\n\f\000\01010\\\""

"aa\nbb\ncc\n".each_line(function(l){console.log(l);});
// => "aa\n"
// => "bb\n"
// => "cc\n"

"string".end_with("ing"); // => true
"string".end_with("str"); // => false

"2.5".gsub(".", ",") // => "2,5"

console.log('abcdefg'.gsub(/def/, '!!'));         // => "abc!!g"
console.log('abcabc'.gsub(/b/, '<<$&>>'));        // => "a<<b>>ca<<b>>c"
console.log('xxbbxbb'.gsub(/x+(b+)/, 'X<<$1>>')); // => "X<<bb>>X<<bb>>"

console.log('abcabc'.gsub(/[bc]/, function(s){return s.toUpperCase();})); //=> "aBCaBC"

console.log("10".hex());    // => 16
console.log("ff".hex());    // => 255
console.log("0x10".hex());  // => 16
console.log("-0x10".hex()); // => -16

console.log("xyz".hex());   // => 0
console.log("10z".hex());   // => 16
console.log("1_0".hex());   // => 16

console.log("".hex());      // => 0

console.log("astrochemistry".index("str"));    // => 1
console.log("regexpindex".index(/e.*x/, 2));   // => 3
console.log("character".index('c'));           // => 0

console.log("foobarfoobar".index("bar", 6));   // => 9
console.log("foobarfoobar".index("bar", -6));  // => 9

str = "foobaz";
str.insert(3, "bar");
console.log(str); // => "foobarbaz"

console.log("string".inspect()); // => "string"
console.log("\t\r\n".inspect()); // => "\t\r\n"

console.log("foo".ljust(10));      // => "foo       "
console.log("foo".ljust(9));       // => "foo      "
console.log("foo".ljust(8));       // => "foo     "
console.log("foo".ljust(2));       // => "foo"
console.log("foo".ljust(1));       // => "foo"
console.log("foo".ljust(10, "*")); // => "foo*******"

console.log("  abc\n".lstrip());  //=> "abc\n"
console.log("\t abc\n".lstrip()); //=> "abc\n"
console.log("abc\n".lstrip());    //=> "abc\n"

console.log("aa".succ()); // => "ab"

console.log("99".succ());    // => "100"
console.log("a9".succ());    // => "b0"
console.log("Az".succ());    // => "Ba"
console.log("zz".succ());    // => "aaa"
console.log("-9".succ());    // => "-10"
console.log("9".succ());     // => "10"
console.log("09".succ());    // => "10"

console.log("1.9.9".succ()); // =>"2.0.0"

console.log(".".succ());     // => "/"
console.log("\0".succ());    // => "\001"
console.log("\377".succ());  // => "\001\000"

console.log("10".oct());     // => 8
console.log("010".oct());    // => 8
console.log("8".oct());      // => 0
console.log("0b10".oct());   // => 2
console.log("10".oct());     // => 8
console.log("010".oct());    // => 8
console.log("0x10".oct());   // => 16
console.log("-010".oct());   // => -8
console.log("-0x10".oct());  // => 0
console.log("-0b10".oct());  // => 0

console.log("1_0_1x".oct()); // => 65

console.log("axaxa".partition("x")); // => ["a", "x", "axa"]
console.log("aaaaa".partition("x")); // => ["aaaaa", "", ""]
console.log("aaaaa".partition(""));  // => ["aaaaa", "", ""]

console.log("foobar".reverse()); // => "raboof"
console.log("".reverse());       // => ""

console.log("foo".rjust(10));      // => "       foo"
console.log("foo".rjust(9));       // => "      foo"
console.log("foo".rjust(8));       // => "     foo"
console.log("foo".rjust(2));       // => "foo"
console.log("foo".rjust(1));       // => "foo"
console.log("foo".rjust(10, "*")); // => "*******foo"

console.log("  abc\n".rstrip());        //=> "  abc"
console.log("  abc \t\r\n\0".rstrip()); //=> "  abc"
console.log("  abc".rstrip());           //=> "  abc"
console.log("  abc\0 ".rstrip());       //=> "  abc"

console.log("foobar".scan(/../));                  // => ["fo", "ob", "ar"]
console.log("foobarbazfoobarbaz".scan(/ba./));     // => ["bar", "baz", "bar", "baz"]

console.log("foobar".scan(/(.)/));                 // => [["f"], ["o"], ["o"], ["b"], ["a"], ["r"]]

console.log("foobarbazfoobarbaz".scan(/(ba)(.)/)); // => [["ba", "r"], ["ba", "z"], ["ba", "r"], ["ba", "z"]]
    
"foobarbazfoobarbaz".scan(/ba./, function(s){console.log(s);});
// => "bar"
//    "baz"
//    "baz"
//    "baz"

"foobarbazfoobarbaz".scan(/(ba)(.)/, function(s){console.log(s);});
// => ["ba", "r"]
//    ["ba", "z"]
//    ["ba", "r"]
//    ["ba", "z"]
    
console.log("112233445566778899".squeeze());              // =>"123456789"
console.log("112233445566778899".squeeze("2-8"));         // =>"11234567899"

console.log("112233445566778899".squeeze("2378"));        // =>"11234455667899"
console.log("112233445566778899".squeeze("2-8", "^4-6")); // =>"11234455667899"

"string".start_with("str"); // => true
"string".start_with("ing"); // => false

console.log("  abc  \r\n".strip());    //=> "abc"
console.log("abc\n".strip());          //=> "abc"
console.log("  abc".strip());          //=> "abc"
console.log("abc".strip());            //=> "abc"
console.log("  \0  abc  \0".strip()); // => "\000  abc"  ); // 右側のみ "\0" も取り除く

console.log("ABCxyz".swapcase()); // => "abcXYZ"
console.log("Access".swapcase()); // => "aCCESS"

console.log("10".to_f()); // => 10.0
console.log("10e2".to_f()); // => 1000.0
console.log("1e-2".to_f()); // => 0.01
console.log(".1".to_f()); // => 0.1

console.log("nan".to_f()); // => 0.0
console.log("INF".to_f()); // => 0.0
console.log("-Inf".to_f()); // => -0.0

console.log("".to_f());   // => 0.0
console.log("1_0_0".to_f()); // => 100.0
console.log(" \n10".to_f()); // => 10.0
console.log("0xa.a".to_f()); // => 0.0

console.log(" 10".to_i()); // => 10
console.log("+10".to_i()); // => 10
console.log("-10".to_i()); // => -10

console.log("010".to_i()); // => 10
console.log("-010".to_i()); // => -10
console.log("0x11".to_i()); // => 0
console.log("".to_i());   // => 0
console.log("01".to_i(2)); // => 1
console.log("0b1".to_i(2)); // => 1

console.log("07".to_i(8)); // => 7
console.log("0o7".to_i(8)); // => 7

console.log("1f".to_i(16)); // => 31
console.log("0x1f".to_i(16)); // => 31

console.log("0b10".to_i(0)); // => 2
console.log("0o10".to_i(0)); // => 8
console.log("010".to_i(0)); // => 8
console.log("0d10".to_i(0)); // => 10
console.log("0x10".to_i(0)); // => 16

console.log("foo".tr("f", "X"));   // => "Xoo"
console.log("foo".tr('a-z', 'A-Z')); // => "FOO"
console.log("FOO".tr('A-Z', 'a-z')); // => "foo"

console.log("gooooogle".tr_s("o", "X"));   // => "gXgle"
console.log("gooooogle".tr_s("a-z", "A-Z")); // => "GOGLE"
console.log("foo".tr_s("o", "f"));   // => "ff"
console.log("foo".tr("o", "f").squeeze("f")); // => "f"