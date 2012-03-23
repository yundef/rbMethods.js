Array.prototype.assoc = function(obj){
    for(var i = 0, l= this.length;i<l;i++){
         if(this[i][0] == obj) return this[i];
    }
    return null;
};

Array.prototype.at = function(pos){
    if(pos < 0){
        return this[this.length + pos];
    }else{
        return this[pos];
    }
};

Array.prototype.choice = function(){
    var i = Math.floor(Math.random() * this.length);
    return this[i];
};

Array.prototype.clear = function(){
    this.splice(0, this.length);
};

Array.prototype.clone = function(){
    return this;
};

Array.prototype.dup = function(){
    return this;
};

Array.prototype.collect = function(f){
    return this.map(f);
};

Array.prototype.compact = function(){
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i] !== null) result.push(this[i]);
    }
    return result;
};

Array.prototype.delete = function(val){
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i] == val) this.splice(i, 1);
    }
    return this;
};

Array.prototype.delete_at = function(pos){
    var i = (pos < 0) ? this.length + pos: pos;
    var result = this[pos];
    this.splice(pos, 1);
    return result;
};

Array.prototype.delete_if = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        if(f(this[i])) this.splice(i, 1);
    }
    return this;
};

Array.prototype.each = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(this[i]);
    }
};

Array.prototype.each_index = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(i);
    }
};

Array.prototype.fetch = function(pos, ifnone){
    var i = (pos >= 0) ? pos : this.length + pos;
    if(i >= 0 && i < this.length){
        return this[i];
    }else if(arguments.length == 2){
        return ifnone;
    }else{
        var error     = new Error();
        error.name    = 'IndexError';
        error.message = 'index ' + i + ' out of array';
        throw error;
    }
};

Array.prototype.fill = function(p, start, range){
    var x = (arguments.length > 1) ? start : 0;
    var l = (arguments.length > 2) ? Math.min(range, this.length) : this.length;
    for(var i = x; i < l; i++){
         this[i] = (typeof p == 'function') ? p(this[i]) : p;
    }
    return this;
};

Array.prototype.first = function(n){
    if(arguments.length == 1 && n >= 0){
        return this.slice(0, n);
    }else if(arguments.length == 1 && n < 0){
        var error     = new Error();
        error.name    = 'ArgumentError';
        error.message = 'negative array size';
        throw error;
    }else{
        var result = (this.length < 1) ? null : this[0];
        return result;
    }
};

Array.prototype.flatten = function(lv){
    var result = new Array;
    var count = 0;
    var level = lv || Number.MAX_VALUE;
    var parse = function(x){
        if(typeof x == 'object' && count < level){
            count += 1;
            for(var i = 0, l = x.length; i < l; i++){
                parse(x[i]);
            }
        }else{
            result.push(x);
        }
    }
    
    for(var i = 0, l = this.length; i < l; i++){
        count = 0;
        parse(this[i]);
    }
    return result;
};


Array.prototype.include = function(val){
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i] == val) return true;
    }
    return false;
};

Array.prototype.index = function(val){
    for(var i = 0, l = this.length; i < l; i++){
        if(typeof val == 'function'){
            if(val(this[i]) === true) return i;
        }else{
            if(this[i] == val) return i;
        }
    }
    return null;
};

Array.prototype.insert = function(nth){
    var pos = (nth >= 0) ? nth : this.length + nth + 1;
    for(var i = 1, l = arguments.length; i < l; i++){
        this.splice(pos, 0, arguments[i]);
        pos += 1;
    }
    return this;
};

Array.prototype.insert = function(nth){
    var pos = (nth >= 0) ? nth : this.length + nth + 1;
    for(var i = 1, l = arguments.length; i < l; i++){
        this.splice(pos, 0, arguments[i]);
        pos += 1;
    }
    return this;
};

Array.prototype.inspect = function(){
    var parse = function(x){
        if(typeof x == 'object'){
            var temp = new Array;
            for(var i = 0, l = x.length; i < l; i++){
                temp.push(parse(x[i]));
            }
            return '[' + temp.join(', ') + ']';
        }else{
            var s = (typeof x == 'string') ? '"' + x + '"' : x;
            return s;
        }
    }
    result = parse(this);
    return result;
};

Array.prototype.last = function(n){
    if(arguments.length == 1 && n >= 0){
        return this.slice(Math.max(this.length - n, 0));
    }else if(arguments.length == 1 && n < 0){
        var error     = new Error();
        error.name    = 'ArgumentError';
        error.message = 'negative array size';
        throw error;
    }else{
        var result = (this.length < 1) ? null : this[this.length - 1];
        return result;
    }
};

Array.prototype.size = function(){
    return this.length;
};

Array.prototype.nitems = function(f){
    var count = 0;
    if(arguments.callee == 1){
        for(var i = 0, l = this.length; i < l; i++){
            if(f(this[i]) !== null) count += 1;
        }
    }else{
        for(var i = 0, l = this.length; i < l; i++){
            if(this[i] !== null) count += 1;
        }
    }
    return count;
};

Array.prototype.product = function(lists){
    var result = new Array;
    var materials = new Array;
    var materialSizes = new Array;
    var cursors = [0];
    materials.push(this);
    materialSizes.push(this.length);
    var resultSize = this.length;
    for(var i = 0, l = arguments.length; i < l; i++){
        materials.push(arguments[i]);
        materialSizes.push(arguments[i].length);
        resultSize *= arguments[i].length;
        cursors.push(0);
    }
    
    var moveCursors = function(target){
        if(cursors[target] == materialSizes[target] - 1){
            cursors[target] = 0;
            moveCursors(target - 1);
        }else{
            cursors[target] += 1;
        }
    }
    
    for(var i = 0, l = resultSize; i < l; i++){
        var element = new Array;
        for(var j = 0, m = materials.length; j < m; j++){
            element.push(materials[j][cursors[j]]);
        }
        moveCursors(materials.length - 1);
        result.push(element);
    }
    
    return result;
};

Array.prototype.rassoc = function(obj){
    for(var i = 0, l= this.length;i<l;i++){
         if(this[i][1] == obj) return this[i];
    }
    return null;
};

Array.prototype.reverse_each = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(a[l - 1 - i]);
    }
};

Array.prototype.rindex = function(val){
    var result = null;
    
    if(typeof val == 'function'){
        for(var i = 0, l = this.length; i < l; i++){
           if(val(this[i])) result = i;
        }
    }else{
        for(var i = 0, l = this.length; i < l; i++){
            if(this[i] == val) result = i;
        }
    }
    return result;
};

Array.prototype.shuffle = function(val){
    var result = new Array;
    var index = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        index.push(i);
    }
    while(index.length > 0){
        var target = Math.floor(Math.random() * index.length);
        result.push(this[index[target]]);
        index.splice(target, 1);
    }
    
    return result;
};

Array.prototype.to_a = function(){
    return this;
};

Array.prototype.to_ary = function(){
    return this;
};

Array.prototype.to_s = function(){
    return this.join('');
};

Array.prototype.transpose = function(){
    if(this.length == 0){
        return new Array;
    }else if(!this[0].length){
        var error     = new Error();
        error.name    = 'TypeError';
        error.message = 'can\'t convert Fixnum into Array';
        throw error;
    }
    
    var result = new Array;
    for(var i = 0, l = this[0].length; i < l; i++){
        var row = new Array;
        for(var j = 0, m = this.length; j < m; j++){
            row.push(this[j][i]);
        }
        result.push(row);
    }
    
    return result;
};

Array.prototype.uniq = function(){
    var o = new Object;
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        var e = this[i];
        if(!(e in o) || o[e].indexOf(typeof this[i]) == -1){
            o[e] += typeof e;
            result.push(e);
        }
    }
    
    return result;
};

Array.prototype.values_at = function(selectors){
    var result = new Array;
    for(var i = 0, l = arguments.length; i < l; i++){
        var pos = arguments[i];
        pos = (pos < 0) ? this.length + pos : pos;
        result.push(this[pos] || null);
    }
    
    return result;
};

Array.prototype.zip = function(lists){
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        var e = new Array;
        e.push(this[i]);
        for(var j = 0, m = arguments.length; j < m; j++){
            e.push(arguments[j][i] || null);
        }
        result.push(e);
    }
    
    return result;
};

String.prototype.bytes = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        var c = encodeURIComponent(this[i]);
        if(c.length == 1){
            f(c.charCodeAt(0).toString(16));
        }else{
            var array = c.split('%').slice(1);
            for(var j = 0, m = array.length; j < m; j++){
                f(array[j]);
            }
        }
    }
    return this;
}

String.prototype.each_byte = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        var c = encodeURIComponent(this[i]);
        if(c.length == 1){
            f(c.charCodeAt(0).toString(16));
        }else{
            var array = c.split('%').slice(1);
            for(var j = 0, m = array.length; j < m; j++){
                f(array[j]);
            }
        }
    }
    return this;
}

String.prototype.bytesize = function(){
    var count = 0;
    for(var i = 0, l = this.length; i < l; i++){
        var c = encodeURIComponent(this[i]);
        if(c.length == 1){
            count += 1;
        }else{
            var array = c.split('%').slice(1);
            count += array.length;
        }
    }
    return count;
}

String.prototype.capitalize = function(){
    var str = this[0].toUpperCase();
    str += this.substring(1).toLowerCase();
    return str;
}

String.prototype.casecmp = function(other){
    var x = this.toLowerCase();
    var y = other.toLowerCase();
    
    if(x > y) return 1;
    if(x < y) return -1;
    return 0;
}

String.prototype.center = function(width, padding){
    if(this.length >= width) return this;
    var spacer = padding || ' ';
    var margin = width - this.length;
    var marginLeft = Math.floor(margin / 2);
    var marginRight = Math.ceil(margin / 2);
    var left = '';
    var right = '';
    for(var i = 0; i < marginLeft; i++){
        left += spacer;
    }
    for(var i = 0; i < marginRight; i++){
        right += spacer;
    }
    return left + this + right;
}

String.prototype.chars = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(this[i]);
    }
    return this;
}

String.prototype.each_char = function(f){
    for(var i = 0, l = this.length; i < l; i++){
        f(this[i]);
    }
    return this;
}

String.prototype.chomp = function(rs){
    if(rs === null) return this;
    
    var cut = function(str, token, loop){
        if(str.substring(str.length - token.length, str.length) == token){
            var chomped = str.substring(0, str.length - token.length);
            return loop ? cut(chomped, token, true) : chomped;
        }else{
            return str;
        }
    }
    
    if(rs === undefined){
        var ta = document.createElement('textarea');
        ta.value = '\n';
        var target = ta.value;
        if(target == '\n'){
            return cut(cut(cut(this, '\n'), '\r'), '\r\n');
        }else{
            return cut(this, target);
        }
    }else if(rs == ''){
        var ta = document.createElement('textarea');
        ta.value = '\n';
        var target = ta.value;
        return cut(this, target, true);
    }else{
        return cut(this, rs);
    }
}

String.prototype.chop = function(){
    var l = this.length;
    if(this.charAt(l - 1) == '\n'){
        if(this.charAt(l - 2) == '\r'){
            return this.substring(0, l - 2);
        }else{
            return this.substring(0, l -1);
        }
    }else{
        return this.substring(0, l - 1);
    }
}

String.prototype.count = function(chars){
    var count = 0;
    for(var i = 0, l = this.length; i <l; i++){
        var flag = true;
        for(var j = 0, m = arguments.length; j < m; j++){
            var re = new RegExp('[' + arguments[j] + ']');
            if(!re.test(this[i])){
                flag = false;
                break;
            }
        }
        if(flag) count += 1;
    }
    return count;
}

String.prototype.delete = function(strs){
    var result =new Array;
    for(var i = 0, l = this.length; i <l; i++){
        var flag = false;
        for(var j = 0, m = arguments.length; j < m; j++){
            var re = new RegExp('[' + arguments[j] + ']');
            if(!re.test(this[i])){
                flag = true;
                break;
            }
        }
        if(flag) result.push(this[i]);
    }
    return result.join('');
}

String.prototype.downcase = function(){
    return this.toLowerCase();
}

String.prototype.dump = function(){
    var dumped = '';
    for(var i = 0, l = this.length; i < l; i++){
        var s = this[i];
        var n = s.charCodeAt(0);
        if(n > 126){
            var c = encodeURIComponent(s);
            var array = c.split('%').slice(1);
            console.log(array);
            var result = '';
            for(var j = 0, m = array.length; j < m; j++){
                var code = '0x' + array[j] - 0;
                result += '\\' + code.toString(8);
            }
            dumped += result;
        }else if(n >= 7 && n <= 13 || n == 27 || n == 34 || n==92){
            dumped += {
                '7':'\\a',
                '8':'\\b',
                '9':'\\t',
                '10':'\\n',
                '11':'\\v',
                '12':'\\f',
                '13':'\\r',
                '27':'\\e',
                '34':'\\"',
                '92':'\\\\'
            }[n];
        }else if(n < 32){
            dumped += (n < 10) ? '\\00' + n : '\\0' + n;
        }else{
            dumped += s;
        }
    }
    return '"' + dumped + '"';
}

String.prototype.each_line = function(f){
    var ta = document.createElement('textarea');
    ta.value = '\n';
    var newline = ta.value;
    var array = this.split(newline);
    for(var i = 0, l = array.length; i < l; i++){
        if(array[i].length > 0) f(array[i]);
    }
}

String.prototype.lines = function(f){
    var ta = document.createElement('textarea');
    ta.value = '\n';
    var newline = ta.value;
    var array = this.split(newline);
    for(var i = 0, l = array.length; i < l; i++){
        if(array[i].length > 0) f(array[i]);
    }
}

String.prototype.empty = function(){
    return this.length < 1;
}

String.prototype.end_with = function(str){
    return this.substring(this.length - str.length, this.length) == str;
}

String.prototype.eql = function(other){
    return this == other;
}

String.prototype.gsub = function(pattern, replace){
    var re = new RegExp(pattern.source, 'g');
    return this.replace(re, replace);
}

String.prototype.hex = function(){
    if(this.length == 0) return 0;
    var str = this.replace(/0x/gi, '').replace(/_/g, '');
    var negative = false;
    if(str[0] == '-'){
        negative = true;
        str = str.substring(1, str.length);
    }
    var array = new Array;
    for(var i = 0, l = str.length; i < l; i++){
        if(str[i].match(/[\da-f]/i)){
            array.unshift(str[i]
                .replace(/a/i, 10)
                .replace(/b/i, 11)
                .replace(/c/i, 12)
                .replace(/d/i, 13)
                .replace(/e/i, 14)
                .replace(/f/i, 15));
        }else{
            break;
        }
    }
    var result = 0;
    for(var i = 0, l = array.length; i < l; i++){
        result += array[i] * Math.pow(16, i);
    }
    return negative ? -1 * result : result;
}

String.prototype.include = function(substr){
    var re = new RegExp(substr);
    return re.test(this);
}

String.prototype.index = function(pattern, pos){
    var start = pos || 0;
    start = (start < 0) ? this.length + start : start;
    var str = this.substring(start, this.length);
    var m = str.match(pattern);
    return m ? m.index + start : null;
}

String.prototype.insert = function(pos, other){
    return this.substring(0, pos) + other + this.substring(pos, this.length);
}

String.prototype.inspect = function(){
    var dumped = '';
    for(var i = 0, l = this.length; i < l; i++){
        var s = this[i];
        var n = s.charCodeAt(0);
        if(n >= 7 && n <= 13 || n == 27 || n == 34 || n==92){
            dumped += {
                '7':'\\a',
                '8':'\\b',
                '9':'\\t',
                '10':'\\n',
                '11':'\\v',
                '12':'\\f',
                '13':'\\r',
                '27':'\\e',
                '34':'\\"',
                '92':'\\\\'
            }[n];
        }else if(n < 32){
            dumped += (n < 10) ? '\\00' + n : '\\0' + n;
        }else{
            dumped += s;
        }
    }
    return '"' + dumped + '"';
}

String.prototype.ljust = function(width, padding){
    if(this.length >= width) return this;
    var spacer = padding || ' ';
    var margin = width - this.length;
    var right = '';
    for(var i = 0; i < margin; i++){
        right += spacer;
    }
    return this + right;
}

String.prototype.lstrip = function(){
    var pos = 0;
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i].match(/[ \t\r\n\f\v]/)){
            pos += 1;
        }else{
            break;
        }
    }
    return this.substring(pos, this.length);
}

String.prototype.succ = function(){
    if(this.length == 0) return '';
    
    var forward = function(c){
        if(c == '9') return '0';
        if(c == 'z') return 'a';
        if(c == 'Z') return 'A';
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    
    var success = true;
    var count = 0;
    var last;
    var type;
    var result = new Array;
    
    for(var i = 0, l = this.length; i < l; i++){
        var s = this[this.length - i - 1];
        if(success && s.match(/\w/)){
            type = s;
            last = i;
            count += 1;
            success = (s.match(/[9z]/i)) ? true : false;
            result.push(forward(s));
        }else{
            result.push(s);
        }
    }
    
    if(count == 0){
        var l = this.length - 1;
        var lastChar = String.fromCharCode(this.charCodeAt(l) + 1);
        return this.substring(0, l) + lastChar;
    }
    
    if(success == true && count > 0){
        if(type.match(/\d/)) result[last] = 10;
        if(type.match(/[a-z]/)) result[last] = 'aa';
        if(type.match(/[A-Z]/)) result[last] = 'AA';
    }
    return result.reverse().join('');
}

String.prototype.next = function(){
    if(this.length == 0) return '';
    
    var forward = function(c){
        if(c == '9') return '0';
        if(c == 'z') return 'a';
        if(c == 'Z') return 'A';
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    
    var success = true;
    var count = 0;
    var last;
    var type;
    var result = new Array;
    
    for(var i = 0, l = this.length; i < l; i++){
        var s = this[this.length - i - 1];
        if(success && s.match(/\w/)){
            type = s;
            last = i;
            count += 1;
            success = (s.match(/[9z]/i)) ? true : false;
            result.push(forward(s));
        }else{
            result.push(s);
        }
    }
    
    if(count == 0){
        var l = this.length - 1;
        var lastChar = String.fromCharCode(this.charCodeAt(l) + 1);
        return this.substring(0, l) + lastChar;
    }
    
    if(success == true && count > 0){
        if(type.match(/\d/)) result[last] = 10;
        if(type.match(/[a-z]/)) result[last] = 'aa';
        if(type.match(/[A-Z]/)) result[last] = 'AA';
    }
    return result.reverse().join('');
}

String.prototype.oct = function(){
    if(this.length == 0) return 0;
    
    var mode = 8;
    var regs = {'2':/[01]/, '8':/[0-7]/, '16':/[\da-f]/i};
    var str = this.replace(/0x|0b/gi, function(s){
        if(s == '0x' || s == '0X'){
            mode = 16;
        }else{
            mode = 2;
        }
        return '';
    });
    str = str.replace('_', '');
    
    var negative = false;
    if(str[0] == '-'){
        negative = true;
        str = str.substring(1, str.length);
    }
    var array = new Array;
    for(var i = 0, l = str.length; i < l; i++){
        if(str[i].match(regs[mode])){
            array.unshift(str[i]
                .replace(/a/i, 10)
                .replace(/b/i, 11)
                .replace(/c/i, 12)
                .replace(/d/i, 13)
                .replace(/e/i, 14)
                .replace(/f/i, 15));
        }else{
            break;
        }
    }
    var result = 0;
    for(var i = 0, l = array.length; i < l; i++){
        result += array[i] * Math.pow(mode, i);
    }
    return negative ? -1 * result : result;
}

String.prototype.partition = function(sep){
    var pos;
    var result = new Array;
    var re = new RegExp(sep);
    
    var m = re.exec(this);
    if(m === null || sep.length == 0){
        result.push(this);
        result.push('');
        result.push('');
        return result;
    }else{
        pos = m.index;
        result.push(this.substring(0, pos));
        result.push(sep);
        result.push(this.substring(pos + sep.length, this.length));
        return result;
    }
}


String.prototype.reverse = function(){
    var result = new Array;
    for(var i = 0, l = this.length; i < l; i++){
        result.unshift(this[i]);
    }
    return result.join('');
}

String.prototype.rindex = function(pattern, pos){
    var start = pos || this.length;
    start = (start < 0) ? this.length + start : start;
    var result = null;
    for(var i = 0, l = this.length; i < l; i++){
        var index = start - i;
        if(this.substr(index, pattern.length) == pattern){
            result = index;
            break;
        }
    }
    return result;
}

String.prototype.rjust = function(width, padding){
    if(this.length >= width) return this;
    var spacer = padding || ' ';
    var margin = width - this.length;
    var left = '';
    for(var i = 0; i < margin; i++){
        left += spacer;
    }
    return left + this;
}

String.prototype.rpartition = function(sep){
    var pos = this.lastIndexOf(sep);
    var result = new Array;
    if(m === null || sep.length == 0){
        result.push('');
        result.push('');
        result.push(this);
        return result;
    }else{
        pos = m.index;
        result.push(this.substring(0, pos));
        result.push(sep);
        result.push(this.substring(pos + sep.length, this.length));
        return result;
    }
}

String.prototype.rstrip = function(){
    var pos = this.length;
    for(var i = 0, l = this.length; i < l; i++){
        if(this[this.length - i - 1].match(/[ \t\r\n\f\v\0]/)){
            pos -= 1;
        }else{
            break;
        }
    }
    return this.substring(0, pos);
}

String.prototype.scan = function(re, f){
    re = new RegExp(re.source, 'g');
    if(arguments.length == 2){
        return this.replace(re, f);
    }else{
        var result = new Array;
        var m;
        while((m = re.exec(this)) != null){
            if(m[1]){
                result.push(m.slice(1, m.length));
            }else{
                result.push(m[0]);
            }
        }
        return result;
    }
}

String.prototype.squeeze = function(chars){
    var regs = new Array;
    for(var i = 0, l = arguments.length; i < l; i++){
        regs.push(new RegExp('[' + arguments[i] + ']'));
    }
    var result = new Array;
    var last = '';
    if(arguments.length == 0){
        for(var i = 0, l = this.length; i < l; i++){
            if(this[i] != last) result.push(this[i]);
            last = this[i];
        }
    }else{
        var regs = new Array;
        for(var i = 0, l = arguments.length; i < l; i++){
            regs.push(new RegExp('[' + arguments[i] + ']'));
        }
        for(var i = 0, l = this.length; i < l; i++){
            var flag = true;
            for(var j = 0, m = regs.length; j < m; j++){
                if(!regs[j].test(this[i])){
                    flag = false;
                    break;
                }
            }
            if(flag == false || this[i] != last) result.push(this[i]);
            last = this[i];
        }
    }
    
    return result.join('');
}

String.prototype.start_with = function(str){
    return this.substr(0, str.length) == str;
}

String.prototype.strip = function(){
    var lpos = 0;
    for(var i = 0, l = this.length; i < l; i++){
        if(this[i].match(/[ \t\r\n\f\v]/)){
            lpos += 1;
        }else{
            break;
        }
    }
    var rpos = this.length;
    for(var i = 0, l = this.length; i < l; i++){
        if(this[this.length - i - 1].match(/[ \t\r\n\f\v\0]/)){
            rpos -= 1;
        }else{
            break;
        }
    }
    return this.substring(lpos, rpos);
}

String.prototype.swapcase = function(){
    return this.replace(/[a-zA-Z]/g, function(s){
        return (/[a-z]/.test(s)) ? s.toUpperCase(): s.toLowerCase();
    });
}

String.prototype.to_f = function(){
    return parseFloat(this.replace(/_/g, ''));
}

String.prototype.to_i = function(base){
    if(this.length == 0) return 0;
    
    var mode = base || 10;
    
    if(base == 0){
        var prefix = this.substr(0, 2);
        if(prefix.match(/0b/i)) mode = 2;
        if(prefix.match(/0o/i)) mode = 8;
        if(prefix.match(/0[1-9]/)) mode = 8;
        if(prefix.match(/0d/i)) mode = 10;
        if(prefix.match(/0x/i)) mode = 16;
    }
    
    
    var str = this;
    if(base !== undefined) str = str.replace(/0x|0b|0o|0d/i, '');
    str = str.replace(/[ _+]/g, '');
        
    var negative = false;
    if(str[0] == '-'){
        negative = true;
        str = str.substring(1, str.length);
    }
    var array = new Array;
    
    var regs = {'2':/[01]/, '8':/[0-7]/, '10':/[\d]/, '16':/[\da-f]/i};
    
    for(var i = 0, l = str.length; i < l; i++){
        if(str[i].match(regs[mode])){
            array.unshift(str[i]
                .replace(/a/i, 10)
                .replace(/b/i, 11)
                .replace(/c/i, 12)
                .replace(/d/i, 13)
                .replace(/e/i, 14)
                .replace(/f/i, 15));
        }else{
            break;
        }
    }
    var result = 0;
    for(var i = 0, l = array.length; i < l; i++){
        result += array[i] * Math.pow(mode, i);
    }
    return negative ? -1 * result : result;
}

String.prototype.to_s = function(){
    return this;
}

String.prototype.to_str = function(){
    return this;
}

String.prototype.tr = function(pattern, replace){
    var parse = function(exp){
        var array = new Array;
        for(var i = 0, l = exp.length; i < l; i++){
            if(exp[i] == '-'){
                var code = exp[i - 1].charCodeAt(0) + 1;
                while(code < exp[i + 1].charCodeAt(0)){
                    array.push(String.fromCharCode(code));
                    code += 1;
                }
            }else{
                array.push(exp[i]);
            }
        }
        return array;
    }
    
    var negative =false;
    var patterns = parse(pattern);
    
    if(pattern[0] == '^'){
        negative = true;
        patterns.shift();
    }
    
    var replacers = parse(replace);
    return this.replace(/./g, function(s){
        if(negative == false){
            for(var i = 0, l = patterns.length; i < l; i++){
                if(patterns[i] == s){
                    s = replacers[Math.min(i, replacers.length - 1)];
                }
            }
        }else{
            var flag = true;
            for(var i = 0, l = patterns.length; i < l; i++){
                if(patterns[i] == s){
                    flag = false;
                }
            }
            if(flag) s = replacers[0];
        }
        return s;
    });
}

String.prototype.tr_s = function(pattern, replace){
    var parse = function(exp){
        var array = new Array;
        for(var i = 0, l = exp.length; i < l; i++){
            if(exp[i] == '-'){
                var code = exp[i - 1].charCodeAt(0) + 1;
                while(code < exp[i + 1].charCodeAt(0)){
                    array.push(String.fromCharCode(code));
                    code += 1;
                }
            }else{
                array.push(exp[i]);
            }
        }
        return array;
    }
    
    var negative =false;
    var patterns = parse(pattern);
    
    if(pattern[0] == '^'){
        negative = true;
        patterns.shift();
    }
    
    var replacers = parse(replace);
    var last;
    var array = new Array;
    this.replace(/./g, function(s){
        if(negative == false){
            for(var i = 0, l = patterns.length; i < l; i++){
                if(patterns[i] == s){
                    s = replacers[Math.min(i, replacers.length - 1)];
                    if(s == last){
                        s = '';
                    }else{
                        last = s;
                    }
                }
            }
        }else{
            var flag = true;
            for(var i = 0, l = patterns.length; i < l; i++){
                if(patterns[i] == s){
                    flag = false;
                }
            }
            if(flag){
                s = replacers[0];
                if(s == last){
                    s = '';
                }else{
                    last = s;
                }
            }
        }
        array.push(s);
    });
    
    return array.join('');
}

String.prototype.upcase = function(){
    return this.toUpperCase();
}
