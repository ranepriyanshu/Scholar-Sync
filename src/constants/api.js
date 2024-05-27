//  Host
// export const host = "http://192.168.26.43:8000";
// export const host = "http://172.20.10.5:8000";
// Backend deployed API
export const host = "https://scholar-sync-backend-3.onrender.com";
// https://scholar-sync-backend-3.onrender.com/

// User APIs
const user = `${host}/api/v1/user`;
export const registerUser = `${user}/register`;
export const login = `${user}/login`;
export const logout = `${user}/logout`;
export const getUserOfSameCollege = `${user}/getUserOfSameCollege`;

// Job APIs
const job = `${host}/api/v1/job`;
export const uploadOpenings = `${job}/uploadOpenings`;
export const getAllJobPost = `${job}/getAllJobPost`;
export const getJobsOfSameCollege = `${job}/getJobsOfSameCollege`;
export const getPreviousPost = `${job}/getPreviousPost`;
export const userAppliedOnJob = `${job}/userAppliedOnJob/`;

// Profile APIs
const profile = `${host}/api/v1/profile`;
export const uploadProfilePicture = `${profile}/uploadProfilePicture`;
export const addCertificate = `${profile}/addCertificate`;
export const addProject = `${profile}/addProject`;
export const addPosOfRes = `${profile}/addPosOfRes`;
export const addEducation = `${profile}/addEducation`;
export const addSkill = `${profile}/addSkill`;
export const addWorkExperience = `${profile}/addWorkExperience`;
export const viewProfile = `${profile}/viewProfile/`;
export const getNotification = `${profile}/getNotification`;
export const getProfileDetail = `${profile}/getProfileDetail`;

// Delete APIs
export const deleteCertificate = `${profile}/deleteCerticate/`;
export const deleteProject = `${profile}/deleteProject/`;
export const deletePosOfRes = `${profile}/deletePosOfRes/`;
export const deleteEducation = `${profile}/deleteEducation/`;
export const deleteWorkExperience = `${profile}/deleteWorkExperience/`;
export const deleteSkill = `${profile}/deleteSkill/`;

// Research Paper API
export const paper = `${host}/api/v1/machineLearning/getResearchPaper`;
