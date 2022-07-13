let entryList = [];
let badList = [];

// 1. get the data on form submit
const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = formDt.get("hr");

  const obj = { task, hr };
  entryList.push(obj);
  display(entryList);
};

// 2. display entry list on the dom
const display = (taskArg) => {
  let str = "";

  taskArg.map((item, i) => {
    str += `  <tr>
    <td>
       ${item.task}
    </td>
    <td>${item.hr}hrs</td>
    <td class="text-end">
        <Button
        onclick="hadleOnDeleteEnrtyList(${i})"
        class="btn btn-danger"> <i class="fa-solid fa-trash-can "></i>
        </Button>

        <Button
        onclick="switchToBadList(${i})"
         class="btn btn-success"> <i class="fa-solid fa-arrow-right"></i> </Button>
    </td>
  </tr> 
  `;
  });

  document.getElementById("entryList").innerHTML = str;
};

// 3. delete item form entry list
const hadleOnDeleteEnrtyList = (i) => {
  // eslint-disable-next-line no-restricted-globals
  if (!confirm("Are you sure you want to delete this entry?")) {
    return;
  }

  const filteredArg = entryList.filter((item, index) => index !== i); // 5 !== 5

  entryList = filteredArg;
  display(entryList);
};

// 4. switch data from bad list to entry Lit
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

// display bad list on the dom

const badListDisplay = (arg) => {
  let str = "";

  arg.map((item, i) => {
    str += `
        <tr>
                         
        <td>
        ${item.task}
        </td>
        <td>${item.hr}hrs</td>
        <td class="text-end">
          <Button
          onclick="switchToEntryList(${i})"
          class="btn btn-warning"> <i class="fa-solid fa-arrow-left"></i> </Button>
          <Button class="btn btn-danger"> <i class="fa-solid fa-trash-can "></i></Button>
          
        </td>
      </tr>
        `;
  });

  document.getElementById("badList").innerHTML = str;
};

// switch data from bad list to entry Lit
const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);
  entryList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};
