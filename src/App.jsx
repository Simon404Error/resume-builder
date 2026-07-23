import { useState, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { exportToPDF } from './utils/pdfExport';
import { defaultResume } from './data/defaultResume';
import './App.css';

function App() {
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem('resume-data');
      return saved ? JSON.parse(saved) : defaultResume;
    } catch {
      return defaultResume;
    }
  });

  const [template, setTemplate] = useState(() => localStorage.getItem('resume-template') || 'classic');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('resume-accent') || '#1a3a5c');
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('resume-fontsize')) || 14);
  const [sectionVisibility, setSectionVisibility] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('resume-visibility')) || {
        experience: true,
        education: true,
        skills: true,
        projects: true,
        certifications: true,
        languages: true,
      };
    } catch {
      return { experience: true, education: true, skills: true, projects: true, certifications: true, languages: true };
    }
  });

  const updateResume = useCallback((newResume) => {
    setResume(newResume);
    localStorage.setItem('resume-data', JSON.stringify(newResume));
  }, []);

  const handleTemplateChange = useCallback((t) => {
    setTemplate(t);
    localStorage.setItem('resume-template', t);
  }, []);

  const handleAccentChange = useCallback((c) => {
    setAccentColor(c);
    localStorage.setItem('resume-accent', c);
  }, []);

  const handleFontSizeChange = useCallback((s) => {
    setFontSize(s);
    localStorage.setItem('resume-fontsize', String(s));
  }, []);

  const handleToggleSection = useCallback((key) => {
    setSectionVisibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('resume-visibility', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleToggleAllSections = useCallback(() => {
    setSectionVisibility((prev) => {
      const allVisible = Object.values(prev).every(Boolean);
      const next = {};
      Object.keys(prev).forEach((k) => { next[k] = !allVisible; });
      localStorage.setItem('resume-visibility', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleExport = useCallback(async () => {
    await exportToPDF('resume-preview', `${resume.personal.fullName || 'resume'}.pdf`);
  }, [resume.personal.fullName]);

  const handleReset = useCallback(() => {
    if (window.confirm('确定要恢复为默认简历数据吗？当前修改将丢失。')) {
      setResume(defaultResume);
      localStorage.removeItem('resume-data');
    }
  }, []);

  // Filter resume data based on visibility
  const visibleResume = {
    ...resume,
    experience: sectionVisibility.experience ? resume.experience : [],
    education: sectionVisibility.education ? resume.education : [],
    skills: sectionVisibility.skills ? resume.skills : [],
    projects: sectionVisibility.projects ? resume.projects : [],
    certifications: sectionVisibility.certifications ? resume.certifications : [],
    languages: sectionVisibility.languages ? resume.languages : [],
  };

  return (
    <div className="app">
      <Toolbar
        template={template}
        setTemplate={handleTemplateChange}
        accentColor={accentColor}
        setAccentColor={handleAccentChange}
        fontSize={fontSize}
        setFontSize={handleFontSizeChange}
        onExport={handleExport}
        onReset={handleReset}
        sectionVisibility={sectionVisibility}
        onToggleAllSections={handleToggleAllSections}
      />
      <div className="main-content">
        <aside className="form-panel">
          <ResumeForm
            resume={resume}
            onChange={updateResume}
            sectionVisibility={sectionVisibility}
            onToggleSection={handleToggleSection}
          />
        </aside>
        <main className="preview-panel">
          <ResumePreview
            resume={visibleResume}
            template={template}
            accentColor={accentColor}
            fontSize={fontSize}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
