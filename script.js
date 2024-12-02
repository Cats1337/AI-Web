window.onload = function () {
    const checkbox = document.getElementById("light");
    if (checkbox.checked) {
        darkMode();
    }
};

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark");
    // transition: background-color 0.5s ease;
    element.style.transition = "background-color 0.5s ease";
    element.style.transition = "color 0.5s ease";
}

