import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export default function Classic({ data, accentColor = '#1a3a5c' }) {
  const { personal, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="template classic-template" style={{ '--accent': accentColor }}>
      <header className="classic-header">
        <div className="header-left">
          <h1 className="name">{personal.fullName || '姓名'}</h1>
          <h2 className="title">{personal.title || '职位'}</h2>
        </div>
        <div className="header-right">
          {personal.email && <span className="contact-item"><Mail size={14} /> {personal.email}</span>}
          {personal.phone && <span className="contact-item"><Phone size={14} /> {personal.phone}</span>}
          {personal.location && <span className="contact-item"><MapPin size={14} /> {personal.location}</span>}
          {personal.website && <span className="contact-item"><Globe size={14} /> {personal.website}</span>}
          {personal.github && <span className="contact-item"><ExternalLink size={14} /> {personal.github}</span>}
          {personal.linkedin && <span className="contact-item"><ExternalLink size={14} /> {personal.linkedin}</span>}
        </div>
      </header>

      <div className="classic-divider" />

      {personal.summary && (
        <section className="classic-section">
          <h3 className="section-title">个人简介</h3>
          <p className="summary-text">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="classic-section">
          <h3 className="section-title">工作经历</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-header">
                <div className="timeline-left">
                  <h4 className="item-title">{exp.position}</h4>
                  <span className="item-subtitle">{exp.company}</span>
                </div>
                <span className="timeline-date">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="item-description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="classic-section">
          <h3 className="section-title">教育背景</h3>
          {education.map((edu) => (
            <div key={edu.id} className="timeline-item">
              <div className="timeline-header">
                <div className="timeline-left">
                  <h4 className="item-title">{edu.school}</h4>
                  <span className="item-subtitle">{edu.degree} - {edu.major}</span>
                </div>
                <span className="timeline-date">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="classic-section">
          <h3 className="section-title">专业技能</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <div className="skill-header">
                  <span>{skill.name}</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${skill.level || 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="classic-section">
          <h3 className="section-title">项目经验</h3>
          {projects.map((proj) => (
            <div key={proj.id} className="timeline-item">
              <div className="timeline-header">
                <div className="timeline-left">
                  <h4 className="item-title">{proj.name}</h4>
                  <span className="item-subtitle">{proj.role}</span>
                </div>
              </div>
              <p className="item-description">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      <div className="classic-two-col">
        {certifications.length > 0 && (
          <section className="classic-section">
            <h3 className="section-title">证书</h3>
            <ul className="simple-list">
              {certifications.map((cert) => (
                <li key={cert.id}>{cert.name} <span className="list-date">{cert.date}</span></li>
              ))}
            </ul>
          </section>
        )}
        {languages.length > 0 && (
          <section className="classic-section">
            <h3 className="section-title">语言</h3>
            <ul className="simple-list">
              {languages.map((lang) => (
                <li key={lang.id}>{lang.name} - {lang.level}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
