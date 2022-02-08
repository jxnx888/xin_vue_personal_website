var TxtType = function (el, txtData, period) {
    this.txtData = txtData;
    // this.el = el;
    this.el = el.getElementsByClassName('wrap')[0];
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.txtData.length;
    var fullTxt = this.txtData[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    if(this.txt.length == 0 || this.txt.length == fullTxt.length){
        this.el.classList.add("typewrite-cursor-anim")
    }
    else{
        this.el.classList.remove("typewrite-cursor-anim")
    }
    // console.log(this.txt, 'this.txt')
    this.el.innerHTML = this.txt;

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 1000;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    // onloadFn(); //如果不是es6 可直接调用该方法，但是因为vue 需要导出该方法并在外部调用
};
function onloadFn(){
    var elements = document.getElementsByClassName('typewrite-word');
    for (var i = 0; i < elements.length; i++) {
        var txtData = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (txtData) {
            if((typeof txtData) !== "object"){
                // 如果是i18n，语言是字符串，而不是数组，所以要转换成数组
                txtData = txtData.split("||")
            }
            new TxtType(elements[i], JSON.parse(txtData), period);
        }
    }
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".typewrite-word > .wrap { border-right: 0.08em solid #fff}";
    // document.body.appendChild(css);
}
export {onloadFn}
