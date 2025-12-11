// 数据可视化图表实现

// 全局变量
let currentChart = null;

// 页面切换功能
function showHomepage() {
    document.getElementById('homepage').classList.remove('hidden');
    document.getElementById('chart-detail').classList.add('hidden');
}

function showChart(chartType) {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('chart-detail').classList.remove('hidden');
    
    const content = document.getElementById('chart-content');
    content.innerHTML = '';
    
    switch(chartType) {
        case 'contour':
            showContourChart(content);
            break;
        case 'streamline':
            showStreamlineChart(content);
            break;
        case 'stem':
            showStemChart(content);
            break;
        case 'dumbbell':
            showDumbbellChart(content);
            break;
        case 'gantt':
            showGanttChart(content);
            break;
        case 'population':
            showPopulationChart(content);
            break;
        case 'funnel':
            showFunnelChart(content);
            break;
        case 'sankey':
            showSankeyChart(content);
            break;
        case 'tree':
            showTreeChart(content);
            break;
    }
}

// 1. 等高线图
function showContourChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-mountain"></i> 等高线图</h2>
        <p>等高线图用于展示三维地形数据的等高线分布，常用于地理数据和科学计算的可视化。</p>
        <div class="chart-container">
            <div id="contour-chart"></div>
        </div>
    `;
    
    // 生成等高线数据
    const size = 100;
    const x = [];
    const y = [];
    const z = [];
    
    for (let i = 0; i < size; i++) {
        x[i] = -2 + 4 * i / (size - 1);
        y[i] = -2 + 4 * i / (size - 1);
    }
    
    for (let i = 0; i < size; i++) {
        z[i] = [];
        for (let j = 0; j < size; j++) {
            const x1 = x[j];
            const y1 = y[i];
            z[i][j] = (1 - x1/2 + Math.pow(x1, 5) + Math.pow(y1, 3)) * 
                      Math.exp(-Math.pow(x1, 2) - Math.pow(y1, 2));
        }
    }
    
    const data = [{
        x: x,
        y: y,
        z: z,
        type: 'contour',
        colorscale: 'Copper',
        contours: {
            coloring: 'heatmap'
        },
        colorbar: {
            title: '高度值'
        }
    }];
    
    const layout = {
        title: '三维地形的等高线图',
        xaxis: { title: 'X轴' },
        yaxis: { title: 'Y轴' },
        width: 800,
        height: 600
    };
    
    Plotly.newPlot('contour-chart', data, layout);
}

// 2. 矢量场流线图
function showStreamlineChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-wind"></i> 矢量场流线图</h2>
        <p>矢量场流线图用于可视化流体运动和矢量场的流线分布。</p>
        <div class="chart-container">
            <canvas id="streamline-canvas" width="800" height="600"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('streamline-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制网格背景
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 40, 0);
        ctx.lineTo(i * 40, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * 30);
        ctx.lineTo(width, i * 30);
        ctx.stroke();
    }
    
    // 绘制流线
    ctx.strokeStyle = '#4285f4';
    ctx.lineWidth = 2;
    
    for (let start = 0; start < 10; start++) {
        ctx.beginPath();
        let x = Math.random() * width;
        let y = Math.random() * height;
        ctx.moveTo(x, y);
        
        for (let step = 0; step < 50; step++) {
            const angle = Math.sin(x * 0.01) * Math.cos(y * 0.01) * Math.PI;
            x += Math.cos(angle) * 10;
            y += Math.sin(angle) * 10;
            
            if (x < 0 || x > width || y < 0 || y > height) break;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    
    // 绘制箭头表示方向
    ctx.fillStyle = '#ea4335';
    for (let i = 2; i < 20; i += 3) {
        for (let j = 2; j < 15; j += 3) {
            const x = i * 40;
            const y = j * 30;
            const angle = Math.sin(x * 0.01) * Math.cos(y * 0.01) * Math.PI;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-5, -3);
            ctx.lineTo(-5, 3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}

// 3. 棉棒图
function showStemChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-chart-bar"></i> 棉棒图</h2>
        <p>棉棒图显示离散数据点的垂直线图，适合时间序列数据展示。</p>
        <div class="chart-container">
            <canvas id="stem-canvas" width="800" height="400"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('stem-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 数据
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const data = [45, 52, 48, 65, 72, 68, 85, 82, 78, 88, 92, 95];
    const padding = 60;
    const barWidth = (width - 2 * padding) / months.length;
    const maxValue = Math.max(...data);
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // 绘制棉棒图
    data.forEach((value, index) => {
        const x = padding + index * barWidth + barWidth / 2;
        const barHeight = (value / maxValue) * (height - 2 * padding);
        const y = height - padding - barHeight;
        
        // 绘制垂直线
        ctx.strokeStyle = '#4285f4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // 绘制数据点
        ctx.fillStyle = '#ea4335';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // 绘制水平线（棉棒头部）
        ctx.strokeStyle = '#4285f4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
        
        // 绘制月份标签
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(months[index], x, height - padding + 20);
        
        // 绘制数值标签
        ctx.fillText(value, x, y - 10);
    });
    
    // 绘制Y轴标签
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (maxValue / 5) * i;
        const y = height - padding - (value / maxValue) * (height - 2 * padding);
        ctx.fillText(Math.round(value), padding - 10, y + 5);
    }
}

// 4. 哑铃图
function showDumbbellChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-grip-lines"></i> 哑铃图</h2>
        <p>哑铃图用于比较两组数据之间的差异和变化。</p>
        <div class="chart-container">
            <canvas id="dumbbell-canvas" width="800" height="500"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('dumbbell-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 数据
    const categories = ['产品A', '产品B', '产品C', '产品D', '产品E', '产品F', '产品G', '产品H'];
    const beforeData = [65, 59, 80, 81, 56, 55, 70, 75];
    const afterData = [78, 72, 85, 92, 68, 65, 82, 88];
    const padding = 80;
    const barHeight = 40;
    const gap = (height - 2 * padding) / categories.length;
    const maxValue = 100;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    categories.forEach((category, index) => {
        const y = padding + index * gap + gap / 2;
        const beforeX = padding + (beforeData[index] / maxValue) * (width - 2 * padding);
        const afterX = padding + (afterData[index] / maxValue) * (width - 2 * padding);
        
        // 绘制连接线
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(beforeX, y);
        ctx.lineTo(afterX, y);
        ctx.stroke();
        
        // 绘制起始点
        ctx.fillStyle = '#4285f4';
        ctx.beginPath();
        ctx.arc(beforeX, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // 绘制结束点
        ctx.fillStyle = '#ea4335';
        ctx.beginPath();
        ctx.arc(afterX, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // 绘制类别标签
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(category, padding - 10, y + 5);
        
        // 绘制数值标签
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(beforeData[index], beforeX, y - 15);
        ctx.fillText(afterData[index], afterX, y - 15);
    });
    
    // 添加图例
    ctx.fillStyle = '#4285f4';
    ctx.beginPath();
    ctx.arc(width - 150, 30, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('改进前', width - 140, 35);
    
    ctx.fillStyle = '#ea4335';
    ctx.beginPath();
    ctx.arc(width - 150, 50, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.fillText('改进后', width - 140, 55);
}

// 5. 甘特图
function showGanttChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-tasks"></i> 甘特图</h2>
        <p>甘特图是项目管理和时间规划的可视化工具。</p>
        <div class="chart-container">
            <canvas id="gantt-canvas" width="900" height="400"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('gantt-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 项目数据
    const tasks = [
        { name: '需求分析', start: 0, duration: 3, color: '#4285f4' },
        { name: '系统设计', start: 2, duration: 4, color: '#ea4335' },
        { name: '前端开发', start: 4, duration: 6, color: '#fbbc04' },
        { name: '后端开发', start: 4, duration: 7, color: '#34a853' },
        { name: '测试阶段', start: 8, duration: 3, color: '#9c27b0' },
        { name: '部署上线', start: 10, duration: 2, color: '#ff5722' }
    ];
    
    const padding = 120;
    const barHeight = 30;
    const gap = 50;
    const dayWidth = (width - 2 * padding) / 14; // 14天的项目周期
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制网格线（日期）
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 14; i++) {
        const x = padding + i * dayWidth;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
        
        // 绘制日期标签
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`第${i}天`, x, height - padding + 15);
    }
    
    // 绘制任务条
    tasks.forEach((task, index) => {
        const y = padding + index * gap + 10;
        const x = padding + task.start * dayWidth;
        const barWidth = task.duration * dayWidth;
        
        // 绘制任务条
        ctx.fillStyle = task.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // 绘制任务名称
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(task.name, padding - 10, y + barHeight / 2 + 5);
        
        // 绘制持续时间
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${task.duration}天`, x + barWidth / 2, y + barHeight / 2 + 5);
    });
    
    // 添加标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('项目进度甘特图', width / 2, 30);
}

// 6. 人口金字塔图
function showPopulationChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-users"></i> 人口金字塔图</h2>
        <p>人口金字塔图展示人口年龄和性别结构的经典图表。</p>
        <div class="chart-container">
            <canvas id="population-canvas" width="800" height="500"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('population-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 人口数据
    const ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    const maleData = [120, 115, 110, 105, 95, 85, 70, 50];
    const femaleData = [110, 108, 105, 102, 92, 88, 75, 60];
    const maxValue = 120;
    const centerX = width / 2;
    const padding = 60;
    const barHeight = 40;
    const gap = (height - 2 * padding) / ageGroups.length;
    const maxBarWidth = (centerX - padding - 40);
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制中心线
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, padding);
    ctx.lineTo(centerX, height - padding);
    ctx.stroke();
    
    ageGroups.forEach((age, index) => {
        const y = padding + index * gap + gap / 2;
        
        // 绘制男性条形（左侧）
        const maleWidth = (maleData[index] / maxValue) * maxBarWidth;
        ctx.fillStyle = '#4285f4';
        ctx.fillRect(centerX - maleWidth - 2, y - barHeight / 2, maleWidth, barHeight);
        
        // 绘制女性条形（右侧）
        const femaleWidth = (femaleData[index] / maxValue) * maxBarWidth;
        ctx.fillStyle = '#ea4335';
        ctx.fillRect(centerX + 2, y - barHeight / 2, femaleWidth, barHeight);
        
        // 绘制年龄组标签
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(age, centerX, y + 5);
        
        // 绘制数值标签
        ctx.textAlign = 'right';
        ctx.fillText(maleData[index], centerX - maleWidth - 8, y + 5);
        ctx.textAlign = 'left';
        ctx.fillText(femaleData[index], centerX + femaleWidth + 8, y + 5);
    });
    
    // 添加图例
    ctx.fillStyle = '#4285f4';
    ctx.fillRect(centerX - 100, 20, 15, 15);
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('男性', centerX - 80, 32);
    
    ctx.fillStyle = '#ea4335';
    ctx.fillRect(centerX + 20, 20, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText('女性', centerX + 40, 32);
}

// 7. 漏斗图
function showFunnelChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-filter"></i> 漏斗图</h2>
        <p>漏斗图用于展示流程转化率和用户流失分析。</p>
        <div class="chart-container">
            <canvas id="funnel-canvas" width="600" height="400"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('funnel-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 漏斗数据
    const stages = [
        { name: '访问网站', value: 1000, color: '#4285f4' },
        { name: '浏览产品', value: 500, color: '#34a853' },
        { name: '加入购物车', value: 300, color: '#fbbc04' },
        { name: '提交订单', value: 200, color: '#ff9800' },
        { name: '完成支付', value: 150, color: '#ea4335' }
    ];
    
    const padding = 40;
    const stageHeight = (height - 2 * padding) / stages.length;
    const maxValue = stages[0].value;
    const centerX = width / 2;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    stages.forEach((stage, index) => {
        const y = padding + index * stageHeight;
        const topWidth = (index > 0) ? (stages[index - 1].value / maxValue) * (width - 2 * padding) : (width - 2 * padding);
        const bottomWidth = (stage.value / maxValue) * (width - 2 * padding);
        const topX = centerX - topWidth / 2;
        const bottomX = centerX - bottomWidth / 2;
        
        // 绘制梯形
        ctx.fillStyle = stage.color;
        ctx.beginPath();
        ctx.moveTo(topX, y);
        ctx.lineTo(topX + topWidth, y);
        ctx.lineTo(bottomX + bottomWidth, y + stageHeight);
        ctx.lineTo(bottomX, y + stageHeight);
        ctx.closePath();
        ctx.fill();
        
        // 绘制边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 绘制文字
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(stage.name, centerX, y + stageHeight / 2 - 5);
        ctx.font = '12px Arial';
        ctx.fillText(`${stage.value}人 (${Math.round(stage.value / maxValue * 100)}%)`, centerX, y + stageHeight / 2 + 15);
    });
}

// 8. 桑基图
function showSankeyChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-exchange-alt"></i> 桑基图</h2>
        <p>桑基图显示流量和能量流向的关系图。</p>
        <div class="chart-container">
            <canvas id="sankey-canvas" width="800" height="400"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('sankey-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 桑基数据
    const nodes = [
        { name: '收入', x: 100, value: 1000 },
        { name: '工资', x: 100, y: 80, value: 800 },
        { name: '投资', x: 100, y: 180, value: 200 },
        { name: '支出', x: 700, value: 1000 },
        { name: '生活', x: 700, y: 80, value: 400 },
        { name: '房贷', x: 700, y: 140, value: 300 },
        { name: '储蓄', x: 700, y: 200, value: 300 }
    ];
    
    const links = [
        { source: 1, target: 4, value: 300 },
        { source: 1, target: 5, value: 300 },
        { source: 1, target: 6, value: 200 },
        { source: 2, target: 4, value: 100 },
        { source: 2, target: 6, value: 100 }
    ];
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制节点
    nodes.forEach((node, index) => {
        if (index === 0 || index === 3) return; // 跳过主节点
        
        const nodeHeight = (node.value / 1000) * 200;
        const nodeY = node.y || 100 + index * 60;
        
        // 绘制节点矩形
        ctx.fillStyle = '#4285f4';
        ctx.fillRect(node.x - 20, nodeY - nodeHeight / 2, 40, nodeHeight);
        
        // 绘制节点标签
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, nodeY - nodeHeight / 2 - 10);
        ctx.fillText(node.value, node.x, nodeY);
    });
    
    // 绘制流
    links.forEach((link, index) => {
        const sourceNode = nodes[link.source];
        const targetNode = nodes[link.target];
        const linkHeight = (link.value / 1000) * 80;
        
        const colors = ['#4285f4', '#ea4335', '#34a853', '#fbbc04', '#ff9800'];
        
        // 绘制贝塞尔曲线表示流
        ctx.strokeStyle = colors[index % colors.length];
        ctx.lineWidth = linkHeight;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(sourceNode.x + 20, sourceNode.y);
        
        const cp1x = width / 3;
        const cp1y = sourceNode.y;
        const cp2x = 2 * width / 3;
        const cp2y = targetNode.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, targetNode.x - 20, targetNode.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
    });
    
    // 添加标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('收支流向桑基图', width / 2, 30);
}

// 9. 树状图
function showTreeChart(container) {
    container.innerHTML = `
        <h2 class="section-title"><i class="fas fa-sitemap"></i> 树状图</h2>
        <p>树状图展示层次结构和聚类分析结果。</p>
        <div class="chart-container">
            <canvas id="tree-canvas" width="800" height="500"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('tree-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 树结构数据
    const treeData = {
        name: '根节点',
        x: width / 2,
        y: 50,
        children: [
            {
                name: '分支A',
                x: width / 4,
                y: 150,
                children: [
                    { name: 'A1', x: width / 8, y: 250 },
                    { name: 'A2', x: width * 3 / 8, y: 250 }
                ]
            },
            {
                name: '分支B',
                x: width / 2,
                y: 150,
                children: [
                    { name: 'B1', x: width * 3 / 8, y: 250 },
                    { name: 'B2', x: width * 5 / 8, y: 250 }
                ]
            },
            {
                name: '分支C',
                x: width * 3 / 4,
                y: 150,
                children: [
                    { name: 'C1', x: width * 5 / 8, y: 250 },
                    { name: 'C2', x: width * 7 / 8, y: 250 }
                ]
            }
        ]
    };
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 递归绘制树
    function drawNode(node, parentNode = null) {
        // 绘制节点
        ctx.fillStyle = '#4285f4';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        // 绘制节点标签
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + 30);
        
        // 绘制连线
        if (parentNode) {
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(parentNode.x, parentNode.y + 15);
            ctx.lineTo(node.x, node.y - 15);
            ctx.stroke();
        }
        
        // 递归绘制子节点
        if (node.children) {
            node.children.forEach(child => drawNode(child, node));
        }
    }
    
    drawNode(treeData);
    
    // 添加层次标注
    ctx.fillStyle = '#666';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('第0层', 20, 55);
    ctx.fillText('第1层', 20, 155);
    ctx.fillText('第2层', 20, 255);
}

// 初始化页面
window.onload = function() {
    // 初始化预览图
    initializePreviews();
};

function initializePreviews() {
    // 为每个预览容器添加简单的预览图
    const previews = ['contour', 'streamline', 'stem', 'dumbbell', 'gantt', 'population', 'funnel', 'sankey', 'tree'];
    
    previews.forEach(type => {
        const container = document.getElementById(`${type}-preview`);
        if (container) {
            container.innerHTML = `<i class="fas fa-chart-${type === 'contour' ? 'area' : 'line'} fa-3x text-muted"></i>`;
        }
    });
}