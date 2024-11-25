var input_ProductName = document.getElementById("productName");
var input_productPrice = document.getElementById("productPrice");
var input_productCategory = document.getElementById("productCategory");
var input_productDescription = document.getElementById("productDescription");
var input_productImage = document.getElementById("productImage");
// update and add card buttons
var addUpdateButton = document.getElementById("addUpdate");
var UpdateButton = document.getElementById("btnUpdate");
// for search input
var inputSearch = document.getElementById("inputSearch");
var array_list = [];
var current_index;
if (localStorage.getItem("product") !== null) {
  array_list = JSON.parse(localStorage.getItem("product"));
  display_Card();
}

function adding_Card() {
  if (input_ProductName.value) {
    var array_Object = {
      name: input_ProductName.value,
      price: input_productPrice.value,
      category: input_productCategory.value,
      description: input_productDescription.value,
      image: input_productImage.files[0]
        ? `images/${input_productImage.files[0]?.name}`
        : "images/2.jpg",
    };
    array_list.push(array_Object);
    localStorage.setItem("product", JSON.stringify(array_list));

    display_Card();
    // to clear the inputs after adding the card
    clear_inputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}

function display_Card() {
  var cartona = "";
  for (var i = 0; i < array_list.length; i++) {
    cartona += `<div class="col">
            <div class="card">
              <img class="card-img-top" src= ${array_list[i].image} alt=${array_list[i].name} />
              <div class="card-body">
                <span class="badge bg-info">Index: ${i}</span>
                <h3 class="card-title h6">ProductName: ${array_list[i].name}</h3>
                <div class="d-flex flex-column gap-2">
                  <span class="card-text small">ProductPrice:  ${array_list[i].price}</span>
                  <span class="card-text small">productCategory:  ${array_list[i].category}</span>
                  <span class="card-text small">productDescription:  ${array_list[i].description}.</span>
                </div>
              </div>
              <div class="card-footer text-center d-flex gap-2 justify-content-center">
                <button onclick="clear_item(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                <button onclick="recale_Item(${i})" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
              </div>
            </div>
          </div>
`;
  }
  document.getElementById("row_container").innerHTML = cartona;
}

function clear_inputs() {
  input_ProductName.value = "";
  input_productPrice.value = "";
  input_productCategory.value = "";
  input_productDescription.value = "";
  input_productImage.value = "";
}

function clear_item(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      array_list.splice(index, 1);
      localStorage.setItem("product", JSON.stringify(array_list));
      display_Card();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
function recale_Item(index) {
  input_ProductName.value = array_list[index].name;
  input_productPrice.value = array_list[index].price;
  input_productCategory.value = array_list[index].category;
  input_productDescription.value = array_list[index].description;
  // input_productImage.value = array_list[index].image;
  addUpdateButton.classList.add("d-none");
  UpdateButton.classList.remove("d-none");
  current_index = index;
}
function updateItem() {
  addUpdateButton.classList.remove("d-none");
  UpdateButton.classList.add("d-none");
  array_list[current_index].name = input_ProductName.value;
  array_list[current_index].price = input_productPrice.value;
  array_list[current_index].category = input_productCategory.value;
  array_list[current_index].description = input_productDescription.value;
  // array_list[current_index].image = input_productImage.value;
  display_Card();
  clear_inputs();
}

function search_product() {
  var input_text = inputSearch.value;
  var cartona = "";

  for (var i = 0; i < array_list.length; i++) {
    if (array_list[i].name.toLowerCase().includes(input_text.toLowerCase())) {
      cartona += `<div class="col">
              <div class="card">
                <img class="card-img-top" src= ${array_list[i].image} alt=${array_list[i].name} />
                <div class="card-body">
                  <span class="badge bg-info">Index: ${i}</span>
                  <h3 class="card-title h6">ProductName: ${array_list[i].name}</h3>
                  <div class="d-flex flex-column gap-2">
                    <span class="card-text small">ProductPrice:  ${array_list[i].price}</span>
                    <span class="card-text small">productCategory:  ${array_list[i].category}</span>
                    <span class="card-text small">productDescription:  ${array_list[i].description}.</span>
                  </div>
                </div>
                <div class="card-footer text-center d-flex gap-2 justify-content-center">
                  <button onclick="clear_item(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                  <button onclick="recale_Item(${i})" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
                </div>
              </div>
            </div>
  `;
    }
  }
  document.getElementById("row_container").innerHTML = cartona;
}
