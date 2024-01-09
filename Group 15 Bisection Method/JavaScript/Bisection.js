let main = document.querySelector("main");

let inputs = main.querySelectorAll("input");
let enterBtn = main.querySelector(".input-container button");

let i = 1;
let fofx;
let x1;
let x2;
let tolerance;
let table;
let d = 4;

let spans = main.querySelectorAll(".outputs span");

enterBtn.addEventListener("click", () => {
    spans.forEach(span => {
        span.style.display = "block";
    })

    fofx = inputs[0].value;
    x1 = Number(inputs[1].value);
    x2 = Number(inputs[2].value);
    tolerance = Number(inputs[3].value);

    table = [["i", "$$x_1$$", "$$x_2$$", "$$f(x_1)$$", "$$f(x_2)$$", "$$x$$", "$$f(x)$$", "error"]];

    let final_answer = BisectionMethod_NEW(x1, x2);
    final_answer[1] = Chopper(final_answer[1], d);
    showAnswers(final_answer);

});

let maximum_interations = 50;

function BisectionMethod_NEW(a, b) {
    if (func(a) * func(b) >= 0) {
        return ["ERROR!Try another function or interval!", table];
    }

    let c = a;
    let i = 0;
    while ((b - a) >= tolerance) {
        c = (a + b) / 2;
        table.push([i, a, b, func(a), func(b), c, func(c), b - a]);
        if (func(c) == 0.0) {
            break;
        }
        else if (func(c) * func(a) < 0) {
            b = c;
        }
        else {
            a = c;
        }
        i++;
    }
    return ["Solved!", table];
}

function Chopper(table, d) {
    for (let g = 0; g < table.length; g++) {
        for (let f = 0; f < table[g].length; f++) {
            if (g != 0) {
                let value = table[g][f].toString();
                if (value.includes(".")) {
                    let chopindex = value.indexOf(".") + d + 1;
                    table[g][f] = value.slice(0, chopindex);
                }
            }
        }
    }

    return table;

}

function func(val) {
    return math.evaluate(fofx, { x: val });
}

let outputs = main.querySelectorAll(".output");

console.log(outputs);

function showAnswers(final_answer) {
    // remarks
    outputs[0].innerText = final_answer[0];

    let table = final_answer[1];

    // interations
    outputs[1].innerText = table[table.length - 1][0];

    // appoximated root
    outputs[2].innerText = table[table.length - 1][table[0].length - 3];

    // fofcn
    outputs[3].innerText = `= ${table[table.length - 1][table[0].length - 2]}`;

    // table
    showTable(table);

    MathJax.typeset();
}

function showTable(table) {
    outputs[4].innerHTML = "";

    let _table = document.createElement("table");
    for (let i = 0; i < table.length; i++) {
        let r = document.createElement("tr");
        for (let j = 0; j < table[i].length; j++) {
            let item = document.createElement("td");
            if (i == 0) {
                item.classList.toggle("column-name");
            };
            item.innerText = table[i][j];
            r.appendChild(item);
        }
        _table.appendChild(r);
    }
    outputs[4].appendChild(_table);
}

