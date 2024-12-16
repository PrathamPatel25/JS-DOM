const btn = document.querySelector("#btn");
let isFriend = false;

function toggleFriend() {
  if (isFriend) {
    btn.innerText = "Remove Friend";
  } else {
    btn.innerText = "Add Friend";
  }
  isFriend = !isFriend;
}

btn.addEventListener("click", toggleFriend);
