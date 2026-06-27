const SkeletonCard = () => (
  <div className="card doctor-card">
    <div className="skeleton skeleton-card"></div>
    <div className="card-body">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="row g-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="col-md-6 col-lg-4">
        <SkeletonCard />
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="d-flex gap-3 mb-3">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="skeleton skeleton-text flex-fill" style={{ height: '2rem' }}></div>
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonStats = ({ count = 4 }) => (
  <div className="row g-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="col-md-3">
        <div className="card stat-card p-3">
          <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
          <div className="skeleton skeleton-title mt-2"></div>
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonCard;
