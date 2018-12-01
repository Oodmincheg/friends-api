const url = "https://randomuser.me/api/?results=40";
const getFriends = fetch(url);
//let workList;

const createCardOfFreind = friend => {
  let friendProfile = document.createElement("figure");
  let image = document.createElement("img");
  image.setAttribute("src", friend.picture.large);
  let caption = document.createElement("figcaption");
  //prettier-ignore
  caption.textContent = `${upFirstLetter(friend.name.first)} ${upFirstLetter(friend.name.last)}, age ${friend.dob.age}`;
  friendProfile.append(image, caption);
  return friendProfile;
};

const drawArrayOfFreinds = arrayOfFreinds => {
  let content = document.getElementById("content");
  content.innerHTML = "";
  arrayOfFreinds.forEach(friend => {
    content.append(createCardOfFreind(friend));
  });
};

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

const upFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const filterByString = (workList, string) => {
  return workList.filter(friend =>
    `${friend.name.first} ${friend.name.last}`.includes(string)
  );
};
const resetSortButtons = () => {
  document
    .getElementsByName("sortBy")
    .forEach(radio => (radio.checked = false));
};
const resetSearchInput = () => {
  document.getElementById("searchByName").value = "";
};

const renderPageWithListeners = originList => {
  let workList = [...originList];
  drawArrayOfFreinds(originList);
  let buttonSortByNameDesc = document.getElementById("sortByNameDesc");
  buttonSortByNameDesc.addEventListener("click", () =>
    //prettier-ignore
    drawArrayOfFreinds(workList.sort((a, b) => desc(a.name.first, b.name.first)))
  );
  let buttonSortByNameAsc = document.getElementById("sortByNameAsc");
  buttonSortByNameAsc.addEventListener("click", () =>
    drawArrayOfFreinds(workList.sort((a, b) => asc(a.name.first, b.name.first)))
  );
  let buttonSortByAgeDesc = document.getElementById("sortByAgeDesc");
  buttonSortByAgeDesc.addEventListener("click", () =>
    drawArrayOfFreinds(workList.sort((a, b) => desc(a.dob.age, b.dob.age)))
  );
  let buttonSortByAgeAsc = document.getElementById("sortByAgeAsc");
  buttonSortByAgeAsc.addEventListener("click", () =>
    drawArrayOfFreinds(workList.sort((a, b) => asc(a.dob.age, b.dob.age)))
  );
  let inputSearchByName = document.getElementById("searchByName");
  inputSearchByName.addEventListener("input", event => {
    resetSortButtons();
    workList = filterByString(originList, event.target.value);
    drawArrayOfFreinds(workList);
  });
  let resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    resetSearchInput();
    resetSortButtons();
    drawArrayOfFreinds(originList);
  });
};

getFriends
  .then(response => response.json())
  .then(data => {
    renderPageWithListeners(data.results);
  });
