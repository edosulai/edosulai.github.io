type ContactInfo = {
  email: string;
  website: string;
  phone: string;
  location: string;
  linkedin: string;
  whatsapp: string;
};

type Experience = {
  title: string;
  company: string;
  date: string;
  employment_type: string;
  description: string;
};

type Project = {
  name: string;
  date: string;
  technologies: string[];
  description: string;
  features: string[];
};

type Skills = {
  front_end: string[];
  back_end: string[];
  tools: string[];
};

type Languages = {
  indonesia: string;
  english: string;
};

type Education = {
  university: string;
  years: string;
  degree: string;
  major: string;
  minor: string;
  gpa: string;
};

export type Resume = {
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  languages: Languages;
  education: Education;
};
