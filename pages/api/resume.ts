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
      email: "edosulai@icloud.com",
      website: "https://edosulai.github.io",
      phone: "(+62) 851 67 300 100",
      location: "Ragunan, Jakarta",
      linkedin: "https://linkedin.com/in/edosulaiman",
      whatsapp: "https://wa.me/6285167300100"
    },
    summary: "Full-Stack Engineer with 3+ years of experience building and optimizing banking-grade and finance-domain systems across frontend and backend layers. Strong in microservices, microfrontend, distributed contracts, secure payment workflows, and backend-heavy integrations. Currently focused on the BRI BRiSpot / BNS ecosystem, including protobuf standardization, service-boundary alignment, and backend microservices integration.",
    experience: [
      {
        title: "Full-Stack Engineer",
        company: "Bank Rakyat Indonesia (BRiSpot / BNS)",
        date: "January 2026 - Present",
        employment_type: "Contract",
        description: "Working on the BRiSpot new skin / BNS ecosystem across mobile-banking-adjacent and backend microservice environments, with contributions in centralized endpoint patterns, protobuf standardization, shared event contracts, and service-boundary alignment."
      },
      {
        title: "Golang Developer",
        company: "PT KB Finansia Multifinance (Kreditplus)",
        date: "July 2025 - January 2026",
        employment_type: "Contract",
        description: "Contributed to the Kreditplus migration phase, focusing on backend development, system optimization, observability improvements, and migration-related service refinement."
      },
      {
        title: "Golang Developer",
        company: "SIGMATECH",
        date: "July 2025 - January 2026",
        employment_type: "Contract",
        description: "Delivered Golang engineering work for the Kreditplus migration initiative in a contract-delivery capacity."
      },
      {
        title: "Full-Stack Engineer",
        company: "Bank Rakyat Indonesia",
        date: "May 2023 - July 2025",
        employment_type: "Contract",
        description: "As an IT Consultant and Full-Stack Engineer at Bank Rakyat Indonesia (BRI), working under Steradian Data Optima, I specialize in the development and improvement of the QCash platform, contributing to various projects that simplify financial transactions and payment systems."
      },
      {
        title: "Full-Stack Developer",
        company: "Steradian Data Optima",
        date: "May 2023 - July 2025",
        employment_type: "Full-time",
        description: "As one of the Full-Stack Engineers for the QLola Cash Management (QCash) project at Bank Rakyat Indonesia."
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
        name: "BRiSpot / BNS",
        date: "January 2026 - Present",
        technologies: ["Golang", "gRPC", "Protocol Buffers", "Kafka", "Kong API Gateway", "Docker", "React Native", "TypeScript", "Redux", "Datadog", "CodePush"],
        description: "BRiSpot / BNS is a BRI mobile-banking and backend microservices ecosystem where the main contribution area is contract alignment, protobuf standardization, and cleaner multi-repository integration patterns.",
        features: [
          "Centralized endpoint pattern through bns-api-catalog",
          "DTO to protobuf migration across services",
          "Shared event contracts through bns-event-contracts",
          "External service client alignment for CISO, Bristars, EDM, Zoloz, and OIDC"
        ]
      },
      {
        name: "Kreditplus",
        date: "July 2025 - January 2026",
        technologies: ["Golang", "RESTful API", "PostgreSQL", "MySQL", "SQL Server", "Redis", "Swagger", "Github", "Jenkins", "Grafana", "Postman"],
        description: "Kreditplus is a leading multi-finance company under KB Kookmin Card, providing consumer and corporate financing solutions such as electronics, automotive, and multipurpose loans. Through its digital ecosystem including Kreditplus Mobile (KPM), Kreditmu, and dealer platform Deasy, the company enables seamless credit applications and management.",
        features: [
          "Kreditplus - Loan Origination System (Database Migration from SQL Server/MySQL to PostgreSQL)",
          "Kreditplus - Kreditplus Mobile (Error Response Improvement & Observability)",
          "Kreditplus - Allocation For Insurance (Standardized Error Payloads & Tracing)"
        ]
      },
      {
        name: "QLola Cash Management",
        date: "May 2023 - July 2025",
        technologies: ["Next.js", "TailwindCSS", "Typescript", "Golang", "RESTful API", "gRPC", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Protocol Buffers", "Swagger", "MinIO", "Rundeck", "Bitbucket", "Bamboo", "OpenShift", "Fluent Bit", "Kibana", "Docker", "Konga", "Nexus Repository", "Nx Repository"],
        description: "QLola Cash Management, developed by Bank Rakyat Indonesia, is a comprehensive solution that helps companies efficiently manage their cash flow. It offers features like payment processing, account monitoring, and financial reporting, helping businesses optimize liquidity and minimize financial risks.",
        features: [
          "QCash - Main Page (Authentication System Migration)",
          "QCash - Mass Transfer (IFT, RTGS, Clearing, BI-Fast)",
          "QCash - International QCash (Internal Fund Transfer)",
          "QCash - International QCash (Mass Transaction)",
          "QCash - Multipayment (Pelindo)",
          "QCash - Payroll Transfer (GnuPG Encryption for Upload and Report Files)",
          "QCash - Payroll Transfer (External Fund Transfer)",
          "QCash - Payroll Transfer (Revamp UI and Migrate Micro Front-End)",
          "QCash - Payroll Transfer (FTP Bulk Upload & Report)",
          "QCash - Payroll Transfer (AES 128/256 Encryption for Upload and Report Files)",
          "QCash - Payroll Transfer (Logging Migration: logrus to zap + Fluentbit/Kibana)",
          "QCash - Payroll Transfer (Native Query Language Migration: GORM to native SQL)"
        ]
      },
      {
        name: "RainCast: Rainfall Forecasting Using LSTM Deep Learning Model",
        date: "2022",
        technologies: ["Deep Learning", "RNN", "LSTM", "Pandas", "NumPy", "TensorFlow", "WebSocket", "Time Series", "Python", "Django"],
        description: "Developed a rainfall forecasting system using Deep Learning with Long Short-Term Memory (LSTM) networks to analyze and predict rainfall patterns based on historical time series data. Integrated into a Django web application with WebSocket for real-time prediction interaction and hyperparameter tuning.",
        features: [
          "LSTM-based time series rainfall prediction model",
          "Real-time prediction interaction via WebSocket",
          "Hyperparameter tuning interface",
          "Prediction logs stored in database for evaluation"
        ]
      }
    ],
    skills: {
      front_end: ["Microfrontend (Module Federation)", "Typescript", "Next.js", "React.js (Zustand, React Query)", "React Native (Expo)", "Tailwind CSS", "Storybook", "CSS3", "Dart", "Flutter (Provider, BLoC)"],
      back_end: ["Microservice (RESTful API, gRPC)", "Golang (Gin, Gomux)", "Node.js (Express.js)", "Python (Django, TensorFlow)", "Rust", "PHP (Laravel)", "PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis", "Elasticsearch"],
      tools: ["Nx Repository", "Turborepo", "Swagger", "Protocol Buffers", "RabbitMQ", "Firebase", "Docker", "OpenShift Container Platform", "Bamboo", "Jenkins", "Github", "Bitbucket", "Git", "Bash", "AWS", "Google Cloud", "Nexus Repository", "MinIO", "Rundeck", "Kong (Konga)", "Kibana", "Fluent Bit", "Grafana", "Jira", "Confluence", "Figma", "Postman", "GitHub Copilot"]
    },
    languages: {
      indonesia: "Native Speaker",
      english: "Working Proficiency"
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
