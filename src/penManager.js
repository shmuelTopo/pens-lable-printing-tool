import { Command } from '@tauri-apps/api/shell';
import { exists, readDir, createDir, removeDir, BaseDirectory } from '@tauri-apps/api/fs';

let selectionIdCounter = 1

export default class PensManager {

    constructor() {
        this.selectedPens = []
        this.submitedPens = []
    }
   

    async setFolder(inputFolder) {
        this.inputFolder = inputFolder
        if (!inputFolder) {
            throw new Error('Please enter a proprer folder')
        }
        const entries = await readDir(inputFolder.path, { recursive: false });
        this.penNames = entries.map((entrie) => entrie.name);
        
        await createDir(inputFolder.path + "\\.gmg-tag-png", { recursive: true });
        const command = new Command('hide folder', ["+h", `${inputFolder.path}\\.gmg-tag-png`])
        command.spawn()
        return this.penNames
    }

    addToCart() {
        this.submitedPens.push(...this.selectedPens)
        this.selectedPens.length = 0
    }

    async clearCache() {
        const isDir = await exists(this.inputFolder.path + '\\.gmg-tag-png')
        if(!isDir) return
        await removeDir(this.inputFolder.path + '\\.gmg-tag-png', {recursive: true})
    }

    async addPen(id, penName) {
        if (!this.penNames) {
            throw new Error('Please set the folder before adding pens')
        }
        const inputPath = `${this.inputFolder.path}\\${id}`
        const baseOutputPath = this.inputFolder.path + '\\.gmg-tag-png'
        await createDir(`${baseOutputPath}\\${id}`, { dir: BaseDirectory.Downloads, recursive: true });
        
        const outputPath = `${baseOutputPath}\\${id}`

        const entries = await readDir(inputPath, { recursive: false });
        const images = []
        await Promise.all(entries.map(async entrie => {
            try {
                if(!entrie.name.toLowerCase().endsWith('eps')) return
                const outputImagePath = `${outputPath}\\${entrie.name.slice(0, -4)}.png`
                const command = new Command('convert', ['convert', '-density', '600x600', `${inputPath}\\${entrie.name}`, outputImagePath])
                await command.spawn()
                images.push(`https://asset.localhost/${outputImagePath}`)
            } catch (e) {
                console.error(e)
            }
        }))
        const pen = new Pen(images, id, selectionIdCounter++, penName)
        this.selectedPens.push(pen)
        return pen
    }

    removePenFromSelection(pen) {
        let index = this.selectedPens.indexOf(pen)
        if (index >= 0) { this.selectedPens.splice(index, 1) }
    }

    removePenFromCart(pen) {
        const index = this.submitedPens.indexOf(pen)
        if (index >= 0) { this.submitedPens.splice(index, 1) }
    }
}

class Pen {
    constructor(images, id, selectionId, penName) {
        this.id = id
        this.penNmae = penName
        this.images = images
        this.quantity = 1
        this.selectionId = selectionId
        this.imageIndex = 0
        this.imgSrc = this.images[this.imageIndex]
        this.fetchFromLocalStorage()
    }

    add() {
        this.quantity++
    }

    substract() {
        this.quantity--
        if (this.quantity <= 0) {
            this.quantity = 1
        }
    }

    setPenName(penName) {
        this.penName = penName
        this.saveStateToLocalStorage()
    }

    setFontSize(fontSize) {
        this.fontSize = fontSize
        this.saveStateToLocalStorage()
    }

    getSelectedImage() {
        return this.images[this.imageIndex]
    }

    setImageIndex(index) {
        if(index < 0 || index >= this.images.length) {
            throw new Error('The index you entered for is not in the range of 0 and', this.images.length-1 )
        }
        this.imageIndex = index
        this.saveStateToLocalStorage()
    }

    saveStateToLocalStorage() {
        const pens = JSON.parse(localStorage.getItem('gmg-pens-dataset'))
        pens[this.id] = {penName: this.penName, imageIndex: this.imageIndex, fontSize: this.fontSize, imgSrc: this.getSelectedImage()}
        localStorage.setItem('gmg-pens-dataset', JSON.stringify(pens))
    }

    fetchFromLocalStorage() {
        const pens = JSON.parse(localStorage.getItem('gmg-pens-dataset'))
        if(!pens) {
            localStorage.setItem('gmg-pens-dataset', JSON.stringify({}))
            return
        }

        const thePen = pens[this.id]
        if(!thePen) return

        this.penName = thePen.penName
        this.imageIndex = thePen.imageIndex
        this.fontSize = thePen.fontSize
    }
}