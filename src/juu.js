_.extend(_, {
    ease: function (template) {
        return function (list) {
            return _.reduce(list, function (memo, value, key, list) {
                return memo + _.template(template)({
                    v: value,
                    k: key,
                    l: list
                });
            }, '');
        }
    }
});


$.extend($.fn, {
    render: function (tpl, list) {
        var template = $(tpl).html();
        var html = _.ease(template)(list);
        return this.html(html);
    }
});


$.fn.trust = function () {
    var args = _.initial(arguments);
    var first = _.first(arguments);
    var func = _.last(arguments);
    var wait = 0;

    if (typeof first === 'number') {
        args = _.rest(args);
        wait = first;
    }

    var throttle = _.throttle(func, wait);

    args.push(function (e) {
        var my = $(this);
        throttle.call(this, e, my, my.data());
    });

    return this.on.apply(this, args);
};