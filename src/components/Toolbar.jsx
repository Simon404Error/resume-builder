import { Download, RotateCcw, Eye, EyeOff, Palette } from 'lucide-react';
import { templates } from './ResumePreview';
import { exportToPDF } from '../utils/pdfExport';

const presetColors = [
  { name: '深蓝', value: '#1a3a5c' },
  { name: '藏蓝', value: '#4f46e5' },
  { name: '墨黑', value: '#2d2d2d' },
  { name: '玫红', value: '#e85d75' },
  { name: '青绿', value: '#0891b2' },
  { name: '深绿', value: '#166534' },
  { name: '橙黄', value: '#d97706' },
  { name: '暗紫', value: '#7c3aed' },
];

export default function Toolbar({
  template,
  setTemplate,
  accentColor,
  setAccentColor,
  fontSize,
  setFontSize,
  onExport,
  onReset,
  sectionVisibility,
  onToggleAllSections,
}) {
  const allVisible = Object.values(sectionVisibility).every(Boolean);

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="toolbar-brand">Resume Builder</h1>
      </div>

      <div className="toolbar-center">
        {/* Template Selector */}
        <div className="toolbar-group">
          <label className="toolbar-label">模板</label>
          <div className="template-selector">
            {Object.entries(templates).map(([key, t]) => (
              <button
                key={key}
                className={`template-btn ${template === key ? 'active' : ''}`}
                onClick={() => setTemplate(key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="toolbar-group">
          <label className="toolbar-label">
            <Palette size={14} /> 主题色
          </label>
          <div className="color-selector">
            {presetColors.map((c) => (
              <button
                key={c.value}
                className={`color-dot ${accentColor === c.value ? 'active' : ''}`}
                style={{ backgroundColor: c.value }}
                onClick={() => setAccentColor(c.value)}
                title={c.name}
              />
            ))}
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="color-picker-input"
              title="自定义颜色"
            />
          </div>
        </div>

        {/* Font Size */}
        <div className="toolbar-group">
          <label className="toolbar-label">字号</label>
          <div className="font-size-control">
            <button
              className="font-size-btn"
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
            >
              A-
            </button>
            <span className="font-size-value">{fontSize}px</span>
            <button
              className="font-size-btn"
              onClick={() => setFontSize(Math.min(20, fontSize + 1))}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      <div className="toolbar-right">
        {/* Visibility Toggle */}
        <button className="toolbar-btn" onClick={onToggleAllSections} title="显示/隐藏所有模块">
          {allVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

        {/* Reset */}
        <button className="toolbar-btn" onClick={onReset} title="恢复默认">
          <RotateCcw size={16} />
        </button>

        {/* Export */}
        <button className="toolbar-btn toolbar-btn-primary" onClick={onExport} title="导出PDF">
          <Download size={16} />
          <span>导出PDF</span>
        </button>
      </div>
    </div>
  );
}
