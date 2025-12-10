# 📊 数据可视化展示平台

基于matplotlib教程数据的交互式可视化展示网站，提供风速监测、三角函数分析和多维度数据对比功能。

## 🌟 项目特色

- 🌪️ **实时风速监测** - 深圳市24小时风速变化趋势分析
- 📈 **数学函数可视化** - 正弦余弦函数动态展示
- 📊 **多维度对比** - 温度、湿度等气象数据综合分析
- 🎨 **现代化UI** - 响应式设计，毛玻璃效果，流畅动画
- 🔧 **高度可定制** - 丰富的控制面板和配置选项

## 🚀 在线演示

访问在线演示网站：[https://yourusername.github.io/data-visualization](https://yourusername.github.io/data-visualization)

## 📱 功能预览

### 🌪️ 风速监测仪表板
- 实时显示24小时风速变化
- 支持多种单位转换（km/h, m/s, mph）
- 可调节时间间隔和显示精度
- 网格线和动画效果控制

### 📈 三角函数分析器
- 精确的正弦余弦函数图像
- 灵活的坐标轴范围调整
- 函数显示开关控制
- 多种线条样式选择

### 📊 数据对比中心
- 温度与湿度柱状图对比
- 六维天气指标雷达图
- 随机数据生成和动画播放
- 数据导出功能

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - 现代化样式，响应式布局
- **JavaScript (ES6+)** - 交互逻辑和数据处理
- **Bootstrap 5** - UI组件框架
- **Chart.js** - 数据可视化库

### 开发工具
- **Python HTTP Server** - 本地开发服务器
- **GitHub Pages** - 部署平台

## 📁 项目结构

```
数据可视化平台/
├── index.html          # 主页面
├── script.js           # 核心JavaScript逻辑
├── style.css           # 样式文件（可选）
├── README.md           # 项目说明文档
├── 第6章(1) (1).ipynb  # 原始数据源（Jupyter Notebook）
└── assets/             # 静态资源
    └── images/         # 图片资源
```

## 🚀 快速开始

### 本地运行

1. **克隆仓库**
```bash
git clone https://github.com/yourusername/data-visualization.git
cd data-visualization
```

2. **启动本地服务器**
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用PHP
php -S localhost:8000
```

3. **访问网站**
打开浏览器访问 `http://localhost:8000`

### 部署到GitHub Pages

1. **Fork本仓库** 或 **创建新仓库**
2. **上传文件** 到你的GitHub仓库
3. **启用GitHub Pages**
   - 进入仓库Settings
   - 找到Pages选项
   - 选择Source为Deploy from a branch
   - 选择main分支和/(root)文件夹
4. **访问你的网站**
   - 地址格式：`https://yourusername.github.io/data-visualization`

## 🎮 使用指南

### 键盘快捷键
- `Ctrl+1` - 切换到风速图表
- `Ctrl+2` - 切换到三角函数
- `Ctrl+3` - 切换到数据对比
- `Ctrl+R` - 生成随机数据

### 交互功能
- **点击Tab标签** 切换不同数据视图
- **使用控制面板** 自定义图表显示
- **悬停数据点** 查看详细信息
- **导出按钮** 下载JSON格式数据

## 📊 数据来源

本项目基于matplotlib教程数据，包含：

- **风速数据**：深圳市24小时平均风速监测
- **时间范围**：2019年10月24日00:00 - 24:00
- **采样频率**：每2小时一次
- **数据格式**：时间戳 + 数值

## 🎨 设计理念

### 视觉设计
- **渐变背景**：紫色系渐变营造专业感
- **毛玻璃效果**：现代化半透明卡片设计
- **圆角元素**：柔和友好的界面风格
- **动画效果**：流畅的过渡和微交互

### 用户体验
- **响应式布局**：完美适配桌面、平板、手机
- **直观导航**：Tab标签页清晰分类
- **实时反馈**：即时数据更新和动画效果
- **无障碍访问**：语义化HTML和键盘支持

## 🔧 自定义配置

### 修改数据源
在 `script.js` 中修改数据对象：
```javascript
const windData = {
    dates: ['00:00', '02:00', ...],
    windSpeed: [7, 9, 11, ...]
};
```

### 调整样式
在HTML文件中修改CSS变量：
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #FF9900;
}
```

### 添加新图表
1. 在HTML中添加新的canvas元素
2. 在JavaScript中创建Chart实例
3. 添加对应的控制面板

## 🌍 浏览器兼容性

| 浏览器 | 版本支持 |
|--------|----------|
| Chrome | 70+ |
| Firefox | 65+ |
| Safari | 12+ |
| Edge | 79+ |

## 📈 性能优化

- **图表渲染优化**：使用requestAnimationFrame
- **数据缓存**：避免重复计算
- **懒加载**：按需加载图表资源
- **压缩优化**：生产环境可压缩CSS/JS

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发流程
1. Fork项目
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交Pull Request

### 代码规范
- 使用ES6+语法
- 遵循语义化HTML
- 添加适当的注释
- 保持代码整洁

## 📝 更新日志

### v1.0.0 (2024-12-10)
- ✨ 初始版本发布
- 🌪️ 风速监测功能
- 📈 三角函数可视化
- 📊 多维度数据对比
- 🎨 现代化UI设计
- 📱 响应式布局
- ⌨️ 键盘快捷键支持

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Chart.js](https://www.chartjs.org/) - 强大的图表库
- [Bootstrap](https://getbootstrap.com/) - 优雅的UI框架
- [Font Awesome](https://fontawesome.com/) - 精美图标库

## 📞 联系方式

- **项目作者**：你的名字
- **GitHub**：[@yourusername](https://github.com/yourusername)
- **邮箱**：your.email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个Star！