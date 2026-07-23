import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export default function Modern({ data, accentColor = '#4f46e5' }) {
  const { personal, experience, education, skills, projects, certifications, languages, customSections = [] } = data;

  return (
    <div className="template modern-template" style={{ '--accent': accentColor }}>
      <div className="modern-layout">
        <aside className="modern-sidebar">
          <div className="sidebar-avatar">
            {personal.photo ? (
              <img src={personal.photo} alt="头像" className="avatar-photo" />
            ) : (
              <div className="avatar-placeholder">
                {personal.fullName?.charAt(0) || '?'}
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">联系方式</h4>
            <div className="sidebar-contacts">
              {personal.email && <span><Mail size={13} /> {personal.email}</span>}
              {personal.phone && <span><Phone size={13} /> {personal.phone}</span>}
              {personal.location && <span><MapPin size={13} /> {personal.location}</span>}
              {personal.website && <span><Globe size={13} /> {personal.website}</span>}
              {personal.github && <span><ExternalLink size={13} /> {personal.github}</span>}
              {personal.linkedin && <span><ExternalLink size={13} /> {personal.linkedin}</span>}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="sidebar-section">
              <h4 className="sidebar-title">技能</h4>
              <div className="sidebar-skills">
                {skills.map((skill) => (
                  <div key={skill.id} className="sidebar-skill">
                    <div className="sidebar-skill-bar">
                      <div className="sidebar-skill-fill" style={{ width: `${skill.level || 0}%` }} />
                    </div>
                    <span className="sidebar-skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="sidebar-section">
              <h4 className="sidebar-title">语言</h4>
              <div className="sidebar-contacts">
                {languages.map((lang) => (
                  <span key={lang.id}>{lang.name} - {lang.level}</span>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="modern-main">
          <header className="modern-header">
            <h1 className="modern-name">{personal.fullName || '姓名'}</h1>
            <h2 className="modern-title">{personal.title || '职位'}</h2>
          </header>

          {personal.summary && (
            <section className="modern-section">
              <h3 className="modern-section-title"><span className="title-accent" />个人简介</h3>
              <p className="modern-summary">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="modern-section">
              <h3 className="modern-section-title"><span className="title-accent" />工作经历</h3>
              {experience.map((exp) => (
                <div key={exp.id} className="modern-item">
                  <div className="modern-item-header">
                    <h4>{exp.position} <span className="modern-company">@ {exp.company}</span></h4>
                    <span className="modern-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="modern-description">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="modern-section">
              <h3 className="modern-section-title"><span className="title-accent" />教育背景</h3>
              {education.map((edu) => (
                <div key={edu.id} className="modern-item">
                  <div className="modern-item-header">
                    <h4>{edu.school} <span className="modern-company">{edu.degree}</span></h4>
                    <span className="modern-date">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="modern-description">{edu.major}</p>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section className="modern-section">
              <h3 className="modern-section-title"><span className="title-accent" />项目经验</h3>
              {projects.map((proj) => (
                <div key={proj.id} className="modern-item">
                  <div className="modern-item-header">
                    <h4>{proj.name} <span className="modern-company">{proj.role}</span></h4>
                  </div>
                  <p className="modern-description">{proj.description}</p>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section className="modern-section">
              <h3 className="modern-section-title"><span className="title-accent" />证书</h3>
              <div className="modern-tags">
                {certifications.map((cert) => (
                  <span key={cert.id} className="modern-tag">{cert.name} ({cert.date})</span>
                ))}
              </div>
            </section>
          )}

          {customSections.map((cs) => (
            <section key={cs.id} className="modern-section">
              <h3 className="modern-section-title"><span className="title-accent" />{cs.title}</h3>
              {cs.items.map((item) => (
                <div key={item.id} className="modern-item">
                  <div className="modern-item-header">
                    <h4>{item.title} {item.subtitle && <span className="modern-company">{item.subtitle}</span>}</h4>
                    {item.date && <span className="modern-date">{item.date}</span>}
                  </div>
                  {item.description && <p className="modern-description">{item.description}</p>}
                </div>
              ))}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
