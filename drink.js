var listIndex = 0;

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4], b[5], b[6]));
}

// Function to add a drink
function addDrink(event) {
    event.preventDefault();
    const drinkTime = new Date(document.getElementById('drinkTime').value);
    const volume = parseInt(document.getElementById('volume').value+"Z");
    const alcohol = parseFloat(document.getElementById('alcohol').value);

    drinks.push({ drinkTime, volume, alcohol });

    // Display the added drink in the list
    const drinkList = document.getElementById('list');
    /*const li = document.createElement('li');
    li.textContent = `Drink at ${drinkTime.getHours()}:${drinkTime.getMinutes().toString().padStart(2, '0')} - Volume: ${volume} mL, Alcohol: ${alcohol}%`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        drinks.splice(drinks.length - 1, 1);
        li.remove();
        updateChart();
    });
    li.appendChild(deleteButton);
    drinkList.appendChild(li);*/

    const drinkDiv = document.createElement('div');
    drinkDiv.setAttribute("id", "drinknumber_"+listIndex.toString());
    drinkDiv.setAttribute("class", "drinkDiv");
    const drink_infos = document.createElement('p');
    drink_infos.textContent = `Drink at ${drinkTime.getHours()}:${drinkTime.getMinutes().toString().padStart(2, '0')} - Volume: ${volume} mL, Alcohol: ${alcohol}%`;
    
    var deleteButton = document.createElement('button');
    // deleteButton.textContent = 'Delete';
    //create button rendering

    deleteButton.setAttribute("class", "noselect");
    deleteButton.setAttribute("id", "delete");

      var deleteButton_text = document.createElement('span');
        deleteButton_text.textContent = 'Delete';
        deleteButton_text.setAttribute("class", "text");
      deleteButton.appendChild(deleteButton_text)

      var deleteButton_icon = document.createElement('span');
        // deleteButton_icon.textContent = 'Delete';
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
        let index=Infinity;
        for (let i = 0; i<drinks.length; i++) {
          if (drinks[i].drinkTime == drinkTime && drinks[i].volume == volume && drinks[i].alcohol == alcohol) {
            index = i;
            break;
          }
        };
        console.log({ drinkTime, volume, alcohol });
        console.log("index delete =", index);
        drinks.splice(index, 1);
        drinkDiv.remove();
        updateChart();
    });
    drinkDiv.appendChild(drink_infos);
    drinkDiv.appendChild(deleteButton);

    drinkList.appendChild(drinkDiv);

    sortDrinkDiv();
    updateChart();
}


function sortDrinkDiv() {
  const drinkList = document.getElementById('list');

  var drinkDivElems = document.getElementsByClassName("drinkDiv");
  drinkDivElems = Array.prototype.slice.call(drinkDivElems, 0);
  drinkDivElems.sort(function(a, b) {
    let timeStringA = a.textContent.split(" ")[2].split(":");
    let timeA = parseDHMS(0, parseInt(timeStringA[0])-1, parseInt(timeStringA[1]), 0);
    let timeStringB = b.textContent.split(" ")[2].split(":");
    let timeB = parseDHMS(0, parseInt(timeStringB[0])-1, parseInt(timeStringB[1]), 0);

    if (a.textContent < b.textContent) {
        return -1;
      }
      else {
        return 1;
    }
  });
  while (drinkDivElems.firstChild) {
    drinkDivElems.firstChild.remove()
  }
  drinkDivElems.forEach(element => {
  drinkList.appendChild(element);
  });

  return drinkDivElems;
} 

function getFirstDrinkTime() {
    var min_time = parseDHMS(365*3000, 0, 0, 0);
  
    for (let i = 0; i < drinks.length; i++) {
      const time = drinks[i].drinkTime;
  
      if (time<min_time) {
        min_time = time;
      }
    }
    return min_time;
  }

// Attach event listener to the form submit event
const drinkForm = document.getElementById('drinkForm');
drinkForm.addEventListener('submit', addDrink);