window.Set = function() {
    this.content = {};
}
Set.prototype.content = function() {
    return this.content;
}
Set.prototype.add = function(val) {
    this.content[val] = true;
}
Set.prototype.remove = function(val) {
    delete this.content[val];
}
Set.prototype.contains = function(val) {
    return (val in this.content);
}
Set.prototype.asArray = function() {
    var res = [];
    for (var val in this.content) res.push(val);
    return res;
}
