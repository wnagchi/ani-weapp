export default class Listen {
    constructor() {
    }

    onLoad(oldOptions, fn) {
        return function (op) {
            let newOp = fn.call(this, op)
            if (newOp) {
                oldOptions.call(this, newOp)
            } else {
                oldOptions.call(this,op)
            }
        }
    }

    onShow(oldOptions, fn) {
        return function () {
            fn.call(this)
            oldOptions.call(this)
        }

    }

    onReady(oldOptions, fn) {
        return function () {
            fn.call(this)
            oldOptions.call(this)
        }
    }

    onHide(oldOptions, fn) {
        return function () {
            fn.call(this)
            oldOptions.call(this)
        }
    }

}