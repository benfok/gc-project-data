
const createChart = (resort, array) => {
    console.log(array);

    const labels = [
        'On Track', '2wks Out', '1wk Out', 'Overdue', 'Undefined'
        ];
        
        const data = {
        labels: labels,
        datasets: [{
            label: resort,
            data: array,
            backgroundColor: [
                'rgb(125,209,129)',
                'rgb(246,232,142)',
                'rgb(249,127,57)',
                'rgb(255, 99, 132)',
                'rgb(219,217,210)'
            ],
            borderColor: [
                'rgb(75,127,82)',
                'rgb(237,209,29)',
                'rgb(241,115,0)',
                'rgb(255, 99, 132)',
                'rgb(203,210,208)'
            ],
            borderWidth: 1,
        }]
        };
        
        const config = {
            type: 'bar',
            data: data,
            options: {
                // responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
            }
            };
    
    
    
    new Chart(
    document.getElementById(`${resort}-chart`),
    config
)};
