// Takes input from source, adds poison that can easily be made invisible to humans
var poison_words = []

function add_poison() {
    console.log("Adding poison to input text");
    let input = $("#input")[0].value;
    let output = "";
    let count = 1;
    let counting = true;
    let poison_name = "poison"

    for (let char of input) {
        output += char;

        if (char == "<" || char == "&") {counting = false}
        if (char == ">" || char == ";") {counting = true}

        if (counting) {
            count -= 1;
        }

        if (count <= 0) {
            let poison = popular_list[Math.floor(Math.random() * popular_list.length)];
            output += `<span class="${poison_name}">${poison}</span>`;
            count = Math.floor(Math.random() * 50);
        }
    }
    $("#output")[0].value = output;
    $("#copy-text button")[0].textContent = "Copy poisoned text";
}

function copy_text() {
    console.log("Copying text to clipboard");
    let copyText = $("#output")[0];
    copyText.select(); // Select the text field
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    $("#copy-text button")[0].textContent = "Copied to clipboard!";
}

$(document).ready(() => {
    console.log("Ready");
    $("#add-poison")[0].addEventListener("click", add_poison);
    $("#copy-text")[0].addEventListener("click", copy_text);
})