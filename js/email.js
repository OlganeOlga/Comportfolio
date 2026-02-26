export function sendEmail() {
    const contacts = document.querySelectorAll('.contact');
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form) return;

    emailjs.init("J_8SnKYWhCqYcxEbC");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_o6rb2uz",
            "template_2zoo08e",
            form
        )
        .then(() => {
            status.style.display = "block";
            form.reset();
            form.classList.remove('active');
            contacts.forEach(item => {
                item.classList.toggle("invisible");
                console.log("p is visible");
            });
        })
        .catch((error) => {
            console.error(error);
            alert("Failed to send message.");
        });
    });
}