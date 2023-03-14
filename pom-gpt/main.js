"use strict";

/***
 * @param ms time duration in millisecond.
 * @returns {Promise<unknown>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const form = document.getElementById("form")

/***
 * @param {Event} ev
 */
function handleSubmit(ev) {
    ev.preventDefault()
    const fd = new FormData(ev.target)
    renderMsg("assets/anon-avatar.jpg", fd.get("message"))
    renderMsg("assets/porpla.jpg", "ไม่รู้ๆ", true)

    form.reset()
}

form.addEventListener("submit", handleSubmit)

/***
 * @param {string} imgSrc
 * @param {string} msg
 * @param {boolean} displayOneCharAtATime
 */
function renderMsg(imgSrc, msg, displayOneCharAtATime = false) {
    const ctn = document.createElement("div")
    const inner = document.createElement("div")
    const img = document.createElement("img")
    const txt = document.createElement("div")

    txt.setAttribute("class", "message-inner-txt")
    inner.setAttribute("class", "message-inner")
    img.setAttribute("src", imgSrc)
    img.setAttribute("height", "32")
    img.setAttribute("width", "32")
    inner.append(img)
    inner.append(txt)
    ctn.append(inner)
    ctn.setAttribute("class", "message-container")

    if (displayOneCharAtATime) {
        setTimeout(async () => {
            for (const c of msg.split("")) {
                await sleep(100)
                txt.innerHTML += c;
            }
        }, 0)
    } else {
        txt.innerHTML = msg
    }

    const chat = document.getElementById("chat")
    chat.append(ctn)
}
