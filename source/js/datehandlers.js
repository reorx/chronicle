define(['jquery'], function() {

    var exports = {};

    var Year = exports.Year = function(year) {
        // check year
        if (typeof year !== 'number')
            year = Number(year);
        this.year = year;

        // get year days
        this.yearDays = 0;
        for (var i = 0;i < 12;i++) {
            var monthDays = new Date(this.year, i, 0).getDate();
            this.yearDays += monthDays;
        }

        // define parse function
        // this.get = function(rate) {
        this.parse = function(rate) {
            var o = {},
                day, month, monthDay;

            // calculate day
            var dayRate = rate * this.yearDays,
                rateFloat = dayRate - Math.floor(dayRate);

            if (rateFloat > 0)
                day = Math.floor(dayRate) + 1;
            else
                // determine for 0 specially, if dayRate is 0, day should be 1
                day = dayRate?dateRate:1;

            // calculate monthDay
            var diff = day;
            for (var i = 0;i < 12;i++) {
                var monthDays = new Date(this.year, i + 1, 0).getDate();
                if ((diff - monthDays) <= 0) {
                    month = i + 1;
                    monthDay = diff;
                    break;
                }
                diff = diff - monthDays;
            }

            // export data
            o.year = this.year,
            o.yearDays = this.yearDays,
            o.day = day,
            o.month = month,
            o.monthDay = monthDay;
            o.date = o.year + '-' + o.month + '-' + o.monthDay;
            return o;
        };
    };

    return exports;
});
