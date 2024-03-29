(function (r) {
    "use strict";
    typeof define == "function" && define.amd
      ? define(["jquery"], r)
      : typeof exports != "undefined"
      ? (module.exports = r(require("jquery")))
      : r(jQuery);
  })(function (r) {
    "use strict";
    var l = window.Slick || {};
    ((l = (function () {
      var e = 0;
      return function (i, n) {
        var t,
          s = this;
        (s.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: r(i),
          appendDots: r(i),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (o, c) {
            return r('<button type="button" />').text(c + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3
        }),
          (s.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
          }),
          r.extend(s, s.initials),
          (s.activeBreakpoint = null),
          (s.animType = null),
          (s.animProp = null),
          (s.breakpoints = []),
          (s.breakpointSettings = []),
          (s.cssTransitions = !1),
          (s.focussed = !1),
          (s.interrupted = !1),
          (s.hidden = "hidden"),
          (s.paused = !0),
          (s.positionProp = null),
          (s.respondTo = null),
          (s.rowCount = 1),
          (s.shouldClick = !0),
          (s.$slider = r(i)),
          (s.$slidesCache = null),
          (s.transformType = null),
          (s.transitionType = null),
          (s.visibilityChange = "visibilitychange"),
          (s.windowWidth = 0),
          (s.windowTimer = null),
          (t = r(i).data("slick") || {}),
          (s.options = r.extend({}, s.defaults, n, t)),
          (s.currentSlide = s.options.initialSlide),
          (s.originalSettings = s.options),
          document.mozHidden !== void 0
            ? ((s.hidden = "mozHidden"),
              (s.visibilityChange = "mozvisibilitychange"))
            : document.webkitHidden !== void 0 &&
              ((s.hidden = "webkitHidden"),
              (s.visibilityChange = "webkitvisibilitychange")),
          (s.autoPlay = r.proxy(s.autoPlay, s)),
          (s.autoPlayClear = r.proxy(s.autoPlayClear, s)),
          (s.autoPlayIterator = r.proxy(s.autoPlayIterator, s)),
          (s.changeSlide = r.proxy(s.changeSlide, s)),
          (s.clickHandler = r.proxy(s.clickHandler, s)),
          (s.selectHandler = r.proxy(s.selectHandler, s)),
          (s.setPosition = r.proxy(s.setPosition, s)),
          (s.swipeHandler = r.proxy(s.swipeHandler, s)),
          (s.dragHandler = r.proxy(s.dragHandler, s)),
          (s.keyHandler = r.proxy(s.keyHandler, s)),
          (s.instanceUid = e++),
          (s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          s.registerBreakpoints(),
          s.init(!0);
      };
    })()).prototype.activateADA = function () {
      this.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
      (l.prototype.addSlide = l.prototype.slickAdd = function (e, i, n) {
        var t = this;
        if (typeof i == "boolean") (n = i), (i = null);
        else if (i < 0 || i >= t.slideCount) return !1;
        t.unload(),
          typeof i == "number"
            ? i === 0 && t.$slides.length === 0
              ? r(e).appendTo(t.$slideTrack)
              : n
              ? r(e).insertBefore(t.$slides.eq(i))
              : r(e).insertAfter(t.$slides.eq(i))
            : n === !0
            ? r(e).prependTo(t.$slideTrack)
            : r(e).appendTo(t.$slideTrack),
          (t.$slides = t.$slideTrack.children(this.options.slide)),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.append(t.$slides),
          t.$slides.each(function (s, o) {
            r(o).attr("data-slick-index", s);
          }),
          (t.$slidesCache = t.$slides),
          t.reinit();
      }),
      (l.prototype.animateHeight = function () {
        var e = this;
        if (
          e.options.slidesToShow === 1 &&
          e.options.adaptiveHeight === !0 &&
          e.options.vertical === !1
        ) {
          var i = e.$slides.eq(e.currentSlide).outerHeight(!0);
          e.$list.animate({ height: i }, e.options.speed);
        }
      }),
      (l.prototype.animateSlide = function (e, i) {
        var n = {},
          t = this;
        t.animateHeight(),
          t.options.rtl === !0 && t.options.vertical === !1 && (e = -e),
          t.transformsEnabled === !1
            ? t.options.vertical === !1
              ? t.$slideTrack.animate(
                  { left: e },
                  t.options.speed,
                  t.options.easing,
                  i
                )
              : t.$slideTrack.animate(
                  { top: e },
                  t.options.speed,
                  t.options.easing,
                  i
                )
            : t.cssTransitions === !1
            ? (t.options.rtl === !0 && (t.currentLeft = -t.currentLeft),
              r({ animStart: t.currentLeft }).animate(
                { animStart: e },
                {
                  duration: t.options.speed,
                  easing: t.options.easing,
                  step: function (s) {
                    (s = Math.ceil(s)),
                      t.options.vertical === !1
                        ? ((n[t.animType] = "translate(" + s + "px, 0px)"),
                          t.$slideTrack.css(n))
                        : ((n[t.animType] = "translate(0px," + s + "px)"),
                          t.$slideTrack.css(n));
                  },
                  complete: function () {
                    i && i.call();
                  }
                }
              ))
            : (t.applyTransition(),
              (e = Math.ceil(e)),
              t.options.vertical === !1
                ? (n[t.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (n[t.animType] = "translate3d(0px," + e + "px, 0px)"),
              t.$slideTrack.css(n),
              i &&
                setTimeout(function () {
                  t.disableTransition(), i.call();
                }, t.options.speed));
      }),
      (l.prototype.getNavTarget = function () {
        var e = this,
          i = e.options.asNavFor;
        return i && i !== null && (i = r(i).not(e.$slider)), i;
      }),
      (l.prototype.asNavFor = function (e) {
        var i = this.getNavTarget();
        i !== null &&
          typeof i == "object" &&
          i.each(function () {
            var n = r(this).slick("getSlick");
            n.unslicked || n.slideHandler(e, !0);
          });
      }),
      (l.prototype.applyTransition = function (e) {
        var i = this,
          n = {};
        i.options.fade === !1
          ? (n[i.transitionType] =
              i.transformType + " " + i.options.speed + "ms " + i.options.cssEase)
          : (n[i.transitionType] =
              "opacity " + i.options.speed + "ms " + i.options.cssEase),
          i.options.fade === !1 ? i.$slideTrack.css(n) : i.$slides.eq(e).css(n);
      }),
      (l.prototype.autoPlay = function () {
        var e = this;
        e.autoPlayClear(),
          e.slideCount > e.options.slidesToShow &&
            (e.autoPlayTimer = setInterval(
              e.autoPlayIterator,
              e.options.autoplaySpeed
            ));
      }),
      (l.prototype.autoPlayClear = function () {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer);
      }),
      (l.prototype.autoPlayIterator = function () {
        var e = this,
          i = e.currentSlide + e.options.slidesToScroll;
        e.paused ||
          e.interrupted ||
          e.focussed ||
          (e.options.infinite === !1 &&
            (e.direction === 1 && e.currentSlide + 1 === e.slideCount - 1
              ? (e.direction = 0)
              : e.direction === 0 &&
                ((i = e.currentSlide - e.options.slidesToScroll),
                e.currentSlide - 1 == 0 && (e.direction = 1))),
          e.slideHandler(i));
      }),
      (l.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 &&
          ((e.$prevArrow = r(e.options.prevArrow).addClass("slick-arrow")),
          (e.$nextArrow = r(e.options.nextArrow).addClass("slick-arrow")),
          e.slideCount > e.options.slidesToShow
            ? (e.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.htmlExpr.test(e.options.prevArrow) &&
                e.$prevArrow.prependTo(e.options.appendArrows),
              e.htmlExpr.test(e.options.nextArrow) &&
                e.$nextArrow.appendTo(e.options.appendArrows),
              e.options.infinite !== !0 &&
                e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : e.$prevArrow
                .add(e.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (l.prototype.buildDots = function () {
        var e,
          i,
          n = this;
        if (n.options.dots === !0) {
          for (
            n.$slider.addClass("slick-dotted"),
              i = r("<ul />").addClass(n.options.dotsClass),
              e = 0;
            e <= n.getDotCount();
            e += 1
          )
            i.append(r("<li />").append(n.options.customPaging.call(this, n, e)));
          (n.$dots = i.appendTo(n.options.appendDots)),
            n.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (l.prototype.buildOut = function () {
        var e = this;
        (e.$slides = e.$slider
          .children(e.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.$slides.each(function (i, n) {
            r(n)
              .attr("data-slick-index", i)
              .data("originalStyling", r(n).attr("style") || "");
          }),
          e.$slider.addClass("slick-slider"),
          (e.$slideTrack =
            e.slideCount === 0
              ? r('<div class="slick-track"/>').appendTo(e.$slider)
              : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          e.$slideTrack.css("opacity", 0),
          (e.options.centerMode !== !0 && e.options.swipeToSlide !== !0) ||
            (e.options.slidesToScroll = 1),
          r("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
          e.setupInfinite(),
          e.buildArrows(),
          e.buildDots(),
          e.updateDots(),
          e.setSlideClasses(
            typeof e.currentSlide == "number" ? e.currentSlide : 0
          ),
          e.options.draggable === !0 && e.$list.addClass("draggable");
      }),
      (l.prototype.buildRows = function () {
        var e,
          i,
          n,
          t,
          s,
          o,
          c,
          a = this;
        if (
          ((t = document.createDocumentFragment()),
          (o = a.$slider.children()),
          a.options.rows > 1)
        ) {
          for (
            c = a.options.slidesPerRow * a.options.rows,
              s = Math.ceil(o.length / c),
              e = 0;
            e < s;
            e++
          ) {
            var p = document.createElement("div");
            for (i = 0; i < a.options.rows; i++) {
              var d = document.createElement("div");
              for (n = 0; n < a.options.slidesPerRow; n++) {
                var u = e * c + (i * a.options.slidesPerRow + n);
                o.get(u) && d.appendChild(o.get(u));
              }
              p.appendChild(d);
            }
            t.appendChild(p);
          }
          a.$slider.empty().append(t),
            a.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
              });
        }
      }),
      (l.prototype.checkResponsive = function (e, i) {
        var n,
          t,
          s,
          o = this,
          c = !1,
          a = o.$slider.width(),
          p = window.innerWidth || r(window).width();
        if (
          (o.respondTo === "window"
            ? (s = p)
            : o.respondTo === "slider"
            ? (s = a)
            : o.respondTo === "min" && (s = Math.min(p, a)),
          o.options.responsive &&
            o.options.responsive.length &&
            o.options.responsive !== null)
        ) {
          t = null;
          for (n in o.breakpoints)
            o.breakpoints.hasOwnProperty(n) &&
              (o.originalSettings.mobileFirst === !1
                ? s < o.breakpoints[n] && (t = o.breakpoints[n])
                : s > o.breakpoints[n] && (t = o.breakpoints[n]));
          t !== null
            ? o.activeBreakpoint !== null
              ? (t !== o.activeBreakpoint || i) &&
                ((o.activeBreakpoint = t),
                o.breakpointSettings[t] === "unslick"
                  ? o.unslick(t)
                  : ((o.options = r.extend(
                      {},
                      o.originalSettings,
                      o.breakpointSettings[t]
                    )),
                    e === !0 && (o.currentSlide = o.options.initialSlide),
                    o.refresh(e)),
                (c = t))
              : ((o.activeBreakpoint = t),
                o.breakpointSettings[t] === "unslick"
                  ? o.unslick(t)
                  : ((o.options = r.extend(
                      {},
                      o.originalSettings,
                      o.breakpointSettings[t]
                    )),
                    e === !0 && (o.currentSlide = o.options.initialSlide),
                    o.refresh(e)),
                (c = t))
            : o.activeBreakpoint !== null &&
              ((o.activeBreakpoint = null),
              (o.options = o.originalSettings),
              e === !0 && (o.currentSlide = o.options.initialSlide),
              o.refresh(e),
              (c = t)),
            e || c === !1 || o.$slider.trigger("breakpoint", [o, c]);
        }
      }),
      (l.prototype.changeSlide = function (e, i) {
        var n,
          t,
          s,
          o = this,
          c = r(e.currentTarget);
        switch (
          (c.is("a") && e.preventDefault(),
          c.is("li") || (c = c.closest("li")),
          (s = o.slideCount % o.options.slidesToScroll != 0),
          (n = s
            ? 0
            : (o.slideCount - o.currentSlide) % o.options.slidesToScroll),
          e.data.message)
        ) {
          case "previous":
            (t = n === 0 ? o.options.slidesToScroll : o.options.slidesToShow - n),
              o.slideCount > o.options.slidesToShow &&
                o.slideHandler(o.currentSlide - t, !1, i);
            break;
          case "next":
            (t = n === 0 ? o.options.slidesToScroll : n),
              o.slideCount > o.options.slidesToShow &&
                o.slideHandler(o.currentSlide + t, !1, i);
            break;
          case "index":
            var a =
              e.data.index === 0
                ? 0
                : e.data.index || c.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(a), !1, i),
              c.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (l.prototype.checkNavigable = function (e) {
        var i, n;
        if (((i = this.getNavigableIndexes()), (n = 0), e > i[i.length - 1]))
          e = i[i.length - 1];
        else
          for (var t in i) {
            if (e < i[t]) {
              e = n;
              break;
            }
            n = i[t];
          }
        return e;
      }),
      (l.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots &&
          e.$dots !== null &&
          (r("li", e.$dots)
            .off("click.slick", e.changeSlide)
            .off("mouseenter.slick", r.proxy(e.interrupt, e, !0))
            .off("mouseleave.slick", r.proxy(e.interrupt, e, !1)),
          e.options.accessibility === !0 &&
            e.$dots.off("keydown.slick", e.keyHandler)),
          e.$slider.off("focus.slick blur.slick"),
          e.options.arrows === !0 &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
            e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
            e.options.accessibility === !0 &&
              (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
              e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
          e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
          e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
          e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
          e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
          e.$list.off("click.slick", e.clickHandler),
          r(document).off(e.visibilityChange, e.visibility),
          e.cleanUpSlideEvents(),
          e.options.accessibility === !0 &&
            e.$list.off("keydown.slick", e.keyHandler),
          e.options.focusOnSelect === !0 &&
            r(e.$slideTrack).children().off("click.slick", e.selectHandler),
          r(window).off(
            "orientationchange.slick.slick-" + e.instanceUid,
            e.orientationChange
          ),
          r(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
          r("[draggable!=true]", e.$slideTrack).off(
            "dragstart",
            e.preventDefault
          ),
          r(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
      }),
      (l.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", r.proxy(e.interrupt, e, !0)),
          e.$list.off("mouseleave.slick", r.proxy(e.interrupt, e, !1));
      }),
      (l.prototype.cleanUpRows = function () {
        var e,
          i = this;
        i.options.rows > 1 &&
          ((e = i.$slides.children().children()).removeAttr("style"),
          i.$slider.empty().append(e));
      }),
      (l.prototype.clickHandler = function (e) {
        this.shouldClick === !1 &&
          (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
      }),
      (l.prototype.destroy = function (e) {
        var i = this;
        i.autoPlayClear(),
          (i.touchObject = {}),
          i.cleanUpEvents(),
          r(".slick-cloned", i.$slider).detach(),
          i.$dots && i.$dots.remove(),
          i.$prevArrow &&
            i.$prevArrow.length &&
            (i.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
          i.$nextArrow &&
            i.$nextArrow.length &&
            (i.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
          i.$slides &&
            (i.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                r(this).attr("style", r(this).data("originalStyling"));
              }),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.detach(),
            i.$list.detach(),
            i.$slider.append(i.$slides)),
          i.cleanUpRows(),
          i.$slider.removeClass("slick-slider"),
          i.$slider.removeClass("slick-initialized"),
          i.$slider.removeClass("slick-dotted"),
          (i.unslicked = !0),
          e || i.$slider.trigger("destroy", [i]);
      }),
      (l.prototype.disableTransition = function (e) {
        var i = this,
          n = {};
        (n[i.transitionType] = ""),
          i.options.fade === !1 ? i.$slideTrack.css(n) : i.$slides.eq(e).css(n);
      }),
      (l.prototype.fadeSlide = function (e, i) {
        var n = this;
        n.cssTransitions === !1
          ? (n.$slides.eq(e).css({ zIndex: n.options.zIndex }),
            n.$slides
              .eq(e)
              .animate({ opacity: 1 }, n.options.speed, n.options.easing, i))
          : (n.applyTransition(e),
            n.$slides.eq(e).css({ opacity: 1, zIndex: n.options.zIndex }),
            i &&
              setTimeout(function () {
                n.disableTransition(e), i.call();
              }, n.options.speed));
      }),
      (l.prototype.fadeSlideOut = function (e) {
        var i = this;
        i.cssTransitions === !1
          ? i.$slides
              .eq(e)
              .animate(
                { opacity: 0, zIndex: i.options.zIndex - 2 },
                i.options.speed,
                i.options.easing
              )
          : (i.applyTransition(e),
            i.$slides.eq(e).css({ opacity: 0, zIndex: i.options.zIndex - 2 }));
      }),
      (l.prototype.filterSlides = l.prototype.slickFilter = function (e) {
        var i = this;
        e !== null &&
          ((i.$slidesCache = i.$slides),
          i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.filter(e).appendTo(i.$slideTrack),
          i.reinit());
      }),
      (l.prototype.focusHandler = function () {
        var e = this;
        e.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (i) {
            i.stopImmediatePropagation();
            var n = r(this);
            setTimeout(function () {
              e.options.pauseOnFocus &&
                ((e.focussed = n.is(":focus")), e.autoPlay());
            }, 0);
          });
      }),
      (l.prototype.getCurrent = l.prototype.slickCurrentSlide = function () {
        return this.currentSlide;
      }),
      (l.prototype.getDotCount = function () {
        var e = this,
          i = 0,
          n = 0,
          t = 0;
        if (e.options.infinite === !0)
          if (e.slideCount <= e.options.slidesToShow) ++t;
          else
            for (; i < e.slideCount; )
              ++t,
                (i = n + e.options.slidesToScroll),
                (n +=
                  e.options.slidesToScroll <= e.options.slidesToShow
                    ? e.options.slidesToScroll
                    : e.options.slidesToShow);
        else if (e.options.centerMode === !0) t = e.slideCount;
        else if (e.options.asNavFor)
          for (; i < e.slideCount; )
            ++t,
              (i = n + e.options.slidesToScroll),
              (n +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
        else
          t =
            1 +
            Math.ceil(
              (e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll
            );
        return t - 1;
      }),
      (l.prototype.getLeft = function (e) {
        var i,
          n,
          t,
          s,
          o = this,
          c = 0;
        return (
          (o.slideOffset = 0),
          (n = o.$slides.first().outerHeight(!0)),
          o.options.infinite === !0
            ? (o.slideCount > o.options.slidesToShow &&
                ((o.slideOffset = o.slideWidth * o.options.slidesToShow * -1),
                (s = -1),
                o.options.vertical === !0 &&
                  o.options.centerMode === !0 &&
                  (o.options.slidesToShow === 2
                    ? (s = -1.5)
                    : o.options.slidesToShow === 1 && (s = -2)),
                (c = n * o.options.slidesToShow * s)),
              o.slideCount % o.options.slidesToScroll != 0 &&
                e + o.options.slidesToScroll > o.slideCount &&
                o.slideCount > o.options.slidesToShow &&
                (e > o.slideCount
                  ? ((o.slideOffset =
                      (o.options.slidesToShow - (e - o.slideCount)) *
                      o.slideWidth *
                      -1),
                    (c = (o.options.slidesToShow - (e - o.slideCount)) * n * -1))
                  : ((o.slideOffset =
                      (o.slideCount % o.options.slidesToScroll) *
                      o.slideWidth *
                      -1),
                    (c = (o.slideCount % o.options.slidesToScroll) * n * -1))))
            : e + o.options.slidesToShow > o.slideCount &&
              ((o.slideOffset =
                (e + o.options.slidesToShow - o.slideCount) * o.slideWidth),
              (c = (e + o.options.slidesToShow - o.slideCount) * n)),
          o.slideCount <= o.options.slidesToShow &&
            ((o.slideOffset = 0), (c = 0)),
          o.options.centerMode === !0 && o.slideCount <= o.options.slidesToShow
            ? (o.slideOffset =
                (o.slideWidth * Math.floor(o.options.slidesToShow)) / 2 -
                (o.slideWidth * o.slideCount) / 2)
            : o.options.centerMode === !0 && o.options.infinite === !0
            ? (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2) -
                o.slideWidth)
            : o.options.centerMode === !0 &&
              ((o.slideOffset = 0),
              (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2))),
          (i =
            o.options.vertical === !1
              ? e * o.slideWidth * -1 + o.slideOffset
              : e * n * -1 + c),
          o.options.variableWidth === !0 &&
            ((t =
              o.slideCount <= o.options.slidesToShow || o.options.infinite === !1
                ? o.$slideTrack.children(".slick-slide").eq(e)
                : o.$slideTrack
                    .children(".slick-slide")
                    .eq(e + o.options.slidesToShow)),
            (i =
              o.options.rtl === !0
                ? t[0]
                  ? -1 * (o.$slideTrack.width() - t[0].offsetLeft - t.width())
                  : 0
                : t[0]
                ? -1 * t[0].offsetLeft
                : 0),
            o.options.centerMode === !0 &&
              ((t =
                o.slideCount <= o.options.slidesToShow ||
                o.options.infinite === !1
                  ? o.$slideTrack.children(".slick-slide").eq(e)
                  : o.$slideTrack
                      .children(".slick-slide")
                      .eq(e + o.options.slidesToShow + 1)),
              (i =
                o.options.rtl === !0
                  ? t[0]
                    ? -1 * (o.$slideTrack.width() - t[0].offsetLeft - t.width())
                    : 0
                  : t[0]
                  ? -1 * t[0].offsetLeft
                  : 0),
              (i += (o.$list.width() - t.outerWidth()) / 2))),
          i
        );
      }),
      (l.prototype.getOption = l.prototype.slickGetOption = function (e) {
        return this.options[e];
      }),
      (l.prototype.getNavigableIndexes = function () {
        var e,
          i = this,
          n = 0,
          t = 0,
          s = [];
        for (
          i.options.infinite === !1
            ? (e = i.slideCount)
            : ((n = -1 * i.options.slidesToScroll),
              (t = -1 * i.options.slidesToScroll),
              (e = 2 * i.slideCount));
          n < e;
  
        )
          s.push(n),
            (n = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
        return s;
      }),
      (l.prototype.getSlick = function () {
        return this;
      }),
      (l.prototype.getSlideCount = function () {
        var e,
          i,
          n = this;
        return (
          (i =
            n.options.centerMode === !0
              ? n.slideWidth * Math.floor(n.options.slidesToShow / 2)
              : 0),
          n.options.swipeToSlide === !0
            ? (n.$slideTrack.find(".slick-slide").each(function (t, s) {
                if (s.offsetLeft - i + r(s).outerWidth() / 2 > -1 * n.swipeLeft)
                  return (e = s), !1;
              }),
              Math.abs(r(e).attr("data-slick-index") - n.currentSlide) || 1)
            : n.options.slidesToScroll
        );
      }),
      (l.prototype.goTo = l.prototype.slickGoTo = function (e, i) {
        this.changeSlide({ data: { message: "index", index: parseInt(e) } }, i);
      }),
      (l.prototype.init = function (e) {
        var i = this;
        r(i.$slider).hasClass("slick-initialized") ||
          (r(i.$slider).addClass("slick-initialized"),
          i.buildRows(),
          i.buildOut(),
          i.setProps(),
          i.startLoad(),
          i.loadSlider(),
          i.initializeEvents(),
          i.updateArrows(),
          i.updateDots(),
          i.checkResponsive(!0),
          i.focusHandler()),
          e && i.$slider.trigger("init", [i]),
          i.options.accessibility === !0 && i.initADA(),
          i.options.autoplay && ((i.paused = !1), i.autoPlay());
      }),
      (l.prototype.initADA = function () {
        var e = this,
          i = Math.ceil(e.slideCount / e.options.slidesToShow),
          n = e.getNavigableIndexes().filter(function (o) {
            return o >= 0 && o < e.slideCount;
          });
        e.$slides
          .add(e.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          e.$dots !== null &&
            (e.$slides
              .not(e.$slideTrack.find(".slick-cloned"))
              .each(function (o) {
                var c = n.indexOf(o);
                r(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + o,
                  tabindex: -1
                }),
                  c !== -1 &&
                    r(this).attr({
                      "aria-describedby":
                        "slick-slide-control" + e.instanceUid + c
                    });
              }),
            e.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (o) {
                var c = n[o];
                r(this).attr({ role: "presentation" }),
                  r(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + e.instanceUid + o,
                      "aria-controls": "slick-slide" + e.instanceUid + c,
                      "aria-label": o + 1 + " of " + i,
                      "aria-selected": null,
                      tabindex: "-1"
                    });
              })
              .eq(e.currentSlide)
              .find("button")
              .attr({ "aria-selected": "true", tabindex: "0" })
              .end());
        for (var t = e.currentSlide, s = t + e.options.slidesToShow; t < s; t++)
          e.$slides.eq(t).attr("tabindex", 0);
        e.activateADA();
      }),
      (l.prototype.initArrowEvents = function () {
        var e = this;
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow
            .off("click.slick")
            .on("click.slick", { message: "previous" }, e.changeSlide),
          e.$nextArrow
            .off("click.slick")
            .on("click.slick", { message: "next" }, e.changeSlide),
          e.options.accessibility === !0 &&
            (e.$prevArrow.on("keydown.slick", e.keyHandler),
            e.$nextArrow.on("keydown.slick", e.keyHandler)));
      }),
      (l.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 &&
          (r("li", e.$dots).on(
            "click.slick",
            { message: "index" },
            e.changeSlide
          ),
          e.options.accessibility === !0 &&
            e.$dots.on("keydown.slick", e.keyHandler)),
          e.options.dots === !0 &&
            e.options.pauseOnDotsHover === !0 &&
            r("li", e.$dots)
              .on("mouseenter.slick", r.proxy(e.interrupt, e, !0))
              .on("mouseleave.slick", r.proxy(e.interrupt, e, !1));
      }),
      (l.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover &&
          (e.$list.on("mouseenter.slick", r.proxy(e.interrupt, e, !0)),
          e.$list.on("mouseleave.slick", r.proxy(e.interrupt, e, !1)));
      }),
      (l.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(),
          e.initDotEvents(),
          e.initSlideEvents(),
          e.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            e.swipeHandler
          ),
          e.$list.on("click.slick", e.clickHandler),
          r(document).on(e.visibilityChange, r.proxy(e.visibility, e)),
          e.options.accessibility === !0 &&
            e.$list.on("keydown.slick", e.keyHandler),
          e.options.focusOnSelect === !0 &&
            r(e.$slideTrack).children().on("click.slick", e.selectHandler),
          r(window).on(
            "orientationchange.slick.slick-" + e.instanceUid,
            r.proxy(e.orientationChange, e)
          ),
          r(window).on(
            "resize.slick.slick-" + e.instanceUid,
            r.proxy(e.resize, e)
          ),
          r("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
          r(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
          r(e.setPosition);
      }),
      (l.prototype.initUI = function () {
        var e = this;
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.show(), e.$nextArrow.show()),
          e.options.dots === !0 &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.show();
      }),
      (l.prototype.keyHandler = function (e) {
        var i = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (e.keyCode === 37 && i.options.accessibility === !0
            ? i.changeSlide({
                data: { message: i.options.rtl === !0 ? "next" : "previous" }
              })
            : e.keyCode === 39 &&
              i.options.accessibility === !0 &&
              i.changeSlide({
                data: { message: i.options.rtl === !0 ? "previous" : "next" }
              }));
      }),
      (l.prototype.lazyLoad = function () {
        function e(d) {
          r("img[data-lazy]", d).each(function () {
            var u = r(this),
              h = r(this).attr("data-lazy"),
              v = r(this).attr("data-srcset"),
              k = r(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
              f = document.createElement("img");
            (f.onload = function () {
              u.animate({ opacity: 0 }, 100, function () {
                v && (u.attr("srcset", v), k && u.attr("sizes", k)),
                  u.attr("src", h).animate({ opacity: 1 }, 200, function () {
                    u.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                      "slick-loading"
                    );
                  }),
                  s.$slider.trigger("lazyLoaded", [s, u, h]);
              });
            }),
              (f.onerror = function () {
                u
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  s.$slider.trigger("lazyLoadError", [s, u, h]);
              }),
              (f.src = h);
          });
        }
        var i,
          n,
          t,
          s = this;
        if (
          (s.options.centerMode === !0
            ? s.options.infinite === !0
              ? (t =
                  (n = s.currentSlide + (s.options.slidesToShow / 2 + 1)) +
                  s.options.slidesToShow +
                  2)
              : ((n = Math.max(
                  0,
                  s.currentSlide - (s.options.slidesToShow / 2 + 1)
                )),
                (t = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide))
            : ((n = s.options.infinite
                ? s.options.slidesToShow + s.currentSlide
                : s.currentSlide),
              (t = Math.ceil(n + s.options.slidesToShow)),
              s.options.fade === !0 && (n > 0 && n--, t <= s.slideCount && t++)),
          (i = s.$slider.find(".slick-slide").slice(n, t)),
          s.options.lazyLoad === "anticipated")
        )
          for (
            var o = n - 1, c = t, a = s.$slider.find(".slick-slide"), p = 0;
            p < s.options.slidesToScroll;
            p++
          )
            o < 0 && (o = s.slideCount - 1),
              (i = (i = i.add(a.eq(o))).add(a.eq(c))),
              o--,
              c++;
        e(i),
          s.slideCount <= s.options.slidesToShow
            ? e(s.$slider.find(".slick-slide"))
            : s.currentSlide >= s.slideCount - s.options.slidesToShow
            ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow))
            : s.currentSlide === 0 &&
              e(
                s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow)
              );
      }),
      (l.prototype.loadSlider = function () {
        var e = this;
        e.setPosition(),
          e.$slideTrack.css({ opacity: 1 }),
          e.$slider.removeClass("slick-loading"),
          e.initUI(),
          e.options.lazyLoad === "progressive" && e.progressiveLazyLoad();
      }),
      (l.prototype.next = l.prototype.slickNext = function () {
        this.changeSlide({ data: { message: "next" } });
      }),
      (l.prototype.orientationChange = function () {
        var e = this;
        e.checkResponsive(), e.setPosition();
      }),
      (l.prototype.pause = l.prototype.slickPause = function () {
        var e = this;
        e.autoPlayClear(), (e.paused = !0);
      }),
      (l.prototype.play = l.prototype.slickPlay = function () {
        var e = this;
        e.autoPlay(),
          (e.options.autoplay = !0),
          (e.paused = !1),
          (e.focussed = !1),
          (e.interrupted = !1);
      }),
      (l.prototype.postSlide = function (e) {
        var i = this;
        i.unslicked ||
          (i.$slider.trigger("afterChange", [i, e]),
          (i.animating = !1),
          i.slideCount > i.options.slidesToShow && i.setPosition(),
          (i.swipeLeft = null),
          i.options.autoplay && i.autoPlay(),
          i.options.accessibility === !0 &&
            (i.initADA(),
            i.options.focusOnChange &&
              r(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (l.prototype.prev = l.prototype.slickPrev = function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
      (l.prototype.preventDefault = function (e) {
        e.preventDefault();
      }),
      (l.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var i,
          n,
          t,
          s,
          o,
          c = this,
          a = r("img[data-lazy]", c.$slider);
        a.length
          ? ((i = a.first()),
            (n = i.attr("data-lazy")),
            (t = i.attr("data-srcset")),
            (s = i.attr("data-sizes") || c.$slider.attr("data-sizes")),
            ((o = document.createElement("img")).onload = function () {
              t && (i.attr("srcset", t), s && i.attr("sizes", s)),
                i
                  .attr("src", n)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                c.options.adaptiveHeight === !0 && c.setPosition(),
                c.$slider.trigger("lazyLoaded", [c, i, n]),
                c.progressiveLazyLoad();
            }),
            (o.onerror = function () {
              e < 3
                ? setTimeout(function () {
                    c.progressiveLazyLoad(e + 1);
                  }, 500)
                : (i
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  c.$slider.trigger("lazyLoadError", [c, i, n]),
                  c.progressiveLazyLoad());
            }),
            (o.src = n))
          : c.$slider.trigger("allImagesLoaded", [c]);
      }),
      (l.prototype.refresh = function (e) {
        var i,
          n,
          t = this;
        (n = t.slideCount - t.options.slidesToShow),
          !t.options.infinite && t.currentSlide > n && (t.currentSlide = n),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          (i = t.currentSlide),
          t.destroy(!0),
          r.extend(t, t.initials, { currentSlide: i }),
          t.init(),
          e || t.changeSlide({ data: { message: "index", index: i } }, !1);
      }),
      (l.prototype.registerBreakpoints = function () {
        var e,
          i,
          n,
          t = this,
          s = t.options.responsive || null;
        if (r.type(s) === "array" && s.length) {
          t.respondTo = t.options.respondTo || "window";
          for (e in s)
            if (((n = t.breakpoints.length - 1), s.hasOwnProperty(e))) {
              for (i = s[e].breakpoint; n >= 0; )
                t.breakpoints[n] &&
                  t.breakpoints[n] === i &&
                  t.breakpoints.splice(n, 1),
                  n--;
              t.breakpoints.push(i), (t.breakpointSettings[i] = s[e].settings);
            }
          t.breakpoints.sort(function (o, c) {
            return t.options.mobileFirst ? o - c : c - o;
          });
        }
      }),
      (l.prototype.reinit = function () {
        var e = this;
        (e.$slides = e.$slideTrack
          .children(e.options.slide)
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.currentSlide >= e.slideCount &&
            e.currentSlide !== 0 &&
            (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          e.registerBreakpoints(),
          e.setProps(),
          e.setupInfinite(),
          e.buildArrows(),
          e.updateArrows(),
          e.initArrowEvents(),
          e.buildDots(),
          e.updateDots(),
          e.initDotEvents(),
          e.cleanUpSlideEvents(),
          e.initSlideEvents(),
          e.checkResponsive(!1, !0),
          e.options.focusOnSelect === !0 &&
            r(e.$slideTrack).children().on("click.slick", e.selectHandler),
          e.setSlideClasses(
            typeof e.currentSlide == "number" ? e.currentSlide : 0
          ),
          e.setPosition(),
          e.focusHandler(),
          (e.paused = !e.options.autoplay),
          e.autoPlay(),
          e.$slider.trigger("reInit", [e]);
      }),
      (l.prototype.resize = function () {
        var e = this;
        r(window).width() !== e.windowWidth &&
          (clearTimeout(e.windowDelay),
          (e.windowDelay = window.setTimeout(function () {
            (e.windowWidth = r(window).width()),
              e.checkResponsive(),
              e.unslicked || e.setPosition();
          }, 50)));
      }),
      (l.prototype.removeSlide = l.prototype.slickRemove = function (e, i, n) {
        var t = this;
        if (
          ((e =
            typeof e == "boolean"
              ? (i = e) === !0
                ? 0
                : t.slideCount - 1
              : i === !0
              ? --e
              : e),
          t.slideCount < 1 || e < 0 || e > t.slideCount - 1)
        )
          return !1;
        t.unload(),
          n === !0
            ? t.$slideTrack.children().remove()
            : t.$slideTrack.children(this.options.slide).eq(e).remove(),
          (t.$slides = t.$slideTrack.children(this.options.slide)),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.append(t.$slides),
          (t.$slidesCache = t.$slides),
          t.reinit();
      }),
      (l.prototype.setCSS = function (e) {
        var i,
          n,
          t = this,
          s = {};
        t.options.rtl === !0 && (e = -e),
          (i = t.positionProp == "left" ? Math.ceil(e) + "px" : "0px"),
          (n = t.positionProp == "top" ? Math.ceil(e) + "px" : "0px"),
          (s[t.positionProp] = e),
          t.transformsEnabled === !1
            ? t.$slideTrack.css(s)
            : ((s = {}),
              t.cssTransitions === !1
                ? ((s[t.animType] = "translate(" + i + ", " + n + ")"),
                  t.$slideTrack.css(s))
                : ((s[t.animType] = "translate3d(" + i + ", " + n + ", 0px)"),
                  t.$slideTrack.css(s)));
      }),
      (l.prototype.setDimensions = function () {
        var e = this;
        e.options.vertical === !1
          ? e.options.centerMode === !0 &&
            e.$list.css({ padding: "0px " + e.options.centerPadding })
          : (e.$list.height(
              e.$slides.first().outerHeight(!0) * e.options.slidesToShow
            ),
            e.options.centerMode === !0 &&
              e.$list.css({ padding: e.options.centerPadding + " 0px" })),
          (e.listWidth = e.$list.width()),
          (e.listHeight = e.$list.height()),
          e.options.vertical === !1 && e.options.variableWidth === !1
            ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)),
              e.$slideTrack.width(
                Math.ceil(
                  e.slideWidth * e.$slideTrack.children(".slick-slide").length
                )
              ))
            : e.options.variableWidth === !0
            ? e.$slideTrack.width(5e3 * e.slideCount)
            : ((e.slideWidth = Math.ceil(e.listWidth)),
              e.$slideTrack.height(
                Math.ceil(
                  e.$slides.first().outerHeight(!0) *
                    e.$slideTrack.children(".slick-slide").length
                )
              ));
        var i = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        e.options.variableWidth === !1 &&
          e.$slideTrack.children(".slick-slide").width(e.slideWidth - i);
      }),
      (l.prototype.setFade = function () {
        var e,
          i = this;
        i.$slides.each(function (n, t) {
          (e = i.slideWidth * n * -1),
            i.options.rtl === !0
              ? r(t).css({
                  position: "relative",
                  right: e,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0
                })
              : r(t).css({
                  position: "relative",
                  left: e,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0
                });
        }),
          i.$slides
            .eq(i.currentSlide)
            .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
      }),
      (l.prototype.setHeight = function () {
        var e = this;
        if (
          e.options.slidesToShow === 1 &&
          e.options.adaptiveHeight === !0 &&
          e.options.vertical === !1
        ) {
          var i = e.$slides.eq(e.currentSlide).outerHeight(!0);
          e.$list.css("height", i);
        }
      }),
      (l.prototype.setOption = l.prototype.slickSetOption = function () {
        var e,
          i,
          n,
          t,
          s,
          o = this,
          c = !1;
        if (
          (r.type(arguments[0]) === "object"
            ? ((n = arguments[0]), (c = arguments[1]), (s = "multiple"))
            : r.type(arguments[0]) === "string" &&
              ((n = arguments[0]),
              (t = arguments[1]),
              (c = arguments[2]),
              arguments[0] === "responsive" && r.type(arguments[1]) === "array"
                ? (s = "responsive")
                : arguments[1] !== void 0 && (s = "single")),
          s === "single")
        )
          o.options[n] = t;
        else if (s === "multiple")
          r.each(n, function (a, p) {
            o.options[a] = p;
          });
        else if (s === "responsive")
          for (i in t)
            if (r.type(o.options.responsive) !== "array")
              o.options.responsive = [t[i]];
            else {
              for (e = o.options.responsive.length - 1; e >= 0; )
                o.options.responsive[e].breakpoint === t[i].breakpoint &&
                  o.options.responsive.splice(e, 1),
                  e--;
              o.options.responsive.push(t[i]);
            }
        c && (o.unload(), o.reinit());
      }),
      (l.prototype.setPosition = function () {
        var e = this;
        e.setDimensions(),
          e.setHeight(),
          e.options.fade === !1
            ? e.setCSS(e.getLeft(e.currentSlide))
            : e.setFade(),
          e.$slider.trigger("setPosition", [e]);
      }),
      (l.prototype.setProps = function () {
        var e = this,
          i = document.body.style;
        (e.positionProp = e.options.vertical === !0 ? "top" : "left"),
          e.positionProp === "top"
            ? e.$slider.addClass("slick-vertical")
            : e.$slider.removeClass("slick-vertical"),
          (i.WebkitTransition === void 0 &&
            i.MozTransition === void 0 &&
            i.msTransition === void 0) ||
            (e.options.useCSS === !0 && (e.cssTransitions = !0)),
          e.options.fade &&
            (typeof e.options.zIndex == "number"
              ? e.options.zIndex < 3 && (e.options.zIndex = 3)
              : (e.options.zIndex = e.defaults.zIndex)),
          i.OTransform !== void 0 &&
            ((e.animType = "OTransform"),
            (e.transformType = "-o-transform"),
            (e.transitionType = "OTransition"),
            i.perspectiveProperty === void 0 &&
              i.webkitPerspective === void 0 &&
              (e.animType = !1)),
          i.MozTransform !== void 0 &&
            ((e.animType = "MozTransform"),
            (e.transformType = "-moz-transform"),
            (e.transitionType = "MozTransition"),
            i.perspectiveProperty === void 0 &&
              i.MozPerspective === void 0 &&
              (e.animType = !1)),
          i.webkitTransform !== void 0 &&
            ((e.animType = "webkitTransform"),
            (e.transformType = "-webkit-transform"),
            (e.transitionType = "webkitTransition"),
            i.perspectiveProperty === void 0 &&
              i.webkitPerspective === void 0 &&
              (e.animType = !1)),
          i.msTransform !== void 0 &&
            ((e.animType = "msTransform"),
            (e.transformType = "-ms-transform"),
            (e.transitionType = "msTransition"),
            i.msTransform === void 0 && (e.animType = !1)),
          i.transform !== void 0 &&
            e.animType !== !1 &&
            ((e.animType = "transform"),
            (e.transformType = "transform"),
            (e.transitionType = "transition")),
          (e.transformsEnabled =
            e.options.useTransform && e.animType !== null && e.animType !== !1);
      }),
      (l.prototype.setSlideClasses = function (e) {
        var i,
          n,
          t,
          s,
          o = this;
        if (
          ((n = o.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true")),
          o.$slides.eq(e).addClass("slick-current"),
          o.options.centerMode === !0)
        ) {
          var c = o.options.slidesToShow % 2 == 0 ? 1 : 0;
          (i = Math.floor(o.options.slidesToShow / 2)),
            o.options.infinite === !0 &&
              (e >= i && e <= o.slideCount - 1 - i
                ? o.$slides
                    .slice(e - i + c, e + i + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((t = o.options.slidesToShow + e),
                  n
                    .slice(t - i + 1 + c, t + i + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              e === 0
                ? n
                    .eq(n.length - 1 - o.options.slidesToShow)
                    .addClass("slick-center")
                : e === o.slideCount - 1 &&
                  n.eq(o.options.slidesToShow).addClass("slick-center")),
            o.$slides.eq(e).addClass("slick-center");
        } else
          e >= 0 && e <= o.slideCount - o.options.slidesToShow
            ? o.$slides
                .slice(e, e + o.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : n.length <= o.options.slidesToShow
            ? n.addClass("slick-active").attr("aria-hidden", "false")
            : ((s = o.slideCount % o.options.slidesToShow),
              (t = o.options.infinite === !0 ? o.options.slidesToShow + e : e),
              o.options.slidesToShow == o.options.slidesToScroll &&
              o.slideCount - e < o.options.slidesToShow
                ? n
                    .slice(t - (o.options.slidesToShow - s), t + s)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : n
                    .slice(t, t + o.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false"));
        (o.options.lazyLoad !== "ondemand" &&
          o.options.lazyLoad !== "anticipated") ||
          o.lazyLoad();
      }),
      (l.prototype.setupInfinite = function () {
        var e,
          i,
          n,
          t = this;
        if (
          (t.options.fade === !0 && (t.options.centerMode = !1),
          t.options.infinite === !0 &&
            t.options.fade === !1 &&
            ((i = null), t.slideCount > t.options.slidesToShow))
        ) {
          for (
            n =
              t.options.centerMode === !0
                ? t.options.slidesToShow + 1
                : t.options.slidesToShow,
              e = t.slideCount;
            e > t.slideCount - n;
            e -= 1
          )
            (i = e - 1),
              r(t.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i - t.slideCount)
                .prependTo(t.$slideTrack)
                .addClass("slick-cloned");
          for (e = 0; e < n + t.slideCount; e += 1)
            (i = e),
              r(t.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i + t.slideCount)
                .appendTo(t.$slideTrack)
                .addClass("slick-cloned");
          t.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              r(this).attr("id", "");
            });
        }
      }),
      (l.prototype.interrupt = function (e) {
        var i = this;
        e || i.autoPlay(), (i.interrupted = e);
      }),
      (l.prototype.selectHandler = function (e) {
        var i = this,
          n = r(e.target).is(".slick-slide")
            ? r(e.target)
            : r(e.target).parents(".slick-slide"),
          t = parseInt(n.attr("data-slick-index"));
        t || (t = 0),
          i.slideCount <= i.options.slidesToShow
            ? i.slideHandler(t, !1, !0)
            : i.slideHandler(t);
      }),
      (l.prototype.slideHandler = function (e, i, n) {
        var t,
          s,
          o,
          c,
          a,
          p = null,
          d = this;
        if (
          ((i = i || !1),
          !(
            (d.animating === !0 && d.options.waitForAnimate === !0) ||
            (d.options.fade === !0 && d.currentSlide === e)
          ))
        )
          if (
            (i === !1 && d.asNavFor(e),
            (t = e),
            (p = d.getLeft(t)),
            (c = d.getLeft(d.currentSlide)),
            (d.currentLeft = d.swipeLeft === null ? c : d.swipeLeft),
            d.options.infinite === !1 &&
              d.options.centerMode === !1 &&
              (e < 0 || e > d.getDotCount() * d.options.slidesToScroll))
          )
            d.options.fade === !1 &&
              ((t = d.currentSlide),
              n !== !0
                ? d.animateSlide(c, function () {
                    d.postSlide(t);
                  })
                : d.postSlide(t));
          else if (
            d.options.infinite === !1 &&
            d.options.centerMode === !0 &&
            (e < 0 || e > d.slideCount - d.options.slidesToScroll)
          )
            d.options.fade === !1 &&
              ((t = d.currentSlide),
              n !== !0
                ? d.animateSlide(c, function () {
                    d.postSlide(t);
                  })
                : d.postSlide(t));
          else {
            if (
              (d.options.autoplay && clearInterval(d.autoPlayTimer),
              (s =
                t < 0
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                    : d.slideCount + t
                  : t >= d.slideCount
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? 0
                    : t - d.slideCount
                  : t),
              (d.animating = !0),
              d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
              (o = d.currentSlide),
              (d.currentSlide = s),
              d.setSlideClasses(d.currentSlide),
              d.options.asNavFor &&
                (a = (a = d.getNavTarget()).slick("getSlick")).slideCount <=
                  a.options.slidesToShow &&
                a.setSlideClasses(d.currentSlide),
              d.updateDots(),
              d.updateArrows(),
              d.options.fade === !0)
            )
              return (
                n !== !0
                  ? (d.fadeSlideOut(o),
                    d.fadeSlide(s, function () {
                      d.postSlide(s);
                    }))
                  : d.postSlide(s),
                void d.animateHeight()
              );
            n !== !0
              ? d.animateSlide(p, function () {
                  d.postSlide(s);
                })
              : d.postSlide(s);
          }
      }),
      (l.prototype.startLoad = function () {
        var e = this;
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.hide(), e.$nextArrow.hide()),
          e.options.dots === !0 &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.hide(),
          e.$slider.addClass("slick-loading");
      }),
      (l.prototype.swipeDirection = function () {
        var e,
          i,
          n,
          t,
          s = this;
        return (
          (e = s.touchObject.startX - s.touchObject.curX),
          (i = s.touchObject.startY - s.touchObject.curY),
          (n = Math.atan2(i, e)),
          (t = Math.round((180 * n) / Math.PI)) < 0 && (t = 360 - Math.abs(t)),
          (t <= 45 && t >= 0) || (t <= 360 && t >= 315)
            ? s.options.rtl === !1
              ? "left"
              : "right"
            : t >= 135 && t <= 225
            ? s.options.rtl === !1
              ? "right"
              : "left"
            : s.options.verticalSwiping === !0
            ? t >= 35 && t <= 135
              ? "down"
              : "up"
            : "vertical"
        );
      }),
      (l.prototype.swipeEnd = function (e) {
        var i,
          n,
          t = this;
        if (((t.dragging = !1), (t.swiping = !1), t.scrolling))
          return (t.scrolling = !1), !1;
        if (
          ((t.interrupted = !1),
          (t.shouldClick = !(t.touchObject.swipeLength > 10)),
          t.touchObject.curX === void 0)
        )
          return !1;
        if (
          (t.touchObject.edgeHit === !0 &&
            t.$slider.trigger("edge", [t, t.swipeDirection()]),
          t.touchObject.swipeLength >= t.touchObject.minSwipe)
        ) {
          switch ((n = t.swipeDirection())) {
            case "left":
            case "down":
              (i = t.options.swipeToSlide
                ? t.checkNavigable(t.currentSlide + t.getSlideCount())
                : t.currentSlide + t.getSlideCount()),
                (t.currentDirection = 0);
              break;
            case "right":
            case "up":
              (i = t.options.swipeToSlide
                ? t.checkNavigable(t.currentSlide - t.getSlideCount())
                : t.currentSlide - t.getSlideCount()),
                (t.currentDirection = 1);
          }
          n != "vertical" &&
            (t.slideHandler(i),
            (t.touchObject = {}),
            t.$slider.trigger("swipe", [t, n]));
        } else
          t.touchObject.startX !== t.touchObject.curX &&
            (t.slideHandler(t.currentSlide), (t.touchObject = {}));
      }),
      (l.prototype.swipeHandler = function (e) {
        var i = this;
        if (
          !(
            i.options.swipe === !1 ||
            ("ontouchend" in document && i.options.swipe === !1) ||
            (i.options.draggable === !1 && e.type.indexOf("mouse") !== -1)
          )
        )
          switch (
            ((i.touchObject.fingerCount =
              e.originalEvent && e.originalEvent.touches !== void 0
                ? e.originalEvent.touches.length
                : 1),
            (i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold),
            i.options.verticalSwiping === !0 &&
              (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold),
            e.data.action)
          ) {
            case "start":
              i.swipeStart(e);
              break;
            case "move":
              i.swipeMove(e);
              break;
            case "end":
              i.swipeEnd(e);
          }
      }),
      (l.prototype.swipeMove = function (e) {
        var i,
          n,
          t,
          s,
          o,
          c,
          a = this;
        return (
          (o = e.originalEvent !== void 0 ? e.originalEvent.touches : null),
          !(!a.dragging || a.scrolling || (o && o.length !== 1)) &&
            ((i = a.getLeft(a.currentSlide)),
            (a.touchObject.curX = o !== void 0 ? o[0].pageX : e.clientX),
            (a.touchObject.curY = o !== void 0 ? o[0].pageY : e.clientY),
            (a.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))
            )),
            (c = Math.round(
              Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))
            )),
            !a.options.verticalSwiping && !a.swiping && c > 4
              ? ((a.scrolling = !0), !1)
              : (a.options.verticalSwiping === !0 &&
                  (a.touchObject.swipeLength = c),
                (n = a.swipeDirection()),
                e.originalEvent !== void 0 &&
                  a.touchObject.swipeLength > 4 &&
                  ((a.swiping = !0), e.preventDefault()),
                (s =
                  (a.options.rtl === !1 ? 1 : -1) *
                  (a.touchObject.curX > a.touchObject.startX ? 1 : -1)),
                a.options.verticalSwiping === !0 &&
                  (s = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
                (t = a.touchObject.swipeLength),
                (a.touchObject.edgeHit = !1),
                a.options.infinite === !1 &&
                  ((a.currentSlide === 0 && n === "right") ||
                    (a.currentSlide >= a.getDotCount() && n === "left")) &&
                  ((t = a.touchObject.swipeLength * a.options.edgeFriction),
                  (a.touchObject.edgeHit = !0)),
                a.options.vertical === !1
                  ? (a.swipeLeft = i + t * s)
                  : (a.swipeLeft = i + t * (a.$list.height() / a.listWidth) * s),
                a.options.verticalSwiping === !0 && (a.swipeLeft = i + t * s),
                a.options.fade !== !0 &&
                  a.options.touchMove !== !1 &&
                  (a.animating === !0
                    ? ((a.swipeLeft = null), !1)
                    : void a.setCSS(a.swipeLeft))))
        );
      }),
      (l.prototype.swipeStart = function (e) {
        var i,
          n = this;
        if (
          ((n.interrupted = !0),
          n.touchObject.fingerCount !== 1 ||
            n.slideCount <= n.options.slidesToShow)
        )
          return (n.touchObject = {}), !1;
        e.originalEvent !== void 0 &&
          e.originalEvent.touches !== void 0 &&
          (i = e.originalEvent.touches[0]),
          (n.touchObject.startX = n.touchObject.curX =
            i !== void 0 ? i.pageX : e.clientX),
          (n.touchObject.startY = n.touchObject.curY =
            i !== void 0 ? i.pageY : e.clientY),
          (n.dragging = !0);
      }),
      (l.prototype.unfilterSlides = l.prototype.slickUnfilter = function () {
        var e = this;
        e.$slidesCache !== null &&
          (e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.appendTo(e.$slideTrack),
          e.reinit());
      }),
      (l.prototype.unload = function () {
        var e = this;
        r(".slick-cloned", e.$slider).remove(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.htmlExpr.test(e.options.prevArrow) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.htmlExpr.test(e.options.nextArrow) &&
            e.$nextArrow.remove(),
          e.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (l.prototype.unslick = function (e) {
        var i = this;
        i.$slider.trigger("unslick", [i, e]), i.destroy();
      }),
      (l.prototype.updateArrows = function () {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
          e.options.arrows === !0 &&
            e.slideCount > e.options.slidesToShow &&
            !e.options.infinite &&
            (e.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.currentSlide === 0
              ? (e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : ((e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                  e.options.centerMode === !1) ||
                  (e.currentSlide >= e.slideCount - 1 &&
                    e.options.centerMode === !0)) &&
                (e.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (l.prototype.updateDots = function () {
        var e = this;
        e.$dots !== null &&
          (e.$dots.find("li").removeClass("slick-active").end(),
          e.$dots
            .find("li")
            .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (l.prototype.visibility = function () {
        var e = this;
        e.options.autoplay &&
          (document[e.hidden] ? (e.interrupted = !0) : (e.interrupted = !1));
      }),
      (r.fn.slick = function () {
        var e,
          i,
          n = this,
          t = arguments[0],
          s = Array.prototype.slice.call(arguments, 1),
          o = n.length;
        for (e = 0; e < o; e++)
          if (
            (typeof t == "object" || t === void 0
              ? (n[e].slick = new l(n[e], t))
              : (i = n[e].slick[t].apply(n[e].slick, s)),
            i !== void 0)
          )
            return i;
        return n;
      });
  });
  