
(function(){
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme){
    document.body.classList.remove("dark","light");
    document.body.classList.add(savedTheme);
  } else {
    document.body.classList.add("dark");
  }
})();

function toggleTheme(){
  if(document.body.classList.contains("dark")){
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme","light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme","dark");
  }
}

function saveLeadToLocalCRM(lead){
  let leads = JSON.parse(localStorage.getItem("leads") || "[]");
  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));
}
