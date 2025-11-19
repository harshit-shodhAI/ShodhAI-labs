import ShodhAILogo from "@/components/icons/ShodhAI";
import MoneyIcon from "@/components/icons/Money";
import CalenderIcon from "@/components/icons/Calender";
import ApartmentIcon from "@/components/icons/Apartment";
import Link from "next/link";

export default function InternshipPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex h-full grow flex-col">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10 md:py-16">
          <div className="flex flex-col max-w-[960px] flex-1 gap-8 md:gap-12">
            <main className="flex flex-col gap-8 md:gap-12">
              <div className="flex flex-col gap-3 w-full text-center p-4">
                <h1 className="page-title">
                  Research Internship Opportunities
                </h1>
                <p className="text-base lg:text-lg font-normal leading-normal">
                  Join our team with a monthly stipend & accommodation benefits.
                </p>
              </div>

              <div className="card flex flex-col gap-8 p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="shrink-0">
                    <ShodhAILogo className="h-20 w-20 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-text-headings">
                      About ShodhAI Labs
                    </h2>
                    <p className="text-base font-normal leading-relaxed">
                      ShodhAI Labs is a leading research institution dedicated
                      to advancing the future of artificial intelligence. Our
                      mission is to foster groundbreaking discoveries and
                      nurture the next generation of scientific leaders in a
                      collaborative, state-of-the-art environment.
                    </p>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-4 items-center">
                  <p className="text-sm font-semibold">
                    In collaboration with:
                  </p>
                  <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
                    <CompanyLogo1 className="h-8 w-auto text-gray-400 dark:text-gray-500" />
                    <CompanyLogo2 className="h-8 w-auto text-gray-400 dark:text-gray-500" />
                  </div>
                </div> */}
              </div>

              <div className="p-4 @container">
                <div className="card">
                  <div className="p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                      <p className="text-2xl font-bold leading-tight tracking-[-0.015em] text-text-headings">
                        Open Research Position: Machine Learning
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="info-box">
                          <span className="text-3xl text-blue-600 dark:text-blue-400">
                            <MoneyIcon className="h-8 w-8" />
                          </span>
                          <span className="text-sm font-medium text-text-headings">
                            ₹15,000 - ₹20,000/month
                          </span>
                          <span className="text-xs">Stipend</span>
                        </div>
                        <div className="info-box">
                          <span className="text-3xl text-blue-600 dark:text-blue-400">
                            <CalenderIcon className="h-8 w-8" />
                          </span>
                          <span className="text-sm font-medium text-text-headings">
                            6 months
                          </span>
                          <span className="text-xs">Duration</span>
                        </div>
                        <div className="info-box">
                          <span className="text-3xl text-blue-600 dark:text-blue-400">
                            <ApartmentIcon className="h-8 w-8" />
                          </span>
                          <span className="text-sm font-medium text-text-headings">
                            Provided
                          </span>
                          <span className="text-xs">Accommodation</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-base font-normal leading-relaxed">
                      Under the position the candidate will have the ability to
                      be involved with one of the three projects of their
                      choosing. The final aim is to publish the findings in
                      reputed conferences/journals.
                    </p>
                    <hr className="border-t border-border" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-text-headings">
                          Required Qualifications
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            Pursuing B.Tech/M.Tech in CS, ECE, or related
                            fields.
                          </li>
                          <li>Strong programming skills in Python.</li>
                          <li>
                            Solid understanding of machine learning
                            fundamentals.
                          </li>
                          <li>Experience with python based DL frameworks</li>
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-text-headings">
                          Preferred Qualifications
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Previous research or internship experience.</li>
                          <li>Familiarity with DL model architectures.</li>
                          <li>Contributions to open-source projects.</li>
                          <li>Strong communication and teamwork skills.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/application"
                className="flex px-4 py-3 justify-center"
              >
                <button className="primary-button">
                  <span className="truncate">Apply Now</span>
                </button>
              </Link>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
