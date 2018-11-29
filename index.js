const url = "https://randomuser.me/api/?results=10";
const futureData = fetch(url);
let workList;

function drawArrayOfFreinds(arrayOfFreinds) {
  let content = document.getElementById("content");
  content.innerHTML = "";
  arrayOfFreinds.forEach(friend => {
    let friendProfile = document.createElement("div");
    let image = document.createElement("img");
    image.setAttribute("src", friend.picture.medium);
    let par = document.createElement("p");
    par.textContent = `${friend.name.first} ${friend.name.last}`;
    friendProfile.append(par, image);
    content.append(friendProfile);
  });
}

const display = originArray => {
  console.log("draw");
  workList = [...originArray];
  drawArrayOfFreinds(originArray);
  let sortingByName = document.getElementById("sortByName");
  sortingByName.addEventListener("click", () =>
    drawArrayOfFreinds(
      workList.sort((a, b) => {
        if (a.name.first < b.name.first) {
          return -1;
        } else {
          return 1;
        }
      })
    )
  );
  let reset = document.getElementById("reset");
  reset.addEventListener("click", () => drawArrayOfFreinds(originArray));
};

futureData
  .then(response => response.json())
  .then(data => {
    display(data.results);
  });
