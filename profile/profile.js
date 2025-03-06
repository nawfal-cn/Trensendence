let originalValues = {
    1: document.getElementById("input1").value,
    2: document.getElementById("input2").value,
    3: "pass" // Example current password (to be replaced with real backend validation)
};

function enableEdit(id) {
    let inputField = document.getElementById("input" + id);
    let saveIcon = document.getElementById("saveIcon" + id);
    
    inputField.disabled = false;
    inputField.style.pointerEvents = "auto";
    saveIcon.style.display = "inline";  // Show save icon immediately
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
    let passwordFields = document.querySelectorAll(".password-fields");
    let errorText = document.getElementById("passwordError");

    // Clear the password field and show the placeholder
    currentPasswordInput.value = "";
    currentPasswordInput.placeholder = "Enter current password";
    
    // Show new password input fields and reset their values
    passwordFields.forEach(field => {
        field.style.display = "flex";
        const input = field.querySelector('input');
        if (input) {
            input.value = ""; // Clear any previous input
        }
    });
    
    // Reset error message
    errorText.style.display = "none";
    
    // Enable current password input when edit is clicked
    currentPasswordInput.disabled = false;
    currentPasswordInput.style.pointerEvents = "auto";
    
    // Create a password-field div if it doesn't exist
    if (!currentPasswordInput.parentElement.classList.contains('password-field')) {
        const passwordField = document.createElement('div');
        passwordField.className = 'password-field';
        currentPasswordInput.parentNode.insertBefore(passwordField, currentPasswordInput);
        passwordField.appendChild(currentPasswordInput);
    }
    
    // Add eye icon to current password field
    const existingEyeIcon = currentPasswordInput.parentElement.querySelector('.eye-icon');
    if (!existingEyeIcon) {
        const eyeIcon = document.createElement('img');
        eyeIcon.src = "../z-media/show.png";
        eyeIcon.alt = "Show Password";
        eyeIcon.className = "eye-icon";
        eyeIcon.onclick = () => togglePassword('currentPassword');
        currentPasswordInput.parentElement.appendChild(eyeIcon);
    }
    
    // Hide save icon initially
    document.getElementById("saveIcon3").style.display = "none";
    
    currentPasswordInput.focus();
}

function validatePasswords() {
    let currentPasswordInput = document.getElementById("currentPassword");
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let saveIcon = document.getElementById("saveIcon3");
    let errorText = document.getElementById("passwordError");
    
    // Only show save icon if current password is entered and new passwords match
    if (currentPasswordInput.value && newPassword && confirmPassword && newPassword === confirmPassword) {
        errorText.style.display = "none";
        saveIcon.style.display = "inline";
    } else {
        if (newPassword !== confirmPassword) {
            errorText.innerText = "Passwords do not match.";
            errorText.style.display = "block";
        } else {
            errorText.style.display = "none";
        }
        saveIcon.style.display = "none";
    }
}

function savePassword() {
    let currentPasswordInput = document.getElementById("currentPassword");
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorText = document.getElementById("passwordError");
    
    if (!currentPasswordInput.value) {
        errorText.innerText = "Please enter current password.";
        errorText.style.display = "block";
        return;
    }

    if (currentPasswordInput.value !== originalValues[3]) {
        errorText.innerText = "Current password is incorrect.";
        errorText.style.display = "block";
        return;
    }

    if (!newPassword || !confirmPassword) {
        errorText.innerText = "Please fill in all password fields.";
        errorText.style.display = "block";
        return;
    }

    if (newPassword !== confirmPassword) {
        errorText.innerText = "Passwords do not match.";
        errorText.style.display = "block";
        return;
    }

    originalValues[3] = newPassword;
    currentPasswordInput.value = newPassword;
    errorText.style.display = "none";
    alert("Password updated successfully!");
    
    // Reset password fields
    document.querySelectorAll('.password-fields').forEach(field => {
        field.style.display = "none";
        const input = field.querySelector('input');
        if (input) {
            input.value = "";
        }
    });
    
    // Remove the eye icon and restore original structure
    const passwordField = currentPasswordInput.parentElement;
    if (passwordField.classList.contains('password-field')) {
        const container = passwordField.parentElement;
        container.insertBefore(currentPasswordInput, passwordField);
        passwordField.remove();
    }
    
    currentPasswordInput.disabled = true;
    document.getElementById("saveIcon3").style.display = "none";
}

function uploadProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            document.getElementById('profilePic').src = imageData;
            // Store the image data in localStorage
            localStorage.setItem('profilePicture', imageData);
        };
        reader.readAsDataURL(file);
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

window.onload = function() {
    // Load saved profile picture if it exists
    const savedProfilePic = localStorage.getItem('profilePicture');
    if (savedProfilePic) {
        document.getElementById('profilePic').src = savedProfilePic;
    }

    // Disable all inputs
    document.getElementById("input1").disabled = true;
    document.getElementById("input2").disabled = true;
    document.getElementById("currentPassword").disabled = true;
    
    // Hide all save icons
    document.getElementById("saveIcon1").style.display = "none";
    document.getElementById("saveIcon2").style.display = "none";
    document.getElementById("saveIcon3").style.display = "none";
    
    // Hide password fields
    document.querySelectorAll('.password-fields').forEach(field => {
        field.style.display = "none";
    });
};

function logout() {
    // Clear all storage
    sessionStorage.clear();
    localStorage.clear();  // This will also clear the profile picture
    
    // Redirect to login
    window.location.replace('../login/login.html');
    
    // Clear history and prevent back navigation
    window.history.pushState(null, '', '../login/login.html');
    window.onpopstate = function(event) {
        window.location.replace('../login/login.html');
    };
}