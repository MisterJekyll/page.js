
// SYSTEM
(function () {

    var cache = {};

    function get(url, cb) {
        if (cache[url]) return cb(cache[url]);
        $.ajax({
            url: url,
            success: function(data) {
                cache[url] = data;
                cb(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            },
            dataType: 'text'
        });
    }

    function t(label) {
        if (text) {
            if (label=='') return text;
            if (text[label]) return text[label];
            else return label;
        } else {
            return label;
        }
    }

    function view(html, data, partials) {
        var template = Hogan.compile(html),
            content = template.render(data, partials);
        $('#content').empty().append(content);
    }

    window.init = {
        ctx: function (ctx, next) {
            ctx.data = {};
            ctx.partials = {};
            if (ctx.init) {
                var tp = ctx.path;
                tp = tp.split("?")[0];
                /*if (tp!=='/')*/ next();
            } else {
                $('#content').addClass('transition');
                setTimeout(function(){
                    $('#content').removeClass('transition');
                    next();
                }, 300);
            }
        }
    };

    window.render = {
        page: function(ctx, next) {
            var tp = ctx.path;
            tp = tp.split("?")[0];
            if (tp=='/') tp = '/home';
            ctx.data.index = tp;

            var tt = t('');
            if (tt['lang']==lang) {
                $.each(tt, function(key, val) {
                    ctx.data[key] = val;
                });
            }

            get('/_assets/views'+tp+'.html', function(html) {
                view(html, ctx.data, ctx.partials);
            });
        },
        error: function(ctx, next) {
            get('/_assets/views/404.html', function(html) {
                view(html, ctx.data, ctx.partials);
            });
        }
    };

    window.done = null;

}());

// ROUTES
page.base('/'+lang);
page('*', init.ctx);
page('/', render.page);
page('/about', render.page);
page('*', render.error);
page();
