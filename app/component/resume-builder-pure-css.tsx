"use client"
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
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
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px'
      }}>Interactive Resume Builder</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h2>Personal Information</h2>
          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <textarea
            name="objective"
            value={personalInfo.objective}
            onChange={handleInputChange}
            placeholder="Objective"
          ></textarea>
          {/* Add more input fields as needed */}
          
          <h2>Profile Picture</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {profilePicture && <img src={profilePicture} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}
        </div>

        <div>
          <div style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>Resume Preview</h2>
            <div ref={resumeRef} style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'white'
            }}>
              <h3>{personalInfo.firstName} {personalInfo.lastName}</h3>
              <p>{personalInfo.phone} | {personalInfo.email}</p>
              <p>{personalInfo.objective}</p>
              {showSkills && <p>Skills: {personalInfo.skills}</p>}
              {/* Add more resume content as needed */}
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <button onClick={() => setShowSkills(!showSkills)} style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              {showSkills ? 'Hide Skills' : 'Show Skills'}
            </button>
            <button onClick={generatePDF} style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
