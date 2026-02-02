'use strict'

// The form will not submit unless data has changed
const form = document.querySelector("#updateForm")
form.addEventListener("change", function () {
  const updateBtn = document.querySelector("button")
  updateBtn.removeAttribute("disabled")
})