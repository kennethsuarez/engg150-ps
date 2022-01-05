class FeatureSet {
    constructor() {
        this.vocab = {} // nk per word
        this.attributes = []
        this.n = 0 // number of words in class
        this.prob = {} // likelihood computation
    }
    generate_vocab(docs, stop_words) {
        let vocab = {};
        let attributes = [];
        let n = 0;
        docs.forEach(function(doc) {
            let words = doc.replace(/[.?,]/g, '').split(/\s/);
            words.forEach(function(word) {
                // filter stop words
                if (!stop_words.includes(word.toLowerCase())) {
                    if (!vocab[word]) {
                        vocab[word] = 0;
                        attributes.push(word)
                    }
                    vocab[word] += 1;
                }
            });
        });

        for (let key in vocab){
            n += vocab[key];
        }

        this.vocab = vocab;
        this.attributes = attributes;
        this.n = n;
    }
    generate_prob(V) {
        let prob = {};
        for (let key of V) {
            // (nk+1)/(n+|V|)
            if (!prob[key]) {    
                prob[key] = (0 + 1)/(this.n + V.length)
            } else {
                prob[key] = (this.vocab[key] + 1)/(this.n + V.length)
            }
        }

        this.prob = prob;
    }
}

const stop_words = [
    "a", "about", "above", "across", "after", "afterwards", 
    "again", "all", "almost", "alone", "along", "already", "also",    
    "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "as", "at", "be", "became", "because", "become","becomes", "becoming", "been", "before", "behind", "being", "beside", "besides", "between", "beyond", "both", "but", "by","can", "cannot", "cant", "could", "couldnt", "de", "describe", "do", "done", "each", "eg", "either", "else", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "find","for","found", "four", "from", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "i", "ie", "if", "in", "indeed", "is", "it", "its", "itself", "keep", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mine", "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next","no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part","perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "she", "should","since", "sincere","so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "take","than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they",
    "this", "those", "though", "through", "throughout",
    "thru", "thus", "to", "together", "too", "toward", "towards",
    "under", "until", "up", "upon", "us",
    "very", "was", "we", "well", "were", "what", "whatever", "when",
    "whence", "whenever", "where", "whereafter", "whereas", "whereby",
    "wherein", "whereupon", "wherever", "whether", "which", "while", 
    "who", "whoever", "whom", "whose", "why", "will", "with",
    "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves"
]

let capacitor_feedback = [
    "when the current through the capacitor is the same as when the capacitor is discharged.",
    "What is the total equivalent capacitance?"
]
let voltage_feedback = [
    "All of the current flowing through the circuit will go through R5, since it is not in parallel with anything. To find the current flowing through the circuit, we will need to first find the total equivalen resistance of the circuit.",
];

let capacitor = new FeatureSet();
let voltage = new FeatureSet();

capacitor.generate_vocab(capacitor_feedback, stop_words);
voltage.generate_vocab(voltage_feedback, stop_words);

let V = [...capacitor.attributes, ...voltage.attributes]; // all words

let data = "How much charge is on a capacitor if it stores 0.0075j of energy when it is connected to a 50V source?"

let words = data.replace(/[.?,]/g, '').split(/\s/);

let c = capacitor_feedback.length;
let v = voltage_feedback.length;
// classifying capacitor
let P_c = c / (c+v)
capacitor.generate_prob(V);
words.forEach(function(word) {
    if (!stop_words.includes(word.toLowerCase())) {
        if(V.includes(word)) {   
           
            P_c *= capacitor.prob[word];
        }
    }
})
console.log(P_c)

// classifying voltage
let P_v = v / (c+v)
voltage.generate_prob(V);
words.forEach(function(word) {
    if (!stop_words.includes(word.toLowerCase())) {
        if(V.includes(word)) {   
            P_v *= voltage.prob[word];
        }
    }
})
console.log(P_v)

// check if P_c > P_v

const sendBtn = document.querySelector(".submit-button");
const feedbackText = document.querySelector(".feedback-text");
const chatBox = document.querySelector(".chat-box");

function sendMsg(){
    chatBox.innerHTML += `
    <div class="chat-row">
        <div class="prof-chat">
            ${feedbackText.value}
        </div>
    </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
    feedbackText.value = "";
}

function submitOnEnter(event){
    if(event.which === 13 && !event.shiftKey){
        event.preventDefault();
        sendMsg();
    }
}

feedbackText.addEventListener("keypress", submitOnEnter);

sendBtn.onclick = () => {
    sendMsg()
}

const prevFeedbacks = document.querySelectorAll(".prev-chat")
prevFeedbacks.forEach(feedback => {
    feedback.onclick = () => {
        feedbackText.value = feedback.innerHTML.trim();
    }
  });