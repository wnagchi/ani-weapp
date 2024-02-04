import pageInitFn from "./pageInitFn";
import {isFunction} from "../utils/util";

async function initThisPage() {
  // console.log(this.data);
  if (this.data.otherHeight) {
    await pageInitFn.isIphoneX(this, this.data.otherHeight);
  } else {
    await pageInitFn.isIphoneX(this);
  }
  if (this.onInit && isFunction(this.onInit)) {
    this.onInit();
  }
}
export default {
  onReady() {
      // console.log(this.data);
    initThisPage.apply(this);
  },
};
