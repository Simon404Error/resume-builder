import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

export default function ResumeForm({ resume, onChange, sectionVisibility, onToggleSection }) {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
  });

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePersonal = (field, value) => {
    onChange({ ...resume, personal: { ...resume.personal, [field]: value } });
  };

  const addItem = (section, template) => {
    const newItem = { ...template, id: `${section}${Date.now()}` };
    onChange({ ...resume, [section]: [...resume[section], newItem] });
  };

  const removeItem = (section, id) => {
    onChange({ ...resume, [section]: resume[section].filter((item) => item.id !== id) });
  };

  const updateItem = (section, id, field, value) => {
    onChange({
      ...resume,
      [section]: resume[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const SectionHeader = ({ title, sectionKey, showToggle, onToggle }) => (
    <div className="form-section-header" onClick={() => toggleSection(sectionKey)}>
      <div className="form-section-header-left">
        {expandedSections[sectionKey] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        <h3>{title}</h3>
      </div>
      <div className="form-section-header-right" onClick={(e) => e.stopPropagation()}>
        {showToggle && (
          <label className="visibility-toggle" title="显示/隐藏此模块">
            <input
              type="checkbox"
              checked={sectionVisibility?.[sectionKey] !== false}
              onChange={() => onToggle?.(sectionKey)}
            />
            <span className="toggle-label">{sectionVisibility?.[sectionKey] !== false ? '显示' : '隐藏'}</span>
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="resume-form">
      {/* Personal Info */}
      <div className="form-section">
        <SectionHeader title="个人信息" sectionKey="personal" />
        {expandedSections.personal && (
          <div className="form-section-body">
            <FormField label="姓名" value={resume.personal.fullName} onChange={(v) => updatePersonal('fullName', v)} />
            <FormField label="职位" value={resume.personal.title} onChange={(v) => updatePersonal('title', v)} />
            <FormRow>
              <FormField label="邮箱" value={resume.personal.email} onChange={(v) => updatePersonal('email', v)} />
              <FormField label="电话" value={resume.personal.phone} onChange={(v) => updatePersonal('phone', v)} />
            </FormRow>
            <FormRow>
              <FormField label="地点" value={resume.personal.location} onChange={(v) => updatePersonal('location', v)} />
              <FormField label="网站" value={resume.personal.website} onChange={(v) => updatePersonal('website', v)} />
            </FormRow>
            <FormRow>
              <FormField label="GitHub" value={resume.personal.github} onChange={(v) => updatePersonal('github', v)} />
              <FormField label="LinkedIn" value={resume.personal.linkedin} onChange={(v) => updatePersonal('linkedin', v)} />
            </FormRow>
            <FormArea label="个人简介" value={resume.personal.summary} onChange={(v) => updatePersonal('summary', v)} />
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="form-section">
        <SectionHeader title="工作经历" sectionKey="experience" showToggle onToggle={onToggleSection} />
        {expandedSections.experience && (
          <div className="form-section-body">
            {resume.experience.map((exp, i) => (
              <ArrayItem key={exp.id} onRemove={() => removeItem('experience', exp.id)} index={i}>
                <FormField label="公司" value={exp.company} onChange={(v) => updateItem('experience', exp.id, 'company', v)} />
                <FormField label="职位" value={exp.position} onChange={(v) => updateItem('experience', exp.id, 'position', v)} />
                <FormRow>
                  <FormField label="开始" value={exp.startDate} onChange={(v) => updateItem('experience', exp.id, 'startDate', v)} placeholder="2021-03" />
                  <FormField label="结束" value={exp.endDate} onChange={(v) => updateItem('experience', exp.id, 'endDate', v)} placeholder="至今" />
                </FormRow>
                <FormArea label="描述" value={exp.description} onChange={(v) => updateItem('experience', exp.id, 'description', v)} />
              </ArrayItem>
            ))}
            <button className="btn-add" onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })}>
              <Plus size={14} /> 添加经历
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="form-section">
        <SectionHeader title="教育背景" sectionKey="education" showToggle onToggle={onToggleSection} />
        {expandedSections.education && (
          <div className="form-section-body">
            {resume.education.map((edu, i) => (
              <ArrayItem key={edu.id} onRemove={() => removeItem('education', edu.id)} index={i}>
                <FormField label="学校" value={edu.school} onChange={(v) => updateItem('education', edu.id, 'school', v)} />
                <FormRow>
                  <FormField label="学位" value={edu.degree} onChange={(v) => updateItem('education', edu.id, 'degree', v)} />
                  <FormField label="专业" value={edu.major} onChange={(v) => updateItem('education', edu.id, 'major', v)} />
                </FormRow>
                <FormRow>
                  <FormField label="开始" value={edu.startDate} onChange={(v) => updateItem('education', edu.id, 'startDate', v)} />
                  <FormField label="结束" value={edu.endDate} onChange={(v) => updateItem('education', edu.id, 'endDate', v)} />
                </FormRow>
              </ArrayItem>
            ))}
            <button className="btn-add" onClick={() => addItem('education', { school: '', degree: '', major: '', startDate: '', endDate: '' })}>
              <Plus size={14} /> 添加教育
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="form-section">
        <SectionHeader title="专业技能" sectionKey="skills" showToggle onToggle={onToggleSection} />
        {expandedSections.skills && (
          <div className="form-section-body">
            {resume.skills.map((skill, i) => (
              <ArrayItem key={skill.id} onRemove={() => removeItem('skills', skill.id)} index={i} compact>
                <FormRow>
                  <FormField label="技能" value={skill.name} onChange={(v) => updateItem('skills', skill.id, 'name', v)} />
                  <FormField label="熟练度" value={skill.level} onChange={(v) => updateItem('skills', skill.id, 'level', Number(v) || 0)} type="number" min={0} max={100} />
                </FormRow>
              </ArrayItem>
            ))}
            <button className="btn-add" onClick={() => addItem('skills', { name: '', level: 80 })}>
              <Plus size={14} /> 添加技能
            </button>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="form-section">
        <SectionHeader title="项目经验" sectionKey="projects" showToggle onToggle={onToggleSection} />
        {expandedSections.projects && (
          <div className="form-section-body">
            {resume.projects.map((proj, i) => (
              <ArrayItem key={proj.id} onRemove={() => removeItem('projects', proj.id)} index={i}>
                <FormField label="项目名称" value={proj.name} onChange={(v) => updateItem('projects', proj.id, 'name', v)} />
                <FormField label="角色" value={proj.role} onChange={(v) => updateItem('projects', proj.id, 'role', v)} />
                <FormField label="链接" value={proj.url || ''} onChange={(v) => updateItem('projects', proj.id, 'url', v)} />
                <FormArea label="描述" value={proj.description} onChange={(v) => updateItem('projects', proj.id, 'description', v)} />
              </ArrayItem>
            ))}
            <button className="btn-add" onClick={() => addItem('projects', { name: '', role: '', url: '', description: '' })}>
              <Plus size={14} /> 添加项目
            </button>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="form-section">
        <SectionHeader title="证书" sectionKey="certifications" showToggle onToggle={onToggleSection} />
        {expandedSections.certifications && (
          <div className="form-section-body">
            {resume.certifications.map((cert, i) => (
              <ArrayItem key={cert.id} onRemove={() => removeItem('certifications', cert.id)} index={i} compact>
                <FormRow>
                  <FormField label="证书名称" value={cert.name} onChange={(v) => updateItem('certifications', cert.id, 'name', v)} />
                  <FormField label="获得日期" value={cert.date} onChange={(v) => updateItem('certifications', cert.id, 'date', v)} />
                </FormRow>
              </ArrayItem>
            ))}
            <button className="btn-add" onClick={() => addItem('certifications', { name: '', date: '' })}>
              <Plus size={14} /> 添加证书
            </button>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="form-section">
        <SectionHeader title="语言" sectionKey="languages" showToggle onToggle={onToggleSection} />
        {expandedSections.languages && (
          <div className="form-section-body">
            {resume.languages.map((lang, i) => (
              <ArrayItem key={lang.id} onRemove={() => removeItem('languages', lang.id)} index={i} compact>
                <FormRow>
                  <FormField label="语言" value={lang.name} onChange={(v) => updateItem('languages', lang.id, 'name', v)} />
                  <FormField label="水平" value={lang.level} onChange={(v) => updateItem('languages', lang.id, 'level', v)} />
                </FormRow>
              </ArrayItem>
            ))}
            <button className="btn-add" onClick={() => addItem('languages', { name: '', level: '' })}>
              <Plus size={14} /> 添加语言
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, type = 'text', placeholder = '', min, max }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        value={type === 'number' ? value : (value || '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
}

function FormArea({ label, value, onChange }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3} />
    </div>
  );
}

function FormRow({ children }) {
  return <div className="form-row">{children}</div>;
}

function ArrayItem({ children, onRemove, index, compact = false }) {
  return (
    <div className={`array-item ${compact ? 'array-item-compact' : ''}`}>
      <div className="array-item-header">
        <GripVertical size={14} className="drag-handle" />
        <span className="array-item-index">#{index + 1}</span>
        <button className="btn-icon btn-remove" onClick={onRemove} title="删除">
          <Trash2 size={14} />
        </button>
      </div>
      <div className="array-item-body">{children}</div>
    </div>
  );
}
