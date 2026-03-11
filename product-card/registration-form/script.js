// Get the form
const form = document.getElementById("registrationForm");

// Add submit event listener
form.addEventListener("submit", function(e){
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    let isValid = true;

    // Name validation
    const name = document.getElementById("name").value.trim();
    if(name === ""){
        document.getElementById("nameError").innerText = "Name is required";
        isValid = false;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === ""){
        document.getElementById("emailError").innerText = "Email is required";
        isValid = false;
    } else if(!emailPattern.test(email)){
        document.getElementById("emailError").innerText = "Invalid email format";
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById("phone").value.trim();
    const phonePattern = /^[0-9]{10}$/;
    if(phone === ""){
        document.getElementById("phoneError").innerText = "Phone is required";
        isValid = false;
    } else if(!phonePattern.test(phone)){
        document.getElementById("phoneError").innerText = "Phone must be 10 digits";
        isValid = false;
    }

    // Password validation
    const password = document.getElementById("password").value;
    if(password === ""){
        document.getElementById("passwordError").innerText = "Password is required";
        isValid = false;
    }

    // Confirm password
    const confirmPassword = document.getElementById("confirmPassword").value;
    if(confirmPassword === ""){
        document.getElementById("confirmPasswordError").innerText = "Confirm your password";
        isValid = false;
    } else if(password !== confirmPassword){
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
        isValid = false;
    }

    // Gender validation
    const gender = document.querySelector('input[name="gender"]:checked');
    if(!gender){
        document.getElementById("genderError").innerText = "Select gender";
        isValid = false;
    }

    // Skills validation
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    if(skills.length === 0){
        document.getElementById("skillsError").innerText = "Select at least one skill";
        isValid = false;
    }

    // City validation
    const city = document.getElementById("city").value;
    if(city === ""){
        document.getElementById("cityError").innerText = "Select a city";
        isValid = false;
    }

    if(isValid){
        alert("Registration Successful!");
        form.reset();
    }
});