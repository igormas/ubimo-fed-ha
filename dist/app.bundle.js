/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/rxjs/InnerSubscriber.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/InnerSubscriber.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/Subscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Notification.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/Notification.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/Observable.js");
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map

/***/ }),

/***/ "./node_modules/rxjs/Observable.js":
/*!*****************************************!*\
  !*** ./node_modules/rxjs/Observable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(/*! ./util/root */ "./node_modules/rxjs/util/root.js");
var toSubscriber_1 = __webpack_require__(/*! ./util/toSubscriber */ "./node_modules/rxjs/util/toSubscriber.js");
var observable_1 = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/symbol/observable.js");
var pipe_1 = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/util/pipe.js");
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/Observer.js":
/*!***************************************!*\
  !*** ./node_modules/rxjs/Observer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),

/***/ "./node_modules/rxjs/OuterSubscriber.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/OuterSubscriber.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/Subscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Scheduler.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/Scheduler.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subject.js":
/*!**************************************!*\
  !*** ./node_modules/rxjs/Subject.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(/*! ./Observable */ "./node_modules/rxjs/Observable.js");
var Subscriber_1 = __webpack_require__(/*! ./Subscriber */ "./node_modules/rxjs/Subscriber.js");
var Subscription_1 = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/Subscription.js");
var ObjectUnsubscribedError_1 = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ "./node_modules/rxjs/util/ObjectUnsubscribedError.js");
var SubjectSubscription_1 = __webpack_require__(/*! ./SubjectSubscription */ "./node_modules/rxjs/SubjectSubscription.js");
var rxSubscriber_1 = __webpack_require__(/*! ./symbol/rxSubscriber */ "./node_modules/rxjs/symbol/rxSubscriber.js");
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/rxjs/SubjectSubscription.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/SubjectSubscription.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/Subscription.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subscriber.js":
/*!*****************************************!*\
  !*** ./node_modules/rxjs/Subscriber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/util/isFunction.js");
var Subscription_1 = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/Subscription.js");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./node_modules/rxjs/Observer.js");
var rxSubscriber_1 = __webpack_require__(/*! ./symbol/rxSubscriber */ "./node_modules/rxjs/symbol/rxSubscriber.js");
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    // HACK(benlesh): To resolve an issue where Node users may have multiple
                    // copies of rxjs in their node_modules directory.
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[rxSubscriber_1.rxSubscriber]();
                        this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        this.destination = trustedSubscriber;
                        trustedSubscriber.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber || ('syncErrorThrowable' in obj && obj[rxSubscriber_1.rxSubscriber]);
}
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subscription.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/Subscription.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(/*! ./util/isArray */ "./node_modules/rxjs/util/isArray.js");
var isObject_1 = __webpack_require__(/*! ./util/isObject */ "./node_modules/rxjs/util/isObject.js");
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/util/isFunction.js");
var tryCatch_1 = __webpack_require__(/*! ./util/tryCatch */ "./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__(/*! ./util/errorObject */ "./node_modules/rxjs/util/errorObject.js");
var UnsubscriptionError_1 = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/util/UnsubscriptionError.js");
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/operator/delay.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/add/operator/delay.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/Observable.js");
var delay_1 = __webpack_require__(/*! ../../operator/delay */ "./node_modules/rxjs/operator/delay.js");
Observable_1.Observable.prototype.delay = delay_1.delay;
//# sourceMappingURL=delay.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/operator/expand.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/add/operator/expand.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/Observable.js");
var expand_1 = __webpack_require__(/*! ../../operator/expand */ "./node_modules/rxjs/operator/expand.js");
Observable_1.Observable.prototype.expand = expand_1.expand;
//# sourceMappingURL=expand.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/ArrayObservable.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/observable/ArrayObservable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/Observable.js");
var ScalarObservable_1 = __webpack_require__(/*! ./ScalarObservable */ "./node_modules/rxjs/observable/ScalarObservable.js");
var EmptyObservable_1 = __webpack_require__(/*! ./EmptyObservable */ "./node_modules/rxjs/observable/EmptyObservable.js");
var isScheduler_1 = __webpack_require__(/*! ../util/isScheduler */ "./node_modules/rxjs/util/isScheduler.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/EmptyObservable.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/observable/EmptyObservable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/Observable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/ScalarObservable.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/observable/ScalarObservable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/Observable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/of.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/observable/of.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(/*! ./ArrayObservable */ "./node_modules/rxjs/observable/ArrayObservable.js");
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/delay.js":
/*!*********************************************!*\
  !*** ./node_modules/rxjs/operator/delay.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var async_1 = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/scheduler/async.js");
var delay_1 = __webpack_require__(/*! ../operators/delay */ "./node_modules/rxjs/operators/delay.js");
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The IScheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return delay_1.delay(delay, scheduler)(this);
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/expand.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/operator/expand.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var expand_1 = __webpack_require__(/*! ../operators/expand */ "./node_modules/rxjs/operators/expand.js");
/* tslint:enable:max-line-length */
/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 *
 * @param {function(value: T, index: number) => Observable} project A function
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
 * each projected inner Observable.
 * @return {Observable} An Observable that emits the source values and also
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @method expand
 * @owner Observable
 */
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (scheduler === void 0) { scheduler = undefined; }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return expand_1.expand(project, concurrent, scheduler)(this);
}
exports.expand = expand;
//# sourceMappingURL=expand.js.map

/***/ }),

/***/ "./node_modules/rxjs/operators/delay.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/operators/delay.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__(/*! ../scheduler/async */ "./node_modules/rxjs/scheduler/async.js");
var isDate_1 = __webpack_require__(/*! ../util/isDate */ "./node_modules/rxjs/util/isDate.js");
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/Subscriber.js");
var Notification_1 = __webpack_require__(/*! ../Notification */ "./node_modules/rxjs/Notification.js");
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The IScheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return function (source) { return source.lift(new DelayOperator(delayFor, scheduler)); };
}
exports.delay = delay;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());
//# sourceMappingURL=delay.js.map

/***/ }),

/***/ "./node_modules/rxjs/operators/expand.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/operators/expand.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tryCatch_1 = __webpack_require__(/*! ../util/tryCatch */ "./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__(/*! ../util/errorObject */ "./node_modules/rxjs/util/errorObject.js");
var OuterSubscriber_1 = __webpack_require__(/*! ../OuterSubscriber */ "./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__(/*! ../util/subscribeToResult */ "./node_modules/rxjs/util/subscribeToResult.js");
/* tslint:enable:max-line-length */
/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {@link mergeMap}
 * @see {@link mergeScan}
 *
 * @param {function(value: T, index: number) => Observable} project A function
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
 * each projected inner Observable.
 * @return {Observable} An Observable that emits the source values and also
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @method expand
 * @owner Observable
 */
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (scheduler === void 0) { scheduler = undefined; }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return function (source) { return source.lift(new ExpandOperator(project, concurrent, scheduler)); };
}
exports.expand = expand;
var ExpandOperator = (function () {
    function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
}());
exports.ExpandOperator = ExpandOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ExpandSubscriber = (function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        _super.call(this, destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            }
            else {
                var state = { subscriber: this, result: result, value: value, index: index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        }
        else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.ExpandSubscriber = ExpandSubscriber;
//# sourceMappingURL=expand.js.map

/***/ }),

/***/ "./node_modules/rxjs/scheduler/Action.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/scheduler/Action.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(/*! ../Subscription */ "./node_modules/rxjs/Subscription.js");
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),

/***/ "./node_modules/rxjs/scheduler/AsyncAction.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/scheduler/AsyncAction.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(/*! ../util/root */ "./node_modules/rxjs/util/root.js");
var Action_1 = __webpack_require__(/*! ./Action */ "./node_modules/rxjs/scheduler/Action.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),

/***/ "./node_modules/rxjs/scheduler/AsyncScheduler.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/scheduler/AsyncScheduler.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__(/*! ../Scheduler */ "./node_modules/rxjs/Scheduler.js");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/scheduler/async.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/scheduler/async.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AsyncAction_1 = __webpack_require__(/*! ./AsyncAction */ "./node_modules/rxjs/scheduler/AsyncAction.js");
var AsyncScheduler_1 = __webpack_require__(/*! ./AsyncScheduler */ "./node_modules/rxjs/scheduler/AsyncScheduler.js");
/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/iterator.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/symbol/iterator.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(/*! ../util/root */ "./node_modules/rxjs/util/root.js");
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/observable.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/symbol/observable.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(/*! ../util/root */ "./node_modules/rxjs/util/root.js");
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/rxSubscriber.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/symbol/rxSubscriber.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(/*! ../util/root */ "./node_modules/rxjs/util/root.js");
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/ObjectUnsubscribedError.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/util/ObjectUnsubscribedError.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/UnsubscriptionError.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/util/UnsubscriptionError.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/errorObject.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/util/errorObject.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isArray.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/util/isArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isArrayLike.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/util/isArrayLike.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isDate.js":
/*!******************************************!*\
  !*** ./node_modules/rxjs/util/isDate.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;
//# sourceMappingURL=isDate.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/util/isFunction.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/util/isObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isPromise.js":
/*!*********************************************!*\
  !*** ./node_modules/rxjs/util/isPromise.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isScheduler.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/util/isScheduler.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/noop.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/noop.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/pipe.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/pipe.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var noop_1 = __webpack_require__(/*! ./noop */ "./node_modules/rxjs/util/noop.js");
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/root.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/root.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/rxjs/util/subscribeToResult.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/util/subscribeToResult.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(/*! ./root */ "./node_modules/rxjs/util/root.js");
var isArrayLike_1 = __webpack_require__(/*! ./isArrayLike */ "./node_modules/rxjs/util/isArrayLike.js");
var isPromise_1 = __webpack_require__(/*! ./isPromise */ "./node_modules/rxjs/util/isPromise.js");
var isObject_1 = __webpack_require__(/*! ./isObject */ "./node_modules/rxjs/util/isObject.js");
var Observable_1 = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/Observable.js");
var iterator_1 = __webpack_require__(/*! ../symbol/iterator */ "./node_modules/rxjs/symbol/iterator.js");
var InnerSubscriber_1 = __webpack_require__(/*! ../InnerSubscriber */ "./node_modules/rxjs/InnerSubscriber.js");
var observable_1 = __webpack_require__(/*! ../symbol/observable */ "./node_modules/rxjs/symbol/observable.js");
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/toSubscriber.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/util/toSubscriber.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/Subscriber.js");
var rxSubscriber_1 = __webpack_require__(/*! ../symbol/rxSubscriber */ "./node_modules/rxjs/symbol/rxSubscriber.js");
var Observer_1 = __webpack_require__(/*! ../Observer */ "./node_modules/rxjs/Observer.js");
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/tryCatch.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/util/tryCatch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(/*! ./errorObject */ "./node_modules/rxjs/util/errorObject.js");
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/ad-emitter.ts":
/*!***************************!*\
  !*** ./src/ad-emitter.ts ***!
  \***************************/
/*! exports provided: AdEmitter, adDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdEmitter", function() { return AdEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adDispatcher", function() { return adDispatcher; });
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs/Subject.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_Subject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_observable_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/observable/of */ "./node_modules/rxjs/observable/of.js");
/* harmony import */ var rxjs_observable_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_observable_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_add_operator_expand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/expand */ "./node_modules/rxjs/add/operator/expand.js");
/* harmony import */ var rxjs_add_operator_expand__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_expand__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_add_operator_delay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/delay */ "./node_modules/rxjs/add/operator/delay.js");
/* harmony import */ var rxjs_add_operator_delay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_delay__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




var IMAGE_CREATIVES = [
    {
        name: 'ray ban',
        src: 'data:image/jpeg;base64,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'
    },
];
var AdEmitter = /** @class */ (function () {
    function AdEmitter() {
        this._adEmitter$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.startEmissions();
    }
    AdEmitter.prototype.getRandomAdd = function () {
        var isRandomImage = Math.random() > 0.5;
        if (true) { // todo
            var randomImageCreativeIndex = Math.floor(Math.random() * IMAGE_CREATIVES.length);
            var randomImageCreative = IMAGE_CREATIVES[randomImageCreativeIndex];
            return __assign({}, randomImageCreative, { type: 'IMAGE' });
        }
    };
    AdEmitter.prototype.startEmissions = function () {
        var _this = this;
        Object(rxjs_observable_of__WEBPACK_IMPORTED_MODULE_1__["of"])(null).expand(function () {
            var randomDelay = Math.round(Math.random() * 5000);
            return Object(rxjs_observable_of__WEBPACK_IMPORTED_MODULE_1__["of"])(_this.getRandomAdd())
                .delay(randomDelay);
        })
            .subscribe(function (adEvent) {
            _this._adEmitter$.next(adEvent);
        });
    };
    Object.defineProperty(AdEmitter.prototype, "adEmitter$", {
        get: function () {
            return this._adEmitter$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AdEmitter.prototype.registerToAdEvents = function (cb) {
        var sub = this.adEmitter$
            .subscribe(function (evt) {
            cb(evt);
        });
        return {
            removeListener: function () {
                sub.unsubscribe();
            }
        };
    };
    return AdEmitter;
}());

var adDispatcher = new AdEmitter();


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: AdEmitter, adDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ad_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ad-emitter */ "./src/ad-emitter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdEmitter", function() { return _ad_emitter__WEBPACK_IMPORTED_MODULE_0__["AdEmitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "adDispatcher", function() { return _ad_emitter__WEBPACK_IMPORTED_MODULE_0__["adDispatcher"]; });




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvSW5uZXJTdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL05vdGlmaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9PYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL091dGVyU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9TY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvU3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0U3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL1N1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL2FkZC9vcGVyYXRvci9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9hZGQvb3BlcmF0b3IvZXhwYW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvQXJyYXlPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvRW1wdHlPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvU2NhbGFyT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9vYnNlcnZhYmxlL29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL2RlbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL2V4cGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9vcGVyYXRvcnMvZGVsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvb3BlcmF0b3JzL2V4cGFuZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9zY2hlZHVsZXIvQWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9Bc3luY0FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9zY2hlZHVsZXIvQXN5bmNTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvc2NoZWR1bGVyL2FzeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvZXJyb3JPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc1NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL25vb3AuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9waXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3N1YnNjcmliZVRvUmVzdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdHJ5Q2F0Y2guanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWQtZW1pdHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJC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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCw2Q0FBNkM7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDOVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNaLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QixDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUM7O0FBRU0sSUFBTSxZQUFZLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFZiIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL1N1YnNjcmliZXInKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgSW5uZXJTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5uZXJTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElubmVyU3Vic2NyaWJlcihwYXJlbnQsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLm91dGVyVmFsdWUgPSBvdXRlclZhbHVlO1xuICAgICAgICB0aGlzLm91dGVySW5kZXggPSBvdXRlckluZGV4O1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB9XG4gICAgSW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlOZXh0KHRoaXMub3V0ZXJWYWx1ZSwgdmFsdWUsIHRoaXMub3V0ZXJJbmRleCwgdGhpcy5pbmRleCsrLCB0aGlzKTtcbiAgICB9O1xuICAgIElubmVyU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUVycm9yKGVycm9yLCB0aGlzKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgSW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUNvbXBsZXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5uZXJTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5Jbm5lclN1YnNjcmliZXIgPSBJbm5lclN1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Jbm5lclN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9PYnNlcnZhYmxlJyk7XG4vKipcbiAqIFJlcHJlc2VudHMgYSBwdXNoLWJhc2VkIGV2ZW50IG9yIHZhbHVlIHRoYXQgYW4ge0BsaW5rIE9ic2VydmFibGV9IGNhbiBlbWl0LlxuICogVGhpcyBjbGFzcyBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBvcGVyYXRvcnMgdGhhdCBtYW5hZ2Ugbm90aWZpY2F0aW9ucyxcbiAqIGxpa2Uge0BsaW5rIG1hdGVyaWFsaXplfSwge0BsaW5rIGRlbWF0ZXJpYWxpemV9LCB7QGxpbmsgb2JzZXJ2ZU9ufSwgYW5kXG4gKiBvdGhlcnMuIEJlc2lkZXMgd3JhcHBpbmcgdGhlIGFjdHVhbCBkZWxpdmVyZWQgdmFsdWUsIGl0IGFsc28gYW5ub3RhdGVzIGl0XG4gKiB3aXRoIG1ldGFkYXRhIG9mLCBmb3IgaW5zdGFuY2UsIHdoYXQgdHlwZSBvZiBwdXNoIG1lc3NhZ2UgaXQgaXMgKGBuZXh0YCxcbiAqIGBlcnJvcmAsIG9yIGBjb21wbGV0ZWApLlxuICpcbiAqIEBzZWUge0BsaW5rIG1hdGVyaWFsaXplfVxuICogQHNlZSB7QGxpbmsgZGVtYXRlcmlhbGl6ZX1cbiAqIEBzZWUge0BsaW5rIG9ic2VydmVPbn1cbiAqXG4gKiBAY2xhc3MgTm90aWZpY2F0aW9uPFQ+XG4gKi9cbnZhciBOb3RpZmljYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuaGFzVmFsdWUgPSBraW5kID09PSAnTic7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGl2ZXJzIHRvIHRoZSBnaXZlbiBgb2JzZXJ2ZXJgIHRoZSB2YWx1ZSB3cmFwcGVkIGJ5IHRoaXMgTm90aWZpY2F0aW9uLlxuICAgICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmVyXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLm5leHQgJiYgb2JzZXJ2ZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvciAmJiBvYnNlcnZlci5lcnJvcih0aGlzLmVycm9yKTtcbiAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5jb21wbGV0ZSAmJiBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBzb21lIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2tzLCBkZWxpdmVyIHRoZSB2YWx1ZSByZXByZXNlbnRlZCBieSB0aGVcbiAgICAgKiBjdXJyZW50IE5vdGlmaWNhdGlvbiB0byB0aGUgY29ycmVjdGx5IGNvcnJlc3BvbmRpbmcgY2FsbGJhY2suXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IHZvaWR9IG5leHQgQW4gT2JzZXJ2ZXIgYG5leHRgIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZXJyOiBhbnkpOiB2b2lkfSBbZXJyb3JdIEFuIE9ic2VydmVyIGBlcnJvcmAgY2FsbGJhY2suXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbY29tcGxldGVdIEFuIE9ic2VydmVyIGBjb21wbGV0ZWAgY2FsbGJhY2suXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZG8gPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBraW5kID0gdGhpcy5raW5kO1xuICAgICAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0ICYmIG5leHQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IgJiYgZXJyb3IodGhpcy5lcnJvcik7XG4gICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcGxldGUgJiYgY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGFrZXMgYW4gT2JzZXJ2ZXIgb3IgaXRzIGluZGl2aWR1YWwgY2FsbGJhY2sgZnVuY3Rpb25zLCBhbmQgY2FsbHMgYG9ic2VydmVgXG4gICAgICogb3IgYGRvYCBtZXRob2RzIGFjY29yZGluZ2x5LlxuICAgICAqIEBwYXJhbSB7T2JzZXJ2ZXJ8ZnVuY3Rpb24odmFsdWU6IFQpOiB2b2lkfSBuZXh0T3JPYnNlcnZlciBBbiBPYnNlcnZlciBvclxuICAgICAqIHRoZSBgbmV4dGAgY2FsbGJhY2suXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlcnI6IGFueSk6IHZvaWR9IFtlcnJvcl0gQW4gT2JzZXJ2ZXIgYGVycm9yYCBjYWxsYmFjay5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gQW4gT2JzZXJ2ZXIgYGNvbXBsZXRlYCBjYWxsYmFjay5cbiAgICAgKiBAcmV0dXJuIHthbnl9XG4gICAgICovXG4gICAgTm90aWZpY2F0aW9uLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXIgJiYgdHlwZW9mIG5leHRPck9ic2VydmVyLm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ic2VydmUobmV4dE9yT2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG8obmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IGp1c3QgZGVsaXZlcnMgdGhlIG5vdGlmaWNhdGlvbiByZXByZXNlbnRlZFxuICAgICAqIGJ5IHRoaXMgTm90aWZpY2F0aW9uIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm4ge2FueX1cbiAgICAgKi9cbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGtpbmQgPSB0aGlzLmtpbmQ7XG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm9mKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnRocm93KHRoaXMuZXJyb3IpO1xuICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVfMS5PYnNlcnZhYmxlLmVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIG5vdGlmaWNhdGlvbiBraW5kIHZhbHVlJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIHNob3J0Y3V0IHRvIGNyZWF0ZSBhIE5vdGlmaWNhdGlvbiBpbnN0YW5jZSBvZiB0aGUgdHlwZSBgbmV4dGAgZnJvbSBhXG4gICAgICogZ2l2ZW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHtUfSB2YWx1ZSBUaGUgYG5leHRgIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge05vdGlmaWNhdGlvbjxUPn0gVGhlIFwibmV4dFwiIE5vdGlmaWNhdGlvbiByZXByZXNlbnRpbmcgdGhlXG4gICAgICogYXJndW1lbnQuXG4gICAgICovXG4gICAgTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdOJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOb3RpZmljYXRpb24udW5kZWZpbmVkVmFsdWVOb3RpZmljYXRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIHNob3J0Y3V0IHRvIGNyZWF0ZSBhIE5vdGlmaWNhdGlvbiBpbnN0YW5jZSBvZiB0aGUgdHlwZSBgZXJyb3JgIGZyb20gYVxuICAgICAqIGdpdmVuIGVycm9yLlxuICAgICAqIEBwYXJhbSB7YW55fSBbZXJyXSBUaGUgYGVycm9yYCBlcnJvci5cbiAgICAgKiBAcmV0dXJuIHtOb3RpZmljYXRpb248VD59IFRoZSBcImVycm9yXCIgTm90aWZpY2F0aW9uIHJlcHJlc2VudGluZyB0aGVcbiAgICAgKiBhcmd1bWVudC5cbiAgICAgKi9cbiAgICBOb3RpZmljYXRpb24uY3JlYXRlRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBzaG9ydGN1dCB0byBjcmVhdGUgYSBOb3RpZmljYXRpb24gaW5zdGFuY2Ugb2YgdGhlIHR5cGUgYGNvbXBsZXRlYC5cbiAgICAgKiBAcmV0dXJuIHtOb3RpZmljYXRpb248YW55Pn0gVGhlIHZhbHVlbGVzcyBcImNvbXBsZXRlXCIgTm90aWZpY2F0aW9uLlxuICAgICAqL1xuICAgIE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE5vdGlmaWNhdGlvbi5jb21wbGV0ZU5vdGlmaWNhdGlvbjtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jb21wbGV0ZU5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24oJ0MnKTtcbiAgICBOb3RpZmljYXRpb24udW5kZWZpbmVkVmFsdWVOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCdOJywgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gTm90aWZpY2F0aW9uO1xufSgpKTtcbmV4cG9ydHMuTm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9yb290Jyk7XG52YXIgdG9TdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3V0aWwvdG9TdWJzY3JpYmVyJyk7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9zeW1ib2wvb2JzZXJ2YWJsZScpO1xudmFyIHBpcGVfMSA9IHJlcXVpcmUoJy4vdXRpbC9waXBlJyk7XG4vKipcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYW55IHNldCBvZiB2YWx1ZXMgb3ZlciBhbnkgYW1vdW50IG9mIHRpbWUuIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgYnVpbGRpbmcgYmxvY2tcbiAqIG9mIFJ4SlMuXG4gKlxuICogQGNsYXNzIE9ic2VydmFibGU8VD5cbiAqL1xudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YnNjcmliZSB0aGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgT2JzZXJ2YWJsZSBpc1xuICAgICAqIGluaXRpYWxseSBzdWJzY3JpYmVkIHRvLiBUaGlzIGZ1bmN0aW9uIGlzIGdpdmVuIGEgU3Vic2NyaWJlciwgdG8gd2hpY2ggbmV3IHZhbHVlc1xuICAgICAqIGNhbiBiZSBgbmV4dGBlZCwgb3IgYW4gYGVycm9yYCBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byByYWlzZSBhbiBlcnJvciwgb3JcbiAgICAgKiBgY29tcGxldGVgIGNhbiBiZSBjYWxsZWQgdG8gbm90aWZ5IG9mIGEgc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE9ic2VydmFibGUsIHdpdGggdGhpcyBPYnNlcnZhYmxlIGFzIHRoZSBzb3VyY2UsIGFuZCB0aGUgcGFzc2VkXG4gICAgICogb3BlcmF0b3IgZGVmaW5lZCBhcyB0aGUgbmV3IG9ic2VydmFibGUncyBvcGVyYXRvci5cbiAgICAgKiBAbWV0aG9kIGxpZnRcbiAgICAgKiBAcGFyYW0ge09wZXJhdG9yfSBvcGVyYXRvciB0aGUgb3BlcmF0b3IgZGVmaW5pbmcgdGhlIG9wZXJhdGlvbiB0byB0YWtlIG9uIHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gYSBuZXcgb2JzZXJ2YWJsZSB3aXRoIHRoZSBPcGVyYXRvciBhcHBsaWVkXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludm9rZXMgYW4gZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUgYW5kIHJlZ2lzdGVycyBPYnNlcnZlciBoYW5kbGVycyBmb3Igbm90aWZpY2F0aW9ucyBpdCB3aWxsIGVtaXQuXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VXNlIGl0IHdoZW4geW91IGhhdmUgYWxsIHRoZXNlIE9ic2VydmFibGVzLCBidXQgc3RpbGwgbm90aGluZyBpcyBoYXBwZW5pbmcuPC9zcGFuPlxuICAgICAqXG4gICAgICogYHN1YnNjcmliZWAgaXMgbm90IGEgcmVndWxhciBvcGVyYXRvciwgYnV0IGEgbWV0aG9kIHRoYXQgY2FsbHMgT2JzZXJ2YWJsZSdzIGludGVybmFsIGBzdWJzY3JpYmVgIGZ1bmN0aW9uLiBJdFxuICAgICAqIG1pZ2h0IGJlIGZvciBleGFtcGxlIGEgZnVuY3Rpb24gdGhhdCB5b3UgcGFzc2VkIHRvIGEge0BsaW5rIGNyZWF0ZX0gc3RhdGljIGZhY3RvcnksIGJ1dCBtb3N0IG9mIHRoZSB0aW1lIGl0IGlzXG4gICAgICogYSBsaWJyYXJ5IGltcGxlbWVudGF0aW9uLCB3aGljaCBkZWZpbmVzIHdoYXQgYW5kIHdoZW4gd2lsbCBiZSBlbWl0dGVkIGJ5IGFuIE9ic2VydmFibGUuIFRoaXMgbWVhbnMgdGhhdCBjYWxsaW5nXG4gICAgICogYHN1YnNjcmliZWAgaXMgYWN0dWFsbHkgdGhlIG1vbWVudCB3aGVuIE9ic2VydmFibGUgc3RhcnRzIGl0cyB3b3JrLCBub3Qgd2hlbiBpdCBpcyBjcmVhdGVkLCBhcyBpdCBpcyBvZnRlblxuICAgICAqIHRob3VnaHQuXG4gICAgICpcbiAgICAgKiBBcGFydCBmcm9tIHN0YXJ0aW5nIHRoZSBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZSwgdGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBsaXN0ZW4gZm9yIHZhbHVlc1xuICAgICAqIHRoYXQgYW4gT2JzZXJ2YWJsZSBlbWl0cywgYXMgd2VsbCBhcyBmb3Igd2hlbiBpdCBjb21wbGV0ZXMgb3IgZXJyb3JzLiBZb3UgY2FuIGFjaGlldmUgdGhpcyBpbiB0d29cbiAgICAgKiBmb2xsb3dpbmcgd2F5cy5cbiAgICAgKlxuICAgICAqIFRoZSBmaXJzdCB3YXkgaXMgY3JlYXRpbmcgYW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB7QGxpbmsgT2JzZXJ2ZXJ9IGludGVyZmFjZS4gSXQgc2hvdWxkIGhhdmUgbWV0aG9kc1xuICAgICAqIGRlZmluZWQgYnkgdGhhdCBpbnRlcmZhY2UsIGJ1dCBub3RlIHRoYXQgaXQgc2hvdWxkIGJlIGp1c3QgYSByZWd1bGFyIEphdmFTY3JpcHQgb2JqZWN0LCB3aGljaCB5b3UgY2FuIGNyZWF0ZVxuICAgICAqIHlvdXJzZWxmIGluIGFueSB3YXkgeW91IHdhbnQgKEVTNiBjbGFzcywgY2xhc3NpYyBmdW5jdGlvbiBjb25zdHJ1Y3Rvciwgb2JqZWN0IGxpdGVyYWwgZXRjLikuIEluIHBhcnRpY3VsYXIgZG9cbiAgICAgKiBub3QgYXR0ZW1wdCB0byB1c2UgYW55IFJ4SlMgaW1wbGVtZW50YXRpb24gZGV0YWlscyB0byBjcmVhdGUgT2JzZXJ2ZXJzIC0geW91IGRvbid0IG5lZWQgdGhlbS4gUmVtZW1iZXIgYWxzb1xuICAgICAqIHRoYXQgeW91ciBvYmplY3QgZG9lcyBub3QgaGF2ZSB0byBpbXBsZW1lbnQgYWxsIG1ldGhvZHMuIElmIHlvdSBmaW5kIHlvdXJzZWxmIGNyZWF0aW5nIGEgbWV0aG9kIHRoYXQgZG9lc24ndFxuICAgICAqIGRvIGFueXRoaW5nLCB5b3UgY2FuIHNpbXBseSBvbWl0IGl0LiBOb3RlIGhvd2V2ZXIsIHRoYXQgaWYgYGVycm9yYCBtZXRob2QgaXMgbm90IHByb3ZpZGVkLCBhbGwgZXJyb3JzIHdpbGxcbiAgICAgKiBiZSBsZWZ0IHVuY2F1Z2h0LlxuICAgICAqXG4gICAgICogVGhlIHNlY29uZCB3YXkgaXMgdG8gZ2l2ZSB1cCBvbiBPYnNlcnZlciBvYmplY3QgYWx0b2dldGhlciBhbmQgc2ltcGx5IHByb3ZpZGUgY2FsbGJhY2sgZnVuY3Rpb25zIGluIHBsYWNlIG9mIGl0cyBtZXRob2RzLlxuICAgICAqIFRoaXMgbWVhbnMgeW91IGNhbiBwcm92aWRlIHRocmVlIGZ1bmN0aW9ucyBhcyBhcmd1bWVudHMgdG8gYHN1YnNjcmliZWAsIHdoZXJlIGZpcnN0IGZ1bmN0aW9uIGlzIGVxdWl2YWxlbnRcbiAgICAgKiBvZiBhIGBuZXh0YCBtZXRob2QsIHNlY29uZCBvZiBhbiBgZXJyb3JgIG1ldGhvZCBhbmQgdGhpcmQgb2YgYSBgY29tcGxldGVgIG1ldGhvZC4gSnVzdCBhcyBpbiBjYXNlIG9mIE9ic2VydmVyLFxuICAgICAqIGlmIHlvdSBkbyBub3QgbmVlZCB0byBsaXN0ZW4gZm9yIHNvbWV0aGluZywgeW91IGNhbiBvbWl0IGEgZnVuY3Rpb24sIHByZWZlcmFibHkgYnkgcGFzc2luZyBgdW5kZWZpbmVkYCBvciBgbnVsbGAsXG4gICAgICogc2luY2UgYHN1YnNjcmliZWAgcmVjb2duaXplcyB0aGVzZSBmdW5jdGlvbnMgYnkgd2hlcmUgdGhleSB3ZXJlIHBsYWNlZCBpbiBmdW5jdGlvbiBjYWxsLiBXaGVuIGl0IGNvbWVzXG4gICAgICogdG8gYGVycm9yYCBmdW5jdGlvbiwganVzdCBhcyBiZWZvcmUsIGlmIG5vdCBwcm92aWRlZCwgZXJyb3JzIGVtaXR0ZWQgYnkgYW4gT2JzZXJ2YWJsZSB3aWxsIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIFdoYXRldmVyIHN0eWxlIG9mIGNhbGxpbmcgYHN1YnNjcmliZWAgeW91IHVzZSwgaW4gYm90aCBjYXNlcyBpdCByZXR1cm5zIGEgU3Vic2NyaXB0aW9uIG9iamVjdC5cbiAgICAgKiBUaGlzIG9iamVjdCBhbGxvd3MgeW91IHRvIGNhbGwgYHVuc3Vic2NyaWJlYCBvbiBpdCwgd2hpY2ggaW4gdHVybiB3aWxsIHN0b3Agd29yayB0aGF0IGFuIE9ic2VydmFibGUgZG9lcyBhbmQgd2lsbCBjbGVhblxuICAgICAqIHVwIGFsbCByZXNvdXJjZXMgdGhhdCBhbiBPYnNlcnZhYmxlIHVzZWQuIE5vdGUgdGhhdCBjYW5jZWxsaW5nIGEgc3Vic2NyaXB0aW9uIHdpbGwgbm90IGNhbGwgYGNvbXBsZXRlYCBjYWxsYmFja1xuICAgICAqIHByb3ZpZGVkIHRvIGBzdWJzY3JpYmVgIGZ1bmN0aW9uLCB3aGljaCBpcyByZXNlcnZlZCBmb3IgYSByZWd1bGFyIGNvbXBsZXRpb24gc2lnbmFsIHRoYXQgY29tZXMgZnJvbSBhbiBPYnNlcnZhYmxlLlxuICAgICAqXG4gICAgICogUmVtZW1iZXIgdGhhdCBjYWxsYmFja3MgcHJvdmlkZWQgdG8gYHN1YnNjcmliZWAgYXJlIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNhbGxlZCBhc3luY2hyb25vdXNseS5cbiAgICAgKiBJdCBpcyBhbiBPYnNlcnZhYmxlIGl0c2VsZiB0aGF0IGRlY2lkZXMgd2hlbiB0aGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQuIEZvciBleGFtcGxlIHtAbGluayBvZn1cbiAgICAgKiBieSBkZWZhdWx0IGVtaXRzIGFsbCBpdHMgdmFsdWVzIHN5bmNocm9ub3VzbHkuIEFsd2F5cyBjaGVjayBkb2N1bWVudGF0aW9uIGZvciBob3cgZ2l2ZW4gT2JzZXJ2YWJsZVxuICAgICAqIHdpbGwgYmVoYXZlIHdoZW4gc3Vic2NyaWJlZCBhbmQgaWYgaXRzIGRlZmF1bHQgYmVoYXZpb3IgY2FuIGJlIG1vZGlmaWVkIHdpdGggYSB7QGxpbmsgU2NoZWR1bGVyfS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPlN1YnNjcmliZSB3aXRoIGFuIE9ic2VydmVyPC9jYXB0aW9uPlxuICAgICAqIGNvbnN0IHN1bU9ic2VydmVyID0ge1xuICAgICAqICAgc3VtOiAwLFxuICAgICAqICAgbmV4dCh2YWx1ZSkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWRkaW5nOiAnICsgdmFsdWUpO1xuICAgICAqICAgICB0aGlzLnN1bSA9IHRoaXMuc3VtICsgdmFsdWU7XG4gICAgICogICB9LFxuICAgICAqICAgZXJyb3IoKSB7IC8vIFdlIGFjdHVhbGx5IGNvdWxkIGp1c3QgcmVtb3ZlIHRoaXMgbWV0aG9kLFxuICAgICAqICAgfSwgICAgICAgIC8vIHNpbmNlIHdlIGRvIG5vdCByZWFsbHkgY2FyZSBhYm91dCBlcnJvcnMgcmlnaHQgbm93LlxuICAgICAqICAgY29tcGxldGUoKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdTdW0gZXF1YWxzOiAnICsgdGhpcy5zdW0pO1xuICAgICAqICAgfVxuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLm9mKDEsIDIsIDMpIC8vIFN5bmNocm9ub3VzbHkgZW1pdHMgMSwgMiwgMyBhbmQgdGhlbiBjb21wbGV0ZXMuXG4gICAgICogLnN1YnNjcmliZShzdW1PYnNlcnZlcik7XG4gICAgICpcbiAgICAgKiAvLyBMb2dzOlxuICAgICAqIC8vIFwiQWRkaW5nOiAxXCJcbiAgICAgKiAvLyBcIkFkZGluZzogMlwiXG4gICAgICogLy8gXCJBZGRpbmc6IDNcIlxuICAgICAqIC8vIFwiU3VtIGVxdWFsczogNlwiXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPlN1YnNjcmliZSB3aXRoIGZ1bmN0aW9uczwvY2FwdGlvbj5cbiAgICAgKiBsZXQgc3VtID0gMDtcbiAgICAgKlxuICAgICAqIFJ4Lk9ic2VydmFibGUub2YoMSwgMiwgMylcbiAgICAgKiAuc3Vic2NyaWJlKFxuICAgICAqICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FkZGluZzogJyArIHZhbHVlKTtcbiAgICAgKiAgICAgc3VtID0gc3VtICsgdmFsdWU7XG4gICAgICogICB9LFxuICAgICAqICAgdW5kZWZpbmVkLFxuICAgICAqICAgZnVuY3Rpb24oKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdTdW0gZXF1YWxzOiAnICsgc3VtKTtcbiAgICAgKiAgIH1cbiAgICAgKiApO1xuICAgICAqXG4gICAgICogLy8gTG9nczpcbiAgICAgKiAvLyBcIkFkZGluZzogMVwiXG4gICAgICogLy8gXCJBZGRpbmc6IDJcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAzXCJcbiAgICAgKiAvLyBcIlN1bSBlcXVhbHM6IDZcIlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5DYW5jZWwgYSBzdWJzY3JpcHRpb248L2NhcHRpb24+XG4gICAgICogY29uc3Qgc3Vic2NyaXB0aW9uID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS5zdWJzY3JpYmUoXG4gICAgICogICBudW0gPT4gY29uc29sZS5sb2cobnVtKSxcbiAgICAgKiAgIHVuZGVmaW5lZCxcbiAgICAgKiAgICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQhJykgLy8gV2lsbCBub3QgYmUgY2FsbGVkLCBldmVuXG4gICAgICogKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gY2FuY2VsbGluZyBzdWJzY3JpcHRpb25cbiAgICAgKlxuICAgICAqXG4gICAgICogc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICogICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZWQhJyk7XG4gICAgICogfSwgMjUwMCk7XG4gICAgICpcbiAgICAgKiAvLyBMb2dzOlxuICAgICAqIC8vIDAgYWZ0ZXIgMXNcbiAgICAgKiAvLyAxIGFmdGVyIDJzXG4gICAgICogLy8gXCJ1bnN1YnNjcmliZWQhXCIgYWZ0ZXIgMi41c1xuICAgICAqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfEZ1bmN0aW9ufSBvYnNlcnZlck9yTmV4dCAob3B0aW9uYWwpIEVpdGhlciBhbiBvYnNlcnZlciB3aXRoIG1ldGhvZHMgdG8gYmUgY2FsbGVkLFxuICAgICAqICBvciB0aGUgZmlyc3Qgb2YgdGhyZWUgcG9zc2libGUgaGFuZGxlcnMsIHdoaWNoIGlzIHRoZSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgZnJvbSB0aGUgc3Vic2NyaWJlZFxuICAgICAqICBPYnNlcnZhYmxlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIChvcHRpb25hbCkgQSBoYW5kbGVyIGZvciBhIHRlcm1pbmFsIGV2ZW50IHJlc3VsdGluZyBmcm9tIGFuIGVycm9yLiBJZiBubyBlcnJvciBoYW5kbGVyIGlzIHByb3ZpZGVkLFxuICAgICAqICB0aGUgZXJyb3Igd2lsbCBiZSB0aHJvd24gYXMgdW5oYW5kbGVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlIChvcHRpb25hbCkgQSBoYW5kbGVyIGZvciBhIHRlcm1pbmFsIGV2ZW50IHJlc3VsdGluZyBmcm9tIHN1Y2Nlc3NmdWwgY29tcGxldGlvbi5cbiAgICAgKiBAcmV0dXJuIHtJU3Vic2NyaXB0aW9ufSBhIHN1YnNjcmlwdGlvbiByZWZlcmVuY2UgdG8gdGhlIHJlZ2lzdGVyZWQgaGFuZGxlcnNcbiAgICAgKiBAbWV0aG9kIHN1YnNjcmliZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XG4gICAgICAgIHZhciBzaW5rID0gdG9TdWJzY3JpYmVyXzEudG9TdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc2luaywgdGhpcy5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2luay5hZGQodGhpcy5zb3VyY2UgfHwgIXNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID8gdGhpcy5fc3Vic2NyaWJlKHNpbmspIDogdGhpcy5fdHJ5U3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZm9yRWFjaFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHQgYSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGVcbiAgICAgKiBAcGFyYW0ge1Byb21pc2VDb25zdHJ1Y3Rvcn0gW1Byb21pc2VDdG9yXSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHVzZWQgdG8gaW5zdGFudGlhdGUgdGhlIFByb21pc2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCBlaXRoZXIgcmVzb2x2ZXMgb24gb2JzZXJ2YWJsZSBjb21wbGV0aW9uIG9yXG4gICAgICogIHJlamVjdHMgd2l0aCB0aGUgaGFuZGxlZCBlcnJvclxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgaWYgKHJvb3RfMS5yb290LlJ4ICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZyAmJiByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb290XzEucm9vdC5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gUHJvbWlzZSBpbXBsIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBNdXN0IGJlIGRlY2xhcmVkIGluIGEgc2VwYXJhdGUgc3RhdGVtZW50IHRvIGF2b2lkIGEgUmVmZXJuY2VFcnJvciB3aGVuXG4gICAgICAgICAgICAvLyBhY2Nlc3Npbmcgc3Vic2NyaXB0aW9uIGJlbG93IGluIHRoZSBjbG9zdXJlIGR1ZSB0byBUZW1wb3JhbCBEZWFkIFpvbmUuXG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24sIHRoZW4gd2UgY2FuIHN1cm1pc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5leHQgaGFuZGxpbmcgaXMgYXN5bmNocm9ub3VzLiBBbnkgZXJyb3JzIHRocm93blxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIHJlamVjdGVkIGV4cGxpY2l0bHkgYW5kIHVuc3Vic2NyaWJlIG11c3QgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIG1hbnVhbGx5XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBOTyBzdWJzY3JpcHRpb24sIHRoZW4gd2UncmUgZ2V0dGluZyBhIG5leHRlZFxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZSBzeW5jaHJvbm91c2x5IGR1cmluZyBzdWJzY3JpcHRpb24uIFdlIGNhbiBqdXN0IGNhbGwgaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGVycm9ycywgT2JzZXJ2YWJsZSdzIGBzdWJzY3JpYmVgIHdpbGwgZW5zdXJlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB1bnN1YnNjcmlwdGlvbiBsb2dpYyBpcyBjYWxsZWQsIHRoZW4gc3luY2hyb25vdXNseSByZXRocm93IHRoZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgdGhhdCwgUHJvbWlzZSB3aWxsIHRyYXAgdGhlIGVycm9yIGFuZCBzZW5kIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvd24gdGhlIHJlamVjdGlvbiBwYXRoLlxuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQW4gaW50ZXJvcCBwb2ludCBkZWZpbmVkIGJ5IHRoZSBlczctb2JzZXJ2YWJsZSBzcGVjIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICAgKiBAbWV0aG9kIFN5bWJvbC5vYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhpcyBpbnN0YW5jZSBvZiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc3RpdGNoIHRvZ2V0aGVyIGZ1bmN0aW9uYWwgb3BlcmF0b3JzIGludG8gYSBjaGFpbi5cbiAgICAgKiBAbWV0aG9kIHBpcGVcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSB0aGUgT2JzZXJ2YWJsZSByZXN1bHQgb2YgYWxsIG9mIHRoZSBvcGVyYXRvcnMgaGF2aW5nXG4gICAgICogYmVlbiBjYWxsZWQgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApXG4gICAgICogICAucGlwZShcbiAgICAgKiAgICAgZmlsdGVyKHggPT4geCAlIDIgPT09IDApLFxuICAgICAqICAgICBtYXAoeCA9PiB4ICsgeCksXG4gICAgICogICAgIHNjYW4oKGFjYywgeCkgPT4gYWNjICsgeClcbiAgICAgKiAgIClcbiAgICAgKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSlcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3BlcmF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaXBlXzEucGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKTtcbiAgICB9O1xuICAgIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKFByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIGlmIChyb290XzEucm9vdC5SeCAmJiByb290XzEucm9vdC5SeC5jb25maWcgJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiB2YWx1ZSA9IHg7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gSEFDSzogU2luY2UgVHlwZVNjcmlwdCBpbmhlcml0cyBzdGF0aWMgcHJvcGVydGllcyB0b28sIHdlIGhhdmUgdG9cbiAgICAvLyBmaWdodCBhZ2FpbnN0IFR5cGVTY3JpcHQgaGVyZSBzbyBTdWJqZWN0IGNhbiBoYXZlIGEgZGlmZmVyZW50IHN0YXRpYyBjcmVhdGUgc2lnbmF0dXJlXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb2xkIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmU/IHRoZSBzdWJzY3JpYmVyIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IGNvbGQgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5lbXB0eSA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHsgdGhyb3cgZXJyOyB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7IH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vU3Vic2NyaWJlcicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBPdXRlclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPdXRlclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3V0ZXJTdWJzY3JpYmVyKCkge1xuICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgT3V0ZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5ub3RpZnlOZXh0ID0gZnVuY3Rpb24gKG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgsIGlubmVyU3ViKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChpbm5lclZhbHVlKTtcbiAgICB9O1xuICAgIE91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5RXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IsIGlubmVyU3ViKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyb3IpO1xuICAgIH07XG4gICAgT3V0ZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5ub3RpZnlDb21wbGV0ZSA9IGZ1bmN0aW9uIChpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gT3V0ZXJTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5PdXRlclN1YnNjcmliZXIgPSBPdXRlclN1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PdXRlclN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEFuIGV4ZWN1dGlvbiBjb250ZXh0IGFuZCBhIGRhdGEgc3RydWN0dXJlIHRvIG9yZGVyIHRhc2tzIGFuZCBzY2hlZHVsZSB0aGVpclxuICogZXhlY3V0aW9uLiBQcm92aWRlcyBhIG5vdGlvbiBvZiAocG90ZW50aWFsbHkgdmlydHVhbCkgdGltZSwgdGhyb3VnaCB0aGVcbiAqIGBub3coKWAgZ2V0dGVyIG1ldGhvZC5cbiAqXG4gKiBFYWNoIHVuaXQgb2Ygd29yayBpbiBhIFNjaGVkdWxlciBpcyBjYWxsZWQgYW4ge0BsaW5rIEFjdGlvbn0uXG4gKlxuICogYGBgdHNcbiAqIGNsYXNzIFNjaGVkdWxlciB7XG4gKiAgIG5vdygpOiBudW1iZXI7XG4gKiAgIHNjaGVkdWxlKHdvcmssIGRlbGF5Pywgc3RhdGU/KTogU3Vic2NyaXB0aW9uO1xuICogfVxuICogYGBgXG4gKlxuICogQGNsYXNzIFNjaGVkdWxlclxuICovXG52YXIgU2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoU2NoZWR1bGVyQWN0aW9uLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdGhpcy5TY2hlZHVsZXJBY3Rpb24gPSBTY2hlZHVsZXJBY3Rpb247XG4gICAgICAgIHRoaXMubm93ID0gbm93O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZXMgYSBmdW5jdGlvbiwgYHdvcmtgLCBmb3IgZXhlY3V0aW9uLiBNYXkgaGFwcGVuIGF0IHNvbWUgcG9pbnQgaW5cbiAgICAgKiB0aGUgZnV0dXJlLCBhY2NvcmRpbmcgdG8gdGhlIGBkZWxheWAgcGFyYW1ldGVyLCBpZiBzcGVjaWZpZWQuIE1heSBiZSBwYXNzZWRcbiAgICAgKiBzb21lIGNvbnRleHQgb2JqZWN0LCBgc3RhdGVgLCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgYHdvcmtgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGdpdmVuIGFyZ3VtZW50cyB3aWxsIGJlIHByb2Nlc3NlZCBhbiBzdG9yZWQgYXMgYW4gQWN0aW9uIG9iamVjdCBpbiBhXG4gICAgICogcXVldWUgb2YgYWN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RhdGU6ID9UKTogP1N1YnNjcmlwdGlvbn0gd29yayBBIGZ1bmN0aW9uIHJlcHJlc2VudGluZyBhXG4gICAgICogdGFzaywgb3Igc29tZSB1bml0IG9mIHdvcmsgdG8gYmUgZXhlY3V0ZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2RlbGF5XSBUaW1lIHRvIHdhaXQgYmVmb3JlIGV4ZWN1dGluZyB0aGUgd29yaywgd2hlcmUgdGhlXG4gICAgICogdGltZSB1bml0IGlzIGltcGxpY2l0IGFuZCBkZWZpbmVkIGJ5IHRoZSBTY2hlZHVsZXIgaXRzZWxmLlxuICAgICAqIEBwYXJhbSB7VH0gW3N0YXRlXSBTb21lIGNvbnRleHR1YWwgZGF0YSB0aGF0IHRoZSBgd29ya2AgZnVuY3Rpb24gdXNlcyB3aGVuXG4gICAgICogY2FsbGVkIGJ5IHRoZSBTY2hlZHVsZXIuXG4gICAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBBIHN1YnNjcmlwdGlvbiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHVuc3Vic2NyaWJlXG4gICAgICogdGhlIHNjaGVkdWxlZCB3b3JrLlxuICAgICAqL1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAod29yaywgZGVsYXksIHN0YXRlKSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuU2NoZWR1bGVyQWN0aW9uKHRoaXMsIHdvcmspLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIubm93ID0gRGF0ZS5ub3cgPyBEYXRlLm5vdyA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICtuZXcgRGF0ZSgpOyB9O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KCkpO1xuZXhwb3J0cy5TY2hlZHVsZXIgPSBTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL09ic2VydmFibGUnKTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL1N1YnNjcmliZXInKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4vU3Vic2NyaXB0aW9uJyk7XG52YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMSA9IHJlcXVpcmUoJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcicpO1xudmFyIFN1YmplY3RTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4vU3ViamVjdFN1YnNjcmlwdGlvbicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJyk7XG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0U3Vic2NyaWJlcjxUPlxuICovXG52YXIgU3ViamVjdFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0U3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaWJlcihkZXN0aW5hdGlvbikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIFN1YmplY3RTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5TdWJqZWN0U3Vic2NyaWJlciA9IFN1YmplY3RTdWJzY3JpYmVyO1xuLyoqXG4gKiBAY2xhc3MgU3ViamVjdDxUPlxuICovXG52YXIgU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aHJvd25FcnJvciA9IG51bGw7XG4gICAgfVxuICAgIFN1YmplY3QucHJvdG90eXBlW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3ViamVjdFN1YnNjcmliZXIodGhpcyk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFub255bW91c1N1YmplY3QodGhpcywgdGhpcyk7XG4gICAgICAgIHN1YmplY3Qub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICB2YXIgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29weVtpXS5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aHJvd25FcnJvciA9IGVycjtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb3B5W2ldLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlcnMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb3B5W2ldLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlcnMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLl90cnlTdWJzY3JpYmUuY2FsbCh0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpcHRpb25fMS5TdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5hc09ic2VydmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKTtcbiAgICB9O1xuICAgIHJldHVybiBTdWJqZWN0O1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5TdWJqZWN0ID0gU3ViamVjdDtcbi8qKlxuICogQGNsYXNzIEFub255bW91c1N1YmplY3Q8VD5cbiAqL1xudmFyIEFub255bW91c1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbm9ueW1vdXNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24ubmV4dCkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24uZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFub255bW91c1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydHMuQW5vbnltb3VzU3ViamVjdCA9IEFub255bW91c1N1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdFN1YnNjcmlwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaXB0aW9uKHN1YmplY3QsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIFN1YmplY3RTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gc3ViamVjdC5vYnNlcnZlcnM7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IG51bGw7XG4gICAgICAgIGlmICghb2JzZXJ2ZXJzIHx8IG9ic2VydmVycy5sZW5ndGggPT09IDAgfHwgc3ViamVjdC5pc1N0b3BwZWQgfHwgc3ViamVjdC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaWJlckluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5zdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2Uoc3Vic2NyaWJlckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3RTdWJzY3JpcHRpb247XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJqZWN0U3Vic2NyaXB0aW9uID0gU3ViamVjdFN1YnNjcmlwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3RTdWJzY3JpcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKCcuL3V0aWwvaXNGdW5jdGlvbicpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpcHRpb24nKTtcbnZhciBPYnNlcnZlcl8xID0gcmVxdWlyZSgnLi9PYnNlcnZlcicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJyk7XG4vKipcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBPYnNlcnZlcn0gaW50ZXJmYWNlIGFuZCBleHRlbmRzIHRoZVxuICoge0BsaW5rIFN1YnNjcmlwdGlvbn0gY2xhc3MuIFdoaWxlIHRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGlzIHRoZSBwdWJsaWMgQVBJIGZvclxuICogY29uc3VtaW5nIHRoZSB2YWx1ZXMgb2YgYW4ge0BsaW5rIE9ic2VydmFibGV9LCBhbGwgT2JzZXJ2ZXJzIGdldCBjb252ZXJ0ZWQgdG9cbiAqIGEgU3Vic2NyaWJlciwgaW4gb3JkZXIgdG8gcHJvdmlkZSBTdWJzY3JpcHRpb24tbGlrZSBjYXBhYmlsaXRpZXMgc3VjaCBhc1xuICogYHVuc3Vic2NyaWJlYC4gU3Vic2NyaWJlciBpcyBhIGNvbW1vbiB0eXBlIGluIFJ4SlMsIGFuZCBjcnVjaWFsIGZvclxuICogaW1wbGVtZW50aW5nIG9wZXJhdG9ycywgYnV0IGl0IGlzIHJhcmVseSB1c2VkIGFzIGEgcHVibGljIEFQSS5cbiAqXG4gKiBAY2xhc3MgU3Vic2NyaWJlcjxUPlxuICovXG52YXIgU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYnNlcnZlcnxmdW5jdGlvbih2YWx1ZTogVCk6IHZvaWR9IFtkZXN0aW5hdGlvbk9yTmV4dF0gQSBwYXJ0aWFsbHlcbiAgICAgKiBkZWZpbmVkIE9ic2VydmVyIG9yIGEgYG5leHRgIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gVGhlIGBjb21wbGV0ZWAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gT2JzZXJ2ZXJfMS5lbXB0eTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoIWRlc3RpbmF0aW9uT3JOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXN0aW5hdGlvbk9yTmV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSEFDSyhiZW5sZXNoKTogVG8gcmVzb2x2ZSBhbiBpc3N1ZSB3aGVyZSBOb2RlIHVzZXJzIG1heSBoYXZlIG11bHRpcGxlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvcGllcyBvZiByeGpzIGluIHRoZWlyIG5vZGVfbW9kdWxlcyBkaXJlY3RvcnkuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RydXN0ZWRTdWJzY3JpYmVyKGRlc3RpbmF0aW9uT3JOZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRydXN0ZWRTdWJzY3JpYmVyID0gZGVzdGluYXRpb25Pck5leHRbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVzdGVkU3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gdHJ1c3RlZFN1YnNjcmliZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVzdGVkU3Vic2NyaWJlci5hZGQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNhZmVTdWJzY3JpYmVyKHRoaXMsIGRlc3RpbmF0aW9uT3JOZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNhZmVTdWJzY3JpYmVyKHRoaXMsIGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFN1YnNjcmliZXIucHJvdG90eXBlW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuICAgIC8qKlxuICAgICAqIEEgc3RhdGljIGZhY3RvcnkgZm9yIGEgU3Vic2NyaWJlciwgZ2l2ZW4gYSAocG90ZW50aWFsbHkgcGFydGlhbCkgZGVmaW5pdGlvblxuICAgICAqIG9mIGFuIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oeDogP1QpOiB2b2lkfSBbbmV4dF0gVGhlIGBuZXh0YCBjYWxsYmFjayBvZiBhbiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKGU6ID9hbnkpOiB2b2lkfSBbZXJyb3JdIFRoZSBgZXJyb3JgIGNhbGxiYWNrIG9mIGFuXG4gICAgICogT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbY29tcGxldGVdIFRoZSBgY29tcGxldGVgIGNhbGxiYWNrIG9mIGFuXG4gICAgICogT2JzZXJ2ZXIuXG4gICAgICogQHJldHVybiB7U3Vic2NyaWJlcjxUPn0gQSBTdWJzY3JpYmVyIHdyYXBwaW5nIHRoZSAocGFydGlhbGx5IGRlZmluZWQpXG4gICAgICogT2JzZXJ2ZXIgcmVwcmVzZW50ZWQgYnkgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBzdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgbm90aWZpY2F0aW9ucyBvZiB0eXBlIGBuZXh0YCBmcm9tXG4gICAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYSB2YWx1ZS4gVGhlIE9ic2VydmFibGUgbWF5IGNhbGwgdGhpcyBtZXRob2QgMCBvciBtb3JlXG4gICAgICogdGltZXMuXG4gICAgICogQHBhcmFtIHtUfSBbdmFsdWVdIFRoZSBgbmV4dGAgdmFsdWUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgZXJyb3JgIGZyb21cbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhbiBhdHRhY2hlZCB7QGxpbmsgRXJyb3J9LiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdFxuICAgICAqIHRoZSBPYnNlcnZhYmxlIGhhcyBleHBlcmllbmNlZCBhbiBlcnJvciBjb25kaXRpb24uXG4gICAgICogQHBhcmFtIHthbnl9IFtlcnJdIFRoZSBgZXJyb3JgIGV4Y2VwdGlvbi5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIGEgdmFsdWVsZXNzIG5vdGlmaWNhdGlvbiBvZiB0eXBlXG4gICAgICogYGNvbXBsZXRlYCBmcm9tIHRoZSBPYnNlcnZhYmxlLiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdCB0aGUgT2JzZXJ2YWJsZVxuICAgICAqIGhhcyBmaW5pc2hlZCBzZW5kaW5nIHB1c2gtYmFzZWQgbm90aWZpY2F0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmVBbmRSZWN5Y2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cztcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gX3BhcmVudDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IF9wYXJlbnRzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBTdWJzY3JpYmVyO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuU3Vic2NyaWJlciA9IFN1YnNjcmliZXI7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIFNhZmVTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIoX3BhcmVudFN1YnNjcmliZXIsIG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmliZXIgPSBfcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQubmV4dDtcbiAgICAgICAgICAgIGVycm9yID0gb2JzZXJ2ZXJPck5leHQuZXJyb3I7XG4gICAgICAgICAgICBjb21wbGV0ZSA9IG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyT3JOZXh0ICE9PSBPYnNlcnZlcl8xLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IE9iamVjdC5jcmVhdGUob2JzZXJ2ZXJPck5leHQpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihjb250ZXh0LnVuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChjb250ZXh0LnVuc3Vic2NyaWJlLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LnVuc3Vic2NyaWJlID0gdGhpcy51bnN1YnNjcmliZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLl9uZXh0ID0gbmV4dDtcbiAgICAgICAgdGhpcy5fZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5fY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgICB9XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCAmJiB0aGlzLl9uZXh0KSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9uZXh0LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5fZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9jb21wbGV0ZS5jYWxsKF90aGlzLl9jb250ZXh0KTsgfTtcbiAgICAgICAgICAgICAgICBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih3cmFwcGVkQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgd3JhcHBlZENvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JVbnN1YiA9IGZ1bmN0aW9uIChmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JTZXRFcnJvciA9IGZ1bmN0aW9uIChwYXJlbnQsIGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gU2FmZVN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmZ1bmN0aW9uIGlzVHJ1c3RlZFN1YnNjcmliZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFN1YnNjcmliZXIgfHwgKCdzeW5jRXJyb3JUaHJvd2FibGUnIGluIG9iaiAmJiBvYmpbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGlzQXJyYXlfMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0FycmF5Jyk7XG52YXIgaXNPYmplY3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9pc09iamVjdCcpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0Z1bmN0aW9uJyk7XG52YXIgdHJ5Q2F0Y2hfMSA9IHJlcXVpcmUoJy4vdXRpbC90cnlDYXRjaCcpO1xudmFyIGVycm9yT2JqZWN0XzEgPSByZXF1aXJlKCcuL3V0aWwvZXJyb3JPYmplY3QnKTtcbnZhciBVbnN1YnNjcmlwdGlvbkVycm9yXzEgPSByZXF1aXJlKCcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcicpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGlzcG9zYWJsZSByZXNvdXJjZSwgc3VjaCBhcyB0aGUgZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUuIEFcbiAqIFN1YnNjcmlwdGlvbiBoYXMgb25lIGltcG9ydGFudCBtZXRob2QsIGB1bnN1YnNjcmliZWAsIHRoYXQgdGFrZXMgbm8gYXJndW1lbnRcbiAqIGFuZCBqdXN0IGRpc3Bvc2VzIHRoZSByZXNvdXJjZSBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uXG4gKlxuICogQWRkaXRpb25hbGx5LCBzdWJzY3JpcHRpb25zIG1heSBiZSBncm91cGVkIHRvZ2V0aGVyIHRocm91Z2ggdGhlIGBhZGQoKWBcbiAqIG1ldGhvZCwgd2hpY2ggd2lsbCBhdHRhY2ggYSBjaGlsZCBTdWJzY3JpcHRpb24gdG8gdGhlIGN1cnJlbnQgU3Vic2NyaXB0aW9uLlxuICogV2hlbiBhIFN1YnNjcmlwdGlvbiBpcyB1bnN1YnNjcmliZWQsIGFsbCBpdHMgY2hpbGRyZW4gKGFuZCBpdHMgZ3JhbmRjaGlsZHJlbilcbiAqIHdpbGwgYmUgdW5zdWJzY3JpYmVkIGFzIHdlbGwuXG4gKlxuICogQGNsYXNzIFN1YnNjcmlwdGlvblxuICovXG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFt1bnN1YnNjcmliZV0gQSBmdW5jdGlvbiBkZXNjcmliaW5nIGhvdyB0b1xuICAgICAqIHBlcmZvcm0gdGhlIGRpc3Bvc2FsIG9mIHJlc291cmNlcyB3aGVuIHRoZSBgdW5zdWJzY3JpYmVgIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciB0aGlzIFN1YnNjcmlwdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHVuc3Vic2NyaWJlZC5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlcyB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHN1YnNjcmlwdGlvbi4gTWF5LCBmb3IgaW5zdGFuY2UsIGNhbmNlbFxuICAgICAqIGFuIG9uZ29pbmcgT2JzZXJ2YWJsZSBleGVjdXRpb24gb3IgY2FuY2VsIGFueSBvdGhlciB0eXBlIG9mIHdvcmsgdGhhdFxuICAgICAqIHN0YXJ0ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIHdhcyBjcmVhdGVkLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhhc0Vycm9ycyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JzO1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cywgX3Vuc3Vic2NyaWJlID0gX2EuX3Vuc3Vic2NyaWJlLCBfc3Vic2NyaXB0aW9ucyA9IF9hLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBudWxsO1xuICAgICAgICAvLyBudWxsIG91dCBfc3Vic2NyaXB0aW9ucyBmaXJzdCBzbyBhbnkgY2hpbGQgc3Vic2NyaXB0aW9ucyB0aGF0IGF0dGVtcHRcbiAgICAgICAgLy8gdG8gcmVtb3ZlIHRoZW1zZWx2ZXMgZnJvbSB0aGlzIHN1YnNjcmlwdGlvbiB3aWxsIG5vb3BcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICB2YXIgbGVuID0gX3BhcmVudHMgPyBfcGFyZW50cy5sZW5ndGggOiAwO1xuICAgICAgICAvLyBpZiB0aGlzLl9wYXJlbnQgaXMgbnVsbCwgdGhlbiBzbyBpcyB0aGlzLl9wYXJlbnRzLCBhbmQgd2VcbiAgICAgICAgLy8gZG9uJ3QgaGF2ZSB0byByZW1vdmUgb3Vyc2VsdmVzIGZyb20gYW55IHBhcmVudCBzdWJzY3JpcHRpb25zLlxuICAgICAgICB3aGlsZSAoX3BhcmVudCkge1xuICAgICAgICAgICAgX3BhcmVudC5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAvLyBpZiB0aGlzLl9wYXJlbnRzIGlzIG51bGwgb3IgaW5kZXggPj0gbGVuLFxuICAgICAgICAgICAgLy8gdGhlbiBfcGFyZW50IGlzIHNldCB0byBudWxsLCBhbmQgdGhlIGxvb3AgZXhpdHNcbiAgICAgICAgICAgIF9wYXJlbnQgPSArK2luZGV4IDwgbGVuICYmIF9wYXJlbnRzW2luZGV4XSB8fCBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihfdW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICB2YXIgdHJpYWwgPSB0cnlDYXRjaF8xLnRyeUNhdGNoKF91bnN1YnNjcmliZSkuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IChlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvciA/XG4gICAgICAgICAgICAgICAgICAgIGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUuZXJyb3JzKSA6IFtlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheV8xLmlzQXJyYXkoX3N1YnNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgbGVuID0gX3N1YnNjcmlwdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gX3N1YnNjcmlwdGlvbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdF8xLmlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyaWFsID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVyci5lcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0Vycm9ycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYSB0ZWFyIGRvd24gdG8gYmUgY2FsbGVkIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUoKSBvZiB0aGlzXG4gICAgICogU3Vic2NyaXB0aW9uLlxuICAgICAqXG4gICAgICogSWYgdGhlIHRlYXIgZG93biBiZWluZyBhZGRlZCBpcyBhIHN1YnNjcmlwdGlvbiB0aGF0IGlzIGFscmVhZHlcbiAgICAgKiB1bnN1YnNjcmliZWQsIGlzIHRoZSBzYW1lIHJlZmVyZW5jZSBgYWRkYCBpcyBiZWluZyBjYWxsZWQgb24sIG9yIGlzXG4gICAgICogYFN1YnNjcmlwdGlvbi5FTVBUWWAsIGl0IHdpbGwgbm90IGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzdWJzY3JpcHRpb24gaXMgYWxyZWFkeSBpbiBhbiBgY2xvc2VkYCBzdGF0ZSwgdGhlIHBhc3NlZFxuICAgICAqIHRlYXIgZG93biBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIGltbWVkaWF0ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUZWFyZG93bkxvZ2ljfSB0ZWFyZG93biBUaGUgYWRkaXRpb25hbCBsb2dpYyB0byBleGVjdXRlIG9uXG4gICAgICogdGVhcmRvd24uXG4gICAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBSZXR1cm5zIHRoZSBTdWJzY3JpcHRpb24gdXNlZCBvciBjcmVhdGVkIHRvIGJlXG4gICAgICogYWRkZWQgdG8gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnMgbGlzdC4gVGhpcyBTdWJzY3JpcHRpb24gY2FuIGJlIHVzZWQgd2l0aFxuICAgICAqIGByZW1vdmUoKWAgdG8gcmVtb3ZlIHRoZSBwYXNzZWQgdGVhcmRvd24gbG9naWMgZnJvbSB0aGUgaW5uZXIgc3Vic2NyaXB0aW9uc1xuICAgICAqIGxpc3QuXG4gICAgICovXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgaWYgKCF0ZWFyZG93biB8fCAodGVhcmRvd24gPT09IFN1YnNjcmlwdGlvbi5FTVBUWSkpIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlYXJkb3duID09PSB0aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGVhcmRvd247XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHRlYXJkb3duKSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0ZWFyZG93bik7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24uY2xvc2VkIHx8IHR5cGVvZiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzdWJzY3JpcHRpb24uX2FkZFBhcmVudCAhPT0gJ2Z1bmN0aW9uJyAvKiBxdWFjayBxdWFjayAqLykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5fc3Vic2NyaXB0aW9ucyA9IFt0bXBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdGVhcmRvd24gJyArIHRlYXJkb3duICsgJyBhZGRlZCB0byBTdWJzY3JpcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zIHx8ICh0aGlzLl9zdWJzY3JpcHRpb25zID0gW10pO1xuICAgICAgICBzdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgU3Vic2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsIGxpc3Qgb2Ygc3Vic2NyaXB0aW9ucyB0aGF0IHdpbGxcbiAgICAgKiB1bnN1YnNjcmliZSBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlIHByb2Nlc3Mgb2YgdGhpcyBTdWJzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIHtTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvbiBUaGUgc3Vic2NyaXB0aW9uIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmlwdGlvbnM7XG4gICAgICAgIGlmIChzdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uSW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zLnNwbGljZShzdWJzY3JpcHRpb25JbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2FkZFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudCA9IF9hLl9wYXJlbnQsIF9wYXJlbnRzID0gX2EuX3BhcmVudHM7XG4gICAgICAgIGlmICghX3BhcmVudCB8fCBfcGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBwYXJlbnQsIG9yIHRoZSBuZXcgcGFyZW50IGlzIHRoZSBzYW1lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBwYXJlbnQsIHRoZW4gc2V0IHRoaXMuX3BhcmVudCB0byB0aGUgbmV3IHBhcmVudC5cbiAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghX3BhcmVudHMpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYWxyZWFkeSBvbmUgcGFyZW50LCBidXQgbm90IG11bHRpcGxlLCBhbGxvY2F0ZSBhbiBBcnJheSB0b1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHJlc3Qgb2YgdGhlIHBhcmVudCBTdWJzY3JpcHRpb25zLlxuICAgICAgICAgICAgdGhpcy5fcGFyZW50cyA9IFtwYXJlbnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9wYXJlbnRzLmluZGV4T2YocGFyZW50KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYWRkIHRoZSBuZXcgcGFyZW50IHRvIHRoZSBfcGFyZW50cyBsaXN0IGlmIGl0J3Mgbm90IGFscmVhZHkgdGhlcmUuXG4gICAgICAgICAgICBfcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoZW1wdHkpIHtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0obmV3IFN1YnNjcmlwdGlvbigpKSk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnRzLlN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbjtcbmZ1bmN0aW9uIGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnJvcnMpIHtcbiAgICByZXR1cm4gZXJyb3JzLnJlZHVjZShmdW5jdGlvbiAoZXJycywgZXJyKSB7IHJldHVybiBlcnJzLmNvbmNhdCgoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IpID8gZXJyLmVycm9ycyA6IGVycik7IH0sIFtdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi8uLi9PYnNlcnZhYmxlJyk7XG52YXIgZGVsYXlfMSA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdG9yL2RlbGF5Jyk7XG5PYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVsYXkgPSBkZWxheV8xLmRlbGF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVsYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vLi4vT2JzZXJ2YWJsZScpO1xudmFyIGV4cGFuZF8xID0gcmVxdWlyZSgnLi4vLi4vb3BlcmF0b3IvZXhwYW5kJyk7XG5PYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZXhwYW5kID0gZXhwYW5kXzEuZXhwYW5kO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhwYW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2YWJsZScpO1xudmFyIFNjYWxhck9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vU2NhbGFyT2JzZXJ2YWJsZScpO1xudmFyIEVtcHR5T2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9FbXB0eU9ic2VydmFibGUnKTtcbnZhciBpc1NjaGVkdWxlcl8xID0gcmVxdWlyZSgnLi4vdXRpbC9pc1NjaGVkdWxlcicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbnZhciBBcnJheU9ic2VydmFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBcnJheU9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXJyYXlPYnNlcnZhYmxlKGFycmF5LCBzY2hlZHVsZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIGlmICghc2NoZWR1bGVyICYmIGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGFycmF5WzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFycmF5T2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoYXJyYXksIHNjaGVkdWxlcikge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShhcnJheSwgc2NoZWR1bGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHNvbWUgdmFsdWVzIHlvdSBzcGVjaWZ5IGFzIGFyZ3VtZW50cyxcbiAgICAgKiBpbW1lZGlhdGVseSBvbmUgYWZ0ZXIgdGhlIG90aGVyLCBhbmQgdGhlbiBlbWl0cyBhIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyB0aGUgYXJndW1lbnRzIHlvdSBwcm92aWRlLCB0aGVuIGNvbXBsZXRlcy5cbiAgICAgKiA8L3NwYW4+XG4gICAgICpcbiAgICAgKiA8aW1nIHNyYz1cIi4vaW1nL29mLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgICAqXG4gICAgICogVGhpcyBzdGF0aWMgb3BlcmF0b3IgaXMgdXNlZnVsIGZvciBjcmVhdGluZyBhIHNpbXBsZSBPYnNlcnZhYmxlIHRoYXQgb25seVxuICAgICAqIGVtaXRzIHRoZSBhcmd1bWVudHMgZ2l2ZW4sIGFuZCB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uIHRoZXJlYWZ0ZXIuIEl0IGNhblxuICAgICAqIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyIE9ic2VydmFibGVzLCBzdWNoIGFzIHdpdGgge0BsaW5rIGNvbmNhdH0uXG4gICAgICogQnkgZGVmYXVsdCwgaXQgdXNlcyBhIGBudWxsYCBJU2NoZWR1bGVyLCB3aGljaCBtZWFucyB0aGUgYG5leHRgXG4gICAgICogbm90aWZpY2F0aW9ucyBhcmUgc2VudCBzeW5jaHJvbm91c2x5LCBhbHRob3VnaCB3aXRoIGEgZGlmZmVyZW50IElTY2hlZHVsZXJcbiAgICAgKiBpdCBpcyBwb3NzaWJsZSB0byBkZXRlcm1pbmUgd2hlbiB0aG9zZSBub3RpZmljYXRpb25zIHdpbGwgYmUgZGVsaXZlcmVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCAxMCwgMjAsIDMwLCB0aGVuICdhJywgJ2InLCAnYycsIHRoZW4gc3RhcnQgdGlja2luZyBldmVyeSBzZWNvbmQuPC9jYXB0aW9uPlxuICAgICAqIHZhciBudW1iZXJzID0gUnguT2JzZXJ2YWJsZS5vZigxMCwgMjAsIDMwKTtcbiAgICAgKiB2YXIgbGV0dGVycyA9IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJyk7XG4gICAgICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAgICAgKiB2YXIgcmVzdWx0ID0gbnVtYmVycy5jb25jYXQobGV0dGVycykuY29uY2F0KGludGVydmFsKTtcbiAgICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgICAqIEBzZWUge0BsaW5rIGVtcHR5fVxuICAgICAqIEBzZWUge0BsaW5rIG5ldmVyfVxuICAgICAqIEBzZWUge0BsaW5rIHRocm93fVxuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5UfSB2YWx1ZXMgQXJndW1lbnRzIHRoYXQgcmVwcmVzZW50IGBuZXh0YCB2YWx1ZXMgdG8gYmUgZW1pdHRlZC5cbiAgICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgSVNjaGVkdWxlcn0gdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAgICogdGhlIGVtaXNzaW9ucyBvZiB0aGUgYG5leHRgIG5vdGlmaWNhdGlvbnMuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGVhY2ggZ2l2ZW4gaW5wdXQgdmFsdWUuXG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgb2ZcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEFycmF5T2JzZXJ2YWJsZS5vZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2NoZWR1bGVyID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChpc1NjaGVkdWxlcl8xLmlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICAgICAgICAgIGFycmF5LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NoZWR1bGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGUoYXJyYXksIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNjYWxhck9ic2VydmFibGVfMS5TY2FsYXJPYnNlcnZhYmxlKGFycmF5WzBdLCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGVfMS5FbXB0eU9ic2VydmFibGUoc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXJyYXlPYnNlcnZhYmxlLmRpc3BhdGNoID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBhcnJheSA9IHN0YXRlLmFycmF5LCBpbmRleCA9IHN0YXRlLmluZGV4LCBjb3VudCA9IHN0YXRlLmNvdW50LCBzdWJzY3JpYmVyID0gc3RhdGUuc3Vic2NyaWJlcjtcbiAgICAgICAgaWYgKGluZGV4ID49IGNvdW50KSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2luZGV4XSk7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHN0YXRlKTtcbiAgICB9O1xuICAgIEFycmF5T2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIHZhciBjb3VudCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKEFycmF5T2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwge1xuICAgICAgICAgICAgICAgIGFycmF5OiBhcnJheSwgaW5kZXg6IGluZGV4LCBjb3VudDogY291bnQsIHN1YnNjcmliZXI6IHN1YnNjcmliZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBcnJheU9ic2VydmFibGU7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLkFycmF5T2JzZXJ2YWJsZSA9IEFycmF5T2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFycmF5T2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL09ic2VydmFibGUnKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG52YXIgRW1wdHlPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRW1wdHlPYnNlcnZhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEVtcHR5T2JzZXJ2YWJsZShzY2hlZHVsZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBubyBpdGVtcyB0byB0aGUgT2JzZXJ2ZXIgYW5kIGltbWVkaWF0ZWx5XG4gICAgICogZW1pdHMgYSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SnVzdCBlbWl0cyAnY29tcGxldGUnLCBhbmQgbm90aGluZyBlbHNlLlxuICAgICAqIDwvc3Bhbj5cbiAgICAgKlxuICAgICAqIDxpbWcgc3JjPVwiLi9pbWcvZW1wdHkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICpcbiAgICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBvbmx5XG4gICAgICogZW1pdHMgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyXG4gICAgICogT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgaW4gYSB7QGxpbmsgbWVyZ2VNYXB9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gY29tcGxldGUuPC9jYXB0aW9uPlxuICAgICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmVtcHR5KCkuc3RhcnRXaXRoKDcpO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgYW5kIGZsYXR0ZW4gb25seSBvZGQgbnVtYmVycyB0byB0aGUgc2VxdWVuY2UgJ2EnLCAnYicsICdjJzwvY2FwdGlvbj5cbiAgICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgICAqIHZhciByZXN1bHQgPSBpbnRlcnZhbC5tZXJnZU1hcCh4ID0+XG4gICAgICogICB4ICUgMiA9PT0gMSA/IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJykgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAgICAgKiApO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmcgdG8gdGhlIGNvbnNvbGU6XG4gICAgICogLy8geCBpcyBlcXVhbCB0byB0aGUgY291bnQgb24gdGhlIGludGVydmFsIGVnKDAsMSwyLDMsLi4uKVxuICAgICAqIC8vIHggd2lsbCBvY2N1ciBldmVyeSAxMDAwbXNcbiAgICAgKiAvLyBpZiB4ICUgMiBpcyBlcXVhbCB0byAxIHByaW50IGFiY1xuICAgICAqIC8vIGlmIHggJSAyIGlzIG5vdCBlcXVhbCB0byAxIG5vdGhpbmcgd2lsbCBiZSBvdXRwdXRcbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICAgKiBAc2VlIHtAbGluayBuZXZlcn1cbiAgICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICAgKiBAc2VlIHtAbGluayB0aHJvd31cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBJU2NoZWR1bGVyfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICAgKiB0aGUgZW1pc3Npb24gb2YgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBcImVtcHR5XCIgT2JzZXJ2YWJsZTogZW1pdHMgb25seSB0aGUgY29tcGxldGVcbiAgICAgKiBub3RpZmljYXRpb24uXG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgZW1wdHlcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEVtcHR5T2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlKHNjaGVkdWxlcik7XG4gICAgfTtcbiAgICBFbXB0eU9ic2VydmFibGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gYXJnLnN1YnNjcmliZXI7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9O1xuICAgIEVtcHR5T2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShFbXB0eU9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHsgc3Vic2NyaWJlcjogc3Vic2NyaWJlciB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEVtcHR5T2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuRW1wdHlPYnNlcnZhYmxlID0gRW1wdHlPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2YWJsZScpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbnZhciBTY2FsYXJPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2NhbGFyT2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTY2FsYXJPYnNlcnZhYmxlKHZhbHVlLCBzY2hlZHVsZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBTY2FsYXJPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2NhbGFyT2JzZXJ2YWJsZSh2YWx1ZSwgc2NoZWR1bGVyKTtcbiAgICB9O1xuICAgIFNjYWxhck9ic2VydmFibGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGRvbmUgPSBzdGF0ZS5kb25lLCB2YWx1ZSA9IHN0YXRlLnZhbHVlLCBzdWJzY3JpYmVyID0gc3RhdGUuc3Vic2NyaWJlcjtcbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5kb25lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShzdGF0ZSk7XG4gICAgfTtcbiAgICBTY2FsYXJPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKFNjYWxhck9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHtcbiAgICAgICAgICAgICAgICBkb25lOiBmYWxzZSwgdmFsdWU6IHZhbHVlLCBzdWJzY3JpYmVyOiBzdWJzY3JpYmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU2NhbGFyT2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuU2NhbGFyT2JzZXJ2YWJsZSA9IFNjYWxhck9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TY2FsYXJPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEFycmF5T2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9BcnJheU9ic2VydmFibGUnKTtcbmV4cG9ydHMub2YgPSBBcnJheU9ic2VydmFibGVfMS5BcnJheU9ic2VydmFibGUub2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBhc3luY18xID0gcmVxdWlyZSgnLi4vc2NoZWR1bGVyL2FzeW5jJyk7XG52YXIgZGVsYXlfMSA9IHJlcXVpcmUoJy4uL29wZXJhdG9ycy9kZWxheScpO1xuLyoqXG4gKiBEZWxheXMgdGhlIGVtaXNzaW9uIG9mIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IGEgZ2l2ZW4gdGltZW91dCBvclxuICogdW50aWwgYSBnaXZlbiBEYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UaW1lIHNoaWZ0cyBlYWNoIGl0ZW0gYnkgc29tZSBzcGVjaWZpZWQgYW1vdW50IG9mXG4gKiBtaWxsaXNlY29uZHMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZGVsYXkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogSWYgdGhlIGRlbGF5IGFyZ3VtZW50IGlzIGEgTnVtYmVyLCB0aGlzIG9wZXJhdG9yIHRpbWUgc2hpZnRzIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhhdCBhbW91bnQgb2YgdGltZSBleHByZXNzZWQgaW4gbWlsbGlzZWNvbmRzLiBUaGUgcmVsYXRpdmVcbiAqIHRpbWUgaW50ZXJ2YWxzIGJldHdlZW4gdGhlIHZhbHVlcyBhcmUgcHJlc2VydmVkLlxuICpcbiAqIElmIHRoZSBkZWxheSBhcmd1bWVudCBpcyBhIERhdGUsIHRoaXMgb3BlcmF0b3IgdGltZSBzaGlmdHMgdGhlIHN0YXJ0IG9mIHRoZVxuICogT2JzZXJ2YWJsZSBleGVjdXRpb24gdW50aWwgdGhlIGdpdmVuIGRhdGUgb2NjdXJzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkRlbGF5IGVhY2ggY2xpY2sgYnkgb25lIHNlY29uZDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgZGVsYXllZENsaWNrcyA9IGNsaWNrcy5kZWxheSgxMDAwKTsgLy8gZWFjaCBjbGljayBlbWl0dGVkIGFmdGVyIDEgc2Vjb25kXG4gKiBkZWxheWVkQ2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5EZWxheSBhbGwgY2xpY2tzIHVudGlsIGEgZnV0dXJlIGRhdGUgaGFwcGVuczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgZGF0ZSA9IG5ldyBEYXRlKCdNYXJjaCAxNSwgMjA1MCAxMjowMDowMCcpOyAvLyBpbiB0aGUgZnV0dXJlXG4gKiB2YXIgZGVsYXllZENsaWNrcyA9IGNsaWNrcy5kZWxheShkYXRlKTsgLy8gY2xpY2sgZW1pdHRlZCBvbmx5IGFmdGVyIHRoYXQgZGF0ZVxuICogZGVsYXllZENsaWNrcy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZGVib3VuY2VUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVsYXlXaGVufVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfERhdGV9IGRlbGF5IFRoZSBkZWxheSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgKGEgYG51bWJlcmApIG9yXG4gKiBhIGBEYXRlYCB1bnRpbCB3aGljaCB0aGUgZW1pc3Npb24gb2YgdGhlIHNvdXJjZSBpdGVtcyBpcyBkZWxheWVkLlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSBJU2NoZWR1bGVyIHRvIHVzZSBmb3JcbiAqIG1hbmFnaW5nIHRoZSB0aW1lcnMgdGhhdCBoYW5kbGUgdGhlIHRpbWUtc2hpZnQgZm9yIGVhY2ggaXRlbS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBkZWxheXMgdGhlIGVtaXNzaW9ucyBvZiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGJ5IHRoZSBzcGVjaWZpZWQgdGltZW91dCBvciBEYXRlLlxuICogQG1ldGhvZCBkZWxheVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gZGVsYXkoZGVsYXksIHNjaGVkdWxlcikge1xuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jOyB9XG4gICAgcmV0dXJuIGRlbGF5XzEuZGVsYXkoZGVsYXksIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWxheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBleHBhbmRfMSA9IHJlcXVpcmUoJy4uL29wZXJhdG9ycy9leHBhbmQnKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHByb2plY3RzIGVhY2ggc291cmNlIHZhbHVlIHRvIGFuIE9ic2VydmFibGUgd2hpY2ggaXMgbWVyZ2VkIGluXG4gKiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3Mgc2ltaWxhciB0byB7QGxpbmsgbWVyZ2VNYXB9LCBidXQgYXBwbGllcyB0aGVcbiAqIHByb2plY3Rpb24gZnVuY3Rpb24gdG8gZXZlcnkgc291cmNlIHZhbHVlIGFzIHdlbGwgYXMgZXZlcnkgb3V0cHV0IHZhbHVlLlxuICogSXQncyByZWN1cnNpdmUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZXhwYW5kLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGJhc2VkIG9uIGFwcGx5aW5nIGEgZnVuY3Rpb24gdGhhdCB5b3VcbiAqIHN1cHBseSB0byBlYWNoIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHdoZXJlIHRoYXQgZnVuY3Rpb25cbiAqIHJldHVybnMgYW4gT2JzZXJ2YWJsZSwgYW5kIHRoZW4gbWVyZ2luZyB0aG9zZSByZXN1bHRpbmcgT2JzZXJ2YWJsZXMgYW5kXG4gKiBlbWl0dGluZyB0aGUgcmVzdWx0cyBvZiB0aGlzIG1lcmdlci4gKkV4cGFuZCogd2lsbCByZS1lbWl0IG9uIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgZXZlcnkgc291cmNlIHZhbHVlLiBUaGVuLCBlYWNoIG91dHB1dCB2YWx1ZSBpcyBnaXZlbiB0byB0aGVcbiAqIGBwcm9qZWN0YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIGlubmVyIE9ic2VydmFibGUgdG8gYmUgbWVyZ2VkIG9uIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUuIFRob3NlIG91dHB1dCB2YWx1ZXMgcmVzdWx0aW5nIGZyb20gdGhlIHByb2plY3Rpb24gYXJlIGFsc29cbiAqIGdpdmVuIHRvIHRoZSBgcHJvamVjdGAgZnVuY3Rpb24gdG8gcHJvZHVjZSBuZXcgb3V0cHV0IHZhbHVlcy4gVGhpcyBpcyBob3dcbiAqICpleHBhbmQqIGJlaGF2ZXMgcmVjdXJzaXZlbHkuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U3RhcnQgZW1pdHRpbmcgdGhlIHBvd2VycyBvZiB0d28gb24gZXZlcnkgY2xpY2ssIGF0IG1vc3QgMTAgb2YgdGhlbTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG93ZXJzT2ZUd28gPSBjbGlja3NcbiAqICAgLm1hcFRvKDEpXG4gKiAgIC5leHBhbmQoeCA9PiBSeC5PYnNlcnZhYmxlLm9mKDIgKiB4KS5kZWxheSgxMDAwKSlcbiAqICAgLnRha2UoMTApO1xuICogcG93ZXJzT2ZUd28uc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VTY2FufVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IE9ic2VydmFibGV9IHByb2plY3QgQSBmdW5jdGlvblxuICogdGhhdCwgd2hlbiBhcHBsaWVkIHRvIGFuIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIG9yIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSxcbiAqIHJldHVybnMgYW4gT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPW51bGxdIFRoZSBJU2NoZWR1bGVyIHRvIHVzZSBmb3Igc3Vic2NyaWJpbmcgdG9cbiAqIGVhY2ggcHJvamVjdGVkIGlubmVyIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHNvdXJjZSB2YWx1ZXMgYW5kIGFsc29cbiAqIHJlc3VsdCBvZiBhcHBseWluZyB0aGUgcHJvamVjdGlvbiBmdW5jdGlvbiB0byBlYWNoIHZhbHVlIGVtaXR0ZWQgb24gdGhlXG4gKiBvdXRwdXQgT2JzZXJ2YWJsZSBhbmQgYW5kIG1lcmdpbmcgdGhlIHJlc3VsdHMgb2YgdGhlIE9ic2VydmFibGVzIG9idGFpbmVkXG4gKiBmcm9tIHRoaXMgdHJhbnNmb3JtYXRpb24uXG4gKiBAbWV0aG9kIGV4cGFuZFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gZXhwYW5kKHByb2plY3QsIGNvbmN1cnJlbnQsIHNjaGVkdWxlcikge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTsgfVxuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSB1bmRlZmluZWQ7IH1cbiAgICBjb25jdXJyZW50ID0gKGNvbmN1cnJlbnQgfHwgMCkgPCAxID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDogY29uY3VycmVudDtcbiAgICByZXR1cm4gZXhwYW5kXzEuZXhwYW5kKHByb2plY3QsIGNvbmN1cnJlbnQsIHNjaGVkdWxlcikodGhpcyk7XG59XG5leHBvcnRzLmV4cGFuZCA9IGV4cGFuZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4cGFuZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKCcuLi9zY2hlZHVsZXIvYXN5bmMnKTtcbnZhciBpc0RhdGVfMSA9IHJlcXVpcmUoJy4uL3V0aWwvaXNEYXRlJyk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xudmFyIE5vdGlmaWNhdGlvbl8xID0gcmVxdWlyZSgnLi4vTm90aWZpY2F0aW9uJyk7XG4vKipcbiAqIERlbGF5cyB0aGUgZW1pc3Npb24gb2YgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgYSBnaXZlbiB0aW1lb3V0IG9yXG4gKiB1bnRpbCBhIGdpdmVuIERhdGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlRpbWUgc2hpZnRzIGVhY2ggaXRlbSBieSBzb21lIHNwZWNpZmllZCBhbW91bnQgb2ZcbiAqIG1pbGxpc2Vjb25kcy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kZWxheS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBJZiB0aGUgZGVsYXkgYXJndW1lbnQgaXMgYSBOdW1iZXIsIHRoaXMgb3BlcmF0b3IgdGltZSBzaGlmdHMgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBieSB0aGF0IGFtb3VudCBvZiB0aW1lIGV4cHJlc3NlZCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZWxhdGl2ZVxuICogdGltZSBpbnRlcnZhbHMgYmV0d2VlbiB0aGUgdmFsdWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKlxuICogSWYgdGhlIGRlbGF5IGFyZ3VtZW50IGlzIGEgRGF0ZSwgdGhpcyBvcGVyYXRvciB0aW1lIHNoaWZ0cyB0aGUgc3RhcnQgb2YgdGhlXG4gKiBPYnNlcnZhYmxlIGV4ZWN1dGlvbiB1bnRpbCB0aGUgZ2l2ZW4gZGF0ZSBvY2N1cnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RGVsYXkgZWFjaCBjbGljayBieSBvbmUgc2Vjb25kPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5KDEwMDApOyAvLyBlYWNoIGNsaWNrIGVtaXR0ZWQgYWZ0ZXIgMSBzZWNvbmRcbiAqIGRlbGF5ZWRDbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkRlbGF5IGFsbCBjbGlja3MgdW50aWwgYSBmdXR1cmUgZGF0ZSBoYXBwZW5zPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBkYXRlID0gbmV3IERhdGUoJ01hcmNoIDE1LCAyMDUwIDEyOjAwOjAwJyk7IC8vIGluIHRoZSBmdXR1cmVcbiAqIHZhciBkZWxheWVkQ2xpY2tzID0gY2xpY2tzLmRlbGF5KGRhdGUpOyAvLyBjbGljayBlbWl0dGVkIG9ubHkgYWZ0ZXIgdGhhdCBkYXRlXG4gKiBkZWxheWVkQ2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZVRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gZGVsYXkgVGhlIGRlbGF5IGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyAoYSBgbnVtYmVyYCkgb3JcbiAqIGEgYERhdGVgIHVudGlsIHdoaWNoIHRoZSBlbWlzc2lvbiBvZiB0aGUgc291cmNlIGl0ZW1zIGlzIGRlbGF5ZWQuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIElTY2hlZHVsZXIgdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgdGltZS1zaGlmdCBmb3IgZWFjaCBpdGVtLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgdGhlIHNwZWNpZmllZCB0aW1lb3V0IG9yIERhdGUuXG4gKiBAbWV0aG9kIGRlbGF5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBkZWxheShkZWxheSwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmM7IH1cbiAgICB2YXIgYWJzb2x1dGVEZWxheSA9IGlzRGF0ZV8xLmlzRGF0ZShkZWxheSk7XG4gICAgdmFyIGRlbGF5Rm9yID0gYWJzb2x1dGVEZWxheSA/ICgrZGVsYXkgLSBzY2hlZHVsZXIubm93KCkpIDogTWF0aC5hYnMoZGVsYXkpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7IHJldHVybiBzb3VyY2UubGlmdChuZXcgRGVsYXlPcGVyYXRvcihkZWxheUZvciwgc2NoZWR1bGVyKSk7IH07XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG52YXIgRGVsYXlPcGVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVsYXlPcGVyYXRvcihkZWxheSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgfVxuICAgIERlbGF5T3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBEZWxheVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kZWxheSwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWxheU9wZXJhdG9yO1xufSgpKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgRGVsYXlTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRGVsYXlTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERlbGF5U3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgZGVsYXksIHNjaGVkdWxlcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcnJvcmVkID0gZmFsc2U7XG4gICAgfVxuICAgIERlbGF5U3Vic2NyaWJlci5kaXNwYXRjaCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB2YXIgc291cmNlID0gc3RhdGUuc291cmNlO1xuICAgICAgICB2YXIgcXVldWUgPSBzb3VyY2UucXVldWU7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSBzdGF0ZS5zY2hlZHVsZXI7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHN0YXRlLmRlc3RpbmF0aW9uO1xuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCAmJiAocXVldWVbMF0udGltZSAtIHNjaGVkdWxlci5ub3coKSkgPD0gMCkge1xuICAgICAgICAgICAgcXVldWUuc2hpZnQoKS5ub3RpZmljYXRpb24ub2JzZXJ2ZShkZXN0aW5hdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBkZWxheV8xID0gTWF0aC5tYXgoMCwgcXVldWVbMF0udGltZSAtIHNjaGVkdWxlci5ub3coKSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHN0YXRlLCBkZWxheV8xKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVsYXlTdWJzY3JpYmVyLnByb3RvdHlwZS5fc2NoZWR1bGUgPSBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKERlbGF5U3Vic2NyaWJlci5kaXNwYXRjaCwgdGhpcy5kZWxheSwge1xuICAgICAgICAgICAgc291cmNlOiB0aGlzLCBkZXN0aW5hdGlvbjogdGhpcy5kZXN0aW5hdGlvbiwgc2NoZWR1bGVyOiBzY2hlZHVsZXJcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgRGVsYXlTdWJzY3JpYmVyLnByb3RvdHlwZS5zY2hlZHVsZU5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgRGVsYXlNZXNzYWdlKHNjaGVkdWxlci5ub3coKSArIHRoaXMuZGVsYXksIG5vdGlmaWNhdGlvbik7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChtZXNzYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVsYXlTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbl8xLk5vdGlmaWNhdGlvbi5jcmVhdGVOZXh0KHZhbHVlKSk7XG4gICAgfTtcbiAgICBEZWxheVN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5lcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgfTtcbiAgICBEZWxheVN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25fMS5Ob3RpZmljYXRpb24uY3JlYXRlQ29tcGxldGUoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVsYXlTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xudmFyIERlbGF5TWVzc2FnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVsYXlNZXNzYWdlKHRpbWUsIG5vdGlmaWNhdGlvbikge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIERlbGF5TWVzc2FnZTtcbn0oKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWxheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIHRyeUNhdGNoXzEgPSByZXF1aXJlKCcuLi91dGlsL3RyeUNhdGNoJyk7XG52YXIgZXJyb3JPYmplY3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvZXJyb3JPYmplY3QnKTtcbnZhciBPdXRlclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL091dGVyU3Vic2NyaWJlcicpO1xudmFyIHN1YnNjcmliZVRvUmVzdWx0XzEgPSByZXF1aXJlKCcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0Jyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBSZWN1cnNpdmVseSBwcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byBhbiBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBpblxuICogdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIHNpbWlsYXIgdG8ge0BsaW5rIG1lcmdlTWFwfSwgYnV0IGFwcGxpZXMgdGhlXG4gKiBwcm9qZWN0aW9uIGZ1bmN0aW9uIHRvIGV2ZXJ5IHNvdXJjZSB2YWx1ZSBhcyB3ZWxsIGFzIGV2ZXJ5IG91dHB1dCB2YWx1ZS5cbiAqIEl0J3MgcmVjdXJzaXZlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2V4cGFuZC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUsIGFuZCB0aGVuIG1lcmdpbmcgdGhvc2UgcmVzdWx0aW5nIE9ic2VydmFibGVzIGFuZFxuICogZW1pdHRpbmcgdGhlIHJlc3VsdHMgb2YgdGhpcyBtZXJnZXIuICpFeHBhbmQqIHdpbGwgcmUtZW1pdCBvbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlIGV2ZXJ5IHNvdXJjZSB2YWx1ZS4gVGhlbiwgZWFjaCBvdXRwdXQgdmFsdWUgaXMgZ2l2ZW4gdG8gdGhlXG4gKiBgcHJvamVjdGAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBpbm5lciBPYnNlcnZhYmxlIHRvIGJlIG1lcmdlZCBvbiB0aGVcbiAqIG91dHB1dCBPYnNlcnZhYmxlLiBUaG9zZSBvdXRwdXQgdmFsdWVzIHJlc3VsdGluZyBmcm9tIHRoZSBwcm9qZWN0aW9uIGFyZSBhbHNvXG4gKiBnaXZlbiB0byB0aGUgYHByb2plY3RgIGZ1bmN0aW9uIHRvIHByb2R1Y2UgbmV3IG91dHB1dCB2YWx1ZXMuIFRoaXMgaXMgaG93XG4gKiAqZXhwYW5kKiBiZWhhdmVzIHJlY3Vyc2l2ZWx5LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlN0YXJ0IGVtaXR0aW5nIHRoZSBwb3dlcnMgb2YgdHdvIG9uIGV2ZXJ5IGNsaWNrLCBhdCBtb3N0IDEwIG9mIHRoZW08L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBvd2Vyc09mVHdvID0gY2xpY2tzXG4gKiAgIC5tYXBUbygxKVxuICogICAuZXhwYW5kKHggPT4gUnguT2JzZXJ2YWJsZS5vZigyICogeCkuZGVsYXkoMTAwMCkpXG4gKiAgIC50YWtlKDEwKTtcbiAqIHBvd2Vyc09mVHdvLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlfSBwcm9qZWN0IEEgZnVuY3Rpb25cbiAqIHRoYXQsIHdoZW4gYXBwbGllZCB0byBhbiBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBvciB0aGUgb3V0cHV0IE9ic2VydmFibGUsXG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbnB1dFxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1udWxsXSBUaGUgSVNjaGVkdWxlciB0byB1c2UgZm9yIHN1YnNjcmliaW5nIHRvXG4gKiBlYWNoIHByb2plY3RlZCBpbm5lciBPYnNlcnZhYmxlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBzb3VyY2UgdmFsdWVzIGFuZCBhbHNvXG4gKiByZXN1bHQgb2YgYXBwbHlpbmcgdGhlIHByb2plY3Rpb24gZnVuY3Rpb24gdG8gZWFjaCB2YWx1ZSBlbWl0dGVkIG9uIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUgYW5kIGFuZCBtZXJnaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBPYnNlcnZhYmxlcyBvYnRhaW5lZFxuICogZnJvbSB0aGlzIHRyYW5zZm9ybWF0aW9uLlxuICogQG1ldGhvZCBleHBhbmRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZChwcm9qZWN0LCBjb25jdXJyZW50LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7IH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gdW5kZWZpbmVkOyB9XG4gICAgY29uY3VycmVudCA9IChjb25jdXJyZW50IHx8IDApIDwgMSA/IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA6IGNvbmN1cnJlbnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBFeHBhbmRPcGVyYXRvcihwcm9qZWN0LCBjb25jdXJyZW50LCBzY2hlZHVsZXIpKTsgfTtcbn1cbmV4cG9ydHMuZXhwYW5kID0gZXhwYW5kO1xudmFyIEV4cGFuZE9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFeHBhbmRPcGVyYXRvcihwcm9qZWN0LCBjb25jdXJyZW50LCBzY2hlZHVsZXIpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5jb25jdXJyZW50ID0gY29uY3VycmVudDtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgfVxuICAgIEV4cGFuZE9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRXhwYW5kU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByb2plY3QsIHRoaXMuY29uY3VycmVudCwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgICB9O1xuICAgIHJldHVybiBFeHBhbmRPcGVyYXRvcjtcbn0oKSk7XG5leHBvcnRzLkV4cGFuZE9wZXJhdG9yID0gRXhwYW5kT3BlcmF0b3I7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIEV4cGFuZFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFeHBhbmRTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEV4cGFuZFN1YnNjcmliZXIoZGVzdGluYXRpb24sIHByb2plY3QsIGNvbmN1cnJlbnQsIHNjaGVkdWxlcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuY29uY3VycmVudCA9IGNvbmN1cnJlbnQ7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSAwO1xuICAgICAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoY29uY3VycmVudCA8IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBFeHBhbmRTdWJzY3JpYmVyLmRpc3BhdGNoID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICB2YXIgc3Vic2NyaWJlciA9IGFyZy5zdWJzY3JpYmVyLCByZXN1bHQgPSBhcmcucmVzdWx0LCB2YWx1ZSA9IGFyZy52YWx1ZSwgaW5kZXggPSBhcmcuaW5kZXg7XG4gICAgICAgIHN1YnNjcmliZXIuc3Vic2NyaWJlVG9Qcm9qZWN0aW9uKHJlc3VsdCwgdmFsdWUsIGluZGV4KTtcbiAgICB9O1xuICAgIEV4cGFuZFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPCB0aGlzLmNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2godGhpcy5wcm9qZWN0KSh2YWx1ZSwgaW5kZXgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5zY2hlZHVsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvUHJvamVjdGlvbihyZXN1bHQsIHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSB7IHN1YnNjcmliZXI6IHRoaXMsIHJlc3VsdDogcmVzdWx0LCB2YWx1ZTogdmFsdWUsIGluZGV4OiBpbmRleCB9O1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlKEV4cGFuZFN1YnNjcmliZXIuZGlzcGF0Y2gsIDAsIHN0YXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXhwYW5kU3Vic2NyaWJlci5wcm90b3R5cGUuc3Vic2NyaWJlVG9Qcm9qZWN0aW9uID0gZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGluZGV4KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlKys7XG4gICAgICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0XzEuc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgcmVzdWx0LCB2YWx1ZSwgaW5kZXgpKTtcbiAgICB9O1xuICAgIEV4cGFuZFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5oYXNDb21wbGV0ZWQgJiYgdGhpcy5hY3RpdmUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXhwYW5kU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLl9uZXh0KGlubmVyVmFsdWUpO1xuICAgIH07XG4gICAgRXhwYW5kU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5Q29tcGxldGUgPSBmdW5jdGlvbiAoaW5uZXJTdWIpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG4gICAgICAgIHRoaXMuYWN0aXZlLS07XG4gICAgICAgIGlmIChidWZmZXIgJiYgYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQoYnVmZmVyLnNoaWZ0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0NvbXBsZXRlZCAmJiB0aGlzLmFjdGl2ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRXhwYW5kU3Vic2NyaWJlcjtcbn0oT3V0ZXJTdWJzY3JpYmVyXzEuT3V0ZXJTdWJzY3JpYmVyKSk7XG5leHBvcnRzLkV4cGFuZFN1YnNjcmliZXIgPSBFeHBhbmRTdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhwYW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpcHRpb24nKTtcbi8qKlxuICogQSB1bml0IG9mIHdvcmsgdG8gYmUgZXhlY3V0ZWQgaW4gYSB7QGxpbmsgU2NoZWR1bGVyfS4gQW4gYWN0aW9uIGlzIHR5cGljYWxseVxuICogY3JlYXRlZCBmcm9tIHdpdGhpbiBhIFNjaGVkdWxlciBhbmQgYW4gUnhKUyB1c2VyIGRvZXMgbm90IG5lZWQgdG8gY29uY2VyblxuICogdGhlbXNlbHZlcyBhYm91dCBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGFuIEFjdGlvbi5cbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgQWN0aW9uPFQ+IGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAqICAgbmV3IChzY2hlZHVsZXI6IFNjaGVkdWxlciwgd29yazogKHN0YXRlPzogVCkgPT4gdm9pZCk7XG4gKiAgIHNjaGVkdWxlKHN0YXRlPzogVCwgZGVsYXk6IG51bWJlciA9IDApOiBTdWJzY3JpcHRpb247XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAY2xhc3MgQWN0aW9uPFQ+XG4gKi9cbnZhciBBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGVzIHRoaXMgYWN0aW9uIG9uIGl0cyBwYXJlbnQgU2NoZWR1bGVyIGZvciBleGVjdXRpb24uIE1heSBiZSBwYXNzZWRcbiAgICAgKiBzb21lIGNvbnRleHQgb2JqZWN0LCBgc3RhdGVgLiBNYXkgaGFwcGVuIGF0IHNvbWUgcG9pbnQgaW4gdGhlIGZ1dHVyZSxcbiAgICAgKiBhY2NvcmRpbmcgdG8gdGhlIGBkZWxheWAgcGFyYW1ldGVyLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtUfSBbc3RhdGVdIFNvbWUgY29udGV4dHVhbCBkYXRhIHRoYXQgdGhlIGB3b3JrYCBmdW5jdGlvbiB1c2VzIHdoZW5cbiAgICAgKiBjYWxsZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2RlbGF5XSBUaW1lIHRvIHdhaXQgYmVmb3JlIGV4ZWN1dGluZyB0aGUgd29yaywgd2hlcmUgdGhlXG4gICAgICogdGltZSB1bml0IGlzIGltcGxpY2l0IGFuZCBkZWZpbmVkIGJ5IHRoZSBTY2hlZHVsZXIuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQWN0aW9uO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuQWN0aW9uID0gQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG52YXIgQWN0aW9uXzEgPSByZXF1aXJlKCcuL0FjdGlvbicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBBc3luY0FjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspO1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWx3YXlzIHJlcGxhY2UgdGhlIGN1cnJlbnQgc3RhdGUgd2l0aCB0aGUgbmV3IHN0YXRlLlxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIC8vIFNldCB0aGUgcGVuZGluZyBmbGFnIGluZGljYXRpbmcgdGhhdCB0aGlzIGFjdGlvbiBoYXMgYmVlbiBzY2hlZHVsZWQsIG9yXG4gICAgICAgIC8vIGhhcyByZWN1cnNpdmVseSByZXNjaGVkdWxlZCBpdHNlbGYuXG4gICAgICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSW1wb3J0YW50IGltcGxlbWVudGF0aW9uIG5vdGU6XG4gICAgICAgIC8vXG4gICAgICAgIC8vIEFjdGlvbnMgb25seSBleGVjdXRlIG9uY2UgYnkgZGVmYXVsdCwgdW5sZXNzIHJlc2NoZWR1bGVkIGZyb20gd2l0aGluIHRoZVxuICAgICAgICAvLyBzY2hlZHVsZWQgY2FsbGJhY2suIFRoaXMgYWxsb3dzIHVzIHRvIGltcGxlbWVudCBzaW5nbGUgYW5kIHJlcGVhdFxuICAgICAgICAvLyBhY3Rpb25zIHZpYSB0aGUgc2FtZSBjb2RlIHBhdGgsIHdpdGhvdXQgYWRkaW5nIEFQSSBzdXJmYWNlIGFyZWEsIGFzIHdlbGxcbiAgICAgICAgLy8gYXMgbWltaWMgdHJhZGl0aW9uYWwgcmVjdXJzaW9uIGJ1dCBhY3Jvc3MgYXN5bmNocm9ub3VzIGJvdW5kYXJpZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhvd2V2ZXIsIEpTIHJ1bnRpbWVzIGFuZCB0aW1lcnMgZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbnRlcnZhbHMgYWNoaWV2ZWQgYnlcbiAgICAgICAgLy8gc2VyaWFsIGBzZXRUaW1lb3V0YCBjYWxscyB2cy4gYSBzaW5nbGUgYHNldEludGVydmFsYCBjYWxsLiBBbiBpbnRlcnZhbCBvZlxuICAgICAgICAvLyBzZXJpYWwgYHNldFRpbWVvdXRgIGNhbGxzIGNhbiBiZSBpbmRpdmlkdWFsbHkgZGVsYXllZCwgd2hpY2ggZGVsYXlzXG4gICAgICAgIC8vIHNjaGVkdWxpbmcgdGhlIG5leHQgYHNldFRpbWVvdXRgLCBhbmQgc28gb24uIGBzZXRJbnRlcnZhbGAgYXR0ZW1wdHMgdG9cbiAgICAgICAgLy8gZ3VhcmFudGVlIHRoZSBpbnRlcnZhbCBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgbW9yZSBwcmVjaXNlbHkgdG8gdGhlXG4gICAgICAgIC8vIGludGVydmFsIHBlcmlvZCwgcmVnYXJkbGVzcyBvZiBsb2FkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGVyZWZvcmUsIHdlIHVzZSBgc2V0SW50ZXJ2YWxgIHRvIHNjaGVkdWxlIHNpbmdsZSBhbmQgcmVwZWF0IGFjdGlvbnMuXG4gICAgICAgIC8vIElmIHRoZSBhY3Rpb24gcmVzY2hlZHVsZXMgaXRzZWxmIHdpdGggdGhlIHNhbWUgZGVsYXksIHRoZSBpbnRlcnZhbCBpcyBub3RcbiAgICAgICAgLy8gY2FuY2VsZWQuIElmIHRoZSBhY3Rpb24gZG9lc24ndCByZXNjaGVkdWxlLCBvciByZXNjaGVkdWxlcyB3aXRoIGFcbiAgICAgICAgLy8gZGlmZmVyZW50IGRlbGF5LCB0aGUgaW50ZXJ2YWwgd2lsbCBiZSBjYW5jZWxlZCBhZnRlciBzY2hlZHVsZWQgY2FsbGJhY2tcbiAgICAgICAgLy8gZXhlY3V0aW9uLlxuICAgICAgICAvL1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgLy8gSWYgdGhpcyBhY3Rpb24gaGFzIGFscmVhZHkgYW4gYXN5bmMgSWQsIGRvbid0IHJlcXVlc3QgYSBuZXcgb25lLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCB0aGlzLnJlcXVlc3RBc3luY0lkKHNjaGVkdWxlciwgdGhpcy5pZCwgZGVsYXkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHJvb3RfMS5yb290LnNldEludGVydmFsKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdGhpcyksIGRlbGF5KTtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgLy8gSWYgdGhpcyBhY3Rpb24gaXMgcmVzY2hlZHVsZWQgd2l0aCB0aGUgc2FtZSBkZWxheSB0aW1lLCBkb24ndCBjbGVhciB0aGUgaW50ZXJ2YWwgaWQuXG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCAmJiB0aGlzLmRlbGF5ID09PSBkZWxheSAmJiB0aGlzLnBlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgYWN0aW9uJ3MgZGVsYXkgdGltZSBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBkZWxheSxcbiAgICAgICAgLy8gb3IgdGhlIGFjdGlvbiBoYXMgYmVlbiByZXNjaGVkdWxlZCBiZWZvcmUgaXQncyBleGVjdXRlZCwgY2xlYXIgdGhlIGludGVydmFsIGlkXG4gICAgICAgIHJldHVybiByb290XzEucm9vdC5jbGVhckludGVydmFsKGlkKSAmJiB1bmRlZmluZWQgfHwgdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgZXhlY3V0ZXMgdGhpcyBhY3Rpb24gYW5kIHRoZSBgd29ya2AgaXQgY29udGFpbnMuXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2V4ZWN1dGluZyBhIGNhbmNlbGxlZCBhY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBlbmRpbmcgPT09IGZhbHNlICYmIHRoaXMuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRGVxdWV1ZSBpZiB0aGUgYWN0aW9uIGRpZG4ndCByZXNjaGVkdWxlIGl0c2VsZi4gRG9uJ3QgY2FsbFxuICAgICAgICAgICAgLy8gdW5zdWJzY3JpYmUoKSwgYmVjYXVzZSB0aGUgYWN0aW9uIGNvdWxkIHJlc2NoZWR1bGUgbGF0ZXIuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTpcbiAgICAgICAgICAgIC8vIGBgYFxuICAgICAgICAgICAgLy8gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uIGRvV29yayhjb3VudGVyKSB7XG4gICAgICAgICAgICAvLyAgIC8qIC4uLiBJJ20gYSBidXN5IHdvcmtlciBiZWUgLi4uICovXG4gICAgICAgICAgICAvLyAgIHZhciBvcmlnaW5hbEFjdGlvbiA9IHRoaXM7XG4gICAgICAgICAgICAvLyAgIC8qIHdhaXQgMTAwbXMgYmVmb3JlIHJlc2NoZWR1bGluZyB0aGUgYWN0aW9uICovXG4gICAgICAgICAgICAvLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gICAgIG9yaWdpbmFsQWN0aW9uLnNjaGVkdWxlKGNvdW50ZXIgKyAxKTtcbiAgICAgICAgICAgIC8vICAgfSwgMTAwKTtcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xuICAgICAgICAgICAgLy8gYGBgXG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZCh0aGlzLnNjaGVkdWxlciwgdGhpcy5pZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLndvcmsoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVycm9yVmFsdWUgPSAhIWUgJiYgZSB8fCBuZXcgRXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvclZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgIHZhciBpbmRleCA9IGFjdGlvbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgdGhpcy53b3JrID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGFjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSA9IG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNBY3Rpb247XG59KEFjdGlvbl8xLkFjdGlvbikpO1xuZXhwb3J0cy5Bc3luY0FjdGlvbiA9IEFzeW5jQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNBY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTY2hlZHVsZXJfMSA9IHJlcXVpcmUoJy4uL1NjaGVkdWxlcicpO1xudmFyIEFzeW5jU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNTY2hlZHVsZXIoKSB7XG4gICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBTY2hlZHVsZXIgaXMgY3VycmVudGx5IGV4ZWN1dGluZyBhIGJhdGNoIG9mXG4gICAgICAgICAqIHF1ZXVlZCBhY3Rpb25zLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBpbnRlcm5hbCBJRCB1c2VkIHRvIHRyYWNrIHRoZSBsYXRlc3QgYXN5bmNocm9ub3VzIHRhc2sgc3VjaCBhcyB0aG9zZVxuICAgICAgICAgKiBjb21pbmcgZnJvbSBgc2V0VGltZW91dGAsIGBzZXRJbnRlcnZhbGAsIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLCBhbmRcbiAgICAgICAgICogb3RoZXJzLlxuICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIEFzeW5jU2NoZWR1bGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpOyAvLyBleGhhdXN0IHRoZSBzY2hlZHVsZXIgcXVldWVcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jU2NoZWR1bGVyO1xufShTY2hlZHVsZXJfMS5TY2hlZHVsZXIpKTtcbmV4cG9ydHMuQXN5bmNTY2hlZHVsZXIgPSBBc3luY1NjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKCcuL0FzeW5jQWN0aW9uJyk7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoJy4vQXN5bmNTY2hlZHVsZXInKTtcbi8qKlxuICpcbiAqIEFzeW5jIFNjaGVkdWxlclxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5TY2hlZHVsZSB0YXNrIGFzIGlmIHlvdSB1c2VkIHNldFRpbWVvdXQodGFzaywgZHVyYXRpb24pPC9zcGFuPlxuICpcbiAqIGBhc3luY2Agc2NoZWR1bGVyIHNjaGVkdWxlcyB0YXNrcyBhc3luY2hyb25vdXNseSwgYnkgcHV0dGluZyB0aGVtIG9uIHRoZSBKYXZhU2NyaXB0XG4gKiBldmVudCBsb29wIHF1ZXVlLiBJdCBpcyBiZXN0IHVzZWQgdG8gZGVsYXkgdGFza3MgaW4gdGltZSBvciB0byBzY2hlZHVsZSB0YXNrcyByZXBlYXRpbmdcbiAqIGluIGludGVydmFscy5cbiAqXG4gKiBJZiB5b3UganVzdCB3YW50IHRvIFwiZGVmZXJcIiB0YXNrLCB0aGF0IGlzIHRvIHBlcmZvcm0gaXQgcmlnaHQgYWZ0ZXIgY3VycmVudGx5XG4gKiBleGVjdXRpbmcgc3luY2hyb25vdXMgY29kZSBlbmRzIChjb21tb25seSBhY2hpZXZlZCBieSBgc2V0VGltZW91dChkZWZlcnJlZFRhc2ssIDApYCksXG4gKiBiZXR0ZXIgY2hvaWNlIHdpbGwgYmUgdGhlIHtAbGluayBhc2FwfSBzY2hlZHVsZXIuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGFzeW5jIHNjaGVkdWxlciB0byBkZWxheSB0YXNrPC9jYXB0aW9uPlxuICogY29uc3QgdGFzayA9ICgpID0+IGNvbnNvbGUubG9nKCdpdCB3b3JrcyEnKTtcbiAqXG4gKiBSeC5TY2hlZHVsZXIuYXN5bmMuc2NoZWR1bGUodGFzaywgMjAwMCk7XG4gKlxuICogLy8gQWZ0ZXIgMiBzZWNvbmRzIGxvZ3M6XG4gKiAvLyBcIml0IHdvcmtzIVwiXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBhc3luYyBzY2hlZHVsZXIgdG8gcmVwZWF0IHRhc2sgaW4gaW50ZXJ2YWxzPC9jYXB0aW9uPlxuICogZnVuY3Rpb24gdGFzayhzdGF0ZSkge1xuICogICBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gKiAgIHRoaXMuc2NoZWR1bGUoc3RhdGUgKyAxLCAxMDAwKTsgLy8gYHRoaXNgIHJlZmVyZW5jZXMgY3VycmVudGx5IGV4ZWN1dGluZyBBY3Rpb24sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2UgcmVzY2hlZHVsZSB3aXRoIG5ldyBzdGF0ZSBhbmQgZGVsYXlcbiAqIH1cbiAqXG4gKiBSeC5TY2hlZHVsZXIuYXN5bmMuc2NoZWR1bGUodGFzaywgMzAwMCwgMCk7XG4gKlxuICogLy8gTG9nczpcbiAqIC8vIDAgYWZ0ZXIgM3NcbiAqIC8vIDEgYWZ0ZXIgNHNcbiAqIC8vIDIgYWZ0ZXIgNXNcbiAqIC8vIDMgYWZ0ZXIgNnNcbiAqXG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIGFzeW5jXG4gKiBAb3duZXIgU2NoZWR1bGVyXG4gKi9cbmV4cG9ydHMuYXN5bmMgPSBuZXcgQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcihBc3luY0FjdGlvbl8xLkFzeW5jQWN0aW9uKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvcm9vdCcpO1xuZnVuY3Rpb24gc3ltYm9sSXRlcmF0b3JQb255ZmlsbChyb290KSB7XG4gICAgdmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICghU3ltYm9sLml0ZXJhdG9yKSB7XG4gICAgICAgICAgICBTeW1ib2wuaXRlcmF0b3IgPSBTeW1ib2woJ2l0ZXJhdG9yIHBvbHlmaWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN5bWJvbC5pdGVyYXRvcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFtmb3IgTW96aWxsYSBHZWNrbyAyNy0zNTpdKGh0dHBzOi8vbXpsLmxhLzJld0UxekMpXG4gICAgICAgIHZhciBTZXRfMSA9IHJvb3QuU2V0O1xuICAgICAgICBpZiAoU2V0XzEgJiYgdHlwZW9mIG5ldyBTZXRfMSgpWydAQGl0ZXJhdG9yJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiAnQEBpdGVyYXRvcic7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIE1hcF8xID0gcm9vdC5NYXA7XG4gICAgICAgIC8vIHJlcXVpcmVkIGZvciBjb21wYXRhYmlsaXR5IHdpdGggZXM2LXNoaW1cbiAgICAgICAgaWYgKE1hcF8xKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hcF8xLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAvLyBhY2NvcmRpbmcgdG8gc3BlYywgTWFwLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSBhbmQgTWFwLm9yb3RvdHlwZS5lbnRyaWVzIG11c3QgYmUgZXF1YWwuXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2VudHJpZXMnICYmIGtleSAhPT0gJ3NpemUnICYmIE1hcF8xLnByb3RvdHlwZVtrZXldID09PSBNYXBfMS5wcm90b3R5cGVbJ2VudHJpZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbn1cbmV4cG9ydHMuc3ltYm9sSXRlcmF0b3JQb255ZmlsbCA9IHN5bWJvbEl0ZXJhdG9yUG9ueWZpbGw7XG5leHBvcnRzLml0ZXJhdG9yID0gc3ltYm9sSXRlcmF0b3JQb255ZmlsbChyb290XzEucm9vdCk7XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBpdGVyYXRvciBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRpdGVyYXRvciA9IGV4cG9ydHMuaXRlcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbmZ1bmN0aW9uIGdldFN5bWJvbE9ic2VydmFibGUoY29udGV4dCkge1xuICAgIHZhciAkJG9ic2VydmFibGU7XG4gICAgdmFyIFN5bWJvbCA9IGNvbnRleHQuU3ltYm9sO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sLm9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcbiAgICAgICAgICAgIFN5bWJvbC5vYnNlcnZhYmxlID0gJCRvYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkJG9ic2VydmFibGUgPSAnQEBvYnNlcnZhYmxlJztcbiAgICB9XG4gICAgcmV0dXJuICQkb2JzZXJ2YWJsZTtcbn1cbmV4cG9ydHMuZ2V0U3ltYm9sT2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGU7XG5leHBvcnRzLm9ic2VydmFibGUgPSBnZXRTeW1ib2xPYnNlcnZhYmxlKHJvb3RfMS5yb290KTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIG9ic2VydmFibGUgaW5zdGVhZFxuICovXG5leHBvcnRzLiQkb2JzZXJ2YWJsZSA9IGV4cG9ydHMub2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG52YXIgU3ltYm9sID0gcm9vdF8xLnJvb3QuU3ltYm9sO1xuZXhwb3J0cy5yeFN1YnNjcmliZXIgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLmZvciA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIFN5bWJvbC5mb3IoJ3J4U3Vic2NyaWJlcicpIDogJ0BAcnhTdWJzY3JpYmVyJztcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIHJ4U3Vic2NyaWJlciBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRyeFN1YnNjcmliZXIgPSBleHBvcnRzLnJ4U3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ4U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBhbiBhY3Rpb24gaXMgaW52YWxpZCBiZWNhdXNlIHRoZSBvYmplY3QgaGFzIGJlZW5cbiAqIHVuc3Vic2NyaWJlZC5cbiAqXG4gKiBAc2VlIHtAbGluayBTdWJqZWN0fVxuICogQHNlZSB7QGxpbmsgQmVoYXZpb3JTdWJqZWN0fVxuICpcbiAqIEBjbGFzcyBPYmplY3RVbnN1YnNjcmliZWRFcnJvclxuICovXG52YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPYmplY3RVbnN1YnNjcmliZWRFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpIHtcbiAgICAgICAgdmFyIGVyciA9IF9zdXBlci5jYWxsKHRoaXMsICdvYmplY3QgdW5zdWJzY3JpYmVkJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbiAgICAgICAgdGhpcy5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3RVbnN1YnNjcmliZWRFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSBPYmplY3RVbnN1YnNjcmliZWRFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4vKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIG9uZSBvciBtb3JlIGVycm9ycyBoYXZlIG9jY3VycmVkIGR1cmluZyB0aGVcbiAqIGB1bnN1YnNjcmliZWAgb2YgYSB7QGxpbmsgU3Vic2NyaXB0aW9ufS5cbiAqL1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVbnN1YnNjcmlwdGlvbkVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgdmFyIGVyciA9IEVycm9yLmNhbGwodGhpcywgZXJyb3JzID9cbiAgICAgICAgICAgIGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcbiAgXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuICgoaSArIDEpICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCkpOyB9KS5qb2luKCdcXG4gICcpIDogJycpO1xuICAgICAgICB0aGlzLm5hbWUgPSBlcnIubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiBVbnN1YnNjcmlwdGlvbkVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5VbnN1YnNjcmlwdGlvbkVycm9yID0gVW5zdWJzY3JpcHRpb25FcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyB0eXBlb2YgYW55IHNvIHRoYXQgaXQgd2UgZG9uJ3QgaGF2ZSB0byBjYXN0IHdoZW4gY29tcGFyaW5nIGEgcmVzdWx0IHRvIHRoZSBlcnJvciBvYmplY3RcbmV4cG9ydHMuZXJyb3JPYmplY3QgPSB7IGU6IHt9IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvck9iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcic7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKCt2YWx1ZSk7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRGF0ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNPYmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc1Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNQcm9taXNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNTY2hlZHVsZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnNjaGVkdWxlID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc1NjaGVkdWxlciA9IGlzU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuZnVuY3Rpb24gbm9vcCgpIHsgfVxuZXhwb3J0cy5ub29wID0gbm9vcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vb3AuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgbm9vcF8xID0gcmVxdWlyZSgnLi9ub29wJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZnVuY3Rpb24gcGlwZSgpIHtcbiAgICB2YXIgZm5zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZm5zW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0cy5waXBlID0gcGlwZTtcbi8qIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gcGlwZUZyb21BcnJheShmbnMpIHtcbiAgICBpZiAoIWZucykge1xuICAgICAgICByZXR1cm4gbm9vcF8xLm5vb3A7XG4gICAgfVxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwaXBlZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZm5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgZm4pIHsgcmV0dXJuIGZuKHByZXYpOyB9LCBpbnB1dCk7XG4gICAgfTtcbn1cbmV4cG9ydHMucGlwZUZyb21BcnJheSA9IHBpcGVGcm9tQXJyYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29tbW9uSlMgLyBOb2RlIGhhdmUgZ2xvYmFsIGNvbnRleHQgZXhwb3NlZCBhcyBcImdsb2JhbFwiIHZhcmlhYmxlLlxuLy8gV2UgZG9uJ3Qgd2FudCB0byBpbmNsdWRlIHRoZSB3aG9sZSBub2RlLmQudHMgdGhpcyB0aGlzIGNvbXBpbGF0aW9uIHVuaXQgc28gd2UnbGwganVzdCBmYWtlXG4vLyB0aGUgZ2xvYmFsIFwiZ2xvYmFsXCIgdmFyIGZvciBub3cuXG52YXIgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG52YXIgX19zZWxmID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiYgc2VsZjtcbnZhciBfX2dsb2JhbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbDtcbnZhciBfcm9vdCA9IF9fd2luZG93IHx8IF9fZ2xvYmFsIHx8IF9fc2VsZjtcbmV4cG9ydHMucm9vdCA9IF9yb290O1xuLy8gV29ya2Fyb3VuZCBDbG9zdXJlIENvbXBpbGVyIHJlc3RyaWN0aW9uOiBUaGUgYm9keSBvZiBhIGdvb2cubW9kdWxlIGNhbm5vdCB1c2UgdGhyb3cuXG4vLyBUaGlzIGlzIG5lZWRlZCB3aGVuIHVzZWQgd2l0aCBhbmd1bGFyL3RzaWNrbGUgd2hpY2ggaW5zZXJ0cyBhIGdvb2cubW9kdWxlIHN0YXRlbWVudC5cbi8vIFdyYXAgaW4gSUlGRVxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIV9yb290KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUnhKUyBjb3VsZCBub3QgZmluZCBhbnkgZ2xvYmFsIGNvbnRleHQgKHdpbmRvdywgc2VsZiwgZ2xvYmFsKScpO1xuICAgIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb290LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4vcm9vdCcpO1xudmFyIGlzQXJyYXlMaWtlXzEgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG52YXIgaXNQcm9taXNlXzEgPSByZXF1aXJlKCcuL2lzUHJvbWlzZScpO1xudmFyIGlzT2JqZWN0XzEgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2YWJsZScpO1xudmFyIGl0ZXJhdG9yXzEgPSByZXF1aXJlKCcuLi9zeW1ib2wvaXRlcmF0b3InKTtcbnZhciBJbm5lclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL0lubmVyU3Vic2NyaWJlcicpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL3N5bWJvbC9vYnNlcnZhYmxlJyk7XG5mdW5jdGlvbiBzdWJzY3JpYmVUb1Jlc3VsdChvdXRlclN1YnNjcmliZXIsIHJlc3VsdCwgb3V0ZXJWYWx1ZSwgb3V0ZXJJbmRleCkge1xuICAgIHZhciBkZXN0aW5hdGlvbiA9IG5ldyBJbm5lclN1YnNjcmliZXJfMS5Jbm5lclN1YnNjcmliZXIob3V0ZXJTdWJzY3JpYmVyLCBvdXRlclZhbHVlLCBvdXRlckluZGV4KTtcbiAgICBpZiAoZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5faXNTY2FsYXIpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnNjcmliZShkZXN0aW5hdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNBcnJheUxpa2VfMS5pc0FycmF5TGlrZShyZXN1bHQpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBpIDwgbGVuICYmICFkZXN0aW5hdGlvbi5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUHJvbWlzZV8xLmlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBkZXN0aW5hdGlvbi5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgLy8gRXNjYXBpbmcgdGhlIFByb21pc2UgdHJhcDogZ2xvYmFsbHkgdGhyb3cgdW5oYW5kbGVkIGVycm9yc1xuICAgICAgICAgICAgcm9vdF8xLnJvb3Quc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRocm93IGVycjsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0W2l0ZXJhdG9yXzEuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IHJlc3VsdFtpdGVyYXRvcl8xLml0ZXJhdG9yXSgpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dChpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodHJ1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0W29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgb2JzID0gcmVzdWx0W29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSgpO1xuICAgICAgICBpZiAodHlwZW9mIG9icy5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIG9iamVjdCBkb2VzIG5vdCBjb3JyZWN0bHkgaW1wbGVtZW50IFN5bWJvbC5vYnNlcnZhYmxlJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5zdWJzY3JpYmUobmV3IElubmVyU3Vic2NyaWJlcl8xLklubmVyU3Vic2NyaWJlcihvdXRlclN1YnNjcmliZXIsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXNPYmplY3RfMS5pc09iamVjdChyZXN1bHQpID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IFwiJ1wiICsgcmVzdWx0ICsgXCInXCI7XG4gICAgICAgIHZhciBtc2cgPSAoXCJZb3UgcHJvdmlkZWQgXCIgKyB2YWx1ZSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC5cIilcbiAgICAgICAgICAgICsgJyBZb3UgY2FuIHByb3ZpZGUgYW4gT2JzZXJ2YWJsZSwgUHJvbWlzZSwgQXJyYXksIG9yIEl0ZXJhYmxlLic7XG4gICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKG5ldyBUeXBlRXJyb3IobXNnKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5zdWJzY3JpYmVUb1Jlc3VsdCA9IHN1YnNjcmliZVRvUmVzdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlVG9SZXN1bHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZlcicpO1xuZnVuY3Rpb24gdG9TdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihPYnNlcnZlcl8xLmVtcHR5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbn1cbmV4cG9ydHMudG9TdWJzY3JpYmVyID0gdG9TdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9TdWJzY3JpYmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGVycm9yT2JqZWN0XzEgPSByZXF1aXJlKCcuL2Vycm9yT2JqZWN0Jyk7XG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XG5mdW5jdGlvbiB0cnlDYXRjaGVyKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0cnlDYXRjaFRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdDtcbiAgICB9XG59XG5mdW5jdGlvbiB0cnlDYXRjaChmbikge1xuICAgIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XG59XG5leHBvcnRzLnRyeUNhdGNoID0gdHJ5Q2F0Y2g7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cnlDYXRjaC5qcy5tYXAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2V4cGFuZCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RlbGF5JztcblxuZXhwb3J0IGludGVyZmFjZSBJQWRFdmVudCB7XG4gICAgdHlwZTogJ0lNQUdFJyB8ICdWSURFTycsXG4gICAgc3JjOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJQ3JlYXRpdmUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzcmM6IHN0cmluZztcbn1cblxuY29uc3QgSU1BR0VfQ1JFQVRJVkVTOiBJQ3JlYXRpdmUgW10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAncmF5IGJhbicsXG4gICAgICAgIHNyYzogJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRBQVFTa1pKUmdBQkFRQUFBUUFCQUFELzJ3Q0VBQVVEQkFnUUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrSkNRb0tDQW9JQ0FrSkNRa0pDaHdOQ1FrYUNRZ0lEU0FOR2gwZEh4OGZDQXNnSUNBZUlCd2VIeDRCQlFVRkNBY0lEd2tKRHhRVUVoUVVGUlFYRnhnWEZCVVhGeFFYRkJRVUZCVVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRlAvQUFCRUlBV2dCNEFNQklnQUNFUUVERVFIL3hBQWRBQUFCQkFNQkFRQUFBQUFBQUFBQUFBQUZBd1FHQndBQkFnZ0ovOFFBV0JBQUFRTURBZ01FQlFVSkNnc0lBd0VCQVFJREVRQUVJUVVTSWpGQkJoTlJZUWN5Y1lHUkNCUWpRcUV6VW1KenNiTEIwZkFWRmlSVGNuU0NrcE9pUTFWalpKU2pzN1RTNGZFbE5EVTJWR1Yxd29PazAwUW0vOFFBR3dFQUFnSURBUUFBQUFBQUFBQUFBQUFBQkFVQ0F3QUJCZ2YveEFBNkVRQUJCQUVDQkFRREJnUUdBd0VBQUFBQkFBSURFUVFTSVFVVE1VRWlNbEZoQmhSeEl6UlNnWkdoTTNLeDhEVkNnc0hSNFJVa1loYi8yZ0FNQXdFQUFoRURFUUEvQVBHVkhleGJJTDZnZVFhSi92SW9GUmpzcTRRNnNqK0xQNXlLcmw4cFYwSG5DblhDQkFwZTFSSW9JemNFbWpiQ29TUEdsTHhTZXRJY3VtMnlGZXltOXdrNW9scHlaT2FXdm1SSDZLcDEwVlpvdEFOOERsVFZUaHA5Y0ZNeEZjbGtSUkFjcXkxREN5U2FjdDJ2U0tjSVp6N2FkdHR3UGRXeko2TFdoQkgwUmltNjJDYWYzWTRqWElJaXJHdktxTEV6YnM4aWptbU5aQUE1K1ZON1NNVFJ5eEF4VlUwbXlzaWpBS2RnWW9aZUdEeW9nKzdRNjlTU2ZkVkVadEZsaGNhQ2FwV0lrOGhRNjdRVnF4eUJuMlUvdURuWUt4RFVKSTZuTkVhcVZralMxdWdKcXBSZ0lITGthRjM3SUh0bWliemtDaHFrbFNwUEtybzl0MEpLMXJSUjZwa2xNR2FuWG96MXhUZDQwVTlWZ0VIa0lxS08yNFB1cnZUcmdvZFNVOUNKK05YQjFsTHBJNkZGZlJyMGM2cUhMUnRSQ1NTQWNBR3BidEgzbytBL1ZWQ2ZKdjF0Ymx1a1pqSFdyNlJ5Rk5HMFcya0V6YWN0aEk4RS9BZnFyV3dlQStBL1ZXeFd6V3dBcTkxekE4QjhCK3F0YlI0SitBL1ZYUnJLa3RGYTJqd0h3SDZxd29IZ1BnUDFWbGJyUzB1UW55SHdGZENzRllhMnBCYnJLd1ZsYVdXVnF0bXNyS3lnc3NybWZLc3JaclZib0xOMWxickI3NjNOYW9MTnd0VmdyZFpXTExLeXNySnJEV0xheXNySnJKckZyZFlhMEt5c0FyZEJiVzZ3VmxaV3FXdDF5YTVOZDFxS3hadXVIVlFDYXIzdDNyMjBLQU5URHRKcUFRMHJQaitRMVFuYTdXZDd5Z0ZZRklPTjVoalpwYXVqNEpoQ1IycHdVYjE2K2NVNFZySjluU2dkeThEejVVV3ZYTnhQVVVPZnRldkt1T0VsbmZxdTEwVU5rS3ZHOFlOTjdRZTJuTjdKTVZsbXhSb2ZURUxwdHlwLzA0cC9oN0huWm9QK3R1S2dGV0w2ZlV4cUZ1UDh5Yi8ydHhWZFYxdUNmc0dmUmNieEVWa1ArcXlwRjJDdDkxeXRQK1JVZmdwdjlkUjJwVDZOVlJkT2Z6ZFg1N1ZYVCtRcXJGL2l0K3FrbDlZd2NENFVyYUF4bW4xMG9VaUNPbnNwVGRqZFBDME5PeWNXemtjcTZ2WDVFVWkwRDlzVnB5b2ticXdPVEpiWFdsclpFbURUbEl4VzJFNXJDVnFrc2JZQVRReThkZytWRjNWWWloTnkzbW90TzYwNUNiaGNueXJTRGlsYnhBcEJ0SjZmbG95aFNIN3A3WkNwRnB5QnRvRllNNW80eUlGQ1RHMFhDTFdQT2N6aW1UajRBSlBPS1Vjam41NG9KZnZsUzlxZlpXNG1iSml3Y3NhcVQyeFZKSnhtblR3QUI4Zk9tOXFnSVJLdkt0SVNWbWN3RGdlVlRPMjZ3RFEyM2RVTmNaS2xlV2EyNDNBQW9rdTJqRk1YbXpOU0VscFpJTE5sSWtjSi9id3BtMnlkMDBRRGRLT053T2xYTWVBZzNzdFgvd0RKYTdTTnBQY3VLQU1wR1Q0bXZXVm8rbFNRVWtHUk5mT0RzWnF5MnJwQzBLS1lVbWZPdmIzb2s3U2Q3Yk5sYTBrN1Vqbm5sVFhHZllwSXNxS25XckhyZGNnMTFORTBnMWhyVVZ1dFRXbHJaWldSVzRyVTFpMkZrVnNWaE5hbXNXVXNOWURXR3RSV0xkTEJYUnJWYUpyRmxMWU5hSnJkWldMZExBYTFOYnJLeFpTM1dpYXdtdFZpeWxzQ3NWV1RXcHJGcFlLeXNtc0ZZdDBzTllCVzZ3Q3NXMWxaTmJpdEdzVVZxYVF2N2hLVUZSSWdBOWFXV3NBU2FyajBtOXFrdHRyQVBJRVI1eFEyVmtDRmhjaThYR016d0ZEUFMxMnppVzJ6eEU5RDBxcjlPdUZLNGxra2s4L2JUTFZibFRycTFyVVRLakE4czB0WnEyeDl0Y1RtVEdVMlYzT0RBSWdBRVZjYTY1cmgweU5wNlU1YWNTVWM1bk5EYmwvNlFqcEZLbU4xRk5KSFVrbDJ3bVlwWnRnZEtlV0xSVU9WTHVXMFlBek5iZExSMHJUR1h1cUErVU1rRFViYVAvUXQvd0MydWFyV3JRK1VnbU5UdGgvbURYKzJ1cXErdTc0ZDkzWjlBdUU0bjk1ZjlWbFNYMGVIK0V1ZmlGZm50Vkdxa1BZTW41d3VQNGxYNTdkRVRlUS9SRFkvOFFLY3JOYnRXNU0xeVRqbUt4dFo2WTk5S0FucDZwVjA1OGF4dmxtazBMRTg2VUN1VVZoVW1sTE5weDVWMjB3VG45aFNDWERqMjBSWVVBS3FlYVZnQ1FXa0RuVEI4aVRUcTRkay9xcGl2blVndEZOTGh1dVc3ZUtJR0lwTnoyUlZnZnRTam9XN1UwL2JNaVBHbTFxM2luVDZRRTQ1ODZxcXltT0hDWEcreUhhbGNnRGFuMWppbTJuMjRTQzR1T1JqeHJld2J5dFpuTWdlZGNQS1dvd0JBb29VRVRNNXJUWi9KSk9ySzFnSm5ieStGU1BTa0pTaU9aZ0RORGRPdGdrZU01bWpkbzFPYUZuZmFHaEplNjNKbmRJOHFhcHRKTTBkZFlCR09acE5GcWN3UEFWVTJTbGtzRzlvSTNiOFlCNVVuckRJQ2NVU3VXVkJSOHFhM2pLajd4K1RORXh1M1MrVnROSVFCbFVMU1I0MTZpK1RuZXFLVVNlaWV1UEN2TDE0aUQ3Nm1QWVB0ODdid0FveElwdkE3ZEljaG15K2d0bTROb3lEVGdHdk5Qby85TlNWbENYRlI0aysrcjY3TWE2MjhoSzBFRUh3NjRCbzhTQXBjNk1oSGhXb3JkWlVsQ2xvbXNyUXJkYVc2V3ByZFpXVml4WldWcWF5c1dsbGJySnJSTllzV1ZrMW9tdGlzVWd3bllMRFhVQ3VkMWEzVmlrSW5laFc2d0d1WnJZaXN0YjVUdlFyYzF1dVo4NnpkV3JXY3Azb1YxV29yVTFyZi8wbXRyWEtkNkZkVnVhMXVyQ2F4WnluZWhXVFc1cko5bEpQdWdBazlLaVhVRnNST0pxaWcvYTdWRU5zcU1nWVA1Szh6OXZ0YkxyNnh1RzBGWEkrNnA3NlpPMHhndGduY3FSQW4yVlM2TnhYbk0vdG11VDRwa0dSOUxzT0U0TG1Nc2hLT0E3WkFwdWgxY2dSaWMwYXRXd1JCcGNXaWVpUGZTTjB0R3FUNFl6dXFiV3kxY3VRaXU3SzFsejIwOFpZRWU3d3B4cHJSM1RIVVZUcm9HZ3BHRjFvN1lhZUFnR20xeTN4QVJ6NjBhYklDWS9SUTFQM1NQaFMwNm5PM1JyWXlCMFhuUDVVVGNhcmFqLzIxby82KzdxcGF1TDVXS2YrMTdUcE9tTW4vd0RZdktwMnZTT0YvZFkvNVF2T09LaXNwLzFXVWQ3RnErblgrSlYrYzNRS2puWXhFdnIvQUJTdnptNkxsOGhRa1BuQ25Gc2FlcGJ4VFMwb2swMlNCU1ltaW43ZDBPZHQvQ2xXR3NVOGNRYVJhVm1LMEhXRk1CYmFhaXN1SGVsT2swaGNKRTFYZTZuU3kyWkpqcFc3aGdWdHBSNWVGSjNMaDYxdFoyWEpTa0NUVFZ4eklBRTFpMUtKaWNHbk51eWtDZWcrMktucEFSdUppT21PL1JLc0poRW1oRnhlTFc1M2FNRGtTS1gxTzhrYkVjempIU25XaDZiSEdSekhQck5acTBDeWpzaVFNcU9MODEyM3BlQVNPbld1WEdBT1dLT2s4cDZmOUtGNmdQeTFRMlF1TzZGbWpBU0Z1aWFOV3JVQUR5b2RvN1VtcFd4WllGRHp5QnV5c3hZNzNROWxnd1BDdTFnRHBGR0ZzcEF3QjBwbGNwOW5oUXJaYk5JaDdhQ0VPSUJVYVpYd0FQc0ZISGJYRTQ1MEIxamtvelRISGZxS1RaZmhDaXVyRGlNUlF0dzBZdnhpYURyVFRxTTJrTHhhVjAyOVdsWUlQSStKL2IvcFhxajVPM2JWU2dsbFNzejRucFhrOEp6MHErdmszYWFlOERwTUFLUGw0VmV4MUZEU2paZTBiVnlVaFhqUzJhQmFWcUNOb1JJNURyN0tOSVhJa1VmYUJMVjNGY3hXNXJSTlJXcVc2eWE1SnJZckZpdyt6N2EySzFXcHJGaXl0MXlLM05Zc1d6KzN2NS9aWGtiNVRXczNpTzBWdzJ6ZDNUTFl0clVoRFZ3NjJpU2d5ZHFGUk9CWHJnbXZIUHlwZi9NdHovTnJUOHcwTmx1SVpzdXgrQ0ltdnpxZUFScFBWUUw5OGVvLzR3dnY5TGYvQU9PdGZ2ajFIL0dGOS9wYi93RHgwTXJLVjh4M3FWN0g4aGovQUlHL29FVS9mSHFQK01MNy9TMy9BUGpyUDN4NmovakMrLzB0L3dENDZGMWxaekhlcTE4aGovZ2IrZ1JQOThlby93Q01MNy9TMy84QWpyZjc0OVIveGhmZjZXLy9BTWRDNnlzMXU5Vm55R1ArQnY2QkUvM3g2ai9qQysvMHQvOEE0NjMrK1BVZi9YM3YrbHZmOGRDNnlzNWp2VXJmeU9QK0J2NkJGUDN4YWovakM5LzB0LzhBNDZ6OThlby80d3Z2OUxmL0FQNlVMckt6bU85Vm55T1ArQnY2QkZQM3hhai9BSXd2ZjlMZi93RDZWbzlvZFE2NmhlLzZVOFI5cTZHVnRJNUFDU1RBam40QUFkVE5hMXU5Vm80V01OOURmMENjdlg3NU1yZmVXZkZiaTFINGsxcmZjYk84K243ditNaGV6K3ZFVmRHajlrTk8wdlRHdFgxKzJUZTZoY2tmTU5NY2dvU1lDd1hVS3dwWUJCSk1nZEt0MzBEK2tlMzFObTV0WDdGaTNmdHdBdGxJRGpTMlhKQ1NOeWVXQ2tpcE5nRGpSNnJsYzdqN1lXR1NDRFZHMDBYZEIrWHF2SENieDdvNjU3bHEvWFcvbnovOGM3L1hWK3VyRStVajJRWXM5YVUzYW9EZHRkTkM1YmFIcW9VVkZLMHA4RXptUE9xenFrd3RCb2dMcHNDYUhMZ2JNeG9wd3RML0FEMTcrT2QvcnEvWFhTYjkvd0RqM3Y3UlEvVFRhc3JYTGI2QkY4bVA4SVR2OTFMci93QlMvd0QycS8xMXI5MGJqK1BmbjhhdjlkTmF5dGNwbm9GdmxNOUFvVDZUN2h4VncwcHhhM0ZCaEtRVnFLaUFGdUdBU2VVay9FMUVLbFhwSCs3dGZpaCtjdW90VGVBVXdVdkJ2aUlBY1JtcjhSV3FMOWw3amE4bytMWkg5NUg2cUVVLzBaSjNxZ1R3SDhxYW04VzBwVEZlc1VyRXRIZ1V6NVVUdHJuaHFJV04wUW1EUmF5dVp4U2VXT2svamQ2cVJwZ3BQc3BKaEF6U1ZtNTBwMG9ETkNuWlhwTldLMFU0cmFNODY3V1FLMHBnZXFTNUdrbnpKaWxTWng4YVJ1MXBIS3JHaEc0MkZyT285RWxjUU1EcDFwanFGOEVvT2M5QjRVMjFHNzU1eEh2bXVkTnNGT0hldmtlUW9rQU5GbFh6NVlZTkVmMFQzc3ZaRlIzcXlTYW1KdHdrVXowTzJDUmdSMG84MWJwS1pPWXp6cFZremFuTE1hS20yN3FnN3pmaDBwbmNNeVJBb3E0UVRBK1A2S2MybGwxKzAxQVM2UmF4emRSUXl3WUtZTlNheGRCU1BFVUh2c1NCbUs2c240R2FxbEdzV3BSdUREU051REhLaHQ2bnc4YVZadlo2VjI2a0VaeFB1UHdORHRHa3EyUWdoQjc2NFVFeE5CNzg4Q2ppam1wSmJCQWNXbEJKQVNrbUZLSjViVTh6N0t5NjdLNm1zUXpwR3JPQWpoS2RNdkFrK1lVcG9BaW0yT1FPcVE1WjlWQW5rVDc2WXZNYzZzSlhvMzEyQi8ySnEyZjh6WFRXODlHMnZCTW5ROVkvbzJEcXo4R3dacHF5Um83cE80cXYrNy9iNDFZL281N1pGaEFUMXFLYTFvVjJ5bmRlV1YvWkpuMXJ5d3VyWlA4QVdlYUE4YURkNEQ5emNRdU9pRnBWSG5nelJEWFViVk1ndGVqZXhQcE9jY3ZVTmduaVBMcGl2VVBaeTVLbVVxUE9CK1N2bjc2TGJncHYyaXZHUm4vclh1anNEcXphN1pBU1JnSnlQWlJNVDdLRmxaU2wyNnRHa2tMRmRnbWlDVlF1aUsySzVyS3kxbExxYTVOWk5jbXN0YXBkeldnYTFGWURXV3QwdHFPSzhkZktrLzhBTXR6L0FEYTAvTVZYc1JWZVBQbFNmK1pibitiV241aXFGeS9JdTArQnZ2OEEvcEtxNnNyS3lsUzlvV1ZrVTcwalRMaDU0VzlvdzdjdnFFaHBoQld1UHZpQU9GUDRYS3JrN0ZmSnYxWjFLWEw5NXJUMEdDV3hEejRub1FEc1NyeWsxSnJITzZCSzg3akdKaGo3VjRIdDMvUlVoV1Y2MGI5QVBaYTNhRG1wWFR6Z0FHNXk1dlBtNko2NGFLWTlrMHpSNk5Pd0Q2L20xbmROcHVEaEh6ZlVuVkxKL0JTNjZVclB1cXprSHVRa1gvN1BHY2ZDeDVIcld5OHIxbFdKNlovUmJjYWM4Zzk0Yml5ZlVVc1hCRUVLRW51blFNQmNBd2VzR3E4cW9nZzBWMDJIbXhaY1FsaU5nclZaV1ZsYVJTeXJKK1RaMlpUZGRvYlZMaWR6Rm1sZDY2a2lVcUxjSlpTZi93QXEwcS8vQUJIeHF0cTlBL0lsUVAzUTFWVWNTYlcyQVBnQ3Q2ZnlENFZPTVc0SkY4U3p1aDRmSzV2V3EvWFpSdjVWK3RGenRBdGlmbzdDM2JaYkhRS2RoeHd4NCtxUDZJcWQvSXIwQllHb2Ftb0VOdWQzYXRIb3J1aXBiaEhzVW9KOXhxR2VrUHNiYzN2YmEvc2JlVXk0MjQrOUVwWlpLR3R5eitGMEE4VFUzOUsvcEtzOU8wOVBaM1FGSitjTXRkdzYra2hRdHdSeHFLdVM3b2trK1JPZkNybTdQTGl1VHlIbWJBaDRkakMzT0FMdllkU1NxNCtWSjJpYXVOZmNTeW9MYnNtazJ1NEdRWEFTdHdBOVFDUVBjYXFxdWxySk1uSkpKVVNTU1Nja2tubVp6WE5VT2RadGQ1dzdER0pqc2hIK1VVc3JaRmEvYjNVdnA5bzY0NGhsaHRienJoMnR0dEFyVW84NEFGUlJicEdzQkxqU1JpdFJVbTBic1BxRHJlb0xTMmxvNmFEODZiZkpiZEJTa3JLRW9qS3RvcU16V0JWeFpFY3BJWWJwUVQwai9kMnZ4US9PWFVWcVZla2Y3dTErS0g1eTZpdE00ZklGNFY4Ui93Q0l6ZnpGWlVpN0NJU1gzQXJsM0t2em02anRIT3hwUGZMMjgrNlA1N2RibDhoUzNFY0d5dEo5Vk9EcGlDTVZ5MVlLVGtWclRicFhYeG82bHhKVG5xS1R1ZWVoWGRZOEdQa3Q5Q2hqTDhHaUxUZ0lwRmRtazVydnU0QkZWRm9Ld2NKZU82V2JVSU5NWGJ1VmJSNEFtdWc3QWlSU2pOc05wVkh2cllhRmRIdzYwazg5QWp5elFlK2ZKRTVqa1BQcFN1cHU1Z1VnM0JQajBpcmdLQ0d6c25salExWnA5aVZIY3Z5Z1ZLZE50b2pGTXRLWmpwVWdZYUcwKzZoTWlVM1haQjQ4ZCtJOVZwbEdNUlhGd3BZR0pweGFwa21scnRtWUErSEtnU1FDbUc1RkpobzFnNG95WmllbnRxVHJaMnBJUGhnVnJUMWJFWUFuNDBqZDNCTTlUbUJRajVIUGY3SzFzWVkxRFgwZXNUN29wa2llWGh6NjBWUXh3a3FNRG1UMEg3Q0tzYjBVK2lGNjcyM1Y3dnRkTmtRa2NOeGRnWmhIOFZiOU4vTXppT2RGdGVLcExzaVlSRFVWRy9SeDJOdkx4enU3TnNiRUtJZnUzQWU0WmpvVHpkZS95WTk4VmR1aGVnelQwd2J5NXVydFVBN1VMK2JOVDFBUzN4a2VVMWFlamFUYnNzTjIxcTBpM1lhU0V0dHRwMnBTQi84QWJ4UFduWktla2V3Q2gzRUFwRFB4R1NUWUdnby8yYzdLYWJiRGJZV1RGcVZlc3Rwb2Q2WjU3bmxEZXI0MFdYUGdvK09mdDUwNVVvL2VxK3o4dElxQis5ajJrVlc5NTdvVU9zMm0rM3BqOU5hV2tRY0l5SW1jajRpbGtvUE1iZmR0clJhVjk2a3pVV3o2Vk8xRUwvVUx0cFpLMU9KWm1VWERaSzdjSkFQQytnS0paRVR4OHNETkF1MHZaelJyeHBsV3A2ZlpYUWQzYmJwTGFVdXBWdktBVVhMUUNpSTYvWlVrMTIxMUFYTGJqQlFiVlNBaHhvaGFYV2xGY2w1QlFJZUJUdzdURVlNOUtpV3JHMlJkbGxWd3ZTN3gxWDBRSlFsaDhpVkZRU3FHTGt6STI0UEtlZEhzeWRSb0VoRXNZMXc2QlZMMng5QURpSnVkQnVTOUE3eEZoZXFBY1ZHU2kxdXh3clZFOEs0bnhvdjZGZFp1a3VHMXVXM1dIbTFBTFpmU3B0eEVkU2xReVBNVk9IOWNmczVPcVd4TnR2M0l2ck5DMU1JMzVKZVljTysyNkRia2VGQysxK3FzdUlZMWEyZFErMHdzTlhKYU1yUTI0b2JYQ21OeVVneE1qa2FaWW1aS0hocnR4NnF1YkdZVzJGYmRwZjhBQ0RJbWlsdThDS3F6VE5lM0pTUVptSThJUEl6NFZOTkR2NVNKL0xUNk9lOWtya2hMZDFKUldVbTJyQXBTcjdWQ3cxZ3JKckt4WXNtc0ZaV2dheFl0bmxYano1VWYvbVc1L20xcCtZYTloazg2OGVmS2pQOEEvd0JMYy96YTAvTU5DNVhrWFovQTMzLy9BRWxWcmFXemkxb2FhYlc2NnRVSWJiUVZyVWZCS1VpZXRYMzZMZms1WExteTUxdFp0bWNLVFp0S0hmcUhRUExHRy81SStOU0w1R25aKzMrWlhlcHJTbFZ3cTVVd2hhd09CRFNFR0VucEtsays2aW5waStVQmJXNWNzdElDTHU5VHVRdDRtYlpnOGpsUDNaYy9WSHhvVmtiV2pVNHJvK0w4YnpjcktkaDRJcXRpNy92c3A5Y09kbjlKc3BJdHJCZ1poS1FYWFZEd0FHOTV6NDFVbHo2Yk5SMUhVV05IMEZLZE9UZEtjUUwyNVNGdkJDRUxXcGFXaHdwVnRTWUdlazE1NTdUYS9lWEw1dXI2NGN1WGxkWERoSVAxVzBjbTArUXFaL0pvL3dETk9sKzI1LzNkNnQ4N1VRQnNvdStGbVltTEprNUIxeUJwTys0Qi93Qi96UmY1VFBZc1dqK25LWGQzZC9jWExiNWZmdkhTNm9xYUxPVUE0YUhHZUVZd0txSWVQSlF5RkRDZ1JrRUtHUVo2MTZKK1c5LzNyUi94VjUrZGIxNThzYlYxeDF0aGhCY2VlV2hwcHRQTlMxbmFrZkhyN2FwbDg5QlB2aHlWcitHTmtscnZmVDFLOU5kdU5UVmRlamh1OHUrTzRTaXpQZUhCTGpWMnl5RmcrSlRQOVkxNWVyMEY2Zjc1dXowRFN1eTdhd3A0TnN1M1pCNUpaK2tFKzI0aFg5Q3ZQMVNsTzRIc29mQ2tPbUNSNDhybnVMZm90VmxaV1JWSzZwWlhvTDVFcS84QXREVlI0MnRzZmc0OSt1dlBoVU9wQTl0WDk4aWdqOTFOU0hVMmJNZTV4ZjY2c2k4NFhOL0ZaQjRiTFh0L1VLd3I2NmJYZjlxZEZ0THBOaHJWNnRwOWg4Z1M0eWJaaENVcFh6a0tTNkk2ZDVJNW12TFhhM3N6ZjJsd3ExdjJGc095U0NaVTI3bksyM2VUZzgrZFR6NVM5eTQzMnJ1bm1WclpkUWkxY2JjUW9wVWxTVVlVa2psN1BPcjk3RmFjMXEvWmF6WHJES0Z2UHRPanZVSjJMU3BweHhwRDdaK29vaEFWNFo4S3RjT1lTM3VGeStIa3U0UEZGazdGa2dBUHFEWFkrbnN2R2RqYXVMY2JaWlF0MTExUVFodEFsYWxIa0Vpcmo3SGZKejFoMEtYZnJhc0crN0trSkNnKzhWbmtsYVU4S0I1eWFsL3ljZXdTYmRlcjZxOGszVDFnOWVXTm5zVEpVTFpTZzQ0aFA4YXBTUW55Z2pyVTA5Q2VyWEJ1N2xXdFhLa2F0cXlUZHNhWXBTdHRwWk1uWTAzM1pNSWM0MUUvOHExSENOdFNJNHo4VXpsem00aEFEYXM5U1Q3RDBIZGVmL1FQNlB6ZGE4YmE1UUYyMm11T3J2UVoycld5dGJTR3ZZWFV6SGdnMTZLMC9zbHBkbDJoZDFKNzVyYWpVRVd1bmFVd2hBU1M5dGRjdUNFcFRBV1FoQW53YlBqVFc0MTNRdEsxY1dxQ2h0ZXRYTnplM3p6am1HVDNhbHBQTGhRWFFRRW43NDFSSHA4OUpxcnZXTGQreGNpMjB0UU5tdk8xVHdVaGEzdHZVU2hLUjVCWGpVZ0d4dDM2Mmx6dm51TlpQaDFOWVdmbC9aUDdLVi9LZzdEYWorN0NyelRtTGx4alVyZENMaE50djJsMWxKUVE4RUdOaFpDT2YzcHJ6OENJa2RhdW50NThvVFVMblR6WXRXaUxKeDFIZDNGeW00VTRvcEloWWFUc0hkem5NbUtwWUNxcE5Pcndyc3ZodURMaHgrWGt0QXJZZXBBN2xRVDBqL2QydnhRL09YVVZxVmVrZjd1MStLSDV5Nml0SFErUUx5ZjRqL3hHYitZcktzWDBDZG12blYvZDI0bmMzcHpyNEk2RkQ5b2o4amhxdXF2MzVETWZ2Z3Y1NWZ1SGRmNzNwMVdPRmlrbVk3U2JVYjdUNll0aTRMSzVrSDlKcGF6Sk9PbFRINVFtbE9pKzcxS0NVbmNUQTVDY1RVSzBwNUpnSEh0cFBrUjZVL3hKN1R0UlVPVmF0c25JSGh6cDV0RWRLWXZMaFdQR2hRNVBZTXg3Q0xPeVhmczA4OFUwdXRSU2tiUHM4YTNkUG5hYzlLakwyNHFKSk16elB3aWlJMmF1cVBuNGlOUGdIVmExQzVPNmVjbjRVUjBKaFNpQ1FmR2tkRzAvY3ZpNlZOTk5zMGoxVStGYXlKUTBVRnp3WStWK29wYTJ0QkE4djI2VVpiWUd3KzZra01jcUloSWdKcEpOSVNtOFRRQW1sdmJjekZLMmJmSEJFNTYwL2xLVVI5WWl0YWUxSm1UbmxOQ3VrdXlpR2pkYzNRazdCQnJHOVBnYmlBbUpra3dCakVrNEFoSitCcDlhYVlRNTNoazlCNGZ0L3dBcXREMFVkaEVYSlJmWGFBcXpRNUREUnlIMU5uSzFqa1dRb1JIVXBvZHN0a0J2NXF2S2xaQ3pXOUllaDMwWWgvWnFPb3RuNW5JY3RyVlFLZm5FRUVQUHBQOEFnQ2NodnJBSnhpdlFiVFlDUUFBa0NBQUFBQUk1QURBRmNON2RvQXhBQUFISVIwOWxkS1ZpUGY0ZVZIZ0JjWGs1RHBuNml1NEFIVTF3bzlaQTkxSVhkMmhLZHppME5wKytjVWxJOWtxTVV4VHJObVR3M0RDdk5MeUZEKzZxb1NlcFZMV2V5SnFjUFEvR202dDgvZEIvVkVlK2tGNnJiQVNYbS9lckZNUDN5V0gvQUtwajJTVCtpaFhPL3dEcFdCaDlFNmZ1WGdZS1VMSFVvV2tINExGTnpxQ1FZVW9vUGdvYmZ0NVVpNzJqc09memxnRGtEeFRQOW5UQi9YdFBJVi9DV0FCSlVUdWlCblBEamxVQ1hkaWlJbUR1RWJYZG1QdHdad0tqdmE2MlllWVhiM1ZxemRzS2lXSDBKTXoxUklsSzg0VjBpbXR2clduckorYlg5b3RRNWhtNVFldmdGZllhN3VMbVFkeFM0bEdUdElDa3htY0dEaXBOZTVwc28yT0FIb29ReHBON2F5dlRMaC9VTk9BWDN1bTNaTjJ0S1BWV0VGMEY3YnRCSENUeTlRMUU5WjdOMnJxRjMyZ0tLRnBTbzNtbGdwQzBvK3V0bHRKaHhybktZNkRBTldOZnZRNEYyN3FkNGx6Wk8xeVVpWkNTSVBQSnFHZG8yMm5Wb3ViWlpzNzlza2w5a2xzbHpoMmx3OUZ6OWZsem5CaW4ySEpycHcvdjhrTmt3a0tOOWhkVGc5eXFNRGMxa3pzbmF0TWVJVlB4RlcvMmR2Y0RQTUNLcEs2dWxydTFDNWI3alVXU0ZYVGJRQ1dud2NmTzJFakNTcE1GU1Jna1NLblBZM1hnUnNXUnVRU2xYdFQvQU1xY3ZCYlR4MFFyS2UzUTdxRmQybXZnZ1pvaWsxQ05IMU5PSU5TcTF1UVlvK09RT0NYeVIwVThOYW11ZDFKcWRGV3FsTFk4NjJCU0NIaDQwb0RXV3QwdXpYajc1VVAvQUpsdVA1dGFmbUd2WHl1Ui9id3J4LzhBS2cvOHlYSDgydFB6RFEyVDVGMm53UDhBZi84QVNWSE5NN2UzN1drT2FQYXVHM1plZmNlZmRhVVV2T0J3SkJhQ2g2aWVIbU0xRklISVlIU3NyS1hFa3IxeUhFaGhKTEdnRnhzKzVXVllueWJWeDJvMHJ6VmNqLzhBV2ZQNktyeUt0RDVNZWpYVG5hR3h1R21GcnQ3VlR5cmg4RDZORzVsMUFCVnlLdHl4ajIxdVB6QkFjZWUxdURMcUk4cFUvd0Rsb1c3cTczUkdtVzF1dXVvdTBOdE5wS2xyVVZXOEpTa1pVckhMeU5EZXplaVdlaTJpZFYxWU52NjVjSVVMQ3dDZ29zeUlKbjc3SUNuT2t3S3RmNVFmcEF0YkFXajN6TkYxcWpxSDBXU2xwRzFwUDBmZXJVdm1FVDNlQnppdk1IWnZTOVIxZldrb2RmSzdpNE8rNHVWQ1VzTW95UWhISUpHN2FFWXlyMzBSSVFIN2JsY1R3Ym16OFBEWlRvZ2JaY2U3dDdyMkg5VkdlME9zWE54ZFBYbDI0WGJpNFh1V3ZwNEpRZ1R3b0FnQWVWRHoxd2NZaU16NFI0K1huWHJuc2wyWjdMc2EvYTZQYWFlcTcxQzJ0bkxsKytXVXVKdDRTRXBMeFVjdXFLeEFBeE5SenQxNkxYbk8yakQ0dHcxcEtoYjNyOXhBU3lEYmV1Mm84Z3NyUzNqd05WY2sxK2Fid2ZGbU8xM0tEQzFvWnFiZTExMEFIdjJWRTlyT3gybzJpN1pGN2I5MnU3YkRqQ0VxQ3lxU0FFSGFNT2JscEVmaENwWDZTL1J3M1pONkUwODhwTnpxQVB6MVNsY0RRS21BZHFlUUE3MVFueXIxQjZSK3hkZzllNlBxVjdjSWFhMHk0QlEyb0RhODQ4cENMWkJVVGo2ZnUxUjFJVFZPZkxhajUxcEEvd0FqZFk4dHpOVGRDR2dsQVlIeEpOeERJaGhCMDNxMVY2NzEraXROcnMzMlVzOUlQZXM2ZUxVTWd1UFBKYVd0NGtjMUxVTnkxazhoVlJmSTNVMys3T3FLYVNVTS9Oa2x0S3VhRUtlY0xhRkg3NElnZTQxUVNqZ0RQRDZzbVFQWUR5cVI5Z3UwT29zUHFhMDY0RnM3cUJhdEZ1YkFvZ0xYQ1ZBbmtRVmsxRXkyNEdrZEo4TlN4WWt6VEtYRi9yMEZHMWNuYnJzUWRUN2EzYkxLajh6dG03VWFoY05uQ0lUUGNKVU1kOGZEbU1tcmI5S3ZiQ3kwclJnemJwYlE2R2ZtMm5XcVlpVXAycEpBeUd3SUpOT3RMdGRQMGpRMXV1ckpEU0MvY3ZxTXUzTnd2bW9uNnppbG1BUFpYalAwaGRycnE5djNiNjZVWldkckxVeWxsb0VsTGFCNCtKNm1hdWU3bGozSzU3aE9ETHhlVmpIRThtS2g5U1ArZjZLeFBSdjZkSDdQUzNyTTJwdWJsVDl3K2k0VXNCQlhjclU2dFRxZWZycU9CVlk2bDJrdm5MMXpVWExwNFhyaXlzM0RUaW0xcDZCQ0ZKTW9RQmpiUW10VU1Ya2lsNkpqY0Z4WUh1ZXhndDNYdWw5UXZIbkhGTzNEenR3NnYxblhuRk9PSHlLMW1TS1FyRFdWQk1tUnRZS2FLV1ZsWldWaWtvSjZSL3U3WDRvZm5McUsxS3ZTUDkzYS9GRDg1ZFJXbWNQa0M4RStJLzhBRVp2NWlzcTdma2EzWVJyMTJvOGpwTDZmamRXQi93RHJWSjFaSHllcjd1OVR1RitOZzZuNHYycC8rdFdPT3lUTkZtbDZ6N1pXRnU4MG9sSUtpQ1AyK05lZU8xblo1VGJoTFk0ZDNJVlpDdTFIVGNmZlF6VWI1RGc0aE5BWkQycG5BeHlxMXk4Y0dDbFE4YWIzZDJLc0M5MGh0UWhDWk5SRFdPelRnVVNrR1B2VFFEWE5LWWtQQ0ZXdHlUVEIwOFpIaXJGUDBXUzBBN2srTVI4S1lOb2x5WndETkVOb2RFZXcvWmkwYzBjUVo4VEZTdXdkR001QXFKcElnVVNzWHMwRk9OU3Fqa29xVXN1KzRVdTNjRGQ1VUZZdXNETTAvWktZNTVpZ1hSSTFqN1JINTBDY21CMTg0cHd6Y2NhWTVBaWdLTXJBRTgrdktqMXZiamJ1UFQ5cG9TYU9naVlua3FRNnZlYkxKMS9PMUNEQlNBU0ZxU1FpZkxkR1BJVjZaN0VOdG8wMjBTZ3BLRVdyS1VsTUVLU0cwK3J0OHg5dGVVMFdyanlyS3lTNEdrM1Y2d3lYekhBQ1NTUlBJN1pIdEthOVVnMjFwWU10dE5rTVc3YlZ2YTJyS1pjY01iR1dHMC94aE1EM2tubFE4TUlaSFo2a29ENGhjTkxHOStxVTdTZHFMWmd0dE9GYmwwK0Q4M3NtRWQ3Y3ZCSlNsUlMwbjFVQlNrZ3VtRWljbW84MXArczNCRGw1ZXIwdGpkdVJZYVozZmZGSmdENTNmdXBKN3poOVZzSkEzRUVxNTBhN01hVXNiN3E1TGE3MjRTa1B1TjVRaEtUS2JWbFpFbTNTWno5WXlUem8rMjJJOCtmc3FabFBsYithNWdBTlVVWDJEMHhSSzM3TkYyb3h4M3kzTHhVanJ1dWxxbzlZMkRDRUJEYlRTRXBBQVEyMjJoQ1Jub2xPQlMxM2NvSE0rNmdiMm9YTHAyV3FRMjN4YnJwYWVFUmlHRyticXBqaVBDSTYwSytSb05kVmNBNGpkYTdXOW83QzNESnVudGk3aFpidDJXa0tkZWVVQVNVdE10QXFYak1pa05PMU4xd0JUTmhjdHBVT0UzSlRicWp4MnJPOVBzZ1V6dlY2YlpFdkxRL2Mzei9BbnUwS3U5UnVUa2h0c2VzRzl4UENJU09aaW9ucit0ZHQzbGQzcHZaOW5TMlZZK2NYMm8yTGo4SDYzZHNyVWxQUHpQdHE1c1hORzFEOHdwZ2h1eXNZbTRDU3BadG0wZ0hLMU9LanpLcFNLak54Mi8wWkxuelg5MUxhNnVWYmg4MnNZdUhsRktTcFNFdHRGU2lyYUZZNTRxTzZmNkw3NTF0QzljY3Q5UXZOMHIrZE9YTjlhb0V5anVyUkliWkNzSEpIaFV4MWJTSEVXWHpheWJiSkEyL040UlpXeWh5VW5heTE5R21KNVo1VkdvMkNySlUya0UxYWh1cWVsZlEyeXN2MnVwTkpDOXU5N1NMdGxBSUFUdExxbWh1TzRkVDFGTzlIN1dhWmROZDdhTkpXMnNsSldFcVNwSkhyQllUQlFZb2xaNmZkYkExZU5KY2IySTJxZGZhY2VDazU3dDArcTdHZVByQTYwcGJXNm05NFNvdjI2bEtQY3VMS2kyRHRsS0ZFK3BJSmpwdXFNc3JhOERUZjF0TUltdEc0S0E2NXBxZTVWY056dmFHNHBLbFNESUFLRitzbFVSbWFyL1VlMU5tQ0U2aDMxcTZFclNOUUxZN3NLVXFBaTRET0FueFdRS3ZkclQyVnQ3bWxoU1ZEMUNlUk1ITUR3RlZINmJkRlphV3c0NEVoTjZIVXJTSldrS2FLVkJaM0o2aGNSK0NhYThJbWJLL1EvWTlpaHN5YncyMzlGRWRYYVF0TFpjV0V1TXl1MHYyRHZBVG5CQVAwOXFVamFVZEpWRkI5Y3YxdFJjQUJLakNYZTdPNU9Da2JwSE5KbEtncndCb0RwOTA1Yk9yWmJoMjF5czI2SVVXMEZSVjM5b2dxbHhxVEpiSEVrNytlS1BLUzA0eHViS1ZzUGdHUVFwSkpFeUNuMkhIaEhXdXVZMnhwU1VuZTBSN05la2hRV0VyT1BHcmQ3TTl1R2xwUnhqUFBOZVQ3M1QxaDNZa25HVWtUQ2tra2JoUG1JbzFvejF5Z2d5cmw0bWgrYTFoVi9LTHhhOWwydXZvS2VjKzhWeTVxbysrRmVidEQ3Y09KQUN5UkhPYWtiUGI1SDFsZSthdStZQjZGVkhISTdLN0dkU0U4NG56b3paM1FJR1I4UlZDSzdkdGdDRkEvR25MSHBPYjJnQmVSekhXdGZOTmIxVWhpRjNSWDRYVXh6SFRyNWl2SVh5blZBOW83Z2pJK2JXbjVpcW5kL3dDazg3U1J2SWpwUGxWTWVrTFZ5L2ZydVZBZ3FiYlJubkNCRkR2ekdTaWd1eStEY0owV1pxUG9WSHF5c3JLcFhyQ0w5a0Y2Y0x4azZxaDlkako3NUZ1WVdjWWtnN3RuUEF6WHVYMFdhM29UbG8yMW9qbHNsbHRLUjgzYUNVTFFJK3UyZUlIek5lQkpOV0Q4bkFuOTlHbEVHSlhjQXhpUWJkNHdZNThRU2ZjS3VoazBtcTZyanZpdmczelVCbTFrYVFUWGI5RmYzeW9QUnJxRjhtenViRHUzRjJhSDBydDFuYXBZZExhZ1cxbkUvUm5COFJVRStTc3BtMDFEVTdmVlkwKzlVMHlHMFhaREtsSUJXVkZzck1MRzZESThLdGYwemVsajl6YnJUMjNiUTNGdmRwZUxxMEwydW83c3RnRkFWd3E5YzQ4aFRqVGRjN0w2eGJkMHI1dGQ0NHJlNVFFM0RSTWZWVnhJT1BXQjZjNklJYnJzSGYwWERRNW1XemgzSmtZVEU3bzREcHYvQUgxVkZkcHUzMXJZYWk4ZEV1VGYzRnpxSnZOVjFCV3hYZXRoemNtd1pWRUJvSU8zY1BDdVBUVDZjMTN0bUxDeGFldFdIQURkcmNVbnZGZ2NtVWJEaEV3U3J5cVMra2I1TlN3SEg5RHVaQUJJc3JsUjVEbWxwOERHUHFuNDE1MnZyTjF0MXhoOUJiZFpXcHR4Q29sS2ttRkRCZyszem9kNWUyeDZyc09DNFBDODRNa1o0bnQ2MzEvTWYwN0t4ZFA5SStyM21wYURiWDF3bFROdnFlbncyMjMzWVdwTDdTUTQ3QjQxeDdCbmxVNCtXMS8zelNmNXZjZm5OMVR2b3lTRHJlamp4MU95L3dCdTNWdmZMV1A4TzBrZEJhdm40cmIvQUZWdHU4WlAwVzhqR2lnNHpBeUpvQTB1TkJlZnE2YlVvRUtTb3BVa2dwVU9ZVU1nanprQSs2dWF5cUYyN2dIQ2lwMzZTUFNocU45YTJOcmRiVU4yYVBwTmh4Y093RWg1YVl4QUJoT2ZXSjhJZ2xaV1Z0emllcUh4TU9MR1pvaWJRNjBzckt5c3JTSldWbFpXVml4WldWbFpXTEZCUFNQOTNhL0ZEODVkUldwVjZSL3U3WDRvZm5McUswemg4Z1hnbnhIL0FJak4vTVZsVFQwUUpQejE2UDhBMGl6N3U5WXFGMU9mUXgvMzUvOEFtYm4rMXQ2eWMxR2ZvbGVNTGtBOTFZcWdyZE0wUXNwbm5UUnc1cFpsN0lwTElTUW44WUFLUFduL0FGcGR3SlBNQ2hiTDFPQTlRTGdVYTE0S0U5cDlNU1d5cEE1eUtnVnJhcVNzaFFOV210Y3BnOHFpK3QySTNFb0J6NENpb1pOcVJNVEJLZEpOS01YSmcrWFN1bXJyRk9WczhZQ2txOTROY2FnMkFCVnV4UUVyREc0Z3AzWlBuR2FOTU9IYno2eFVQczdqYWM0by9wMXdUQjhLcGxqVzRwVVFiWENwbzZ3K3BRQTVDTWRQWjdhQ2k0UkFHTjMyMFJzYm1BU0J1QVNWUVJJVjREM25IdkZCU3RzSmhpK0o5QkYxNnFHYnJUTHBTTzlaczdyNXc2ZHhDVkZ2dXQ4d25DZ2t5QjF6NFY2MDdQT0tmUTFlT3BMYVhFYjdWcFNGSldodDFJS1hIVXI5VjhwSngwM3h6cng5Mmx0MEN4VWpkdWRTNjJDVmNoODdZM1NqZUo5ZGxZeHlqenIxcjZPTlhTN3BPblhYZXBkQzdKb3JjU21BWEVKMk9pUHFuZWxZanlOTDVDT1dMOVZyNGlqQmF4N0I2dFVtS2drQk1kQUo2U09rVWhxR290b2JXNjY0MjAyMmtxY2NjVUVwU2xJa3FKT0FJbXE5MFh0RTdlYXRjTnBTNDFZYVlsQldvSGFwMjVmVExLT0hNQm9sd2o4SnFtMnI2clp1M0x6dDQ0dzNvMmp1ZndoNjRVbFRUMTQyQW9OSkN6QlEzTGFpZXExSUFrZzBLUThuU0J0KzlMbkJqZGoxVW0wWGZjSkY0OEMxWnE0N1ZoWklVNjNuYmMzRTVDQ09JTmVFYnNtQW5mZHBOd0h6WmwzdVR3b2ZRV1VKWEhNTWw1UUJiakhlUm1jVlQzcEg5SjE5ZHN0MitqNzlQc0huRWgzVkxwdll0OXNHVk4ydHVzU3BrZ1pVWW5kSFdrTkc3U2FtaFQzZDMvMDZtd3B5NEZuWmQ0VkpQRXRhbHQ4b0tVd2NEa09WYWtpRVlCZHNmVHVQcW0yTndpZVlhcStsN0syOU9mZFFwYW1OT1pEams5NCsvZUxkZWNrbjExaG9xMitVeFJBYXpxby8vd0FWb1I1WGJ3UDk2M3FwUjJ1MXJ1MHZLMU83Kzkyb3RMUlFjVUZGSkxZK2JTY0NhYW4waTY4MjFxbTY5K2N1NmVTV2xMczJOcnFTbHRjT0JvSjRnRnhpdHNKZjBJVnorQ1REczM5VmNINzVOUkU3OU9ieC9GM2ljeno5ZHNWeGNkc2xnQlM5UHV4QXlHMXNyK0FDODFVaWZTOXEvZU1vRCtrbmRhTVhLa3ZNdk1wWHY5ZEtIZStJUjBJa1pwd24wOUtDU0xqVEE3eWxlbjNiVGcyeVFUdGVRQ1ZEYVpUVm94NVhiQ2lxSDRKakZ1Wis2dEIvdGt6RUxZdkVRSXpiazh4ajFPZk9tYjNhNncrdDNxY3dkOXM2a2ZtK2RRN1R2VGQyWGNqdkhuYk01azN1bnVJU1ZTQnREclFLWno5bEh0TzdWZG5uU0VXMnJhWTY0cktXbXRWUTI0ZkNHKytDajhLZzdHbWFkMkZSak1JN0VKZDN0RnB4VUNMaGhBRXA0dHlGZVhNQ25wMUMwVTJrSmRaY1YrTlFkc0F4amNacEMvMEZKUWZ1aTB4dWhlMTlPTTRMcUNDS2dQYUhzM0NpVU5zN2xJVUZyWGJCc3ltVm9LZm15MGdrR0JNZGF1Z2FISG9RcjNOaVcvU2twdnUyQ2p1aTZvZDd1RExLMUFnbHZha3BTQ0JNR29CcHpVQW5ZbE81UlVvSVlTMkNyNzQ3T3ZNMHRkZGxYQ1NVb1l5aEtKN3k1VEN0eWxMNGlESjNLNTBEdk5FY1NzOFMwS0prYmJ4MEFlUlNwSGlPVmRoZ0hTTk4zN3BGbVJoenJDMzh5SXVIME9BRkFjN3hraVRLSEFNZVEzQW4rbFJSR255T25MRmFTMm9HM0xtNExDQ2llYVZwK2pVRmhRRUVaSW95bDFJd0k1UlNmaThwWk1RRTA0VkVIUkJDZjNJUVRrU0tqVjlvNUR4QUtvbkZUTktvVit1azNrRGRLdnNvT1BKYzFHUHhtbnFoVFdrZlIrc1pBUFB5aWd5ckhhb2tUazg2bWwwb2JKSFRCOWhxUHZFRXFFUm1SV21UT0pVM1JOQ1ZhYTRVZ0Vjc3oxcUtkc1dnTHNnY3RqWitJcVNGMk5zbUJVYTdZT2czUklQTnR2OEFKUldJRHpGMFh3NVhQUDBRZXNyS3lteTdwWlVsOUdYYU5OcHExbnFLMmx1cHRsT3FMYmNibGIybldoRzdITllxTlZsWU5sVmtRc21qTWIraEZGVEwwcmVrRzcxRzZSY1hLRzJXMlVxUmIyN1pLZ2hLeUNvcVdmWFdkcWM0NVZFR0hscFdseHRhMmxvTW9jYlVVclNmRktrbVJYRlpXOVY3cXFERGhoaUVMR2dORzFLMXV6WHA5N1FNc0t0MU9NWGcyN1czYmxCTHFNSE85Q2h2OS9oVllYdHl0YmpqenFpdDExYTNIRm5tVnJPNVIrSnBDc3JaZVNxOFhobU5qT2MrSmdhWGRhUmpzUnFMYk9wNmZkdlQzVnRlMjc3bTBGUjJOT0pXcUFNa3dPVlQ3NVNIYnl3djdxeGVzRk9LUmJzT051RnhwYmVWcVNwTUJZazRCcXFheXQ2enBwVnk4TWlreW01UnZVMEVEMDNXVmxaV1ZHa3lXVmxaV1ZwWXNyS3lzckZ0WldWbFpXTFN5c3JLeXNXMUJQU1A5M2EvRkQ4NWRSV3BWNlIvdTdYNG9mbkxxSzB6aDhnWGdmeEgvaU0zOHhXVk5QUkF1TDE0L3dDYUwvMmpGUXVwYjZMbGZ3dDMrYkwvQU5velc1aGJDbFdPYWtCVm1QdjF0aHloeTE1cHpicXBVNWxKMjE5b3piT1U4UzVRZHRkTHB1YUZjeXlpR21rU1U3NTBRN09zSVc4RXJBL1l4VWRVOVIzc1M3L0NVY3VuNXhxaVpwYTBrSzZPUTZncG4ycDlHeVZXNWNaVHhoTzRHUExsVlBhcFliSmJXa2JzN2dlWUk4UEd2WW1rZDMzQ1E1QmxJNTFUbnBwMEt6UDByYVFoYWQwRk9KbWxtQm1PTHRMazZoaWJrblE0Zm12TmVwTUxCa1RBTkU5SDFBQk1FL2JSVy90QVU1eDQwSTd0cE1nN1FSNHhYUmFnNFVnOHJoTG9YN0haZHB2aVhRVTVFNTg2bW1sUEQ1cVZMampJUUZaMndpQ1JBenpuNFZCRGVJSHE1OWlacVpYUjIyMXMzd2hSYkRyeUJJeXVkb0huQkJvVEtBQUFSL0NNTnBrb20xSVdVSmNzMUtrdDk4ejNaM0VFS3VMQmFWcFFrSkVwbG9xTW5vS3N6NU5YYld6YnRIOUp1WGd3NDNjWEY0eXA5emEwNHc4RXJjU2hTc0oydWI1VDdUMXFwZXlkNEU3cmRia051TExpTVNFM1RiY0lLd0RsSmJLMFIrRlFTMzFWVnJmczZpbE81elQzTGU0U2lOd1UwSFZvdVcxQTRnMjdpa1RIV2w4VUFrSmpQNUlqamNEblFPb2VGcDJWd0o5SXFHZXo5eTdweXhlNnhxdDlkdUphdFFwUzdkS2xGcGh5NkNFa0kyMnJMWUNlcEthcSt6MXh3TjJ2N3NLZldpMUVzMjVRMkxkcFVyVVZxYmNmU0hIaXRTbEYwNU84OHMxSlBTWDJ2UzlwaTEyOFcrb1A2c2tNbTJhZFFEWlhLZTdTMnQ5S3U3Q1ErcEhCR1NENXk5N0Q5aStCU2RLdFV2M3pZaTQxRi91bkhDc0VwZFEydTVCSHJBZ2dESEQ0MFU0UndzdHpUWlA5L1JjbGl5U05jWE5JMjlWSG5PMWxvUjM2MnpjcmNLZ0hucjVsQ0FBRkJEYUVXeVZodEFNY0k4T1pwbzcyM0o3dE0yUVpDKzhETGQ1M2ZlT3BVa29KTHRxTnpZTzVXM3hJb24yb2R1azNxN08vZnVyVmJaYldteWRZYVVGYnNJY1NlNzJLazd1TkpqTkQycmQxd0Z0dExObmFxYldzdHZFTExoYVVwS2xJS3NwVm1Da1I2OVZrd0EyV2R2Vk5HNVdTL3dBcnYwQ2VNK2tkUzNiWHZnNGxLbG9iQ3pzN3BBZVhzZFdsYk1rTERZQ1FjUnZxYTZKYUpVMDlkSXVtbEJEYmpDR2txUWtqdjRRRTNKVWQzZUJIZDhNQ3UvUTE2TnRLVUY2bGROazNUTnh1dDdYdlZwdDJ3eUU5MDY0MmhVT0wzQXJBNVlGVHE4RGFkUVN0ZkNwVm82MGxQZEJKVkswWlVzcTNLV0FubEhJRW1sT1ZKQnFBaDJJNm9tRE1tYVMxNnA3dEJhQzFzV0hPNStlaTNaWVpYeGdJUTFjNzBoRGk1akR5WkJIUXVBOUtnZWozMnRydDFQYWZwU0xpM1IzcVJjQ3hTNGh1RUJUcFE4NGR4R3drOG9HNnJQN1phVHZzN20yS25EWU5OTWFpN2F0N0F0MWxieWJ0U1hWRWJrZ0JLeUFtTU9KNVJWTmRwOVJkN3dvWjFCVGFFZDhodERGeXB0QVErSVVrSlNybHR4SGdhZjhBQzJNTExkdWJPNlVjVXlaWE8yMkNqcjNhVjlJV1V1Z2Q2ZHltd3dubjRnbE1jcHlLWVBkb0FzL1NBT0VqSVVodFBMcE8zd0FwamQyQkN2dWdKSElid1lIU0RQN1RURTI1Q2hKRWs0TWpuN2pUMWtiRWhmSkozVTEwTFhicmd0N1MrdnJidlZwYlF3emRQc05rcklRbElTMCtHeHhFWk1DcG1qdFgybHNkUVhvN3VvTFM2aGFtSG1YbjI3bHRDdGdja1B2U09SVHhUVURzTEpaWmJ2N1JJU3BrcEtvMk9LYnVyWDZidk5pa25nS0VwUGhLRE5NdGYxMjdldTM5UXZIUG5GemNMVzQ2OFcyMEpXNFVvUVZiV1VoSElKR0IxVDQxcDBZZHRRVVE1ekQxVnhkbTlXMUJ6Y2xqWGJCYnJzSWR0amQyemR3RlFCdForY0pTaHd5RWlVcThhZnY2TGZvK2x1N2ZVd0NvSkZ3cCszN2trbkVLWmZVbUtvVFJSdVVWRUo1aE1BU0o5aDUrRldWMlB1aWtKQVZzNkZvUno4ZTZQNWFvTERHN1pYNnhJMjFMbkhsQzJMZ0pQZHZORlFMcW5GQU9Bb25jcmxrREZGZEZmQjJFazVnNTU1QU9hYTIyeGJUclNrN2U5WmNTU0U3VElTVkpQeEFvZm9GNTlFZ25tUUo5NEZMZU13ZzA0SnB3ZVdpV2xTcThjRTR4bjQwUGZ1UFd6eXJnUDhwUEthWVBPNEo4VFNTSmljeU9UbHk5ekJQTVV5dUhSejY5S1lYYnZQeXJWczJvZ2t5ZkEwYTJJTkNETWxta2hxRnlTQU16NWRLWHROUGJYQmRTU3FBT1pHQmdjcTBtMTUwYjB0c1FCMUlyY2t3WTN3cTNGZExHNjJta0xYb2JITUl4UDM2cTJyUVdBSktmdE5IWEd4NFlGZEVwS09Rb2Y1dDU2RXBtTTNKSCtjL3FoTnIyZXRESEFjaitNVlQ1UFpTemllN1YvYUxyZG1GVHk1VWNZVktCVmN1VElQOEFNVk5uRU1nLzV5ZzdmWlN3L2lsZjJpNjByc3BZZFdWLzJpLzEwY1lJQjZub2ZaVzdrME44ektUczRxNDhRbi9FVUlIWSt3SWtOTC90Ri9ycE5QWkN4bUMwciswWFVodEhEeStOYmVVSi9UV3hsVGZpS3oveUdSK01vQ3ZzaHArUG9sZjJxNmRzOWg5TkkrNHJuOGM1K3VpaVdwNTB1MnFQZFdITGwvRVZyNStmOFpRRzU3RWFlQklaWC9iT2ZrbWhTK3pGbHVqdXpFL3hpeCttcHd0d0dvOWZtRkV6MTVWYkJsU25ZdUtya3o4Z2JoNS9WTlQyUjA3YlBkSy90bDBtejJWMDRqN2txZnh6bE9YYm83ZWZMcDUwamJYQmtqOWhSSE1sQXV5cXYvS1pCTmF5bXQ1MlhzUVR0YlYvYUxvYXZRcmJvZzh2djFWSW5WeVBQbC96cG9VNXJRbms5U3BEaVdSK01vWTFvRnBIM016K01WK2lrRmFMYmJnTmh5ZnYxVklMTnVWZ0hFaXViMXRJTTR3UUtoODIvcFpWemM3SVArY3BDeTdLV1JNS2FWMC93aS9mVWh0UFI5cGhHV0hQN2QzOWRMYUdnRVQ5OUg2cWwxczN3K3l1ZHl1SlpEWGtCNVRTUEtsMDd1SzhwL0tWMFMzdDlUdG1iWkpTMnF3YmRJSzFMNGxQWFNDWlY1SVRpcXNxNC9sWi93RGpGci84YTEvdkY1Vk8xNmJ3aDVmaVJ1ZDFMUXZLdU11THN5UW4xV3Frdm84WEZ5NGY4M1YrZTFVYW83MktQMDYveEt2ejI2UGNMQ1hzTk9CVmhkNVR5M1Z5b1phQ2FMMnpWTHB0azFpSktXUXV0cVdhNEtDS3dtaEJ1alRhNzcyajNZMTZMcHN6ajlSbW85Um5zb1A0UzE3YXB5UElWT0luVUZlRjA5Zk9NaEZ0d2tqQjZSVE8xOUcxdzZqK0Z1cmMvQkp4VmlkaUxkSGN0NEhxajhsU3h0TWNnUGhYSi9ObGhJYW5FbkUzUTdOQzhnZWxEc1M1YThTQWU2Smc4aUJQTHJWY3NXYVNDTVo1NHlhOW8rbFBzbDg1dDF0QTdTb1FDQnlQalZGUCtoaTVaQWVMaFhzUEVOdk1VOHd1Sk5MUEdkMFY4MDNMYU5mVlZGby9aMGZPV3lvS1NuZHZPOEVEYWpKOXRTRzd1dHp5MTgwbFlDUnk0WkNjZUdLbVhhbGhwRnE2VWdLV0FocEorOTd3d2VuaFVGWTZxeGlPZlF5YXVrbDVwdjBUemhlSTJLTnpnUFpLT2tnQnNFd0NUdk9GbmkzSms5WU5PKzBOa0hyWVBIY2c1UTkzWmhiYWtKU1ZPWTVwSU8vK2tSVE5NRmVJOEJpQU9sTzJydEtUczROamlPN2M3eVFnU1RDeVVtZG94UGtUVlZrRU9IWkdUdzYyTmk3VnY5RkV0TzFWMXR0L1RiaVNoaDYzdkxaUk1GSXRua0tjU2svZWxoU2xEelFhOWIramxwcE5xbTNhY1VseGhiemkyVnZoRy81dzZ1NlE4RW43b29wZUFtZnFKOEJYbWZ0ZG9DZ3BLaWlIR3k1M2FWQk81U1FvdFBNTDZGWW1QalZrK2orL1p1ck5oU0lYcUZrbHUxdVdWUXA0b1lCRGR3bEVjUUtkb01jb1Y1VnZpVWhsaEQyZHVxNFdmaHJZcFN5L0NmS2Y5bHI1UU9zc3ExSFRHVU9vdWJqVDJMZzNsd3RIZUpRcDF4RHFHRmQybnV5WVFTVWROdzZtcTJ0cnh4ZDA0K3B6MW5DbElRamExdFVOeFBVSkhySmpIU3BqcitqckY3Y0EycnBZVUM0ZHFGbENBNlpYd2pJRzZUUE9pZlo3c0pEZ2NGczV0VHhGVDZ1N2JTSTlZclVtQTMxejk3UWJzdG1rYmRxUm1OamlGdm1GQTJwbDZJZFJiYld0YjVGcmJ1VzZKVzlnbFJXRW9DaU1KRXFLWlBoVU85SlhhSzVkMW00dDdPNWE3bTFZYTN1aFNrb1U3S25TRmtTZTlBamxubUtTOUkzYUMzK2JMdGJVcHVMZEswcTFDNVJsaDFiYWdwdlRtRkhDd1ZoSlVaT0o4UkFqc2xwcFN5OHRaSldwTGlscUcxTzVaSjNZaVozS1Z3MURHeFd4TTVyeHVlM29pTWVBWlVwUFpOdFQ5SVFTbldrWHl5bGQ1cC9kMm56WkRyeFc5c0RQZEtVc0R1VWhJM1Nhb25VR0c5cVZOdTd6Z0xiVWdoYURIUllIZHJibkFWTStWVDMwZ1dmMGkxcUdRN256M2M0bkFOUXE2dGVJaFN3bkEyTE03U0RFQWtEQkF4N2hYV1lMR05aYlIxWEw4VkRtVGx2WkQyTGNIb3IzS1J6OTlFYlRSVUdaN3pCd0U3SmlNblBPdElzSEJBMmhYOGxUYXNZekFWNTBRYXRGQ2R3YmFBNXJXcEtmc0N0MUV2YzdzZ1JHM3FVYTdMYVV5Mmk4dWh1VXUxMDI5SUJTTnU2OVFOTVpVU09TZzlmTmtEeEE2VUM3UlpJYlFqdTJXRWhMVGU5UzQza0Y1d3FWeEZaV2tIeTJwOEtQZnVxQXdiWmtsU0hTaHk1ZVVudS9uQ21WQmJMU0VSSVlTNEF2ektFMEMxaDNJZ2VlWXp1d1I4UldvaTRkVkdWclhkRUdaUUpNbmFUTStkRzdNUUJzZUpPY0tCV25hUEdjMExaU2tuZFBxcVNBSTVqcjl0VzdvR3FXaHRkSFpiUWdPdHVPQzViQ0J2WDAzS1VvWkhsVldYa0dJWFZwaHd6Q2JPZEpOSmhvT3AzRGJEYjdibkIzaXJkNjNXTzlTQ3BzcVNwbFJPNUNJNlVWMEpSMnBUUEtCOWdvcDI2MHBnRzJkWVIzUmVMb1cyQUFqNkxibkE5YmpHZkttTnJiN1JQalNkK1VNaGw5RWY4QUpIR2xMYnRHWEY4UHVwc2dqWldFeUpIaFRadmx6b09NSWg1dE1MOG5pOXNVVjBTTmtkYUczSXo1VTkwc0dQYlYwdmtROFk4YUpJWWtIcDBwM3BMY1k4RFNMQ3hBSG5UbTI5WStkTFh1TkVKZzF2ZEx2cGxSRk4wc2tUSHRwd3RXZDNoenB5aUZKVEhqVmJYRUtaRzZUc2tKa1o5dEZsTmdDUjdxWk4ydWZDbkx4NElxcDl1Y3JBUUdwc2hlVDl0T05nSXBnZ25kVHBUc0RGV1BiWFJRQnRkRVJ5cnRDK2VSQnBuMzgxMHAyQjByV2xhMUowdTRpQjc2VVN1YzBLZWYrOTg2WDA1M3A4YXd4MExXOWFkbGNHZmo3S2ptdTNtZktjVkszMk9BbU1WQ05kUnh3T2xYNHRPY3FzZ2tOV3JkNlk1bW5TQVltaDlpVEk1MFdKNFRSMG14b0lTUGNXdHBjbkJQU0s3VkFFMHhVOEFhZklBS2FGbFpTSmlObGJ0bGplTXhTbW9XeElQdG1obDI0VWtVKzBTODN1QkpPQmdpaFptRm8xQkZ4UEJOS1E5bGh3cHFhcFJ3ak1Zb1BvbW5nSi9KaXBJdzFqa0s1VEtsRG4yRTBKMHRDOG4vQUN0VXhyRm9QL2JHdjk0dmFwcXJzK1dJSTF1MEgvdGJQKzgzMVVuWHIzQmZ1VVg4b1htUEZUZVU4KzZ5amZZNzd1djhVcjg1dWd0R3V4MzNkZjRsWDU3ZE15bDRWZzZmeUZHclhwUUhUbDhxTTJ5NlhaRFUxeG5VRTZlRk5WSHlweUVLT0sxOHlrK3NaOEtGRGRrYVhwSmtHanZaNXNoNXMrZEMyV0l5TSsycExvUUVwT09kRFpHelNyWUQ0bDZPN0F1L1FOZnlSVTBhcXZmUnU1OUNnVFZnczlLNG1RVThoVzV2VkxSUWJ0WXBBdG5GTGlBbFIrQW1penF3QVQ0WnFrL1RKMjBjS2hwdG9DdTVmTzBBY2tKbktsRG9LSXhveTV5aGhST2MvVU95cXp0dWorRExJT1YzQ0hDbWVMdXlYa3BVQjRibTZoMnlPcVIxVU9YVDJWYnV1YUVoTjVZV2wxdDd1NTA1cGtsVWdwZExyb1FvQWVzcVZtRStLUlZaZHJkS1d4Y0x0MVN2MUZvZUU4U1hFaDFBT09GZmRLUW9vNmJqVGZIbUJPbGQxZ1pEWGdRZys1UXhoV1pIdzZlQTZlQXJiQ0FWWmpKeUpCM1pBSWduSWdHdDJ6UEl6MUk4T2cycUhsT0s3UW9nZGZyWUJqTUFLeEVjNW9vcHRJNjcwK2xLVU1OdFBXaTIxSGErMFVpU29KU2wwcFVsaDU1YTFmYzFINklueENLZ0d2MnEyM1UzU0RjTk9OTENibExMaW1WSUtaNDBLVGtHQkc3ekZIZEV2RWk0UXAzY1dYUG8zOW9TVmQwcUFTa0s0ZHdnRWV5cGIyMjA0cmJkY1NFcnViVkxiZDBKQ3pjVzdvVXUzdWtyVHc0WlR0VUJ5cUVNcGhmWFlwTm1ZMGRESGNMSjNCOUNtWFl6WHRUZmJMZHIyaDFSdEd4SUFmVzAvc1dTcmNoYWxwN3lBQW5JenhVTzdZNlhyQkFOM2Z1YWtGclMyMjJiMXhRS2xLaEtlNGdKVXFmcXFtb25vdCtiTzczZ0tYYVBRQ1QwSUJFRHhpZmZGV2JZT3FkYytlcFFwNWhsT3kwMkpFS2VnRjI1aFdNSmhBOFNwZldwNUQ1SXBOWXJUWG9QMFFVV0hqa2FYaW5EcW9vTk11cFM5ZXc2YlZaUTNiQktmbWpRYkoyb1FodUc0QnpBOEt0SFFkSElzVktQcWdiWEJ0a25obFNWRVptWnFNWGVuWFJSSGQzSGRPcFhMVExDRk9Tb3lwWld0d0RkSkp3RGdpWXBXNTFaOWh0YkZ4bEpTSEFFcUM5MjVPTjRUNnBIS004dVpvRElrZk5WSmxBMk5ncGhVQzlJTnVONjhSSmxJMmpFZVZWNiswNEVieHU0ZVlIVko2ZVE4cWszYkRXQ3R5UUNlWkFnamwxSjk5Ujd2WEZKamJ0OVhNcWpQVGFSWFQ0TmlJQXJpdUx2YS9JTktVYUc3YnVhZTVidU1XeW5tVDN6YmhZWkRwUXJtZ0wyYm9Db1A5S2hIN21NS0NYR2R5T0ZlN1kyRkZLa0dDQ1luL3JUYlJWS1M3c1RQRVNnREp5WWxQdzZWdHU4VzI4OGxHRXJJa1FCelR0a1p4bjhsV0JoQk5GVUdSaGFMQVhOMWFyQlQ5SWxhVWdiVmdreUNrOEpuSVZpSThxRzNDWlZFWlNsQXdCNEE1enpxUUcyU1hCZ3A3eDVLNVBKU1hWcUN3UVBXOVpKSDhoVkNkWVVCY3VvamIzZTFCSFVGSXpKNitQdnErSTJFdW1BQnBCcnhqYW9LL2pBY2Z5UkErMmlsamRyU3BsYmFpaFlsU1NuQ2dRWmtHaGR5N3V5T3FnbEk2d0tLV1RVbENBY3dHNVBRcVVFay9DYW5LQVJ1dDQ3aUhlRldEMmF2N3Q1cEw5Mjh0M2ljVGJvVUFrTm9rRnhTVWdRbmN1TTlkdFNCMFNQT2h0bXlsQ0FoT0VwU0VvOWdQTDR5ZmZUcE56OWxjL05XdllKN0c0bnpkVTl0L1VQaU9kY05NeVRTQ0xqTWVOUGJSWDdDaGlLVm14MlE5NXJNSHpwL2FDRWlzWGJFcW56cDAyemlPdlQyZUZhZko0VnRqZDF5M05PMmw0bXRNdEQ5ZGFkUkhzb1Z4QlYxa0xxNWUrRkw2WmRBWVB1cEh1eHNQN2ZiUXhsSjd5QWZaNVZZeGdjMmxCN3lDcGMzZURsSTl2T2tycDh4a3hpaGpDL09UVFM5dWlUSHVxdGtJRGxMbWJJcmIzQUorRkxPbkhYOUZDN0pPQlRzdmRLeDdGakNrRkxJT0IrbXVYWERHSzJ1UGZYS1JpcE5wYWN0TWc5Y1RSQ3lkU0RrME1Mc2MrWFNtNjdsUklqOHRiY3dsUUQ2Q25EdHlDMUFxRzNyTXVFNU9hZk11cTI4NjVhVHhaK05VeHQwRlhPOFlYREZzSThLYTZtL0FQU256NnhFZkNnK3FHUWZLakl6cU5sQ3llRVVFTVlmS2w1emlqZHJjUW1KNHZPbzdiQ0Z5UGpTdC9ka2RjK0lvbVNJTzJWTWN1bEw2dGRrbmhKUG1UaWlYWkUvU0E5VEJxTUxYSTV4UnJzazk5S2tlMzlGRFpjVlJINkl6RmZjZ1Y1YVFaUW4yUjhhTFc2TWV5aFBaeGN0ZytRL0pSVkt4bUs4N2w4NmR5V3ZLUHl5UDhBeHkwLytMWi8zbStxa3F1NzVaSC9BSTNaL3dEeFRIKzgzMVVqWHMvQlB1TVg4b1htbkUvdkwvcXNvejJSVjlPcjhVZnprVUdxVCtqbTAzM1RpUDhBTjFIKyswUDAweWNhRm9KZ3MwcEphdTVvMVl1RWtVeFZwcWtxeVAyRkZkTVlNaVJRY2oya0poRXdnMGo5azBUeXB3MWFtVFRqUzdZKzRpaWFiYU9ocFUrV2ltckl0a0ZjdFRJUFdpV2tFVDRRWXJ1NU1DaExOMFE1N1QrbXFuTzFoVEEwbGVodlJyOXpUVmtXNHhWWCtpdTRsdFBsVm8yMlFQWlhIWklxVXEzTDZCZE9va0VlSWlvZ2pzUGEvUERlRnNGNGphVm5uRlRJSnJGQ29zZVJzaFlwM1IyR3FwdlR6cDZkbGtTbEliZFJjV3BXWkpRNzlGY1c1QkhxaVczUk5WSHBiTGR3dHF5MUJUaVhrOTBwTGlka3FTR0dBa3BUTUEvTm1VcUpNZXlUVitlbkhUOStpWFJUaHkyTE4yeXJFb1d3NEZia3lmRDhsVWs4OVozRnAzVHdVMWRXalQ3cWRwYkllTFRManppMHo2eWliWnVSMEsxeHlvNkoxTUJiMzIraVk0ZVlZb3pvODVORDZLQ2RvOU1mWWQ3aTVSQ29sSlJPMGdwYlZ3S1AxUnlqeU5ER3QyMWVPWEZJNTU2Vk9ic3FkL2d1cS9kQUFXN3BVSkNnMSs2U3lnTFdrRUtVK1d3STU5MGFpK3BhVTR3K3UydUFRdEMzQWxlMVFRNEVMY1lVdHVSbEc5cFluOEUwMWpmWXAzVmRwaFpyV1Joai9PbWxzQnRKSUVIaW1CeTZnWnpOVExzYnFKVzNLME4zRG1ub1Y5RytGTEwxaVFvTGFDQnd5a3FFSHlxRVBiZHFmUElqbElINUtKOW5MNXhsOXU1UWNvWHhvSTNCU0ZRRm9nWUlLQ3JIc3Jjek5UTnVxdHk0YmpkSi9tN0pmdDUyZVlRbEFTZThzYnh0THRzUVU5NE9CdGFtMWJSdFNwSzFsSTZ3azFhbm9mVmJ1YVAzWkNXMGFZanUxTmMwZ0lsNVR6cWxHVmxSMnJ6Z2QzanJVU2N0MHVrV29kY2FzYjNZNVl1bGxSU0gzVlMyaHRsaElXVDNsd0lKZ1FEVWR0YmgrMHVuV3lOdnFNWFRFWXVHVUxiZURmNEtDa2JncWNncUZVaHhsajVianVsTG9lZEhSUDJvL3ZkWGFyVHd1NGJ0MXVKZEl1VXVYU0ZFVHRJSllhU2hCaHBuWTF1Q0RKSTNFamlxUDl2OUthUzB0WWplTHhoRFNWODNVTkthVThqSWdMMktjSVR5eEdPaWZaenQ0MC9xRjZXUVZKWEN6M2pTRU9JY1pBYXR3aHFTWFZMUXR5RmRERlJQdExlWDk1ZEpjUTh3M1pmT1c5ckNRb0QxdGppbjNGa0lVU2hweFVuR1BHSnBaakZyOTlxU3hnbEJWbU5lajZ4Mk16Yk1yUTR0U3dsU0VxUzI0cEVnL1NaQ0Nwb0NQOHFRY1ZWM3BDN0NXeU5yRFNOaFZlN0dWSVJDMGIzWG13a0VjU2dIMEZNY2dGY3F0enNkMnEzVzdBYzdyYzA4aGx4YVpLUzNMZ3R0cFVNdWJlN1VmQVBDbVhhUFl1NnN3c0VPdDZ1aHRVbUZkMTg1UmNvY1Z0NUpCZEtRcjhEcWExaTVNa1VoQk95QXlJaTd6QlZ6YWVqZTFXeXlwYktXYmk1UXlRODBnaHROeThFdU51S0tWWVpNRkhPUVVwSWtib3BUdFJvN3JWNjgyNlNYSUxreU9NRlNteVFSelR2YVdQYURYcURzbGJNSjcxcHhDMnl6ZTMxcXNLM2JqYXYzSHp1MFVRazVTaDFLbG9XT1FEZzZ3YXo5UG1rcEpiZldRaTRRNjh5c2JSdFVMaHlGaVVtVXFOMGxTeCtPcm9jUEoxUExidExab3kwS0phQXBwZnplMmxvTjd5bEw3ZzJ3bFpRVk5ySXlsWVVQMGRhZ2ZhRlkrZXZxTXFTdGErZjFnbmdCSHcrMmpXbU44WXlKVTdzakFXQ3VEdWpuUEFKOTVvTHFsd2p2M3c0UUNIM01nNXdvNW5yNDAwaWowb043dzl5Wk1NcCtvQ1ZIckVCSTYvWlJqczYwUG5EQ0FaM0tVcGF1ZUc0Vk0rTzdGQkZYc251MlJKVmdxSFB6aXBGb0RQR3BTUkhkdDdBZjVVQW5uenJKdWl1Z2FEYmgyVTM3NmN6VzJuT00rQm9RdzZmMDA2MzhqUFNsTDQwV3liZFBYM0lWTlByRzVQV2doY21ubHE2SUhpTVZTNlBaRU1mYmxJN1I0RURyU3lIQjVmcG9IcHJ2clp4UHdwMFZrZTdyUVQ0ZDZSclhlRzBXUytKcFZiaVQ0VUpRdjdhNjR1blNvOGxhTWlKdWtiWWtjdWxERURKTVVzd0Z3WnBuZFBRUjQxT0p0S2x6clJGaGVLMmxBbW1GczZUeTYwK3QyemlldGFjMmlwdDNUczRBcmxJbjM1cnZZVHlyYVVRYUh0WEJJcWdZNXpYUldCenBHNG1mZldMSENRZW5LckFGVzV5UWZkQkVVbGJBYnE0YlZIUHBTaytINUt2cFVoUDNMZ0JQNnE0WmVubDFvYTQ0UnpyaGk2emcxSGxiS1pscEViaFptbWx3SisydTBHVDQxenFDb1Q1MXRnb3FMallRdHhVZnRtaGVwdTVwWmJzayswMEsxUlptbURHMmdTNU9tMytEeE5HT3lMdjB5U01WRTJuY1ViN0xQdzRuMjFES1pjWkNJeFgxSUY2QjdPUDhBVE04Tkc3ZGZLb1JvTjF3andqcjhLUFdWOUJpYTg2bXh6cUs2dXdRdk9ueXgvOEF4dXovQVBpbVA5NXZxcEdycStXQzREclZtUi9pcGovZWIycVZyMXZnd3JDaUgveUY1anhUNzAvNnJLc0wwRDJ1L1VYaytGbTRmOWJiajlOVjdWby9KcUgvQUdzLy9NSGY5dmEwWmttb25IMlErTUxrQTkxYW10NkFOZ1VCUW0wMDNQS3JPdXJjRnNnL29vRUxJWmdkYTUwWkpYU2pIQ0g2Y3hGTFhMWjZHbnpMT2VWT1hMZmhOVU9kWlJJYlFVYlUxSS9YUTUyMTRnWTZpcElwbm1LYi9OOGpuVnpDcUpBckg5RnI1RUo4ZjAxY09udWNJOWxVejZPVVFzZTZyYzA4NEZjdG5DcGlyWnhxakNMQmRhVXF1V3hVZjlJZmFSTnBwdHpmR0ZMWmIyc29KSEc2NFFodFA5WlErMnFZMmFuVUV0YXd1Y0d0RzVWVi9LSjdlSUVhUmJxbE1KZHZWSUpKSkJYc3RwVGtlcnZQOUVWU1dvNmlRdU5wQlRNY1FKMmtGQVY2dkVydWxBVDVtdGFoZDk0cGJ6MExXNzNqaWxyQjRuSmVVb1I1eTJaOWxjM2JhRkpSRUFwVTZtZWFNTGhKOFlnSkh3cC9GQUdORmhkVmhZY0VjckdPYTdWM1BhMU9OQVd6ZVdyaktqc3ZXMWQ4MlVsSWNkTERONHNMVzRwc3BTRGNYYllJSFJJaWh1cHU5Nnk5YlhZMlhGbWxlMStDcGJyZHVkUWNDemNPQ0NEY1hITWN3M1BqVUpzTDVUYnJiaUkzSWNRcE83SVRCQlRPWTlhUGpIV3A4TFlYaktDeUNtK3RtTGR0dVFDVjl5cDFBUzJOKzNZYnA1QUJQS1BBMXAwWEtObm9WUU9WRGx2bUxyMDlsQ2I2MGNRNHRsd0hleTg0ZzR3U0hGdHFVbkdVN2tIN2E1dWJoY0ZIVXlTUmcremxVMTFGNW03c3UrU0NkUVpKUzRFd1M0cHh4cHRPOVVoRGJhbnJpN2VDUjZ1dzFDUkV5SVBDRG5sMXprK1hLcm1PMUxxTUxOR1hIelNPblpUTHNqcWJmelYvVDdwWWJTaFF1N1I4cUNBMjZoeERZUmdieTN4NytlQTJZRkphdFlQWERTVkJzcHZMSnNwY2FDSWx0dHQxOGpaSlc4OFVxWmcrYTZpVjI2Q3ZnQWlZUUFtT1kyZ1lNSE9JNnlBYXNscjdqYjY3Ymh0YmlBcEY4eWxRU1FFTHRVd2tFRW1YSE1ET0VnMEpLT1U3V08vOS91Z2N3RENQek5lSnlyMjNldUcxaHkyV1duZ2t0TFVuNjRKV2hTRHVHREVnZUJGU2xuWGxMWlpjWkNFZHlwdmFnSWJDRzNnbFNFSkNFSkNuVkFxVVlQa1R5cFB0L2JNNzFYZGxsaFFTdDhpRXBTc0phYVU0ak1uZGNHNVNvZmZOS3FMNmE0RXVvZU83WUZJUzhFaEtsbElqaVFDWTNDSjg0b3RsU2dFaFhPaStZaTV6UlJQWlNkL3RhN3RaY0RZYlF5SDNBaGxJYUw3cTFCVHJ6aFVOb1Z2YWE0UUNJVHpGSGJ6dFpzc25MNGx2NTU4NFZhV2FVTGNVRkZiajF3bTVVRkhKNzliU2pQUklBRlJsaTBRcTNXNzgyUy9MSzF0Rnh0SjM3a2xha051cEpXbDlKWHVTMm1ZRG5LaEY3cDF5Mm9NclFzaEttZG5lTnVNOTZVN1ZOQnNQcEI3MVhFbEtoaFVZOEt2YkF4eHNCYzdrdDBuU3A5Mkcxd3J0VmtOdXV2c1AyaFM0UW9TMWEzSDBDQ3RSMm1XbHZJSDR2UE9nSHBzdkZsRGlGN0M0dTcrY3JBTXBTMnYxQUVjMG5lRmcrQkJwTHN5NnNyM3QzUlI4M1pjdkdtbG9PMHRMV2hENWNNVGh4MEoyNWdMbmtUQW50KytudjJVTk1yNzd1UWplMHBha0tVMjljSVcyNG52Q1pEWlFDZzlTZkNpTVNIVExZU3ZQYzBNb0ZSMjFiUklkRWd0eXRja1FBaEIrdDFNS1Q4YXE5OTdjdFRoNXJKWDhTVDhjMVBlM0dvTnQyNjdSSDNWMTJWYlNwU20yd1FwVGU0OWNCUHVxdjBqUHYvTHlyb0c5RnpqdHpzbjJuSklRcFE5WURhSUhWWWsvM2FsL1p4cUdFOU4wcTl3TzBWSGJWdUFscnFBTncvQ2NFUmp5TVZNcmRtQUVqa2xJQTg0b1NkMW1rMWF6UXdicDJ4MHBWOXM5S2JzOHg3YUx0TXpTK1YxSzZOdXBEdzJZNVZxMGNJSkI1enlvL2EycVNPbE1ML1RlT1JQdXFvU2c3Rlg4c3QzQzdzSE9MSHRpanFvS1FZNlUxMG5UWlRKNStWRm1yS1AxVURNOGFrZkUwNkV3dDBkS2NOcmozR2xWdGlZcHMrb0E1cW9FdVc5Z25iS3dlZEJ1MEtRTTBRTDZZeHpvVmN0cVd2Sng0UlZzTGFPNnBtM0ZCTGRtaVRJTTQ2MUtHMERHS0c2VGFwU2tEeG8zYVc4NThPbEI1Y20reU14MlUyaXV4dENjMEl2TDlJWEhoVG5WM05vSW9CdEJNeVBqVXNlT3haVUp6Um9JcVhnVXpITE1VeGJmeWEwb3dENDhxUkI4cUpheERGeVN2SFlQdE5KMno1M1FhUnUzQk9mR2xMTWllV0tJMFUxVmF2RWxyNGtqd29ldzVDczBXdVZDSW9RRThkYWpHeXlUcUVTUmNRSlBXbTkzY3lEMU5jWGJnakJvV3AyTTFOa2EwK1JkT3FvYnFCa1NhY0tmeWFIYW84QVBkUlRRaEhFSWE4L3ppcEIyWFZLMGUwVkVkMG1wYjJaVEMwbndxV1Ezd0ZaaXVKa1Z6YUI5ejhnUCtkSU82bnRjRmM2QTc5RkI4SVB2b0gyam5kSThhNHBrSWZLNEZkWTk1REFWVjN5bkx2ZnFkbXYvQU50YUh3dUx6OWRWUlUrOU56cE43YlQwc214L3JiZy9wcUExNlJ3NXVuSFkzMlhuWEVYWGtQUHVzcXl2azd2UnFqeG1QNEM0UDlkYlZXdFR2MEp2YmRRY1ArYXJIK3RZL1ZWMlFMamNQWlVZNXFRSDNYcDVGd2tweVpNVUpOeGtpZnJVMHRiMlUwd3VIK0k4L2pYTnRnM1hTOCttMmpqRDJlZEVGSzRham1uUFNhUHRMa1Zra0drcmJKOVNhS1RrMXB0T2ZqVGhTS1NDWUlyR04zV09kc3BwMkU5Y1I0MWFscURBcXFld1E0eG5xUHkxYk5rZUVWeS9FLzRwVjduV3dKNnd2SE9xSCtVMXF1NjVzN0FxK2hhYitkUG9NaEpXcFcxcVNQSksvd0N0VjhOcDhLODMvS0hzMS91MHBaaUhyQzNMVWlmdWFuSmdEbU4yMzQxdkFGdkpLemhyV21mYzExVlkzVGJQRVFBVkpKUENwTWxPeEhxNXlBYmR6KzBGTkYyNndwU1cxVENuRTdaS1ZFSjN4dVFjWlNsUFhyU2liRlpKbmI3REdTVGdaeDRZL0NwbXRhd2tCU2lEQU1neVlDUm4yRkNRWi9DTlAyVWU2NnBqSHdrUlk3dzQ5WFgxU044MXc3dVI2ZlZKaEVFcUJ4TUg3QlJQc2QyZ2VZdUVPSlVUdEtGd1NwSVVwdmpRa2hQcmZTb2JYNFNnVnZTSG1sRHVIRW9VWU9TbEcvYkpWQVY0ajlGQ2UwTmdSM215U0FuQUc2QmlBb0s1L3NhdHJtZlp1U3d4UXlUeXRjd2dxeEwrM2tNYWphRk1ORzNRODJTNGQ2MElWYnNsRFNlb0xUaXlUSE0xejJ4MFJrc05hblpxbHQ0SUQ2RXAzRkJVSDFsVGlrcTJOT2hMYUU5MTRLQm1vMzZMKzFvU29vY0pTdElVbDFPMUJLNVp1TFpEcWQ0SlVSODVVcUJ6cVk2MHBocDlEbHNWTDAyNVdoeTVhQVMyMmd2S3ZXVnRKWkFFcURWcVlQUG40MHVsWkpGSUI2ZnVGSEZ6enpneUkweHZWVjdiQ0NWWUpUQmlTTXpFa1I1MGI3TTlvRnN1T0lSSWF1UWx1NEtUeEZBMzdNcVR3cFNWcVZBNXdCNFUyN1I2U3BpNWNZM2Q0Z2xDbW5RVWxLa0xDQ3BTVkp3WVVvcC9vbWdnV0NlZk9PUmp3RS9aUldsc2dzOUYxd0VlUnVkeFZoV015NmxnbTViUXAvVEhrdXVwVTIzdmphOXFqVnFsSldxQjlJM08zbEhuUW50Um9LVzRmdFZCeTBHeEFWdVdvSlUzYjIvZXEza2Zjdzgrb2VSeFEvUWUxSzIwZk5uMC9PTE5RQ0ZzS0pKRzBQcVQzU3llQlBlWEJWdDVZb1lyVjFKYjJKZVc2d1VwM3NPS1BDbzl5NjZVd29Ka3V0cFQxeFVHUXZEbHowVE1odVFYay9aaEs2WnFxbTVBQlUwZHhVeHVnRndvQUR5WU9GU21wTll1OTVadE9oQnVGdHJKdDJYbHJlSGVvYU4xZFc2WlBlc1NFclFtSkJWdHFCcnVXMUtkN3JoTWxSUVR0S1JLMUtqcHlJQXBrZFZXMnNQTnFVMHRyQWNiSkpLbzNCVW5oM1pJbytPSXJXZkxqNUZtTTlPNnRydFE4RXNxV3dVS3Q3WnR4cGVRaFJGeVE5M2ZlQ0UzRGFFckxaVjFTOEpFeWFwcnRYMnRjTGkzRXIzM0t5VmQ2ZjhBQjk4MDBoY0tIckxsbE0reE5kYTEyZ3ZIR3U1ZWRJVExoMnBBQTNPaG9jbThSOUYvZU5SVi9UbGs0S1ZDUWNZNWo4TDJVMXgydGFCYTR2S2hrY2VpSFhhanVLbEVreVNTZXBVWlVmaVpyclQyeVZTZlZSeEtQa09WSjNUS2dyaVNSNDRqeTU4cUlJVERPTUtkVUpqb2xQS1k4elJqanNnY2VJNnZGMENLNkhiRlZ3cHphZHFaZVBMMkpTVFBQZFV5czdkUkV4MFB1b1YyUXQvb084VU11a2U5S0RnNThWWjk5V0RvakNBMFNRQVlwUmxUNlNtc2NJS2lhMjRqSHNvMVpFbEdCMHpTYjdTVk9Ra1FDY2VWRldMVktRQjFvU1dTd2lZSTZLYTJxNFBLS1VlZkh0aUtjdVd5UWtrVUtlVkhqNSt5cVdBT0t0azhJM1JuU0x6TVl6eXA3ZDNZZ3dSakI5dFJWbDhqM1NSN2FjTnZFbVNybitXb1B4Yk5xTWVUUXBPTHEvSU1BMHpYY0VtZmRXMzhtdUVvL1ZWeldBQlk5eEtYQVVldUtKMkxZOXBvWUIvMW1pT2xMTTFYSnNObEpoOFNLMjdKbWkxczdBa3o5djZLWld5aDBwUlo0Y2RLVlNEVW1MRFNHZHB6SUpINmFpTFY0VXFqOXV0U25Vbk1FZTJvZGZveWZNMHp3bWJVVUJsUE4yRWV0cmdLSG5XbmlCeW9icFJJUFAyajJVK2VrbmwveXE1ek5KVkRYV0xUVmFjbk5kTllPZWRPbW1EbnpwcGNpQ0IxbXB0ZGV5aTRVbnlNNHBoY3BJSmlpOWtnN1o1ZU5JUE5wNWRPczFVSGdGV09hU0VGY1Z3ME52M1J5cC9xcTRtT2dxTDM5OE01bzJLTXU2SU9SNGJzVStROFBHaE9xWE9ZQnpUZHpVSUhqUTVUeEs1NmRLTGppSU82RmZMc2lWbTNrVks5Q1ZCSHRGUjNTRzVpcFZwOXJHYUZ5bmRrYmlOSklLc2pzODhDZ2RlUnBEV0dwVmltUFpxNmhNVDlsRzNraFJFVnlUeHk1aVYwOWFtVXZQOEE2Y21vdjJCRWZ3TkIvd0JiY2ZxcUFWWlB5aEd5TlNZQi93RFJObi9YWE5WdFhvUEQzWGpzUHNGNTV4RVZrUEh1c3FZK2lSY1h5LzV1c2Y2eG1vZFV1OUZSL2hxLzV1ci9BR2pOWHplUS9SRHcrY0s4ckJ3d0FLZHZOVDBwRFNFU0JpamFMZjhBYUs1NHk2WExvV3hXMU05UFpnMGRaQWltak50bWFJTkp4RlZ5ejJyb29hV2tvcE5hS2RKUklydnVoUWZQb29ya1dFYTdHZXVQYW44dFd2cHErRWRLcVBzMnVGKzhIN2FkK2svdHU0eGJxczdQaXZYVURlcVlEQ0ZTTng4WEltQlNqS2pNc3RCVzhtMmhxa25wQjlMT21XWjdqY2J5OWcvd1pnaUVmam5qd0k5a3o1VlEvYmZ0N2MzMXkyNnRoaHBOdWhhV2t0cUtqc2Uya2hUaWpKUERJeEhPcW83VVhheTZPSlVuS2o0cW1TcU9xanptaS9aUytKUWM4WVNFOE1nNU1lZTdFNXAxRmdOaGpzZFZtTEdJM2xvYUM2K3ZzajFtOFF5cVU1U3RSa2tZS0JJbWVSNUNtcW5VS0t1RUlFd2tMaFEyS2MycFRQa2x3ZjJkTFhDMjlwVGdCd0tpT2lrWUI0dW1CNzVyTHZUMnRpaWxha0VncUFWbUVuYUNsV01RRkxFL2cxQm9BNnB5WmNlSnJwbkF0Y2RnVUQxRzNVRmhiWk84R0Vqbm5oa1I0VG4ralM3Y3JKMkp6TUZIVkpFU25KeVAxMXA5YXh3cWlVenl4NGdRZXVRZmpRKzRlVWxaY2JUNm1YRXllUE1nSHd3UWZmUmpScUd5ekhra3dXNjV6cTFiV2t0V3NIRzNFWExZS0hFSGNubGxFcUI0UnlIU0tzYjBjZG83WS9SdnRsVEQzZHN2SVVRcjVxc3FjVHVrcmhDTnI3aXNjcE5SOU4weTZ5aGF2V1BFRjdaVndDWVVlV1NZMitPYWpqVExyVngzMXVOeVZxMlBORXBsU0NlZmdsWG41bW95TUdRd3NmMUNSbURJZUpDeGxDLzFDc2p0WnBTZ2xGdWdwZGJJTnhZdWhCMmxiMHFObTBVS0pjVW9qMXVVcHFDdlRKR2NjQkNwd1pNZzlaRUdwbG9XckpLME5QdUwrYU9xRGU5a0lMakNVdkJTTzVXUjlFQXJFOHhDcUQ5c2JNSmVMaVZCVzQ3SDFKZ3BRK0FDdmFvYzBuZWhVK0tqUWNCTFR5eXVyNFZNMlA3RS9oVWVRUUNVS25HQWVJNFBXWThlbERkZHRabFFWdFdndEpDUnpXRks0aVR5R0FLSnFSeHh5OXNtVEE4T24vS3RQakhJcXo3SWdFOHh6cGsxMmx3S3g4UFB4bk45Q293L2VPcGhKU0NqaEc3Yko0U1J1bm1jRTEwdTdTdmg3MlR5N3RhU0JKd05xc1JrMGNmdHdSa0JZS1BIQWpwN1pvRmVhT2pmZ2xPMWV3bkJ4QUlJSFBwOWxITWUwN0ZjeG5ZY2tBRG03Zy8xU3pyYU9Ta3JiVWxTUnRQSXBoUkpFR09lekh0ckN5Zld3b2V6RXdCNGVYMlUyVUx4Q1FndyswRE1LTXlPY0NjakFwRmJqWUlNdXRrekc0RURpekUrRldjdjBTMHl5TU5PL1A4QTZUb29JMnlDT3BCQUlqOVZNcnBTUHJpRE9GSUFrRDJENDBRWWVWeTNKVnVCQWt6N2dhRGRvK2FNRVFTa2tlV00xdU5wTHQxUkxrNldIWlREcy9yckJXaGhZN3NKU2tOdURMWkhNU09hVHVxY3JrTjRtSUgyNS9KVkU2VTdCT09hWUdjNHlDUGZWeTluZFIzMmJaVVpXRTdGZjBlcDkxQ1pzT2sycnNLUnIyKzZXMGtjY3gxbzI2amltZ1RiZ0JrSDIrVlBITDdBOGFYU3NMallSa2NnYU4wN3YzMGhKSDZhRXM4Ukg1YWJYMTJvOWFJNkVCc0tqejhLa0l5eHFnNlFQZHNtRndpSzRTb3hXOVFjRzhpa2U5eFJETndoSGlpbjlvZkhuU3paNGhqclE1bHcwUXQwVG1hcmVLVnpYV2xiMkFPVW1sTklWa0UwMnVBZVUrMm5Oa3hBeE5WT0FwWE04eWtES2hIMjF6Y1B3S1oycXNSNFYzY0tFZTZnQ3pkR2gyeVozenNpZ2x3a1R5cC9jM0k1Y3FGM0M1Tk1JbUVJR1I0NkxnWEFHYWUyVjJEazBFdnNaazFyVGJtZUhsNTBVWTlUYlFnZVFhVW9WZHBpQWFHdUxsZnYvd0NkY29rRGROSm91UUNlWHQ4LzJtcUd0cm9yenZTa0RhK0RtUFlLR1h0d0JPYVFONlR5OTlCdGV2SUJ5SU5haWl0eWxKS0d0VFhYTDhaejA2MURMaCtaelMxOWRrOWV0TVZLODZkUXg2UWxFajdLM05iQ3VYaFNKTlltcmlGVnFVODdNdDRTVFVvY1dBbU1TYWgvWnk0QkNLa3FYT1pQaFNYSWFkYWVZcmhvUzloZGtMQW5xS25uWnAwcXlyM1ZXQ0hlTWUycks3Sk9EWW4yVDlsSnVKdEFaWUNiNFQ5U3FENVRMY2FwYkQvMjlvLzYrNnFxcXRiNVRhd2RVdFNQOFhOZjdlN3FxYTYzaFAzU1ArVUxpT0svZW4vVlpVdjlGUDhBMzFmODNWL3RHYWlGU24wWnVSZHJQK1FWK2UxUmsza0tFZzg0Vi9hRThNVkpXMXBnVlhlazZpQVJOU1pqVWdSenJsNTJFbGRUQklLUjh2Q3VrM0kvNjFIM0wvekZKcDFEekh2bXFSQVQxVmhtRFZLQmRpdWhjK1lxT0p2dkdSN0FQMTF4ZjZpNmhJS0c5NnowVXJZbEFPQW9rL2txTDRBM3Fyb0hPbWNHdFIzVWUwaWJkRy9idmVpVU56eThDNEFaQW1EN3FyMjUxTjkxNXh4WldTNHNxVTRaOWFCZ2s5Qk9LeTZ1d3BXNTkwTFh0NGdnN3BqQUpYNDg4VXl1M0NlRkFoTXFNQ2M0VEo5dUI4UlVHTUFOa0xvTWZFRFJ5NUJ2NjlnbzkydXN5VUVnUVJPMGs1TVJPMzhISUZBdXl1c2xEcXU4VDlHNGdKWGdncEtaMnJIaGttcGUrd1NDa2NTdHBNVG5HQUFTTTlSUDRKcUQzekpEa0RhUnpTWlZnY1hNS0V4K3NVNnhuTmV6UVZ6dWRHNkNjZU95UDNVNkxXNUNWSlVGSWxJM0pJVnlVVjR6TWMvalQrNXYrQVJ4U0hFY1V5VWxLaHU0VG4xalVjOUg3b0llWmNoVUxiV0p4dzVDaE1lUDVha1MydzQ1dFNyWVJ3RGx0UENwUk16NGlsMDdkRHRLNlhHeUk4eWpNM1lDL1lKc2wxSmhKQXlyTTRUZ3dTVkgxVHgvWlE5MW1GRVFTamhYQ3grQzNFanpUdFB2cDdkTWtiWlRCUEVKeURFNVNZaUpVMzhhU0x3TXFVQ1lRZ0NUT0VCUHg0VXhXMnVyb2hqQTZhUXlEZUwwL3dDRXd0N251bkFwWitnZCtqVUFSOUdvcEVMQ2Vnd0JOSHJqVFVFa3RPQlNES2dWYlFnb2lONVVlU2QwZyswSGxRVy90c2xKaFc1SHF3T1gwZ1Y3VHRCVlNXaVg3amNNazhDajlFcFlCSVVPU0ZUNGJqSHRpaUhzMXQxRHFvWWVVNHp1RVI4SFQ2SlFPcllYeElKdGxxUGVObUNFRkpudkFnWVRqbjVWTUxPOGJJYjJOc0tLMlNDUzJGL09nRnA3bGxhOXYwZUZGSGVqSjRBYUZQS1M0aENGSmFSdU93NElBQkhJN1JKR0tCSnVPNkcwaFQxdHV4SU81bUNveWdIL0FBZVQ5bFVPSE9IbzcrcW9neHBzZVdTV1R0WUZLWmFwMmRzMXJKdEhEYnViMG9OamNMMk9CMTRGenVrSmVnbEtYRXVNYmdTSjdvemt4SDNkRHVDMmxiYWU5QzBxSUtUeEFKQ1RLaHlTZGhDdklKVjRHbmR6cTNlTXBDb3UyMHRodGw1ZVZ0cENRVXNvY0Jrb0FBRUg3MVhqU2pMTnRDVlc5ODdhdUNGdG9lRWp2V3gzaUVRajFoM1Nua0JmVlJRQ0FGWTAzVTA3cVdMeEI3TUtSeDlVQlZZdXAzcGNhVTB0QklVWW5iQkFNbFBDQkppaDl5VUZSQ3h0eGhRQ2daSmhVaVBXNlk4YW0rcVdXb0pSQ25MZTRieVVyUXBKM29RZ2JFZzRKM011SVh0L3laNWtHaFJYZEVxUXUzYVc1M3JmTld4UjNoQWFTUVNFeDN5a3VTTVFzOUZWZkcvdnN0NUdhRGh4a3Q2bFI5OWc3WW5wRWlUZ2RaUExINmFZc2xQcStzRkV3Q0ZSS1FNU3JtT2YyVkpuVmV0dXN1cGhEWktjN2p0aVI2bmVCeEJIaEVVSVd5amVWRmk1UWxNN0ZLQ1ZjSkpVSlNGYzlxdjdnb2lPUytxam51aTVyR042MGhUaVVBeVVOam50TUhxT21PZElYRnNoY29PN21ENnh6NWluMTdib0s4dXFCSERsdFpKSkJ5SUpBR0k5NHJpU01OcEtSQWxhaHRKRUdZQ3VYTVVRQ2V5U3pobmlGWFNEZk5XVzNobmNJOVhtdEorc0trZHRxU1cxTmJBZTVXQ0ZBeU9jS24yMEQwK3dMdDByYk8xc0FyWDVmZlRUL3RHekRhRXB5RXZKZ2xXVWphYXNmVGlHbFZSeFNOeHk4TkZYdDZxVm02OERBeDhEeXByYzZyMG40ME0wVzQzTkZLc3FiQVBoSXB2Zk55VHROQ0NNQjFLbDdqVmhQbnRRSjY5ZWxGOUsxSTdJbU1WRmJWdFdaTlBMWjNNZUZia2phZGxGanlDaTl4ZFpKbjQwbjg0Tk1MaFgyMW9FNHJUV2hvVmpuV1VjWmRFYzZJMmQ2QUlvRzByZ3JWcXZNR2ZaVkxtMnB0TktXMjVDdmRSTnRhUW5tS2oxbmN3S1N1THhSbkpvWXg2alN2TW1uZFNKcTRUSmdpa2IxL0VUVVVScUJDb25yWFYxcWVLejVaYmJrYkp4ZE9jWE91TzlGQ3hkYmpTeEkrKzkxRkJ0Q2tNWFd1ZFRka1FCVEhUcmlEbWxycmNSQ1VtYWIyT2kzQ2p5SUhnQlZtcGdidVZYb2M1MndUKzcxSEVKTkREZExucjUxTGRMN0xLMnlvZE16UXpYdE1TbmwwOEtqRStOeG9LVXpIc0ZsRGs2bkF6aW85cmVvbFI2Z1U2dWtVT2ZhbzJPTU4zUVRwaTdaRFZrMXdRYWVPTjBnbzlLS0JWQzRDYTdDS1ZhQXJhMENzS25TSmFJL0JpZVJxWTJqaElxQ1dRbFk5dFQzUlVEYjdxVzVnQVRQQ3M3RmJhYXpQblV2N04zZnFqckZSZC9HS2Y2RzdDaytkS3NwbXRpZFFuUWFVTCtVWXFkU3RqL0FKZzEvdHJxcXhxeVBsQUsvd0MwTGFQL0FFRGYrMnVhcmV1azRhS3htRDJDNHppWi93RFpmOVZsR3V5TCsxNVovd0Frb2Yza2Zxb0xSSFFqOUlyK1FmeXBvdDR0cFFrUnB3VTgwelY0SXpVczArOUppcXpzbDhZcWM2STc0bWxXUkdBRTR4NUxVbCtjR00xdTA3eFNpbHVKNWxSd2hQOEFLUFQyVmxuYmxVOUVwRXFVZkR5ODY3NDl1eEt3aG9HVnFIckwyOHR2VW1scjV3MGJKdGk0SFBOdWRRVGtQRVlhQVV2bzQ2bmNrSGx3SkhXZXBvUnFWeS9KN3h6ZVNCTWd4ZzhwNUh3cHd0NTRnQnRLa0lUOThaWEJCVGdicEoyNTl4cmkzdm1VODk2ekJKUE9GQUt3a0U0RUtPYUQxT2NiTzZmd1laaTNhQTREb0IxL01vV3BJa0VKVnNKRzJFN3VmTWlNZ1lPUE9qVEYwMlVvVHVRRjVDa0hCQVZDc2hYaVFCL1JwZys2U2xPMVBDbE9jNXhDQ1pTTTlFaW1hcmRLdnVvU3FSaFNoS2hKNmRUSkFIOUJWVElEdHlwOFFZY3NBT2RSYnZwdWlsYjVSQktBQkhyY3NrRkNRVWt4STRTUkhrYUFkcXJRbHZ2Z1pYems0S3NBeCtGZ2NoeXhUMWR2Y0lnc0h2RXBoT3h6aUtTdmNFN1p5RHR6SFNSV2s2c3k0Z3R1Z3NyamFFTElHMHJHMkVsV1lJQ1VueUpvcUpwWVFSdUVGbVpjZVJDQkd6eERheVA5MEI3RU9yK2VJSElPSUxaakhRS0h2NTFQN044SmRJQUtXMEoyU0FtY2xPNVJrY1dBY2VkVjgwanVydGlWQXk1SWdIQU1KSHR3Wm1wM2FoQkVrN0RrQXpQRWtuaEtlWkJIaFdaKzlPcnF0WUlQSmMxOWtIWS9VcDVlb1FRRWppU2VZQjRvQnRGRkFLaENWUm4zVUVWYndaa2JZNmpsa3BVREhPTnE1UGxTemJUbThvZ3BKRUtnemhXY1ovazVwVi9NQVlPeFNZNFV6dkNqTXFQZzRhRGo4TkJHWkxYOE9oYkRCNGdldnNoMjZPZktGSlBzTTVKUDhxYVlhd3lOaEFBbFhxbk9PVUZQbi93bWliOXZFcXhBeVI0ZzdRbmIvV0h4cEJTZVdQRE1pVW5palAxY0tCb3RrZ0RyVzhpQmtjT25HOHgzSVhIWlRVd1Q4MXVOcVh3UUcxU1FYRXlOcEJCeXZ6OHMwVHY3Sk80Z1J0S2QyMEdUQ29namNaVUpDaG4zMUVlMFZnZHZlTndGTkszcEtNZXFaSkpqMXBGR3V6ZmFKYmlRZThLWFc0N3hJd0NZMmJnQU1pQ1FSVmtzTmptTS9OSzhQbW1WOFVqNkxtN1g2b2RmMno3U2l0Z3lqZHVVd1JLZnBJTzRLR2VlSThqWGRocnJTdUNlNmM2cFVJRWc1Q1o5OUhuMlNaM0ppZVp6SmdBeVNSUFBNZVlxTjY1b3lWbmVDRUxHQ1lrSE15ZW82VktPVmtuaGYrcXlMQ25aak9icURoM0NLdG1FeWtrUVQxS2NqQTVlOER3aytOTmJpOWZqYUhGbnUrNkNBU1ZCSVFsS0FrS09EaFpGQnJHNmNhVVVYQVVHNTRYVS9WeW9iZ1BETkVIY3BMcmF0N1pBaFEzVEJITGFrd2s0a2lyT1RwOS9kVlpUb1pjZGtUQ1FRZWlldWFpL3hGTHF4dE9WUUNyRUFxQlBxd1lQa1RUUi9VbmpQR004d2xEWUp5cFFuZy9DWDhWVnpkWGlOaXB3WXhFS01SaFdUaFBUMzB5YXZFQXhpQ09oQ2R1VTdodG1kM0w3YW14ZzlGbVV3R2FPbjlCUzBYbkNxQ3RSU0ZIQUJ4dVRIUG5PMkI3NlphbWhRa2tyeUZ5RmtucUJnVGtZQXBXK3VrN3dybmhKZ3FBRTdnTTQ1d0orRmJIMHJ6YmNRVnJBRWNvQ2dWY3huaG1yMml0MEVJbUhVeTdKS2tIWjYwQ0xaVUQ2VjlLVnJrd0VwaVVqNFpxUGRwbkphbVRoYVNaSElnN2NmR3BucUFRRWNBaVFBTWs0QUNlUjVIRlF6dEc1TGJuUXFJeDA5WUdjWUhLcU1aNWUvVVUwNHl5S09BTWk5TndrdXo3NmdwQ2p5SjZrY2lPcG5sUi85ejNGS093cE9jSkl6bk5SUFMzeVV4MG5CK0ZTNjN1MURZNms3VndJOW9ITHpxNlpwdlpJSVMwdEZrbE9tZENlNUJPWSs5ckIyZHVBWmo3S25uWXp0TGF1RkROd0V0UEdBZy9VV3J3SitvYW5pTkthKzlCUHNqL3I3YVNaR2M2SjFPQ2E0K0N5UVdDcUpSb3IvS1BzTmFjMGQvb243RFY3RFJtdW85OENsQm9yUE1KK3dVT2VLbFhqaGQ5MVJpZEZ1SUdEU3FOSmZITUg0VmRyK21OUjZnK0FvVnFGbzBQcUNvamlwUFpUL3dER0FkMVY3ZHNzWU5LL00xUWNWTGJ1M1JKSVNLYUtaNTRvZ1pWcXAyRUZEYml5UE1DS0gzRmk0ZVJQT3BxN2JqcUpwMVlzSXhLUk5YSEtvV3EyNERTVkM3RFFYY1lVYWtlbGRsRmtpVW4zMUxiRnRBakEvTFJpM2NBamw4S1c1UEUzam9FeGg0ZEdPcUMySFpCc0NWQ2lqV2pzSTVJcDhINmJ2UFVyT1ZLL3FVYU1lTm5RSmxld01BUlVHN1V0YzZtZDJ2OEFUVWYxVzNrR21tREpwTmxMTTZIVU5sVjE2amlJcHFVMUtOWjAvbVlxT09pQ1JYVVJ5YWd1WWxpTENtTGpZTk1uMnVkRW54NFV3ZE5FdEtwcTBpMHV0dUtyaFlOWk5UV2dLUzlrNUN4VXcwMitHMlBHb09KbWFJV3Q0UmlhR25oMWhGUVRGaFUwTjBEMXAxcGIzR0tock9vSHhvenBkN3hDbDhrQkRVeWl5YmNFSjlPWi9odHIvTVc1OXZmWE5WN1UzOU1MKzY3dHo0V2FCL3JiZy9wcUVVNndoVURSN0xtdUlHOGg1OTFsUGRIUEdyK1FmeXBwbFR6U3p4bitUK2tVUTdvaFdkVVpiWEJCcVhhRzlKUUV6S2lBTVRKT0kvYndxRnBOVDMwYjJhdHE3bzU5WmhoSWdxM0tIMHJnenlEZTZsK1dRMW1vcHhnUnVsa0RBcGlwd3BiU25hZGllRTdZSmVjbVZLeU1KR0FQZlRORjJzOFN5Q0QwVWVjZ2hNQ1BIcldPdkJUZzRsN0VZU1J5OTZSWGJ6NlNuR3hjQUtWc21RbEtTcFFFcGxQTWlhNTF4QjdMdG0zR1d3bUxjamMrZ1hWemZObkFUdE94Y3lVazdnMjRPRXA1Q1ZDS1lQc1pPMVFrcVVDa3AyNUJRa1JCL0RIMjFzV0NqdUtJS1FyYkJQUDdvSVRqaVZBbjNFMW8zUEwxaWxKQjhGVExTd0pQTk1wcmJSWFJYTyt5Qmo0ZVFUM0NjdDNoU1lFQUFxS1ZSSmt5RkVkQ0lVY2VWSjNTSlR3SGh3cURnYmtJQU8zY21RQW5iNzFIeG9aY1BESExhTURyQjRpWTk5RTlQY1NGRUxoUUlpU1NyYUZSdUlFNG1FaitqVW5EU0xXOUVEQnozRDdYdVA4QXBOV1JKaFdCbmNWU0NJRzVSeml1Tlkwd0xRU3JhRmdBbkI0VG5lRDk4T0p0SVQxbWllcUlTRHVuY1NkeEFDdHZFb2pkdUorK2JHS1J0cjFmZ2tMZzhjQW5KeVVpT0JVcUtwOGhXTWtJM2Fxc3B1Umx0RTBMUTF2ZFZ0ckRUaURzYzVwVndMSFBoNXg0WnhVNjBqVWR6RFZ3MFlKSVNzSnlRcE1iNW5NMXZVckVGTzBwM29XZ1lQU0pDUVZrZXNRTjAxR0dOOXVzODFXemh6a3lCelNZSEp6cjUwd2M1dVF5dTRRME1QeUwydmM2Mk82LzlxeDdCQ0ZJeUFaT0NFN1ZBaFRVaHMvVmtsUjkxQmRUUVFxZnFwMnAzQ1FKNWhPUjZ3QWoraWFXWXZBbEtYR25FdU5yKzVxQkcxV0lLa2ptRkF5UGRUdHBTRm9Wa3hPNVF6d2xTM1Vqa1BCYVR1cFVXbGp0MHd4M0dGNzhwenRVZTlleVoycjNETGtLQlNaNThrRFpQT0psQ00rMmtMMjNsUTI5UVZFbmtZTG9UQi9rcC9KVG01YWhLbG9qNm1QckRjUUVxRTh4a0NQTVV6dGxHUk9VeU4wNTU1SXoxZ25IdHF3RlVZMEFta1BFSXp0WFJNTlNiNFZJSU9aS2hITGJrL3AreW90ZldyakxxSG1zRXlZQjVlUjkxVHk2WkJPNVFncUJtUEdDaUFPZ3dhRTMxcUZJaFNabjNFcUltSm1qc2VhdGlncEcvUDZzaDNoY09pTTluOWFRdHBDMUFyeVNRU1NFckNRbllyWm5ieUlQNFZKWEMwR01BenRQSXp4Q1ZDT1JNMUI5S3Vsc1hKRzBxWk1GYUJ6S1p5UWVpeEpxY3NOdHJTaDF0WEFwS05vbmQ2MGpDdW5zOXRRbngrVzdVT2lud2FUR2VYc2ZZY1J2NkZNYm0yU3JjRkNRUzRFanlDVXFTREhXZDFCWE5GSU81aHhUWUtnb3RxVVNtWkJFeHk1MUluMFFTSm1JQ1IxaktaTzNtbkJJOTQ1elRSMDh4MHhubU9jVDUrUG5VbzVuaFVZME9HNk9RQW0yblpCTlRTNzNjT01oUXlDdHM5VDliWVBWUFNhMXBUclBkRkNsSjNRb2xLZ0FjUmpQTTBaQ3p4UUFTQkppTUZCQnpubHlwbGVNb0kzbENDRWpjcmhFeUZLbmRJbjZ3SHVGRU5sc1VVT0pHUnhmTXMzdlk3ZnVnbW9XcVpLaElVY2paT09YaU9YU2lQWTZ5UHpoeHlaS1VEYUR4UnY4L0hCK05MV09tV3ZldEtmVmROMjVWTC96Vlc1d05wU295MkZtTjI4b0hzM1VSN0tNS1N5b3hLblNva3daQUhDSlAyMUtlYW9pQVZMZzJFLzVrYXV2bUJTbXRwQUJRcFVEcVo1Q01tb3JxUStySU1yakdRZUZSSDJWSU5kWG1USUV4ZzRNK0Fpbzg4b3lDZXBjVkVFUnQycEJraUQ2eEZheEJzRlBqMDVjK25paWgrbXVBQW9QTkt2MFJVbGFudWdra0RhVWtIcUpqUHN4UWZzdmJJTCtRRmZTRXh6d0trZDhBRktFUVlFcDJ4MUtUN2NWZk00YXFTc1FPNUFrMnE2cnVtcGRJYy9CV1pNSElWekJTUnlOVzE2TGUyU2xyVFlYYWdYVGkyZVdRTitNTnJQakE1MVRLdlZFSDFlRUVjd2VrbjJVNXRubENGb0pTdENnVUtUZ3lPUkI1ak5DWk9PMlZoQlVjV2N4U1gyWHF3Ti9EejUvQ2xVc2lLQStqL1d4Y1dUVHhQMGcraWVBT2R5Y2hSOXRTUGNJNVZ3ODdIUnVMU3VzamtEbWh3VE81WnFPYXd6enFUM0NxRGFpaWFpd2tLdzBWRkhHTTU1VWl1Mm82NWI1cmo1dlJqWjZVREdDbzIvYTFqVEZISGJmRk1uVWlLSkUycFZHTU4zV3JiblJKQm9TdzVtbjdLcW9uWXJJM3A0aFdLVGNOS2hHSzRYUVk2cThvZmNEOHRDYjNuUjE1ckJvVHFEVk1zY2hDVE5VZTFSc0VIeHFGYXZiUXFmR3B2ZXBJbWdWelpLVWNDdWd4bjBGeitiSFoyVVFlR0tZckFtcFZkNkc0T21QWlNDTkVQVlAyVWFKMitxWGZMdVBaUi91eEZJTFl6VXBWb3ZnS1JlMGVwTnlXclp4bktLTFFhNmFiTTlha0tkSXpYVG1uQWVOV2ZNQmErWEtETm8rUGhSQ3hWR2E2TElIbitXdWFxYy9VckdqU2d2cEFlM1B0R1ovZzZSL2ZkcU5VWTdWcSttVDVOZ2YzbDBIcG5BS1lBa2VTYmtKV1U1MC93Qlkrdy9sRk5xSWFJd1ZGMERtR1ZLK0NrVlk3b3FtQ3luaVBaUFBBOTFYRHBWaWxxMVEzQ1J0YUFKZzRXOUNsa2VlZHRWYjJXdGQ5MWJvNkZ4Qk1rWUNESjUreXJTdTFxS2lra2tuY281d2Nxa0pIaHQvSlNUaWI3QWFGMS93L2oyVEpkVi9SS0lZQVFxSlFWSXhNVFBDTVI1VFRGVEs0bm9BUW9nRUU3cDJnZmZEaVRpbGJ1N1hJRWtpRHpHQ0FSdGtqMlVxMjdEVWNnQWxRaVZKU29oS2t6UEtRV3dmZlNrYkxxSHZ5Y2VFeUR4bDUySHN1YmEvNmtsQ2lVdzRtVHRsU1ZLT3duSmdrVCtFYVRmYWtiOFFFSldwWW1OeFozZDNFWVAwWk5KUElTVENCamoyYlRtRWtBVFBTWXJZU3BKeGxCSkNsQURhcEkyOFJ4d2phOFJQbFVxM1F6V3g0NDFSK0dVM3NVSzFBckNsSjV3SE9NQXhoS2lGaUJ5Z2pOTDZYZGV1a2lDb2JST1FBY3JLU09aSnBSYTFCSkxTaXlzc3VNcktETXR1TnBRdHNjT1FRT2ZtYWp5cjBKVnZ6dlJBS0pPQURPWm93TUQyMEVFQkpCSno4anpkL2NLWjI3bTVLa2tTdUFSa0dRa1FBRUtpVDlKUE90b3RTazRLeW80QkhQamhDVHovQUFqOEtaMkZ3a3RvV2hjRkpHZkZRaGU2QnpTQ052dXAyN2NLVTBOdkRDdDJFQVprcTlicUlCb0J6U0RTZFJaTDhzYW9kb3pzZlpQbW5BVW1TRXBJa3dKSTJqYnd5ZVlRbmJQNGRSeldMUUVMYldtQktvQ1NPRThna0hybUJQdG9ocG9NNHp1SG5DbEVncFQ3enQrRlA3eXhKU0JLbExRQWtDQUNVU3FQVkVUSldxZndheGppdzdGQmZMNG1FL2t5a3UxZEZEdEVlN3BadDN0eHQzU1ZOdW1aUTV0QStyOVdaK0ZTeHBDa0VaSERNTEVBVHhCS2pJanA5bENMeXliVWpZdUNEaWR5bEdETUFnS2dFQUVqemNOSjZScWJqUU5sZEVGcmF0TER6bWRoSWNXR25SMGNDbEhQblJjbzVnMU42OTBPeWFiSGVNY3QrelByNklpemQ1SUFDWVR3cEE0UWR5Rmc4K2U1TTB1NDNQRDlZd0NCeXdraWZIZG5uU1M3SEtsSWxTRUVHT2NBa0FTWXlNbWsvbkJBMm5tUmc4eUJCSFB6SW9TcjZJek1oNXBiRmhFYlZZOXZSSTNDMWJsUmlGRk1FL2hIY0o4SnJwVElVbVFFcEk4dDBFbmhqT09HbllndDRBVnMzS0IyaVJLbTNCbnJ4R1BlYWJPU0U3b0hFUkNnQVJNTFByQTRWdGcvQ3JHdVdaem1aVDI0YlBDL3VnZXVhV2hRVjBLbEhhcU9SNkFTY0dlbENlejJwdU11RzFlVnRRVEloVWhDajF4NDFMVUNlZUNJSVBua2N1cGtwcVA2NXBCVUU4a3JqZWt4QktWRUhNWlVZSUZId3pCdzBQU3JOamRnek1EUmJnT3ZyOVZJSEhaL0NFQWlDSUVnNUhqMU1lOFV6dStTdWNoSmpQbEl6MDVVQzdONjJXMWZON2ppWVVRRXo2eU1rS1RQUGIrU0o4UlI2NlFramVpQ2xTZHc0dnFtZkRFd1B0cXFTRXh1OWtSdy9PWksrUUNQY2hOa3JUS29DWUlVbUlISVJCT0ptVkQrc1RTYnlodWlSNmg1SkgzeXZFNXlmN3dyaFJXWE9LQ3VQdmdra3Ayb1RJR0R3Zy9iVFc1QjNlc0o3c2tBQXlZSmlTY1RHUGQ3S3ZhMjBOOHc3NU1nTXJ4VW5OeThuWVlQRVVxSFFTUU9rQTFJN2RTVVc3YmNrS0RZQ3dCaVlIRFBVK2RBTEcxM090UjZzZ2tBR0lHWWc1VGtmWlIvVW1nbHNuSTI1VVZIR1FJUGducmloOGpzMVA4QUZhQzNYTHQ0YTJVWjF0OVBFY2xlSVR3OGduY09mV2FDWFpnS0pJUGRKN3NRVEgzeXp5KysyaWlHcnVwNzJSeTVuMVRrQ1I2d3ptTVVHMVJmQWxBamNvOFI0WW1keW94Z2JpTWVWTXNkdXdYSDhTZHFlZTQvdWtVOUhyZjBpM1NUaEtoQTY3ek1ueW94cWNkOFRqcjE2am4rV1lwSDBadEo3dTQzN2ZYUWtFOEl5RE9SMXBhL1VqdkNGSTRsSytqWHVNaEtkNFVOb3daVFE4anZ0aUZKelkvbDR4UkIzMzdGQmk4TjZrR1VpVDc2Y1dtQ1lNanA1ZTJtanl1TS9na2p4OWdOS044ejU1R2V0V2xBZ2FhS3NqME42OTNWNTNDL3ViOHQ4L1ZYemJOWFUvZUFUK3hyeTNZWEtnNkZpZHlDaGNqeFFyRWVWZWhyQzhEakxUeVNTSEcwcjk1VEJGYy94TEVCZHFUZkVuSUdtMFZGMU5hNW1tYU9sT21qU3AwSWFtRFpYRmNyWkZOM1cvS2lLaC96cHJjcUVmcnFnZ0lnUDJRRzlYRkNycDNCb3RxSFg5RkI3aE5HUU5BVmNraVl0dUdhSjJqaHBtaGcwVHNtVElxN0lBSVZVVHlpalNzVm9ueXBSbG5IS3VYRTBwNWU5bzNuSnVzMDNlWW1uWVRUaHRueXEwV3pkUjVtcFJUVTlQd2FhYVBiSjd3QThxbUY1YUFwUDZxaWIzQzZuMnhUQ0tZdWFRRUpLd0J3S2tuN2pORVJFKzZtRjlvU0FuaEErRkc5SmNsUHVydTZRWU5LUG1wR1NVU21BaVlXOUZYdDdaeEpqM1VPZFFucW5OVGJVYkFSeXpVWTFDeVVKOEtlNDJTSGpxZ1pJa0dWYnA4S1lYelhsUlJhVE5KUE5ZcGcxeUJsanNkRkdybG55b05kcUltcFJmTllOUjIvYnlhWVFHMHBuRktKNjJ1WEVrL2VEOHFxSDBRMXdmU0QrU1B5cW9mVHBubEM1Nlh6bFpVbTlIakc2NGVUL215L3oyaCttb3pVejlFS0FiNWFUamRickg5OW8vb3FFN3FqSjlsTEhicWtBUm4wZVd1M1VIcC93TFM5cDhDcFJINmFtRFR5ZHlsS0pCQUFnaVFFZ0RkbnhnRWUrbTlqcHV5NXVWZ0FkNEdrbWZIaVVUOWdycFRJMkFrd3JhRG5sT0NJOXhQd0ZjNWxTaVIxK3k3ZkF4NGhEcGVUYmpTVXVDbFJCNS9VUG1Ta0xCajJoVmQzekNZNENCdGdnRXdRRDBIaUpOTWx0a0tNYzBtQVFlWmtKQmlNOUQvK1FVb3E4SkdRa3g3bEhHQlBzb1VnamNKM29mOEFNUnNnZllhRnd1MVdBU29DSVRuY1NESWdlemlMZjlZMXZ2enRLY0JSSlNuNzNLVW9NeDVKYS9xMFV0TGpnaVFRRXBrSzRaS1lVRS9GdEh4eFEyOHR3VTdrakozYnBYQ1pDdHdTTWZ4YTBmMURVZzg5Q2h3Nk9lVjh1UTJ0Sm9GY3FZVEJJTWZScWNBSkdVaE84akhJN1E0bVB3YWl1cldMbmVIR0JJa25NOUNQZ2FrZHNvcFVRcE03VmNZTWdFcEJCQVY5VVFWaXViNDdoQUk2RUZTcDNISVh4SGtrblB2b2lKK2h5RmxqbXl5WHZPcGc2SUJvMm9CczkyVDlDdFVxQ2pLVXE1YmpVcVFTQ0ZCWUxhK1NreXRLa2c0SUhYQ3VWUUhWV1ZoVUVGSVBFQkI2L2xGRWV6ZXBxUkxUcXZvMTRFODBFRUZJL2tFL2tvaWJIMXQxQkRZbkVIaC9JWnN4MnhQdXBzNHNBNzg1SkFnRWJoS0NDQWNKR09WY3MzVWpLVWhNYm5JQWtoTXJPWXdZTzMzMDF0VFBBcUNrZ3hKa1NZaU1aeUtjTXM3WlZrbElFeXBJR3hSU0lNSjlhVkRGTEhDdGwwRHNmSGhaeTVLYzhidFdybXhYSUpRVUlsRzRrREJNcjRVVHhDQnpwRzR0RUthakNqRzFjK0tweVFlYVpVamx5MlVZVTRpRkFLbWVSUEVmdklrbkFrL2xvUWJwd0tKVHRrZDVramRsY3lwSWoyajNWakh1QlFqZm1PSndsaEdnam9odWxYcnJEaW1yaFJYYlpRSGQwOTNzWEc1Sit1azdaam5UMTUxQy9wRXJDMHJHRklHT0RsdUN2VlZFR1BQTlBYckpLMG5ha1JJZ0tVVkxVQ1EyRW1PRkpBU3RjZWRSQzdEN0psdE81a2tLMkgyQ0JJNURsbWpHaHNwOUNsTVJIRFh1Y3gycC9kU0pDb1JCbk1RazdzZ2xLa25oeHpGTDJha2tiTWMyenRJazdpSFVTbjNLTkI3WFVXMXAzTmt6dFRLRElVQ0ZMNGt6OVdObzkxRWJKdFFoZm1BREhJcXlaSGptcVpZeTA3cHB3K1dLV001RXV6OTZUcTZ0bzJsQ1puQkdPWmJTbys2ZnkweXVISko1d0NmcWdIeC9TYWQzTjRkdkZNd0NsUWdZaURPYytyeXBHemFCMkpJQUhxZ2dFa3dWY1cwOHVWVnR2cVZaaU9mQUhUWnU0UFFxTGRxTkpNZDQwQUNBU3ZFRlVrUU1jelE3UzlaVWtBUklHQ2c4Z3FjL3llVlR5NlJBRWd6SWdoWUtTQU1nZ2orVFVEN1dXQVE1M2lCQ0hjbk1BS1ZubU9WTk1hVVNqUzVKc25IbHhnY3VGM2hjVVVZdjIxYk5tNlNBQ21QVlVCRVI5WVJKbnlwQzV1T1BNUkM1a2xRT0VtSWp4ejcwK2RScXpWS3daVURuSTU0OHhUNSs0VUZKRXlTQW1DWVVCTWN4N3g4S0pNSWFka3RHYksrRWc5U2JVdTdOb1dvOUo3dEhVa2hLb01Fam1lV2ZiVHJXUnRTVXFLUnZ4TzZUUG1JcmpzOENoa0syanZGa3FNZ2doS2NSQU1jc1UwN1JYQUpFd2s1QWpBQSs5UFh6bWx4R3FWZHB6WllNTWFnS0lRUmZXZnZnVlkvaTVJUENQdnR0Qk5SV2U4L2tnQ2MrL3dETFJaOHdGNHlsQXdDY2xjTEl6a1lpZ2pLaVZBZmZRa1NmSGtUTk5ZdHQxd1dVOE9Pa2R5ckY3RDZlZm1TRnhoYWxxNmN5b0pIUE03VXlQR21tckorbDU4aVk4MG1SSi9Dek5ITFZLMFd5RURDRUpEWU8wR1ZKQVZ0RVo1bVlvSHF3azdTZkZJbFBKVWc0ajhJbWxiWGFwWEZQTWxrN0l3SFVXQWR1eFFOMk54R0k1NCtBcFZJLzUreWtyd2ZTR0pQSkpCam1JOFBPdXdlUm5PRGp6bzQ5RW5lZCtuUWZxRTRaSURnODBSVjIraXE0MzZhbElPV0hYR2lQQ1NGcCt3MVJpakN4NFFmak9Qc3EwL1FsZlE5Y3NHSWNiUThrZmhOOEtvL29rVXY0aTBtSWtJdkJBRDFaN1RSaWwxTjlhMDJSL3dBcTA4NVhKR1FsUFF3Qkp1TzAxZlhXM3ljMDJVNmFrMVJLUmZIT20zemZQTHJpbkc3eEZPbUc4VmVIMG9FV216TmdPdUtmTTJZSEx3cFZEZExKTlZsNUsyQXVQbTlON20zcDZWVndWZTZ0QjFMYUZCb3pUcHBOTGxIdnJvSjhxMjQyRmdOTGx3Y05RclhMZmp4NDFOVko4S0I2N2I5ZVZXUW1scVE2azAwTzZJQUJxVTZja0VaejdhaExhaVBjZjIvSlVnMGErd1BFZWRDWjJQZmlDTnhwTnFLSTZoYWdERlJ2VXJaT2FsTjI1S1I1aW85cUtUUStIS1FhVnNqUW90ZFd3a21LRTNtUEtwRGNNMEMxTnF1a3gzMmxjd0lRRzlQT2dOMGpuem8vY0o2VXdmWnhUZUYxSkpNTFZkOW8wL1NqK1QvOWxVTW96MnNURHlmeFkvT1hRYW4wWGxDNW1memxaVXg5RTBpK1V2b2hncVY3TzhaVC93RFlWRHFzSDBHMm0rN3ZVZjhBdHpwSHVmdGFyeXpVVHZvck1NWE0wZTZzelgxUTZnRDZ5VW55a2c0OXRCbmlyWTNubnpIVUZQOEF6QXB5K1NWbzNTVEtVa1R5MkErUFdrdGdQTG82QkJqTzdPQ2E1V2w2Umh5Uk5BdHQwRTFYY21VejRxa2pudWdBS1NUOWFDakgrVHJFclFWWmtwa2piakVnbm5IaXIrN1RtK3RnUVNEdFBpcUNGVEVBeDRMRWcvaDBDdUh5TWtRb0VBZGNrMWUxdW9iSWJETVdwMlMyMms5dXlrRjB4dFFtT01ZQklJNFR5NUF5ZWRjMmJoQ1ZTU29FQVFvZUNWSkI1ZXRCajNpa3JXN2xwSkk5WURxSnhNRSsrS2YyWlFVZ0t3SkpVWnlDU0pFQWVDZnRORHVOYkZGSEtkOG45dTI5VHEyVEM3Y0FHeE1nL1htSUpHMGptZVVwSi9wR2ttN1k4WUN0c25oM1R0S1R1U29UeSs5K0ZJNmltQWN6dEJLc2UyRFBodEtUNzY3c2JvRktNa1FTZlY2YmtuaVZQRnpKcTl0NlZUbVJuSGliRmg5VDJRNjh0UVozNHhDVHlNUVNJUE9JSStGUmZVMjFJTUZQVUNlbmw3RHlxZExhQkJJZ2t5a1JJUEpVRVl3SUZDOWMwemNtQ0NRVkxHY0szQ0FEQTVaaWk4ZVlBMFVIbnNqYXdSTjJrOVBkTk95T3RjUVpkSlVRWmFXVHhBaU9FK1dQdHFXTGNsc3FTWVZJVEF5cm1rZ3FKSEtRY1ZXTDlzdHBZQytwQkN2SHA4WnFaOWs5VlNzN0ZuNlFwS1FUNnE1UXBBVmc4d1RQdUZheThlL0cxVHdNbGpHL2IrZHZUL2hFN1JabU1LM0ZNeUFjZ21QWnhFbjNVKytiZ3hIR3BLZVI2SVJJVndnUnpTcFg5SVZ6cUNVZ2xRSjJuMVNSdEt2WGlBZXVRUGZTYWJ4U3BSeUJLZ2tjL1cybzVEd1NrMHRObE1aWmNqTWEyYkg4STdydTNjU0NBc2hRSkpHL2lTbFFUS2lXeVlnN2lQY0tSMUpvS0NqdFNCTGtBcGJRVEliVTRoU1FaMmdKVEh0TmNYREtpUzRrSGlCSmtBRUJXVWlKazRTTTA2dGtTbFNUbFprUVoycVNWRE82SkNzRWU2c0d4c0ZSbmh4WWYvYUhpZDBJVUoxZlR0b0RqU1ZjNTJwRUZCRUhFWmlubWdkcFA4RytUSUIyTzVITVFRNFByR1Vwejdha1dwTnA5ZUU1QUoyeVR6SW1Jd09sUmpWdEtFRmJZU2t5QW9EaDNBN3NueHlEOGFaUnl0a2JwY2xXWmluSVlNbGpkTEJ2U01GVXFNRklrbjFUak8va2ZkUzFtcjZRQURtb25udHh4Y3ZFOFZRU3kxTjl0ejZQQkIrNUw5WHhCejFsUnpVcjBtN1pXZHZxS0l5aFIzS0tnRUpLZ3Fjb2tFejUxcVhHTEJ0dXBSOFdHU2VYTlhMQVI3YnZHNHdNcENvQUFTa0pRQ2RwNitKRkR0ZHNtMUlLVndvRklPT200VGp3T0tkZ0tRc2prTVNPUVVKVkl4MGx1SzI0N3VUMFBPVVFaQmxZd1p6Q1krRkJ0Y1dHd21jY1RwbmdqZUQwVlc2bll1Tk9sQm1KNFZjcEJuSTkyUGZYZWlXWGVYRFNGU0VGWTNxeXJhbWVJNTVWTnUxdWhiMERZb0ZTQ2R2VlJCM0dDQnlWZ21QS2t1eGVscUNGbGZDc3FTZ0F6Z0VTcVNCQXorU20zemdNVjkwa2k0WEhKbDFHZnM3Ni9SU1o5MW5adFNaVlBMYk1qTWs1NWRZcUY2dzZDb3p3bmRNN01SaytxRXdNQ3BKZnRiVUV5bFVKQmp3Q3BBSE9WR2NlNm9yZk5udkNaaWR2UEhyVE1lSTRUOFJRbUsyeVhKN3hjQnJCeTNXUFJDZFRlQUNRWTNLRTR4QlZrQWorU0lybnMyeUZYYkdOd0RxU1FUZ3BFcXo1UW1tdXBxQk0rSit3VWM5SEZ2TjVLcDJvYVdWUWRwekNSQmpITWlhWnU4TVpLNHBqdGVRME9GZ0hzckF1YnBFRktKVGcvVkE5VTdoQjV6eFNQQ1JVVTFNdzU1RWtHRGtIQng0RFAyMUo5UVpRQ1VrQkpKR0V4dEVDQ2tpWTNSdDVlTlEvVVhKY1Y4UlBQSUEvUlNyRzZwNWtOaGJBSFIyTlIzQjlFTVdzOTlCSENYUGhuclNzZFBBNC9WU1NzclVPcEJJOE1aRktKVktKNnB3ZmFNVXhQUkp5YVBYYnN1bmgxNjRWK1ExTXZSZGQ3ZFF0Rllod3VOSDJySDZ4VUl1WFkySE9RSTloSC9LakhacTgydk1PREhkdm9WN3BFL2xvZWR0eGtleXRpZURJS1hvNHJJQXlQMml1Rk9UMXJwMW1SSTZnS0dlaHlQeTAyQXJrTkFQVlBiMkJTaFB2cEIxRktvUlhleXRFQUtZS1pvYTk5UEdCV3U2TktOWTUxRW0xc0ZLRW1rMXVHbEFhd3ByQVBWWVN1V25LWFRGSUZGYVNjMVBUdHNvbDFKL2EycWxMUTJnYmx1TFEyZ2VLbHFDVTU2WklwdzVZdHFjWGIyaGV1SDBQZHlGYkVCaHhTRjdIdGhKM0JJMnJBVWNIYjRVaHBONHB0MXA1RWIybkVPSm5JbEJDZ0NPb3hSRFRydHR0M3ZHTGR0dEpMNVcyWFhWZ3B1RU9OcmJTU3I2TkgwaFY0OEtjMWZCeXczeG5lLzI5a0pQelM3d0RhdjM5MDNUbzcyNk5yWVNXa1BKZStjVy96ZFRiamltVUZOd0hlN252VXFSdG1jY3VWZGpzdDNqbGt3c3JaZXVieS90bmtsS1NXa2FjeXQxOVp6eEhla0pCNUhjSXA0MXFVTmhoVnV3dGhyNW1MWmdsMElhRmlwMWJNa0wzT3k0ODRveWN5S2EzMnFQa0ZXNEY0Mm1vMjNmQ1VxRHVwckxqOXlJUEM2QVNBT1FGR3MrVGFic2xDdjhBbkhDcUFVUjFmc3dVb2NkWkZ5dWJQVDMrNFV5aE53eS9xTDZyZTJ0YmxyZnVTNHBLTjRTQlBHbVFLVDBycy9jYjd0S25iSm8yVnU5YzNPNi90RkJ2dUNFcVpkTGJwREx1OVFUQ29nMHZhYTg5YWhDYmRwb2xGOHhmTFc1dUpjTnMyNjJocGNIMWR6NmxUem1LRVdldU5wYnZtR3JKbHUzdnJWRnV0b08zQ2xKVWg0M1BmZDZwemVwUmMyeW5rUTJrZU5YUEdMSUIyVTRYWlRMQTM5RktSWVhJYlBlTWtiUllsWEcyZi9FbGJMU0lWa3FJNWRCazRydTc3SjZoMy96WDV0RDRuYzJwKzNHempTMmp2Q1hZYjNLV25hREc2ZUdhMi8yN2RkK2FnMmxxMExhOXRMNVhkaGN2cXM3ZGRzMDI2Vkt5M3hoUS9rSnBIU08xZHcwTDJVaDlkKzhtNGZjVTQ2aFpjU3Bha3c0MnNMMnd2YkU4a2lsb3hzRmo5bkZHYzdQTGZLMysvd0ExRjc3UzNoYi9BRHRTVzBNbGJyYWU4dUxkdHhhbUZCRHlXbVZ1QmJwU3BRbUFldE5HT3piN3pES3JkcHh4KzcxRWFkYUlscEtISEF3dTZkQ2xMV0ZKSWFTRE1SbkpuRkhsYXNQbUNkUCthc2xuNXd6Y3VIZTdLaXk0WEQzU1N1TGNxU2U3SlR6QUZNYmZ0YTh3cXhMRERTUllLMVoxb2IzUHV1cEJ0Q0hTWm5jMjIyRXBQbVpwaGpISERodnRYN3FtZDJUcElMUmQvdCtxZzNiRHN4ZTJ5MlVYekJ0MTNEYTNXa2x4cFpJYlgzVGdWM1N6M2F3dmhLVEJIdU1ScTVHRFVyN1RhbTQ4TElMQVNMSFQyYkZFRWtyS0hIbm5ibHduL0RMZGZVbyt3VkhIMnNHbUFMZFhoUU9sMWVMcXExN1lmZDAvaXgrY3VnbFNEdHltTGhQNG9mbnVWSDZmdytRZlJjemsvd0FRL1ZaVm9mSnVVa2FuZGJqQU9uUFQ3bnJZL29yS3lxYy8rQS82Sy9oMzNsbjFVa3VIU1hTckkzTFVSN0NTSmozVnd5RHVqNER6VHlNMXVzcm02MlhwcGZ5NC9ENmY3ckxtWkVSeVBnRGt5Wno0MEkxbGllY1RrREptWTVjL3RyS3lySVQ0a0psa1B3Z0NCMVRQUXJtQ0czREJWQkNzOG9pS2tqYTFCQ1NrOUY1bVFSUFVFZWRaV1ZPZG90UXdjaHptTmhPN1E0SkZiUVh0UXVBaFMwSVVTWWhLbEpUay9DaEFLMlhIclo0SitpZlcwTnFpdjFGTFJ3cUhOTUFHYTNXVnVEZHBDbHhiN0hPWTVub2lkb29TRjhLMHpJQk9PUUVlSXdUVHB2TTlEdE1EQndoQVVRTjNpUWMxdXNxbCt5SVpBektmejVCNGhhQzY1cDZWb0lLU0p5Z3BCNkt6MTh4VVFaYlcyNXNVU0ZvaFNZbk9aQnhXcXltT0s0dVpSWE5aanljZ24wSUNuT2lhcDNpQzJxQTRrRWdHQkk1clVrbmtyYTJrVVJZdDlxa25jQ1JrZUhDc3Brand3cjRpc3JLWFpEQTEyeWF3Y1FsNW9oQjhKQ2VmT0FVSk80SW5iQUFNNUJYdG1jRHBROHZMbmhIMWtFR1RNZ0hiTW5sbjdhMVdWUTBCTWVGNGtjVDMxdmZydWwyN2NGQWttU0NUdHlUQ3NBK01tZmdLUXZtQUorOXp6RWNoTWMvTTFsWlVtSGRLTWFkOHVhWW5Id2s5T3lFYW5wcmFoSUVLQklLamhVRWtnVDc0aW9uZFd6aUhQV09Ed3VDTVFKSG1ESXJLeW0ySThrRzFuRnVIUXhXR0NsTE5FMTNlRU4zUE1KaEN3SUM0RGlqdTI4bFN0Um91R0ZnYnM4cGtjdUpLdWZTTWo0MWxaUW1TMEIyeXN3Y3A3WXhDUEtkbDFkM0pNcUc4YmxIYWpDZ25McG5sakNrajQxeGJPTFNGbEpJS2t4akE1K0I4c1ZsWlE1NkxxT0VZVWNMUzFvMjZwdmZPSHlIa0VBY2hIaE0rZFJIVVhlYWhFZ0ZLZk1xSkVuUGdJcmRaVERFNkxudmlTRnNaOEtqaUY1eWNidlBIMjFQZlJ6YTd1L1dNRGdSdWllcWpHNGN1aG55cmRaUldlZE1ScGNudzZaMGJ5NGU2TjZzd1VmVk1BQmZJOHZ3czg1U1o4d0tpYnFwSlZFZ3JIdDVucFc2eWwrSjVVOTRqTVpZNG5PVEoxRUwzQ2VveEo2MTBFOFN2UG1QZFdWbEhCSjN0RGVpUmVNbEtZNUFlN21QMG1uV25tRnBUMDgvT3QxbGJkNVZHdFBpSDBYb3YwZTNmZTZiYXVGUkpTMkVMbUpsR092U0JScGJBNmZvclZaWEY1SXFWd0hxdWpqM2FGd0dxMlVHdFZsVUtTMG9VaXBYVDMxdXNxeG9VU3NCUEtuRFNUeXJLeXBPQ2lDdW5HekgvQUVwc09mSTFxc3FUT2kwL3FuTEZQVXpGWldWUy9xcE5YWHVwdTRrL2xyS3lvRHFyVDBVVDdWdG1EN0tpMWs2Y2d4RTFsWlRPSVd4VXM4eU0yVjBnWUswZTlhUitVMC9YZE5sUDNSdm1CUGVOOHY2MVpXVUcrTVdqV3VLYkt1R3hIMGpXZkYxc2YvYWh1b0JCbjZScnAvaEVIci9Lckt5cm9XVWJWRWppVkg3c0k1YmtjL3YwZjhWREhVcCsrUi9YVCt1c3JLY3hKWEtWV25wQUErY3BnZy9SRElJUDEzUENvM1dWbGROQi9EQzVISy9pSDZyLzJRPT0nXG4gICAgfSxcblxuXTtcblxuZXhwb3J0IGNsYXNzIEFkRW1pdHRlciB7XG4gICAgcHJpdmF0ZSBfYWRFbWl0dGVyJCA9IG5ldyBTdWJqZWN0PElBZEV2ZW50PigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRFbWlzc2lvbnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbUFkZCgpOiBJQWRFdmVudCB7XG4gICAgICAgIGNvbnN0IGlzUmFuZG9tSW1hZ2UgPSBNYXRoLnJhbmRvbSgpID4gMC41O1xuXG4gICAgICAgIGlmICh0cnVlIHx8IGlzUmFuZG9tSW1hZ2UpIHsgLy8gdG9kb1xuICAgICAgICAgICAgY29uc3QgcmFuZG9tSW1hZ2VDcmVhdGl2ZUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogSU1BR0VfQ1JFQVRJVkVTLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCByYW5kb21JbWFnZUNyZWF0aXZlID0gSU1BR0VfQ1JFQVRJVkVTW3JhbmRvbUltYWdlQ3JlYXRpdmVJbmRleF07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnJhbmRvbUltYWdlQ3JlYXRpdmUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0lNQUdFJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRFbWlzc2lvbnMoKTogdm9pZCB7XG4gICAgICAgIG9mKG51bGwpLmV4cGFuZCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21EZWxheSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDUwMDApO1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0UmFuZG9tQWRkKCkpXG4gICAgICAgICAgICAgICAgLmRlbGF5KHJhbmRvbURlbGF5KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGFkRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZEVtaXR0ZXIkLm5leHQoYWRFdmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgYWRFbWl0dGVyJCgpOiBPYnNlcnZhYmxlPElBZEV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZEVtaXR0ZXIkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVG9BZEV2ZW50cyhjYjogKGFkRXZlbnQ6IElBZEV2ZW50KSA9PiB2b2lkKTogeyByZW1vdmVMaXN0ZW5lcjogKCkgPT4gdm9pZCB9IHtcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5hZEVtaXR0ZXIkXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgICAgICAgICBjYihldnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWREaXNwYXRjaGVyID0gbmV3IEFkRW1pdHRlcigpOyIsImV4cG9ydCAqIGZyb20gJy4vYWQtZW1pdHRlcic7Il0sInNvdXJjZVJvb3QiOiIifQ==