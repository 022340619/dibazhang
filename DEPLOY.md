# 🚀 GitHub 部署指南

快速将您的数据可视化项目部署到 GitHub Pages！

## 📋 部署步骤

### 1. 准备 GitHub 仓库
```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "feat: 添加数据可视化仪表板"

# 连接到 GitHub 仓库
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 2. 启用 GitHub Pages
1. 访问您的 GitHub 仓库
2. 点击 **Settings** 标签页
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 **main** 和 **/(root)**
5. 点击 **Save**

### 3. 访问您的网站
等待几分钟后，您的网站将在以下地址可用：
```
https://your-username.github.io/your-repo-name/dashboard.html
```

## 🔧 推荐设置

### 自定义域名（可选）
1. 在仓库 Settings > Pages 中添加自定义域名
2. 在域名DNS中添加 CNAME 记录指向 `your-username.github.io`

### 强制 HTTPS
在 Settings > Pages 中启用 "Enforce HTTPS"

## 📁 重要文件说明

- `dashboard.html` - **主要文件**，推荐此版本用于部署
- `README.md` - 项目说明文档
- `test.html` - 简化测试版本
- `index.html` - 原始复杂版本

## ⚠️ 注意事项

1. **使用 dashboard.html** 作为主页面，这是最稳定的版本
2. 确保所有文件都包含在仓库中
3. GitHub Pages 支持静态 HTML，无需额外配置
4. 首次部署可能需要几分钟生效

## 🎯 部署成功标志

看到以下内容说明部署成功：
- ✅ 网站能正常访问
- ✅ 图表正常显示
- ✅ 表格数据完整
- ✅ 响应式设计生效

## 🆘 故障排除

### 图表不显示
- 检查网络连接，确保能访问 Chart.js CDN
- 尝试刷新页面
- 查看浏览器控制台是否有错误

### 页面空白
- 确认访问的是 `dashboard.html`
- 检查 GitHub Pages 是否启用
- 清除浏览器缓存后重试

### 样式异常
- 确认 CSS 文件已上传
- 检查浏览器兼容性

---

🎉 恭喜！您的数据可视化项目现在已经部署到互联网上了！