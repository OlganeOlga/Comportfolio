export async function openEmaiForm() {
    const showFormLink = document.getElementById("show-form");
    const contactForm = document.getElementById("contact-form");
    const contacts = document.querySelectorAll(".contact");
    console.log(contacts)

    showFormLink.addEventListener("click", function(e) {
        e.preventDefault(); // prevent default link behavior
        contactForm.classList.add("active"); // show the form
        
        contacts.forEach(item => {
            item.classList.toggle("invisible");
            console.log("p is invisible");
        });
    });
}