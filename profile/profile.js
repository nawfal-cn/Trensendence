let originalValues = {
    1: document.getElementById("input1").value,
    2: document.getElementById("input2").value,
    3: "password123" // Example current password (to be replaced with real backend validation)
};

function enableEdit(id) {
    let inputField = document.getElementById("input" + id);
    inputField.disabled = false;
    inputField.style.pointerEvents = "auto";
    inputField.focus();
}

function showSaveIcon(id) {
    let inputField = document.getElementById("input" + id);
    let saveIcon = document.getElementById("saveIcon" + id);
    
    if (inputField.value !== originalValues[id]) {
        saveIcon.style.display = "inline";
    } else {
        saveIcon.style.display = "none";
    }
}

function saveInput(id) {
    let inputField = document.getElementById("input" + id);
    let saveIcon = document.getElementById("saveIcon" + id);
    
    if (id === 2 && !validateEmail(inputField.value)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    originalValues[id] = inputField.value;
    inputField.disabled = true;
    inputField.style.pointerEvents = "none";
    saveIcon.style.display = "none";
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function enablePasswordEdit() {
    let currentPasswordInput = document.getElementById("currentPassword");
    let newPasswordInput = document.getElementById("newPassword");
    let confirmPasswordInput = document.getElementById("confirmPassword");
    let passwordFields = document.querySelectorAll(".password-fields");

    // Clear the password field and show the placeholder
    currentPasswordInput.value = "";
    currentPasswordInput.placeholder = "Enter current password";
    
    // Show new password input fields
    passwordFields.forEach(field => field.style.display = "flex");
    
    // Enable editing
    currentPasswordInput.disabled = false;
    currentPasswordInput.style.pointerEvents = "auto";
    currentPasswordInput.focus();
}

function validatePasswords() {
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let saveIcon = document.getElementById("saveIcon3");
    let errorText = document.getElementById("passwordError");
    
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
        errorText.style.display = "none";
        saveIcon.style.display = "inline";
    } else {
        errorText.style.display = "block";
        saveIcon.style.display = "none";
    }
}

function savePassword() {
    let currentPassword = document.getElementById("currentPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorText = document.getElementById("passwordError");
    
    if (currentPassword !== originalValues[3]) {
        errorText.innerText = "Current password is incorrect.";
        errorText.style.display = "block";
        return;
    }

    if (newPassword !== confirmPassword) {
        errorText.innerText = "Passwords do not match.";
        errorText.style.display = "block";
        return;
    }

    originalValues[3] = newPassword;
    errorText.style.display = "none";
    alert("Password updated successfully!");
    
    document.querySelectorAll('.password-fields').forEach(field => {
        field.style.display = "none";
    });
    document.getElementById("currentPassword").disabled = true;
    document.getElementById("saveIcon3").style.display = "none";
}

function uploadProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}