import React, { useEffect, useState } from 'react';
import "./settings.scss";

function Settings({ updateSettings }) {
  const [selectedSettings, setSelectedSettings] = useState(1);
  
  function handleChange(e) {
    e.preventDefault();
    setSelectedSettings(e.target.value);
  }

  useEffect(() => {
    updateSettings(selectedSettings);
  }, [selectedSettings, updateSettings])

  return (
    <select
      className="settings-wrapper"
      value={selectedSettings}
      onChange={handleChange}
    >
      <option value="0">Einfach</option>
      <option value="1">Mittel</option>
      <option value="2">Schwierig</option>
    </select>
  )
}

export default Settings;