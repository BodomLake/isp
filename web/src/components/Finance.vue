<template>
  <div style="height: 100%; margin: 24px 24px 0px 0px" id="finance">
    <div v-if="columns.length > 0">
      <a-radio-group
        @change="switchTable($event)"
        v-model="tabPosition"
        style="margin: 8px 0px 8px 2%; text-align: center"
        size="small"
      >
        <a-radio-button value="主要指标"><my-icon className="icon-zhibiao"></my-icon> 主要指标表 </a-radio-button>
        <a-radio-button value="利润表"><my-icon className="icon-huaban"></my-icon>  营收利润表 </a-radio-button>
        <a-radio-button value="资产负债表"><my-icon className="icon-balance"></my-icon>  资产负债表</a-radio-button>
        <a-radio-button value="现金流量表"><my-icon className="icon-coins"></my-icon>  现金流量表</a-radio-button>
        <a-radio-button value="银行专项指标"><my-icon className="icon-icon-test3"></my-icon>  银行专项指标 </a-radio-button>
        <a-radio-button value="券商专项指标"><my-icon className="icon-tonghuashun"></my-icon>  券商专项指标 </a-radio-button>
      </a-radio-group>
      <a-radio-group
        @change="switchSeason($event)"
        v-model="seasonPosition"
        style="margin: 8px 0px 8px 20%; text-align: center"
        size="small"
      >
        <a-radio-button value="0"> 全部 </a-radio-button>
        <a-radio-button value="4"> 年终报 </a-radio-button>
        <a-radio-button value="1"> 一季报</a-radio-button>
        <a-radio-button value="2"> 中季报</a-radio-button>
        <a-radio-button value="3"> 三季报 </a-radio-button>
      </a-radio-group>
      <!-- 表格 -->
      <a-table
        tableLayout="fixed"
        bordered
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :scroll="size"
        size="small"
      >
        <!-- <a-button slot="action">添加指标</a-button> -->
        <a slot="action">添加指标</a>
      </a-table>
    </div>
    <div v-else>
      <a-result status="info" title="正在加载...">
        <template #extra>
          <a-spin tip="正在加载..."> </a-spin>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script>
// 定义每一列
let columns = [];
// 填充x轴
let data = [];
// 表格数据和 固定轴上的数据(x+y轴)
let tableData = [];
import { postRequest, getRequest } from "../utils/api";
import MyIcon from "../components/MyIcon";
// let tabPosition = 'top';
export default {
  name: "Finance",
  components: {
    MyIcon
  },
  beforeCreate() {
    // console.log("马上构建Finance 组件");
  },
  // data和props初始化完成
  created() {
    getRequest("/table/getFinanceData/" + this.stock.code).then(res => {
      let data = JSON.parse(JSON.stringify(res.data));
      tableData = data[0].tables;
      // 首次渲染表格
      this.renderTable(data[0].tables, this.tabPosition);
      // 不要用this.tableData,因为this.tableData 本身并没被初始化成功
      // this.renderTable(this.tableData, this.tabPosition);
    });
  },
  mounted() {
    // getRequest("/table/getFinanceData/" + this.stock);
  },
  props: {
    stock: {
      type: Object,
      default: () => {
        return {
          name: "浦发银行",
          code: "600000"
        };
      }
    },
    size: {
      type: Object,
      default: () => {
        let h = document.getElementById("finance").scrollHeight;
        return {
          x: 1500,
          y: 500
        };
      }
    }
  },
  data() {
    return {
      data,
      columns,
      tabPosition: "主要指标",
      seasonPosition: "0",
      tableData
    };
  },
  methods: {
    // 渲染表格数据的函数
    renderTable(tables, tabPosition) {
      // 判断渲染哪一个表格
      // console.log("当前表格", tabPosition);
      if (tables && typeof tables === "object") {
        let data = tables
          .map(e => {
            if (e.name === tabPosition) {
              return e;
            }
          })
          .filter(e => {
            return e !== undefined;
          })[0];
        // 处理数据
        // 归零
        this.columns = [];
        this.columns.push({
          title: <span><my-icon className="icon-zhibiao"></my-icon>指标&nbsp;|&nbsp;<my-icon className="icon-zhouqifenxi"></my-icon>周期</span>, 
          width: 200,
          dataIndex: "name",
          key: "name",
          fixed: "left",
          align: "center",
          customRender: (text, record, index) => {
            return <strong>{{ text }}</strong>;
          },
          // ellipsis: true,
        });
        // 填充周期（横轴坐标）
        for (let periodIndex in data.periods) {
          this.columns.push({
            title: <strong>{data.periods[periodIndex]}</strong>,
            dataIndex: data.periods[periodIndex],
            key: periodIndex,
            width: 100,
            align: "center",
          });
        }
        this.columns.push({
          title: "自定义",
          key: "operation",
          fixed: "right",
          width: 120,
          scopedSlots: {
            customRender: "action"
          }
        });
        // 填充每一行
        this.data = [];
        for (let y in data.indicators) {
          let rows = {
            name: data.indicators[y]
          };
          for (let x in data.periods) {
            let k = Number(y * data.periods.length) + Number(x);
            rows[data.periods[x]] =
              data.data[k].text === "undefine" ? "" : data.data[k].text;
            rows["key"] = k;
          }
          this.data.push(rows);
        }
        // 内含有 两个固定列
        // console.log("this.columns", this.columns);
      }
    },
    renderTableWithSingleSeason(season) {},
    // 切换表格，重新渲染表格数据
    switchTable(e) {
      this.renderTable(tableData, e.target.value);
    },
    switchSeason(e) {
      this.renderTableWithSingleSeason(e.target.value);
    }
  },
  mounted() {
    let h = document.getElementById("finance").scrollHeight;
  }
};
</script>

<style scoped>
.ant-table {
  max-height: 100px !important;
}
</style>
