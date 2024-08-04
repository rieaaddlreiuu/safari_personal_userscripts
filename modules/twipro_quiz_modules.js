class quizObject {
    statement;
    choices;
    correct_answer_number;
    constructor(statement, choice_list, correct_answer_number) {
        this.statement = statement;
        this.choices = choice_list;
        this.correct_answer_number = correct_answer_number;
    };
    outputQuizHtml() {
        let random_sequence = generateRandomSequence(this.choices.length);
        let choices_html = "";
        for (let i = 0; i < this.choices.length; i++) {
            if (this.correct_answer_number == random_sequence[i]) {
                choices_html = choices_html + `<span class="button019 correct_answer">
                <a>` + this.choices[random_sequence[i]] + `</a>
                </span>`;
            } else {
                choices_html = choices_html + `<span class="button019">
                <a>` + this.choices[random_sequence[i]] + `</a>
                </span>`;
            }
        }
        let show_answer_html = `
        <div class="button019 show_answer">
            <a>答えを見る</a>
            <div class="answer box1" style="display:none;">
            ` + /*this.choices[this.correct_answer_number]*/ `非表示です` + `
            </div>
        </div>
        `;
        let statement_html = `
        <div class="box1">
        ` + this.statement + `
        </div>
        `;
        return statement_html + choices_html + '<br>' + show_answer_html;
    };
};