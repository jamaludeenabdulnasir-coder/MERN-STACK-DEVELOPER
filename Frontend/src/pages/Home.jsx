import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomButton from '../components/CustomButton'
import '../css/Home.css'


function Home() {
    const programs = [
        { name: 'General Arts', description: 'Literature, History, Government, Economics and more for future leaders.', icon: '🎭' },
        { name: 'General Science', description: 'Biology, Chemistry, Physics and Elective Maths for medical and tech careers.', icon: '🔬' },
        { name: 'Business', description: 'Accounting, Business Management and Economics for the corporate world.', icon: '💼' },
        { name: 'Visual Arts', description: 'Graphic design, textiles, sculpture and creative studio work.', icon: '🎨' },
        { name: 'Home Economics', description: 'Management in Living, Food & Nutrition and Clothing & Textiles.', icon: '🍽️' },
        { name: 'Technical', description: 'Engineering, building technology and hands-on vocational skills.', icon: '🛠️' },
    ]

    const testimonials = [
        { name: 'Ama Serwaa', program: 'General Science Alumna', quote: 'The science lab facilities and dedicated teachers prepared me perfectly for medical school.' },
        { name: 'Kofi Mensah', program: 'Business Alumna', quote: 'I gained practical business skills and leadership experience that shaped my career.' },
        { name: 'Efua Asantewaa', program: 'Visual Arts Alumna', quote: 'My creative talents were nurtured here. I now run my own design studio.' },
    ]

    return (
        <>
            <Navbar />

            <section id="home" className="hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <span className="hero-badge">Admissions Open for 2026/27</span>
                        <h1>Shaping Bright Minds For A Better Future</h1>
                        <p>
                            Join a community of excellence where every student is empowered to
                            learn, lead and succeed. Explore our programs and start your journey
                            at Senior High School today.
                        </p>
                        <div className="hero-actions">
                            <CustomButton href="#programs">Explore Programs</CustomButton>
                            <CustomButton href="#about" variant="btn-outline">Learn More</CustomButton>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={heroImage} alt="Students learning at Senior High School" />
                    </div>
                </div>
            </section>

            <section className="stats">
                <div className="stat">
                    <h2>2,500+</h2>
                    <p>Students Enrolled</p>
                </div>
                <div className="stat">
                    <h2>120+</h2>
                    <p>Qualified Teachers</p>
                </div>
                <div className="stat">
                    <h2>98%</h2>
                    <p>BECE & WASSCE Pass Rate</p>
                </div>
                <div className="stat">
                    <h2>30+</h2>
                    <p>Clubs & Activities</p>
                </div>
            </section>

            <section id="about" className="about">
                <div className="about-inner">
                    <div className="about-text">
                        <span className="section-tag">About Our School</span>
                        <h2>Excellence, Integrity and Discipline</h2>
                        <p>
                            For over 40 years our school has provided quality education that
                            combines strong academics with character development. Our experienced
                            staff, modern facilities and vibrant campus culture create the ideal
                            environment for students to thrive.
                        </p>
                        <ul className="about-list">
                            <li>Modern science and computer laboratories</li>
                            <li>Well-stocked library and study spaces</li>
                            <li>Boarding and day student options</li>
                            <li>Sports facilities and music programs</li>
                        </ul>
                    </div>
                    <div className="about-actions">
                        <CustomButton to="/contact">Schedule a Visit</CustomButton>
                    </div>
                </div>
            </section>

            <section id="programs" className="programs">
                <div className="programs-head">
                    <span className="section-tag">Our Programs</span>
                    <h2>Choose Your Path To Success</h2>
                    <p>We offer a wide range of programs to match every student's talents and ambitions.</p>
                </div>
                <div className="programs-grid">
                    {programs.map((program) => (
                        <div className="program-card" key={program.name}>
                            <span className="program-icon">{program.icon}</span>
                            <h3>{program.name}</h3>
                            <p>{program.description}</p>
                            <Link to="/contact" className="program-link">Enroll Now →</Link>
                        </div>
                    ))}
                </div>
            </section>

            <section id="testimonials" className="testimonials">
                <div className="testimonials-head">
                    <span className="section-tag">Alumni Stories</span>
                    <h2>What Our Alumni Say</h2>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((item) => (
                        <div className="testimonial-card" key={item.name}>
                            <p className="testimonial-quote">“{item.quote}”</p>
                            <h3>{item.name}</h3>
                            <span className="testimonial-role">{item.program}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" className="cta">
                <div className="cta-inner">
                    <h2>Ready To Start Your Journey?</h2>
                    <p>Admissions are open. Contact us today or visit the school for guidance.</p>
                    <div className="cta-actions">
                        <CustomButton to="/contact" variant="btn-light">Contact Admissions</CustomButton>
                        <CustomButton to="/register" variant="btn-outline-light">Apply Now</CustomButton>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home
