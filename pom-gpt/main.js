"use strict";

const form = document.getElementById("form")

function handleSubmit(ev) {
    ev.preventDefault()
    const fd = new FormData(ev.target)
    console.log(fd.get("message"))
}

form.addEventListener("submit", handleSubmit)