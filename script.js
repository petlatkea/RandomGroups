
// Register button-clicks
document.querySelector("#createGroups").addEventListener("click", createGroups);
document.querySelector("#registerNames").addEventListener("click", registerNames);
document.querySelector("#closeDialog").addEventListener("click", closeDialog);

function registerNames() {
  // show dialog - the names themselves are read when creating groups
  document.querySelector("dialog").showModal();
}

function closeDialog() {
  document.querySelector("dialog").close();
}

function createGroups() {
  // Read list of names from textarea - split by lines, and parse
  let names = document.querySelector("#names").value.split("\n").map( name => {
    name = name.trim();
    if(name.indexOf(';')!=-1) {
      // In case of CSV - split by ; and build the name of first + last
      const parts = name.split(";");
      return parts[1] + " " + parts[2];
    } else if(name.indexOf('\t')!=-1) {
      // In case of plain copy - split by TAB and take full name
      const parts = name.split("\t")
      return parts[1];
    } else {
      // All others - just return the line
      return name;
    }
  });
  
  // Filter out header from CSV and empty lines
  names = names.filter(name => !name.startsWith('Firstname'));
  names = names.filter(name => name.length>0);

  // Create empty list of groups
  const groups = [];

  // Create new empty group (let, because we create more)
  let group = [];
  while( names.length > 0) {
    // Pick a random student from the list - and remove it
    const studentIndex = Math.floor(Math.random()*names.length);
    const student = names[studentIndex];
    names.splice(studentIndex,1);
    // Put it into a group
    group.push(student);

    // If there are 4 in a group, push that group to the list of groups
    if( group.length == 4) {
      groups.push(group);
      group = [];
    }
  }
  // If the last group wasn't exactly 4 - push it anyways
  groups.push(group);


  // Clear alle groups
  const HTMLgroups = document.querySelector("#groups");
  HTMLgroups.innerHTML = "";

  // Display HTML for each group
  HTMLgroups.innerHTML += groups.map( (group,nr) => `<article>
    <h2>Gruppe nr. ${nr+1}</h2>
    <ul>  
    ${group.map(member => `<li>${member}</li>\n`).join("")}
    </ul>
  </article>`).join("");
}
