{
    const feed = {
      idx: Array.from(Array(51).keys()).splice(1),
      tick: document.getElementsByClassName('icon icon-correct circular-tick-holo md hydrated'),
      body: document.getElementsByClassName('bbcode'),
      response: {
        question: [],
        filtered_question: [],
      },
  
      question: function () {
        for (let i = 2; i < this.body.length; i++) {
          if (this.body[i].dataset.cy !== 'question-option-text') {
            if (this.body[i].innerText === 'No answer given') {
              continue;
              //console.log('New question should form beneath this.')
            } else {
              this.response.question.push(this.body[i].innerHTML);
            }
          }
        }
      },
      
      helper: function () {
        let nobr;
        const str = feed.response.question;
        //console.log(str);
        const filterer = {
            '&nbsp;': ' ',
            '<b>': '<test>'
        }

        for (let idx = 0; idx < str.length; idx++) {
            if (str[idx].includes(Object.keys(filterer)[0])) {
                //console.log(str[idx])
                nobr = str[idx].replace(/&nbsp;/g, ' ');
                //console.log(nobr);
                this.response.filtered_question.push(nobr);
            }
        }
      },
  
      get: function () {
        feed.question();
        feed.helper();
        for (let i = 0; i < this.idx.length; i++) {
          const questionOption = this.tick[i].previousSibling.children[0];
          const ionLabel = questionOption.offsetParent;
          if (ionLabel.nextElementSibling.ariaLabel === 'Missed correct option') {
            const correctLabel = ionLabel.children[0].children[0].innerText;
            const correctText = ionLabel.children[0].childNodes[1].childNodes[0].innerText;
            console.log('\n\n' + 'question: ', [...this.response.question][i], '\n\n' + 'Label - ' + correctLabel + "\n" + 'Text: ' + '\n' + correctText + '\n\n' + '#########################NEW QUESTION##########################');
            }
          }
      },
  
    }
    feed.get();
  }