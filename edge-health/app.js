// 初始化数据
const chartData = [7000, 8000, 9000, 8500, 9200, 6300, 7200];
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 创建柱状图
function createChart() {
    const chart = document.getElementById('chart');
    chart.innerHTML = ''; // 清空内容
    
    // 计算最大值用于确定柱状图高度
    const max = Math.max(...chartData);
    
    // 创建每个柱子
    chartData.forEach((value, index) => {
        const barContainer = document.createElement('div');
        barContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            width: ${100 / chartData.length}%;
            height: 100%;
        `;
        
        // 柱状图柱子
        const bar = document.createElement('div');
        const heightPercentage = (value / max) * 100;
        bar.style.cssText = `
            height: ${heightPercentage}%;
            background: linear-gradient(to top, #18a058, #4caf50);
            width: 60%;
            min-width: 40px;
            border-radius: 8px 8px 0 0;
            transition: height 0.5s ease;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        
        // 数值标签
        const valueLabel = document.createElement('div');
        valueLabel.textContent = value.toLocaleString();
        valueLabel.style.cssText = `
            font-weight: bold;
            color: #333;
            font-size: 16px;
            margin-bottom: 5px;
        `;
        
        // 日期标签
        const dayLabel = document.createElement('div');
        dayLabel.textContent = days[index];
        dayLabel.style.cssText = `
            color: #666;
            font-size: 14px;
        `;
        
        barContainer.appendChild(bar);
        barContainer.appendChild(valueLabel);
        barContainer.appendChild(dayLabel);
        chart.appendChild(barContainer);
    });
}

// 更新步数
function updateSteps() {
    const stepsElement = document.querySelector('.number');
    const currentSteps = parseInt(stepsElement.textContent.replace(',', ''));
    
    // 模拟步数增加
    const newSteps = currentSteps + Math.floor(Math.random() * 20) + 10;
    stepsElement.textContent = newSteps.toLocaleString();
    
    // 更新进度条
    const progressBar = document.querySelector('.progress');
    const percentage = Math.min(100, (newSteps / 10000) * 100);
    progressBar.style.width = percentage + '%';
    
    // 更新图表中的最新数据（周日）
    chartData[6] = newSteps;
    
    // 重新绘制图表
    createChart();
    
    // 更新页面标题显示最新步数
    document.title = `健康管理助手 | ${newSteps.toLocaleString()}步`;
}

// 模拟卡路里和睡眠数据更新
function updateOtherData() {
    const calorieElement = document.querySelectorAll('.number')[1];
    const sleepElement = document.querySelectorAll('.number')[2];
    
    // 模拟卡路里变化
    const currentCalories = parseInt(calorieElement.textContent);
    const newCalories = Math.max(300, currentCalories + Math.floor(Math.random() * 20) - 10);
    calorieElement.textContent = newCalories + ' kcal';
    
    // 模拟睡眠时长变化
    const currentSleep = parseFloat(sleepElement.textContent);
    const newSleep = Math.max(6, Math.min(9, currentSleep + (Math.random() * 0.2 - 0.1)));
    sleepElement.textContent = newSleep.toFixed(1) + ' 小时';
}

// 添加一些动画效果
function addAnimations() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.style.animation = 'pulse 2s infinite';
    });
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .progress {
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}

// 添加点击事件
function addInteractions() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('健康管理助手已启动');
    
    // 初始化图表
    createChart();
    
    // 添加动画
    addAnimations();
    
    // 添加交互
    addInteractions();
    
    // 定时更新步数（每3秒）
    setInterval(updateSteps, 3000);
    
    // 定时更新其他数据（每5秒）
    setInterval(updateOtherData, 5000);
    
    // 添加图表鼠标悬停效果
    const chart = document.getElementById('chart');
    chart.addEventListener('mouseover', function(e) {
        if (e.target.parentElement && e.target.parentElement.style.background) {
            e.target.parentElement.style.background = 'linear-gradient(to top, #1db954, #5acf7f)';
        }
    });
    
    chart.addEventListener('mouseout', function(e) {
        if (e.target.parentElement) {
            e.target.parentElement.style.background = 'linear-gradient(to top, #18a058, #4caf50)';
        }
    });
});