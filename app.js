$('document').ready(function () {

    const equal = $('#equalBtn');
    const del = $('#delBtn');
    const reset = $('#resetBtn');
    equal.click(getResult);
    del.click(removeInput);
    reset.click(resetInput);

    let isResult = false;
    let result = $('.result');
    // console.dir(result);
    let resLen = result.text().trim().length;
    let resText = result.text().trim();
    function resetInput() {
        result.html('');
        resLen = 0;
        resText = '';
    }
    function getResult() {
        if (isResult === false) {
            try {
                if(hasRepeatedMultiplication(resText)){
                    result.text("Error! SyntaxError: Invalid left-hand side expression in postfix operation");
                    return;
                }
                if (!Number.isInteger(parseFloat(eval(resText.replaceAll('x', '*'))))) {
                    resText = parseFloat(eval(resText.replaceAll('x', '*'))).toFixed(4);
                    resText = resText.toString();
                    if (resText !== NaN)
                        result.text(resText);
                }
                else {
                    resText = eval(resText.replaceAll('x', '*'));
                    resText = resText.toString();
                    if (resText !== NaN)
                        result.text(resText);
                }
            }

            catch (error) {
                resText = 'Error! ' + error;
                result.text(resText);
            }
        }
        isResult = true;
    }
    function removeInput() {
        if (isResult === false) {
            resLen = result.text().trim().length;
            resText = result.text().trim();
            result.text(resText.substring(0, resLen - 1));
            resLen = result.text().trim().length;
            resText = result.text().trim();
        }
    }
    function hasRepeatedMultiplication(str) {
        let patt = (/([x])\1/i);
        let result = patt.test(str);
        return result;
    }
    function isOperator(str) {
        switch (str) {
            case '+':
                return true;
            case '-':
                return true;
            case 'x':
                return true;
            case '*':
                return true;
            case '/':
                return true;
            default:
                return false;
        }
    }
    const buttons = $('button').not('#equalBtn, #resetBtn , #delBtn');
    
    buttons.click(function () {
        if (resText === '0' || (isResult === true && !isOperator(this.innerText))) {
            resText = '';
            result.text(resText);
            isResult = false;
        }
        resText += this.innerText;
        result.text(resText);
        isResult = false;
    })

    $(document).keydown(function (e) {
        if (!isNaN(e.key) || isOperator(e.key) || e.key === '.') {
            if (resText === '0' || (isResult === true && !isOperator(e.key))) {
                resText = '';
                result.text(resText);
                isResult = false;
            }
            resText += e.key;
            result.text(resText);
            isResult = false;
        }
        else if (e.key === 'Delete' || e.key === 'Backspace')
            removeInput();
        else if (e.key === '=' || e.key === 'Enter')
            getResult();
        else if (e.code === 'KeyR')
            resetInput();
    })

    const body = $('body');
    const circle = $('#circle');
    const circle1 = $('#circle1');
    const circle2 = $('#circle2');

    circle1.click(function () {
        circle.css('background-color', 'transparent');
        circle2.css('background-color', 'transparent');
        circle.css('cursor', 'pointer');
        circle1.css('background-color', 'var(--equal-circle-color)');
        body.removeClass('default');
        body.removeClass('Theme3');
        body.addClass('Theme2');
        equal.css('color', 'white');
    })

    circle2.click(function () {
        circle.css('background-color', 'transparent');
        circle1.css('background-color', 'transparent');
        circle.css('cursor', 'pointer');
        circle2.css('background-color', 'var(--equal-circle-color)');
        body.removeClass('default');
        body.removeClass('Theme2');
        body.addClass('Theme3');
        equal.css('color', 'hsl(198, 20%, 13%)');
    })

    circle.click(function () {
        circle1.css('background-color', 'transparent');
        circle2.css('background-color', 'transparent');
        circle.css('background-color', 'var(--equal-circle-color)');
        body.removeClass('Theme2');
        body.removeClass('Theme3');
        body.addClass('default');
        equal.css('color', 'white');
    })
})
