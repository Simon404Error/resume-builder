import Classic from './templates/Classic';
import Modern from './templates/Modern';
import Minimal from './templates/Minimal';
import Creative from './templates/Creative';

const templates = {
  classic: { component: Classic, label: '经典' },
  modern: { component: Modern, label: '现代' },
  minimal: { component: Minimal, label: '极简' },
  creative: { component: Creative, label: '创意' },
};

export default function ResumePreview({ resume, template = 'classic', accentColor = '#1a3a5c', fontSize = 14 }) {
  const TemplateComponent = templates[template]?.component || Classic;

  // Filter out hidden sections
  const visibleData = { ...resume };

  return (
    <div
      id="resume-preview"
      className="resume-preview"
      style={{ fontSize: `${fontSize}px` }}
    >
      <TemplateComponent data={visibleData} accentColor={accentColor} />
    </div>
  );
}

export { templates };
