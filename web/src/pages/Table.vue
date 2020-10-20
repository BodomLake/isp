<template>
  <div style="height: 100%">
    <a-page-header class="page-header" title="财报查询" @back="$router.go(-1)">
      <div slot="subTitle">
        <a-select
          class="select"
          mode="multiple"
          label-in-value
          :value="options"
          placeholder="请输入股票或者代码"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          @search="fetchStock"
          @change="handleChange"
          @inputKeydown="addSelectedStock"
          :allowClear="true"
          :defaultOpen="true"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option
            v-for="stock of searchResult"
            :key="stock.code + '-' + stock.name"
            :label="stock.name"
          >
            {{ stock.code }} {{ stock.name }}
          </a-select-option>
          <my-icon slot="removeIcon" className="icon-quxiao"></my-icon>
          <!-- <my-icon slot="suffixIcon" className="icon-upward_flat"></my-icon> -->
          <my-icon slot="menuItemSelectedIcon" className="icon-Tick"></my-icon>
          <my-icon slot="clearIcon" className="icon-shanchu"></my-icon>
        </a-select>
      </div>
      <!-- <div slot="extra"></div> -->
    </a-page-header>
    <a-tabs
      v-if="stocks.length > 0"
      default-active-key="1"
      :tab-position="mode"
      :style="{ height: '92%' }"
      @prevClick="callback"
      @nextClick="callback"
      @change="changeTab"
      @tabClick="tabClick"
      size="small"
      type="line"
      :tabBarGutter="gutter"
    >
      <a-tab-pane
        v-for="(stock, index) of stocks"
        :key="index"
        :closable="true"
      >
        <div
          slot="tab"
          @contextmenu.prevent="onContextmenu"
          class="tab"
          :data-name="stock.name"
          :data-code="stock.code"
        >
          <strong :data-name="stock.name" :data-code="stock.code">
            {{ stock.code }} {{ stock.name }}
          </strong>
        </div>
        <Finance :stock="stock"></Finance>
      </a-tab-pane>
      <!-- <a-button slot="tabBarExtraContent"> Extra Action </a-button> -->
    </a-tabs>
    <a-result title="请在列表中添加股票" v-else>
      <template #icon>
        <!-- <a-icon type="smile" theme="twoTone" /> -->
      </template>
      <template #extra>
        <a-button type="primary"> 从自选中提取 </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
let activeKey = "";
let stocks;
import Finance from "../components/Finance";
import MyIcon from "../components/MyIcon";
import { Debounce, Throttle } from "../utils/my-fn";
import { postRequest, getRequest } from "../utils/api";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
export default {
  components: {
    Finance,
    MyIcon
  },
  // 加载信息
  beforeCreate() {
    // stocks = [
    //   { name: "捷佳伟创", code: "300724" },
    //   { name: "药石科技", code: "300725" },
    // ];
    stocks = [];
  },
  name: "Table",
  data() {
    return {
      mode: "left",
      activeKey,
      stocks,
      gutter: 0,
      searchResult: [],
      options: [],
      fetching: false
    };
  },
  methods: {
    // 下一页/上一页
    callback(val) {
      console.log(val);
    },
    changeTab(key) {
      // console.log(key);
    },
    tabClick(val) {
      // console.log(val);
    },
    onContextmenu(event) {
      let stock = {
        code: event.target.dataset.code,
        name: event.target.dataset.name
      };
      // console.log(event.target.dataset);
      // console.log(event.target.dataset);
      this.$contextmenu({
        items: [
          {
            label: `添加${stock.name}到自选(A)`,
            onClick: () => {
              this.message = "添加到自选(A)";
              console.log("添加到自选(A)");
            },
            icon: "icon-tianjia"
          },
          {
            label: "关闭财报(C)",
            onClick: () => {
              this.message = "关闭(C)";
              console.log("关闭(C)");
            },
            icon: "icon-quxiao"
          },
          {
            label: "重新加载(R)",
            divided: true,
            icon: "icon--Reload"
          },
          {
            label: "导出财报(X)",
            icon: "icon-Exporting"
          },
          {
            label: "投射(C)",
            icon: "icon-flagpx",
            divided: true
          },
          {
            label: "截取网页(R)",
            minWidth: 0,
            icon: "icon-jieping"
          },
          {
            label: "分享到(S)...",
            divided: true,
            minWidth: 0,
            icon: "icon-share",
            children: [
              {
                label: "QQ空间",
                icon: "icon-qzone",
                divided: true
              },
              {
                label: "豆瓣",
                icon: "icon-douban",
                divided: true
              },
              {
                label: "新浪微博",
                icon: "icon-weibo",
                divided: true
              },
              {
                label: "知乎",
                icon: "icon-zhihu",
                divided: true
              },
              {
                label: "掘金",
                icon: "icon-juejin",
                divided: true
              }
            ]
          },
          {
            label: "更多详情(M)",
            icon: "icon-Numberedlist"
          }
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "context",
        zIndex: 3,
        minWidth: 230
      });
      return false;
    },
    // 查询股票信息并且渲染<a-select-option value="v"></a-select-option>
    // 文本框值变化时回调
    fetchStock(value) {
      if (value.trim() === "" || undefined) return;
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.searchResult = [];
      this.fetching = true;
      getRequest("/table/getStock/" + value).then(res => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = res.data.map(stock => ({
          name: stock.name,
          code: stock.code
        }));
        this.searchResult = data;
        this.fetching = false;
      });
    },
    // 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
    handleChange(value) {
      console.log(value);
      Object.assign(this, {
        options: value,
        fetching: false
      });
    },
    addSelectedStock(e) {
      // console.log(e.key)
      // e.preventDefault();
      if (e.key === "Enter" && e.keyCode === 13) {
        console.log("options", this.options);
        this.options.forEach(e => {
          let code = e.key.split("-")[0];
          let name = e.key.split("-")[1];
          this.stocks.push({
            name: name,
            code: code
          });
        });
        this.options = [];
      }
    }
  },
  mounted() {
    this.lastFetchId = 0;
    this.fetchStock = throttle(this.fetchStock, 1000);
  },
  created() {}
};
</script>

<style scoped>
.select {
  margin-left: 5%;
  min-width: 60rem;
}

.page-header {
  border-bottom: 1px solid rgb(230, 237, 220);
  height: 8%;
}

.table {
  padding: 5px;
  max-height: 100%;
  height: 92%;
}

.tab {
  padding: 8px 16px;
}

.context {
  background-color: aqua;
}
</style>
