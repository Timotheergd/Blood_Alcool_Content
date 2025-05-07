 // Cookie management functions

// Set a cookie with a specified name, value, and expiration days
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};` +
                    `expires=${expires};path=/;Secure;SameSite=Lax`;
}

  
  // Get a cookie by name
  function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        try {
          return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
        } catch (e) {
          console.error("Error parsing cookie:", e);
          return null;
        }
      }
    }
    return null;
  }
  
  // Delete a cookie by name
  function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
  
  // Save all BAC calculator data to cookies
  function saveDataToCookies() {
    // Save profile data
    setCookie('biologicalSex', biologicalSex, 30);
    setCookie('weight', weight, 30);
    setCookie('height', height, 30);
    
    // Save drinks data
    const drinksToSave = drinks.map(drink => ({
      // Convert Date objects to ISO strings for storage
      drinkTime: drink.drinkTime.toISOString(),
      volume: drink.volume,
      alcohol: drink.alcohol
    }));
    
    setCookie('drinks', drinksToSave, 30);
  }
  
  // Load all BAC calculator data from cookies
  function loadDataFromCookies() {
    // Load profile data if available
    const savedSex = getCookie('biologicalSex');
    const savedWeight = getCookie('weight');
    const savedHeight = getCookie('height');
    
    if (savedSex) biologicalSex = savedSex;
    if (savedWeight) weight = savedWeight;
    if (savedHeight) height = savedHeight;
    
    // Update UI with loaded profile values
    document.getElementById('gender').value = biologicalSex;
    document.getElementById('weight').value = weight;
    document.getElementById('height').value = height;
    
    // Load drinks data if available
    const savedDrinks = getCookie('drinks');
    if (savedDrinks && Array.isArray(savedDrinks)) {
      // Clear existing drinks
      drinks = [];
      
      // Convert ISO strings back to Date objects and add each drink
      savedDrinks.forEach(drink => {
        const drinkToAdd = {
          drinkTime: new Date(drink.drinkTime),
          volume: drink.volume,
          alcohol: drink.alcohol
        };
        drinks.push(drinkToAdd);
        
        // Add drink to the UI
        addDrinkToUI(drinkToAdd);
      });
    }
  }
  
  // Function to display a drink in the UI without adding it to the drinks array
  function addDrinkToUI(drink) {
    const drinkList = document.getElementById('list');
    const drinkDiv = document.createElement('div');
    const drinkIndex = listIndex++;
    
    drinkDiv.setAttribute("id", "drinknumber_" + drinkIndex);
    drinkDiv.setAttribute("class", "drinkDiv");
    
    const drink_infos = document.createElement('p');
    drink_infos.textContent = `Drink at ${drink.drinkTime.getHours()}:${drink.drinkTime.getMinutes().toString().padStart(2, '0')} - Volume: ${drink.volume} mL, Alcohol: ${drink.alcohol}%`;
    
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute("class", "noselect");
    deleteButton.setAttribute("id", "delete");
  
    const deleteButton_text = document.createElement('span');
    deleteButton_text.textContent = 'Delete';
    deleteButton_text.setAttribute("class", "text");
    deleteButton.appendChild(deleteButton_text);
  
    const deleteButton_icon = document.createElement('span');
    deleteButton_icon.setAttribute("class", "icon");
    deleteButton_icon.setAttribute("id", "deleteIcon");
  
    const deleteButton_svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    deleteButton_svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    deleteButton_svg.setAttribute("width", "24");
    deleteButton_svg.setAttribute("height", "24");
    deleteButton_svg.setAttributeNS(null, "viewBox", "0 0 24 24");
  
    const deleteButton_svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    deleteButton_svgPath.setAttributeNS(null, "d", "M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z");
  
    deleteButton_svg.appendChild(deleteButton_svgPath);
    deleteButton_icon.appendChild(deleteButton_svg);
    deleteButton.appendChild(deleteButton_icon);
    
    deleteButton.addEventListener('click', () => {
      let index = drinks.findIndex(item => 
        item.drinkTime.getTime() === drink.drinkTime.getTime() && 
        item.volume === drink.volume && 
        item.alcohol === drink.alcohol
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
  }
  
  // Clear all saved data
  function clearSavedData() {
    deleteCookie('biologicalSex');
    deleteCookie('weight');
    deleteCookie('height');
    deleteCookie('drinks');
  }