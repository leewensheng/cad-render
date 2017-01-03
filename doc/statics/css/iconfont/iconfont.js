;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-menu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M872 136.992q28 0 47.488 19.488t19.488 47.488l0 51.008q0 28-19.488 47.488t-47.488 19.488l-742.016 0q-28 0-47.488-19.488t-19.488-47.488l0-51.008q0-28 19.488-47.488t47.488-19.488l742.016 0zM872 450.016q28 0 47.488 19.488t19.488 47.488l0 51.008q0 28-19.488 47.488t-47.488 19.488l-742.016 0q-28 0-47.488-19.488t-19.488-47.488l0-51.008q0-28 19.488-47.488t47.488-19.488l742.016 0zM872 763.008q28 0 47.488 19.488t19.488 47.488l0 51.008q0 28-19.488 47.488t-47.488 19.488l-742.016 0q-28 0-47.488-19.488t-19.488-47.488l0-51.008q0-28 19.488-47.488t47.488-19.488l742.016 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M342.528 948.928c-6.144 0-12.288-2.336-16.96-7.04-9.376-9.376-9.376-24.576 0-33.952l376.224-376.224L300.224 130.144c-9.376-9.376-9.376-24.576 0-33.952s24.576-9.376 33.952 0l435.488 435.52L359.488 941.92C354.816 946.592 348.672 948.928 342.528 948.928z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-error" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)