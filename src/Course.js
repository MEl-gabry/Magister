class Assignment {
    name;
    fAssignments;
    completed = false;
    constructor(name, fAssignments) {
        this.name = name;
        this.fAssignments = fAssignments;
    }
}

class Link {
    assignment;
    links = [];

    /**
     * @param {Assignment} assignment
     */
    constructor(assignment) {
        this.assignment = assignment;
    }
}

export class Course {
    name;
    enrolled; //boolean
    //Linked list of assignments
    constructor(name) {
        this.name = name;
    }
}

export class Student {
    name;
    courses; //Linked list of assignments
    constructor(name, courses) {
        this.name = name;
        this.courses = courses;
    }
}

export class Teacher {
    name;
    classroom = [];
    constructor(name, classroom) {
        this.name = name;
        this.classroom = classroom;
    }
}