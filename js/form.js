
async function handleSubmit(e){
  e.preventDefault();

  let name = document.querySelector("[name='full_name']").value.trim();
  let contact = document.querySelector("[name='contact']").value.trim();
  let address = document.querySelector("[name='address']").value.trim();
  let course = document.querySelector("[name='course']").value;

  if(name.length < 3){ alert("Enter valid name"); return; }
  if(!/^[6-9]\d{9}$/.test(contact)){ alert("Enter valid 10-digit mobile number"); return; }
  if(address.length < 5){ alert("Enter valid address"); return; }

  let leadData = {
    name,
    contact,
    address,
    course,
    page: window.location.pathname,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  // ✅ SEND TO GOOGLE SHEET (LIVE)
  await fetch("https://script.google.com/macros/s/AKfycbxNsthvXLw5Z73X4KpBZpH8rBXNwosLIMYZq0sDR7Jq7rNIZrFmiSPHlsVwe3lFOEfmcA/exec", {
    method: "POST",
    body: JSON.stringify(leadData)
  });

  // ✅ Local CRM backup
  saveLeadToLocalCRM(leadData);

  // ✅ Success popup
  document.getElementById("successPopup").style.display = "block";
  setTimeout(() => {
    document.getElementById("successPopup").style.display = "none";
  }, 2500);

  // ✅ WhatsApp auto-send
  let url = `https://wa.me/918956444441?text=New Enquiry:%0A${name}%0A${contact}%0A${course}`;
  window.open(url,"_blank");

  e.target.reset();
}
