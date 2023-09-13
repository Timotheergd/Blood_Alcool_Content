function setProfile(event) {
    event.preventDefault();
    biologicalSex = document.getElementById('gender').value;
    weight = parseFloat(document.getElementById('weight').value);
    height= parseFloat(document.getElementById('height').value);

    updateChart();
}

const profileForm = document.getElementById('profileForm');
profileForm.addEventListener('submit', setProfile);