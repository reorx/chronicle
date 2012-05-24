require(['jquery','domReady', 'datehandlers'], function($, domReady, datehandlers) {
    domReady(function() {

        var CRNI = {};

        /*
         * Events
         */
        $('#chronicle .container').bind('mousemove', function(e) {
            var $this = $(this),
                ruler = $this.find('.ruler');

            // ignore events from .yearline
            if ($(e.target).is(CRNI.yearline.$el)) {
                ruler.css('display', 'none');
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

            // month indicate
            var rate = 1 - mpos.top/containerHeight;
            // fix overflow
            if (rate > 1)
                rate = 1;
            if (rate < 0)
                rate = 0;

            var o = CRNI.yearHandler.parse(rate);

            CRNI.$date.html(o.date);

            CRNI.o = o;
            CRNI.mpos = mpos;
        });

        $('#chronicle .container').bind('click', function() {
            var $this = $(this),
                // o = $this.data('o'),
                o = CRNI.o;

            if (CRNI.yearline.points[o.day]) {
                console.log(CRNI.yearline.points);
                alert(o.date + 'already had !');
                return;
            }
            var content = prompt('==  Chapter ' + o.date + '  ==');

            if (content) {
                CRNI.yearline.add(o);
                // alert('day/year ' + o.day + '/' + o.year + 'height' + $this.height() );

            }

        });


        /*
         * Classes
         */
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

        /*
         * Functions
         */
        function loadYearline(data) {
            CRNI.current_year = data.year;
            CRNI.yearline = new Yearline($('#chronicle .yearline'));
            CRNI.yearHandler = new datehandlers.Year(data.year);
            CRNI.$date = $('#chronicle .decorates .date')
        }

        /*
         * Initialize
         */
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

        loadYearline(fakeData);
    });
});
