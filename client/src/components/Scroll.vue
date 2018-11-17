<template>
  <div class="scroll-wrap" ref="wrapper">
    <div>
        <!-- //下拉刷新 -->
        <div class="pulldown"  v-if="dragTip.showLoading">
            <div class="clear">
                <div class="fl">
                    <img src="../assets/scroll_load.gif" > 
                    <div class="fl">{{dragTip.text}}</div>
                </div>
            </div>
        </div>
        <slot></slot>
        <!-- 上拉加载 -->
        <div class="pullup">
          <div class="clear" v-if="!isDone">
            <div class="fl">
              <img src="../assets/scroll_load.gif" alt="">
              <div class="fl">加载中</div>
            </div>
          </div>
          <div class="list-pullup" v-else>
            <slot name="doneTip">没有更多数据</slot>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  data() {
    return {
      scroll: {},
      dragTip: {
        text: "下拉刷新",
        showLoading: false
      },
      isDone:false
    };
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    initScroll() {
      //判断dom结构是否存在
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1,
        click: true
      });

      //下拉刷新
      this.scroll.on("scroll", pos => {
        // console.log(pos)
        //显示图标
        this.dragTip.showLoading = true;
        if (pos.y > 50) {
          this.dragTip.text = "释放刷新";
        }
      });

      // 手松开 事件
      this.scroll.on("touchEnd", pos => {
        if (pos.y > 50) {
          this.dragTip.text = "刷新中...";
          // 重新初始化
          // 注册下拉事件

          this.$emit("pulldown");
          this.$on("refresh", this.reset);
        }
      });
			
			// 上拉加载
			this.scroll.on('scrollEnd', () => {
        // console.log(this.scroll.maxScrollY);
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          // 注册下拉加载事件
          this.$emit('pullup');
          // 触发事件
          this.$on('loadedDone', () => {
            this.isDone = true;
          });
        }
      });
			
    },
    reset() {   //重置
			this.isDone = false
      setTimeout(() => {
        this.dragTip = {
          text: "下拉刷新",
          showLoading: false
        };
      }, 600);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.fl {
  display: inline-block;
}
.fl img {
  width: 16px;
  vertical-align: middle;
  margin-right: 0.2rem;
}
/* 下拉刷新 */
.pulldown,
.pullup {
  width: 100%;
  height: 50px;
  position: relative;
  color: #888;
}
.clear {
  padding: 10px 0;
  font-size: 0.28rem;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translate(-50%, 0);
}
.list-pullup {
  text-align: center;
  font-size: .86rem;
  line-height: 50px;
  color: #888;
}
</style>
