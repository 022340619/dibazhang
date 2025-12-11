// 全局图表变量
let temperatureChart, trigonometryChart, basicLineChart, scatterChart, barChart;

// 温度数据 (来自notebook)
const temperatureData = {
    labels: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    maxTemp: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
    minTemp: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16]
};

// 三角函数数据
const trigonometryData = {
    labels: [],
    sinData: [],
    cosData: []
};

// 生成三角函数数据
for (let i = 0; i <= 360; i += 10) {
    const radians = (i * Math.PI) / 180;
    trigonometryData.labels.push(i);
    trigonometryData.sinData.push(Math.sin(radians));
    trigonometryData.cosData.push(Math.cos(radians));
}

// 图表默认配置
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: {
                    size: 12,
                    family: "'Microsoft YaHei', sans-serif"
                },
                usePointStyle: true,
                padding: 20
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
                size: 14
            },
            bodyFont: {
                size: 12
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: true
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x',
            },
            pan: {
                enabled: true,
                mode: 'x',
            }
        }
    }
};

// 初始化温度走势图
function initTemperatureChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: temperatureData.labels.map(day => `${day}日`),
            datasets: [
                {
                    label: '最高温度',
                    data: temperatureData.maxTemp,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#ff6b6b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.3
                },
                {
                    label: '最低温度',
                    data: temperatureData.minTemp,
                    borderColor: '#4dabf7',
                    backgroundColor: 'rgba(77, 171, 247, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#4dabf7',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                title: {
                    display: true,
                    text: '未来15天温度走势',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                    title: {
                        display: true,
                        text: '温度 (°C)',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '日期',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// 初始化三角函数图
function initTrigonometryChart() {
    const ctx = document.getElementById('trigonometryChart').getContext('2d');
    trigonometryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trigonometryData.labels,
            datasets: [
                {
                    label: 'sin(x)',
                    data: trigonometryData.sinData,
                    borderColor: '#51cf66',
                    backgroundColor: 'rgba(81, 207, 102, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    tension: 0.4
                },
                {
                    label: 'cos(x)',
                    data: trigonometryData.cosData,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    tension: 0.4
                }
            ]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                title: {
                    display: true,
                    text: '三角函数对比图 (0° - 360°)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: -1.5,
                    max: 1.5,
                    title: {
                        display: true,
                        text: '函数值',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '角度 (度)',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// 初始化基础折线图
function initBasicLineChart() {
    const ctx = document.getElementById('basicLineChart').getContext('2d');
    basicLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '销售额',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    display: false
                },
                zoom: {
                    zoom: { enabled: false },
                    pan: { enabled: false }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 初始化散点图
function initScatterChart() {
    const ctx = document.getElementById('scatterChart').getContext('2d');
    const scatterData = [];
    for (let i = 0; i < 20; i++) {
        scatterData.push({
            x: Math.random() * 100,
            y: Math.random() * 100
        });
    }

    scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '数据点',
                data: scatterData,
                backgroundColor: '#764ba2',
                borderColor: '#fff',
                borderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    display: false
                },
                zoom: {
                    zoom: { enabled: false },
                    pan: { enabled: false }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// 初始化柱状图
function initBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
            datasets: [{
                label: '销量',
                data: [65, 59, 80, 81, 56],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    display: false
                },
                zoom: {
                    zoom: { enabled: false },
                    pan: { enabled: false }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 切换温度数据集显示
function toggleTemperatureDataset(type) {
    const datasetIndex = type === 'max' ? 0 : 1;
    const dataset = temperatureChart.data.datasets[datasetIndex];
    dataset.hidden = !dataset.hidden;
    temperatureChart.update();
}

// 切换三角函数数据集显示
function toggleTrigonometryDataset(type) {
    const datasetIndex = type === 'sin' ? 0 : 1;
    const dataset = trigonometryChart.data.datasets[datasetIndex];
    dataset.hidden = !dataset.hidden;
    trigonometryChart.update();
}

// 重置缩放
function resetZoom(chartId) {
    const chart = chartId === 'temperatureChart' ? temperatureChart : trigonometryChart;
    if (chart && chart.resetZoom) {
        chart.resetZoom();
    }
}

// 填充数据表格
function populateDataTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    temperatureData.labels.forEach((day, index) => {
        const row = document.createElement('tr');
        const maxTemp = temperatureData.maxTemp[index];
        const minTemp = temperatureData.minTemp[index];
        const diff = maxTemp - minTemp;

        row.innerHTML = `
            <td>${day}日</td>
            <td class="temp-high">${maxTemp}°C</td>
            <td class="temp-low">${minTemp}°C</td>
            <td>${diff}°C</td>
        `;
        tableBody.appendChild(row);
    });
}

// 页面加载完成后初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有图表
    initTemperatureChart();
    initTrigonometryChart();
    initBasicLineChart();
    initScatterChart();
    initBarChart();

    // 填充数据表格
    populateDataTable();

    // 添加页面加载动画
    document.querySelectorAll('.chart-section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // 添加窗口调整大小时的图表重绘
    window.addEventListener('resize', function() {
        temperatureChart.resize();
        trigonometryChart.resize();
        basicLineChart.resize();
        scatterChart.resize();
        barChart.resize();
    });
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(event) {
    // ESC键重置所有缩放
    if (event.key === 'Escape') {
        resetZoom('temperatureChart');
        resetZoom('trigonometryChart');
    }
    
    // 数字键1-5快速切换到对应图表
    const chartMap = {
        '1': 'temperatureChart',
        '2': 'trigonometryChart',
        '3': 'basicLineChart',
        '4': 'scatterChart',
        '5': 'barChart'
    };
    
    if (chartMap[event.key]) {
        const chartElements = {
            'temperatureChart': document.querySelector('.chart-section:nth-child(1)'),
            'trigonometryChart': document.querySelector('.chart-section:nth-child(2)'),
            'basicLineChart': document.querySelector('.example-card:nth-child(1)'),
            'scatterChart': document.querySelector('.example-card:nth-child(2)'),
            'barChart': document.querySelector('.example-card:nth-child(3)')
        };
        
        const targetElement = chartElements[chartMap[event.key]];
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// 导出图表为图片功能
function exportChart(chart, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = chart.toBase64Image();
    link.click();
}

// 为所有图表添加右键导出功能
document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'CANVAS') {
        event.preventDefault();
        
        const canvasId = event.target.id;
        const chartMap = {
            'temperatureChart': temperatureChart,
            'trigonometryChart': trigonometryChart,
            'basicLineChart': basicLineChart,
            'scatterChart': scatterChart,
            'barChart': barChart
        };
        
        if (chartMap[canvasId]) {
            exportChart(chartMap[canvasId], `${canvasId}_${Date.now()}.png`);
        }
    }
});