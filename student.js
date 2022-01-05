const sendBtnStudent = document.querySelector(".send-button");
const chatTextStudent = document.querySelector("#message-textarea");
const chatBoxStudent = document.querySelector(".chat-box-student");
const studentQuestion = document.querySelector(".question-given-body");
const itemBtn1 = document.querySelector("#item-btn-1");
const itemBtn2 = document.querySelector("#item-btn-2");

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

itemBtn1.addEventListener("click", function () {
    studentQuestion.innerHTML = "If 60 J of energy are available for every 15 C of charge, what is the voltage?";
    chatBoxStudent.innerHTML = `
    <div class="chat-row">
        <div class="student-chat">
             Aenean suscipit nunc nisl
        </div>
    </div>
    <div class="chat-row">
        <div class="prof-chat">
            ac semper dolor imperdiet quis.
        </div>
    </div>
    <div class="chat-row">
        <div class="student-chat">
            Proin ac enim
        </div>
    </div>
    `;
});

itemBtn2.addEventListener("click", function () {
    studentQuestion.innerHTML = "What is the total equivalent capacitance?";
    chatBoxStudent.innerHTML = ``;
});