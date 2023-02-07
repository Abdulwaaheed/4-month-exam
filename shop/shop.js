if(!localStorage.getItem("token")){
window.location.replace("../index.html")
}
let main_section = document.querySelector("#main_section");
let search = document.querySelector("#search");
let paginationLink = document.querySelector(".paginationLink");
let card_count = document.querySelector("#card-count");
let aside = document.querySelector(".aside");
let asides = document.querySelector(".asides");
let modal = document.querySelector(".modals");
let xmarkD = document.querySelector("#xmarkD");
let bars = document.querySelector("#bars");
let asideX = document.querySelector("#asideX");
let mode = document.querySelector("#mode");
async function getData(num2) {
  try {
    let respone = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=html&startIndex=${num2}&maxResults=20&orderBy=newest`
    );

    let data = await respone.json();
    console.log(data);

    for (let i = 0; i < data.items.length; i++) {
      createCard(
        data.items[i].volumeInfo.title,
        data.items[i].volumeInfo.authors,
        data.items[i].volumeInfo.publishedDate,
        data.items[i].volumeInfo.imageLinks.thumbnail,
        data.totalItems,
        data.items[i].volumeInfo.previewLink,
        data.items[i].volumeInfo.publishedDate,
        data.items[i].volumeInfo.publisher,
        data.items[i].volumeInfo.categories,
        data.items[i].volumeInfo.pageCount,
        data.items[i].volumeInfo.description
      );
      let input = search.value;
    }
  } catch (error) {
    console.log(error);
  }
}
let ran = Math.floor(Math.random() * 40);
getData(ran);
console.log(ran);
function createCard(
  lang,
  author,
  sana,
  img,
  date,
  link,
  published,
  publisher,
  category,
  pagaCount,
  description
) {
  let sec_card = document.createElement("div");
  let rasm = document.createElement("img");
  let div = document.createElement("div");

  let langs = document.createElement("h5");
  let authors = document.createElement("span");
  let dates = document.createElement("p");
  let btns = document.createElement("div");
  let bookmarks = document.createElement("button");
  let info = document.createElement("button");
  let read = document.createElement("button");

  sec_card.classList.add("sec_card", "rounded-1", "shadow");
  dates.textContent = sana;
  card_count.textContent = date;
  authors.textContent = author;
  langs.textContent = lang;
  rasm.setAttribute("src", img);
  div.classList.add("mx-4");
  btns.classList.add("btns");
  btns.style.width = "90%";
  bookmarks.classList.add("btn", "bg-warning");
  bookmarks.style.width = "45%";
  bookmarks.textContent = "Bookmark";
  info.classList.add("btn", "bg-primary", "bg-opacity-10", "text-primary");
  info.style.width = "45%";
  info.textContent = "More info";
  read.classList.add("btn", "bg-secondary", "text-light");
  read.setAttribute("id", "readBtn");
  let readA = document.createElement("a");
  readA.setAttribute("href", link);
  readA.setAttribute("target", "_blank");
  readA.textContent = "Read";
  readA.style.textDecoration = "none";
  readA.style.color = "white";

  read.append(readA);
  sec_card.append(rasm);
  div.append(langs);
  div.append(authors);
  div.append(dates);
  sec_card.append(div);
  sec_card.append(btns);
  btns.append(bookmarks);
  btns.append(info);
  sec_card.append(read);
  main_section.append(sec_card);

  info.addEventListener("click", () => {
    modal.classList.toggle("activer");

    let modal_sec = document.createElement("div");
    modal_sec.classList.add("modal_section");

    let xicon = document.createElement("i");
    xicon.classList.add("fa-solid", "fa-xmark");
    xicon.setAttribute("id", "xmark");

    let mImg = document.createElement("img");
    mImg.setAttribute("src", img);

    let desc = document.createElement("p");
    desc.setAttribute("id", "desc");
    desc.textContent = description;
    let ul = document.createElement("ul");
    ul.classList.add("list");

    let liAuth = document.createElement("li");
    liAuth.textContent = `Author:  ${author}`;

    let liped = document.createElement("li");
    liped.textContent = `Published:  ${published}`;

    let liper = document.createElement("li");
    liper.textContent = `Publishers:  ${publisher}`;

    let cate = document.createElement("li");
    cate.textContent = `Categories:  ${category}`;

    let count = document.createElement("li");
    count.textContent = `Page Count:  ${pagaCount}`;

    let modalB = document.createElement("button");
    modalB.classList.add("btn");
    modalB.classList.add("btn-secondary");
    modalB.setAttribute("id", "modalBtn");
    let bA = document.createElement("a");
    bA.setAttribute("href", link);
    bA.setAttribute("target", "_blank");
    bA.textContent = "Read";
    bA.style.textDecoration = "none";
    bA.style.color = "white";

    modal_sec.append(xicon);
    modal_sec.append(mImg);
    modal_sec.append(desc);
    ul.append(liAuth);
    ul.append(liped);
    ul.append(liper);
    ul.append(cate);
    ul.append(count);
    modal_sec.append(ul);
    modalB.append(bA);
    modal_sec.append(modalB);
    modal.append(modal_sec);

    xicon.addEventListener("click", () => {
      modal.innerHTML = "";
      modal.classList.remove("activer");
    });
  });

  bookmarks.addEventListener("click", () => {
    let arr = [];
    let current = localStorage.setItem(
      "current",
      JSON.stringify({ author: author, title: lang, date: sana, image: img })
    );
    arr.push(current);

    let span = document.createElement("span");
    let cards = document.createElement("div");

    let user = document.createElement("div");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");
    let edit = document.createElement("div");
    let iBook = document.createElement("i");
    let idel = document.createElement("i");

    let a = document.createElement("a");
    a.setAttribute("href", link);
    a.setAttribute("target", "_blank");

    p.textContent = author;
    h5.textContent = lang;
    let classes = iBook.classList;
    classes.add("fa-solid");
    classes.add("fa-book-open");
    idel.classList.add("fa-solid");
    idel.classList.add("fa-delete-left");
    idel.setAttribute("id", "del");
    iBook.setAttribute("id", "read");
    edit.classList.add("edit");
    user.classList.add("user");
    cards.classList.add("cards", "rounded", "bg-opacity-10", "bg-secondary");
    cards.setAttribute("id", "card");
    // iBook.classList.add("fa-solid "," fa-book-open")

    span.textContent = 1;
    user.append(h5);
    user.append(p);
    a.append(iBook);
    edit.append(a);
    edit.append(idel);
    edit.append(span);
    cards.append(user);
    cards.append(edit);
    aside.append(cards);
    // span.innerText++;
    let aside_card = document.createElement("div");
    aside_card.classList.add("asides_card");

    let users = document.createElement("div");
    users.classList.add("user");
    let H5 = document.createElement("h5");
    H5.textContent = lang;

    let param = document.createElement("p");
    param.textContent = author;

    let edits = document.createElement("div");
    edits.classList.add("edit");
    let book = document.createElement("i");
    let idele = document.createElement("i");

    idele.classList.add("fa-solid");
    idele.classList.add("fa-delete-left");
    book.classList.add("fa-solid", "fa-book-open");
    idele.setAttribute("id", "del");
    book.setAttribute("id", "read");
    let bookA = document.createElement("a");
    bookA.setAttribute("href", link);
    bookA.setAttribute("target", "_blank");

    users.append(H5);
    users.append(param);
    bookA.append(book);
    edits.append(bookA);
    edits.append(idele);
    aside_card.append(users);
    aside_card.append(edits);
    asides.append(aside_card);
    idele.addEventListener("click", () => {
      aside_card.innerHTML = "";
      aside_card.style.border = "none";
    });

    idel.addEventListener("click", () => {
      cards.innerHTML = "";
    });
  });
}

let logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("../index.html");
});
let x = JSON.parse(localStorage.getItem("current"));
console.log(x);

asideX.addEventListener("click", () => {
  let dropdown = document.querySelector(".asides ");
  dropdown.style.display = "none";
});
bars.addEventListener("click", () => {
  let dropdown = document.querySelector(".asides ");
  dropdown.style.display = "block";
});

mode.addEventListener("click", () => {
  document.body.classList.toggle("sun");
});

let page_item1 = document.querySelector("#page1");
let page_item2 = document.querySelector("#page2");
let page_item3 = document.querySelector("#page3");
let page_item4 = document.querySelector("#page4");
let page_item5 = document.querySelector("#page5");

page_item1.addEventListener("click", () => {
  main_section.innerHTML = "";
  getData(Math.floor(Math.random() * 40));
  if (!page_item1.classList.contains("active")) {
    page_item1.classList.add("active");
    page_item2.classList.remove("active");
    page_item3.classList.remove("active");
    page_item4.classList.remove("active");
  } else {
    page_item1.classList.remove("active");
  }
});
page_item2.addEventListener("click", () => {
  main_section.innerHTML = "";
  getData(Math.floor(Math.random() * 40));
  if (!page_item2.classList.contains("active")) {
    page_item2.classList.add("active");
    page_item1.classList.remove("active");
    page_item3.classList.remove("active");
    page_item4.classList.remove("active");
  } else {
    page_item2.classList.remove("active");
  }
});
page_item3.addEventListener("click", () => {
  main_section.innerHTML = "";
  getData(Math.floor(Math.random() * 40));

  if (!page_item3.classList.contains("active")) {
    page_item3.classList.add("active");
    page_item1.classList.remove("active");
    page_item2.classList.remove("active");
    page_item4.classList.remove("active");
  } else {
    page_item3.classList.remove("active");
  }
});
page_item4.addEventListener("click", () => {
  main_section.innerHTML = "";
  getData(Math.floor(Math.random() * 40));
  if (!page_item4.classList.contains("active")) {
    page_item4.classList.add("active");
    page_item1.classList.remove("active");
    page_item3.classList.remove("active");
    page_item2.classList.remove("active");
  } else {
    page_item4.classList.remove("active");
  }
});
