import { useNavigate } from 'react-router-dom';
const helpItems = [
  { icon: 'chat-square-text', text: 'Tell us what happened.' },
  { icon: 'people',           text: 'Your contribution & our mission.' },
  { icon: 'shield-shaded',    text: 'Protect yourself and others.' },
];

export default function HowYouCanHelp() {
  const navigate = useNavigate();
  return (
    <section className="text-center my-5">
      <h3 className="fw-bold mb-4">How You Can Help?</h3>
      <div className="row justify-content-center mb-4">
        {helpItems.map((item, idx) => (
          <div key={idx} className="col-md-2">
            <i className={`bi bi-${item.icon}`} style={{ fontSize: 36 }}></i>
            <div>{item.text}</div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/report-suspect')} className="btn btn-primary px-5 py-2">File A Report</button>
      <hr className="my-5" style={{ maxWidth: 700, margin: '2rem auto' }} />
    </section>
  );
}