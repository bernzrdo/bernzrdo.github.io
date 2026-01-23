/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/camera/main.ts":
/*!****************************!*\
  !*** ./src/camera/main.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.camera = exports.ZOOM_MAX = exports.ZOOM_MIN = exports.ZOOM_SENSITIVITY = void 0;
exports.toWorld = toWorld;
exports.toScreen = toScreen;
__webpack_require__(/*! ./trackpad */ "./src/camera/trackpad.ts");
__webpack_require__(/*! ./touch */ "./src/camera/touch.ts");
exports.ZOOM_SENSITIVITY = .01;
exports.ZOOM_MIN = 1;
exports.ZOOM_MAX = 100;
exports.camera = {
  x: 0,
  y: 0,
  zoom: 1
};
function toWorld(screen) {
  return {
    x: screen.x / exports.camera.zoom - exports.camera.x,
    y: screen.y / exports.camera.zoom - exports.camera.y
  };
}
function toScreen(world) {
  return {
    x: (world.x + exports.camera.x) * exports.camera.zoom,
    y: (world.y + exports.camera.y) * exports.camera.zoom
  };
}

/***/ }),

/***/ "./src/camera/touch.ts":
/*!*****************************!*\
  !*** ./src/camera/touch.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var const_1 = __webpack_require__(/*! ../const */ "./src/const.ts");
var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
var main_1 = __webpack_require__(/*! ./main */ "./src/camera/main.ts");
var lastTouches = {};
function updateTouch(touch) {
  lastTouches[touch.identifier] = {
    x: touch.clientX,
    y: touch.clientY
  };
}
function updateTouches(e) {
  var _iterator = _createForOfIteratorHelper(e.changedTouches),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var touch = _step.value;
      updateTouch(touch);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
addEventListener('touchstart', updateTouches);
addEventListener('touchmove', function (e) {
  e.preventDefault();
  var _e$touches = _slicedToArray(e.touches, 2),
    touchA = _e$touches[0],
    touchB = _e$touches[1];
  var lastTouchA = touchA && lastTouches[touchA.identifier];
  var lastTouchB = touchB && lastTouches[touchB.identifier];
  // move
  if (touchA) {
    var factor = 1 / main_1.camera.zoom * const_1.RESOLUTION_SCALE;
    main_1.camera.x += (touchA.clientX - lastTouchA.x) * factor;
    main_1.camera.y += (touchA.clientY - lastTouchA.y) * factor;
  }
  // zoom
  if (touchA && touchB) {
    // save touch pos before zoom
    var before = (0, main_1.toWorld)({
      x: touchA.clientX * const_1.RESOLUTION_SCALE,
      y: touchA.clientY * const_1.RESOLUTION_SCALE
    });
    // apply zoom
    var lastDist = (0, util_1.dist)(lastTouchA, lastTouchB);
    var currDist = (0, util_1.dist)({
      x: touchA.clientX,
      y: touchA.clientY
    }, {
      x: touchB.clientX,
      y: touchB.clientY
    });
    main_1.camera.zoom *= currDist / lastDist;
    main_1.camera.zoom = (0, util_1.clamp)(main_1.ZOOM_MIN, main_1.camera.zoom, main_1.ZOOM_MAX);
    // get touch pos after zoom
    var after = (0, main_1.toWorld)({
      x: touchA.clientX * const_1.RESOLUTION_SCALE,
      y: touchA.clientY * const_1.RESOLUTION_SCALE
    });
    // adjust camera
    main_1.camera.x += after.x - before.x;
    main_1.camera.y += after.y - before.y;
  }
  updateTouches(e);
}, {
  passive: false
});
function touchEnd(e) {
  var _iterator2 = _createForOfIteratorHelper(e.changedTouches),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var id = _step2.value.identifier;
      delete lastTouches[id];
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
addEventListener('touchcancel', touchEnd);
addEventListener('touchend', touchEnd);

/***/ }),

/***/ "./src/camera/trackpad.ts":
/*!********************************!*\
  !*** ./src/camera/trackpad.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var const_1 = __webpack_require__(/*! ../const */ "./src/const.ts");
var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
var main_1 = __webpack_require__(/*! ./main */ "./src/camera/main.ts");
var mouse = {
  x: innerWidth / 2 * const_1.RESOLUTION_SCALE,
  y: innerHeight / 2 * const_1.RESOLUTION_SCALE
};
addEventListener('mousemove', function (e) {
  mouse.x = e.pageX * const_1.RESOLUTION_SCALE;
  mouse.y = e.pageY * const_1.RESOLUTION_SCALE;
});
addEventListener('wheel', function (e) {
  e.preventDefault();
  // zoom
  if (e.ctrlKey || e.metaKey) {
    // save mouse pos before zoom
    var before = (0, main_1.toWorld)(mouse);
    // apply zoom
    var zoom = e.deltaY != 0 ? e.deltaY : e.deltaX;
    main_1.camera.zoom -= zoom * main_1.ZOOM_SENSITIVITY * main_1.camera.zoom;
    main_1.camera.zoom = (0, util_1.clamp)(main_1.ZOOM_MIN, main_1.camera.zoom, main_1.ZOOM_MAX);
    // get mouse pos after zoom
    var after = (0, main_1.toWorld)(mouse);
    // adjust camera
    main_1.camera.x += after.x - before.x;
    main_1.camera.y += after.y - before.y;
    return;
  }
  // move
  main_1.camera.x -= e.deltaX * (1 / main_1.camera.zoom) * const_1.RESOLUTION_SCALE;
  main_1.camera.y -= e.deltaY * (1 / main_1.camera.zoom) * const_1.RESOLUTION_SCALE;
}, {
  passive: false
});

/***/ }),

/***/ "./src/colors.ts":
/*!***********************!*\
  !*** ./src/colors.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isDarkMode = isDarkMode;
exports["default"] = getColors;
function isDarkMode() {
  return matchMedia('(prefers-color-scheme: dark)').matches;
}
function getColors() {
  return isDarkMode()
  // Dark Mode
  ? {
    background: '#000',
    grid: '#333'
  }
  // Light Mode
  : {
    background: '#fff',
    grid: '#ccc'
  };
}

/***/ }),

/***/ "./src/const.ts":
/*!**********************!*\
  !*** ./src/const.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RESOLUTION_SCALE = void 0;
exports.RESOLUTION_SCALE = 2;

/***/ }),

/***/ "./src/elements/photo.ts":
/*!*******************************!*\
  !*** ./src/elements/photo.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = renderPhoto;
var main_1 = __webpack_require__(/*! ../camera/main */ "./src/camera/main.ts");
var const_1 = __webpack_require__(/*! ../const */ "./src/const.ts");
var main_2 = __webpack_require__(/*! ../render/main */ "./src/render/main.ts");
var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
var START = {
  duration: 2e3,
  angle: -140
};
var HEIGHT = 400;
var MARGIN = 25;
var BOTTOM_MARGIN = 100;
var ANGLE = -10;
var X = -500;
var Y = -400;
var loaded = null;
var img = new Image();
img.onload = function () {
  return loaded = Date.now();
};
img.src = '/img/me.jpg';
function renderPhoto() {
  if (loaded == null) return;
  main_2.ctx.save();
  var pos = (0, main_1.toScreen)({
    x: innerWidth / 2 * const_1.RESOLUTION_SCALE,
    y: innerHeight / 2 * const_1.RESOLUTION_SCALE
  });
  main_2.ctx.translate(pos.x, pos.y);
  main_2.ctx.rotate((0, util_1.toRad)(ANGLE));
  var ratio = Math.min(innerWidth / innerHeight, 1);
  var height = HEIGHT * ratio;
  var width = height * img.width / img.height;
  var margin = MARGIN * ratio;
  var bottomMargin = BOTTOM_MARGIN * ratio;
  var x = -width / 2 + X * ratio;
  var y = -height / 2 + Y * ratio;
  main_2.ctx.shadowColor = '#0003';
  main_2.ctx.shadowBlur = 10;
  main_2.ctx.shadowOffsetX = 0;
  main_2.ctx.shadowOffsetY = 5;
  main_2.ctx.fillStyle = '#fff';
  main_2.ctx.fillRect(x - margin, y - margin, margin + width + margin, margin + height + bottomMargin);
  main_2.ctx.shadowColor = '#0000';
  main_2.ctx.drawImage(img, x, y, width, height);
  main_2.ctx.restore();
}

/***/ }),

/***/ "./src/elements/title.ts":
/*!*******************************!*\
  !*** ./src/elements/title.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = renderTitle;
var main_1 = __webpack_require__(/*! ../camera/main */ "./src/camera/main.ts");
var colors_1 = __webpack_require__(/*! ../colors */ "./src/colors.ts");
var const_1 = __webpack_require__(/*! ../const */ "./src/const.ts");
var main_2 = __webpack_require__(/*! ../render/main */ "./src/render/main.ts");
var util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
var TITLES = ['instrument-serif.svg', 'gaegu.svg', 'ranchers.svg', 'chokokutai.svg', 'unifrakturmaguntia.svg', 'vampiro-one.svg', 'bagel-fat-one.svg', 'doto.svg', 'workbench.svg', 'climate-crisis.svg'];
var readyCount = 0;
var allCount = TITLES.length * 2;
var isReady = false;
function loadImgs(color) {
  return TITLES.map(function (file) {
    var img = new Image();
    img.onload = function () {
      return ++readyCount == allCount && allReady();
    };
    img.src = "/img/title/".concat(color, "/").concat(file);
    return img;
  });
}
var imgs = {
  white: loadImgs('white'),
  black: loadImgs('black')
};
var maxWidth;
function allReady() {
  isReady = true;
  maxWidth = Math.max.apply(Math, _toConsumableArray(Object.values(imgs).flatMap(function (i) {
    return i.map(function (i) {
      return i.width;
    });
  })));
}
var DURATION = 2e3;
var TRANSITION = 500;
var ease = (0, util_1.cubicBezier)(.75, -.5, .25, 1.5);
function renderTitle() {
  if (!isReady) return;
  var time = Date.now() % DURATION;
  var i = Math.floor(Date.now() / DURATION);
  var color = (0, colors_1.isDarkMode)() ? 'white' : 'black';
  var img = imgs[color][(0, util_1.mod)(i, TITLES.length)];
  var scale = Math.min(innerWidth - 50, 800) / maxWidth;
  var width = img.width;
  if (time < TRANSITION / 2) {
    // from previous
    var prev = imgs[color][(0, util_1.mod)(i - 1, TITLES.length)];
    width = ease(prev.width, img.width, time / TRANSITION + .5);
  }
  if (time > DURATION - TRANSITION / 2) {
    // to next
    var next = imgs[color][(0, util_1.mod)(i + 1, TITLES.length)];
    width = ease(img.width, next.width, (time - (DURATION - TRANSITION / 2)) / TRANSITION);
  }
  var pos = (0, main_1.toScreen)({
    x: (innerWidth - width * scale) / 2 * const_1.RESOLUTION_SCALE,
    y: (innerHeight - img.height * scale) / 2 * const_1.RESOLUTION_SCALE
  });
  if ((0, colors_1.isDarkMode)()) {
    main_2.ctx.shadowColor = '#0008';
    main_2.ctx.shadowBlur = 10;
    main_2.ctx.shadowOffsetX = 0;
    main_2.ctx.shadowOffsetY = 5;
  }
  main_2.ctx.drawImage(img, pos.x, pos.y, width * scale * main_1.camera.zoom * const_1.RESOLUTION_SCALE, img.height * scale * main_1.camera.zoom * const_1.RESOLUTION_SCALE);
  main_2.ctx.shadowColor = '#0000';
}

/***/ }),

/***/ "./src/render/grid.ts":
/*!****************************!*\
  !*** ./src/render/grid.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.renderGrid = renderGrid;
var main_1 = __webpack_require__(/*! ../camera/main */ "./src/camera/main.ts");
var colors_1 = __importDefault(__webpack_require__(/*! ../colors */ "./src/colors.ts"));
var main_2 = __webpack_require__(/*! ./main */ "./src/render/main.ts");
var GRID_SIZE = 3;
var GRID_SPACING = 100;
function renderGrid() {
  var colors = (0, colors_1["default"])();
  // background
  main_2.ctx.fillStyle = colors.background;
  main_2.ctx.fillRect(0, 0, main_2.$canvas.width, main_2.$canvas.height);
  // grid
  main_2.ctx.fillStyle = colors.grid;
  for (var x = main_1.camera.x * main_1.camera.zoom % (GRID_SPACING * main_1.camera.zoom); x < main_2.$canvas.width; x += GRID_SPACING * main_1.camera.zoom) {
    for (var y = main_1.camera.y * main_1.camera.zoom % (GRID_SPACING * main_1.camera.zoom); y < main_2.$canvas.height; y += GRID_SPACING * main_1.camera.zoom) {
      main_2.ctx.beginPath();
      main_2.ctx.arc(x - GRID_SIZE / 2, y - GRID_SIZE / 2, GRID_SIZE, 0, 2 * Math.PI);
      main_2.ctx.fill();
    }
  }
}

/***/ }),

/***/ "./src/render/main.ts":
/*!****************************!*\
  !*** ./src/render/main.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ctx = exports.$canvas = void 0;
var const_1 = __webpack_require__(/*! ../const */ "./src/const.ts");
var photo_1 = __importDefault(__webpack_require__(/*! ../elements/photo */ "./src/elements/photo.ts"));
var title_1 = __importDefault(__webpack_require__(/*! ../elements/title */ "./src/elements/title.ts"));
var grid_1 = __webpack_require__(/*! ./grid */ "./src/render/grid.ts");
exports.$canvas = document.querySelector('canvas');
exports.ctx = exports.$canvas.getContext('2d');
(function update() {
  (0, grid_1.renderGrid)();
  (0, photo_1["default"])();
  (0, title_1["default"])();
  requestAnimationFrame(update);
})();
function resize() {
  exports.$canvas.width = innerWidth * const_1.RESOLUTION_SCALE;
  exports.$canvas.height = innerHeight * const_1.RESOLUTION_SCALE;
}
addEventListener('resize', resize);
resize();

/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__webpack_require__(/*! ./render/main */ "./src/render/main.ts");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.dist = dist;
exports.clamp = clamp;
exports.mod = mod;
exports.lerp = lerp;
exports.ease = ease;
exports.cubicBezier = cubicBezier;
exports.toRad = toRad;
function dist(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
function clamp(min, value, max) {
  return Math.min(Math.max(value, min), max);
}
function mod(a, n) {
  return (a % n + n) % n;
}
function lerp(a, b, t) {
  return a + t * (b - a);
}
function ease(a, b, t) {
  var u = t * t * (3 - 2 * t);
  return a + u * (b - a);
}
function cubicBezier(p0, p1, p2, p3) {
  function sampleCurve(t, a, b) {
    var invT = 1 - t;
    return 3 * invT * invT * t * a + 3 * invT * t * t * b + t * t * t;
  }
  function sampleCurveY(x) {
    // solve for t
    var t = x;
    for (var i = 0; i < 5; i++) {
      var xEst = sampleCurve(t, p0, p2) - x;
      var invT = 1 - t;
      var dx = 3 * invT * invT * p0 + 6 * invT * t * (p2 - p0) + 3 * t * t * (1 - p2);
      if (Math.abs(xEst) < 1e-6 || dx === 0) break;
      t = t - xEst / dx;
    }
    return sampleCurve(t, p1, p3);
  }
  return function (a, b, t) {
    return a + (b - a) * sampleCurveY(t);
  };
}
function toRad(deg) {
  return deg * Math.PI / 180;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/script": 0,
/******/ 			"style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./src/script.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./src/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;