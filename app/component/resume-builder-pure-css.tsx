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
    objective: 'To secure an employment opportunity with an organisation, where I can utilize my professional skills and knowledge to the maximum and value in the growth of the organisation.',
    education: 'Master MBA in HR from BBSUL\nBachelor\'s in Bio Science, University of Karachi\nIntermediate from SMB Fatima Jinnah College Karachi\nMatriculation from Alpha girls/Boys School Karachi',
    skills: 'Ms Office, HTML, CSS, Typescript, Javascript, Next.js, Tailwind CSS',
    experience: 'Currently I am working in a Govt School.',
    certification: 'Artificial Intelligence, web 3.0 & Metaverse: From Governor House Karachi (ongoing)',
    linkedin: 'https://www.linkedin.com/in/jargina-chohan-5313a71aa?',
    facebook: 'https://www.facebook.com/Jargina.chohan509',
    instagram: 'https://www.instagram.com/jargina.chohan509?igsh=Z2tvNTlhaXhsa2Zi',
    github: 'https://github.com/JarginaChohan'
  });

  const [profilePicture, setProfilePicture] = useState<string>('/placeholder.svg?height=150&width=150');
  const [showSkills, setShowSkills] = useState(true);
  const resumeRef = useRef<HTMLDivElement>(null); // Type the ref as HTMLDivElement

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
          {/* Input fields and form code here */}
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
              {/* Resume preview content */}
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
