export async function openEmaiForm() {
    const showFormLink = document.getElementById("show-form");
    const contactForm = document.getElementById("contact-form");
    const contacts = document.querySelectorAll(".contact");
    console.log(contacts)

    showFormLink.addEventListener("click", function(e) {
        e.preventDefault(); // prevent default link behavior
        contactForm.classList.add("active"); // show the form
        console.log("form active")
        
        contacts.forEach(item => {
            item.classList.toggle("invisible");
        });
    });

    document.getElementById("back-contact").addEventListener("click", () => {
        const contactForm = document.getElementById("contact-form");
        const contacts = document.querySelectorAll(".contact");
      
        contactForm.classList.remove("active");
      
        contacts.forEach(item => {
          item.classList.toggle("invisible");
        });
      });
    // let isOpen = false;

    // showFormLink.addEventListener("click", function (e) {
    //   e.preventDefault();
  
    //   isOpen = !isOpen;
  
    //   if (isOpen) {
    //     contactForm.classList.add("active");
  
    //     contacts.forEach(item => {
    //       item.classList.add("invisible");
    //     });
  
    //     console.log("form opened");
    //   } else {
    //     contactForm.classList.remove("active");
  
    //     contacts.forEach(item => {
    //       item.classList.remove("invisible");
    //     });
  
    //     console.log("form closed");
    //   }
    // });
}