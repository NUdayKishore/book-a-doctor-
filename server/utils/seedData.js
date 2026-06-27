import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

const SAMPLE_DOCTORS = [
  {
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@bookadoctor.com',
    phoneNumber: '9876543210',
    specialization: 'Cardiologist',
    qualification: 'MD, FACC',
    experience: 12,
    consultationFees: 800,
    aboutDoctor: 'Board-certified cardiologist specializing in preventive heart care and hypertension management.',
  },
  {
    fullName: 'Dr. Michael Chen',
    email: 'michael.chen@bookadoctor.com',
    phoneNumber: '9876543211',
    specialization: 'Dermatologist',
    qualification: 'MD, FAAD',
    experience: 8,
    consultationFees: 600,
    aboutDoctor: 'Expert in skin conditions, acne treatment, and cosmetic dermatology procedures.',
  },
 // ==================== GENERAL PHYSICIAN ====================

{
  fullName: 'Dr. Lisa Wong',
  email: 'lisa.wong@bookadoctor.com',
  phoneNumber: '9876543214',
  specialization: 'General Physician',
  qualification: 'MBBS, MD (General Medicine)',
  experience: 6,
  consultationFees: 400,
  aboutDoctor: 'Primary care physician offering comprehensive health checkups, diabetes management, hypertension treatment, fever care, and preventive healthcare.',
},

{
  fullName: 'Dr. Amit Sharma',
  email: 'amit.sharma@bookadoctor.com',
  phoneNumber: '9876543250',
  specialization: 'General Physician',
  qualification: 'MBBS, MD (Internal Medicine)',
  experience: 10,
  consultationFees: 550,
  aboutDoctor: 'Experienced physician specializing in diabetes, thyroid disorders, infectious diseases, hypertension, and routine health checkups.',
},

{
  fullName: 'Dr. Priya Reddy',
  email: 'priya.reddy@bookadoctor.com',
  phoneNumber: '9876543251',
  specialization: 'General Physician',
  qualification: 'MBBS, DNB (General Medicine)',
  experience: 8,
  consultationFees: 500,
  aboutDoctor: 'Expert in treating fever, viral infections, respiratory illnesses, digestive disorders, lifestyle diseases, and preventive medicine.',
},
// ==================== CARDIOLOGIST ====================

{
  fullName: 'Dr. monoj misra',
  email: 'monoj@bookadoctor.com',
  phoneNumber: '9876543210',
  specialization: 'Cardiologist',
  qualification: 'MBBS, MD, DM Cardiology',
  experience: 12,
  consultationFees: 800,
  aboutDoctor: 'Board-certified cardiologist specializing in preventive heart care, hypertension, ECG, echocardiography, heart failure, and cholesterol management.',
},

{
  fullName: 'Dr. Arjun Mehta',
  email: 'arjun.mehta@bookadoctor.com',
  phoneNumber: '9876543252',
  specialization: 'Cardiologist',
  qualification: 'MBBS, MD, DM Cardiology',
  experience: 15,
  consultationFees: 950,
  aboutDoctor: 'Senior interventional cardiologist with expertise in angioplasty, coronary artery disease, cardiac catheterization, pacemaker implantation, and emergency cardiac care.',
},

{
  fullName: 'Dr. Priya Nair',
  email: 'priya.nair@bookadoctor.com',
  phoneNumber: '9876543253',
  specialization: 'Cardiologist',
  qualification: 'MBBS, MD, DM Cardiology',
  experience: 9,
  consultationFees: 850,
  aboutDoctor: 'Experienced cardiologist treating arrhythmias, hypertension, heart valve disorders, congenital heart disease, and preventive cardiovascular medicine.',
},
// ==================== DERMATOLOGIST ====================

{
  fullName: 'Dr. Michael Chen',
  email: 'michael.chen@bookadoctor.com',
  phoneNumber: '9876543211',
  specialization: 'Dermatologist',
  qualification: 'MBBS, MD Dermatology',
  experience: 8,
  consultationFees: 600,
  aboutDoctor: 'Expert in acne treatment, eczema, psoriasis, fungal infections, hair loss, skin allergies, and cosmetic dermatology.',
},

{
  fullName: 'Dr. Neha Reddy',
  email: 'neha.reddy@bookadoctor.com',
  phoneNumber: '9876543254',
  specialization: 'Dermatologist',
  qualification: 'MBBS, MD Dermatology',
  experience: 11,
  consultationFees: 700,
  aboutDoctor: 'Specializes in skin infections, pigmentation disorders, laser treatments, anti-aging procedures, mole removal, and chronic skin conditions.',
},

{
  fullName: 'Dr. Kevin Thomas',
  email: 'kevin.thomas@bookadoctor.com',
  phoneNumber: '9876543255',
  specialization: 'Dermatologist',
  qualification: 'MBBS, DDVL, MD Dermatology',
  experience: 9,
  consultationFees: 650,
  aboutDoctor: 'Experienced dermatologist providing treatment for vitiligo, dandruff, hair fall, nail disorders, fungal infections, and cosmetic skin care.',
},
// ==================== PEDIATRICIAN ====================

{
  fullName: 'Dr. Emily Davis',
  email: 'emily.davis@bookadoctor.com',
  phoneNumber: '9876543212',
  specialization: 'Pediatrician',
  qualification: 'MBBS, MD Pediatrics',
  experience: 10,
  consultationFees: 500,
  aboutDoctor: 'Compassionate pediatrician providing complete healthcare for newborns, infants, children, and adolescents including vaccinations, nutrition guidance, and developmental assessments.',
},

{
  fullName: 'Dr. Sneha Rao',
  email: 'sneha.rao@bookadoctor.com',
  phoneNumber: '9876543256',
  specialization: 'Pediatrician',
  qualification: 'MBBS, DCH, MD Pediatrics',
  experience: 8,
  consultationFees: 550,
  aboutDoctor: 'Specialist in childhood infections, immunization programs, growth monitoring, nutrition counseling, asthma management, and adolescent healthcare.',
},

{
  fullName: 'Dr. Rahul Varma',
  email: 'rahul.varma@bookadoctor.com',
  phoneNumber: '9876543257',
  specialization: 'Pediatrician',
  qualification: 'MBBS, MD Pediatrics',
  experience: 12,
  consultationFees: 650,
  aboutDoctor: 'Experienced pediatrician with expertise in neonatal care, childhood allergies, developmental disorders, emergency pediatric care, and preventive health checkups.',
},
// ==================== ORTHOPEDIC ====================

{
  fullName: 'Dr. Raj Patel',
  email: 'raj.patel@bookadoctor.com',
  phoneNumber: '9876543213',
  specialization: 'Orthopedic',
  qualification: 'MBBS, MS Orthopedics',
  experience: 15,
  consultationFees: 900,
  aboutDoctor: 'Senior orthopedic surgeon specializing in joint replacement, fracture management, sports injuries, arthritis treatment, and trauma care.',
},

{
  fullName: 'Dr. Vikram Singh',
  email: 'vikram.singh@bookadoctor.com',
  phoneNumber: '9876543258',
  specialization: 'Orthopedic',
  qualification: 'MBBS, MS Orthopedics',
  experience: 11,
  consultationFees: 850,
  aboutDoctor: 'Experienced orthopedic specialist treating knee pain, shoulder injuries, ligament tears, spinal disorders, osteoporosis, and bone fractures.',
},

{
  fullName: 'Dr. Akash Kumar',
  email: 'akash.kumar@bookadoctor.com',
  phoneNumber: '9876543259',
  specialization: 'Orthopedic',
  qualification: 'MBBS, DNB Orthopedics',
  experience: 9,
  consultationFees: 800,
  aboutDoctor: 'Orthopedic consultant with expertise in minimally invasive joint surgeries, sports medicine, trauma care, pediatric orthopedics, and rehabilitation.',
},
// ==================== NEUROLOGIST ====================

{
  fullName: 'Dr. Meera Iyer',
  email: 'meera.iyer@bookadoctor.com',
  phoneNumber: '9876543260',
  specialization: 'Neurologist',
  qualification: 'MBBS, MD, DM Neurology',
  experience: 14,
  consultationFees: 1200,
  aboutDoctor: 'Senior neurologist specializing in stroke management, epilepsy, migraine, Parkinson’s disease, multiple sclerosis, and neurological rehabilitation.',
},

{
  fullName: 'Dr. John Mathew',
  email: 'john.mathew@bookadoctor.com',
  phoneNumber: '9876543261',
  specialization: 'Neurologist',
  qualification: 'MBBS, DM Neurology',
  experience: 10,
  consultationFees: 1000,
  aboutDoctor: 'Expert in treating headaches, epilepsy, nerve disorders, memory problems, vertigo, peripheral neuropathy, and movement disorders.',
},

{
  fullName: 'Dr. Kiran Das',
  email: 'kiran.das@bookadoctor.com',
  phoneNumber: '9876543262',
  specialization: 'Neurologist',
  qualification: 'MBBS, MD, DM Neurology',
  experience: 8,
  consultationFees: 950,
  aboutDoctor: 'Neurologist with expertise in brain and spinal cord disorders, seizures, nerve pain, sleep disorders, and neurocritical care.',
},
// ==================== GYNECOLOGIST ====================

{
  fullName: 'Dr. Pooja Kapoor',
  email: 'pooja.kapoor@bookadoctor.com',
  phoneNumber: '9876543263',
  specialization: 'Gynecologist',
  qualification: 'MBBS, MS Obstetrics & Gynecology',
  experience: 13,
  consultationFees: 900,
  aboutDoctor: 'Senior gynecologist specializing in pregnancy care, high-risk pregnancies, infertility treatment, menstrual disorders, PCOS management, and women’s reproductive health.',
},

{
  fullName: 'Dr. Swathi Krishna',
  email: 'swathi.krishna@bookadoctor.com',
  phoneNumber: '9876543264',
  specialization: 'Gynecologist',
  qualification: 'MBBS, DGO, MS Obstetrics & Gynecology',
  experience: 9,
  consultationFees: 800,
  aboutDoctor: 'Expert in antenatal care, normal and cesarean deliveries, family planning, menopause management, cervical screening, and adolescent gynecology.',
},

{
  fullName: 'Dr. Anjali Verma',
  email: 'anjali.verma@bookadoctor.com',
  phoneNumber: '9876543265',
  specialization: 'Gynecologist',
  qualification: 'MBBS, MS Obstetrics & Gynecology',
  experience: 11,
  consultationFees: 850,
  aboutDoctor: 'Experienced gynecologist providing treatment for infertility, ovarian cysts, uterine fibroids, endometriosis, pregnancy care, and preventive women’s healthcare.',
},
// ==================== PSYCHIATRIST ====================

{
  fullName: 'Dr. Rohit Malhotra',
  email: 'rohit.malhotra@bookadoctor.com',
  phoneNumber: '9876543266',
  specialization: 'Psychiatrist',
  qualification: 'MBBS, MD Psychiatry',
  experience: 14,
  consultationFees: 1000,
  aboutDoctor: 'Senior psychiatrist specializing in depression, anxiety disorders, bipolar disorder, OCD, schizophrenia, stress management, and psychotherapy.',
},

{
  fullName: 'Dr. Sanjay Rao',
  email: 'sanjay.rao@bookadoctor.com',
  phoneNumber: '9876543267',
  specialization: 'Psychiatrist',
  qualification: 'MBBS, DPM, MD Psychiatry',
  experience: 10,
  consultationFees: 900,
  aboutDoctor: 'Experienced psychiatrist providing treatment for panic attacks, sleep disorders, addiction recovery, emotional well-being, and adolescent mental health.',
},

{
  fullName: 'Dr. Kavya Menon',
  email: 'kavya.menon@bookadoctor.com',
  phoneNumber: '9876543268',
  specialization: 'Psychiatrist',
  qualification: 'MBBS, MD Psychiatry',
  experience: 8,
  consultationFees: 850,
  aboutDoctor: 'Expert in counseling, cognitive behavioral therapy (CBT), anxiety management, trauma recovery, workplace stress, and mental wellness programs.',
},
// ==================== ENT SPECIALIST ====================

{
  fullName: 'Dr. Vivek Sharma',
  email: 'vivek.sharma@bookadoctor.com',
  phoneNumber: '9876543269',
  specialization: 'ENT Specialist',
  qualification: 'MBBS, MS ENT',
  experience: 12,
  consultationFees: 750,
  aboutDoctor: 'Senior ENT specialist treating ear infections, hearing loss, sinusitis, tonsillitis, throat disorders, nasal allergies, voice disorders, and head & neck conditions.',
},

{
  fullName: 'Dr. Ramesh Gupta',
  email: 'ramesh.gupta@bookadoctor.com',
  phoneNumber: '9876543270',
  specialization: 'ENT Specialist',
  qualification: 'MBBS, DLO, MS ENT',
  experience: 9,
  consultationFees: 700,
  aboutDoctor: 'Experienced ENT surgeon specializing in endoscopic sinus surgery, nasal polyps, ear surgeries, vertigo, sleep apnea, and pediatric ENT care.',
},

{
  fullName: 'Dr. Joseph Paul',
  email: 'joseph.paul@bookadoctor.com',
  phoneNumber: '9876543271',
  specialization: 'ENT Specialist',
  qualification: 'MBBS, MS ENT',
  experience: 15,
  consultationFees: 850,
  aboutDoctor: 'Expert in cochlear implants, hearing rehabilitation, thyroid and salivary gland disorders, throat cancer screening, and minimally invasive ENT procedures.',
},
// ==================== OPHTHALMOLOGIST ====================

{
  fullName: 'Dr. Aisha Khan',
  email: 'aisha.khan@bookadoctor.com',
  phoneNumber: '9876543272',
  specialization: 'Ophthalmologist',
  qualification: 'MBBS, MS Ophthalmology',
  experience: 13,
  consultationFees: 900,
  aboutDoctor: 'Senior ophthalmologist specializing in cataract surgery, glaucoma treatment, diabetic retinopathy, LASIK consultation, retinal disorders, and comprehensive eye care.',
},

{
  fullName: 'Dr. Nitin Joshi',
  email: 'nitin.joshi@bookadoctor.com',
  phoneNumber: '9876543273',
  specialization: 'Ophthalmologist',
  qualification: 'MBBS, DO, MS Ophthalmology',
  experience: 10,
  consultationFees: 800,
  aboutDoctor: 'Experienced eye specialist treating refractive errors, dry eyes, corneal diseases, pediatric eye disorders, squint correction, and computer vision syndrome.',
},

{
  fullName: 'Dr. Monica George',
  email: 'monica.george@bookadoctor.com',
  phoneNumber: '9876543274',
  specialization: 'Ophthalmologist',
  qualification: 'MBBS, MS Ophthalmology',
  experience: 8,
  consultationFees: 750,
  aboutDoctor: 'Expert in retinal diseases, glaucoma management, cataract evaluation, contact lens fitting, eye infections, and preventive vision care.',
},
// ==================== DENTIST ====================

{
  fullName: 'Dr. Harish Babu',
  email: 'harish.babu@bookadoctor.com',
  phoneNumber: '9876543275',
  specialization: 'Dentist',
  qualification: 'BDS, MDS (Oral & Maxillofacial Surgery)',
  experience: 14,
  consultationFees: 700,
  aboutDoctor: 'Senior dentist specializing in dental implants, root canal treatment, wisdom tooth extraction, oral surgery, smile designing, and complete dental care.',
},

{
  fullName: 'Dr. Ritu Sharma',
  email: 'ritu.sharma@bookadoctor.com',
  phoneNumber: '9876543276',
  specialization: 'Dentist',
  qualification: 'BDS, MDS (Prosthodontics)',
  experience: 9,
  consultationFees: 650,
  aboutDoctor: 'Experienced dentist providing crowns, bridges, dentures, cosmetic dentistry, teeth whitening, veneers, and full mouth rehabilitation.',
},

{
  fullName: 'Dr. Ashok Rao',
  email: 'ashok.rao@bookadoctor.com',
  phoneNumber: '9876543277',
  specialization: 'Dentist',
  qualification: 'BDS, MDS (Conservative Dentistry & Endodontics)',
  experience: 11,
  consultationFees: 750,
  aboutDoctor: 'Expert in root canal therapy, dental fillings, gum disease treatment, pediatric dentistry, preventive oral care, and painless dental procedures.',
},// ==================== UROLOGIST ====================

{
  fullName: 'Dr. Imran Ali',
  email: 'imran.ali@bookadoctor.com',
  phoneNumber: '9876543278',
  specialization: 'Urologist',
  qualification: 'MBBS, MS General Surgery, MCh Urology',
  experience: 15,
  consultationFees: 1100,
  aboutDoctor: 'Senior urologist specializing in kidney stones, urinary tract infections, prostate disorders, bladder diseases, male infertility, and minimally invasive urological surgeries.',
},

{
  fullName: 'Dr. Suresh Kumar',
  email: 'suresh.kumar@bookadoctor.com',
  phoneNumber: '9876543279',
  specialization: 'Urologist',
  qualification: 'MBBS, MS General Surgery, MCh Urology',
  experience: 11,
  consultationFees: 950,
  aboutDoctor: 'Experienced urologist providing treatment for enlarged prostate, kidney stones, urinary incontinence, erectile dysfunction, and laparoscopic urological procedures.',
},

{
  fullName: 'Dr. Deepak Jain',
  email: 'deepak.jain@bookadoctor.com',
  phoneNumber: '9876543280',
  specialization: 'Urologist',
  qualification: 'MBBS, DNB General Surgery, MCh Urology',
  experience: 9,
  consultationFees: 900,
  aboutDoctor: 'Expert in robotic urological surgery, kidney stone removal, pediatric urology, urinary tract reconstruction, and advanced prostate disease management.',
}
];

/**
 * Seed approved sample doctors (Development)
 * Deletes old sample doctors and inserts all doctors from SAMPLE_DOCTORS.
 */
export const seedSampleDoctors = async () => {
  try {
    console.log("==================================");
    console.log("Cleaning old doctors...");
    console.log("==================================");

    // Delete all doctor records
    await Doctor.deleteMany({});

    // Delete all users whose role is doctor
    await User.deleteMany({ role: "doctor" });

    console.log("Old doctors removed successfully.");

    // Insert all doctors from SAMPLE_DOCTORS
    for (const sample of SAMPLE_DOCTORS) {
      const existingUser = await User.findOne({
        email: sample.email,
      });

      if (existingUser) {
        console.log(`${sample.email} already exists. Skipping...`);
        continue;
      }

      const user = await User.create({
        fullName: sample.fullName,
        email: sample.email,
        password: 'doctor123',
        phoneNumber: sample.phoneNumber,
        role: 'doctor',
      });

      await Doctor.create({
        user: user._id,
        name: sample.fullName,
        email: sample.email,
        specialization: sample.specialization,
        qualification: sample.qualification,
        experience: sample.experience,
        consultationFees: sample.consultationFees,
        aboutDoctor: sample.aboutDoctor,
        approvalStatus: 'approved',
      });

      console.log(`Seeded: ${sample.fullName}`);
    }

    console.log('Sample doctors seeded successfully.');
  } catch (error) {
    console.error('Error seeding sample doctors:', error.message);
  }
};