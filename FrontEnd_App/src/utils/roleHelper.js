export const RoleLabels = {
    "1": "Admin",
    "2": "Cybercrime Specialist",
    "3": "Report Approver",
    "4": "Legal Counsel",
    "5": "Records Manager",
    "6": "Public Relations Officer",
    "7": "Training Officer",
    "8": "Field Officer",
    "9": "Case Manager",
    "10": "Security Analyst",
    "11": "Witness Protection Officer",
    "12": "Patrol Officer",
    "13": "Intelligence Analyst",
    "14": "Investigator",
    "15": "Forensic Analyst",
    "16": "Prosecutor",
    "17": "Financial Analyst",
    "18": "Evidence Custodian",
    "19": "Chief of Police",
    "20": "Detective",
    default: "User"
};

export const getRoleLabel = (roleId) => {
    return RoleLabels[roleId] || RoleLabels.default;
};
