import { useState } from 'react';
import './App.css';
import { Badge } from './components/atomic/Badge';
import { Button } from './components/atomic/Button';
import { Checkbox } from './components/atomic/Checkbox';
import { Input } from './components/atomic/Input';
import { ProgressBar } from './components/atomic/ProgressBar';

function App() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClickableButtonClick = () => {
    alert('Clicked!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Badge */}
      <Badge>Default Badge</Badge>
      <Badge variant="success">Success Badge</Badge>
      <Badge variant="warning">Warning Badge</Badge>
      <Badge variant="danger">Danger Badge</Badge>
      <Badge variant="info">Info Badge</Badge>

      {/* Button */}
      <Button size="small" variant="primary">Small Primary</Button>
      <Button size="medium" variant="secondary">Medium Secondary</Button>
      <Button size="medium" variant="danger" disabled>Disabled Danger</Button>
      <Button size="small" variant="primary" onClick={handleClickableButtonClick}>
        Clickable
      </Button>

      {/* Checkbox */}
      <Checkbox
        label="Interactive Checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      {/* Input Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>Input</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <Input type="text" placeholder="Text Input" />
        <Input type="email" placeholder="Email Input" />
        <Input type="password" placeholder="Password Input" />
        <Input type="number" placeholder="Number Input" disabled />
      </div>
    </section>

    {/* ProgressBar Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>ProgressBar</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <ProgressBar value={0} max={100} />
        <ProgressBar value={25} max={100} />
        <ProgressBar value={50} max={100} />
        <ProgressBar value={75} max={100} />
        <ProgressBar value={100} max={100} />
      </div>
    </section>
    </div>
  );
}

export default App;