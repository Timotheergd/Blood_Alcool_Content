function setProfile(event) {
    event.preventDefault();
    biologicalSex = document.getElementById('gender').value;
    weight = parseFloat(document.getElementById('weight').value);
    height= parseFloat(document.getElementById('height').value);

    // Update chart with new profile data
    updateChart();

    // Save profile data to cookies
    saveDataToCookies();
}

const profileForm = document.getElementById('profileForm');
profileForm.addEventListener('submit', setProfile);