/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _point = __webpack_require__(4);

	var _point2 = _interopRequireDefault(_point);

	var _paper = __webpack_require__(5);

	var _paper2 = _interopRequireDefault(_paper);

	var _namespace = __webpack_require__(10);

	var _namespace2 = _interopRequireDefault(_namespace);

	var _browser = __webpack_require__(11);

	var _browser2 = _interopRequireDefault(_browser);

	__webpack_require__(12);

	__webpack_require__(13);

	__webpack_require__(14);

	__webpack_require__(15);

	__webpack_require__(16);

	__webpack_require__(17);

	__webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_core2["default"].extend({
	    Point: _point2["default"],
	    Path: _path2["default"],
	    Paper: _paper2["default"],
	    namespace: _namespace2["default"],
	    browser: _browser2["default"],
	    init: function init(option) {
	        return this.Paper(option);
	    }
	});
	window.cad = _core2["default"];
	module.exports = _core2["default"];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var cad = {
	    version: 1.0,
	    extend: _jquery2["default"].extend
	};
	module.exports = cad;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.jQuery||window.Zepto;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	module.exports = Path;
	function Path(initialPath) {
	    if (initialPath instanceof Array) {
	        this.pathStack = [];
	    } else {
	        this.pathStack = [];
	    }
	};
	Path.fn = Path.prototype = {
	    constructor: Path,
	    MoveTo: function MoveTo(x, y) {
	        return this.pushStack("M", [x + "," + y]);
	    },
	    moveTo: function moveTo(dx, dy) {
	        return this.pushStack("m", [dx + "," + dy]);
	    },
	    ArcTo: function ArcTo(rx, ry, rotateX, isLargeArc, isClockwise, endX, endY) {
	        return this.pushStack("A", [rx + " " + ry, rotateX, isLargeArc, isClockwise, endX + "," + endY]);
	    },
	    arcTo: function arcTo(rx, ry, rotateX, isLargeArc, isClockwise, endX, endY) {
	        return this.pushStack("a", [rx + " " + ry, rotateX, isLargeArc, isClockwise, endX + "," + endY]);
	    },
	    LineTo: function LineTo(x, y) {
	        return this.pushStack("L", [x + "," + y]);
	    },
	    lineTo: function lineTo(dx, dy) {
	        return this.pushStack("l", [dx + "," + dy]);
	    },
	    HorizontalLineTo: function HorizontalLineTo(x) {
	        return this.pushStack("H", [x]);
	    },
	    horizontalLineTo: function horizontalLineTo(dx) {
	        return this.pushStack('h', [dx]);
	    },
	    VerticalLineTo: function VerticalLineTo(dy) {
	        return this.pushStack('V', [dy]);
	    },
	    verticalLineTo: function verticalLineTo(dy) {
	        return this.pushStack('v', [dy]);
	    },
	    SmoothCureveTo: function SmoothCureveTo(x2, y2, endx, endy) {
	        return this.pushStack('S', [x2 + "," + y2, endx + "," + endy]);
	    },
	    smoothCurveTo: function smoothCurveTo(x2, y2, endx, endy) {
	        return this.pushStack('s', [x2 + "," + y2, endx + "," + endy]);
	    },
	    CurveTo: function CurveTo(x1, y1, x2, y2, endx, endy) {
	        /*  
	            x1 y1控制杆1
	            x2,y2控制杆2
	            x,y终点
	        */
	        return this.pushStack('C', [x1 + "," + y1, x2 + "," + y2, endx + "," + endy]);
	    },
	    curveTo: function curveTo(x1, y1, x2, y2, endx, endy) {
	        return this.pushStack('c', [x1 + "," + y1, x2 + "," + y2, x3 + "," + y3]);
	    },
	    QuadraticBelzierCurveTo: function QuadraticBelzierCurveTo(x, y, endx, endy) {
	        return this.pushStack('Q', [x + "," + y, endx + "," + endy]);
	    },
	    quadraticBelzierCurveTo: function quadraticBelzierCurveTo(x, y, endx, endy) {
	        return this.pushStack('q', [x + "," + y, endx + "," + endy]);
	    },
	    SmoothQuadraticBezierCurveto: function SmoothQuadraticBezierCurveto(endx, endy) {
	        return this.pushStack('T', [endx + "," + endy]);
	    },
	    smoothQuadraticBezierCurveto: function smoothQuadraticBezierCurveto(endx, endy) {
	        return this.pushStack('t', [endx + "," + endy]);
	    },
	    closePath: function closePath() {
	        return this.pushStack("Z", []);
	    },
	    pushStack: function pushStack(action, params) {
	        this.pathStack.push({
	            action: action,
	            params: params
	        });
	        return this;
	    },
	    getAbsolutePoints: function getAbsolutePoints() {
	        var actions = this.pathStack;
	        var x = 0,
	            y = 0;
	        var points = [];
	        for (var i = 0; i < actions.length; i++) {
	            var action = actions[i];
	            var name = action.action;
	            var baseName = name.toLowerCase();
	            var params = action.params;
	            if (baseName !== 'z') {
	                var point = params[params.length - 1].split(',').map(function (val) {
	                    return parseFloat(val);
	                });
	                var x_new, y_new;
	                if (baseName == 'v') {
	                    x_new = 0;
	                    y_new = point[0];
	                } else if (baseName == 'h') {
	                    x_new = point[0];
	                    y_new = 0;
	                } else {
	                    x_new = point[0];
	                    y_new = point[1];
	                }
	                if (/[A-Z]/g.test(name)) {
	                    x = x_new;
	                    y = y_new;
	                } else {
	                    x += x_new;
	                    y += y_new;
	                }
	                points.push({ x: x, y: y });
	            }
	        }
	        return points;
	    },
	    getCurPoint: function getCurPoint() {
	        var actions = this.pathStack;
	        var x = 0,
	            y = 0;
	        var points = this.getAbsolutePoints();
	        if (points.length > 0) {
	            var p = points[points.length - 1];
	            x = p.x;
	            y = p.y;
	        }
	        return { x: x, y: y };
	    },
	    get: function get(index) {
	        return this.pathStack[index];
	    },
	    getPath: function getPath() {
	        return this.toString();
	    },
	    clone: function clone() {
	        //todo;
	    },
	    connectToPath: function connectToPath() {},
	    toString: function toString() {
	        //最好在出口处取整一下;
	        var ret = [],
	            pathStack = this.pathStack;
	        ret = pathStack.map(function (path, index) {
	            return path.action + " " + path.params.join(",");
	        });
	        return ret.join(" ");
	    }
	};
	Path.extend = Path.fn.extend = _jquery2["default"].extend;
	Path.parse = function (str) {};
	var shortName = {
	    m: "moveTo",
	    M: "MoveTo",
	    a: "arcTo",
	    A: "ArcTo",
	    v: "verticalLineTo",
	    V: "VerticalLineTo",
	    h: "horizontalLineTo",
	    H: "HorizontalLineTo",
	    c: "curveTo",
	    C: "CurveTo",
	    s: "smoothCurveTo",
	    S: "SmoothCureveTo",
	    q: "quadraticBelzierCurveTo",
	    Q: "QuadraticBelzierCurveTo",
	    t: "smoothQuadraticBezierCurveto",
	    T: "SmoothQuadraticBezierCurveto"
	};
	for (var key in shortName) {
	    Path.fn[key] = Path.fn[shortName[key]];
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function Point(x, y) {
		if (arguments.length == 1) {
			return new Point.prototype.init(arguments[0]);
		} else {
			return new Point.prototype.init(x, y);
		}
	}
	Point.fn = Point.prototype = _defineProperty({
		constructor: Point,
		init: function init() {
			var p, x, y;
			if (arguments.length == 1 && _typeof(arguments[0]) == 'object') {
				var p = arguments[0];
				this.x = p.x || 0;
				this.y = p.y || 0;
			} else if (arguments.length == 2) {
				this.x = arguments[0];
				this.y = arguments[1];
			}
			return this;
		},
		clone: function clone() {
			return new Point.prototype.init(this.x, this.y);
		},
		getLenTo: function getLenTo() {
			var x = this.x,
			    y = this.y,
			    x1,
			    y1,
			    point;
			if (arguments.length == 1 && _typeof(arguments[0]) == 'object') {
				point = arguments[0];
				x1 = point.x;
				y1 = point.y;
			} else {
				x1 = arguments[0] || 0;
				y1 = arguments[1] || 0;
			}
			var len = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
			return len;
		},
		getMidPointTo: function getMidPointTo(x1, y1) {
			return this.moveTo((x1 + this.x) / 2, (y1 + this.y) / 2);
		},
		getAngleTo: function getAngleTo(x1, y1) {
			return this.getAngle(x1 - this.x, y1 - this.y);
		},
		getAngleFrom: function getAngleFrom(x0, y0) {
			return this.getAngle(this.x - x0, this.y - y0);
		},
		getAngle: function getAngle(dx, dy) {
			if (dx == dy && dx == 0) {
				return 0;
			} else if (dx == 0) {
				if (dy > 0) {
					return 90;
				} else {
					return -90;
				}
			} else if (dy == 0) {
				if (dx > 0) {
					return 0;
				} else {
					return 180;
				}
			} else {
				var angle = Math.atan(dy / dx) * 180 / Math.PI;
				if (dx > 0 && dy > 0) {
					return angle;
				} else if (dx > 0 && dy < 0) {
					return angle;
				} else if (dx < 0 && dy > 0) {
					return angle + 180;
				} else if (dx < 0 && dy < 0) {
					return angle + 180;
				}
			}
		},
		angleTo: function angleTo(angle, len) {
			return this.moveBy(len * Math.cos(Math.PI * angle / 180), len * Math.sin(Math.PI * angle / 180));
		},
		getVerticalPoint: function getVerticalPoint(x1, y1, x2, y2) {
			var x = this.x,
			    y = this.y;
			var mirrorPoint = this.mirror(x1, y1, x2, y2);
			var x1 = mirrorPoint.x,
			    y1 = mirrorPoint.y;
			var vx = (x + x1) / 2;
			var vy = (y + y1) / 2;
			return new Point.prototype.init(vx, vy);
		},
		mirror: function mirror(x1, y1, x2, y2) {
			var a = y1 - y2;
			var b = x2 - x1;
			var c = x1 * (y2 - y1) - y1 * (x2 - x1);
			var x = this.x;
			var y = this.y;
			var x0, y0;
			x0 = x - 2 * a * (a * x + b * y + c) / (a * a + b * b);
			y0 = y - 2 * b * (a * x + b * y + c) / (a * a + b * b);
			return new Point.prototype.init(x0, y0);
		},
		moveBy: function moveBy(dx, dy) {
			var x = this.x + dx;
			var y = this.y + dy;
			this.x = x;
			this.y = y;
			return this;
		},
		moveTo: function moveTo(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},
		nearTo: function nearTo(x1, y1, len) {
			var angle = this.getAngleTo(x1, y1);
			return this.moveTo(x1, y1).angleTo(angle, len);
		},
		rotate: function rotate(angle, cx, cy) {
			var x = this.x;
			var y = this.y;
			var cur_angle = this.getAngleFrom(cx, cy);
			var new_angle = cur_angle + angle;
			var len = this.getLenTo(cx, cy);
			this.x = cx + len * Math.cos(Math.PI * new_angle / 180);
			this.y = cy + len * Math.sin(Math.PI * new_angle / 180);
			return this;
		},
		scale: function scale(sclae, cx, cy) {},
		getTangentPoint: function getTangentPoint(cx, cy, r) {
			//也可以支持SVG circle
		}
	}, 'getVerticalPoint', function getVerticalPoint(x1, x2, y1, y2) {});
	Point.fn.init.prototype = Point.prototype;
	Point.extend = Point.fn.extend = _jquery2["default"].extend;
	Point.extend({
		getPointOnCircle: function getPointOnCircle(cx, cy, r, angle) {
			var dx = r * Math.cos(angle);
			var dy = r * Math.sin(angle);
			x = cx + dx;
			y = cy + dy;
			return Point(x, y);
		}
	});
	module.exports = Point;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(6);

	var _namespace = __webpack_require__(10);

	var _namespace2 = _interopRequireDefault(_namespace);

	var _browser = __webpack_require__(11);

	var _browser2 = _interopRequireDefault(_browser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Paper = function Paper(option) {
	    return new Paper.prototype.init(option);
	};
	Paper.prototype = {
	    mouse: function mouse(e, mutiple) {
	        var svg = this.svg.get(0);
	        var clientRect = svg.getBoundingClientRect();
	        if (!mutiple) {
	            if (!/touch/gi.test(e.type)) {
	                return { x: e.clientX - clientRect.left, y: e.clientY - clientRect.top };
	            } else {
	                return {
	                    x: e.touches[0].clientX - clientRect.left,
	                    y: e.touches[0].clientY - clientRect.top
	                };
	            }
	        } else {
	            var ret = [];
	            if (/touch/gi.test(e.type)) {
	                for (var i = 0; i < e.touches.length; i++) {
	                    ret.push({
	                        x: e.touches[i].clientX - clientRect.left,
	                        y: e.touches[i].clientY - clientRect.top
	                    });
	                }
	            }
	            return ret;
	        }
	    },
	    createSVGElement: function createSVGElement(tagName, attributes) {
	        tagName = _jquery2["default"].trim(tagName);
	        var SVG_NAMESPACE = _namespace2["default"].svg;
	        var XLink_NS = _namespace2["default"].xlink;
	        var el = document.createElementNS(SVG_NAMESPACE, tagName);
	        if ((typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object') {
	            for (var key in attributes) {
	                if (typeof attributes[key] != 'undefined') {
	                    if (!(tagName == 'image' && key == 'xlink:href')) {
	                        el.setAttribute(key, attributes[key]);
	                    } else {
	                        el.setAttributeNS(XLink_NS, 'xlink:href', attributes[key]);
	                    }
	                }
	            }
	        }
	        return (0, _jquery2["default"])(el);
	    },
	    getSVGXML: function getSVGXML() {
	        var svg = this.svg;
	        return svg.parent().html();
	    },
	    init: function init(option) {
	        this.option = option;
	        this.initPaper();
	        return this;
	    },
	    initPaper: function initPaper() {
	        var option = this.option;
	        var width = option.width;
	        var height = option.height;
	        var el = option.el;
	        var svg = this.createSVGElement('svg', { width: width, height: height, xmlns: "http://www.w3.org/2000/svg" });
	        var defs = this.createSVGElement("defs");
	        (0, _jquery2["default"])(el).append(svg);
	        (0, _jquery2["default"])(svg).append(defs);
	        this.svg = svg;
	        this.initDefaultLayer();
	        return this;
	    },
	    append: function append(tagName, attributes) {
	        var currentLayer = this.currentLayer.el;
	        var el = this.createSVGElement(tagName, attributes);
	        (0, _jquery2["default"])(currentLayer).append(el);
	        return el;
	    },
	    prepend: function prepend() {
	        var currentLayer = this.currentLayer.el;
	        var el = this.createSVGElement(tagName, attributes);
	        (0, _jquery2["default"])(currentLayer).prepend(el);
	        return el;
	    },
	    select: function select(selector) {
	        return (0, _jquery2["default"])(selector, this.svg.ownerDocument);
	    },
	    downloadPNG: function downloadPNG(name) {
	        if (_browser2["default"].ie) {
	            return false;
	        }
	        var paper = this;
	        var xml = this.getSVGXML();
	        var image = new Image();
	        image.onload = function () {
	            var canvas = document.createElement("canvas");
	            canvas.width = paper.svg.width();
	            canvas.height = paper.svg.height();
	            var ctx = canvas.getContext("2d");
	            ctx.drawImage(image, 0, 0);
	            var a = document.createElement('a');
	            a.href = canvas.toDataURL('image/png'); //将画布内的信息导出为png图片数据
	            alert(a.href);
	            a.download = name || document.title + '_t=' + new Date().getTime(); //设定下载名称
	            a.target = "_blank";
	            if (_browser2["default"].chrome) {
	                a.click();
	            } else {
	                window.open(a.href);
	            }
	        };
	        image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(xml)));
	        return image;
	    },
	    downloadSVG: function downloadSVG() {}
	};
	Paper.prototype.init.prototype = Paper.fn = Paper.prototype;
	Paper.extend = Paper.fn.extend = _jquery2["default"].extend;
	module.exports = Paper;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _animation = __webpack_require__(7);

	var _animation2 = _interopRequireDefault(_animation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_jquery2["default"].fn.transition = function (attr, during, ease, callback) {
	    if (arguments.length > 1) {
	        (0, _jquery2["default"])(this).each(function (index, dom) {
	            var option = {};
	            var from = {};
	            var defaultAttr = {
	                "stroke-opacity": 1,
	                "fill-opacity": 1
	            };
	            for (var key in attr) {
	                name = key.replace(/([A-Z])/g, '-$1').toLowerCase();
	                //todo color transform的过渡 delay
	                from[key] = parseFloat((0, _jquery2["default"])(dom).attr(name) || defaultAttr[name] || 0);
	            }
	            option.from = from;
	            option.to = attr;
	            option.target = dom;
	            option.ease = ease;
	            option.callback = callback;
	            option.during = during;
	            option.exefunc = function (r) {
	                for (var key in r) {
	                    name = key.replace(/([A-Z])/g, '-$1').toLowerCase();
	                    (0, _jquery2["default"])(this).attr(name, r[key]);
	                }
	            };
	            _animation2["default"].init(option);
	        });
	    } else {
	        (0, _jquery2["default"])(this).each(function (index, dom) {
	            var option = arguments[0];
	            if (typeof option == 'string') {
	                //支持暂停，取消动画，或出栈
	            } else if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object') {
	                option.target = dom;
	                _animation2["default"].init(dom, option);
	            }
	        });
	    }
	    return (0, _jquery2["default"])(this);
	};

	_jquery2["default"].fn.arrayCopy = function () {
	    if (arguments.length == 0) {
	        return (0, _jquery2["default"])(this);
	    }
	    var xcopy, ycopy, callback;
	    if (arguments.length == 1) {
	        xcopy = arguments[0];
	    }
	    if (arguments.length == 2) {
	        xcopy = arguments[0];
	        ycopy = 1;
	        callback = arguments[1];
	    }
	    if (arguments.length == 3) {
	        xcopy = arguments[0];
	        ycopy = arguments[1];
	        callback = arguments[2];
	    }
	    xcopy = parseInt(xcopy);
	    ycopy = parseInt(ycopy);
	    if (xcopy < 1 || ycopy < 1) {
	        return (0, _jquery2["default"])(this);
	    }
	    var me = (0, _jquery2["default"])(this);
	    var allNodes = [];
	    (0, _jquery2["default"])(this).each(function (index, dom) {
	        var parent = dom.parentNode;
	        var nodes = [];
	        for (var i = 0; i < xcopy; i++) {
	            for (var j = 0; j < ycopy; j++) {
	                if (i == 0 && j == 0) {
	                    if (typeof callback == 'function') {
	                        callback.call(dom, i, j);
	                    }
	                    nodes.push(dom);
	                } else {
	                    var clone = dom.cloneNode(true);
	                    if (typeof callback == 'function') {
	                        callback.call(clone, i, j);
	                    }
	                    nodes.push(clone);
	                    parent && parent.appendChild(clone);
	                }
	            }
	        }
	        allNodes = allNodes.concat(nodes);
	    });
	    return this.pushStack(allNodes);
	};

	_jquery2["default"].fn.rotate = function (angle, cx, cy) {
	    cx = cx || 0;
	    cy = cy || 0;
	    (0, _jquery2["default"])(this).each(function (index, dom) {
	        (0, _jquery2["default"])(dom).attr("transform", "rotate(" + angle + ',' + cx + ',' + cy + ')');
	    });
	    return (0, _jquery2["default"])(this);
	};
	_jquery2["default"].fn.stroke = function (color, width, opacity) {
	    if (arguments.length == 0) {
	        return this;
	    }
	    (0, _jquery2["default"])(this).attr("stroke", color);
	    if (typeof width != "undefined") {
	        (0, _jquery2["default"])(this).attr("stroke-width", width);
	    }
	    if (typeof opacity != "undefined") {
	        (0, _jquery2["default"])(this).attr("stroke-opacity", "opacity");
	    }
	    return this;
	};
	_jquery2["default"].fn.fill = function (color, opacity, rule) {
	    if (arguments.length == 0) {
	        return this;
	    }
	    this.attr("fill", color);
	    if (typeof opacity != 'undefined') {
	        this.attr('fill-opacity', opacity);
	    }
	    if (typeof rule != 'undefined') {
	        this.attr("fill-rule", rule);
	    }
	    return this;
	};
	_jquery2["default"].fn.dash = function (dashAarray, offset) {
	    if (arguments.length == 0) {
	        return this;
	    }
	    this.attr("stroke-dasharray", dashAarray);
	    this.attr("stroke-dashoffset", offset);
	    return this;
	};
	_jquery2["default"].fn.animateMotion = function (option) {
	    option = option || {};
	    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
	    (0, _jquery2["default"])(this).each(function (index, dom) {
	        var el = document.createElementNS(SVG_NAMESPACE, "animateMotion");
	        for (var attr in option) {
	            el.setAttribute(attr, option[attr]);
	        }
	        (0, _jquery2["default"])(dom).append(el);
	    });
	    return this;
	};
	_jquery2["default"].fn.animateTransform = function (option) {
	    option = option || {};
	    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
	    (0, _jquery2["default"])(this).each(function (index, dom) {
	        var el = document.createElementNS(SVG_NAMESPACE, "animateTransform");
	        for (var attr in option) {
	            el.setAttribute(attr, option[attr]);
	        }
	        (0, _jquery2["default"])(dom).append(el);
	    });
	    return this;
	};

	_jquery2["default"].fn.animateAttribute = function () {
	    option = option || {};
	    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
	    (0, _jquery2["default"])(this).each(function (index, dom) {
	        var el = document.createElementNS(SVG_NAMESPACE, "animate");
	        for (var attr in option) {
	            el.setAttribute(attr, option[attr]);
	        }
	        (0, _jquery2["default"])(dom).append(el);
	    });
	    return this;
	};
	_jquery2["default"].fn.upperZIndex = function (z) {
	    if (this.length > 1 || this.length == 0 || z == 0) {
	        return this;
	    }
	    var me = this;
	    var copy = me.get(0).cloneNode(true);
	    var preSibling = [];
	    var nextSibing = [];
	    var cur_prev, cur_next;
	    cur_prev = cur_next = me.get(0);
	    while (cur_prev.previousSibling) {
	        preSibling.push(cur_prev.previousSibling);
	        cur_prev = cur_prev.previousSibling;
	    }
	    while (cur_next.nextSibling) {
	        nextSibing.push(cur_next.nextSibling);
	        cur_next = cur_next.nextSibling;
	    }
	    if (z > 0 && nextSibling.length == 0) {
	        return this;
	    }
	    if (z < 0 && preSibling.length == 0) {
	        return this;
	    }
	    me.remove();
	    if (z > 0) {
	        for (var i = 0; i < nextSibing.length; i++) {
	            if (z == i) {
	                (0, _jquery2["default"])(nextSibing[i]).after(copy);
	                break;
	            } else {
	                if (z >= nextSibing.length && i == nextSibing.length - 1) {
	                    (0, _jquery2["default"])(nextSibing[i]).after(copy);
	                }
	            }
	        }
	    } else {
	        var z = Math.abs(z);
	        for (var i = preSibling.length - 1; i >= 0; i--) {
	            if (z == i) {
	                (0, _jquery2["default"])(preSibling[i]).before(copy);
	                break;
	            } else {
	                if (z >= preSibling.length && i == preSibling.length - 1) {
	                    (0, _jquery2["default"])(preSibling[i]).before(copy);
	                }
	            }
	        }
	    }
	    return (0, _jquery2["default"])(copy);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _easing = __webpack_require__(9);

	var _easing2 = _interopRequireDefault(_easing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Animation = {
	    ease: _easing2["default"],
	    isTick: false,
	    animations: [],
	    timer_id: null,
	    startTick: function startTick() {
	        if (this.isTick) {
	            return;
	        }
	        this.isTick = true;
	        this.timer_id = window.requestAnimationFrame(this.tick.bind(this));
	    },
	    isAnimating: function isAnimating(target) {
	        return this.animations.some(function (value) {
	            return value.queue.length > 0;
	        });
	    },

	    stopAnimation: function stopAnimation() {
	        if (arguments.length === 0) {
	            this.animations = [];
	            if (this.isTick) {
	                window.cancelAnimationFrame(this.timer_id);
	            }
	            this.isTick = false;
	            this.timer_id = null;
	            return;
	        }
	        var target = arguments[0];
	        var animations = this.animations;
	        for (var i = 0; i < animations.length; i++) {
	            if (animations[i].target === target) {
	                animations.splice(i, 1);
	                return;
	            }
	        }
	    },
	    getEaseByName: function getEaseByName(name) {
	        var reg = /^([a-z])/g;
	        var isLittle = reg.test(name);
	        var name2 = name;
	        var ease = this.ease;
	        if (isLittle) {
	            name2 = name.match(reg)[0].toUpperCase() + name.slice(1);
	        }
	        if (ease[name] || ease[name2]) {
	            return ease[name] || ease[name2];
	        } else {
	            switch (name.toLowerCase()) {
	                case 'easein':
	                    name = 'CubicIn';
	                    break;
	                case 'easeout':
	                    name = 'CubicOut';
	                    break;
	                case 'elastic':
	                    name = 'ElasticOut';
	                    break;
	                case 'easeinout':
	                    name = "CubicInOut";
	                    break;
	                default:
	                    name = 'Linear';
	            }
	        }
	        return ease[name];
	    },

	    tick: function tick() {
	        var animations = this.animations,
	            timestamp = new Date().getTime();
	        var me,
	            target,
	            queue,
	            callback,
	            during,
	            delay,
	            exefunc,
	            ease,
	            from,
	            to,
	            value,
	            has_blank = false;
	        for (var i = 0; i < animations.length; i++) {
	            me = animations[i];
	            target = me.target;
	            queue = me.queue[0];
	            callback = queue.callback;
	            exefunc = queue.exefunc;
	            during = queue.during;
	            ease = queue.ease;
	            delay = queue.delay || 0;
	            if (typeof ease !== "function") {
	                ease = this.getEaseByName(ease || "linear");
	            }
	            from = queue.from;
	            to = queue.to;
	            if (!queue.startTime) {
	                queue.startTime = timestamp;
	            }
	            var dt = timestamp - queue.startTime - delay;
	            if (dt >= queue.during) {
	                exefunc.call(target, to, queue);
	                if (typeof callback == "function") {
	                    callback.call(target);
	                }
	                me.queue.shift();
	                if (me.queue.length == 0) {
	                    has_blank = true;
	                }
	            } else {
	                if (dt < 0) {
	                    continue;
	                }
	                if (_jquery2["default"].isArray(from)) {
	                    value = from.map(function (val, key) {
	                        var change = to[key] - val;
	                        return from + ease(dt / during) * change;
	                    });
	                } else if (_jquery2["default"].isPlainObject(from)) {
	                    value = {};
	                    for (var key in from) {
	                        var change = to[key] - from[key];
	                        value[key] = from[key] + ease(dt / during) * change;
	                    }
	                } else {
	                    var change = to - from;
	                    value = from + ease(dt / during) * change;
	                }
	                exefunc.call(target, value, queue);
	            }
	        }
	        if (has_blank) {
	            animations = animations.filter(function (val) {
	                return val.queue.length > 0;
	            });
	        }
	        this.animations = animations;
	        if (animations.length > 0) {
	            this.timer_id = window.requestAnimationFrame(this.tick.bind(this));
	        } else {
	            this.stopAnimation();
	        }
	    },
	    init: function init(option) {
	        var animations = this.animations;
	        var index = -1;
	        var target = option.target || "default_animation";
	        var isInside = animations.some(function (val, key) {
	            if (val.target === target) {
	                index = key;
	            }
	            return val.target === target;
	        });
	        if (isInside) {
	            var cur_obj = animations[index];
	            cur_obj.queue.push(option);
	        } else {
	            animations.push({
	                target: target,
	                queue: [option]
	            });
	        }
	        this.startTick();
	    }
	};
	window.Animation = Animation;
	module.exports = Animation;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	;
	(function () {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
	        window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function (callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	            var id = window.setTimeout(function () {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }
	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function (id) {
	            clearTimeout(id);
	        };
	    }
	})();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    /**
	     * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
	     * @see http://sole.github.io/tween.js/examples/03_graphs.html
	     * @exports zrender/animation/easing
	     */
	    var easing = {
	        // 线性
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        Linear: function Linear(k) {
	            return k;
	        },

	        // 二次方的缓动（t^2）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuadraticIn: function QuadraticIn(k) {
	            return k * k;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuadraticOut: function QuadraticOut(k) {
	            return k * (2 - k);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuadraticInOut: function QuadraticInOut(k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k;
	            }
	            return -0.5 * (--k * (k - 2) - 1);
	        },

	        // 三次方的缓动（t^3）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        CubicIn: function CubicIn(k) {
	            return k * k * k;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        CubicOut: function CubicOut(k) {
	            return --k * k * k + 1;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        CubicInOut: function CubicInOut(k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k * k;
	            }
	            return 0.5 * ((k -= 2) * k * k + 2);
	        },

	        // 四次方的缓动（t^4）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuarticIn: function QuarticIn(k) {
	            return k * k * k * k;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuarticOut: function QuarticOut(k) {
	            return 1 - --k * k * k * k;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuarticInOut: function QuarticInOut(k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k * k * k;
	            }
	            return -0.5 * ((k -= 2) * k * k * k - 2);
	        },

	        // 五次方的缓动（t^5）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuinticIn: function QuinticIn(k) {
	            return k * k * k * k * k;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuinticOut: function QuinticOut(k) {
	            return --k * k * k * k * k + 1;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        QuinticInOut: function QuinticInOut(k) {
	            if ((k *= 2) < 1) {
	                return 0.5 * k * k * k * k * k;
	            }
	            return 0.5 * ((k -= 2) * k * k * k * k + 2);
	        },

	        // 正弦曲线的缓动（sin(t)）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        SinusoidalIn: function SinusoidalIn(k) {
	            return 1 - Math.cos(k * Math.PI / 2);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        SinusoidalOut: function SinusoidalOut(k) {
	            return Math.sin(k * Math.PI / 2);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        SinusoidalInOut: function SinusoidalInOut(k) {
	            return 0.5 * (1 - Math.cos(Math.PI * k));
	        },

	        // 指数曲线的缓动（2^t）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        ExponentialIn: function ExponentialIn(k) {
	            return k === 0 ? 0 : Math.pow(1024, k - 1);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        ExponentialOut: function ExponentialOut(k) {
	            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        ExponentialInOut: function ExponentialInOut(k) {
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if ((k *= 2) < 1) {
	                return 0.5 * Math.pow(1024, k - 1);
	            }
	            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	        },

	        // 圆形曲线的缓动（sqrt(1-t^2)）
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        CircularIn: function CircularIn(k) {
	            return 1 - Math.sqrt(1 - k * k);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        CircularOut: function CircularOut(k) {
	            return Math.sqrt(1 - --k * k);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        CircularInOut: function CircularInOut(k) {
	            if ((k *= 2) < 1) {
	                return -0.5 * (Math.sqrt(1 - k * k) - 1);
	            }
	            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	        },

	        // 创建类似于弹簧在停止前来回振荡的动画
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        ElasticIn: function ElasticIn(k) {
	            var s;
	            var a = 0.1;
	            var p = 0.4;
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if (!a || a < 1) {
	                a = 1;s = p / 4;
	            } else {
	                s = p * Math.asin(1 / a) / (2 * Math.PI);
	            }
	            return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        ElasticOut: function ElasticOut(k) {
	            var s;
	            var a = 0.1;
	            var p = 0.4;
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if (!a || a < 1) {
	                a = 1;s = p / 4;
	            } else {
	                s = p * Math.asin(1 / a) / (2 * Math.PI);
	            }
	            return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        ElasticInOut: function ElasticInOut(k) {
	            var s;
	            var a = 0.1;
	            var p = 0.4;
	            if (k === 0) {
	                return 0;
	            }
	            if (k === 1) {
	                return 1;
	            }
	            if (!a || a < 1) {
	                a = 1;s = p / 4;
	            } else {
	                s = p * Math.asin(1 / a) / (2 * Math.PI);
	            }
	            if ((k *= 2) < 1) {
	                return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	            }
	            return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	        },

	        // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        BackIn: function BackIn(k) {
	            var s = 1.70158;
	            return k * k * ((s + 1) * k - s);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        BackOut: function BackOut(k) {
	            var s = 1.70158;
	            return --k * k * ((s + 1) * k + s) + 1;
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        BackInOut: function BackInOut(k) {
	            var s = 1.70158 * 1.525;
	            if ((k *= 2) < 1) {
	                return 0.5 * (k * k * ((s + 1) * k - s));
	            }
	            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	        },

	        // 创建弹跳效果
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        BounceIn: function BounceIn(k) {
	            return 1 - easing.BounceOut(1 - k);
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        BounceOut: function BounceOut(k) {
	            if (k < 1 / 2.75) {
	                return 7.5625 * k * k;
	            } else if (k < 2 / 2.75) {
	                return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	            } else if (k < 2.5 / 2.75) {
	                return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	            } else {
	                return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	            }
	        },
	        /**
	         * @param {number} k
	         * @return {number}
	         */
	        BounceInOut: function BounceInOut(k) {
	            if (k < 0.5) {
	                return easing.BounceIn(k * 2) * 0.5;
	            }
	            return easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;
	        }
	    };

	    return easing;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    svg: "http://www.w3.org/2000/svg",
	    xlink: "http://www.w3.org/1999/xlink",
	    html: "http://www.w3.org/1999/xhtml"
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else this[name] = definition();
	}('bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */

	  var t = true;

	  function detect(ua) {

	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return match && match.length > 1 && match[1] || '';
	    }

	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return match && match.length > 1 && match[2] || '';
	    }

	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
	        likeAndroid = /like android/i.test(ua),
	        android = !likeAndroid && /android/i.test(ua),
	        chromeos = /CrOS/.test(ua),
	        silk = /silk/i.test(ua),
	        sailfish = /sailfish/i.test(ua),
	        tizen = /tizen/i.test(ua),
	        webos = /(web|hpw)os/i.test(ua),
	        windowsphone = /windows phone/i.test(ua),
	        windows = !windowsphone && /windows/i.test(ua),
	        mac = !iosdevice && !silk && /macintosh/i.test(ua),
	        linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
	        edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
	        versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
	        tablet = /tablet/i.test(ua),
	        mobile = !tablet && /[^-]mobi/i.test(ua),
	        result;

	    if (/opera|opr/i.test(ua)) {
	      result = {
	        name: 'Opera',
	        opera: t,
	        version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
	      };
	    } else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser',
	        yandexbrowser: t,
	        version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      };
	    } else if (windowsphone) {
	      result = {
	        name: 'Windows Phone',
	        windowsphone: t
	      };
	      if (edgeVersion) {
	        result.msedge = t;
	        result.version = edgeVersion;
	      } else {
	        result.msie = t;
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
	      }
	    } else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer',
	        msie: t,
	        version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      };
	    } else if (chromeos) {
	      result = {
	        name: 'Chrome',
	        chromeos: t,
	        chromeBook: t,
	        chrome: t,
	        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge',
	        msedge: t,
	        version: edgeVersion
	      };
	    } else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome',
	        chrome: t,
	        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    } else if (iosdevice) {
	      result = {
	        name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      };
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    } else if (sailfish) {
	      result = {
	        name: 'Sailfish',
	        sailfish: t,
	        version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey',
	        seamonkey: t,
	        version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/firefox|iceweasel/i.test(ua)) {
	      result = {
	        name: 'Firefox',
	        firefox: t,
	        version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
	      };
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t;
	      }
	    } else if (silk) {
	      result = {
	        name: 'Amazon Silk',
	        silk: t,
	        version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      };
	    } else if (android) {
	      result = {
	        name: 'Android',
	        version: versionIdentifier
	      };
	    } else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS',
	        phantom: t,
	        version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry',
	        blackberry: t,
	        version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      };
	    } else if (webos) {
	      result = {
	        name: 'WebOS',
	        webos: t,
	        version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t);
	    } else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada',
	        bada: t,
	        version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    } else if (tizen) {
	      result = {
	        name: 'Tizen',
	        tizen: t,
	        version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    } else if (/safari/i.test(ua)) {
	      result = {
	        name: 'Safari',
	        safari: t,
	        version: versionIdentifier
	      };
	    } else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	      };
	    }

	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      result.name = result.name || "Webkit";
	      result.webkit = t;
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko";
	      result.gecko = t;
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
	    }

	    // set OS flags for platforms that have multiple browsers
	    if (!result.msedge && (android || result.silk)) {
	      result.android = t;
	    } else if (iosdevice) {
	      result[iosdevice] = t;
	      result.ios = t;
	    } else if (windows) {
	      result.windows = t;
	    } else if (mac) {
	      result.mac = t;
	    } else if (linux) {
	      result.linux = t;
	    }

	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }

	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (tablet || iosdevice == 'ipad' || android && (osMajorVersion == 3 || osMajorVersion == 4 && !mobile) || result.silk) {
	      result.tablet = t;
	    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
	      result.mobile = t;
	    }

	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.chrome && result.version >= 20 || result.firefox && result.version >= 20.0 || result.safari && result.version >= 6 || result.opera && result.version >= 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1) {
	      result.a = t;
	    } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20.0 || result.safari && result.version < 6 || result.opera && result.version < 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] < 6) {
	      result.c = t;
	    } else result.x = t;

	    return result;
	  }

	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');

	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem === 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;

	  return bowser;
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _paper = __webpack_require__(5);

	var _paper2 = _interopRequireDefault(_paper);

	var _point = __webpack_require__(4);

	var _point2 = _interopRequireDefault(_point);

	var _path2 = __webpack_require__(3);

	var _path3 = _interopRequireDefault(_path2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_paper2["default"].fn.extend({
	    viewBox: function viewBox(x, y, width, height) {
	        var a = [x, y, width, height];
	        this.svg.attr("viewBox", a.join(" "));
	        return this;
	    },
	    line: function line(x1, y1, x2, y2) {
	        return this.append("line", {
	            x1: x1,
	            y1: y1,
	            x2: x2,
	            y2: y2
	        });
	    },
	    angleLine: function angleLine(x, y, angle, len) {
	        var x2 = x + len * Math.cos(angle * Math.PI / 180);
	        var y2 = y + len * Math.sin(angle * Math.PI / 180);
	        return this.append("line", {
	            x1: x,
	            y1: y,
	            x2: x2,
	            y2: y2
	        });
	    },
	    circle: function circle(cx, cy, r) {
	        return this.append("circle", {
	            cx: cx,
	            cy: cy,
	            r: r
	        });
	    },
	    circumCircle: function circumCircle(points) {},
	    ellipse: function ellipse(cx, cy, rx, ry) {
	        return this.append("ellipse", {
	            cx: cx,
	            cy: cy,
	            rx: rx,
	            ry: ry
	        });
	    },
	    textPath: function textPath(dom, id) {
	        var elem = this.createSVGElement("textPath");
	        id && elem.attr("xlink:href", "#" + id);
	        dom.append(elem);
	        return elem;
	    },
	    text: function text(content, x, y, option) {
	        option = _paper2["default"].extend({
	            fontSize: 14,
	            align: "left",
	            baseline: "top",
	            rotate: 0,
	            fontWeight: "normal"
	        }, option);
	        var fontSize = option.fontSize,
	            align = option.align,
	            baseline = option.baseline,
	            rotate = option.rotate,
	            fontWeight = option.fontWeight;

	        var elem = this.append("text");
	        elem.attr('x', x);
	        elem.attr("font-size", fontSize);
	        elem.attr('rotate', rotate);
	        elem.attr("font-weight", fontWeight);
	        if (option.color) {
	            elem.attr("fill", option.color);
	        }
	        if (align == "left" || align == "start") {
	            elem.attr("text-anchor", 'start');
	        } else if (align == "center" || align == "middle") {
	            elem.attr("text-anchor", 'middle');
	        } else {
	            elem.attr("text-anchor", 'end');
	        }
	        var scale = 1.6,
	            add = 10;
	        if (baseline == "top") {
	            elem.attr("y", y + fontSize * scale / 2 + add);
	        } else if (baseline == "middle") {
	            elem.attr('y', y + fontSize / 2 * scale + add);
	        } else {
	            elem.attr('y', y + add);
	        }
	        return elem.text(content);
	    },
	    rect: function rect(x, y, width, height, rx, ry) {
	        if (rx >= 0 && !(typeof ry === 'undefined' ? 'undefined' : _typeof(ry)) == 'undefined') {
	            ry = rx;
	        }
	        return this.append("rect", {
	            x: x,
	            y: y,
	            width: width || 0,
	            height: height || 0,
	            rx: rx || 0,
	            ry: ry || 0
	        });
	    },
	    diagonalRect: function diagonalRect(x1, y1, x2, y2, rx, ry) {
	        var minx = Math.min(x1, x2);
	        var miny = Math.min(y1, y2);
	        var maxx = Math.max(x1, x2);
	        var maxy = Math.max(y1, y2);
	        var width = maxx - minx;
	        var height = maxy - miny;
	        if (rx >= 0 && typeof ry == 'undefined') {
	            ry = rx;
	        }
	        return this.append("rect", {
	            x: minx,
	            y: miny,
	            width: width,
	            height: height,
	            rx: rx || 0,
	            ry: ry || 0
	        });
	    },
	    path: function path(_path) {
	        return this.append("path", { d: _path });
	    },
	    polygon: function polygon(points) {
	        if (points instanceof Array) {
	            var p = points.map(function (val) {
	                return val.x + "," + val.y;
	            });
	            return this.append("polygon").attr("points", p.join(" "));
	        } else {
	            return this.append("polygon");
	        }
	    },
	    polyline: function polyline(points) {
	        var p = points.map(function (val) {
	            return val.x + "," + val.y;
	        });
	        return this.append("polyline").attr("points", p.join(" "));
	    },
	    spline: function spline(points) {
	        var path = new _path3["default"]().SplineTo(points);
	        return this.append("path").attr('d', path.toString());
	    },
	    sector: function sector(cx, cy, startAngle, endAngle, radius, innerRadius) {
	        return this.addShape("sector", cx, cy, {
	            startAngle: startAngle,
	            endAngle: endAngle,
	            radius: radius,
	            innerRadius: innerRadius
	        });
	    },
	    image: function image(x, y, width, height, url) {
	        return this.append("image", {
	            "xlink:href": url,
	            "src": url,
	            "x": x,
	            "y": y,
	            "width": width,
	            "height": height
	        });
	    },
	    diagonalImage: function diagonalImage(x1, y1, x2, y2, url) {
	        var minx = Math.min(x1, x2);
	        var miny = Math.min(y1, y2);
	        var maxx = Math.max(x1, x2);
	        var maxy = Math.max(y1, y2);
	        var width = maxx - minx;
	        var height = maxy - miny;
	        return this.append("image", {
	            "xlink:href": url,
	            "src": url,
	            "x": minx,
	            "y": miny,
	            "width": width,
	            "height": height
	        });
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _paper = __webpack_require__(5);

	var _paper2 = _interopRequireDefault(_paper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_paper2["default"].extend({
		__DEFAULT_LAYER_CONFIG__: {
			"stroke": "#000",
			"stroke-width": 1,
			"fill": "#ddd",
			"stroke-linejoin": "round",
			"stroke-linecap": "square"
		}
	});
	_paper2["default"].fn.extend({
		cureentLayer: {},
		layers: {},
		initDefaultLayer: function initDefaultLayer() {
			return this.addLayer("default_layer", _paper2["default"].__DEFAULT_LAYER_CONFIG__);
		},
		addLayer: function addLayer(id, config) {
			config.id = id;
			var g = this.createSVGElement("g", config).addClass("cad-layer");
			this.layers[id] = config;
			this.svg.append(g);
			this.currentLayer = { id: id, el: g };
			return this;
		},
		switchToDefaultLayer: function switchToDefaultLayer() {
			return this.switchLayer("default_layer");
		},
		switchLayer: function switchLayer(id) {
			if (!this.layers[id]) {
				return this;
			}
			this.cureentLayer = {
				id: id,
				el: this.svg.find("#" + id)
			};
			return this;
		},
		removeLayer: function removeLayer(id) {
			if (id == "default_layer") {
				return this;
			}
			delete this.layers[id];
			this.svg.find("#" + id).remove();
			return this.switchToDefaultLayer();
		},
		cleanLayer: function cleanLayer(id) {
			id = id || this.currentLayer.id;
			this.svg.find("#" + id).find("*").remove();
			return this;
		},
		configLayer: function configLayer() {
			var id, option;
			if (arguments.length == 1 && _typeof(arguments[0]) == 'object') {
				id = this.currentLayer.id;
				option = arguments[0];
			} else {
				id = arguments[0];
				option = arguments[1];
			}
			option = option || {};
			id = id || "default_layer";
			var g = this.svg.find("#" + id);
			var config = this.layers[id];
			var new_config = _paper2["default"].extend(config, option);
			this.layers[id] = new_config;
			if ((typeof option === "undefined" ? "undefined" : _typeof(option)) == 'object') {
				for (var key in new_config) {
					g.attr(key, new_config[key]);
				}
			}
			return this;
		}
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _point = __webpack_require__(4);

	var _point2 = _interopRequireDefault(_point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_path2["default"].fn.extend({
	    getAbsolutePoints: function getAbsolutePoints() {
	        var actions = this.pathStack;
	        var x = 0,
	            y = 0;
	        var points = [];
	        for (var i = 0; i < actions.length; i++) {
	            var action = actions[i];
	            var name = action.action;
	            var baseName = name.toLowerCase();
	            var params = action.params;
	            if (baseName !== 'z') {
	                var lastParam = params[params.length - 1];
	                var point = String(lastParam).split(',').map(function (val) {
	                    return parseFloat(val);
	                });
	                var x_new, y_new;
	                if (baseName == 'v') {
	                    x_new = 0;
	                    y_new = point[0];
	                } else if (baseName == 'h') {
	                    x_new = point[0];
	                    y_new = 0;
	                } else {
	                    x_new = point[0];
	                    y_new = point[1];
	                }
	                if (/[A-Z]/g.test(name)) {
	                    x = x_new;
	                    y = y_new;
	                } else {
	                    x += x_new;
	                    y += y_new;
	                }
	                points.push({ x: x, y: y });
	            }
	        }
	        return points;
	    },
	    getCurPoint: function getCurPoint() {
	        var actions = this.pathStack;
	        var x = 0,
	            y = 0;
	        var points = this.getAbsolutePoints();
	        if (points.length > 0) {
	            var p = points[points.length - 1];
	            x = p.x;
	            y = p.y;
	        }
	        return { x: x, y: y };
	    },
	    angleLineTo: function angleLineTo(angle, len) {
	        len = Math.abs(len);
	        var dx = len * Math.cos(angle * Math.PI / 180);
	        var dy = len * Math.sin(angle * Math.PI / 180);
	        return this.lineTo(dx, dy);
	    },
	    angleMoveTo: function angleMoveTo(angle, len) {
	        var dx = len * Math.cos(angle * Math.PI / 180);
	        var dy = len * Math.sin(angle * Math.PI / 180);
	        return this.moveTo(dx, dy);
	    },
	    angleArcTo: function angleArcTo(angle, cx, cy, r) {
	        if (angle == 0) {
	            return this;
	        }
	        var angle1 = angle % 360;
	        if (arguments.length < 4) {
	            console.log("path error: more arguments needed!");
	        }
	        //todo 根据angle判断isClockWise
	        var isClockWise = 0;
	        if (angle > 0) {
	            isClockWise = 1;
	        }
	        var point = this.getCurPoint();
	        var x = point.x;
	        var y = point.y;
	        var endPoint = (0, _point2["default"])(x, y).rotate(angle, cx, cy);
	        var flagClock = isClockWise ? 1 : 0;
	        var isLargeArc = Math.abs(angle) >= 180 ? 1 : 0;
	        if (angle >= 360) {
	            this.angleArcTo(359.9, cx, cy, r).closePath().MoveTo(x, y);
	            endPoint = (0, _point2["default"])(x, y).rotate(angle1, cx, cy);
	            this.ArcTo(r, r, 0, Math.abs(angle1) >= 180 ? 1 : 0, flagClock, endPoint.x, endPoint.y);
	            return this;
	        } else {
	            return this.ArcTo(r, r, 0, isLargeArc, flagClock, endPoint.x, endPoint.y);
	        }
	    },
	    clockWiseArcTo: function clockWiseArcTo(cx, cy, endx, endy, r) {},
	    antiClockArcTo: function antiClockArcTo(cx, cy, endx, endy, r) {},
	    splineTo: function splineTo(points) {},
	    SplineTo: function SplineTo(points) {
	        var data = [];
	        var p0 = points[0];
	        var p1 = points[1];
	        var pnPrev = points[points.length - 2];
	        var pn = points[points.length - 1];
	        var angle = (0, _point2["default"])(p0).getAngleTo(p1.x, p1.y);
	        var m1 = (0, _point2["default"])(p0).angleTo(angle, 1);
	        var angle2 = (0, _point2["default"])(pn).getAngleTo(pnPrev.x, pnPrev.y);
	        var mn = (0, _point2["default"])(pn).angleTo(angle, 1);
	        points.unshift({ x: m1.x, y: m1.y });
	        points.push({ x: mn.x, y: mn.y });
	        for (var i = 1; i < points.length - 2; i++) {
	            var p = points[i];
	            var p0 = points[i - 1];
	            var p1 = points[i + 1];
	            var p2 = points[i + 2];
	            var x = p.x,
	                y = p.y;
	            var param = {};
	            var x1, y1, x2, y2;
	            x1 = p.x + (p1.x - p0.x) / 4;
	            y1 = p.y + (p1.y - p0.y) / 4;
	            x2 = p1.x - (p2.x - p.x) / 4;
	            y2 = p1.y - (p2.y - p.y) / 4;
	            param = { x: x, y: y, x1: x1, y1: y1, x2: x2, y2: y2, endx: p1.x, endy: p1.y };
	            data.push(param);
	        }
	        this.MoveTo(points[1].x, points[1].y);
	        for (var i = 0; i < data.length; i++) {
	            var d = data[i];
	            this.C(d.x1, d.y1, d.x2, d.y2, d.endx, d.endy);
	        }
	        return this;
	    },
	    rectTo: function rectTo() {}
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	var _paper = __webpack_require__(5);

	var _paper2 = _interopRequireDefault(_paper);

	var _point = __webpack_require__(4);

	var _point2 = _interopRequireDefault(_point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_core2["default"].extend({
	    $shapes: {},
	    defineShape: function defineShape(name, func) {
	        this.$shapes[name] = func;
	    }
	});
	_paper2["default"].fn.addShape = function (name, x, y, options) {
	    var shape = _core2["default"].$shapes[name];
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (!shape) {
	        console.log("error:　undefined shape");
	        return;
	    }
	    return shape.apply(this, args);
	};
	_core2["default"].defineShape("regPolgon", function (cx, cy, option) {
	    var paper = this;
	    var num = option.num;
	    if (num < 2) {
	        return;
	    }
	    var rotate = option.rotate;
	    var angle = Math.PI * 2 / num;
	    var size = option.size;
	    var sizeof = option.sizeof || 'outerRadius';
	    var r;
	    if (sizeof == "innerRadius") {
	        r = size / Math.cos(angle / 2);
	    } else if (sizeof == 'side') {
	        r = size / 2 / Math.sin(angle / 2);
	    } else {
	        r = size;
	    }
	    var points = [];
	    var startAngle = Math.PI / 2 - angle / 2;
	    for (var i = 0; i < num; i++) {
	        var x1 = cx + r * Math.cos(startAngle + i * angle);
	        var y1 = cy + r * Math.sin(startAngle + i * angle);
	        points.push(x1 + ',' + y1);
	    }
	    return paper.append("polygon").attr("points", points.join(' '));
	});
	_core2["default"].defineShape("gear", function (cx, cy, option) {
	    var paper = this;
	    var path = new _core2["default"].Path();
	    var r1 = option.r1,
	        r2 = option.r2,
	        h = Math.abs(r1 - r2),
	        r3 = option.r3;
	    var teeth = option.teeth,
	        angle = 360 / teeth;
	    for (var i = 0; i < teeth; i++) {
	        var midPoint = (0, _point2["default"])(cx, cy).angleTo(angle * i, r1);
	        var leftPoint = midPoint.clone().rotate(-1 * angle / 4, cx, cy);
	        var rightPoint = midPoint.clone().rotate(angle / 4, cx, cy);
	        var gap = leftPoint.getLenTo(rightPoint);
	        var topMidPoint = (0, _point2["default"])(cx, cy).angleTo(angle * i, r2);
	        var topLeftPoint = topMidPoint.clone().angleTo(angle * i - 90, gap / 2);
	        var topRightPoint = topMidPoint.clone().angleTo(angle * i + 90, gap / 2);
	        if (i == 0) {
	            path.MoveTo(leftPoint.x, leftPoint.y);
	        }
	        path.LineTo(topLeftPoint.x, topLeftPoint.y).LineTo(topRightPoint.x, topRightPoint.y).LineTo(rightPoint.x, rightPoint.y).angleArcTo(angle / 2, cx, cy, r1);
	    }
	    return paper.append("path").attr('d', path.toString());
	});
	_core2["default"].defineShape("heart", function (cx, cy, option) {
	    var paper = this;
	    option = _core2["default"].extend({
	        size: 100
	    }, option);
	    var size = option.size;
	    var points = [];
	    var num = size;
	    for (var i = 0; i < num; i++) {
	        var angle = 360 / num * i;
	        var point = _core2["default"].interpolate("heart", angle * Math.PI / 180, option.size);
	        point.x = cx + point.x * option.size / 32.69;
	        point.y = cy + point.y * option.size / 32.69;
	        points.push(point);
	    }
	    return paper.spline(points);
	});
	_core2["default"].defineShape("sinCurve", function (cx, cy, option) {
	    var paper = this;
	    option = _core2["default"].extend(option, { height: 20, interval: 100, width: 500 });
	    var path = new _core2["default"].Path();
	    var height = option.height;
	    var width = option.width;
	    var interval = option.interval;
	    var ret = _core2["default"].rangeInterpolate(Math.sin, 0, Math.PI * 2 * width / interval, width / 5);
	    var x = ret[0],
	        y = ret[1];
	    var points = x.map(function (val, index) {
	        return {
	            x: cx + val * interval / Math.PI / 2,
	            y: cy + y[index] * height
	        };
	    });
	    return paper.spline(points);
	});
	_core2["default"].defineShape("bendLine", function (cx, cy, option) {
	    var paper = this;
	    var points = [];
	    var len = option.len;
	    var h = option.h;
	    points.push({ x: cx - len / 2, y: cy });
	    points.push({ x: cx, y: cy + h });
	    points.push({ x: cx + len / 2, y: cy });
	    return paper.spline(points);
	});
	_core2["default"].defineShape("markLine", function (x1, y1, x2, y2, option) {
	    //这个宜作为箭头
	    option = _core2["default"].extend({ width: 10, height: 18 }, option);
	    var path = new _core2["default"].Path();
	    var width = option.width;
	    var height = option.height;
	    var angle = (0, _point2["default"])(x1, y1).getAngleTo(x2, y2);
	    path.MoveTo(x1, y1).LineTo(x2, y2).angleMoveTo(angle - 180, height).angleMoveTo(angle + 90, width / 2).angleLineTo(angle - 90, width).LineTo(x2, y2).closePath();
	    return this.append("path").attr('d', path.toString());
	});
	_core2["default"].defineShape("sector", function (cx, cy, option) {
	    var path = new _core2["default"].Path(),
	        startAngle = option.startAngle,
	        endAngle = option.endAngle,
	        radius = option.radius,
	        innerRadius = option.innerRadius || 0;
	    if (innerRadius > radius) {
	        console.log("warning:outerRadius should be larger than innerRadius");
	    }
	    path.MoveTo(cx, cy).angleMoveTo(startAngle, innerRadius).angleLineTo(startAngle, radius - innerRadius).angleArcTo(endAngle - startAngle, cx, cy, radius).angleLineTo(endAngle + 180, radius - innerRadius).angleArcTo(startAngle - endAngle, cx, cy, innerRadius);
	    return this.append("path").attr("d", path.toString());
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	var _paper = __webpack_require__(5);

	var _paper2 = _interopRequireDefault(_paper);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_core2["default"].extend({
		$$defs: {},
		registDefs: function registDefs(name, def) {
			_core2["default"].$$defs[name] = def;
		}
	});
	_jquery2["default"].fn.useDefs = function (attr, name) {
		if (name && name != "none") {
			this.attr(attr, 'url(#' + name + ')');
		} else {
			this.removeAttr(attr);
		}
		return this;
	};
	_paper2["default"].fn.importDefs = function (name, option) {
		var me = this;
		if (typeof _core2["default"].$$defs[name] === "function") {
			var def = _core2["default"].$$defs[name];
			def.call(me, me, option);
		}
		return this;
	};

	//滤镜
	_core2["default"].registDefs("blur", function (paper, option) {
		var $defs = paper.select("defs");
		var id = "blur";
		var stdDeviation = option;
		if (typeof option == "undefined") {
			stdDeviation = 10;
		}
		var filter = paper.createSVGElement("filter").attr("id", id);
		var elem = paper.createSVGElement("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", stdDeviation);
		filter.append(elem);
		$defs.append(filter);
		return filter;
	});
	_core2["default"].registDefs("shadow", function (paper, option) {
		var $defs = paper.select("defs");
		option = _core2["default"].extend(true, {
			id: "shadow",
			offsetX: 20,
			offsetY: 20,
			blur: 10
		}, option);
		var id = option.id;
		var offsetX = option.offsetX;
		var offsetY = option.offsetY;
		var blur = option.blur;
		var filter = paper.createSVGElement("filter").attr("id", option.id);
		var elemOffset = paper.createSVGElement("feOffset").attr("result", "offOut").attr("in", "SourceGraphic").attr("dx", offsetX).attr("dy", offsetY);
		var elemColorMartix = paper.createSVGElement("feColorMartrix").attr("result", "martrixOut").attr("in", "offOut").attr("type", "martrix").attr("values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0");
		var elemGaussianBlur = paper.createSVGElement("feGaussianBlur").attr("result", "blurOut").attr("in", "martrixOut").attr("stdDeviation", blur);
		var elemBlend = paper.createSVGElement("feBlend").attr("in", "SourceGraphic").attr("in2", "blurOut").attr("mode", "normal");
		filter.append(elemOffset);
		filter.append(elemColorMartix);
		filter.append(elemGaussianBlur);
		filter.append(elemBlend);
		$defs.append(filter);
		return filter;
	});

	_core2["default"].registDefs("linearGradient", function (paper, option) {
		var $defs = paper.select("defs");
		option = _core2["default"].extend(true, {
			id: "linearGradient",
			x1: "0%",
			x2: "0%",
			y1: "0%",
			y2: "100%",
			stops: [{}]
		}, option);
		var id = option.id,
		    x1 = option.x1,
		    x2 = option.x2,
		    y1 = option.y1,
		    y2 = option.y2,
		    stops = option.stops;
		var linearGradient = paper.createSVGElement("linearGradient ", { x1: x1, x2: x2, y1: y1, y2: y2, id: id });
		for (var i = 0; i < stops.length; i++) {
			var stop = stops[i];
			var offset = stop.offset,
			    color = stop.color,
			    opacity = 1;
			if (typeof stop.opacity != 'undefined') {
				opacity = stop.opacity;
			}
			var el = paper.createSVGElement("stop").attr("offset", offset).attr("stop-color", color).attr("stop-opacity", opacity);
			linearGradient.append(el);
		}
		$defs.append(linearGradient);
		return linearGradient;
	});

	_core2["default"].registDefs("radialGradient", function (paper, option) {
		var $defs = paper.select("defs");
		option = _core2["default"].extend(true, {
			id: "radialGradient",
			cx: "50%",
			cy: "50%",
			r: "50%",
			fx: "50%",
			fy: "50%",
			stops: [{}]
		}, option);
		var id = option.id,
		    cx = option.cx,
		    cy = option.cy,
		    r = option.r,
		    fx = option.fx,
		    fy = option.fy,
		    stops = option.stops;
		var radialGradient = paper.createSVGElement("radialGradient", { id: id, cx: cx, cy: cy, r: r, fx: fx, fy: fy });
		for (var i = 0; i < stops.length; i++) {
			var stop = stops[i];
			var offset = stop.offset,
			    color = stop.color,
			    opacity = 1;
			if (typeof stop.opacity != 'undefined') {
				opacity = stop.opacity;
			}
			var el = paper.createSVGElement("stop").attr("offset", offset).attr("stop-color", color).attr("stop-opacity", opacity);
			radialGradient.append(el);
		}
		$defs.append(radialGradient);
		return radialGradient;
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_core2["default"].extend({
	     rgb: function rgb(r, g, b) {
	          var arr = [r, g, b];
	          return "rgb(" + arr.join(",") + ")";
	     },
	     hsl: function hsl(h, s, l) {
	          var arr = [h, s + "%", l + "%"];
	          return "hsl(" + arr.join(",") + ")";
	     }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _core = __webpack_require__(1);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_core2["default"].extend({
		$$interpolates: {},
		definedInterpolate: function definedInterpolate(name, func) {
			this.$$interpolates[name] = func;
		},
		interpolate: function interpolate(name) {
			var args = [];
			for (var i = 1; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			if (typeof name == "function") {
				return name.apply(null, args);
			} else {
				if (typeof _core2["default"].$$interpolates[name] == 'function') {
					return _core2["default"].$$interpolates[name].apply(null, args);
				} else {
					return false;
				}
			}
		},
		arrayInterpolate: function arrayInterpolate() {
			var args = [];
			for (var i = 0; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			var ret = arr.map(function (val, index) {
				return _core2["default"].interpolate.apply(null, name, args);
			});
			return ret;
		},
		rangeInterpolate: function rangeInterpolate(name, from, to, num) {
			for (var i = 4; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			var gap = (to - from) / num;
			var arr = [];
			arr.push(from);
			for (var i = 0; i < num; i++) {
				arr.push(from + gap * i);
			}
			arr.push(to);
			var ret = arr.map(function (val, index) {
				return _core2["default"].interpolate.call(null, name, val);
			});
			return [arr, ret];
		}
	});
	_core2["default"].definedInterpolate("heart", function (t) {
		var ret = {
			x: 16 * Math.pow(Math.sin(t), 3),
			y: 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
		};
		return ret;
	});

/***/ }
/******/ ]);