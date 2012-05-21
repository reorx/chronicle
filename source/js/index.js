require(['jquery','domReady'], function($, domReady) {
    domReady(function() {

        var $DEBUG = $('#debug');

        $('#chronicle .container').bind('mousemove', function(e) {
            var $this = $(this),
                ruler = $this.find('.ruler');

            // ignore events from .yearline
            if ($(e.target).is(yearline.$el)) {
                ruler.hide();
                return;
            }

            var offset = $this.offset(),
                mpos = {
                    left: e.pageX - offset.left,
                    top: e.pageY - offset.top
                },
            // console.log('mousce position', mpos.top, mpos.left);

            // handle ruler
                rulerPoint = $this.find('.yearline .ruler.point'),
                mousePoint = ruler.find('.mousepoint'),
                containerWidth = $this.width(),
                containerHeight = $this.height(),
                halfWidth = containerWidth/2,
                lineX = mpos.left - halfWidth;
            // console.log(lineX);
            if (lineX > 0) {
                ruler.css({
                    top: mpos.top + 'px',
                    left: halfWidth + 'px',
                    width: lineX + 'px',
                    display: 'block'
                });
            } else if (lineX < 0) {
                ruler.css({
                    top: mpos.top + 'px',
                    left: mpos.left+ 'px',
                    width: (0 - lineX) + 'px',
                    display: 'block'
                });
            } else {
                ruler.css('display', 'none');
            }

            // handle indicator
            // month indicate
            var rate = 1 - mpos.top/containerHeight;
            // fix overflow
            if (rate > 1)
                rate = 1;
            if (rate < 0)
                rate = 0;
            var yearHandler = new YearHandler(2012);
            var o = yearHandler.get(rate);
            $DEBUG.html(o.day + '|' + o.month + '|' + o.monthDay + '|' + yearHandler.yearDays + '|    ' + rate).show();

            $this.data('o', o);
            $this.data('mpos', mpos);

        });
        $('#chronicle .container').bind('click', function() {
            var $this = $(this),
                o = $this.data('o'),
                date = o.year + '-' + o.month + '-' + o.monthDay;

            if (yearline.points[o.day]) {
                console.log(yearline.points);
                alert(date + 'already had !');
                return;
            }
            var content = prompt('==  Chapter ' + date + '  ==');

            if (content) {
                yearline.add(o);
                // alert('day/year ' + o.day + '/' + o.year + 'height' + $this.height() );

            }

        });

        var YearHandler = function(year) {
            if (typeof year !== 'number')
                year = Number(year);
            this.year = year;
            this.yearDays = 0;
            for (var i = 0;i < 12;i++) {
                var monthDays = new Date(this.year, i, 0).getDate();
                this.yearDays += monthDays;
            }
            this.get = function(rate) {
                var dayRate = rate*this.yearDays,
                    rateFloat = dayRate - Math.floor(dayRate),
                    o = {},
                    day, month, monthDay;
                if (rateFloat > 0)
                    day = Math.floor(dayRate) + 1;
                else
                    // determine for 0 specially, if dayRate is 0, day should be 1
                    day = dayRate?dateRate:1;
                // return day;
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
                o.year = this.year,
                o.yearDays = this.yearDays,
                o.day = day,
                o.month = month,
                o.monthDay = monthDay;
                return o;
            };
        };

        var Yearline = function($el) {
            this.$el = $el;
            this.days = {};
            this.points = {};

            this.add = function(o, content) {
                var point = $('<div></div>').addClass('point day');
                point.css({
                    top: ((1 - o.day/o.yearDays) * this.$el.parent().height()) + 'px',
                    background: 'red'
                });
                point.appendTo(this.$el);
                point.data('content', content);
                this.points[o.day] = point;
            };
        };

        var yearline = new Yearline($('#chronicle .yearline'));

        function loadYearline(data) {
            /*
            data structure:
                year: 2012
                points
                    date: 05-12
                    content
                day_periods
                    from: 03-24
                    to: 04-11
                    content
                month_periods
                    from: 05-0
                    to: 08-2
                    content
            */


        }

        var fakeData = {
            year: 2012,
            points: [
                {
                    date: '05-12',
                    content: 'that day, how can I say ?'
                }
            ],
            day_periods: [
                {
                    from: '03-24',
                    to: '04-11',
                    content: 'can it be, without meaning ?'
                }
            ],
            month_periods: [
                {
                    from: '05-0',
                    to: '08-2',
                    content: 'what a mess, kick your ass'
                }
            ]
        };
    });
});
