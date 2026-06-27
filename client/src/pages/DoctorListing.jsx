import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doctorAPI } from '../api';
import DoctorCard from '../components/DoctorCard';
import Pagination from '../components/Pagination';
import { SkeletonGrid } from '../components/LoadingSkeleton';
import { DAYS_OF_WEEK } from '../utils/helpers';

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState([]);
  const [filters, setFilters] = useState({
    search: '', specialization: '', minExperience: '', maxFees: '', availableDay: '',
  });
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const fetchDoctors = async (page = 1) => {
    setLoading(true);
    try {
      const res = await doctorAPI.getAll({ ...filters, page, limit: 9 });
      setDoctors(res.data.doctors);
      setPagination(res.data.pagination);
    } catch (err) {
      const message = err.code === 'ERR_NETWORK' || !err.response
        ? 'Cannot reach server. Run npm run dev from the project root.'
        : err.response?.data?.message || 'Failed to load doctors';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doctorAPI.getSpecializations().then((res) => setSpecializations(res.data.specializations)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchDoctors(1);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors(1);
  };

  return (
    <div className="container py-5">
      <h1 className="section-title">Find Doctors</h1>

      <div className="card border-0 shadow-sm p-4 mb-4">
        <form onSubmit={handleSearch}>
          <div className="row g-3">
            <div className="col-md-4">
              <input className="form-control" placeholder="Search by name or specialization..."
                value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
            </div>
            <div className="col-md-2">
              <select className="form-select" value={filters.specialization}
                onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}>
                <option value="">All Specializations</option>
                {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Min Experience"
                value={filters.minExperience} onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Max Fees ($)"
                value={filters.maxFees} onChange={(e) => setFilters({ ...filters, maxFees: e.target.value })} />
            </div>
            <div className="col-md-2">
              <select className="form-select" value={filters.availableDay}
                onChange={(e) => setFilters({ ...filters, availableDay: e.target.value })}>
                <option value="">Any Day</option>
                {DAYS_OF_WEEK.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Search</button>
        </form>
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : doctors.length === 0 ? (
        <div className="text-center py-5 text-muted">No doctors found matching your criteria.</div>
      ) : (
        <>
          <div className="row g-4">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="col-md-6 col-lg-4">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetchDoctors} />
        </>
      )}
    </div>
  );
};

export default DoctorListing;
