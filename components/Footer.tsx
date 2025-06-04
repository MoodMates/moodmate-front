"use client";
import { useRef, useEffect } from "react";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { gsap } from "gsap";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full px-4 pt-12 pb-8 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 border-t border-indigo-200/60 shadow-inner"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-purple-800 text-xl mb-4">À propos</h3>
            <p className="text-indigo-700 text-center md:text-left mb-3">
              MoodMate est votre compagnon pour suivre et gérer vos émotions au
              quotidien.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-purple-700 hover:text-purple-900 transition-colors"
              >
                <LinkedinOutlined style={{ fontSize: 24 }} />
              </Link>
              <Link
                href="mailto:contact@moodmate.com"
                className="text-purple-700 hover:text-purple-900 transition-colors"
              >
                <MailOutlined style={{ fontSize: 24 }} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-purple-800 text-xl mb-4">
              Liens utiles
            </h3>
            <ul className="flex flex-col items-center md:items-start space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/journal-citations"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  Journal Citations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-purple-800 text-xl mb-4">Contact</h3>
            <p className="text-indigo-700 mb-1">contact@moodmate.com</p>
            <p className="text-indigo-700 mb-4">Paris, France</p>
            <p className="text-sm text-indigo-600 mt-2">
              Restez connecté pour une meilleure santé mentale
            </p>
          </div>
        </div>

        <div className="border-t border-indigo-200 pt-6 mt-4 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <p className="font-medium text-indigo-700">
            © {new Date().getFullYear()} MoodMate. Tous droits réservés.
          </p>
          <p className="text-indigo-600 mt-2 md:mt-0 flex items-center">
            Fait avec{" "}
            <HeartFilled style={{ color: "#9333ea", margin: "0 4px" }} /> pour
            votre bien-être
          </p>
        </div>
      </div>
    </footer>
  );
}
