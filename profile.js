document.getElementById("edit-address").addEventListener("click", function() {
    document.getElementById("edit-section").style.display = "block";
});

document.getElementById("cancel-edit").addEventListener("click", function() {
    document.getElementById("edit-section").style.display = "none";
});

document.getElementById("save-address").addEventListener("click", function() {
    const newAddress = document.getElementById("new-address").value;
    if (newAddress.trim() !== "") {
        document.getElementById("address-value").textContent = newAddress;
        document.getElementById("edit-section").style.display = "none";
    } else {
        alert("Please enter a valid address.");
    }
});