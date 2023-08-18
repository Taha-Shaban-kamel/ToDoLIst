const create = (tag = "div", options = {}, children = []) => {
  const node = Object.assign(document.createElement(tag), options);
  if (children.length) node.append(...children);
  return node;
};

const toDoList = {
  arr: localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")): [],
  el: document.querySelector("table#items tbody"),
  refresh() {
    [...toDoList.el.children].forEach((el) => el.remove());
    toDoList.el.append(
      ...toDoList.arr.map(({ task, date }, i) =>
        create("tr", {}, [
          create("td", { textContent: ++i }),
          create("td", { textContent: task }),
          create("td", { textContent: date }),
          create("td", {}, [create("button", { textContent: "Delete" })])
        ])
      )
    );
  }
};

document.querySelector("form#newItem").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = new FormData(e.target);
  const taskObj = Object.fromEntries([...input.entries()]);
  toDoList.arr.push(taskObj);
  toDoList.refresh();
  localStorage.setItem("items", JSON.stringify(toDoList.arr));
});

toDoList.el.addEventListener(
  "click",
  (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const index = [...toDoList.el.children].indexOf(btn.parentElement);
    toDoList.arr.splice(index, 1);
    toDoList.refresh();
    localStorage.setItem("items", JSON.stringify(toDoList.arr));
  },
  { passive: true }

    
);

document.querySelector(
  "form#newItem input[type='date']"
).min = new Date().toISOString().slice(0, 10);
toDoList.refresh();

console.log("i am here")