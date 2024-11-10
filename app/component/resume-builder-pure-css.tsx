'use client'

import React, { useState, useRef } from 'react'
import Image from "next/image"
import { Linkedin, Facebook, Instagram, Github, Upload } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Jargina',
    lastName: 'Chohan',
    phone: '0336-2824083',
    email: 'jargina.chohan7@gmail.com',
    objective: 'To secure an employment opportunity with an organisation...',
    education: 'Master MBA in HR from BBSUL...',
    skills: 'Ms Office, HTML, CSS, Typescript...',
    experience: 'Currently I am working in a Govt School.',
    certification: 'Artificial Intelligence, web 3.0 & Metaverse...',
    linkedin: 'https://www.linkedin.com/in/jargina-chohan-5313a71aa?',
    facebook: 'https://www.facebook.com/Jargina.chohan509',
    instagram: 'https://www.instagram.com/jargina.chohan509?igsh=Z2tvNTlhaXhsa2Zi',
    github: 'https://github.com/JarginaChohan'
  });

  const [profilePicture, setProfilePicture] = useState<string>('/placeholder.svg?height=150&width=150');
  const [showSkills, setShowSkills] = useState(true);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePicture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Elegant Resume Builder</h1>
      <div className="grid">
        <div className="card form-card">
          <h2 className="card-title">Personal Information</h2>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="profilePicture" className="label">Profile Picture</label>
              <div className="file-input-wrapper">
                <input id="profilePicture" type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
                <label htmlFor="profilePicture" className="file-input-label">
                  <Upload className="icon" /> Upload Image
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="label">First Name</label>
                <input id="firstName" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} className="input" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="label">Last Name</label>
                <input id="lastName" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} className="input" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="label">Phone Number</label>
              <input id="phone" name="phone" value={personalInfo.phone} onChange={handleInputChange} className="input" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label">Email Address</label>
              <input id="email" name="email" type="email" value={personalInfo.email} onChange={handleInputChange} className="input" />
            </div>
            <div className="form-group">
              <label htmlFor="objective" className="label">Career Objective</label>
              <textarea id="objective" name="objective" value={personalInfo.objective} onChange={handleInputChange} className="textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="education" className="label">Education</label>
              <textarea id="education" name="education" value={personalInfo.education} onChange={handleInputChange} className="textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="skills" className="label">Skills</label>
              <textarea id="skills" name="skills" value={personalInfo.skills} onChange={handleInputChange} className="textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="experience" className="label">Work Experience</label>
              <textarea id="experience" name="experience" value={personalInfo.experience} onChange={handleInputChange} className="textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="certification" className="label">Certification</label>
              <textarea id="certification" name="certification" value={personalInfo.certification} onChange={handleInputChange} className="textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin" className="label">LinkedIn URL</label>
              <input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleInputChange} className="input" />
            </div>
            <div className="form-group">
              <label htmlFor="facebook" className="label">Facebook URL</label>
              <input id="facebook" name="facebook" value={personalInfo.facebook} onChange={handleInputChange} className="input" />
            </div>
            <div className="form-group">
              <label htmlFor="instagram" className="label">Instagram URL</label>
              <input id="instagram" name="instagram" value={personalInfo.instagram} onChange={handleInputChange} className="input" />
            </div>
            <div className="form-group">
              <label htmlFor="github" className="label">GitHub URL</label>
              <input id="github" name="github" value={personalInfo.github} onChange={handleInputChange} className="input" />
            </div>
          </div>
        </div>

        <div className="preview-section">
          <div className="card preview-card">
            <h2 className="card-title">Resume Preview</h2>
            <div className="preview-content" ref={resumeRef}>
              <div className="profile-section">
                <Image src={profilePicture} alt="Profile" className="profile-picture" width={128} height={128} />
                <h2 className="name">{personalInfo.firstName} {personalInfo.lastName}</h2>
                <p className="contact-info">{personalInfo.phone} | {personalInfo.email}</p>
              </div>
              <div className="resume-body">
                <section className="resume-section">
                  <h3 className="section-title">Career Objective</h3>
                  <p>{personalInfo.objective}</p>
                </section>
                <section className="resume-section">
                  <h3 className="section-title">Education</h3>
                  <p>{personalInfo.education}</p>
                </section>
                {showSkills && (
                  <section className="resume-section">
                    <h3 className="section-title">Skills</h3>
                    <p>{personalInfo.skills}</p>
                  </section>
                )}
                <section className="resume-section">
                  <h3 className="section-title">Work Experience</h3>
                  <p>{personalInfo.experience}</p>
                </section>
                <section className="resume-section">
                  <h3 className="section-title">Certification</h3>
                  <p>{personalInfo.certification}</p>
                </section>
                <section className="resume-section">
                  <h3 className="section-title">Contact</h3>
                  <div className="social-links">
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="social-icon linkedin" /></a>
                    <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="social-icon facebook" /></a>
                    <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="social-icon instagram" /></a>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><Github className="social-icon github" /></a>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="toggle-skills">
              <input
                type="checkbox"
                id="show-skills"
                checked={showSkills}
                onChange={(e) => setShowSkills(e.target.checked)}
                className="toggle-input"
              />
              <label htmlFor="show-skills" className="toggle-label">Show Skills</label>
            </div>
            <button onClick={generatePDF} className="download-button">
              Download CV
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5e3e6, #d9e4f5);
          padding: 2rem;
          font-family: 'Arial', sans-serif;
        }
        .title {
          font-size: 2.5rem;
          color: #333;
          text-align: center;
          margin-bottom: 2rem;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card-title {
          font-size: 1.5rem;
          color: #444;
          margin-bottom: 1rem;
        }
        .form-content, .preview-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .label {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 0.5rem;
        }
        .input, .textarea {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        .textarea {
          min-height: 100px;
          resize: vertical;
        }
        .file-input-wrapper {
          position: relative;
        }
        .file-input {
          position: absolute;
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          z-index: -1;
        }
        .file-input-label {
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: #f0f0f0;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .file-input-label:hover {
          background-color: #e0e0e0;
        }
        .preview-card {
          max-height: 80vh;
          overflow-y: auto;
        }
        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
        }
        .profile-picture {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .name {
          font-size: 1.8rem;
          color: #333;
          margin: 0.5rem 0;
        }
        .contact-info {
          font-size: 0.9rem;
          color: #666;
        }
        .resume-section {
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: 1.2rem;
          color: #444;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .social-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s;
        }
        .social-icon:hover {
          transform: scale(1.1);
        }
        .linkedin { color: #0077b5; }
        .facebook { color: #1877f2; }
        .instagram { color: #e4405f; }
        .github { color: #333; }
        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
        .toggle-skills {
          display: flex;
          align-items: center;
        }
        .toggle-input {
          margin-right: 0.5rem;
        }
        .toggle-label {
          font-size: 0.9rem;
          color: #555;
        }
        .download-button {
          padding: 0.5rem 1rem;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .download-button:hover {
          background-color: #3a7bc8;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}