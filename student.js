const sendBtnStudent = document.querySelector(".send-button");
const chatTextStudent = document.querySelector("#message-textarea");
const chatBoxStudent = document.querySelector(".chat-box-student");

function submitOnEnter(event){
    if(event.which === 13 && !event.shiftKey){
        event.preventDefault();
        sendMsg();
    }
}

function sendMsg(){
    chatBoxStudent.innerHTML += `
    <div class="chat-row">
        <div class="student-chat">
            ${chatTextStudent.value}
        </div>
    </div>
    `;
    chatBoxStudent.scrollTop = chatBoxStudent.scrollHeight;
    chatTextStudent.value = "";
}

chatTextStudent.addEventListener("keypress", submitOnEnter);

sendBtnStudent.onclick = () => {
    sendMsg()
}