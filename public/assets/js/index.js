if (window.location.pathname === "/notes") {
  const listGroup = document.querySelector(".list-group");
  const noteTitleInput = document.querySelector(".note-title");
  const noteTextInput = document.querySelector(".note-textarea");
  const saveBtn = document.querySelector(".save-note");
  const newNote = document.querySelector(".new-note");

  // NEW NOTE
  newNote.addEventListener("click", () => {
    noteTextInput.value = "";
    noteTitleInput.value = "";
  });

  // GET AND DISPLAY NOTES
  const getNotes = () => {
    fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayNotes(data);
      });
  };

  // DISPLAY NOTE
  const displayNotes = async (data) => {
    const notelist = data
      .map((note) => {
        const { title, text, id } = note;
        return `<li class="note-list">${title} <span ><i class="fa-solid fa-trash-can delete-btn"  data-id=${id}></i><span/><li/>`;
      })
      .join("");
    listGroup.innerHTML = notelist;

    // GET SINGLE NOTE
    const noteLists = document.querySelectorAll(".note-list");
    console.log(noteLists);
    noteLists.forEach((note) => {
      note.addEventListener("click", (e) => {
        nt = e.target;
        const id = nt.firstElementChild.firstElementChild.dataset.id;
        console.log(id);

        fetch(`https://note-taker-tw.herokuapp.com/api/all/notes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const { text, title } = data;
            noteTextInput.value = text;
            noteTitleInput.value = title;
            console.log(data);
          });
      });
    });
  };

  //ADD NOTE
  const addNotes = () => {
    const data = {
      title: noteTitleInput.value,
      text: noteTextInput.value,
    };
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      getNotes();
    });
  };

  // SAVE NOTE
  saveBtn.addEventListener("click", async () => {
    await addNotes();
    noteTextInput.value = "";
    noteTitleInput.value = "";
    saveBtn.style.display = "none";
  });

  // SHOW SAVE BUTTON
  const showSaveBtn = () => {
    if (noteTextInput.value == "" || noteTitleInput.value == "") {
      saveBtn.style.display = "none";
    } else {
      saveBtn.style.display = "inline";
    }
  };

  noteTitleInput.addEventListener("keyup", showSaveBtn);
  noteTextInput.addEventListener("keyup", showSaveBtn);

  // DELETE NOTE

  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getNotes();
    });

  listGroup.addEventListener("click", async (e) => {
    const el = e.target;
    if (el.classList.contains("delete-btn")) {
      const id = el.dataset.id;
      console.log(id);
      await deleteNote(id);
    }
  });

  getNotes();
}
