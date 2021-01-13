module.exports.tokenize = (input)=>{
const str = input.toLowerCase().trim();
const subStrings = str.split(/[ ,-]/); // seperate after each ' ' or '-'
var tokens = [];
subStrings.forEach(subStr => {
    for (let index = 1; index < subStr.length + 1; index++) {
        tokens.push(subStr.substr(0,index))
    }
});

return tokens;
}