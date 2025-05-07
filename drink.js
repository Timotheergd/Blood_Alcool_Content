var listIndex = 0;

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4], b[5], b[6]));
}

// Function to add a drink
function addDrink(event) {
    event.preventDefault();
    const drinkTime = new Date(document.getElementById('drinkTime').value);
    const volume = parseInt(document.getElementById('volume').value);
    const alcohol = parseFloat(document.getElementById('alcohol').value);

    const newDrink = { drinkTime, volume, alcohol };
    drinks.push(newDrink);

    // Display the added drink in the list
    const drinkList = document.getElementById('list');
    
    const drinkDiv = document.createElement('div');
    drinkDiv.setAttribute("id", "drinknumber_"+listIndex.toString());
    drinkDiv.setAttribute("class", "drinkDiv");
    const drink_infos = document.createElement('p');
    drink_infos.textContent = `Drink at ${drinkTime.getHours()}:${drinkTime.getMinutes().toString().padStart(2, '0')} - Volume: ${volume} mL, Alcohol: ${alcohol}%`;
    
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute("class", "noselect");
    deleteButton.setAttribute("id", "delete");

      var deleteButton_text = document.createElement('span');
        deleteButton_text.textContent = 'Delete';
        deleteButton_text.setAttribute("class", "text");
      deleteButton.appendChild(deleteButton_text)

      var deleteButton_icon = document.createElement('span');
        deleteButton_icon.setAttribute("class", "icon");
        deleteButton_icon.setAttribute("id", "deleteIcon");

        var deleteButton_svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
          
        deleteButton_svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        deleteButton_svg.setAttribute("width", "24");
        deleteButton_svg.setAttribute("height", "24");
        deleteButton_svg.setAttributeNS(null, "viewBox", "0 0 24 24");

          var deleteButton_svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            deleteButton_svgPath.setAttributeNS(null, "d", "M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z");

          deleteButton_svg.appendChild(deleteButton_svgPath);
        
        deleteButton_icon.appendChild(deleteButton_svg);

      deleteButton.appendChild(deleteButton_icon);
      
    deleteButton.addEventListener('click', () => {
        let index = drinks.findIndex(item => 
          item.drinkTime.getTime() === drinkTime.getTime() && 
          item.volume === volume && 
          item.alcohol === alcohol
        );
        
        if (index !== -1) {
          drinks.splice(index, 1);
          drinkDiv.remove();
          updateChart();
          saveDataToCookies(); // Save the updated drinks list
        }
    });
    
    drinkDiv.appendChild(drink_infos);
    drinkDiv.appendChild(deleteButton);

    drinkList.appendChild(drinkDiv);
    listIndex++;

    
    //setProfile
    biologicalSex = document.getElementById('gender').value;
    weight = parseFloat(document.getElementById('weight').value);
    height= parseFloat(document.getElementById('height').value);
    
    sortDrinkDiv();
    updateChart();
    
    // Save drinks to cookies
    saveDataToCookies();
    
    // Reset form fields for next entry
    // document.getElementById('volume').value = '';
    // document.getElementById('alcohol').value = '';
}


function sortDrinkDiv() {
  const drinkList = document.getElementById('list');
  let drinkDivElems = Array.from(document.getElementsByClassName("drinkDiv"));

  drinkDivElems.sort(function(a, b) {
    let timeStringA = a.textContent.split(" ")[2]; // "HH:MM"
    let timeStringB = b.textContent.split(" ")[2];

    let [hoursA, minutesA] = timeStringA.split(":").map(Number);
    let [hoursB, minutesB] = timeStringB.split(":").map(Number);

    let dateA = new Date(0, 0, 0, hoursA, minutesA);
    let dateB = new Date(0, 0, 0, hoursB, minutesB);

    return dateA - dateB;  // sort by time
  });

  // Clear the list and append sorted elements
  drinkList.innerHTML = "";
  drinkDivElems.forEach(element => drinkList.appendChild(element));

  return drinkDivElems;
}


function getFirstDrinkTime() {
    var min_time = parseDHMS(365*3000, 0, 0, 0);
  
    for (let i = 0; i < drinks.length; i++) {
      const time = drinks[i].drinkTime;
  
      if (time < min_time) {
        min_time = time;
      }
    }
    return min_time;
}

// Attach event listener to the form submit event
const drinkForm = document.getElementById('drinkForm');
drinkForm.addEventListener('submit', addDrink);