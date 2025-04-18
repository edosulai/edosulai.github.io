import { Resume } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Resume>
) {
  res.status(200).json({
    name: "Edo Sulaiman",
    title: "Full-Stack Engineer",
    contact: {
      email: "edosulaii@gmail.com",
      website: "https://edosulai.github.io",
      phone: "+62 823-8600-7722",
      location: "Ragunan, Jakarta",
      linkedin: "https://linkedin.com/in/edosulaiman",
      whatsapp: "https://wa.me/6282386007722"
    },
    summary: "As a full-stack engineer with a focus on scalability and integration on the Qlola Cash Management project at Bank Rakyat Indonesia, I have honed my skills in both front-end and back-end development. My experience developing features such as mass transfers and encryption has enabled me to build efficient, high-performance solutions.",
    experience: [
      {
        title: "Full-Stack Engineer",
        company: "Bank Rakyat Indonesia",
        date: "May 2023 - Present",
        employment_type: "Contract",
        description: "As an IT Consultant Full Stack Engineer at Bank Rakyat Indonesia (BRI) under Steradian Data Optima, I specialize in the development and improvement of the QCash platform, contributing to various projects that simplify financial transactions and payment systems."
      },
      {
        title: "Full-Stack Developer",
        company: "Steradian Data Optima",
        date: "May 2023 - Present",
        employment_type: "Full-time",
        description: "As one of the fullstack engineers for the Qlola Cash Management (Qcash) project at Bank Rakyat Indonesia."
      },
      {
        title: "Full-Stack Developer",
        company: "Gharim Dev",
        date: "Feb 2022 - May 2023",
        employment_type: "Self-Employed",
        description: "As a freelance full-stack developer, I created full-stack web experiences for clients."
      }
    ],
    projects: [
      {
        name: "Qlola Cash Management",
        date: "2023 - Present",
        technologies: ["Next.js", "TailwindCSS", "Golang", "gRPC", "PostgreSQL", "Micro FE"],
        description: "Qlola Cash Management, developed by Bank Rakyat Indonesia, is a comprehensive solution for companies to efficiently manage their cash flow. It offers features like payment processing, account monitoring, and financial reporting, helping businesses optimize liquidity and minimize financial risks.",
        features: [
          "QCash - Main Page (Auth Page)",
          "QCash - Mass Transfer (IFT, RTGS, Clearing, BI - Fast)",
          "QCash - International QCash (Internal Fund Transfer)",
          "QCash - International QCash (Mass Transaction)",
          "QCash - Multipayment (Pelindo)",
          "QCash - Payroll Transfer (GnuPG Encrypt File)",
          "QCash - Payroll Transfer (Other Bank Transaction)",
          "QCash - Payroll Transfer (Revamp UI and Migrate MFE)",
          "QCash - Payroll Transfer (FTP Bulk Upload & Report)",
          "QCash - Payroll Transfer (AES 128 / 256 Encrypt File)"
        ]
      }
    ],
    skills: {
      front_end: ["Microfrontend", "Webpack 5", "Module Federation", "Typescript", "React.js", "Next.js", "HTML5", "Figma", "CSS3", "TailwindCSS", "Dart", "Flutter", "BLoC State"],
      back_end: ["Microservice", "API Protocol", "RESTful API", "gRPC", "Golang", "Gin", "Gomux", "Node.js", "Express.js", "NoSQL", "MongoDB", "Redis", "PHP", "Laravel", "SQL", "PostgreSQL", "MySQL", "Python", "Tensorflow"],
      tools: ["Scrum", "Jira", "Google Protocol Buffers", "Linux", "RabbitMQ", "Swagger", "Docker", "Bamboo", "Github", "Bitbucket", "AWS", "Google Cloud", "Nexus Repository", "IBM AS/400", "OpenShift OCP", "MinIO", "Postman", "Kong", "Konga", "Rundeck"]
    },
    languages: {
      indonesia: "Native Speaker",
      english: "Reading, Writing, Speaking (Not Fluent)"
    },
    education: {
      university: "University of Putra Indonesia YPTK Padang",
      years: "2018 - 2022",
      degree: "Bachelor of Computer Science",
      major: "Informatics Engineering",
      minor: "Artificial Intelligence | Deep Learning",
      gpa: "3.6"
    }
  })
}
