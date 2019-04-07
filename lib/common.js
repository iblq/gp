/**
 * Created by liujin834 on 5/1/16.
 */
Error.prototype.status = function(statusCode){
    if (arguments.length === 0) return this.statusCode;
    this.statusCode = statusCode;
    return this;
};

if (!String.prototype.trim) {
    String.prototype.trim = function(){
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

String.prototype.removeScript = function() {
    return this.replace(/<script/i, '&lt;script').replace(/<\/script/i, '&lt;/script');
};

String.prototype.deleteTag = function(option) {              //Delete the tag completely
    let string = this;
    if (option && option.keepNewline) {
        string = string.replace(/(<br.{0,2}>|<\/?p>|<\/?div>|<\/?section>|<\/?article>|<\/?h\d>)/gi, '\n');
    }
    string = string.replace(/<[^>]*?>/gi, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#039;/gi, "'")
        .replace(/&amp;/gi, "&")
        .trim();
    while (string.contains('\n\n')) {
        string = string.replace(/\n\n/g, '\n');
    }
    return string;
};