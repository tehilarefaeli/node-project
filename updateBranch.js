function setValues() {
    let branchFromStorage = window.localStorage.getItem('branch');
    let branchData = JSON.parse(branchFromStorage);
    document.getElementById('city').value = branchData.city;
    document.getElementById('street').value = branchData.street;
    document.getElementById('phone').value = branchData.phone;
    document.getElementById('opening_hours').value = branchData.opening_hours;
    document.getElementById('email').value = branchData.email;
    document.getElementById('id').value = branchData._ID;
}