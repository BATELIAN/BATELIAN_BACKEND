import { Schema, model } from "mongoose";

const Experience = new Schema({
    company: {
        type: String,
        
    },
    title: {
        type: String,
        
    },
    type: {
        type: String,
        

        // [ "FULL TIME | PART TIME | FULL TIME(ON_SITE) | PARTIME(REMOTE) | FREELANCE"]
    },
    startDate: {
        type: Date,
        

    },
    endDate: {
        type: Date
    },
    isCurrently: {
        type: Boolean
    },
    description: {
        type: String
    },
});

const Skills = new Schema({
    skills: {
        type: String,
        
    },
    level: {
        type: String,
        
        // [ "BEGINNER | INTERMIDATE | EXPERT ]
    },
    istopSkils: {
        type: Boolean
    }
});

const Education = new Schema({
    level: {
        type: String,
        // [ "DEGREE | MA | PHD ]
    },
    type: {
        type: String,
        // [ "ONLINE | REGULAR | EXTENSTION ]
    },
    institution: {
        type: String,
        // [ "FULL TIME | PART TIME | FULL TIME(ON_SITE) | PARTIME(REMOTE) | FREELANCE"]
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    isCurrently: {
        type: Boolean
    },
    field: {
        type: String,
    },
    files: {
        type: Array
    },
});

const Portfolio = new Schema({
    files: {
        type: Array,
    },
    title: {
        type: String,
        
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        
    },
    endDate: {
        type: Date
    },
    email:{
        type:String
    }
});

const Certfication = new Schema({
    title: {
        type: String,
        
    },
    issuedBy: {
        type: String,
        
    },
    files: {
        type: Array,
        
    },
    description: {
        type: String
    },
    issuedDate: {
        type: Date,
        
    },
});

const Interest = new Schema({
    opportunityType: {
        type: Array,
        default: []
    },
    awardCoverage: {
        type: Array,
        default: []
    },
    country: {
        type: Array,
        default: []
    },
    salaryType: {
        type: Array,
        default: []
    }
});

const ProfileSchema = new Schema({
    name: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",

    },
    city: {
        type: String,
        default: "",

    },
    bio: {
        type: String,
        default: "",

    },
    files: {
        type: Array,
        default: [],

    },
    birthDate: {
        type: Date,
    },
    linkedin: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: "",

    },
    userId: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "",
    },
    completion: {
        type: Number,
        default: 0
    },
    experience: [Experience],
    skills: [Skills],
    education: { type: [Education], default: [] },
    portfolio: [Portfolio],
    certfication: [Certfication],
    interest: [Interest]
});

export default model("Profile", ProfileSchema);
