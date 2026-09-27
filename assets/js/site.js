// Small behaviours for the redesigned site (navbar shadow, abstract toggles, blog prose helpers).
$(function () {
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
