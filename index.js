const URL_FRIENDS_API = "https://randomuser.me/api/?results=40";
const getFriends = fetch(URL_FRIENDS_API);

const createCardOfFreind = friend => {
  const friendProfile = document.createElement("figure");
  const image = document.createElement("img");
  image.setAttribute("src", friend.picture.large);
  const caption = document.createElement("figcaption");
  //prettier-ignore
  let name  = document.createElement("p")
  name.textContent = `${friend.name.first} ${friend.name.last}`;
  let age = document.createElement("p");
  age.textContent = `age ${friend.dob.age}`;
  let email = document.createElement("a");
  let br = document.createElement("br");
  email.textContent = `${friend.email}`;
  caption.append(name, age, email);
  friendProfile.append(image, caption);
  return friendProfile;
};

const renderListOfFriends = arrayOfFreinds => {
  const content = document.getElementById("content");
  content.innerHTML = "";
  arrayOfFreinds.forEach(friend => {
    content.append(createCardOfFreind(friend));
  });
};

const desc = (a, b) => {
  if (a < b) {
    return 1;
  } else {
    return -1;
  }
};

const asc = (a, b) => {
  if (a < b) {
    return -1;
  } else {
    return 1;
  }
};

/*const filterByString = (workList, string) => {
  return workList.filter(friend =>
    `${friend.name.first} ${friend.name.last} ${friend.email}`.includes(string)
  );
};*/

const resetSortButtons = () => {
  document
    .querySelectorAll("input[type=radio]")
    .forEach(radio => (radio.checked = false));
  document.getElementById("both-sexes").checked = true;
};

const resetSearchInput = () => {
  document.getElementById("search-by-name").value = "";
};

const renderPageWithListeners = originList => {
  let dataState = {
    nameAsc: null,
    nameDesc: null,
    ageAsc: null,
    ageDesc: null,
    sexFilter: null,
    searchFilter: null
  };
  renderListOfFriends(originList);

  const buttonSortByNameDesc = document.getElementById("sort-by-name-desc");
  buttonSortByNameDesc.addEventListener("change", () => {
    dataState.nameDesc = true;
    dataState.nameAsc = false;
    dataState.ageAsc = false;
    dataState.ageDesc = false;
    //prettier-ignore
    renderListOfFriends(processingData(originList, dataState))
  });

  const buttonSortByNameAsc = document.getElementById("sort-by-name-asc");
  buttonSortByNameAsc.addEventListener("change", () => {
    dataState.nameDesc = false;
    dataState.nameAsc = true;
    dataState.ageAsc = false;
    dataState.ageDesc = false;
    renderListOfFriends(processingData(originList, dataState));
  });

  const buttonSortByAgeDesc = document.getElementById("sort-by-age-desc");
  buttonSortByAgeDesc.addEventListener("change", () => {
    console.log("desc");
    dataState.nameDesc = false;
    dataState.nameAsc = false;
    dataState.ageAsc = false;
    dataState.ageDesc = true;
    renderListOfFriends(processingData(originList, dataState));
  });

  const buttonSortByAgeAsc = document.getElementById("sort-by-age-asc");
  buttonSortByAgeAsc.addEventListener("change", () => {
    dataState.nameDesc = false;
    dataState.nameAsc = false;
    dataState.ageAsc = true;
    dataState.ageDesc = false;
    renderListOfFriends(processingData(originList, dataState));
  });

  const buttonSortByMale = document.getElementById("sort-by-male");
  buttonSortByMale.addEventListener("change", () => {
    dataState.sexFilter = "male";
    renderListOfFriends(processingData(originList, dataState));
  });
  const buttonSortByFemale = document.getElementById("sort-by-female");
  buttonSortByFemale.addEventListener("change", () => {
    dataState.sexFilter = "female";
    renderListOfFriends(processingData(originList, dataState));
  });
  const buttonBothSexes = document.getElementById("both-sexes");
  buttonBothSexes.addEventListener("change", () => {
    dataState.sexFilter = null;
    renderListOfFriends(processingData(originList, dataState));
  });

  const inputSearchByName = document.getElementById("search-by-name");
  inputSearchByName.addEventListener("input", event => {
    dataState.searchFilter = event.target.value;
    renderListOfFriends(processingData(originList, dataState));
  });
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    resetSearchInput();
    resetSortButtons();
    renderListOfFriends(originList);
  });
};

getFriends
  .then(response => response.json())
  .then(data => {
    renderPageWithListeners(data.results);
  });

const processingData = (data, dataState) => {
  let outData = data.slice();
  if (dataState.searchFilter) {
    outData = outData.filter(({ name, email }) =>
      [name.first, name.last, email].join(" ").includes(dataState.searchFilter)
    );
  }
  if (dataState.sexFilter) {
    outData = outData.filter(({ gender }) => gender === dataState.sexFilter);
  }
  if (dataState.nameAsc) {
    outData.sort((a, b) => asc(a.name.first, b.name.first));
  }
  if (dataState.nameDesc) {
    outData.sort((a, b) => desc(a.name.first, b.name.first));
  }
  if (dataState.ageAsc) {
    outData.sort((a, b) => asc(a.dob.age, b.dob.age));
  }
  if (dataState.ageDesc) {
    outData.sort((a, b) => desc(a.dob.age, b.dob.age));
  }
  return outData;
};
