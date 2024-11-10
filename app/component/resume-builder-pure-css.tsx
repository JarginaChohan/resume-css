"use client"
import Image from "next/image"
import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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
  })
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg?height=150&width=150')
  const [showSkills, setShowSkills] = useState(true)
  const resumeRef = useRef(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generatePDF = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current).then((canvas:any) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('resume.pdf')
      })
    }
  }

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
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>Personal Information</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div>
              <label htmlFor="profilePicture" style={{display: 'block', marginBottom: '5px'}}>Profile Picture</label>
              <input id="profilePicture" type="file" accept="image/*" onChange={handleImageUpload} style={{width: '100%'}} />
            </div>
            <div>
              <label htmlFor="firstName" style={{display: 'block', marginBottom: '5px'}}>First Name</label>
              <input id="firstName" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="lastName" style={{display: 'block', marginBottom: '5px'}}>Last Name</label>
              <input id="lastName" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="phone" style={{display: 'block', marginBottom: '5px'}}>Phone Number</label>
              <input id="phone" name="phone" value={personalInfo.phone} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="email" style={{display: 'block', marginBottom: '5px'}}>Email Address</label>
              <input id="email" name="email" type="email" value={personalInfo.email} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="objective" style={{display: 'block', marginBottom: '5px'}}>Career Objective</label>
              <textarea id="objective" name="objective" value={personalInfo.objective} onChange={handleInputChange} style={{width: '100%', padding: '5px', minHeight: '100px'}} />
            </div>
            <div>
              <label htmlFor="education" style={{display: 'block', marginBottom: '5px'}}>Education</label>
              <textarea id="education" name="education" value={personalInfo.education} onChange={handleInputChange} style={{width: '100%', padding: '5px', minHeight: '100px'}} />
            </div>
            <div>
              <label htmlFor="skills" style={{display: 'block', marginBottom: '5px'}}>Skills</label>
              <textarea id="skills" name="skills" value={personalInfo.skills} onChange={handleInputChange} style={{width: '100%', padding: '5px', minHeight: '100px'}} />
            </div>
            <div>
              <label htmlFor="experience" style={{display: 'block', marginBottom: '5px'}}>Work Experience</label>
              <textarea id="experience" name="experience" value={personalInfo.experience} onChange={handleInputChange} style={{width: '100%', padding: '5px', minHeight: '100px'}} />
            </div>
            <div>
              <label htmlFor="certification" style={{display: 'block', marginBottom: '5px'}}>Certification</label>
              <textarea id="certification" name="certification" value={personalInfo.certification} onChange={handleInputChange} style={{width: '100%', padding: '5px', minHeight: '100px'}} />
            </div>
            <div>
              <label htmlFor="linkedin" style={{display: 'block', marginBottom: '5px'}}>LinkedIn URL</label>
              <input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="facebook" style={{display: 'block', marginBottom: '5px'}}>Facebook URL</label>
              <input id="facebook" name="facebook" value={personalInfo.facebook} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="instagram" style={{display: 'block', marginBottom: '5px'}}>Instagram URL</label>
              <input id="instagram" name="instagram" value={personalInfo.instagram} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
            <div>
              <label htmlFor="github" style={{display: 'block', marginBottom: '5px'}}>GitHub URL</label>
              <input id="github" name="github" value={personalInfo.github} onChange={handleInputChange} style={{width: '100%', padding: '5px'}} />
            </div>
          </div>
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
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Image src={profilePicture} alt="Profile" style={{width: '128px', height: '128px', borderRadius: '50%'}} />
                  <div>
                    <h3 style={{fontWeight: 'bold'}}>Career Objective</h3>
                    <p style={{fontSize: '14px'}}>{personalInfo.objective}</p>
                  </div>
                  <div>
                    <h3 style={{fontWeight: 'bold'}}>Certification</h3>
                    <p style={{fontSize: '14px'}}>{personalInfo.certification}</p>
                  </div>
                  <div>
                    <h3 style={{fontWeight: 'bold'}}>Contact Us</h3>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px'}}>
                      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                      <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  <div>
                    <h2 style={{fontSize: '24px', fontWeight: 'bold'}}>{personalInfo.firstName} {personalInfo.lastName}</h2>
                    <p>{personalInfo.phone} | {personalInfo.email}</p>
                  </div>
                  <div>
                    <h3 style={{fontWeight: 'bold'}}>Education</h3>
                    <p style={{fontSize: '14px', whiteSpace: 'pre-line'}}>{personalInfo.education}</p>
                  </div>
                  {showSkills && (
                    <div>
                      <h3 style={{fontWeight: 'bold'}}>Skills</h3>
                      <p style={{fontSize: '14px'}}>{personalInfo.skills}</p>
                    </div>
                  )}
                  <div>
                    <h3 style={{fontWeight: 'bold'}}>Work Experience</h3>
                    <p style={{fontSize: '14px'}}>{personalInfo.experience}</p>
                  </div>
                </div>
              </div>
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
  )
}