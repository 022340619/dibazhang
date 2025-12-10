# 🚀 GitHub 部署指南

本指南将帮助你将数据可视化项目上传到GitHub并启用GitHub Pages。

## 📋 部署前准备

### 1. 准备GitHub账户
- 确保你有一个GitHub账户
- 如果没有，请在 [GitHub](https://github.com) 注册

### 2. 安装Git工具
- **Windows**: 下载 [Git for Windows](https://git-scm.com/download/win)
- **macOS**: `brew install git`
- **Linux**: `sudo apt-get install git`

## 🔄 部署步骤

### 方法一：通过GitHub网页界面上传（推荐新手）

1. **创建新仓库**
   - 登录GitHub
   - 点击右上角的 "+" → "New repository"
   - 仓库名称：`data-visualization`
   - 描述：`数据可视化展示平台`
   - 选择 "Public"
   - 不要勾选 "Initialize with README"

2. **上传文件**
   - 点击 "uploading an existing file"
   - 拖拽或选择项目中的所有文件：
     ```
     ✓ index.html
     ✓ script.js
     ✓ README.md
     ✓ LICENSE
     ✓ .gitignore
     ✓ CONTRIBUTING.md
     ✓ DEPLOY.md
     ```
   - 在 "Commit changes" 中输入：
     - 标题：`Initial commit`
     - 描述：`Add data visualization platform`

3. **启用GitHub Pages**
   - 进入仓库设置 → Settings
   - 找到 "Pages" 选项
   - Source 选择：`Deploy from a branch`
   - Branch 选择：`main`
   - Folder 选择：`/(root)`
   - 点击 "Save"

4. **访问网站**
   - 等待几分钟部署完成
   - 访问：`https://yourusername.github.io/data-visualization`

### 方法二：通过Git命令行上传（推荐开发者）

1. **初始化本地Git仓库**
```bash
cd "c:/Users/邓雨涵/.oracle_jre_usage/Desktop/可视化"
git init
git add .
git commit -m "Initial commit: Add data visualization platform"
```

2. **连接远程仓库**
```bash
git remote add origin https://github.com/yourusername/data-visualization.git
git branch -M main
```

3. **推送到GitHub**
```bash
git push -u origin main
```

## ⚙️ GitHub Pages配置

### 自动部署（推荐）
项目已配置GitHub Actions，推送代码后会自动部署：

1. 启用Actions权限
   - Settings → Actions → General
   - Workflow permissions 选择 "Read and write permissions"
   - Allow GitHub Actions... 打勾

2. 触发部署
   - 任何推送到main分支的操作都会触发部署
   - 可在Actions标签页查看部署状态

### 手动部署
如果自动部署失败，可以手动启用Pages：

1. 进入仓库Settings
2. 找到Pages选项
3. Source选择`Deploy from a branch`
4. Branch选择`main`，Folder选择`/(root)`
5. 点击Save

## 🔧 自定义域名（可选）

### 使用自定义域名
1. 在仓库根目录创建`CNAME`文件：
   ```
   your-domain.com
   ```

2. 配置DNS记录：
   - A记录：`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME记录：`yourusername.github.io`

3. 在GitHub Pages设置中更新域名

## 📊 部署验证

### 检查部署状态
1. 查看Actions标签页
2. 确保部署workflow显示✅绿色
3. 点击部署结果查看详情

### 常见问题排查

**页面显示404**
- 检查仓库名称是否正确
- 确认Pages设置中的分支和文件夹
- 等待几分钟让部署完成

**样式文件加载失败**
- 检查文件路径是否正确
- 确认CDN链接可访问
- 查看浏览器控制台错误信息

**图表不显示**
- 检查JavaScript是否有错误
- 确认Chart.js库正确加载
- 验证数据格式是否正确

## 🔄 更新和维护

### 更新网站
1. 修改本地文件
2. 提交更改：
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

### 版本管理
- 使用语义化版本号（v1.0.0, v1.1.0等）
- 在GitHub创建Release标记重要版本
- 更新CHANGELOG.md记录变更

## 📈 监控和分析

### Google Analytics集成
1. 在`index.html`中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 其他分析工具
- GitHub自带流量统计（Insights）
- 百度统计、友盟等第三方工具

## 🤝 贡献者管理

### 添加协作者
1. Settings → Collaborators
2. 添加协作者GitHub用户名
3. 设置权限级别

### Pull Request管理
- 启用Branch Protection
- 设置Required pull request reviews
- 配置Status checks

## 🔒 安全注意事项

### 私密信息
- 不要在代码中包含API密钥
- 使用环境变量存储敏感信息
- 定期更新依赖项

### 访问控制
- 定期审查协作者权限
- 启用Two-factor authentication
- 监控异常活动

## 📞 获取帮助

- GitHub文档：https://docs.github.com
- GitHub支持：https://support.github.com
- 本项目Issues：https://github.com/yourusername/data-visualization/issues

---

🎉 恭喜！你的数据可视化平台现在已经在互联网上运行了！