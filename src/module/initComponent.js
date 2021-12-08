import pageInitFn from "./pageInitFn";

export default {
    ready() {
        pageInitFn.isIphoneX(this);
    },

};
