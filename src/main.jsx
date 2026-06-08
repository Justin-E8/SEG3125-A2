import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'
import physioSession from './assets/physio-session.jpg'
import physiotherapist from './assets/physiotherapist.jpg'

const services = [
  {
    id: 'assessment',
    icon: 'bi-clipboard2-pulse',
    title: 'Initial assessment',
    copy: 'A complete movement and pain assessment, followed by a plan built around your life.',
    duration: '45 min',
    price: 95,
    tone: 'coral',
    badge: 'Recommended',
  },
  {
    id: 'follow-up',
    icon: 'bi-arrow-repeat',
    title: 'Follow-up session',
    copy: 'Hands-on treatment, guided exercise, and progress tracking with your physiotherapist.',
    duration: '30 min',
    price: 75,
    tone: 'teal',
  },
  {
    id: 'consult',
    icon: 'bi-telephone',
    title: 'Quick consultation',
    copy: 'Talk through a new concern and get clear advice on the most helpful next step.',
    duration: '15 min',
    price: 35,
    tone: 'blue',
  },
]

const serviceIntake = {
  assessment: {
    kicker: 'Prepare for your assessment',
    title: 'Tell us what has been bothering you.',
    intro: 'Your physiotherapist will review this before your first visit so your appointment can start with the right questions.',
  },
  'follow-up': {
    kicker: 'Welcome back',
    title: 'What should we focus on next?',
    intro: 'Follow-up visits are for existing patients. Tell us how things have changed since your previous session.',
  },
  consult: {
    kicker: 'A quick conversation',
    title: 'What would you like advice about?',
    intro: 'Share your main question and choose how you would prefer us to reach you.',
  },
}

const testimonials = [
  {
    quote: 'My knee had been bothering me for months. Amara explained what was going on in a way that made sense and gave me exercises I could actually fit into my week.',
    name: 'Maya R.',
    detail: 'Initial assessment patient',
  },
  {
    quote: 'I never felt rushed. We changed the plan when my shoulder flared up, and I always knew what I was supposed to work on between visits.',
    name: 'Daniel K.',
    detail: 'Shoulder rehabilitation',
  },
  {
    quote: 'The evening appointments made it possible to come after work. Direct billing was a nice bonus too.',
    name: 'Priya S.',
    detail: 'Follow-up patient',
  },
]

const availability = {
  assessment: ['9:00 AM', '11:00 AM', '1:30 PM', '4:00 PM'],
  'follow-up': ['8:30 AM', '10:30 AM', '2:30 PM', '5:15 PM', '6:15 PM'],
  consult: ['9:15 AM', '12:15 PM', '3:45 PM', '5:45 PM'],
}

function getBookingDates() {
  const dates = []
  const cursor = new Date()
  cursor.setHours(12, 0, 0, 0)
  while (dates.length < 12) {
    cursor.setDate(cursor.getDate() + 1)
    if (cursor.getDay() !== 0) dates.push(new Date(cursor))
  }
  return dates
}

function formatDate(date, options) {
  return new Intl.DateTimeFormat('en-CA', options).format(date)
}

function Icon({ name }) {
  return <i className={`bi ${name}`} aria-hidden="true" />
}

function Navbar({ onBook }) {
  return (
    <nav className="navbar navbar-expand-lg fixed-top app-navbar" aria-label="Main navigation">
      <div className="container">
        <a className="navbar-brand brand-lockup" href="#home" aria-label="EasyPhysio home">
          <span className="brand-mark"><Icon name="bi-heart-pulse-fill" /></span>
          <span>Easy<span>Physio</span></span>
        </a>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <Icon name="bi-list" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto gap-lg-3">
            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#approach">Our approach</a></li>
            <li className="nav-item"><a className="nav-link" href="#team">Your physio</a></li>
            <li className="nav-item"><a className="nav-link" href="#answers">FAQ</a></li>
          </ul>
          <button className="btn btn-primary-soft mt-3 mt-lg-0" onClick={onBook}>
            Book an appointment <Icon name="bi-arrow-up-right" />
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ onBook }) {
  return (
    <header id="home" className="hero-section">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="container position-relative">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1>EasyPhysio, for all your physiotherapy needs.</h1>
            <p className="hero-lead">One-on-one appointments in central Ottawa. We’ll figure out what is getting in the way, treat it, and give you a plan you can manage at home.</p>
            <div className="d-flex flex-column flex-sm-row gap-3 hero-actions">
              <button className="btn btn-coral btn-lg" onClick={onBook}>Book an appointment <Icon name="bi-arrow-right" /></button>
              <a className="btn btn-link-dark btn-lg" href="#approach">What to expect</a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>MR</span><span>DK</span><span>PS</span><span>+</span>
              </div>
              <div><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><strong>4.9 from 200+ patients</strong></div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="visual-card">
                <img src={physioSession} alt="A physiotherapist guiding a patient through a shoulder exercise with a resistance band" />
              </div>
            </div>
          </div>
        </div>
        <div className="trust-strip">
          <span><Icon name="bi-patch-check-fill" /> Registered physiotherapists</span>
          <span><Icon name="bi-receipt" /> Direct insurance billing</span>
          <span><Icon name="bi-clock" /> Evening appointments</span>
          <span><Icon name="bi-calendar-x" /> Free 24h cancellation</span>
        </div>
      </div>
    </header>
  )
}

function Services({ onSelect }) {
  return (
    <section id="services" className="section-pad services-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-kicker">Appointments</span>
          <h2>Pick and appointment that works for you.</h2>
          <p>New patients usually begin with an assessment. Current patients can book a follow-up, and short consultations are available for simple questions.</p>
        </div>
        <div className="row g-4 mt-4">
          {services.map((service) => (
            <div className="col-lg-4" key={service.id}>
              <article className={`service-card tone-${service.tone} h-100`}>
                {service.badge && <span className="service-badge">{service.badge}</span>}
                <div className="service-icon"><Icon name={service.icon} /></div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <div className="service-meta">
                  <span><small>Session</small><strong>{service.duration}</strong></span>
                  <span><small>From</small><strong>${service.price}</strong></span>
                </div>
                <button className="service-link" onClick={() => onSelect(service)}>
                  Choose this visit <Icon name="bi-arrow-right" />
                </button>
              </article>
            </div>
          ))}
        </div>
        <p className="insurance-note"><Icon name="bi-shield-check" /> Most major insurance plans accepted. Direct billing available for eligible plans.</p>
      </div>
    </section>
  )
}

function Approach() {
  const steps = [
    ['01', 'Tell us what happened', 'The booking form gives us a little context before you arrive. You can explain the rest in person.'],
    ['02', 'Assessment and treatment', 'We’ll look at how you move, discuss what may be contributing, and begin treatment if it is appropriate.'],
    ['03', 'Leave with a plan', 'You’ll know what to work on at home and whether another appointment would be useful.'],
  ]
  return (
    <section id="approach" className="section-pad approach-section">
      <div className="container">
        <div className="row align-items-end mb-5 g-4">
          <div className="col-lg-7">
            <span className="section-kicker">What to expect</span>
            <h2>A straightforward first visit.</h2>
          </div>
          <div className="col-lg-5">
            <p className="section-side-copy">Your appointment will include a physical assessment, treatment where appropriate, and a clear plan for what to do next and how we can help.</p>
          </div>
        </div>
        <div className="journey-grid">
          {steps.map(([number, title, copy], index) => (
            <article className="journey-step" key={number}>
              <div className="step-number">{number}</div>
              <div className="step-art">
                <Icon name={['bi-clipboard2-check', 'bi-bandaid', 'bi-journal-check'][index]} />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="section-pad team-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="clinician-photo">
              <img src={physiotherapist} alt="A physiotherapist assessing a patient’s lower back" />
              <span className="photo-caption">One-on-one assessment and treatment</span>
            </div>
          </div>
          <div className="col-lg-6">
            <span className="section-kicker">Your appointment</span>
            <h2>You’ll work directly with a physiotherapist.</h2>
            <p className="team-lead">We don’t double-book appointments. Your physiotherapist stays with you for the assessment, treatment, and exercise portion of the visit.</p>
            <div className="clinician-name">
              <strong>Registered physiotherapists</strong>
              <span>Licensed with the College of Physiotherapists of Ontario</span>
            </div>
            <div className="specialty-list">
              <span><Icon name="bi-trophy" /> Sports rehabilitation</span>
              <span><Icon name="bi-person-standing" /> Back and neck pain</span>
              <span><Icon name="bi-bandaid" /> Post-surgical recovery</span>
              <span><Icon name="bi-briefcase" /> Workplace injuries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section-pad stories-section">
      <div className="container">
        <div className="section-heading text-center mx-auto">
          <span className="section-kicker">Patient feedback</span>
          <h2>What patients have told us.</h2>
        </div>
        <div className="row g-4 mt-4">
          {testimonials.map((item, index) => (
            <div className="col-lg-4" key={item.name}>
              <figure className={`story-card story-${index + 1}`}>
                <div className="quote-mark">“</div>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <span className="story-avatar">{item.name.split(' ').map((word) => word[0]).join('')}</span>
                  <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    ['Do I need a doctor’s referral?', 'No. You can book directly with a physiotherapist. Some insurance plans may ask for a referral for reimbursement, so it is worth checking your specific coverage.'],
    ['What should I wear to my appointment?', 'Wear comfortable clothing that lets you move and makes the area being assessed easy to access. Shorts and a T-shirt are a reliable choice.'],
    ['Will treatment hurt?', 'Treatment should feel purposeful, not punishing. We check in throughout your visit and adjust every technique and exercise to your comfort and goals.'],
    ['Can you bill my insurance directly?', 'Yes, we offer direct billing for many major insurers and eligible plans. Bring your policy information to your first appointment.'],
  ]
  return (
    <section id="answers" className="section-pad faq-section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <span className="section-kicker">Before you come in</span>
            <h2>A few common questions.</h2>
            <p>If something is not covered here, call or email the clinic. We’re happy to help before you book.</p>
            <a className="text-link" href="tel:+16135550184"><Icon name="bi-telephone" /> Prefer to talk? Call (613) 555-0184</a>
          </div>
          <div className="col-lg-7">
            <div className="accordion" id="faqAccordion">
              {items.map(([question, answer], index) => (
                <div className="accordion-item" key={question}>
                  <h3 className="accordion-header">
                    <button className={`accordion-button ${index ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`} aria-expanded={!index} aria-controls={`faq-${index}`}>
                      {question}
                    </button>
                  </h3>
                  <div id={`faq-${index}`} className={`accordion-collapse collapse ${!index ? 'show' : ''}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body">{answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Designer() {
  return (
    <section className="designer-section" aria-labelledby="designer-heading">
      <div className="container">
        <div className="designer-card">
          <div className="designer-mark" aria-hidden="true">JE</div>
          <div>
            <h2 id="designer-heading">Designed and developed by Justin Evaristo.</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ onBook }) {
  return (
    <>
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel">
            <div><span className="section-kicker light">Appointments available</span><h2>Book online when it suits you.</h2><p>New patients should choose an initial assessment.</p></div>
            <button className="btn btn-light btn-lg" onClick={onBook}>View appointments <Icon name="bi-arrow-right" /></button>
          </div>
        </div>
      </section>
      <Designer />
      <footer className="site-footer">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <a className="brand-lockup footer-brand" href="#home"><span className="brand-mark"><Icon name="bi-heart-pulse-fill" /></span><span>Easy<span>Physio</span></span></a>
              <p>One-on-one physiotherapy in central Ottawa.</p>
            </div>
            <div className="col-6 col-lg-2"><h3>Explore</h3><a href="#services">Services</a><a href="#approach">Our approach</a><a href="#team">Your physio</a></div>
            <div className="col-6 col-lg-2"><h3>Visit</h3><span>240 Cooper Street</span><span>Ottawa, ON</span><span>Mon-Sat</span></div>
            <div className="col-lg-3"><h3>Contact</h3><a href="tel:+16135550184">(613) 555-0184</a><a href="mailto:hello@easyphysio.ca">hello@easyphysio.ca</a></div>
          </div>
          <div className="footer-bottom"><span>© 2026 EasyPhysio. All rights reserved.</span><span>Privacy · Accessibility</span></div>
        </div>
      </footer>
    </>
  )
}

function BookingModal({ open, onClose, initialService }) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(initialService || services[0])
  const [selectedDate, setSelectedDate] = useState(getBookingDates()[0])
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    concern: '',
    painStart: '',
    painLevel: '5',
    patientStatus: '',
    progress: '',
    appointmentGoal: '',
    contactMethod: 'Phone call',
  })

  useEffect(() => {
    if (open) {
      setStep(initialService ? 2 : 1)
      setSelectedService(initialService || services[0])
      setSelectedDate(getBookingDates()[0])
      setSelectedTime('')
      document.body.classList.add('modal-open-custom')
    }
    return () => document.body.classList.remove('modal-open-custom')
  }, [open, initialService])

  if (!open) return null

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const nextFromDetails = (event) => {
    event.preventDefault()
    setStep(3)
  }
  const intake = serviceIntake[selectedService.id]
  const bookingDates = getBookingDates()
  const timeSlots = availability[selectedService.id]
  const selectService = (service) => {
    setSelectedService(service)
    setSelectedTime('')
  }

  return (
    <div className="booking-overlay" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="booking-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close booking"><Icon name="bi-x-lg" /></button>
        {step < 4 && (
          <div className="booking-progress">
            {[1, 2, 3].map((item) => <span key={item} className={step >= item ? 'active' : ''}><b>{item}</b><small>{['Visit', 'Details', 'Schedule'][item - 1]}</small></span>)}
          </div>
        )}

        {step === 1 && (
          <div className="booking-content">
            <span className="section-kicker">Let’s find your fit</span>
            <h2 id="booking-title">What can we help with today?</h2>
            <p className="modal-intro">Choose the option that feels closest. We can always adjust it together.</p>
            <div className="booking-service-list">
              {services.map((service) => (
                <button key={service.id} className={selectedService.id === service.id ? 'selected' : ''} onClick={() => selectService(service)}>
                  <span className={`mini-service-icon tone-${service.tone}`}><Icon name={service.icon} /></span>
                  <span><strong>{service.title}</strong><small>{service.duration} · ${service.price}</small></span>
                  <Icon name={selectedService.id === service.id ? 'bi-check-circle-fill' : 'bi-circle'} />
                </button>
              ))}
            </div>
            <button className="btn btn-coral w-100 btn-lg mt-4" onClick={() => setStep(2)}>Continue <Icon name="bi-arrow-right" /></button>
          </div>
        )}

        {step === 2 && (
          <form className="booking-content" onSubmit={nextFromDetails}>
            <span className="section-kicker">{intake.kicker}</span>
            <h2 id="booking-title">{intake.title}</h2>
            <p className="modal-intro">{intake.intro}</p>
            <div className={`selected-visit-bar tone-${selectedService.tone}`}>
              <span className="mini-service-icon"><Icon name={selectedService.icon} /></span>
              <span><small>Selected visit</small><strong>{selectedService.title} · {selectedService.duration}</strong></span>
              <button type="button" onClick={() => setStep(1)}>Change</button>
            </div>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label" htmlFor="name">Full name</label><input id="name" name="name" value={form.name} onChange={updateForm} className="form-control" placeholder="Your name" required /></div>
              <div className="col-md-6"><label className="form-label" htmlFor="phone">Phone number</label><input id="phone" name="phone" value={form.phone} onChange={updateForm} className="form-control" placeholder="(613) 555-0123" required /></div>
              <div className="col-12"><label className="form-label" htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={updateForm} className="form-control" placeholder="you@example.com" required /></div>
              {selectedService.id === 'assessment' && (
                <>
                  <div className="col-md-6"><label className="form-label" htmlFor="painStart">When did the problem start?</label><select id="painStart" name="painStart" value={form.painStart} onChange={updateForm} className="form-select" required><option value="">Select a timeframe</option><option>Within the last week</option><option>1-4 weeks ago</option><option>1-6 months ago</option><option>More than 6 months ago</option></select></div>
                  <div className="col-md-6"><label className="form-label" htmlFor="painLevel">Current discomfort: {form.painLevel}/10</label><input id="painLevel" name="painLevel" type="range" min="0" max="10" value={form.painLevel} onChange={updateForm} className="form-range pain-range" /></div>
                  <div className="col-12"><label className="form-label" htmlFor="concern">Where are you feeling the problem, and what affects it?</label><textarea id="concern" name="concern" value={form.concern} onChange={updateForm} className="form-control" rows="4" placeholder="For example: Lower back pain that is worse after sitting and improves when walking..." required /></div>
                </>
              )}
              {selectedService.id === 'follow-up' && (
                <>
                  <div className="col-12"><label className="form-label" htmlFor="patientStatus">Have you visited EasyPhysio before?</label><select id="patientStatus" name="patientStatus" value={form.patientStatus} onChange={updateForm} className="form-select" required><option value="">Choose an option</option><option>Yes, within the last 3 months</option><option>Yes, more than 3 months ago</option><option>No, I need an initial assessment</option></select></div>
                  <div className="col-12"><label className="form-label" htmlFor="progress">How have things changed since your last session?</label><textarea id="progress" name="progress" value={form.progress} onChange={updateForm} className="form-control" rows="3" placeholder="What feels better, unchanged, or more difficult?" required /></div>
                  <div className="col-12"><label className="form-label" htmlFor="appointmentGoal">What should we focus on during this visit?</label><input id="appointmentGoal" name="appointmentGoal" value={form.appointmentGoal} onChange={updateForm} className="form-control" placeholder="Exercise progression, pain flare-up, return-to-sport check..." required /></div>
                </>
              )}
              {selectedService.id === 'consult' && (
                <>
                  <div className="col-12"><label className="form-label">Preferred consultation method</label><div className="contact-methods">{['Phone call', 'Video call'].map((method) => <button type="button" key={method} className={form.contactMethod === method ? 'selected' : ''} onClick={() => setForm({ ...form, contactMethod: method })}><Icon name={method === 'Phone call' ? 'bi-telephone' : 'bi-camera-video'} />{method}</button>)}</div></div>
                  <div className="col-12"><label className="form-label" htmlFor="concern">What is your main question?</label><textarea id="concern" name="concern" value={form.concern} onChange={updateForm} className="form-control" rows="4" placeholder="Briefly describe what happened and what you would like advice about..." required /></div>
                  <div className="col-12"><div className="consult-notice"><Icon name="bi-info-circle" /> A consultation provides guidance and next steps, but it does not replace a physical assessment when one is needed.</div></div>
                </>
              )}
            </div>
            <div className="modal-actions"><button type="button" className="btn btn-light" onClick={() => setStep(1)}><Icon name="bi-arrow-left" /> Back</button><button className="btn btn-coral">Choose a date <Icon name="bi-arrow-right" /></button></div>
          </form>
        )}

        {step === 3 && (
          <div className="booking-content">
            <span className="section-kicker">Choose your appointment</span>
            <h2 id="booking-title">Select a date and time.</h2>
            <p className="modal-intro">Available times update for the date and appointment type you choose.</p>
            <div className="date-picker-header"><span><Icon name="bi-calendar3" /> Available dates</span><strong>{formatDate(selectedDate, { month: 'long', year: 'numeric' })}</strong></div>
            <div className="date-grid">
              {bookingDates.map((date) => {
                const selected = date.toDateString() === selectedDate.toDateString()
                return <button key={date.toISOString()} className={selected ? 'selected' : ''} onClick={() => { setSelectedDate(date); setSelectedTime('') }}><small>{formatDate(date, { weekday: 'short' })}</small><strong>{date.getDate()}</strong><span>{formatDate(date, { month: 'short' })}</span></button>
              })}
            </div>
            <div className="time-picker-heading"><span>Times for {formatDate(selectedDate, { weekday: 'long', month: 'long', day: 'numeric' })}</span><small>{selectedService.duration} appointment</small></div>
            <div className="time-grid">
              {timeSlots.map((time) => <button key={time} className={selectedTime === time ? 'selected' : ''} onClick={() => setSelectedTime(time)}>{time}{selectedTime === time && <Icon name="bi-check-circle-fill" />}</button>)}
            </div>
            <div className="booking-summary">
              <span><small>Appointment</small><strong>{selectedService.title}</strong></span>
              <span><small>Duration</small><strong>{selectedService.duration}</strong></span>
              <span><small>Total</small><strong>${selectedService.price}</strong></span>
            </div>
            <div className="modal-actions"><button className="btn btn-light" onClick={() => setStep(2)}><Icon name="bi-arrow-left" /> Back</button><button className="btn btn-coral" disabled={!selectedTime} onClick={() => setStep(4)}>Confirm appointment <Icon name="bi-check2" /></button></div>
          </div>
        )}

        {step === 4 && (
          <div className="booking-content confirmation text-center">
            <div className="success-icon"><Icon name="bi-check2" /></div>
            <span className="section-kicker">You’re all set</span>
            <h2 id="booking-title">We’ll see you soon{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h2>
            <p>A confirmation has been prepared for <strong>{form.email || 'your email'}</strong>.</p>
            <div className="confirmation-ticket">
              <span><Icon name="bi-calendar3" /><small>Date</small><strong>{formatDate(selectedDate, { weekday: 'short', month: 'long', day: 'numeric' })}</strong></span>
              <span><Icon name="bi-clock" /><small>Time</small><strong>{selectedTime}</strong></span>
              <span><Icon name={selectedService.icon} /><small>Visit</small><strong>{selectedService.title}</strong></span>
            </div>
            <div className="bring-note"><Icon name="bi-backpack" /> Bring comfortable clothing, your insurance details, and any relevant medical documents.</div>
            <button className="btn btn-primary-soft w-100 btn-lg" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [initialService, setInitialService] = useState(null)

  const openBooking = (service = null) => {
    setInitialService(service)
    setBookingOpen(true)
  }

  return (
    <>
      <Navbar onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <Services onSelect={openBooking} />
        <Approach />
        <Team />
        <Testimonials />
        <FAQ />
      </main>
      <Footer onBook={() => openBooking()} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialService={initialService} />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
