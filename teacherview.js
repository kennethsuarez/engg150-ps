const sendBtnStudent = document.querySelector(".send-button");
const chatBoxStudent = document.querySelector(".chat-box");
const studentQuestion = document.querySelector(".question-given-body");
const studentSolution = document.querySelector(".student-solution-body");
const itemBtn1 = document.querySelector("#item-btn-1");
const itemBtn2 = document.querySelector("#item-btn-2");

itemBtn1.addEventListener("click", function () {
    console.log("pass")
    studentQuestion.innerHTML = "If 60 J of energy are available for every 15 C of charge, what is the voltage?";
    studentSolution.innerHTML = "60 J / 15 C = 4 V";
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
    studentSolution.innerHTML = "";
    chatBoxStudent.innerHTML = ``;
});