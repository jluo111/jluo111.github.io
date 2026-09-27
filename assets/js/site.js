// Small behaviours for the redesigned site (theme switch, navbar shadow, abstract toggles, blog prose helpers).
$(function () {
    // Day / night. <html data-theme> is set before first paint by _includes/theme_init.html;
    // the colours themselves are the CSS variables at the top of global.css.
    var root = document.documentElement;
    var savedTheme = function () {
        try {
            var t = localStorage.getItem('theme');
            return (t === 'light' || t === 'dark') ? t : null;
        } catch (e) { return null; }
    };
    var chosen = savedTheme();      // also kept in memory, for browsers where storage is blocked
    var applyTheme = function (theme) {
        root.setAttribute('data-theme', theme);
        $('.theme-switch').attr('aria-checked', theme === 'dark' ? 'true' : 'false');
        var paper = getComputedStyle(root).getPropertyValue('--paper').trim();
        if (paper) { $('meta[name="theme-color"]').attr('content', paper); }
    };
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    var switchTimer = null;
    $('.theme-switch').on('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        // The page changes colour at once; only the knob slides. Other transitions are held for a
        // moment so that hover fades do not trail behind the switch.
        root.classList.add('theme-switching');
        clearTimeout(switchTimer);
        switchTimer = setTimeout(function () { root.classList.remove('theme-switching'); }, 80);
        applyTheme(next);
        chosen = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
    });
    // Until the visitor chooses, keep following their system setting (only when the site default is "auto")...
    if (window.matchMedia && window.__themeDefault === 'auto') {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        var onSystemChange = function (e) {
            if (!chosen && !savedTheme()) { applyTheme(e.matches ? 'dark' : 'light'); }
        };
        if (mq.addEventListener) { mq.addEventListener('change', onSystemChange); }
        else if (mq.addListener) { mq.addListener(onSystemChange); }
    }
    // ...and keep other open tabs of the site in step.
    window.addEventListener('storage', function (e) {
        if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
            chosen = e.newValue;
            applyTheme(e.newValue);
        }
    });
    // A page restored by the Back button may predate a switch made on another page
    window.addEventListener('pageshow', function (e) {
        var t = savedTheme() || chosen;
        if (e.persisted && t && t !== root.getAttribute('data-theme')) { applyTheme(t); }
    });

    // Navbar: soft shadow once the page is scrolled
    var nav = document.querySelector('.site-nav');
    if (nav) {
        var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Publication abstracts are clamped to a few lines; the "Abstract" button expands them
    $(document).on('click', '.js-abs-toggle', function () {
        var $pub = $(this).closest('.pub').toggleClass('is-open');
        $(this).attr('aria-expanded', $pub.hasClass('is-open'));
    });
    // ...and the button is hidden while the abstract fits anyway. Re-checked when web fonts
    // arrive and on resize, since both change where lines break.
    var syncAbstractToggles = function () {
        $('.pub-abstract').each(function () {
            $(this).closest('.pub:not(.is-open)').find('.js-abs-toggle')
                .toggleClass('d-none', this.scrollHeight <= this.clientHeight + 2);
        });
    };
    syncAbstractToggles();
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncAbstractToggles);
    }
    $(window).on('load resize', syncAbstractToggles);

    // Blog posts: scrollable tables, language labels on code blocks, heading anchors
    $('.prose table').wrap('<div class="table-wrap"></div>');
    $('.prose div.highlighter-rouge').each(function () {
        var m = this.className.match(/language-([\w+#-]+)/);
        if (m && m[1] !== 'plaintext') this.setAttribute('data-lang', m[1]);
    });
    // Decorative permalink for pointer users; hidden from assistive tech so heading names stay clean
    $('.prose').find('h2[id], h3[id]').each(function () {
        $(this).append('<a class="h-anchor" href="#' + this.id + '" aria-hidden="true" tabindex="-1">#</a>');
    });
});
