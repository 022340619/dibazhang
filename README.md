# 📊 数据可视化展示平台

一个基于Chart.js的交互式数据可视化网站，将matplotlib图表示例转换为现代化的Web展示平台。

## 🌟 项目特色

- 🎨 **现代化设计** - 采用渐变色和毛玻璃效果的现代化UI设计
- 📱 **响应式布局** - 完美适配桌面和移动设备
- 🔄 **交互式图表** - 支持缩放、悬停、数据集切换等交互功能
- ⌨️ **键盘快捷键** - 支持快速导航和操作
- 📤 **图表导出** - 右键即可导出图表为PNG图片
- 📋 **数据表格** - 详细的数据展示和分析

## 📁 项目结构

```
可视化/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能实现
├── README.md           # 项目说明文档
└── 第4章(2)(1).ipynb   # 原始数据源notebook
```

## 🚀 快速开始

### 在线预览

1. 克隆项目到本地
```bash
git clone <repository-url>
cd 可视化
```

2. 启动本地服务器
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx http-server -p 8000

# 或使用PHP
php -S localhost:8000
```

3. 在浏览器中访问
```
http://localhost:8000
```

### 直接打开

你也可以直接在浏览器中打开 `index.html` 文件，但某些功能可能受到跨域限制。

## 📊 功能展示

### 🌡️ 温度走势分析
- 展示15天的最高温度和最低温度数据
- 支持数据集的显示/隐藏切换
- 支持图表缩放和平移
- 数据标注和悬停提示

### 📈 三角函数对比
- 正弦和余弦函数的可视化对比
- 0°到360°的完整周期展示
- 平滑的曲线渲染
- 交互式函数值查看

### 🎯 图表样式示例
- **基础折线图** - 展示简单的趋势数据
- **散点图** - 随机数据点的分布展示
- **柱状图** - 多彩的数据对比展示

### 📋 数据表格
- 详细的温度数据表格
- 高低温差计算
- 颜色编码的温度显示
- 悬停高亮效果

## 🎮 使用指南

### 鼠标操作
- **悬停** - 查看详细数据值
- **滚轮** - 缩放图表（温度图和三角函数图）
- **拖拽** - 平移图表
- **右键** - 导出图表为PNG图片

### 键盘快捷键
- **ESC** - 重置所有图表缩放
- **1-5** - 快速跳转到对应图表区域

### 控制按钮
- **显示/隐藏** - 切换数据集的显示状态
- **重置缩放** - 恢复图表的默认视图

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化页面结构
- **CSS3** - 现代化样式和动画
- **JavaScript ES6+** - 交互功能实现
- **Chart.js** - 强大的图表库
- **Chart.js Zoom Plugin** - 图表缩放插件

### 设计特色
- **CSS Grid & Flexbox** - 响应式布局
- **CSS动画** - 平滑的过渡效果
- **渐变色设计** - 现代化视觉效果
- **毛玻璃效果** - 深度视觉层次

## 📈 数据来源

项目的温度数据来源于原始的Jupyter notebook文件 `第4章(2)(1).ipynb`，包含：

- 15天的温度记录数据
- matplotlib图表示例代码
- 中文显示配置

## 🎨 设计理念

### 颜色方案
- **主色调** - 紫色渐变 (#667eea → #764ba2)
- **高温颜色** - 红色系 (#ff6b6b)
- **低温颜色** - 蓝色系 (#4dabf7)
- **成功色** - 绿色系 (#51cf66)

### 布局特点
- **卡片式设计** - 清晰的内容分区
- **粘性导航** - 便捷的页面导航
- **响应式网格** - 自适应的图表布局

## 🔧 自定义配置

### 修改数据
在 `script.js` 文件中修改以下对象：

```javascript
// 温度数据
const temperatureData = {
    labels: [...], // 日期标签
    maxTemp: [...], // 最高温度
    minTemp: [...]  // 最低温度
};

// 三角函数数据
const trigonometryData = {
    labels: [...], // 角度值
    sinData: [...], // 正弦值
    cosData: [...]  // 余弦值
};
```

### 修改样式
在 `styles.css` 文件中自定义：
- 颜色变量
- 字体样式
- 动画效果
- 响应式断点

### 修改图表配置
在 `script.js` 的 `chartDefaults` 对象中修改：
- 图表类型
- 交互行为
- 插件配置

## 🌐 浏览器兼容性

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## 📝 开发说明

### 添加新图表
1. 在HTML中添加新的canvas元素
2. 在JavaScript中创建初始化函数
3. 在DOMContentLoaded中调用初始化
4. 更新CSS样式（如需要）

### 数据更新
支持动态数据更新：
```javascript
// 更新图表数据
chart.data.datasets[0].data = newData;
chart.update();
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Chart.js](https://www.chartjs.org/) - 强大的图表库
- [Chart.js Zoom Plugin](https://github.com/chartjs/chartjs-plugin-zoom) - 缩放功能插件
- 原始matplotlib教程数据

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发起 Discussion
- 邮件联系

---

⭐ 如果这个项目对你有帮助，请给它一个星标！