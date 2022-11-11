const Main = {
    init() {
        this.cacheSelectors()
        this.bindEvents()
    },
    // Seleotor do cache
    cacheSelectors() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },
    // mapear eventos
    bindEvents() {
        const self = this
        self.$checkButtons.forEach(button => {
            button.addEventListener('click', self.Events.checkButton_click);
        }) // evento check

        self.$inputTask.onkeypress = self.Events.inputTask_keyPress.bind(this);


        self.$removeButtons.forEach(button => {
            button.addEventListener('click', self.Events.removeButtons_click)
        })
    },
    // Funções
    Events: {
        checkButton_click(e) {
            const $li = e.target.parentElement
            if ($li.classList.contains('done')) {
                return $li.classList.remove('done')
            } // else custa processamento, por isso, para-se no return
            
            $li.classList.add('done')
        },
        inputTask_keyPress(e) {
            const key = e.key
            const value = e.target.value
            if (key === 'Enter') {
                this.$list.innerHTML += `
                <li>
                    <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                    <button class="remove"></button>
                </li>
                `
                e.target.value = ''
                this.cacheSelectors()
                this.bindEvents()
            }
        },
        removeButtons_click(e) {
            let li = e.path[1]
            li.classList.add('removed')
            setTimeout(() => {
                li.classList.add('hidden')
            }, 300);
        }
    }
}

Main.init()