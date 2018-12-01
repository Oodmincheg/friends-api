const url = "https://randomuser.me/api/?results=5";
const futureData = fetch(url);
//let workList;

function createCardOfFreind(friend) {
  let friendProfile = document.createElement("figure");
  let image = document.createElement("img");
  image.setAttribute("src", friend.picture.large);
  let caption = document.createElement("figcaption");
  //prettier-ignore
  caption.textContent = `${upFirstLetter(friend.name.first)} ${upFirstLetter(friend.name.last)}, age ${friend.dob.age}`;
  friendProfile.append(image, caption);
  return friendProfile;
}

function drawArrayOfFreinds(arrayOfFreinds) {
  let content = document.getElementById("content");
  content.innerHTML = "";
  arrayOfFreinds.forEach(friend => {
    content.append(createCardOfFreind(friend));
  });
}
const desc = (a, b) => {
  if (a < b) {
    return -1;
  } else {
    return 1;
  }
};

const asc = (a, b) => {
  if (a < b) {
    return 1;
  } else {
    return -1;
  }
};

function upFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const addSortByName = workList => {
  let buttonSortByNameDesc = document.getElementById("sortByNameDesc");
  buttonSortByNameDesc.addEventListener("click", () =>
    //prettier-ignore
    drawArrayOfFreinds(workList.sort((a, b) => desc(a.name.first, b.name.first)))
  );
  let buttonSortByNameAsc = document.getElementById("sortByNameAsc");
  buttonSortByNameAsc.addEventListener("click", () =>
    drawArrayOfFreinds(workList.sort((a, b) => asc(a.name.first, b.name.first)))
  );
};

const addSortByAge = workList => {
  let buttonSortByAgeDesc = document.getElementById("sortByAgeDesc");
  buttonSortByAgeDesc.addEventListener("click", () =>
    drawArrayOfFreinds(workList.sort((a, b) => desc(a.dob.age, b.dob.age)))
  );
  let buttonSortByAgeAsc = document.getElementById("sortByAgeAsc");
  buttonSortByAgeAsc.addEventListener("click", () =>
    drawArrayOfFreinds(workList.sort((a, b) => asc(a.dob.age, b.dob.age)))
  );
};
const filterByString = (workList, string) => {
  workList = workList.filter(friend =>
    `${friend.name.first} ${friend.name.last}`.includes(string)
  );
  return workList;
};
const addSearchByName = workList => {
  let inputSearchByName = document.getElementById("searchByName");
  inputSearchByName.addEventListener("input", event => {
    workList = filterByString(workList, event.target.value);
    drawArrayOfFreinds(workList);
  });
};
const display = originArray => {
  const workList = [...originArray];
  drawArrayOfFreinds(originArray);
  addSortByName(workList);
  addSortByAge(workList);
  addSearchByName(workList);
  let reset = document.getElementById("reset");
  reset.addEventListener("click", () => drawArrayOfFreinds(originArray));
};

futureData
  .then(response => response.json())
  .then(data => {
    display(data.results);
  });
