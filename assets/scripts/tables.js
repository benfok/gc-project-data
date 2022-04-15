const listData = async (resort, data, statusObject) => {
    
    // console.log(data);

        document.getElementById(`${resort}-hdr`).textContent += ` [${data.data.length} Pages]`;
        // located the table body element and clear it
        const tableBody = document.getElementById(`${resort}-data`);
        tableBody.innerHTML = '';

        // console.log(tableBody);
        
        let done = ['Done', 0, 0, 0, 0, 0];
        let inProgress = ['In Progress', 0, 0, 0, 0, 0];
        let notStarted = ['Not Started', 0, 0, 0, 0, 0];
        let other = ['Other', 0, 0, 0, 0, 0];

        // On Track, 2wks Out, 1wk Out, Overdue, Undefined
        let chartArray = [0, 0, 0, 0, 0]

        const twoWeeks = 1000*60*60*24*14;
        const oneWeek = 1000*60*60*24*7;

        // loop through the data array and create td items that store the info
        const dataLoop = (data) => {
            for (let i = 0; i < data.data.length; i++) {
            
            const statusId = data.data[i].status_id;
            let dueDate = null;
            let categorized = false;

            // set the due date if it exists otherwise leave null
            data.data[i].next_due_at ? dueDate = data.data[i].next_due_at.slice(0, 10) : dueDate = null;

            // Not Started items
            if (statusObject[statusId].chartCat === 'notStarted') {
                notStarted[1]++;
                categorized = true;
                if (dueDate) {
                    const timeLeft = new Date(dueDate).getTime() - new Date();
                    if (timeLeft < 0) {
                        notStarted[5]++;
                        chartArray[3]++;
                    } else if (timeLeft <= oneWeek) {
                            notStarted[4]++;
                            chartArray[2]++;
                        } else if (timeLeft <= twoWeeks) {
                                notStarted[3]++;
                                chartArray[1]++
                            } else { notStarted[2]++; chartArray[0]++;}
                }
            };

            // In Progress items
            if (statusObject[statusId].chartCat === 'inProgress') {
                inProgress[1]++;
                categorized = true;
                if (dueDate) {
                    const timeLeft = new Date(dueDate).getTime() - new Date();
                    if (timeLeft < 0) {
                        inProgress[5]++;
                        chartArray[3]++;
                    } else if (timeLeft <= oneWeek) {
                            inProgress[4]++;
                            chartArray[2]++;
                            } else if (timeLeft <= twoWeeks) {
                                inProgress[3]++;
                                chartArray[1]++;
                            } else { inProgress[2]++; chartArray[0]++;}
                }
            };

            // Done items
            if (statusObject[statusId].chartCat === 'done') {
                done[1]++;
                chartArray[0]++;
                categorized = true;
            };

            // Other items
            if (!categorized) { other[1]++; chartArray[4]++; };           
                
            // Details Table
            // create the table row
            const tableRow = document.createElement('tr');
            tableBody.insertAdjacentElement('beforeend', tableRow);
            
            const td1 = document.createElement('td');
            td1.textContent = data.data[i].name;
            
            const td2 = document.createElement('td');
            td2.textContent = data.data[i].status_name;
            
            const td3 = document.createElement('td');
            dueDate ? td3.textContent = dueDate.slice(0, 10) : td3.textContent = '';

            const td4 = document.createElement('td');
            data.data[i].updated_at ? td4.textContent = data.data[i].updated_at.slice(0, 10) : td4.textContent = '';
   
            // render td items to the table
            tableRow.insertAdjacentElement('beforeend', td1);
            tableRow.insertAdjacentElement('beforeend', td2);
            tableRow.insertAdjacentElement('beforeend', td3);
            tableRow.insertAdjacentElement('beforeend', td4);

            console.log('chart', chartArray);
            }
        }

        const runLoops = async (data) => {
            await dataLoop(data);
            
            const statusArray = [];
            statusArray.push(done, inProgress, notStarted, other)

            // console.log(statusArray);
            // locate the table body element and clear it
            const tableBody = document.getElementById(`${resort}-summary`);
            tableBody.innerHTML = '';

            for (let i = 0; i < statusArray.length; i++) {
                
                // Summary Table
                // create the table row
                const tableRow = document.createElement('tr');
                tableBody.insertAdjacentElement('beforeend', tableRow);
                
                const td1 = document.createElement('td');
                td1.textContent = statusArray[i][0];

                const td2 = document.createElement('td');
                td2.textContent = statusArray[i][1];
                
                const td3 = document.createElement('td');
                td3.textContent = statusArray[i][2];

                const td4 = document.createElement('td');
                td4.textContent = statusArray[i][3];

                const td5 = document.createElement('td');
                td5.textContent = statusArray[i][4];
                
                const td6 = document.createElement('td');
                td6.textContent = statusArray[i][5];
    
                // render td items to the table
                tableRow.insertAdjacentElement('beforeend', td1);
                tableRow.insertAdjacentElement('beforeend', td2);
                tableRow.insertAdjacentElement('beforeend', td3);
                tableRow.insertAdjacentElement('beforeend', td4);
                tableRow.insertAdjacentElement('beforeend', td5);
                tableRow.insertAdjacentElement('beforeend', td6);
            } 

        } 

        await runLoops(data)
        return { resort, chartArray }
}
