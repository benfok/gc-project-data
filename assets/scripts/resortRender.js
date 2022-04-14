
const resortHtml = (resort) => {

    const name = resort.toLowerCase();
    const mainSection = document.getElementById('resorts');

    // create the section
    const resortSection = document.createElement('section');
    resortSection.id = `${resort.toLowerCase()}`;
    mainSection.insertAdjacentElement('beforeend', resortSection);

    resortSection.innerHTML = `<h2 id="${name}-hdr">${resort}</h2>
    <div class="summary-container">
       <table class="table-summary">
            <thead>
                <th>Status</th>
                <th>Total</th>
                <th>On Track</th>
                <th>2wks Out</th>
                <th>1wk Out</th>
                <th>Overdue</th>
            </thead>
            <tbody id="${name}-summary">
            </tbody>
        </table>
        <div class="chart-container">
            <canvas id="${name}-chart"></canvas>
        </div>
    </div>
        <button type="button" class="show-details-btn" data-divid="${name}-details" onclick="detailBtns(event)">Show Details</button>
    <div id="${name}-details" class="hidden">
    <table class="table-details">
        <thead>
            <th>Page Name</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Last Update</th>
        </thead>
        <tbody id="${name}-data">
        </tbody>
    </table>
    </div>`;

}

const detailBtns = (event) => {    
    const dataset = event.target.dataset.divid;
            const targetDiv = document.getElementById(dataset);
            targetDiv.classList.toggle("hidden");
            if (!targetDiv.className) {
                event.target.innerText = 'Hide Details'
            } else {
                event.target.innerText = 'Show Details'
            }
}

// const detailBtns = () => {
//     document.querySelectorAll('.show-details-btn').forEach(function(btn) {
//         btn.addEventListener('click', function(event) {
//             const dataset = event.target.dataset.divid;
//             const targetDiv = document.getElementById(dataset);
//             targetDiv.classList.toggle("hidden");
//             if (!targetDiv.className) {
//                 btn.innerText = 'Hide Details'
//             } else {
//                 btn.innerText = 'Show Details'
//             }
//         })
//     })
// }