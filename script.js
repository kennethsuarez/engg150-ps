class NaiveBayes {
    constructor(alpha) {
        // set as 1 to resolve issues with 0 occurrences
        this.alpha = alpha 
    }

    // X - features, y - label
    fit(X, y) {

    }
}

class WordCount {
    get_vocab(docs, stop_words) {
        let vocab = {};

        docs.forEach(function(doc) {
            let words = doc.replace(/[.]/g, '').split(/\s/);
            words.forEach(function(word) {
                // filter stop words
                if (!stop_words.includes(word)) {
                    if (!vocab[word]) {
                        vocab[word] = 0;
                    }
                    vocab[word] += 1;
                }
            });
        });
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
]
let voltage_feedback = [
    "All of the current flowing through the circuit will go through R5, since it is not in parallel with anything. To find the current flowing through the circuit, we will need to first find the total equivalen resistance of the circuit.",
];
let data = new WordCount(1);

let capacitor_vocab = data.get_vocab(capacitor_feedback, stop_words);
let voltage_vocab = data.get_vocab(voltage_feedback, stop_words);

console.log(capacitor_vocab);
console.log(voltage_vocab);