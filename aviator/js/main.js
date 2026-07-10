document.addEventListener('DOMContentLoaded', function () {
    onload = function () {
        close = document.querySelector('.modal__close');
        modal = document.querySelector('.modal');
        spinBtn = document.querySelector(".spinBtn");
        round = 0;
        close.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector(".modal").style.opacity = "0";
            modal.close();
        });
        spinBtn.addEventListener('click', Spin);

        Select();
    }

    function Select() {
        return;
    }

    function Spin(event) {
        let soundSpin1 = document.getElementById('spin1');
        let soundSpin2 = document.getElementById('spin2');
        let soundMusic = document.getElementById('music');

        switch (round) {
            case 0:
                event.preventDefault();
                event.stopPropagation();
                spinBtn.removeEventListener('click', Spin);
                document.querySelector(".wheel").classList.add("clicked");
                document.querySelector(".wheel__block").classList.add("wheel--activefirst");
                document.querySelector(".attempts__num").innerHTML = "1";

                soundSpin1.play();
                soundSpin2.volume = 0.3;
                soundSpin2.play();
                soundMusic.volume = 1;
                soundMusic.play();

                setTimeout(function () {
                    round++;
                    spinBtn.addEventListener('click', Spin);
                    document.querySelector(".wheel").classList.remove("clicked");
                    document.querySelector('.segment.seg6').classList.add('win');
                    document.querySelector('.segment.seg6').classList.add('win-try');
                    soundMusic.pause();
                }, 6500);
                break;
            case 1:
                event.preventDefault();
                event.stopPropagation();
                spinBtn.removeEventListener('click', Spin);
                document.querySelector(".wheel").classList.add("clicked");
                document.querySelector(".wheel__block").classList.add("wheel--activesecond");
                document.querySelector('.segment.seg6').classList.remove('win');
                document.querySelector('.segment.seg6').classList.remove('win-try');
                document.querySelector(".attempts__num").innerHTML = "0";
                soundSpin1.play();
                soundSpin2.volume = 0.3;
                soundSpin2.play();
                soundMusic.currentTime = 0;
                soundMusic.volume = 1;
                soundMusic.play();

                setTimeout(function () {
                    let winSeg = document.querySelector('.segment.seg7');
                    winSeg.classList.add('win');
                }, 6000);

                setTimeout(function () {
                    soundMusic.volume = 0.5;
                    let soundWin1 = document.getElementById('winsound');
                    soundWin1.play();
                    let soundWin2 = document.getElementById('chips');
                    soundWin2.volume = 0.6;
                    soundWin2.play();

                    modal.close();
                    modal.showModal();
                    document.querySelector(".modal").style.opacity = "1";
                    round++;
                    spinBtn.addEventListener('click', Spin);
                }, 8500);
                break;
            default:
                modal.close();
                modal.showModal();
                document.querySelector(".modal").style.opacity = "1";
        }
    }

    const timerElem = document.querySelector('.timer .timecells');
    const hourElem = document.querySelector('.cell.hour');
    const minElem = document.querySelector('.cell.min');
    const secElem = document.querySelector('.cell.sec');

    function initializeTimer() {
        let startTime = sessionStorage.getItem('startTime');
        let currentTime = Date.now();
        let endTime;

        if (startTime && currentTime < parseInt(startTime)) {
            endTime = parseInt(startTime);
        } else {
            let randomMinutes = Math.floor(Math.random() * (29 - 19 + 1)) + 25;
            let randomSeconds = Math.floor(Math.random() * 59);
            endTime = currentTime + randomMinutes * 60000 + randomSeconds * 1000;
            sessionStorage.setItem('startTime', endTime.toString());
        }

        updateTimer(endTime);
    }

    function updateTimer(endTime) {
        let timerInterval = setInterval(function () {
            let now = Date.now();
            let distance = endTime - now;

            if (distance < 0) {
                hourElem.textContent = '00';
                minElem.textContent = '00';
                secElem.textContent = '00';
                return;
            }

            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            hourElem.textContent = hours < 10 ? '0' + hours : hours;
            minElem.textContent = minutes < 10 ? '0' + minutes : minutes;
            secElem.textContent = seconds < 10 ? '0' + seconds : seconds;
            timerElem.classList.toggle('blink');
        }, 500);
    }

    initializeTimer();

    // UI animations
    setInterval(() => {
        document.querySelector('.plane')?.classList.add('on');
    }, 3000);
    setInterval(() => {
        document.querySelector('.plane2')?.classList.add('on');
    }, 4000);
    setInterval(() => {
        document.querySelectorAll('.cloud').forEach(cloud => cloud.classList.add('on'));
    }, 3000);
    setInterval(() => {
        document.querySelectorAll('.ystar').forEach(ystar => ystar.classList.add('on'));
    }, 3000);
    setInterval(() => {
        document.querySelectorAll('.girl').forEach(girl => girl.classList.add('on'));
    }, 1000);
});
