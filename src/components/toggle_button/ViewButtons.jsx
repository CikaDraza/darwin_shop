import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import GridIcon from '../../assets/icons/GridIcon';
import InlineIcon from '../../assets/icons/InlineIcon';

function ViewButtons() {
  const [value, setValue] = useState([1, 3]);

  const handleChange = (val) => setValue(val);

  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <ToggleButton className="btn btn-custom-primary" id="tbg-btn-1" value={1}>
        <GridIcon fill="#f4f4f4" />
      </ToggleButton>
      <ToggleButton className="btn btn-custom-primary" id="tbg-btn-2" value={2}>
        <InlineIcon fill="#f4f4f4" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ViewButtons;