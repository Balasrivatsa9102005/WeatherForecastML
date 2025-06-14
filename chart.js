document.addEventListener('DOMContentLoaded', () => {
    const charElement = document.getElementById('chart');
    if (!charElement) {
        console.error('Canvas Element not found');
        return;
    }

    const ctx = charElement.getContext('2d');

    
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, 'rgba(250, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(136, 255, 0, 1)');

    
    const forecastItems = document.querySelectorAll('.forecast-item');

    const temps = [];
    const times = [];

    forecastItems.forEach(item => {
        const timeText = item.querySelector('.forecast-time')?.textContent?.trim();
        const tempText = item.querySelector('.forecast-temperature')?.textContent?.trim();

        if (timeText && tempText) {
            
            const numericTemp = parseFloat(tempText.replace(/[^\d.-]/g, ''));
            if (!isNaN(numericTemp)) {
                times.push(timeText);
                temps.push(numericTemp);
            }
        }
    });

    if (times.length === 0 || temps.length === 0) {
        console.warn("No valid forecast data found for chart.");
        return;
    }

   
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                fill: true,
                backgroundColor: gradient,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                tension: 0.4,
                pointBackgroundColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
});
