var template_list = {};

const data = {
    message : ""
};

const load_template =()=> {
    const templates = document.querySelectorAll('[type="text/x-handlebars-template"]');
    templates.forEach(function (template, index) {
        let id = template.id.replace('-template', '');
        return template_list[id] = Handlebars.compile(template.innerHTML)
    });
}

const load_partials =()=> {
    const partials = document.querySelectorAll('[type="text/x-handlebars-partial"]');
    partials.forEach(function (partial, index) {
        let id = partial.id.replace('-partial', '');
        return Handlebars.registerPartial(id, Handlebars.compile(partial.innerHTML))
    });
}

const render_template =(template_name, data)=>{
  var html = template_list[template_name](data);
  var content = document.querySelector('main');
  content.innerHTML = html;
}

const render_partial =(partial_name, data)=>{
  var html = Handlebars.partials[partial_name](data);
  var content = document.querySelector('main');
  content.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", ()=> {
  load_template();
  load_partials();
  render_template('main', data);
});

Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});