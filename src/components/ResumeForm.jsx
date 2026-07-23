import { useState, useCallback } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function ResumeForm({ resume, onChange, sectionVisibility, onToggleSection }) {
  const [activeSection, setActiveSection] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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

  const handleDragStart = useCallback((event) => {
    setActiveSection(event.active.data.current?.section);
  }, []);

  const handleDragEnd = useCallback((event) => {
    setActiveSection(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const section = active.data.current?.section;
    if (!section) return;

    const items = resume[section];
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onChange({
      ...resume,
      [section]: arrayMove(items, oldIndex, newIndex),
    });
  }, [resume, onChange]);

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

  // Renders a sortable list section
  const renderSection = (sectionKey, items, renderItem, template, addLabel) => (
    <div className="form-section">
      <SectionHeader title={SECTION_LABELS[sectionKey]} sectionKey={sectionKey} showToggle onToggle={onToggleSection} />
      {expandedSections[sectionKey] && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="form-section-body">
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, i) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  section={sectionKey}
                  index={i}
                  onRemove={() => removeItem(sectionKey, item.id)}
                  isActive={activeSection === sectionKey}
                >
                  {renderItem(item)}
                </SortableItem>
              ))}
            </SortableContext>
            <button className="btn-add" onClick={() => addItem(sectionKey, template)}>
              <Plus size={14} /> {addLabel}
            </button>
          </div>
        </DndContext>
      )}
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
      {renderSection('experience', resume.experience, (exp) => (
        <>
          <FormField label="公司" value={exp.company} onChange={(v) => updateItem('experience', exp.id, 'company', v)} />
          <FormField label="职位" value={exp.position} onChange={(v) => updateItem('experience', exp.id, 'position', v)} />
          <FormRow>
            <FormField label="开始" value={exp.startDate} onChange={(v) => updateItem('experience', exp.id, 'startDate', v)} placeholder="2021-03" />
            <FormField label="结束" value={exp.endDate} onChange={(v) => updateItem('experience', exp.id, 'endDate', v)} placeholder="至今" />
          </FormRow>
          <FormArea label="描述" value={exp.description} onChange={(v) => updateItem('experience', exp.id, 'description', v)} />
        </>
      ), { company: '', position: '', startDate: '', endDate: '', description: '' }, '添加经历')}

      {/* Education */}
      {renderSection('education', resume.education, (edu) => (
        <>
          <FormField label="学校" value={edu.school} onChange={(v) => updateItem('education', edu.id, 'school', v)} />
          <FormRow>
            <FormField label="学位" value={edu.degree} onChange={(v) => updateItem('education', edu.id, 'degree', v)} />
            <FormField label="专业" value={edu.major} onChange={(v) => updateItem('education', edu.id, 'major', v)} />
          </FormRow>
          <FormRow>
            <FormField label="开始" value={edu.startDate} onChange={(v) => updateItem('education', edu.id, 'startDate', v)} />
            <FormField label="结束" value={edu.endDate} onChange={(v) => updateItem('education', edu.id, 'endDate', v)} />
          </FormRow>
        </>
      ), { school: '', degree: '', major: '', startDate: '', endDate: '' }, '添加教育')}

      {/* Skills */}
      {renderSection('skills', resume.skills, (skill) => (
        <FormRow>
          <FormField label="技能" value={skill.name} onChange={(v) => updateItem('skills', skill.id, 'name', v)} />
          <FormField label="熟练度" value={skill.level} onChange={(v) => updateItem('skills', skill.id, 'level', Number(v) || 0)} type="number" min={0} max={100} />
        </FormRow>
      ), { name: '', level: 80 }, '添加技能')}

      {/* Projects */}
      {renderSection('projects', resume.projects, (proj) => (
        <>
          <FormField label="项目名称" value={proj.name} onChange={(v) => updateItem('projects', proj.id, 'name', v)} />
          <FormField label="角色" value={proj.role} onChange={(v) => updateItem('projects', proj.id, 'role', v)} />
          <FormField label="链接" value={proj.url || ''} onChange={(v) => updateItem('projects', proj.id, 'url', v)} />
          <FormArea label="描述" value={proj.description} onChange={(v) => updateItem('projects', proj.id, 'description', v)} />
        </>
      ), { name: '', role: '', url: '', description: '' }, '添加项目')}

      {/* Certifications */}
      {renderSection('certifications', resume.certifications, (cert) => (
        <FormRow>
          <FormField label="证书名称" value={cert.name} onChange={(v) => updateItem('certifications', cert.id, 'name', v)} />
          <FormField label="获得日期" value={cert.date} onChange={(v) => updateItem('certifications', cert.id, 'date', v)} />
        </FormRow>
      ), { name: '', date: '' }, '添加证书')}

      {/* Languages */}
      {renderSection('languages', resume.languages, (lang) => (
        <FormRow>
          <FormField label="语言" value={lang.name} onChange={(v) => updateItem('languages', lang.id, 'name', v)} />
          <FormField label="水平" value={lang.level} onChange={(v) => updateItem('languages', lang.id, 'level', v)} />
        </FormRow>
      ), { name: '', level: '' }, '添加语言')}
    </div>
  );
}

const SECTION_LABELS = {
  experience: '工作经历',
  education: '教育背景',
  skills: '专业技能',
  projects: '项目经验',
  certifications: '证书',
  languages: '语言',
};

function SortableItem({ id, section, index, onRemove, children, isActive }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { section } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="array-item sortable-item">
      <div className="array-item-header">
        <button
          className="btn-icon drag-handle-btn"
          {...attributes}
          {...listeners}
          title="拖动排序"
        >
          <GripVertical size={14} />
        </button>
        <span className="array-item-index">#{index + 1}</span>
        <button className="btn-icon btn-remove" onClick={onRemove} title="删除">
          <Trash2 size={14} />
        </button>
      </div>
      <div className="array-item-body">{children}</div>
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
