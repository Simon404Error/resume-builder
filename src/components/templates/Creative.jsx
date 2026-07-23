import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export default function Creative({ data, accentColor = '#e85d75' }) {
  const { personal, experience, education, skills, projects, certifications, languages, customSections = [] } = data;

  return (
    <div className="template creative-template" style={{ '--accent': accentColor }}>
      <div className="creative-top-banner">
        <div className="creative-banner-content">
          {personal.photo && (
            <div className="creative-photo">
              <img src={personal.photo} alt="头像" />
            </div>
          )}
          <h1 className="creative-name">{personal.fullName || '姓名'}</h1>
          <h2 className="creative-title">{personal.title || '职位'}</h2>
          <div className="creative-contacts">
            {personal.email && <span><Mail size={14} /> {personal.email}</span>}
            {personal.phone && <span><Phone size={14} /> {personal.phone}</span>}
            {personal.location && <span><MapPin size={14} /> {personal.location}</span>}
            {personal.website && <span><Globe size={14} /> {personal.website}</span>}
            {personal.github && <span><ExternalLink size={14} /> {personal.github}</span>}
            {personal.linkedin && <span><ExternalLink size={14} /> {personal.linkedin}</span>}
          </div>
        </div>
      </div>

      <div className="creative-body">
        {personal.summary && (
          <section className="creative-section">
            <h3 className="creative-section-title"><span className="creative-icon">✦</span> 关于我</h3>
            <p className="creative-summary">{personal.summary}</p>
          </section>
        )}

        <div className="creative-two-col">
          <div className="creative-col-main">
            {experience.length > 0 && (
              <section className="creative-section">
                <h3 className="creative-section-title"><span className="creative-icon">◆</span> 工作经历</h3>
                {experience.map((exp) => (
                  <div key={exp.id} className="creative-card">
                    <div className="creative-card-header">
                      <div>
                        <h4 className="creative-card-title">{exp.position}</h4>
                        <span className="creative-card-subtitle">{exp.company}</span>
                      </div>
                      <span className="creative-card-date">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="creative-card-desc">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {education.length > 0 && (
              <section className="creative-section">
                <h3 className="creative-section-title"><span className="creative-icon">●</span> 教育背景</h3>
                {education.map((edu) => (
                  <div key={edu.id} className="creative-card">
                    <div className="creative-card-header">
                      <div>
                        <h4 className="creative-card-title">{edu.school}</h4>
                        <span className="creative-card-subtitle">{edu.degree} - {edu.major}</span>
                      </div>
                      <span className="creative-card-date">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {customSections.map((cs) => (
              <section key={cs.id} className="creative-section">
                <h3 className="creative-section-title"><span className="creative-icon">▸</span> {cs.title}</h3>
                {cs.items.map((item) => (
                  <div key={item.id} className="creative-card">
                    <div className="creative-card-header">
                      <div>
                        <h4 className="creative-card-title">{item.title}</h4>
                        {item.subtitle && <span className="creative-card-subtitle">{item.subtitle}</span>}
                      </div>
                      {item.date && <span className="creative-card-date">{item.date}</span>}
                    </div>
                    {item.description && <p className="creative-card-desc">{item.description}</p>}
                  </div>
                ))}
              </section>
            ))}
          </div>

          <div className="creative-col-side">
            {skills.length > 0 && (
              <section className="creative-section">
                <h3 className="creative-section-title"><span className="creative-icon">◈</span> 技能</h3>
                <div className="creative-skills">
                  {skills.map((skill) => (
                    <div key={skill.id} className="creative-skill-ring">
                      <svg viewBox="0 0 36 36" className="ring-svg">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#eee" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="3"
                          strokeDasharray={`${(skill.level || 0) * 0.942}, 94.2`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                      </svg>
                      <div className="ring-label">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="creative-section">
                <h3 className="creative-section-title"><span className="creative-icon">⬖</span> 项目</h3>
                {projects.map((proj) => (
                  <div key={proj.id} className="creative-card creative-card-small">
                    <h4 className="creative-card-title">{proj.name}</h4>
                    <span className="creative-card-subtitle">{proj.role}</span>
                    <p className="creative-card-desc">{proj.description}</p>
                  </div>
                ))}
              </section>
            )}

            {(certifications.length > 0 || languages.length > 0) && (
              <section className="creative-section">
                {certifications.length > 0 && (
                  <>
                    <h3 className="creative-section-title"><span className="creative-icon">★</span> 证书</h3>
                    {certifications.map((cert) => (
                      <div key={cert.id} className="creative-tag-row">
                        <span className="creative-tag">{cert.name} ({cert.date})</span>
                      </div>
                    ))}
                  </>
                )}
                {languages.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <h3 className="creative-section-title"><span className="creative-icon">♢</span> 语言</h3>
                    {languages.map((lang) => (
                      <div key={lang.id} className="creative-tag-row">
                        <span className="creative-tag">{lang.name} - {lang.level}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
