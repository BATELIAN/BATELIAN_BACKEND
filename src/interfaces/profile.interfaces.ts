export interface Profile {
    userId: string,
    name: string,
    country: string,
    city: string;
    bio: string;
    files: string;
    birthDate: Date,
    linkedin: string,
    email: string,
    expierence: experience[],
    skills: skills[],
    education: education[],
    interest: interest[],
    portfolio: portfolio[],
    certfication: certfication[], 
    status: string, 
    completion: number, 
    
}

export interface interest {
    opportunityType: string[], 
    awardCoverage: string[],
    country: string[],
    salaryType: string[]
}
export interface experience {
    company: string,
    title: string,
    type: string;
    startDate: Date,
    endDate: Date,
    isCurrently: boolean,
    description: string
}
export interface skills {
    skills: string,
    level: string,
    istopSkills: boolean;
}
export interface education {
    level: string,
    type: string,
    institution: string;
    startDate: string
    endDate: string
    isCurrently: boolean,
    field: string, 
    files: []
}
export interface portfolio {
    title: string,
    link: string,
    files: string,
    description: string;
    startDate: string
    endDate: string
    
}
export interface certfication {
    title: string,
    issuedBy: string,
    files: [],
    description: string;
    issuedDate: Date    
}

