export interface Opportunity {
    title: string,
    description: string,
    offeredBy: string,
    deadline: Date,
    country: string,
    opportunityType: string, //INTERNSHIP | EDUCATION | WORK
    eligibleNationality: string,
    link: string,
    qualification: string,
    awardCoverage: string, // FULLY FUNDED | PARTIAL FUNDED | SELF FUNDED | OTHER
    salaryType: string // | PAID | UNPAID 
    acceptanceRate: string,
    status: string,
    files: []
}



    

