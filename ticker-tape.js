class TickerTape extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._text = this.textContent;
        this._duration = parseInt(this.getAttribute('duration')) || 1000;
        this._tickerText = document.createElement('div');
        this._shadowRoot.appendChild(this._tickerText);
        this._tickerText.classList.add('ticker-text');
        this._currentIndex = 0;
        this._updateText();
    }

    connectedCallback() {
        this._timer = setInterval(() => {
            this._currentIndex = (this._currentIndex + 1) % this._text.length;
            this._updateText();
        }, this._duration);
    }

    disconnectedCallback() {
        clearInterval(this._timer);
    }

    _updateText() {
        this._tickerText.style.fontSize = '2em';
        this._tickerText.textContent = this._text.substring(this._currentIndex) + this._text.substring(0, this._currentIndex);
    }
}

customElements.define('ticker-tape', TickerTape);
