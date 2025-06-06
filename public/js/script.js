//Control Image Carousel
function startCarousel() {
  let activeImage = 0;
  const images = document.querySelectorAll("#carousel img");

  function cycleImages() {
    if (!images[activeImage]) {
      clearInterval(intervalId);
      return;
    }

    images[activeImage].classList.remove("active");
    activeImage = (activeImage + 1) % images.length;
    images[activeImage].classList.add("active");
  }

  let intervalId = setInterval(cycleImages, 3000);
}

//Handle Edit Requests
function editItem(id, name, description) {
  document.getElementById("updateId").value = id;

  document.getElementById("updateName").value = name;
  document.getElementById("updateDescription").value = description;

  document.getElementById("updateForm").action = `/item/update/${id}`;
  document.getElementById("updateForm").style.display = "block";
  document.getElementById("createForm").style.display = "none";
}

//Handle Delete Requests
async function deleteItem(id) {
  try {
    const response = await fetch(
      `https://demo-fullstack-demo.onrender.com/item/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Item deleted successfully");
      location.reload();
    } else {
      console.log("Failed to delete item");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

//Handle Errors from server if unable to write data (optional)
function checkForError() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("error")) {
    alert("Validation failed. Name and description are required.");
  }
}

window.onload = function () {
  startCarousel();
  checkForError();
};
