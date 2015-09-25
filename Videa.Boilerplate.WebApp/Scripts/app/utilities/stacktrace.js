var videa = (function (root) {
    return root;
})(videa || {});

videa.stacktrace = (function ($) {
    var root = {};
    var jsMaxErrorsToLog;
    var pageErrors = 0;

    function logError(ex, stack) {
        if (ex == null) {
            return;
        }

        var logErrorUrl = '/Error/LogJavaScriptError';
        var url = ex.fileName != null ? ex.fileName : document.location;
        if (stack == null && ex.stack != null) {
            stack = ex.stack;
        }

        // format output
        var out;

        if (stack != null) {
            if (ex.message != null) {
                out = stack;
            } else {
                out = ex.message != null ? ex.name + ": " + ex.message : ex;
                out += ": at document path '" + url + "'.";
                out += "\n  at " + stack.join("\n  at ");
            }
        }

        // send error message
        $.ajax({
            type: 'POST',
            url: logErrorUrl,
            data: {
                message: out.replace('<', '(').replace('>', ')')
            }
        });
    }

    Function.prototype.trace = function() {
        var trace = [];
        var current = this;
        while (current) {
            trace.push(current.signature());
            current = current.caller;
        }
        return trace;
    }

    Function.prototype.signature = function() {
        var signature = {
            name: this.getName(),
            params: [],
            toString: function() {
                var params = this.params.length > 0 ?
                    "'" + this.params.join("', '") + "'" : "";
                return this.name + "(" + params + ")"
            }
        };

        if (this.arguments) {
            for (var x = 0; x < this.arguments.length; x++)
                signature.params.push(this.arguments[x]);
        }
        return signature;
    }

    Function.prototype.getName = function() {
        if (this.name) {
            return this.name;
        }

        var definition = this.toString().split("\n")[0];
        var exp = /^function ([^\s(]+).+/;

        if (exp.test(definition)) {
            return definition.split("\n")[0].replace(exp, "$1") || "anonymous";
        }
        return "anonymous";
    }

    window.onerror = function(msg, url, lineNumber, column, errorObj) {
        if (pageErrors < jsMaxErrorsToLog) {
            if (errorObj && typeof errorObj !== 'undefined') {
                logError(errorObj);
            } else if (arguments != null && arguments.callee != null && arguments.callee.trace) {
                logError(msg, arguments.callee.trace());
            }
        }
    }

    root.init = function(config) {
        jsMaxErrorsToLog = config.jsMaxErrorsToLog;
    };

    return root;
})(jQuery);