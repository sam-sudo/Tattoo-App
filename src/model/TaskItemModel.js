class TaskItemModel {


    id
    title 
    descriptiong
    date
    hourStart
    hourEnd
    position
    img
    color


    constructor(id, title , description, date, hourStart, hourEnd, position, img, color) {
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.hourStart = hourStart
        this.hourEnd = hourEnd
        this.position = position
        this.img = img
        this.color = color
    }

}

export { TaskItemModel }
