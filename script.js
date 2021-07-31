let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


const render = (leads) => {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li>
                        <a target="_blank" href="${leads[i]}">
                                ${leads[i]}
                            </a>
                        </li> `;
    }
    ulEl.innerHTML = listItems;

}
const saveTab = tabBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
   });
 
})
const saveLead = inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);

})


if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

const deleteAll = deleteBtn.addEventListener("click", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})