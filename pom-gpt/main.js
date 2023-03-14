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

    const genRepMsg = randomReplyMsgGenerator()
    const fd = new FormData(ev.target)
    const userMsg = fd.get("message")

    renderMsg("assets/anon-avatar.jpg", userMsg)
    renderMsg("assets/porpla.jpg", genRepMsg(userMsg), true)

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
                await sleep(50)
                txt.innerHTML += c;
            }
        }, 0)
    } else {
        txt.innerHTML = msg
    }

    const chat = document.getElementById("chat")
    chat.append(ctn)
}

/***
 * Generate random Pom reply message generator.
 * @returns {(function(string): string)}
 */
function randomReplyMsgGenerator() {
    const quotes = [
        "ไม่รู้",
        "แฮร่!",
        "สิ่งที่ท่านพูดมาไม่เป็นความจริง",
        "ไม่รู้ ไม่ทราบ โว๊ะ!",
        "พูดแบบนี้มาชกกันดีกว่า",
        "ไม่คิดถึงข้าวแดงแกงร้อน",
        "ผมก็เคยถูกซ่อมจนหมดสติ แต่ผมมันไม่ตายไง",
        "ผมเป็นคนคิด ห้ามนั่งแค็บและท้ายรถกระบะ",
        "จำนำข้าวเสียหายกี่แสนล้าน เรือดำน้ำซื้อแค่หมื่นกว่าล้าน เงินหมื่นกว่าล้านซื้อเรือดำน้ำได้ 50 ลำเลยไหม ไม่มีอะไรเสียหายเลย เสียเงินไปแต่ได้ของมา แต่จำนำข้าวหายไปหมดไม่ถึงตัวประชาชน",
    ]

    return function (inputMsg) {
        if (inputMsg.match("[a-zA-Z]")) {
            return "ภาษาอังกฤษ ผมไม่รู้เรื่อง"
        }

        return quotes[Math.floor(Math.random() * quotes.length)]
    }
}