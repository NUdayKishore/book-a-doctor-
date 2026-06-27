const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(pages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
        </li>
        {pageNumbers.map((num) => (
          <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(num)}>{num}</button>
          </li>
        ))}
        <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)} disabled={page === pages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
