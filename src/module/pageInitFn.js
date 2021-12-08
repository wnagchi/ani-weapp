export default {
  $getHeight(argument) {
    let text = argument;
    let query = wx.createSelectorQuery();
    query.select(text).boundingClientRect();
    return new Promise((resolve, reject) => {
      query.exec((res) => {
        if (res[0] != null) {
          resolve(res);
        } else {
          console.error(`输入的ID：${argument}未找到或不合法`);
          reject();
        }
      });
    });
  },

  $getNode(name, arr = []) {
    let property = [
      "margin",
      "backgroundColor",
      "fontSize",
      "color",
      "padding",
    ].concat(arr);
    return new Promise((resolve) => {
      wx.createSelectorQuery()
          .select(name)
        .fields(
          {
            dataset: true,
            size: true,
            scrollOffset: true,
            properties: ["scrollX", "scrollY"],
            computedStyle: property,
            context: true,
            node: true,
          },
          (res) => {
            resolve(res);
          }
        )
        .exec();
    });
  },

  $getWxImg(src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: src,
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          console.warn(`输入的src：${src}未找到或不合法`);
          resolve(false);
        },
      });
    });
  },

  getNav(that, id = "#Navigation") {
    const navigation = that.selectComponent(id);
    if (navigation) {
      // const navHeight = navigation.data.titleBarHeight;
      // const navTopHeight = navigation.data.statusBarHeight;
      // that.setData({ navHeight: navHeight + navTopHeight });

     
    } else {
      console.warn(
        "无自定义头或未找到自定义头；如果有自定义头id设置为：Navigation"
      );
      return false;
    }
  },
  isIphoneX(that, otherHeight = 0, addDOM = true) {
    return new Promise((resolve) => {
      let nav=that.selectComponent("#Navigation");
      let navHeight=0;
      wx.getSystemInfo({
        success: function (res) {
          let isIPX = Boolean;
          let isIphone = Boolean;
          let scrollHeight = Number;
          if (res.model.indexOf("iPhone") > -1) {
            if (
              [
                "iPhone 4",
                "iPhone 5",
                "iPhone 6",
                "iPhone 7",
                "iPhone 8",
              ].some(x=>res.model.indexOf(x)>-1)
            ) {
              isIPX = false;
              scrollHeight = res.windowHeight - otherHeight;
            } else {
              isIPX = true;
              scrollHeight = res.windowHeight - 34 - otherHeight;
            }
            if(nav)navHeight+=44
            isIphone = true;
          } else {
            isIPX = false;
            scrollHeight = res.windowHeight - otherHeight;
            isIphone = false;
            if(nav)navHeight+=48
          }
          // console.table("手机相关信息", res)
          const safeArea = res.safeArea;

          if (res.screenHeight !== res.windowHeight) {
            safeArea.top = 0;
            safeArea.height = res.windowHeight - 34;
          }
          // if(nav)navHeight+=safeArea.top
          navHeight=nav?(navHeight+res.statusBarHeight):0
          const abSafeArea = `position:absolute;top:${safeArea.top}px;left:0;height:${safeArea.height}px;width:${safeArea.width}px`;
          const reSafeArea = `position:relative;padding-top:${safeArea.top}px;height:${safeArea.height}px;width:${safeArea.width}px`;

          // let navHeight = that.getNav(that,safeArea.top);
          if (navHeight) {
            scrollHeight = scrollHeight - navHeight;
          }
          const navTop=res.statusBarHeight;
          const aniData = {
            isIPX: isIPX,
            isIphone,
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
            scrollHeight: scrollHeight,
            navHeight,
            navTop,
            scale: (res.windowHeight / res.windowWidth).toFixed(4),
            area: {
              safeArea,
              abSafeArea,
              reSafeArea,
            },
          };

          if (addDOM) {
            that.setData({aniData});
          }
          resolve(aniData);
        },
      });
    });
  },
};
