'use client'

import React, { useState, useRef } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Elegant Resume Builder</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profilePicture" className="text-sm font-medium text-gray-700">Profile Picture</Label>
                <div className="flex items-center space-x-2">
                  <Input id="profilePicture" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button asChild variant="outline" className="w-full">
                    <label htmlFor="profilePicture" className="cursor-pointer flex items-center justify-center">
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </label>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                  <Input id="firstName" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} className="bg-white/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                  <Input id="lastName" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} className="bg-white/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective" className="text-sm font-medium text-gray-700">Career Objective</Label>
                <Textarea id="objective" name="objective" value={personalInfo.objective} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education" className="text-sm font-medium text-gray-700">Education</Label>
                <Textarea id="education" name="education" value={personalInfo.education} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills</Label>
                <Textarea id="skills" name="skills" value={personalInfo.skills} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-medium text-gray-700">Work Experience</Label>
                <Textarea id="experience" name="experience" value={personalInfo.experience} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certification" className="text-sm font-medium text-gray-700">Certification</Label>
                <Textarea id="certification" name="certification" value={personalInfo.certification} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">LinkedIn URL</Label>
                <Input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-sm font-medium text-gray-700">Facebook URL</Label>
                <Input id="facebook" name="facebook" value={personalInfo.facebook} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-sm font-medium text-gray-700">Instagram URL</Label>
                <Input id="instagram" name="instagram" value={personalInfo.instagram} onChange={handleInputChange} className="bg-white/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github" className="text-sm font-medium text-gray-700">GitHub URL</Label>
                <Input id="github" name="github" value={personalInfo.github} onChange={handleInputChange} className="bg-white/50" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-700">Resume Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={resumeRef} className="bg-white p-8 rounded-lg shadow-inner">
                  <div className="flex flex-col items-center mb-6">
                    <Image src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full mb-4 border-4 border-pink-200" width={128} height={128} />
                    <h2 className="text-3xl font-bold text-gray-800">{personalInfo.firstName} {personalInfo.lastName}</h2>
                    <p className="text-gray-600 mt-2">{personalInfo.phone} | {personalInfo.email}</p>
                  </div>
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-200 pb-2 mb-3">Career Objective</h3>
                      <p className="text-gray-600">{personalInfo.objective}</p>
                    </section>
                    <section>
                      <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-200 pb-2 mb-3">Education</h3>
                      <p className="text-gray-600 whitespace-pre-line">{personalInfo.education}</p>
                    </section>
                    {showSkills && (
                      <section>
                        <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-200 pb-2 mb-3">Skills</h3>
                        <p className="text-gray-600">{personalInfo.skills}</p>
                      </section>
                    )}
                    <section>
                      <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-200 pb-2 mb-3">Work Experience</h3>
                      <p className="text-gray-600">{personalInfo.experience}</p>
                    </section>
                    <section>
                      <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-200 pb-2 mb-3">Certification</h3>
                      <p className="text-gray-600">{personalInfo.certification}</p>
                    </section>
                    <section>
                      <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-200 pb-2 mb-3">Contact</h3>
                      <div className="flex justify-center space-x-6 mt-4">
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" /></a>
                        <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800" /></a>
                        <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-pink-600 hover:text-pink-800" /></a>
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><Github className="w-6 h-6 text-gray-800 hover:text-black" /></a>
                      </div>
                    </section>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-skills"
                  checked={showSkills}
                  onCheckedChange={setShowSkills}
                />
                <Label htmlFor="show-skills" className="text-sm font-medium text-gray-700">Show Skills</Label>
              </div>
              <Button onClick={generatePDF} variant="default" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600">
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}