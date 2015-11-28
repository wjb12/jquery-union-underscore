_.extend(_, {

    //依次执行对象上的方法
    order: function (obj, list) {
        return _.map(list, function (value) {
            return obj[value]();
        });
    },

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
    },

    //时间格式化
    dateFormat: function (time, format) {

        var arr = _.order(new Date(time), ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getDay']);
        arr[6] = '星期' + ('日一二三四五六')[arr[6]];

        //补0
        arr = _.map(arr, function (number) {
            number = number.toString();
            return number = number < 10 ? '0' + number : number;
        });

        return format
            .replace('yyyy', arr[0])
            .replace('MM', ++arr[1])
            .replace('dd', arr[2])
            .replace('HH', arr[3])
            .replace('mm', arr[4])
            .replace('ss', arr[5])
            .replace(/w/i, arr[6]);
    },

    date: function (time) {
        var cacheDay; //记录初始进来的日期0 ~ 31

        function D() {
            this.time = new Date(time);
            cacheDay = this.time.getDate();
        }

        D.prototype.day = function (n) {
            var time = new Date(this.time).valueOf() + n * 86400000;
            this.time = new Date(time);
            return this;
        };

        D.prototype.week = function (n) {
            return this.day(n * 7);
        };


        //月
        D.prototype.month = function (n) {

            var year = new Date(this.time).getFullYear();
            var month = new Date(this.time).getMonth() + 1;
            var yearAdd = Math.floor(Math.abs(n / 12));

            yearAdd = n > 0 ? yearAdd : -yearAdd;
            year = year + yearAdd;

            var monthAdd = n % 12;
            month = month + monthAdd;

            this.time.setFullYear(year, month, 0); //这个月的最后一天
            newDate = this.time.getDate();

            if (cacheDay < Number(newDate)) {
                this.time.setDate(cacheDay);
            }
            return this;
        };

        D.prototype.val = function (format) {
            return format ? _.dateFormat(this.time, format) : this.time;
        };


        D.prototype.start = function (type) {
            return {
                day: function () {
                    var todayStart = _.dateFormat(this.time, 'yyyy-MM-dd 00:00:00');
                    this.time = new Date(todayStart);
                    return this;
                },
                week: function () {
                    var todayStart = new Date(this.time).getDay();
                    var time = new Date(this.time).valueOf() - todayStart * 3600 * 1000 * 24;
                    var todayStart = _.dateFormat(time, 'yyyy-MM-dd 00:00:00');
                    this.time = new Date(todayStart);
                    return this;
                },
                month: function () {
                    var todayStart = _.dateFormat(this.time, 'yyyy-MM-01 00:00:00');
                    this.time = new Date(todayStart);
                    return this;
                }
            }[type].call(this);
        };


        return new D();

    }
});



//订阅发布
(function () {
    var cache = {};
    _.extend(_, {
        pub: function (key) {
            var args = _.rest(arguments);
            _.each(cache[key], function (val) {
                val.func.apply(this, args);
            });
        },
        sub: function (key, func) {
            cache[key] = cache[key] ? cache[key] : [];
            cache[key].push({
                func: func
            });
        }
    });
}());


$.extend($.fn, {
    render: function (tpl, list) {
        var template = $(tpl).html();
        var html = _.ease(template)(list);
        return this.html(html);
    },
    trust: function () {
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
    }
});