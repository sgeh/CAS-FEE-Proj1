Handlebars.registerHelper('checked', function(variable, value) {
    if (variable === value) {
        return new Handlebars.SafeString('checked="checked"');
    }
    else {
        return '';
    }
});

Handlebars.registerHelper('format', function(variable, format) {
    return new Handlebars.SafeString(moment(variable).format(format));
});
