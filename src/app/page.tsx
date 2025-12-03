import ShodhAILogo from "@/components/icons/ShodhAI";
import MoneyIcon from "@/components/icons/Money";
import CalenderIcon from "@/components/icons/Calender";
import ApartmentIcon from "@/components/icons/Apartment";
import Link from "next/link";

export default function InternshipPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--background-body)] py-12 px-4 sm:px-6">
      {/* --- Main Content Card --- */}
      <div className="max-w-4xl mx-auto bg-[var(--background-surface)] rounded-xl shadow-sm border border-[var(--border-default)] overflow-hidden">
        {/* Header Section */}
        <div className="p-8 md:p-12 border-b border-[var(--border-default)]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-2">
              <ShodhAILogo className="h-12 w-12 text-[var(--primary-600)]" />
              <div className="h-8 w-[1px] bg-[var(--border-default)]"></div>
              <span className="text-sm font-bold tracking-wide uppercase text-[var(--text-secondary)]">
                Research Division
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
                Research Intern – Machine Learning for Material Science
              </h1>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="px-3 py-1 rounded-full bg-[var(--neutral-100)] text-[var(--text-primary)] border border-[var(--border-default)]">
                  Jaipur, Rajasthan
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--neutral-100)] text-[var(--text-primary)] border border-[var(--border-default)]">
                  On-site
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--primary-50)] text-[var(--primary-700)] border border-[var(--primary-100)]">
                  Full-time
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)] bg-[var(--background-subtle)]">
          <div className="p-6 flex items-center gap-4 justify-center md:justify-start">
            <div className="p-2 bg-white rounded-lg shadow-sm text-[var(--primary-600)] border border-[var(--border-default)]">
              <MoneyIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                Monthly Stipend
              </p>
              <p className="font-bold text-[var(--text-primary)]">₹25,000</p>
            </div>
          </div>

          <div className="p-6 flex items-center gap-4 justify-center md:justify-start">
            <div className="p-2 bg-white rounded-lg shadow-sm text-[var(--primary-600)] border border-[var(--border-default)]">
              <CalenderIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Duration</p>
              <p className="font-bold text-[var(--text-primary)]">6 Months</p>
            </div>
          </div>

          <div className="p-6 flex items-center gap-4 justify-center md:justify-start">
            <div className="p-2 bg-white rounded-lg shadow-sm text-[var(--primary-600)] border border-[var(--border-default)]">
              <ApartmentIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Perks</p>
              <p className="font-bold text-[var(--text-primary)]">
                Accommodation Provided
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-8 md:p-12 flex flex-col gap-10">
          {/* About */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border-default)] pb-2">
              About Shodh AI
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base">
              At Shodh AI, we are a deep-tech startup backed by the{" "}
              <strong>IndiaAI Mission</strong>, committed to building advanced
              AI systems for high-impact scientific domains. In our Research
              division, we are developing AI models that accelerate the
              discovery, characterization, and design of next-generation
              materials. From predicting complex properties using
              microstructures to generating novel material candidates, our
              mission is to push the boundaries of computational material
              science.
            </p>
          </section>

          {/* What You Will Build */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border-default)] pb-2">
              What You Will Build
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[var(--neutral-50)] p-6 rounded-lg border border-[var(--border-default)]">
                <h4 className="font-bold text-[var(--text-primary)] mb-2">
                  Predictive Modeling
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Develop ML/DL pipelines (CNNs, Vision Transformers, GNNs) to
                  predict mechanical, thermal, and structural properties
                  directly from microstructure images and simulation data.
                </p>
              </div>
              <div className="bg-[var(--neutral-50)] p-6 rounded-lg border border-[var(--border-default)]">
                <h4 className="font-bold text-[var(--text-primary)] mb-2">
                  Generative Design
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Experiment with VAEs, GANs, and Diffusion Models to synthesize
                  hypothetical microstructures. Incorporate physics priors to
                  ensure AI systems remain scientifically valid.
                </p>
              </div>
            </div>
          </section>

          {/* Responsibilities */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border-default)] pb-2">
              Key Responsibilities
            </h3>
            <ul className="space-y-3">
              {[
                "Design & Experiment: Implement and test deep learning architectures (CNNs, ViTs, GNNs).",
                "Drive Technical Exploration: Propose new ideas in generative modeling and physics-informed ML.",
                "Ensure Reproducibility: Maintain strict research discipline regarding code quality and logging.",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-[var(--text-secondary)]"
                >
                  <span className="text-[var(--primary-500)] mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Qualifications */}
          <section>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-default)] pb-2">
              Who We're Looking For
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--text-placeholder)] mb-4">
                  Required Qualifications
                </h4>
                <ul className="space-y-2">
                  {[
                    "B.Tech/M.Tech in CS, Materials Science, or related field.",
                    "Strong command of Python & PyTorch/TensorFlow.",
                    "Solid understanding of Optimization & Computer Vision.",
                    "Ability to read and implement academic papers.",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[var(--text-secondary)] text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-[var(--success-500)] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--text-placeholder)] mb-4">
                  Preferred (Bonus)
                </h4>
                <ul className="space-y-2">
                  {[
                    "Experience with Materials Datasets.",
                    "Knowledge of GNNs, Diffusion Models, or PINNs.",
                    "Prior work with Microscopy images.",
                    "Knowledge of CUDA / GPU optimization.",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[var(--text-secondary)] text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-[var(--primary-400)] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-4 pt-8 border-t border-[var(--border-default)] flex flex-col items-center gap-4 text-center">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Ready to shape the future of Material Science?
            </h3>
            <p className="text-[var(--text-secondary)] max-w-lg mb-2">
              Join a national-level mission contributing to India’s scientific
              growth.
            </p>
            <Link href="/application" className="w-full sm:w-auto">
              <button className="button_primary w-full sm:w-auto px-10 py-3 text-base">
                Apply for Internship
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer / Copyright simplistic */}
      <div className="max-w-4xl mx-auto mt-8 text-center text-xs text-[var(--text-placeholder)]">
        &copy; {new Date().getFullYear()} Shodh AI. All rights reserved.
      </div>
    </div>
  );
}
