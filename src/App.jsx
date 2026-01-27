import './App.css'
import { Badge } from './components/atomic/Badge';
import { Button } from './components/atomic/Button';
import { Checkbox } from './components/atomic/Checkbox';
import { Input } from './components/atomic/Input';
import { ProgressBar } from './components/atomic/ProgressBar';

function App() {

  return (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>Atomic Components Showcase</h1>
    <p>Use this page to manually test the components. Interact with them below!</p>

    {/* Badge Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>Badge</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Badge variant="primary" text="Primary Badge" />
        <Badge variant="secondary" text="Secondary Badge" />
        <Badge variant="success" text="Success Badge" />
        <Badge variant="danger" text="Danger Badge" />
        <Badge variant="warning" text="Warning Badge" />
        <Badge variant="info" text="Info Badge" />
      </div>
    </section>

    {/* Button Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>Button</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button size="small" variant="primary">Small Primary</Button>
        <Button size="medium" variant="secondary">Medium Secondary</Button>
        <Button size="large" variant="success">Large Success</Button>
        <Button size="medium" variant="danger" disabled>Disabled Danger</Button>
        <Button size="small" variant="warning" onClick={() => alert('Clicked!')}>Clickable Warning</Button>
      </div>
    </section>

    {/* Checkbox Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>Checkbox</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Checkbox label="Unchecked Checkbox" checked={false} />
        <Checkbox label="Checked Checkbox" checked={true} />
        <Checkbox label="Disabled Unchecked" checked={false} disabled />
        <Checkbox label="Disabled Checked" checked={true} disabled />
      </div>
    </section>

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

export default App
