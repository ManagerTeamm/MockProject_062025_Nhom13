const programs = [
  {
    img: "/images/compStatCrimeStats.png",
    title: "CompStat & Crime Stats",
    desc: "Access crime statistics, traffic data, reports, and CompStat 2.0, an advanced digital crime-tracking system that delivers block-by-block data.",
  },
  {
    img: "/images/bodywornCameras.png",
    title: "Body-worn Cameras",
    desc: "Body-worn cameras have come to the NYPD. What you need to know.",
  },
  {
    img: "/images/helpIsAvailable.png",
    title: "Help Is Available",
    desc: "Before cops can help others, they must first take care of themselves. Help is available.",
  },
];

export default function ProgramsResources() {
  return (
    <section className="container my-4">
      <h4 className="fw-bold mb-4 text-center">Programs and Resources</h4>
      <div className="row">
        {programs.map((p, idx) => (
          <div key={idx} className="col-12 col-md-4 text-center mb-4">
            <img className="img-fluid" src={p.img} style={{ width: 350, height: 390, objectFit: 'contain', marginBottom: 7 }} alt={p.title} />
            <div className="fw-bold mb-1" style={{ color: '#235ea3' }}>{p.title}</div>
            <div className="small text-muted">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}