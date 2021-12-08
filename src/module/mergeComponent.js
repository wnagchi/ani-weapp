import {debounce, throttle} from "./sectionFn";
import {isObject} from "../utils/util";

import initPage from "./initPage";
import pageInitFn from "./pageInitFn";
import userFn from "./userFn";
import utilFn from "./utilFn";
import wxmlFn from "./wxmlFn";
import initComponent from "./initComponent";
import {isFunction} from "../utils/util";

const mergeFunctions = [
    pageInitFn,
    userFn,
    utilFn,
    wxmlFn,
    initComponent
]
const originProperties = [
    'data',
    'properties',
    'options'
];
const componentMethod = [
    'created',
    'attached',
    'ready',
    'moved',
    'detached',
    'definitionFilter'
];

export function setMerge(options) {
    mergeFunctions.forEach(x => {
        Object.keys(x).forEach(y => {
            if (componentMethod.includes(y)) {
                const originFunc = options[y]
                options[y] = function (...args) {
                    x[y].call(this, ...args)
                    return originFunc && originFunc.call(this, ...args)
                }
            } else if (isFunction(x[y])) {
                if(!options.methods)options.methods={}
                options.methods[y] = x[y]
            }
        })

    })
    return options
}

