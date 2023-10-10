//from section
let addNewBtn = document.querySelector(".addcontact");
let closeFormBtn = document.querySelector(".addnew .close");
let formSection=document.querySelector(".form");
let contactForm = document.querySelector(".addnew");


addNewBtn.addEventListener('click', () => {
    formSection.classList.add("overlay");
    contactForm.style.display = "block";
  });
  
  closeFormBtn.addEventListener('click', () => {
    formSection.classList.remove("overlay");
    contactForm.style.display = "none";
  });

let saveData = localStorage.getItem("contact");
let contactList = saveData !== null ? JSON.parse(saveData) : [];

let contactFormFname=document.getElementById("form_fname");
let contactFormLname=document.getElementById("form_lname");
let contactFormPhone=document.getElementById("form_phone");
let contactFormEmail=document.getElementById("form_email");
let contactFormAddress=document.getElementById("form_address");
let contactFormImg = document.getElementById("form_image");
// Get last id
let lastContactId = contactList.length;
// Create a function to push new contact into the array
let newContact= ()=>{
    contactList.push({
        contactId : lastContactId =+1,
        contactFname : contactFormFname.value,
        contactLname : contactFormLname.value,
        contactPhone : contactFormPhone.value,
        contactEmail : contactFormEmail.value,
        contactAddress : contactFormAddress.value,
        contactImg: contactFormImg.value
     
    });
    console.log(contactList);
}

// Create render function to show data in the table
let contactTableBody=document.getElementById("tbody");
let renderContacts=() => {
    let tr ='';
    contactList.forEach(contact => {
        tr+= 
        `
             <tr data-id=${contact.contactId}>
                 <td>${contact.contactId}</td>
                 <td>${contact.contactFname}<td/>
                 <td>${contact.contactLname}</td>
                 <td>${contact.contactPhone}</td>
                 <td>${contact.contactEmail}</td>
                 <td>${contact.contactAddress}</td>
                 <td class="green">Edit</td>
                 <td class="red">Delete</td>
                 <td><img src="${contact.contactImg}" alt="${contact.contactFname}"
                 style="width: 75px; height: 70px; margin-left: 10px; border: 2px solid black; border-radius: 50%;"></td>
                 
             </tr>`
    });
    contactTableBody.innerHTML=tr;
}
renderContacts()

let resetFormContact = () => {
    contactFormFname.value = '';
    contactFormLname.value = '';
    contactFormPhone.value = '';
    contactFormEmail.value = '';
    contactFormAddress.value = '';
    contactFormImg.value = '';
}

//Add new contact handler
let saveBtn = document.querySelector(".save");
let saveBtnHandler = () => {
    newContact();
    localStorage.setItem("contact", JSON.stringify(contactList));
    resetFormContact();
    renderContacts();
    formSection.classList.remove("overlay");
    contactForm.style.display = "none";
}
saveBtn.addEventListener('click', saveBtnHandler);

// Logic to handle edit and delete
contactTableBody.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.classList.contains("green")) {
      let tr = e.target.parentElement;
      let id = tr.dataset.id;
      let index = parseInt(id) - 1;
    // Assign the values from the array to the input values
    contactFormFname.value = contactList[index].contactFname;
    contactFormLname.value = contactList[index].contactLname;
    contactFormPhone.value = contactList[index].contactPhone;
    contactFormEmail.value = contactList[index].contactEmail;
    contactFormAddress.value = contactList[index].contactAddress;
    contactFormImg.value = contactList[index].contactImg;

    // Open the form with overlay
    formSection.classList.add("overlay");
    contactForm.style.display = "block";

    // Update handler
    let updateHandler = () => {
      // New object with modified data
      let updatedContact = {
        contactId: parseInt(id),
        contactFname: contactFormFname.value,
        contactLname: contactFormLname.value,
        contactPhone: contactFormPhone.value,
        contactEmail: contactFormEmail.value,
        contactAddress: contactFormAddress.value,
        contactImg: contactFormImg.value
        
      }
      // Change the old object with new object
      contactList[index] = updatedContact;
      localStorage.setItem("contact", JSON.stringify(contactList));
      // Close the overlay and hide form
      formSection.classList.remove("overlay");
      contactForm.style.display = "none";
      // Reset the form
      resetFormContact();
      // Display (render data)
      renderContacts();
      // Listener handler
      saveBtn.removeEventListener('click', updateHandler);
      saveBtn.addEventListener('click', saveBtnHandler);
      console.log('update')
}

    saveBtn.removeEventListener('click', saveBtnHandler);
    saveBtn.addEventListener('click', updateHandler);
  }

  if (e.target.classList.contains("red")) {
    let tr = e.target.parentElement;
    let id = tr.dataset.id;
    let index = parseInt(id) - 1;
    contactList.splice(index, 1);
    localStorage.setItem("contact", JSON.stringify(contactList));
    renderContacts();
  }
});

/* Search logic */
let searchInput = document.getElementById("search");
let form = searchInput.parentElement;
let trs = document.querySelectorAll('tbody tr');
form.addEventListener('submit', e => e.preventDefault());

searchInput.addEventListener('keyup', () => {
  let searchInputValue = searchInput.value.toLowerCase();
  trs.forEach(tr => {
    trName = tr.children[1].textContent.toLowerCase();
    if (trName.includes(searchInputValue)) {
      tr.style.display = "";
    } else {
      tr.style.display = "none";
    }
  });
});
  

