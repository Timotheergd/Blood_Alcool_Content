var drinks = []; // { drinkTime, volume, alcohol }
var biologicalSex = "Men";
var weight = 60;
var height = 1.70;

// Globals consts
const legalLimit = 0.5; // Legal limit in BAC (0.5g/L)
const interval = parseDHMS(0,0,30,0); // Time interval
// chart lenght in time
const chartLength = parseDHMS(1, 0, 0, 0);

// Set all calendar date to current date on load
window.addEventListener('load', () => {
    // Set current date/time in the drink form
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    /* remove second/millisecond if needed - credit ref. https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time#comment112871765_60884408 */
    now.setMilliseconds(null);
    now.setSeconds(null);

    document.getElementById("drinkTime").value = now.toISOString().slice(0, -1);
    
    // Load saved data from cookies
    loadDataFromCookies();
    
    sortDrinkDiv();

    // Initialize the chart after loading data
    updateChart();
    
    // Add reset button event listener
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Clear data from cookies
            clearSavedData();
            
            // Clear drinks array and UI
            drinks = [];
            document.getElementById('list').innerHTML = '';
            
            // Reset form to defaults
            document.getElementById('gender').value = 'Men';
            document.getElementById('weight').value = 60;
            document.getElementById('height').value = 1.70;
            
            // Reset global variables
            biologicalSex = 'Men';
            weight = 60;
            height = 1.70;
            
            // Update chart
            updateChart();
        });
    }
});