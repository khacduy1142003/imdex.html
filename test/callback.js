var courses = [
    'Javascript',
    'PHP',
    'Ruby',
    'PHP'
]

Array.prototype.map2 = function(callback) {
    var output = [],arrayLength = this.length;
    for(var i=0; i < arrayLength; ++i) {
        var result = callback(this[i],i);
        output.push(result);
    }
    return output;
}
var htmls = courses.map2(function(course) {
    return `<h2>${course}</h2>`
})

// var htmls = courses.map(function(course) {
//     return `<h2>${course}</h2>`
// })

Array.prototype.find2 = function(callback){
    var output = [];
    for(var i =0; i<this.length;++i) {
        if(callback(this[i],i)) {
            output.push(this[i])
        }
    }
    return output;
}
var finds = courses.find2(function(course){
    return course === 'Ruby';
})

Array.prototype.filter2 = function(callback){
    var output = [];
    for(var i= 0;i <this.length;++i) {
        if(callback(this[i],i)) {
            output.push(this[i])
        }
    }
    return output;
}
var filters = courses.filter2(function(couser){
    return couser === 'PHP';
})
console.log(filters.join(''))
console.log(finds.join(''))
console.log(htmls.join(''))