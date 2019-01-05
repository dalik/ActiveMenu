class ActiveMenu {
    constructor(element, options = {}) {
        this.element = element

        this.defaults = {
            className:"is-active", 
            indent: 0
        }

        this.options = {
            ...this.defaults,
            ...options
        }

        this._coords = this._getCoords()


        //Handlers
        this.handleScroll = this.handleScroll.bind(this)
        this.handleReady = this.handleScroll.bind(this)

        //Events
        window.addEventListener('scroll',this.handleScroll)
        window.addEventListener("DOMContentLoaded",this.handleReady)
    }

    handleScroll() {
        this.setClass()
    }

    handleReady() {
        this.setClass()
    }

    setClass() {
        this.current_position = window.pageYOffset + this.options.indent
        this.elements = this._coords

        this.elements.forEach(element => {
            if (this.current_position >= element.top && this.current_position <= element.bottom) {
                document.querySelectorAll("nav a").forEach((link)=>{
                    link.classList.remove(this.options.className)
                })
                document.querySelector('a[href = "#' + element.id+'"]').classList.add(this.options.className)
            }
        })
    }

    _getCoords() {
        this.elements = document.querySelectorAll(this.element)
        this.filledElements = []

        this.elements.forEach(element => {
            let rect = element.getBoundingClientRect()
            this.filledElements.push({
                top: rect.top + window.pageYOffset,
                bottom: rect.top + window.pageYOffset + element.offsetHeight,
                id: element.getAttribute('id')
            })
        })

        return this.filledElements
    }

}


let activeMenu = new ActiveMenu("div",{indent: 58}) 

