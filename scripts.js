
function formatStackTrace(stackTrace, output) {
    var html = addTag(formatTitle(stackTrace), "div", "title-container");

    var rows =
        stackTrace.substr(stackTrace.indexOf(" at ") + 4)
            .split(" at ");

    rows.forEach(function (frame) {
        html += addTag(FormatFrame(frame), "div", "frame");
    });

    $(output).html(html);
}


function formatTitle(stackTrace) {
    var title = stackTrace.substr(0, stackTrace.indexOf(" at ")) + "<br>";

    return addTag(title, "span", "ex-message");
}

function FormatFrame(frame) {
    var namespace = formatNamespace(frame);
    var inLocation = formatLocation(frame);

    return "at " + namespace + inLocation + "<br>"
}

function formatLocation(frame) {
    var separatorIndex = frame.indexOf(" in ");

    if (separatorIndex === -1)
        return "";

    var fullPath = frame.substr(separatorIndex + 4)

    var path = addTag(fullPath.substr(0, fullPath.indexOf(":line")), "span", "path")

    var line = addTag(fullPath.substr(fullPath.indexOf(":line")), "span", "line")

    return "<br>--> in " + path + line;
}

function formatNamespace(frame) {
    var separatorIndex = frame.indexOf(" in ");

    var frameSubstr =
        separatorIndex === -1
            ? frame
            : frame.substr(0, separatorIndex);

    var splited = frameSubstr.split(".");

    var splitedNamespace = splited.slice(0, splited.length - 2);

    var splitedClassName = splited.slice(splited.length - 2, splited.length - 1);

    var namespace = addTag(splitedNamespace.join('.') + '.', "span", "namespace");

    var className = addTag(splitedClassName, "span", "className")

    var fullMethod = splited[splited.length - 1];

    var method = addTag(fullMethod.substr(0, fullMethod.indexOf('(')), "span", "method")

    var methodParameters = formatMethodParameters(fullMethod);

    return namespace + className + "." + method + '(' + methodParameters + ')';
}

function formatMethodParameters(fullMethodSlice) {
    var indexA = fullMethodSlice.indexOf('(') + 1;
    var indexB = fullMethodSlice.lastIndexOf(")");

    var parameters =
        fullMethodSlice.substr(indexA, indexB - indexA)
            .split(', ');

    if (parameters[0] === '')
        return "";

    var taggedParameters =
        parameters.map(function (parameter) {
            var temp = "";

            var splited = parameter.split(" ");

            temp += addTag(splited[0], "span", "parameter-type")
            temp += addTag(" " + splited[1], "span", "parameter-name")

            return temp;
        });

    return taggedParameters.join(", ")
}

function addTag(content, tag, classname) {
    return "<" + tag + " class='" + classname + "'>" + content + "</" + tag + ">";
}