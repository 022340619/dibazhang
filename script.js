// 风速数据
const windData = {
    dates: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
    windSpeed: [7, 9, 11, 14, 8, 15, 22, 11, 10, 11, 11, 13, 8]
};

// 图表实例
let windChart, trigChart, barChart, radarChart;

// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    initWindChart();
    initTrigChart();
    initComparisonCharts();
});

// 初始化风速图表
function initWindChart() {
    const ctx = document.getElementById('windChart').getContext('2d');
    windChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: windData.dates,
            datasets: [{
                label: '平均风速 (km/h)',
                data: windData.windSpeed,
                borderColor: 'rgb(255, 153, 0)',
                backgroundColor: 'rgba(255, 153, 0, 0.1)',
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#FF9900',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#FF9900',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: '风速 (km/h)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: '时间'
                    }
                }
            }
        }
    });
}

// 初始化三角函数图表
function initTrigChart() {
    const ctx = document.getElementById('trigChart').getContext('2d');
    const xValues = generateXValues(-2 * Math.PI, 2 * Math.PI, 100);
    
    trigChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues.map(x => x.toFixed(2)),
            datasets: [{
                label: 'sin(x)',
                data: xValues.map(x => Math.sin(x)),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                tension: 0,
                pointRadius: 0,
                borderWidth: 2
            }, {
                label: 'cos(x)',
                data: xValues.map(x => Math.cos(x)),
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.1)',
                tension: 0,
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: -1.5,
                    max: 1.5,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        stepSize: 0.5
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        maxTicksLimit: 10,
                        callback: function(value, index, values) {
                            const piSymbols = ['-2π', '-3π/2', '-π', '-π/2', '0', 'π/2', 'π', '3π/2', '2π'];
                            const piValues = [-2*Math.PI, -1.5*Math.PI, -Math.PI, -0.5*Math.PI, 0, 0.5*Math.PI, Math.PI, 1.5*Math.PI, 2*Math.PI];
                            const closestIndex = piValues.findIndex(val => Math.abs(val - parseFloat(this.getLabelForValue(value))) < 0.3);
                            return closestIndex !== -1 ? piSymbols[closestIndex] : '';
                        }
                    }
                }
            }
        }
    });
}

// 初始化对比图表
function initComparisonCharts() {
    // 柱状图
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['早晨', '上午', '中午', '下午', '傍晚', '夜间'],
            datasets: [{
                label: '平均温度 (°C)',
                data: [18, 22, 28, 26, 23, 19],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: '平均湿度 (%)',
                data: [75, 68, 55, 58, 65, 72],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '温度与湿度对比'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 雷达图
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['风速', '温度', '湿度', '气压', '能见度', '空气质量'],
            datasets: [{
                label: '今日数据',
                data: [65, 75, 70, 80, 60, 55],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
                label: '昨日数据',
                data: [55, 70, 65, 75, 70, 60],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '多维度天气指标对比'
                }
            }
        }
    });
}

// 生成X轴数值
function generateXValues(start, end, count) {
    const values = [];
    const step = (end - start) / (count - 1);
    for (let i = 0; i < count; i++) {
        values.push(start + i * step);
    }
    return values;
}

// 更新风速图表
function updateWindChart() {
    const unit = document.getElementById('windSpeedUnit').value;
    const interval = parseInt(document.getElementById('timeInterval').value);
    const showGrid = document.getElementById('showGrid').checked;
    const showAnimation = document.getElementById('showAnimation').checked;
    
    let convertedData = [...windData.windSpeed];
    let unitLabel = 'km/h';
    
    // 单位转换
    if (unit === 'ms') {
        convertedData = windData.windSpeed.map(speed => (speed * 1000 / 3600).toFixed(1));
        unitLabel = 'm/s';
    } else if (unit === 'mph') {
        convertedData = windData.windSpeed.map(speed => (speed * 0.621371).toFixed(1));
        unitLabel = 'mph';
    }
    
    // 时间间隔过滤
    let filteredLabels = [...windData.dates];
    let filteredData = [...convertedData];
    if (interval > 2) {
        filteredLabels = [];
        filteredData = [];
        for (let i = 0; i < windData.dates.length; i += interval / 2) {
            filteredLabels.push(windData.dates[i]);
            filteredData.push(convertedData[i]);
        }
    }
    
    // 更新图表
    windChart.data.labels = filteredLabels;
    windChart.data.datasets[0].data = filteredData;
    windChart.data.datasets[0].label = `平均风速 (${unitLabel})`;
    windChart.options.scales.y.title.text = `风速 (${unitLabel})`;
    windChart.options.scales.x.grid.display = showGrid;
    windChart.options.scales.y.grid.display = showGrid;
    windChart.options.animation.duration = showAnimation ? 2000 : 0;
    
    windChart.update();
}

// 更新三角函数图表
function updateTrigChart() {
    const xRange = parseInt(document.getElementById('xRange').value);
    const showSin = document.getElementById('showSin').checked;
    const showCos = document.getElementById('showCos').checked;
    const lineStyle = document.getElementById('lineStyle').value;
    
    const range = xRange * Math.PI;
    const xValues = generateXValues(-range, range, 100);
    
    const datasets = [];
    
    if (showSin) {
        datasets.push({
            label: 'sin(x)',
            data: xValues.map(x => Math.sin(x)),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0,
            pointRadius: 0,
            borderWidth: 2,
            borderDash: lineStyle === 'dashed' ? [5, 5] : lineStyle === 'dotted' ? [2, 2] : []
        });
    }
    
    if (showCos) {
        datasets.push({
            label: 'cos(x)',
            data: xValues.map(x => Math.cos(x)),
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: 'rgba(153, 102, 255, 0.1)',
            tension: 0,
            pointRadius: 0,
            borderWidth: 2,
            borderDash: lineStyle === 'dashed' ? [5, 5] : lineStyle === 'dotted' ? [2, 2] : []
        });
    }
    
    trigChart.data.labels = xValues.map(x => x.toFixed(2));
    trigChart.data.datasets = datasets;
    trigChart.update();
}

// 重置三角函数图表
function resetTrigChart() {
    document.getElementById('xRange').value = '2';
    document.getElementById('showSin').checked = true;
    document.getElementById('showCos').checked = true;
    document.getElementById('lineStyle').value = 'solid';
    initTrigChart();
}

// 生成随机数据
function generateRandomData() {
    // 更新柱状图
    barChart.data.datasets[0].data = Array.from({length: 6}, () => Math.floor(Math.random() * 20) + 15);
    barChart.data.datasets[1].data = Array.from({length: 6}, () => Math.floor(Math.random() * 30) + 50);
    barChart.update();
    
    // 更新雷达图
    radarChart.data.datasets[0].data = Array.from({length: 6}, () => Math.floor(Math.random() * 40) + 40);
    radarChart.data.datasets[1].data = Array.from({length: 6}, () => Math.floor(Math.random() * 40) + 40);
    radarChart.update();
}

// 动画播放
function animateComparison() {
    let step = 0;
    const steps = 20;
    const originalData = {
        bar: [
            [...barChart.data.datasets[0].data],
            [...barChart.data.datasets[1].data]
        ],
        radar: [
            [...radarChart.data.datasets[0].data],
            [...radarChart.data.datasets[1].data]
        ]
    };
    
    // 设置为0
    barChart.data.datasets.forEach(dataset => dataset.data = dataset.data.map(() => 0));
    radarChart.data.datasets.forEach(dataset => dataset.data = dataset.data.map(() => 0));
    
    const animation = setInterval(() => {
        step++;
        const progress = step / steps;
        
        barChart.data.datasets[0].data = originalData.bar[0].map(val => val * progress);
        barChart.data.datasets[1].data = originalData.bar[1].map(val => val * progress);
        radarChart.data.datasets[0].data = originalData.radar[0].map(val => val * progress);
        radarChart.data.datasets[1].data = originalData.radar[1].map(val => val * progress);
        
        barChart.update('none');
        radarChart.update('none');
        
        if (step >= steps) {
            clearInterval(animation);
        }
    }, 50);
}

// 导出风速数据
function exportWindData() {
    const data = {
        dates: windData.dates,
        windSpeed: windData.windSpeed,
        unit: document.getElementById('windSpeedUnit').value,
        exportTime: new Date().toLocaleString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wind_data.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// 导出所有图表
function exportAllCharts() {
    // 创建一个包含所有图表数据的对象
    const allData = {
        windData: windData,
        barChart: barChart.data,
        radarChart: radarChart.data,
        exportTime: new Date().toLocaleString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'all_charts_data.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('wind-tab').click();
                break;
            case '2':
                e.preventDefault();
                document.getElementById('trig-tab').click();
                break;
            case '3':
                e.preventDefault();
                document.getElementById('comparison-tab').click();
                break;
            case 'r':
                e.preventDefault();
                generateRandomData();
                break;
        }
    }
});

// 添加响应式处理
window.addEventListener('resize', function() {
    if (windChart) windChart.resize();
    if (trigChart) trigChart.resize();
    if (barChart) barChart.resize();
    if (radarChart) radarChart.resize();
});