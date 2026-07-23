import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export default function Minimal({ data, accentColor = '#2d2d2d' }) {
  const { personal, experience, education, skills, projects, certifications, languages, customSections = [] } = data;

  return (
    <div className="template minimal-template" style={{ '--accent': accentColor }}>
      <header className="minimal-header">
        <h1 className="minimal-name">{personal.fullName || '姓名'}</h1>
        <h2 className="minimal-title">{personal.title || '职位'}</h2>
        <div className="minimal-contacts">
          {personal.email && <span><Mail size={13} /> {personal.email}</span>}
          {personal.phone && <span><Phone size={13} /> {personal.phone}</span>}
          {personal.location && <span><MapPin size={13} /> {personal.location}</span>}
          {personal.website && <span><Globe size={13} /> {personal.website}</span>}
          {personal.github && <span><ExternalLink size={13} /> {personal.github}</span>}
          {personal.linkedin && <span><ExternalLink size={13} /> {personal.linkedin}</span>}
        </div>
      </header>

      <hr className="minimal-rule" />

      {personal.summary && (
        <section className="minimal-section">
          <p className="minimal-summary">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">经历</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="minimal-entry">
              <div className="minimal-entry-row">
                <strong>{exp.position}</strong>
                <span className="minimal-entry-org">{exp.company}</span>
                <span className="minimal-entry-date">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="minimal-entry-desc">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">教育</h3>
          {education.map((edu) => (
            <div key={edu.id} className="minimal-entry">
              <div className="minimal-entry-row">
                <strong>{edu.school}</strong>
                <span className="minimal-entry-org">{edu.degree} · {edu.major}</span>
                <span className="minimal-entry-date">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">技能</h3>
          <div className="minimal-skills">
            {skills.map((skill) => (
              <span key={skill.id} className="minimal-skill-tag">{skill.name}</span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">项目</h3>
          {projects.map((proj) => (
            <div key={proj.id} className="minimal-entry">
              <div className="minimal-entry-row">
                <strong>{proj.name}</strong>
                <span className="minimal-entry-org">{proj.role}</span>
              </div>
              <p className="minimal-entry-desc">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="minimal-bottom-row">
          {certifications.length > 0 && (
            <div className="minimal-section minimal-half">
              <h3 className="minimal-section-title">证书</h3>
              {certifications.map((cert) => (
                <div key={cert.id} className="minimal-entry">
                  <span className="minimal-entry-org">{cert.name} ({cert.date})</span>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div className="minimal-section minimal-half">
              <h3 className="minimal-section-title">语言</h3>
              {languages.map((lang) => (
                <div key={lang.id} className="minimal-entry">
                  <span className="minimal-entry-org">{lang.name} - {lang.level}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {customSections.map((cs) => (
        <section key={cs.id} className="minimal-section">
          <h3 className="minimal-section-title">{cs.title}</h3>
          {cs.items.map((item) => (
            <div key={item.id} className="minimal-entry">
              <div className="minimal-entry-row">
                <strong>{item.title}</strong>
                {item.subtitle && <span className="minimal-entry-org">{item.subtitle}</span>}
                {item.date && <span className="minimal-entry-date">{item.date}</span>}
              </div>
              {item.description && <p className="minimal-entry-desc">{item.description}</p>}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
