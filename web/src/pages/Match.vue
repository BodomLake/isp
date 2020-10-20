<template>
<div style="height:100%">
  <a-page-header class="page-header" style="border-bottom: 1px solid rgb(230, 237, 220)" title="财报匹配" sub-title="(根据周期+数据匹配对应的股票代码)" @back="$router.go(-1)" />

  <a-row :gutter="[0,0]" class="match">
    <a-col :span="12" class="left-side">
      <!-- 财报指标 -->
      <div class="item">
        <!-- 财报指标 -->
        <span>
          <a-icon type="unordered-list" />
        </span>
        <a-select style="width: 30%" @change="reportTypeChange" v-model="reportType">
          <a-select-option v-for="(type,index) in reportTypeData" :key="index">{{ type }}</a-select-option>
          <my-icon slot="suffixIcon" className="icon-downward_flat"></my-icon>
        </a-select>
        <a-select style="width: 50%" v-model="indicatorName">
          <div slot="dropdownRender" class="select-list">
            <div :value="name" :key="index" v-for="(name,index) of indicatorNames" class="select-item" @click="selectItem(name)">{{name}}</div>
          </div>
          <my-icon slot="suffixIcon" className="icon-downward_flat"></my-icon>
          <!-- <a-select-option v-for="(name,index) in indicatorNames" :key="index">{{ name }}</a-select-option> -->
        </a-select>
      </div>

      <!-- 财报周期 -->
      <div class="item">
        <span>
          <a-icon type="clock-circle" />
        </span>
        <!-- :dropdownStyle="dropdownMenuStyle" :dropdownClassName="dropdownClassName" -->
        <a-select style="width: 15%;" v-model="year" :dropdownStyle="dropdownMenuStyle">
          <my-icon slot="suffixIcon" className="icon-downward_flat"></my-icon>
          <div slot="dropdownRender" class="select-list">
            <div style="padding: 4px 8px; cursor: pointer;" @mousedown="e => e.preventDefault()">
              <a-icon type="plus" />&nbsp;添加年份
            </div>
            <a-divider style="margin: 4px 0;" />
            <div :value="y" :key="i" v-for="(y,i) of years" class="select-item" @click="selectYear(y)">{{y}}</div>
          </div>
          <!-- <a-select-option :value="i" :key="i" v-for="(i) of years" >{{i}}</a-select-option> -->
        </a-select>
        <a-select style="width: 15%;" v-model="season.value">
          <a-select-option :value="i.value" :key="n.value" v-for="(i,n) in seasons">{{i.label}}</a-select-option>
          <my-icon slot="suffixIcon" className="icon-downward_flat"></my-icon>
        </a-select>
      </div>
      <!-- 财报数据 -->
      <div class="item">
        <span>
          <a-icon type="pay-circle" />
        </span>
        <a-input-number :min="0" :max="9999" :step="step" v-model="indicatorData" style="width: 15%;" />
        <!-- <span>单位</span> -->
        <a-select default-value="亿" style="width: 15%;" v-model="unit">
          <a-select-option value="亿">亿</a-select-option>
          <a-select-option value="万">万</a-select-option>
          <a-select-option value="万亿">万亿</a-select-option>
          <a-select-option value="%">%</a-select-option>
          <my-icon slot="suffixIcon" className="icon-downward_flat"></my-icon>
        </a-select>
      </div>

      <!-- 选择版块 -->
      <!--<div class="item">-->
      <!--  <div :style="{ borderBottom: '1px solid #E9E9E9' }">-->
      <!--    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">全选</a-checkbox>-->
      <!--  </div>-->
      <!--  <br/>-->
      <!--  <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange"/>-->
      <!--</div>-->

      <!-- 查询按钮 -->
      <div class="item">
        <a-button style="width:50%;margin-left:20%" type="primary" icon="search" :loading="flag1" @click="quickMatch(indicatorName,indicatorData,unit,year,season)">查询财报</a-button>
      </div>

      <!-- 结果显示 -->
      <a-divider></a-divider>
      <div class="item">
        <a-input addon-before="股票代码" ref="codeInput" v-model="stockCode" placeholder="匹配股票代码" @pressEnter="getStockByCode(stockCode)">
          <a-icon slot="prefix" type="stock" />
          <a-tooltip slot="suffix" title="enter键 即可查询">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <!-- <a-button @click="getStockByCode(stockCode)">匹配股票代码</a-button> -->
      </div>
      <div class="item">
        <a-input addon-before="股票名称" ref="nameInput" v-model="stockName" placeholder="匹配股票名称" @pressEnter="getStockByName(stockName)">
          <a-icon slot="prefix" type="stock" />
          <a-tooltip slot="suffix" title="enter键 即可查询">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <!-- <a-button @click="getStockByName(stockName)">匹配股票名称</a-button> -->
      </div>
    </a-col>
    <!-- 右侧 -->
    <a-col :span="12" class="right-side">
      <div class="result" id="result">
        <a-collapse :bordered="false" :activeKey="activeKey" @change="changePanels($event)">
          <a-collapse-panel :key="index.toString()" :header="'第' + (index+1) + '次查询' + items.param" v-for="(items,index) of resultPanels">
            <!-- 同时满足flag为true，且数组长度为0 ：http通讯正常且结果为空数组-->
            <a-result v-if="items.content.length === 0 && items.flag" status="success" title="无查询结果"></a-result>
            <!-- flag为flase，则是查询出现错误 -->
            <a-result v-else-if="!items.flag" status="error" title="查询出现错误"></a-result>
            <!-- 同时满足flag为真，且数组长度大于0 -->
            <a-list v-else size="small" bordered :data-source="items.content">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-tag color="#f50" style="margin-left:40%;font-size:14px">{{ item.market}} {{ item.name}} {{item.code}}</a-tag>
              </a-list-item>
            </a-list>
            <a-icon slot="extra" type="search" />
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-col>
  </a-row>
</div>
</template>

<script>
import {
  postRequest,
  getRequest
} from "../utils/api";
import MyIcon from "../components/MyIcon";
/*
  let reportTypeData = [
    "主要指标",
    "资产负债表",
    "利润表",
    "现金流量表",
    "银行专项表",
  ];
  let indicatorNameData = [
    [
      "净利润(元)",
      "净利润同比增长率",
      "销售净利率",
      "净资产收益率",
      "扣非净利润同比增长率",
    ],
    ["货币资金(元)", "资产总计(元)", "固定资产(元)"],
    ["经营活动产生的现金流量净额(元)", "投资支付的现金(元)"],
    ["利息收入(元)", "利息支出(元)", "投资收益(元)"],
    ["存款总额(元)", "贷款总额(元)", "不良贷款(元)", "不良贷款率"],
  ];
  */
let reportTypeData = [];
let indicatorNameData = [];
let years = [];
const marketTypes = [{
    label: "全部",
    value: ""
  },
  {
    label: "沪市",
    value: "0"
  },
  {
    label: "深市",
    value: "1"
  },
  // {label: '港股', value: '2'},
  // {label: '美国', value: '3'},
];
const plainOptions = ["沪市", "深市"];
const defaultCheckedList = ["沪市", "深市"];
export default {
  components: {
    MyIcon
  },
  name: "Match",
  // 创建vue子实例的时候，获取要用来渲染<template>的指标，年份等等数据
  beforeCreate() {
    // 默认加载浦发银行的所有指标
    // 获取document.tables[0:4] 五个表，name:'报表名称', indicators:['?','??','???']
    getRequest("/match/loadIndicators").then((res) => {
      this.$message.success("各项指标加载完毕");
      let result = JSON.parse(JSON.stringify(res.data));
      // 处理每一张表的各个指标
      Array.from(result[0].tables).forEach((item, index) => {
        reportTypeData.push(item.name);
        //
        let indicatorsArray = [];
        Object.assign(indicatorsArray, item.indicators);
        // 删掉不要的指标title 这些在中是没有数据的
        const removeTitleArray = [
          [
            "成长能力指标",
            "每股指标",
            "盈利能力指标",
            "运营能力指标",
            "偿债能力指标",
          ],
          [
            "流动资产(元)",
            "非流动资产(元)",
            "流动负债(元)",
            "非流动负债(元)",
            "所有者权益（或股东权益）(元)",
          ],
          ["六、每股收益(元)", "七、其他综合收益(元)"],
          [
            "一、经营活动产生的现金流量(元)",
            "二、投资活动产生的现金流量(元)",
            "三、筹资活动产生的现金流量(元)",
            "补充资料：(元)",
            "1、将净利润调节为经营活动现金流量：(元)",
            "2、不涉及现金收支的重大投资和筹资活动：(元)",
            "3、现金及现金等价物净变动情况：(元)",
          ],
        ];
        removeTitleArray[index].forEach((e) => {
          if (indicatorsArray.indexOf(e) !== -1)
            indicatorsArray.splice(indicatorsArray.indexOf(e), 1);
        });
        indicatorNameData.push(indicatorsArray);
        // console.log(JSON.stringify(item.name));
        // console.log(JSON.stringify(item.indicators));
      });
      this.indicatorNames = this.indicatorNameData[0];
      this.indicatorName = this.indicatorNameData[0][0];
    });
    for (let i = 2020; i >= 1999; i--) {
      years.push(i.toString());
    }
  },
  props: {},
  data() {
    return {
      activeKey: new Array(),
      resultPanels: new Array(),
      dropdownMenuStyle: {
        color: "black",
      },
      dropdownClassName: "dropdownClassName",
      flag1: false,
      flag2: false,
      reportTypeData,
      indicatorNameData,
      reportType: "主要指标",
      indicatorNames: indicatorNameData[0],
      indicatorName: "净利润(元)",
      year: "2018",
      years,
      season: {
        label: "年终报",
        value: "-12-31"
      },
      seasons: [{
          label: "一季报",
          value: "-03-31"
        },
        {
          label: "中季报",
          value: "-06-30"
        },
        {
          label: "三季报",
          value: "-09-30"
        },
        {
          label: "年终报",
          value: "-12-31"
        },
      ],
      indicatorData: 3.06,
      unit: "亿",
      step: 0.01,
      stockName: "浦发银行",
      stockCode: "600000",
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
    };
  },
  computed: {},
  methods: {
    // 换选财报类型的时候
    reportTypeChange(value) {
      this.indicatorNames = this.indicatorNameData[value];
      this.indicatorName = this.indicatorNameData[value][0];
    },
    // 市场选择改动时
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    selectYear(year) {
      this.year = year;
    },
    selectItem(indicatorName) {
      this.indicatorName = indicatorName;
    },
    changePanels(e) {
      // console.log("panel index:", e);
      this.activeKey = new Array();
      Object.assign(this.activeKey, Array.from(new Set(e)));
      // console.log("this.activeKey:", this.activeKey);
    },
    quickMatch(indicatorName, indicatorData, unit, year, season) {
      // 默认有 正确的返回结果
      let result = {
        flag: true,
        content: [],
        param: ` ${indicatorName} ${indicatorData}${unit} ${year}${season.value}`,
        active: true,
      };
      // 开始发送请求 按钮显示loading状态
      this.flag1 = true;
      let lookup = {
        from: "list",
        localField: "name",
        foreignField: "name",
        as: "stockName",
      };
      postRequest("/match/quickMatch", {
          "tables.data": {
            $elemMatch: {
              text: indicatorData + unit,
              period: year + season.value,
              indicator: indicatorName,
            },
          },
        })
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data));
          if (data instanceof Array && data.length != 0) {
            result.content = data;
          } else {
            this.$message.success("没有找到对应上市公司");
          }
        })
        .catch((err) => {
          console.log(err);
          // 出错了才是false
          result.flag = false;
        })
        .finally(() => {
          // 加入结果面板
          this.resultPanels.push(result);
          // 定位到当前结果，将其展开
          this.activeKey.push((this.resultPanels.length - 1).toString());
          // console.log("resultPanels:", this.resultPanels);
          // console.log("activeKey", this.activeKey);
          this.flag1 = false;
          this.$nextTick(() => {
            let resultDOM = document.getElementById("result");
            resultDOM.scrollTop = resultDOM.scrollHeight;
          });
        });
    },
    getStockByCode() {
      getRequest("/match/getStockByCode/" + this.stockCode).then((data) => {
        this.$message.success(JSON.stringify(data.data));
      });
    },
    getStockByName() {
      getRequest("/match/getStockByName/" + this.stockName).then((data) => {
        this.$message.success(JSON.stringify(data.data));
      });
    },
  },
};
</script>

<style scoped>
.page-header {
  height: 8%;
}

.match {
  padding: 5px 50px 5px 50px;
  max-height: 100%;
  height: 92%;
}

.item {
  display: flex;
  margin-top: 6px;
  padding: 5px;
  line-height: 32px;
}

.item span {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: orangered;
  margin-left: 5px;
  margin-right: 5px;
}

.ant-select {
  margin-left: 10px;
}

.ant-input-number {
  margin-left: 10px;
}

.ant-btn {
  margin-left: 30px;
}

.result {
  /* border-top: 0.5px groove #dcdcdc45; */
  /* padding-top: 5px;
  padding-left: 5px; */
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
}

.left-side {
  /* border-right: 0.5px groove #dcdcdc45; */
  border-right: 1px solid rgb(230, 237, 220);
  height: 100%;
  padding-right: 10px;
}

.right-side {
  /* border-right: 0.5px groove #dcdcdc45; */
  height: 100%;
  padding-left: 10px;
}

.select-list {
  overflow-y: scroll;
  text-align: center;
  max-height: 200px;
}

.select-item {
  display: block;
  padding-top: 5px;
  font-size: 14px;
  min-width: 100%;
  height: 32px;
  cursor: pointer;
  font-variant: tabular-nums;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: tabular-nums;
  font-variant-east-asian: normal;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.select-item:hover {
  background-color: #1890ff;
}
</style>
