// app/about/page.tsx
import Navbar from "../components/Navbar";
import { Users, Utensils, Heart, Clock } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Community Focused",
      description:
        "Built by Lexington locals who understand the diverse dietary needs of our community.",
    },
    {
      icon: <Utensils className="h-6 w-6 text-blue-600" />,
      title: "Curated Selection",
      description:
        "Carefully vetted restaurants that cater to various dietary restrictions and preferences.",
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      title: "Health Conscious",
      description:
        "Making it easier for everyone to find meals that align with their health goals and restrictions.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Time Saving",
      description:
        "Quick and easy way to find restaurants that match your specific dietary requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Rest Eatly
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Making dining out easier for everyone in Lexington, regardless of
              dietary restrictions.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                Rest Eatly was born from a simple idea: everyone deserves to
                enjoy dining out, regardless of their dietary restrictions.
                We're here to connect Lexington's diverse community with
                restaurants that cater to their specific needs, making the
                dining experience stress-free and enjoyable for all.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team/Project Section */}
          <div className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Senior Project
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                This project was developed as part of a senior project to
                address the growing need for accessible dining information in
                our community. Our goal is to make it easier for everyone to
                find restaurants that accommodate their dietary needs, whether
                they're dealing with allergies, following specific diets, or
                simply being mindful of their food choices.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                Have questions or suggestions? We'd love to hear from you.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
